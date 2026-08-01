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

test("guarantee is the four-week gate with no outcome promises", () => {
  assert.match(rc.guarantee.heading, /four-week gate/i);
  assert.match(rc.guarantee.body, /invoiced only if/i);
  assert.match(rc.guarantee.body, /2x/);
  assert.match(rc.guarantee.body, /met its operating commitments/i);
  assert.match(rc.guarantee.body, /owe nothing for those weeks/i);
  assert.match(rc.guarantee.body, /12-week test run/i);
  assert.match(rc.guarantee.body, /keep everything we built/i);
  assert.doesNotMatch(rc.guarantee.body, /\$4,?000/);
  assert.doesNotMatch(rc.guarantee.body, /guarantee[sd]? revenue/i);
});

test("terms: $799 report public, launch range, weekly gate mechanics", () => {
  assert.equal(rc.terms.findingFee.amount, "$799");
  assert.match(rc.terms.findingFee.body, /credited in full/i);
  assert.equal(rc.terms.launch.range, "$2,500–$4,500");
  assert.match(rc.terms.weeklyFee.body, /weekly in arrears/i);
  assert.match(rc.terms.gate.body, /owes? nothing/i);
  assert.match(rc.terms.exit.body, /12-week/);
  assert.match(rc.terms.vendorCosts, /opened in the partner's name/i);
  assert.doesNotMatch(blob, /\$1,?000\s*(per|\/|a)?\s*(business\s*)?week/i);
  assert.doesNotMatch(blob, /\$4,?000/);
  assert.doesNotMatch(blob, /\$3,?500/);
});

test("copy carries no prohibited claims or invented proof", () => {
  // FAQ question labels name the concern being rebutted ("Do you guarantee
  // revenue?") — they are not claims. Check claims against copy values only,
  // excluding question labels.
  const claimStrings = copyStrings.filter((s) => !s.endsWith("?"));
  const claimBlob = claimStrings.join("\n");
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
  assert.match(g.a, /fee structure, not an outcome/i);
  assert.doesNotMatch(g.a, /^No\./);
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
