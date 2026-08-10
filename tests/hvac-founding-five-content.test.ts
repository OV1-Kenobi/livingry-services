import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as content from "../src/lib/hvac-founding-five/content";
import {
  buildFaqLd,
  buildServiceLd,
  buildBreadcrumbLd,
  directAnswer,
  faq,
  findCalendarReferences,
  findProhibitedClaims,
  founder,
  hero,
  offer,
  pricing,
  HVAC_ROUTE,
} from "../src/lib/hvac-founding-five/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// Recursively collect every string value exported by the content module.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

// Scan only visitor-facing copy, not the guardrail machinery (whose labels are
// literally the prohibited phrases) or structured-data builders.
const GUARDRAIL_EXPORTS = new Set([
  "default",
  "PROHIBITED_PATTERNS",
  "CALENDAR_PATTERNS",
  "FABRICATION_PATTERNS",
  "SCHEDULED_PATTERNS",
  "findProhibitedClaims",
  "findCalendarReferences",
  "findFabrications",
  "findScheduledClaims",
  "buildBreadcrumbLd",
  "buildServiceLd",
  "buildFaqLd",
]);

const copyStrings: string[] = [];
for (const [key, value] of Object.entries(content)) {
  if (GUARDRAIL_EXPORTS.has(key)) continue;
  collectStrings(value, copyStrings);
}
const copyBlob = copyStrings.join("\n");

const pageSources = [
  "src/app/hvac/founding-five/page.tsx",
  "src/app/hvac/founding-five/RevenueLeakScorecard.tsx",
]
  .map((p) => readFileSync(resolve(root, p), "utf8"))
  .join("\n");

test("route is the canonical /hvac/founding-five", () => {
  assert.equal(HVAC_ROUTE, "/hvac/founding-five");
});

test("directAnswer is 40–80 words", () => {
  const words = directAnswer.trim().split(/\s+/).length;
  assert.ok(words >= 40 && words <= 80, `directAnswer is ${words} words`);
});

test("no prohibited claims in public copy", () => {
  // The approved brief copy uses two flagged phrases in explicitly negating /
  // disclaiming form ("You do not need to commit to an AI transformation", "Do
  // you guarantee revenue? No."). Those are intended; strip them so the scan
  // still catches any *positive* prohibited claim introduced elsewhere.
  const APPROVED_NEGATIONS = [
    "You do not need to commit to an AI transformation.",
    "Do you guarantee revenue?",
    "The company wants guaranteed revenue.",
    "Is there a fee-waiver guarantee?",
    "No. Livingry does not offer any fee-waiver guarantee.",
    "does not guarantee revenue",
    "do not guarantee revenue",
  ];
  let scan = copyBlob;
  for (const phrase of APPROVED_NEGATIONS) scan = scan.split(phrase).join("");
  assert.deepEqual(findProhibitedClaims(scan), []);
});

test("no calendar references in copy or rendered page source", () => {
  assert.deepEqual(findCalendarReferences(copyBlob), []);
  assert.deepEqual(findCalendarReferences(pageSources), []);
});

test("the all-in pilot price is always visible, never gated", () => {
  assert.equal(pricing.pilotPrice, "$2,500 all-in");
  assert.ok(pageSources.includes("pricing.pilotPrice"), "the pilot price is rendered from the content constant");
  assert.doesNotMatch(pageSources, /SHOW_HVAC_PILOT_PRICE/);
});

test("FAQ JSON-LD matches the visible FAQ", () => {
  const ld = buildFaqLd();
  assert.equal(ld["@type"], "FAQPage");
  assert.equal(ld.mainEntity.length, faq.length);
  assert.equal(ld.mainEntity[0].name, faq[0].q);
});

test("Service JSON-LD targets United States + established HVAC audience", () => {
  const ld = buildServiceLd();
  assert.equal(ld["@type"], "Service");
  assert.equal(ld.areaServed.name, "United States");
  assert.match(ld.audience.audienceType, /HVAC/i);
});

test("Breadcrumb JSON-LD ends at the founding-five route", () => {
  const ld = buildBreadcrumbLd();
  const last = ld.itemListElement[ld.itemListElement.length - 1];
  assert.match(String(last.item), /\/hvac\/founding-five$/);
});

// --- Founding Five Tier 2 Pilot positioning (2026-08 rollover) ---

test("offer sells the three foundations, never a single foundation alone", () => {
  assert.match(offer.heading, /Always together/i);
  assert.equal(offer.foundations.length, 3);
  assert.match(offer.foundations[0], /^Missed-Call Recovery/);
  assert.match(offer.foundations[1], /^Dropped-Estimate Recovery/);
  assert.match(offer.foundations[2], /^Agentic Search Optimization/);
  assert.match(offer.intro, /no partner is sold one foundation as the complete pilot/i);
});

test("hero leads with the scorecard / pilot posture", () => {
  assert.match(hero.title, /Stop buying more leads/);
  assert.match(hero.primaryCta, /Scorecard/);
  assert.doesNotMatch(hero.proofStrip, /One workflow/);
});

test("terms are pilot-first: $2,500 all-in, always visible, Tier 3 threshold", () => {
  assert.equal(pricing.pilotPrice, "$2,500 all-in");
  assert.match(pricing.body, /all-in for five HVAC\/R companies/);
  assert.match(pricing.body, /\$199 Revenue Continuity Assessment/);
  assert.match(pricing.body, /not credited and not added/);
  assert.match(pricing.tier3, /\$1,000\/week/);
  assert.match(pricing.tier3, /first four weekly cycles are delivered unpaid/);
  assert.match(pricing.tier3, /\$10,000/);
  assert.match(pricing.noGuarantee, /does not guarantee revenue/i);
});

test("faq states the all-in price and answers the guarantee question", () => {
  const g = faq.find((f) => /guarantee revenue/i.test(f.q));
  assert.ok(g);
  assert.match(g.a, /(does not guarantee|never promise) revenue/i);
  assert.match(g.a, /Recovery Ledger/i);
  const p = faq.find((f) => /What do we pay, and when/i.test(f.q));
  assert.ok(p);
  assert.match(p.a, /\$2,500 all-in/);
});

test("founder story keeps credential discipline and includes the 2019 book", () => {
  const joined = founder.body.join(" ");
  assert.match(joined, /HVAC certification training in 2012/);
  assert.match(joined, /(solo|independent) residential contractor/);
  assert.match(joined, /2019/);
  assert.match(joined, /book/i);
  // Training, never current licensure. Explicit negation strings ("No licensed
  // HVAC work...", deferred-fit descriptions) are stripped before scanning.
  const negations = [...content.humanControl.items, content.humanControl.body, ...content.fit.isNot];
  let scan = copyBlob;
  for (const s of negations) scan = scan.split(s).join("");
  assert.doesNotMatch(scan, /licensed HVAC/i);
  assert.doesNotMatch(scan, /currently certified/i);
});

test("service schema describes the Founding Five Tier 2 Pilot", () => {
  const ld = buildServiceLd();
  assert.match(ld.name, /Founding Five Tier 2 Pilot/);
  assert.match(ld.name, /HVAC/i);
});
