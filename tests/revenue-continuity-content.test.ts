import { test } from "node:test";
import assert from "node:assert/strict";
import * as rc from "../src/lib/revenue-continuity/content";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";

// Recursively collect every string in a content export.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

// Only string values are copy — numbers, comments, and keys are not.
const copyStrings: string[] = [];
for (const value of Object.values(rc)) {
  collectStrings(value, copyStrings);
}
const blob = copyStrings.join("\n");

test("the four continuity workflows are complete and always sold together", () => {
  assert.equal(rc.workflows.items.length, 4);
  const names = rc.workflows.items.map((w) => w.name);
  assert.deepEqual(names, [
    "Missed-call recovery",
    "Estimate continuity",
    "Customer reactivation",
    "Referral continuity",
  ]);
  assert.match(rc.workflows.intro, /no partner is sold one workflow/i);
  for (const w of rc.workflows.items) {
    assert.ok(w.leak.length > 0);
    assert.ok(w.behavior.length > 0);
    assert.ok(w.proofEvent.length > 0);
  }
});

test("booked-job continuity and technician knowledge are scope, not products", () => {
  assert.match(rc.workflows.implementationScope.body, /not separate products/i);
  assert.match(rc.workflows.implementationScope.body, /Booked-job continuity/);
  assert.match(rc.workflows.implementationScope.body, /technician knowledge/i);
});

test("proof standard requires a complete chain and never mixes measures", () => {
  assert.equal(rc.proofStandard.chain.length, 8);
  assert.equal(rc.proofStandard.chain[0], "Original opportunity");
  assert.equal(rc.proofStandard.chain[rc.proofStandard.chain.length - 1], "Reconciliation approval");
  assert.match(rc.proofStandard.reportingRule, /never mix them/i);
});

test("the legacy four-week gate and fee-coverage guarantee are gone", () => {
  assert.equal("guarantee" in rc, false, "no four-week-gate guarantee section may return");
  const faqAnswers = rc.allianceFaq.map((f) => f.a).join("\n");
  assert.doesNotMatch(faqAnswers, /four-week gate/i);
  assert.doesNotMatch(faqAnswers, /\b2x\b/);
  assert.doesNotMatch(faqAnswers, /12-week test run/i);
  assert.doesNotMatch(faqAnswers, /owe nothing for those weeks/i);
});

test("terms: pilot price always visible, components, Tier 3 mechanics", () => {
  assert.equal(rc.terms.assessment.amount, "$199");
  assert.equal(rc.terms.tenantIntegration.amount, "$497");
  assert.equal(rc.terms.bundle.amount, "$649");
  assert.equal(rc.terms.pilot.amount, "$2,500 all-in");
  assert.match(rc.terms.pilot.body, /not credited and not added/i);
  assert.match(rc.terms.tier3.body, /delivered unpaid/i);
  assert.match(rc.terms.tier3.body, /\$10,000/);
  assert.match(rc.terms.vendorCosts, /opened in the partner's name/i);
  assert.match(blob, /\$1,000\/week/i);
  assert.match(blob, /\$4,?000/);
  assert.doesNotMatch(blob, /\$3,?500/);
});

test("copy carries no prohibited claims or invented proof", () => {
  // FAQ question labels name the concern being rebutted ("Do you guarantee
  // revenue?") — they are not claims. Check claims against copy values only,
  // excluding question labels and negated honest-copy phrases that name the
  // banned thing while disclaiming it ("Livingry does not guarantee revenue...").
  const negations = [
    rc.terms.noOutcomeGuarantees,
    "No. Livingry does not offer any fee-waiver guarantee.",
  ];
  const claimStrings = copyStrings.filter((s) => !s.endsWith("?"));
  const claimBlob = claimStrings
    .map((s) => negations.reduce((acc, n) => acc.split(n).join(""), s))
    .join("\n");
  const violations = findProhibitedClaims(claimBlob);
  assert.deepEqual(violations, []);
  assert.doesNotMatch(claimBlob, /proven (results|track record)/i);
  assert.doesNotMatch(claimBlob, /\bROI\b/i);
  assert.doesNotMatch(claimBlob, /case studies from/i);
});

test("fit criteria cover both acceptance and deferral", () => {
  assert.ok(rc.fit.accept.length >= 6);
  assert.ok(rc.fit.defer.length >= 4);
  assert.match(rc.fit.accept.join(" "), /authority to change workflow/i);
  assert.match(rc.fit.defer.join(" "), /without a business process owner/i);
});

test("founder story is three beats with credential discipline", () => {
  assert.equal(rc.founder.beats.length, 3);
  const fieldBeat = rc.founder.beats[0].body;
  assert.match(fieldBeat, /HVAC certification training in 2012/);
  assert.match(fieldBeat, /(solo|independent) residential contractor/);
  const systemsBeat = rc.founder.beats[1].body;
  assert.match(systemsBeat, /2019/);
  assert.match(systemsBeat, /book/i);
  // Training, never current licensure.
  assert.doesNotMatch(blob, /licensed HVAC/i);
  assert.doesNotMatch(blob, /currently certified/i);
});

test("alliance FAQ answers the revenue-guarantee question accurately", () => {
  const g = rc.allianceFaq.find((f) => /guarantee revenue/i.test(f.q));
  assert.ok(g);
  assert.match(g.a, /never promise revenue/i);
  assert.match(g.a, /Recovery Ledger/);
});

test("event names are unique and follow the hvac funnel namespace", () => {
  const events = Object.values(rc.ALLIANCE_EVENTS);
  assert.equal(new Set(events).size, events.length);
  for (const e of events) {
    assert.match(e, /^hvac_(alliance|proof)_/);
  }
});

test("capacity numbers stay out of public-facing copy", () => {
  // The 21-partner cap and cohort size are internal program facts; public
  // copy frames capacity qualitatively — never as social proof.
  assert.doesNotMatch(rc.program.coreExplanation, /21/);
  assert.doesNotMatch(rc.program.headline, /21/);
});
