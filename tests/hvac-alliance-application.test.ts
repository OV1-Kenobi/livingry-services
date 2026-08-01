import { test } from "node:test";
import assert from "node:assert/strict";
import {
  APPLICATION_VERSION,
  applicationIntro,
  applicationSections,
  applicationSubmit,
  applicationConfirmation,
  reviewRubric,
} from "../src/lib/hvac-founding-five/application";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";

test("version is stamped and stable", () => {
  assert.equal(APPLICATION_VERSION, "hvac-alliance-application-v1");
});

test("ten application sections in order", () => {
  assert.equal(applicationSections.length, 10);
  applicationSections.forEach((s, i) => assert.equal(s.n, i + 1));
  assert.match(applicationSections[0].title, /Who is applying/i);
  assert.match(applicationSections[9].title, /Why now/i);
});

test("every section has question copy and at least one required field", () => {
  for (const s of applicationSections) {
    assert.ok(s.question.length > 10, `section ${s.n} missing question copy`);
    assert.ok(
      s.fields.some((f) => f.required),
      `section ${s.n} has no required field`,
    );
  }
});

test("sensitive-data safeguards are present in intro and confirmation", () => {
  assert.match(applicationIntro.privacyNote, /do not submit customer records, passwords, API keys/i);
  assert.match(applicationConfirmation.nextStep, /do not send passwords, customer lists, API keys/i);
});

test("Blueprint payment flow appears honestly in intro and commitments", () => {
  assert.match(applicationIntro.termsNote, /diagnostic and findings call first/i);
  assert.match(applicationIntro.termsNote, /\$799 findings report/);
  assert.match(applicationIntro.termsNote, /credited in full/i);
  const commitSection = applicationSections.find((s) => s.n === 9);
  assert.ok(commitSection);
  const commitments = commitSection.fields.find((f) => f.id === "commitments");
  assert.ok(commitments && commitments.kind === "checkboxes");
  const opts = commitments.options.join(" ");
  assert.match(opts, /\$799 findings-report payment is non-refundable/);
  assert.match(opts, /proof ledger/i);
  assert.doesNotMatch(opts, /guaranteed (revenue|results)/i);
});

test("leak ranking enforces pick-two and preserves full-system framing", () => {
  const leakSection = applicationSections.find((s) => s.n === 5);
  assert.ok(leakSection);
  const rank = leakSection.fields.find((f) => f.kind === "rank");
  assert.ok(rank && rank.kind === "rank");
  assert.equal(rank.pick, 2);
  assert.match(leakSection.helper ?? "", /not which parts of the system you receive/i);
});

test("record-readiness grid covers the four baseline areas", () => {
  const gridSection = applicationSections.find((s) => s.n === 7);
  const grid = gridSection?.fields.find((f) => f.kind === "grid");
  assert.ok(grid && grid.kind === "grid");
  assert.deepEqual(
    grid.rows.map((r) => r.id),
    ["inbound_volume", "open_estimates", "past_customers", "paid_invoices"],
  );
});

test("consent is versioned and marketing-opt-out", () => {
  assert.equal(applicationSubmit.consentVersion, "hvac-alliance-consent-v1");
  assert.match(applicationSubmit.consentText, /does not enroll me in unrelated marketing/i);
  assert.match(applicationSubmit.microcopy, /does not guarantee acceptance/i);
});

test("review rubric is an aid, not an automated gate", () => {
  assert.equal(reviewRubric.categories.length, 8);
  assert.deepEqual(
    reviewRubric.bands.map((b) => b.min),
    [13, 9, 0],
  );
});

test("no prohibited claims anywhere in application copy", () => {
  const parts: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") parts.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(applicationIntro);
  walk(applicationSections);
  walk(applicationSubmit);
  walk(applicationConfirmation);
  const blob = parts.filter((s) => !s.endsWith("?")).join("\n");
  assert.deepEqual(findProhibitedClaims(blob), []);
  assert.doesNotMatch(blob, /guarantee[sd]?\s+(revenue|results|leads)/i);
});
