import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import { validateApplication } from "@/lib/hvac-founding-five/application-validation";
import { appendApplicationRow } from "@/lib/hvac-founding-five/sheets-adapter";
import { buildApplicantConfirmation } from "@/lib/hvac-founding-five/confirmation-email";
import { recordServerEvent } from "@/lib/hvac-founding-five/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same-origin check (no cookie-authenticated session on this public endpoint).
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const source = req.headers.get("origin") || req.headers.get("referer");
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

  const rl = rateLimit(`hvac-alliance:${clientKey(req)}`);
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

  // Honeypot — respond as success without creating a record.
  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateApplication({
    values: (body.values ?? {}) as Record<string, unknown>,
    consent: body.consent === true,
    formVersion: typeof body.formVersion === "string" ? body.formVersion : "",
    consentVersion: typeof body.consentVersion === "string" ? body.consentVersion : "",
  });

  if (!validation.ok) {
    return NextResponse.json(
      { error: "Validation failed", fields: validation.errors },
      { status: 422 },
    );
  }

  const app = validation.normalized;

  try {
    const sheet = await appendApplicationRow(app);

    // Applicant confirmation email is drafted here but only sent when an
    // email provider is configured (Gmail connector / SMTP env). Until
    // then the confirmation screen carries the review-calendar link.
    const confirmation = buildApplicantConfirmation(app);
    void confirmation; // send wiring lands with the email provider env

    if (sheet.attempted && !sheet.ok) {
      // The Sheet is the system of record for review — a failed append is a
      // P2 exception: tell the applicant we received the form but follow up
      // manually rather than pretending the CRM row exists.
      console.error("[hvac-alliance] sheet append failed:", sheet.note);
      recordServerEvent("hvac_form_failure", {});
      return NextResponse.json({
        ok: true,
        applicationId: app.applicationId,
        note: "received_pending_review",
      });
    }

    return NextResponse.json({ ok: true, applicationId: app.applicationId });
  } catch (err) {
    console.error("[hvac-alliance] pipeline error", err instanceof Error ? err.message : err);
    recordServerEvent("hvac_form_failure", {});
    return NextResponse.json(
      { error: "We could not process your application. Please email ov@openagents.com." },
      { status: 500 },
    );
  }
}
