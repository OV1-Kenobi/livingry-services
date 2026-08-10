import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractDomain,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
  normalizeSubmission,
  normalizeUrl,
  validateSubmission,
} from "../src/lib/hvac-founding-five/validation";
import type { SubmissionInput } from "../src/lib/hvac-founding-five/types";

function validInput(over: Partial<SubmissionInput> = {}): SubmissionInput {
  return {
    fullName: "Jane Operator",
    companyName: "Northwind Heating & Air",
    workEmail: "Jane@Northwind-HVAC.com",
    phone: "(555) 213-4567",
    companyWebsite: "northwind-hvac.com",
    role: "Owner",
    workflowProblem: "After-hours calls go to voicemail and nobody follows up the next morning.",
    markets: "Austin, TX",
    teamSize: "3–5 active field vehicles/teams",
    fsm: "ServiceTitan",
    primaryLeaks: [
      "Missed calls or unworked inbound opportunities",
      "Estimates that are not followed up consistently",
    ],
    weeklyVolume: "10–25 per week",
    readiness: "Records and systems are ready",
    consent: true,
    ...over,
  };
}

test("valid submission passes", () => {
  assert.equal(validateSubmission(validInput()).ok, true);
});

test("each required field is enforced", () => {
  const cases: [Partial<SubmissionInput>, string][] = [
    [{ fullName: "" }, "fullName"],
    [{ companyName: "" }, "companyName"],
    [{ workEmail: "not-an-email" }, "workEmail"],
    [{ phone: "123" }, "phone"],
    [{ role: "" }, "role"],
    [{ workflowProblem: "too short" }, "workflowProblem"],
    [{ consent: false }, "consent"],
  ];
  for (const [over, key] of cases) {
    const r = validateSubmission(validInput(over));
    assert.equal(r.ok, false, `expected failure for ${key}`);
    assert.ok(r.errors[key as keyof typeof r.errors], `expected error on ${key}`);
  }
});

test("workflowProblem length bounds (20–2000)", () => {
  assert.equal(validateSubmission(validInput({ workflowProblem: "x".repeat(19) })).ok, false);
  assert.equal(validateSubmission(validInput({ workflowProblem: "x".repeat(20) })).ok, true);
  assert.equal(validateSubmission(validInput({ workflowProblem: "x".repeat(2001) })).ok, false);
});

test("email/phone/url normalization", () => {
  assert.equal(normalizeEmail("  Jane@X.COM "), "jane@x.com");
  assert.equal(normalizePhone("(555) 213-4567"), "5552134567");
  assert.equal(normalizePhone("+1 555 213 4567"), "+15552134567");
  assert.equal(isValidPhone("5552134567"), true);
  assert.equal(isValidPhone("15552134567"), true);
  assert.equal(isValidPhone("55521345"), false);
  assert.equal(normalizeUrl("northwind-hvac.com"), "https://northwind-hvac.com");
});

test("extractDomain prefers website, strips www", () => {
  assert.equal(extractDomain("https://www.northwind-hvac.com/contact"), "northwind-hvac.com");
  assert.equal(extractDomain("jane@northwind-hvac.com"), "northwind-hvac.com");
});

test("dedupeKey is normalized email + company domain", () => {
  const sub = normalizeSubmission(validInput());
  assert.equal(sub.emailNormalized, "jane@northwind-hvac.com");
  assert.equal(sub.companyDomain, "northwind-hvac.com");
  assert.equal(sub.dedupeKey, "jane@northwind-hvac.com::northwind-hvac.com");
});

test("normalizeSubmission keeps only non-sensitive attribution metadata", () => {
  const sub = normalizeSubmission(
    validInput({
      utmSource: "referral",
      referrer: "https://example.com",
      landingUrl: "https://livingry.services/hvac/founding-five",
    } as Partial<SubmissionInput>),
  );
  assert.equal(sub.metadata.utm_source, "referral");
  assert.equal(sub.metadata.form_name, "hvac_founding_five_scorecard");
  // No PII keys leak into metadata.
  for (const k of Object.keys(sub.metadata)) {
    assert.ok(!/email|phone|full_?name|workflow/i.test(k), `unexpected metadata key ${k}`);
  }
});
