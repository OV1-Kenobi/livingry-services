import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import {
  REPORT_CONSENT_VERSION,
  validateReportRequest,
} from "@/lib/assessment/report-request";
import {
  InMemoryLeakReportStore,
  PgLeakReportStore,
  type LeakReportStore,
} from "@/lib/leak-report/store";
import { sendLeakReportOwnerAlert } from "@/lib/leak-report/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Persist across route invocations within a single server process so the
// no-database fallback still holds requests in staging.
const globalForStore = globalThis as unknown as { __leakReportStore?: LeakReportStore };
function getStore(): LeakReportStore {
  if (process.env.DATABASE_URL) return new PgLeakReportStore();
  if (!globalForStore.__leakReportStore) {
    console.warn("[leak-report] DATABASE_URL not set — using in-memory request store (staging only).");
    globalForStore.__leakReportStore = new InMemoryLeakReportStore();
  }
  return globalForStore.__leakReportStore;
}

// Same-origin check: appropriate CSRF protection for this architecture (no
// cookie-authenticated session on this public endpoint). Rejects cross-site
// form posts by comparing Origin/Referer to the request host.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const source = origin || referer;
  if (!source) return false;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : "") || "unknown";
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const rl = rateLimit(`leak-report:${clientKey(req)}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — a filled hidden field means a bot. Respond as success without
  // creating a record so the bot gets no signal.
  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateReportRequest({
    email: body.email,
    name: body.name,
    phone: body.phone,
    companyWebsite: body.companyWebsite,
    consent: body.consent,
    honeypot: body.honeypot,
    score: body.score,
    bandId: body.bandId,
    bandLabel: body.bandLabel,
    focusCategoryId: body.focusCategoryId,
    focusCategoryTitle: body.focusCategoryTitle,
  });
  if (!validation.ok) {
    return NextResponse.json({ error: "Validation failed", fields: validation.errors }, { status: 422 });
  }
  const value = validation.value;
  const nowIso = new Date().toISOString();

  try {
    const record = await getStore().create({
      emailNormalized: value.email.toLowerCase(),
      fullName: value.name ?? null,
      phone: value.phone ?? null,
      companyWebsite: value.companyWebsite ?? null,
      score: value.score,
      band: value.bandLabel,
      focusCategory: value.focusCategoryTitle ?? null,
      consentTextVersion: REPORT_CONSENT_VERSION,
      consentAt: nowIso,
    });
    // Best-effort owner alert: the stored request is the source of truth, so
    // a notification failure must not fail the visitor's request.
    await sendLeakReportOwnerAlert(record).catch((err) => {
      console.error("[leak-report] owner-alert error", err instanceof Error ? err.message : err);
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never leak internal error detail to the client.
    console.error("[leak-report] pipeline error", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "We could not process your request. Please email ov@livingry.services." },
      { status: 500 },
    );
  }
}
