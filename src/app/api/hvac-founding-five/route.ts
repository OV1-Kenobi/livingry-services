import { NextResponse } from "next/server";
import { HVAC_EVENTS, recordServerEvent } from "@/lib/hvac-founding-five/analytics";
import { buildAdaptersFromEnv } from "@/lib/hvac-founding-five/adapters";
import { processSubmission } from "@/lib/hvac-founding-five/pipeline";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import { InMemoryRequestStore, PgRequestStore, type RequestStore } from "@/lib/hvac-founding-five/store";
import { normalizeSubmission, validateSubmission } from "@/lib/hvac-founding-five/validation";
import type { SubmissionInput } from "@/lib/hvac-founding-five/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Persist across route invocations within a single server process so the
// no-database fallback still deduplicates repeat submissions in staging.
const globalForStore = globalThis as unknown as { __hvacFfStore?: RequestStore };
function getStore(): RequestStore {
  if (process.env.DATABASE_URL) return new PgRequestStore();
  if (!globalForStore.__hvacFfStore) {
    console.warn("[hvac-ff] DATABASE_URL not set — using in-memory request store (staging only).");
    globalForStore.__hvacFfStore = new InMemoryRequestStore();
  }
  return globalForStore.__hvacFfStore;
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

  const rl = rateLimit(`hvac-ff:${clientKey(req)}`);
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

  const input: SubmissionInput = {
    fullName: String(body.fullName ?? ""),
    companyName: String(body.companyName ?? ""),
    workEmail: String(body.workEmail ?? ""),
    phone: String(body.phone ?? ""),
    companyWebsite: str(body.companyWebsite),
    role: String(body.role ?? ""),
    markets: String(body.markets ?? ""),
    teamSize: String(body.teamSize ?? ""),
    fsm: String(body.fsm ?? ""),
    weeklyVolume: String(body.weeklyVolume ?? ""),
    readiness: String(body.readiness ?? ""),
    primaryLeaks: Array.isArray(body.primaryLeaks)
      ? body.primaryLeaks.filter((x): x is string => typeof x === "string").map((x) => x.trim()).filter(Boolean).slice(0, 6)
      : [],
    // The research prompt is derived server-side from the enumerated answers,
    // never trusted from the client.
    workflowProblem: buildWorkflowProblem(body),
    consent: body.consent === true || body.consent === "on" || body.consent === "true",
    formName: "hvac_founding_five_scorecard",
    utmSource: str(body.utmSource),
    utmMedium: str(body.utmMedium),
    utmCampaign: str(body.utmCampaign),
    utmContent: str(body.utmContent),
    utmTerm: str(body.utmTerm),
    referrer: str(body.referrer),
    landingUrl: str(body.landingUrl),
    firstTouchAt: str(body.firstTouchAt),
    consentTextVersion: str(body.consentTextVersion),
    analyticsSessionId: str(body.analyticsSessionId),
  };

  const validation = validateSubmission(input);
  if (!validation.ok) {
    recordServerEvent(HVAC_EVENTS.formError, { fields: Object.keys(validation.errors).length });
    return NextResponse.json({ error: "Validation failed", fields: validation.errors }, { status: 422 });
  }

  const sub = normalizeSubmission(input);

  try {
    const result = await processSubmission(sub, { adapters: buildAdaptersFromEnv(), store: getStore() });
    return NextResponse.json({ ok: true, duplicate: result.duplicate });
  } catch (err) {
    // Never leak internal error detail to the client.
    console.error("[hvac-ff] pipeline error", err instanceof Error ? err.message : err);
    recordServerEvent(HVAC_EVENTS.formFailure, {});
    return NextResponse.json(
      { error: "We could not process your request. Please email ov@livingry.services." },
      { status: 500 },
    );
  }
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

// Server-side summary of the scorecard for the research prompt. Built only
// from validated enumerated values; never from client-supplied free text.
function buildWorkflowProblem(body: Record<string, unknown>): string {
  const leaks = Array.isArray(body.primaryLeaks)
    ? body.primaryLeaks.filter((x): x is string => typeof x === "string").slice(0, 6)
    : [];
  const parts = [
    leaks.length ? `Primary leaks: ${leaks.join("; ")}.` : "",
    body.fsm ? `FSM/CRM: ${String(body.fsm)}.` : "",
    body.weeklyVolume ? `Weekly volume (calls + estimates): ${String(body.weeklyVolume)}.` : "",
    body.readiness ? `Record readiness: ${String(body.readiness)}.` : "",
    body.markets ? `Markets: ${String(body.markets)}.` : "",
  ];
  const joined = parts.filter(Boolean).join(" ");
  return joined || "Scorecard submitted without detailed selections.";
}
