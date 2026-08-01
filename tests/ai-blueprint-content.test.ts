import { test } from "node:test";
import assert from "node:assert/strict";
import * as bp from "../src/lib/ai-blueprint/content";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";

function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

const copyStrings: string[] = [];
for (const value of Object.values(bp)) {
  collectStrings(value, copyStrings);
}
const claimBlob = copyStrings.filter((s) => !s.endsWith("?")).join("\n");

test("route and event names are namespaced", () => {
  assert.equal(bp.BLUEPRINT_ROUTE, "/operations/hvac/blueprint");
  const events = Object.values(bp.BLUEPRINT_EVENTS);
  assert.equal(new Set(events).size, events.length);
  for (const e of events) assert.match(e, /^hvac_blueprint_/);
});

test("payment comes only after the findings call", () => {
  assert.match(bp.blueprint.priceNote, /findings call comes first/i);
  assert.match(bp.blueprint.priceNote, /pay only if you decide/i);
  const steps = bp.blueprintFlow.steps.map((s) => s.name);
  assert.ok(steps[0].startsWith("Diagnostic"));
  assert.ok(steps[1].startsWith("Findings call"));
  assert.ok(steps[2].includes("$799"));
  // The $799 step must come after the findings call step.
  const callIdx = steps.findIndex((s) => s.startsWith("Findings call"));
  const payIdx = steps.findIndex((s) => s.includes("$799"));
  assert.ok(callIdx < payIdx, "payment step must follow the findings call");
});

test("$799 is the only pre-launch payment and credits in full", () => {
  assert.equal(bp.blueprint.price, "$799");
  assert.match(bp.blueprint.creditMechanic, /100% of the Blueprint fee credits/i);
  assert.match(bp.blueprint.creditMechanic, /30 days/);
  assert.match(bp.blueprintToAlliance.body, /credits in full/i);
});

test("workflow launch is scoped as a range, never flat", () => {
  assert.match(bp.blueprint.launchRangeNote, /\$2,500 and \$4,500/);
  assert.match(bp.blueprint.launchRangeNote, /specific needs/i);
  assert.doesNotMatch(claimBlob, /fixed.price (implementation|launch)/i);
});

test("operational fees are arrears-billed behind 2x coverage", () => {
  assert.match(bp.blueprint.arrearsNote, /billed only after/i);
  assert.match(bp.blueprint.arrearsNote, /2x/);
  const ledgerStep = bp.blueprintFlow.steps.find((s) => /arrears/i.test(s.name));
  assert.ok(ledgerStep);
  assert.match(ledgerStep.body, /2x/);
  assert.match(ledgerStep.body, /recovered, attributable revenue/i);
});

test("diagnostic window and report contents are intact", () => {
  const diag = bp.blueprintFlow.steps[0];
  assert.match(diag.body, /[Ff]ive to seven business days/);
  const names = bp.blueprintReport.items.map((i) => i.name);
  assert.deepEqual(names, [
    "Workflow map",
    "Ranked AI opportunities",
    "Curated tool stack",
    "90-day implementation roadmap",
  ]);
});

test("GC walkthrough framing matches the pay-after-call flow", () => {
  assert.match(bp.blueprint.gcFraming.heading, /walkthrough and an estimate/i);
  assert.match(bp.blueprint.gcFraming.body, /pay only if/i);
});

test("no outcome promises, ROI claims, or prohibited claims", () => {
  assert.deepEqual(findProhibitedClaims(claimBlob), []);
  assert.doesNotMatch(claimBlob, /guarantee[sd]?\s+(revenue|results|roi|savings)/i);
  assert.doesNotMatch(claimBlob, /\bROI\b/);
  assert.doesNotMatch(claimBlob, /\$1,?499/); // future price stays internal
  assert.doesNotMatch(claimBlob, /effectively free.*guarantee/i);
});

test("vendor subscriptions are client-owned and direct-billed", () => {
  assert.match(bp.blueprint.priceNote, /billed directly to you/i);
  const faqBlob = bp.blueprintFaq.map((f) => f.a).join(" ");
  assert.match(faqBlob, /opened in your name/i);
});
