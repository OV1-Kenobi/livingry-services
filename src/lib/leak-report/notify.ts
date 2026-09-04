// Owner alert for Leak Priority Report requests.
//
// Until an email service provider is selected, this is the fulfillment path:
// the stored request is the source of truth and the founder is alerted with
// everything needed to prepare and send the report (plus the personal
// interpretation) manually. When RESEND_API_KEY is configured, the alert goes
// by email; otherwise it is logged. Mirrors the notifier posture of the
// Founding Five pipeline: never place secrets or PII into logs — the log
// carries the request id and email domain only.

import type { LeakReportRequest } from "./store";

export type NotifyOutcome = { attempted: boolean; ok: boolean; note: string };

function redactEmail(email: string): string {
  const at = email.indexOf("@");
  return at === -1 ? "***" : `***${email.slice(at)}`;
}

function buildOwnerText(record: LeakReportRequest): string {
  return [
    "New Leak Priority Report request — needs the report plus your interpretation.",
    "",
    `Email: ${record.emailNormalized}`,
    `Name: ${record.fullName ?? "(not provided)"}`,
    `Phone: ${record.phone ?? "(not provided)"}`,
    `Company website: ${record.companyWebsite ?? "(not provided)"}`,
    `Score: ${record.score} of 51 — ${record.band}`,
    `Weakest layer: ${record.focusCategory ?? "(not provided)"}`,
    `Consent: ${record.consentTextVersion} at ${record.consentAt}`,
    `Request id: ${record.id}`,
    "",
    "Fulfil by sending the category-templated Leak Priority Report with your interpretation to the email above.",
  ].join("\n");
}

export async function sendLeakReportOwnerAlert(record: LeakReportRequest): Promise<NotifyOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      "[leak-report] owner-alert (no email provider)",
      JSON.stringify({ requestId: record.id, toDomain: redactEmail(record.emailNormalized) }),
    );
    return { attempted: false, ok: false, note: "email-not-configured" };
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.LEAK_REPORT_FROM || "Livingry Services <noreply@livingry.services>";
    const ownerTo = process.env.LEAK_REPORT_OWNER_TO || "ov@livingry.services";
    const { error } = await resend.emails.send({
      from,
      to: [ownerTo],
      subject: `Leak Priority Report requested — ${record.band}`,
      text: buildOwnerText(record),
    });
    if (error) {
      console.error("[leak-report] owner-alert failed", error.message || "resend-error");
      return { attempted: true, ok: false, note: "resend-error" };
    }
    return { attempted: true, ok: true, note: "resend-ok" };
  } catch (err) {
    console.error(
      "[leak-report] owner-alert failed",
      JSON.stringify({ requestId: record.id, toDomain: redactEmail(record.emailNormalized) }),
    );
    return { attempted: true, ok: false, note: err instanceof Error ? err.message : "notify-error" };
  }
}
