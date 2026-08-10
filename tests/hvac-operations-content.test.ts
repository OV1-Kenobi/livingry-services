import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as content from "../src/lib/hvac-operations/content";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// Recursively collect every string value exported by the content module.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

const copyStrings: string[] = [];
for (const value of Object.values(content)) {
  collectStrings(value, copyStrings);
}
const copyBlob = copyStrings.join("\n");

const pageSource = readFileSync(
  resolve(root, "src/app/operations/hvac/page.tsx"),
  "utf8",
);

test("route is the canonical /operations/hvac", () => {
  assert.equal(content.HVAC_OPS_ROUTE, "/operations/hvac");
});

test("hero leads with the follow-up problem and four cracks", () => {
  assert.match(content.hero.title, /follow-up problem/i);
  assert.match(content.hero.lede, /four cracks/i);
  assert.match(content.hero.lede, /Revenue Continuity System/i);
  assert.match(content.hero.trustLine, /Founding Five scorecard/);
  assert.match(content.hero.trustLine, /five leak sources/);
  assert.match(content.hero.trustLine, /shared proof ledger/);
});

test("lifecycle flow covers inquiry through customer continuity", () => {
  assert.equal(content.lifecycleStages[0], "Inquiry");
  assert.equal(
    content.lifecycleStages[content.lifecycleStages.length - 1],
    "Customer Continuity",
  );
  assert.ok(content.lifecycleStages.length >= 6);
});

test("leak map has six operational stages with a leak and a focus each", () => {
  assert.equal(content.problem.stages.length, 6);
  for (const s of content.problem.stages) {
    assert.ok(s.stage.length > 0);
    assert.ok(s.leak.length > 0);
    assert.ok(s.focus.length > 0);
  }
});

test("TradeOps diagram uses tool categories, never vendor names", () => {
  const vendorNames = /jobber|servicetitan|housecall|\bela\b/i;
  for (const tool of content.tradeops.sourceTools) {
    assert.doesNotMatch(tool, vendorNames);
  }
  assert.equal(content.tradeops.components.length, 4);
  const names = content.tradeops.components.map((c) => c.name);
  assert.deepEqual(names, [
    "Canonical events",
    "Policy gates",
    "Human approvals",
    "Leak dashboards",
  ]);
});

test("method outputs name a tangible artifact for each framework stage", () => {
  assert.equal(content.methodOutputs.length, 5);
  const names = content.methodOutputs.map((m) => m.name);
  assert.deepEqual(names, ["Find", "Trace", "Seal", "Verify", "Keep"]);
  for (const m of content.methodOutputs) {
    assert.ok(m.output.length > 0);
  }
});

test("engagement formats are concrete and qualified", () => {
  assert.equal(content.engagement.offers.length, 3);
  const names = content.engagement.offers.map((o) => o.name);
  assert.deepEqual(names, ["HVAC Leak Review", "Recovery Sprint", "TradeOps Foundation"]);
  for (const o of content.engagement.offers) {
    assert.ok(o.outcome.length > 0);
    assert.ok(o.deliverables.length >= 4);
  }
  assert.match(content.engagement.qualification, /established HVAC teams/i);
});

test("copy carries no prohibited claims", () => {
  const violations = findProhibitedClaims(copyBlob);
  assert.deepEqual(violations, []);
});

test("copy makes no unverified outcome claims", () => {
  assert.doesNotMatch(copyBlob, /guarantee/i);
  assert.doesNotMatch(copyBlob, /\bROI\b/i);
  assert.doesNotMatch(copyBlob, /increase revenue/i);
  assert.doesNotMatch(copyBlob, /all-in-one/i);
});

test("page links the intake anchor and both conversion paths", () => {
  assert.match(pageSource, /href="#leak-review"/);
  assert.match(pageSource, /id="leak-review"/);
  assert.match(pageSource, /\/hvac\/founding-five#scorecard/);
  assert.match(pageSource, /\/hvac\/founding-five#ff-path/);
});

test("foundingFive block reflects the rollover to the Founding Five pilot", () => {
  assert.equal(content.foundingFive.primaryCta, "Apply for a Strategic Alliance");
  assert.equal(content.foundingFive.secondaryCta, "See the Founding Five Path");
  assert.match(content.foundingFive.body, /Founding Five scorecard/);
  assert.match(content.foundingFive.body, /\$2,500 all-in/);
  assert.match(content.foundingFive.body, /Recovery Ledger/);
});

test("foundingFive and hero trust lines do not promise outcomes", () => {
  assert.doesNotMatch(content.foundingFive.body, /guarantee[d]? revenue/i);
  assert.doesNotMatch(content.hero.trustLine, /guarantee[d]? revenue/i);
});

test("page exposes analytics hooks without PII", () => {
  assert.match(pageSource, /data-analytics="hvac-ops-hero-primary"/);
  assert.match(pageSource, /data-analytics="hvac-ops-hero-secondary"/);
  assert.match(pageSource, /data-analytics="hvac-ops-intake"/);
  assert.match(pageSource, /data-analytics="hvac-ops-fit-call"/);
  assert.match(pageSource, /data-analytics-view="leak-map"/);
  assert.match(pageSource, /data-analytics-view="tradeops"/);
});

test("SEO metadata matches the approved title and description", () => {
  assert.equal(content.seo.title, "HVAC Operations Systems | Livingry Services");
  assert.match(content.seo.description, /lost inquiries/i);
  assert.match(content.seo.description, /tools they already use/i);
});

test("structured data stays within accurate schema types", () => {
  assert.match(pageSource, /"@type": "Service"/);
  assert.match(pageSource, /"@type": "WebPage"/);
  assert.doesNotMatch(pageSource, /"@type": "Review"/);
  assert.doesNotMatch(pageSource, /"@type": "AggregateRating"/);
  assert.doesNotMatch(pageSource, /"@type": "FAQPage"/);
});

test("event names are unique and namespaced", () => {
  const events = Object.values(content.HVAC_OPS_EVENTS);
  assert.equal(new Set(events).size, events.length);
  for (const e of events) {
    assert.match(e, /^hvac_ops_/);
  }
});
