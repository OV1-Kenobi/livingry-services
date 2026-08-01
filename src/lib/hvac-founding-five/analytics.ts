// Privacy-respecting analytics for the Founding Five funnel.
//
// Event names are shared between client (browser) and server. Payloads must
// never contain PII (no name, email, phone, company, or free-text problem).
// Only coarse, non-identifying context is allowed.

export const HVAC_EVENTS = {
  pageView: "hvac_page_view",
  primaryCtaClick: "hvac_primary_cta_click",
  formStart: "hvac_form_start",
  formError: "hvac_form_error",
  formSubmit: "hvac_form_submit",
  formSuccess: "hvac_form_success",
  formFailure: "hvac_form_failure",
  proofMattersClick: "hvac_proof_matters_click",
  emailClick: "hvac_email_click",
  privateAuditView: "hvac_private_audit_view",
  fitCallBooked: "hvac_fit_call_booked",
  pilotWon: "hvac_pilot_won",
} as const;

export type HvacEvent =
  | (typeof HVAC_EVENTS)[keyof typeof HVAC_EVENTS]
  // HVAC Operations landing page (/operations/hvac) event names. Declared here
  // so both funnels share the same PII guard and dispatch path.
  | "hvac_ops_page_view"
  | "hvac_ops_hero_primary_cta_click"
  | "hvac_ops_hero_secondary_cta_click"
  | "hvac_ops_leak_map_view"
  | "hvac_ops_tradeops_view"
  | "hvac_ops_intake_click"
  | "hvac_ops_fit_conversation_click"
  // Revenue Continuity / Strategic Alliance funnel events.
  | "hvac_alliance_apply_click"
  | "hvac_alliance_terms_view"
  | "hvac_proof_standard_view";

// Keys that must never appear in an analytics payload.
const PII_KEYS = new Set([
  "name",
  "fullname",
  "full_name",
  "email",
  "workemail",
  "work_email",
  "phone",
  "company",
  "companyname",
  "company_name",
  "workflowproblem",
  "workflow_problem",
  "problem",
]);

export function assertNoPii(payload: Record<string, unknown>): void {
  for (const key of Object.keys(payload)) {
    if (PII_KEYS.has(key.toLowerCase())) {
      throw new Error(`Analytics payload must not contain PII key: ${key}`);
    }
  }
}

// Client-side dispatch: push onto dataLayer (if present) and emit a DOM event
// that any analytics loader can subscribe to. No network call of its own.
export function trackClientEvent(
  event: HvacEvent,
  payload: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === "undefined") return;
  assertNoPii(payload);
  const detail = { event, ...payload };
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("hvac-analytics", { detail }));
}

// Server/manual events (form_success, form_failure, pilot_won) are recorded as
// structured logs so they are recoverable without a third-party analytics SDK.
export function recordServerEvent(
  event: HvacEvent,
  payload: Record<string, string | number | boolean> = {},
): void {
  assertNoPii(payload);
  console.log("[hvac-analytics]", JSON.stringify({ event, ...payload }));
}
