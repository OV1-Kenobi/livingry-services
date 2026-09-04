import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  REPORT_CONSENT_VERSION,
  describeReportContext,
  validateReportRequest,
} from "../src/lib/assessment/report-request";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const read = (rel: string) => readFileSync(resolve(root, rel), "utf8");

// --- Pure validation -------------------------------------------------------

function validInput() {
  return {
    email: "ops@northwind-hvac.com",
    name: "Sam Rivera",
    phone: "(555) 123-4567",
    companyWebsite: "northwind-hvac.com",
    consent: true,
    score: 22,
    bandId: "patched",
    bandLabel: "Patched",
    focusCategoryId: "intake-capture",
    focusCategoryTitle: "Intake capture",
  };
}

test("a complete valid request passes with trimmed values", () => {
  const r = validateReportRequest({ ...validInput(), email: "  OPS@Northwind-HVAC.com  " });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.email, "OPS@Northwind-HVAC.com");
    assert.equal(r.value.name, "Sam Rivera");
    assert.equal(r.value.score, 22);
    assert.equal(r.value.bandId, "patched");
  }
});

test("email alone with consent is sufficient — all other fields optional", () => {
  const r = validateReportRequest({ email: "a@b.co", consent: true, score: 10, bandId: "exposed", bandLabel: "Exposed" });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.name, undefined);
    assert.equal(r.value.phone, undefined);
    assert.equal(r.value.companyWebsite, undefined);
  }
});

test("a bad email fails", () => {
  for (const email of ["not-an-email", "a@b", "@b.co", "a b@c.co", ""]) {
    const r = validateReportRequest({ ...validInput(), email });
    assert.equal(r.ok, false, `expected failure for ${JSON.stringify(email)}`);
    if (!r.ok) assert.ok(r.errors.email, "email error present");
  }
});

test("missing consent fails", () => {
  for (const consent of [false, undefined, "true", 1]) {
    const r = validateReportRequest({ ...validInput(), consent });
    assert.equal(r.ok, false, `expected failure for consent=${JSON.stringify(consent)}`);
    if (!r.ok) assert.ok(r.errors.consent, "consent error present");
  }
});

test("overlong or newline-bearing optional fields fail without leaking them", () => {
  const long = "x".repeat(201);
  for (const key of ["name", "phone", "companyWebsite"] as const) {
    const bad = { ...validInput(), [key]: long };
    const r = validateReportRequest(bad);
    assert.equal(r.ok, false);
    if (!r.ok) {
      assert.ok(r.errors[key], `${key} error present`);
      assert.ok(!JSON.stringify(r).includes(long), "overlong value not echoed");
    }
  }
  const r = validateReportRequest({ ...validInput(), name: "Sam\nRivera" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.name);
});

test("out-of-range score, unknown band, and band/score mismatch fail", () => {
  assert.equal(validateReportRequest({ ...validInput(), score: 99 }).ok, false);
  assert.equal(validateReportRequest({ ...validInput(), bandId: "nope" }).ok, false);
  // 22 sits in "patched" (18–30), not "sealed" — a tampered pair must fail.
  assert.equal(validateReportRequest({ ...validInput(), bandId: "sealed" }).ok, false);
});

test("consent version is pinned and the context line is plain text", () => {
  assert.equal(REPORT_CONSENT_VERSION, "leak-report-v1");
  const r = validateReportRequest(validInput());
  assert.equal(r.ok, true);
  if (r.ok) {
    const line = describeReportContext(r.value);
    assert.match(line, /22 of 51/);
    assert.match(line, /Patched/);
    assert.match(line, /Intake capture/);
  }
});

// --- Route hardening (static) ----------------------------------------------

const routeSource = read("src/app/api/leak-report-request/route.ts");

test("the report route enforces origin, rate limiting, and honeypot discipline", () => {
  assert.match(routeSource, /isSameOrigin/, "same-origin check present");
  assert.match(routeSource, /rateLimit\(/, "rate limiting present");
  assert.match(routeSource, /honeypot/, "honeypot present");
  assert.match(routeSource, /return NextResponse\.json\(\{ ok: true \}\)/, "honeypot answered as silent success");
});

test("the route never echoes internal errors or stores network identity", () => {
  assert.match(routeSource, /Never leak internal error detail/, "no-leak discipline documented");
  // The client key is used for rate limiting only — it must never reach the store.
  const storeCall = routeSource.match(/getStore\(\)\.create\(\{([\s\S]*?)\}\)/);
  assert.ok(storeCall, "store.create call present");
  assert.ok(!/clientKey|forwarded|ip/i.test(storeCall![1]), "no network identity persisted");
});

// --- Privacy and placement (static) ----------------------------------------

test("the privacy page documents the opt-in as a fourth surface", () => {
  const privacy = read("src/app/privacy/page.tsx");
  assert.match(privacy, /four information surfaces/);
  assert.match(privacy, /Leak Priority Report/);
  assert.match(privacy, /Your individual diagnostic answers|individual diagnostic answers/);
  assert.match(privacy, /never stored by us/);
});

test("the opt-in renders at the results moment and the homepage carries Log in", () => {
  const form = read("src/app/assessment/AssessmentForm.tsx");
  assert.match(form, /ReportRequestForm/, "results render the opt-in form");
  assert.match(form, /sessionStorage|loadAssessmentSession/, "visit persistence wired");
  const home = read("src/app/page.tsx");
  assert.match(home, /Log in/, "homepage carries the Log in pill");
  assert.match(home, /href="\/dashboard"/, "Log in leads to the dashboard auth flow");
});
