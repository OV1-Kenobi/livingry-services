// Privacy-respecting analytics for the Land Potential Review funnel.
//
// Event names are distinct from system_review_* and hvac_* events.
// Payloads must never contain PII (no name, email, phone, property location,
// or free-text vision/improvements).

export const LAND_REVIEW_EVENTS = {
  pageView: "land_review_page_view",
  formStart: "land_review_started",
  formError: "land_review_validation_failed",
  formSubmit: "land_review_submit",
  formSuccess: "land_review_submitted",
  formFailure: "land_review_failure",
} as const;

export type LandReviewEvent =
  (typeof LAND_REVIEW_EVENTS)[keyof typeof LAND_REVIEW_EVENTS];

// Keys that must never appear in an analytics payload.
const PII_KEYS = new Set([
  "name",
  "fullname",
  "full_name",
  "email",
  "phone",
  "propertylocation",
  "property_location",
  "location",
  "vision",
  "parcelid",
  "parcel_id",
  "existingimprovements",
  "existing_improvements",
  "improvements",
  "referralsource",
  "referral_source",
]);

export function assertNoPii(payload: Record<string, unknown>): void {
  for (const key of Object.keys(payload)) {
    if (PII_KEYS.has(key.toLowerCase().replace(/[_-]/g, ""))) {
      throw new Error(`Analytics payload must not contain PII key: ${key}`);
    }
  }
}

// Client-side dispatch: push onto dataLayer (if present) and emit a DOM event
// that any analytics loader can subscribe to.
export function trackClientEvent(
  event: LandReviewEvent,
  payload: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === "undefined") return;
  assertNoPii(payload);
  const detail = { event, ...payload };
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("land-review-analytics", { detail }));
}

// Server/manual events are recorded as structured logs so they are recoverable
// without a third-party analytics SDK.
export function recordServerEvent(
  event: LandReviewEvent,
  payload: Record<string, string | number | boolean> = {},
): void {
  assertNoPii(payload);
  console.log("[land-review-analytics]", JSON.stringify({ event, ...payload }));
}
