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
  showPilotPrice,
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
  "showPilotPrice",
]);

const copyStrings: string[] = [];
for (const [key, value] of Object.entries(content)) {
  if (GUARDRAIL_EXPORTS.has(key)) continue;
  collectStrings(value, copyStrings);
}
const copyBlob = copyStrings.join("\n");

const pageSources = [
  "src/app/hvac/founding-five/page.tsx",
  "src/app/hvac/founding-five/FoundingFiveForm.tsx",
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
  ];
  let scan = copyBlob;
  for (const phrase of APPROVED_NEGATIONS) scan = scan.split(phrase).join("");
  assert.deepEqual(findProhibitedClaims(scan), []);
});

test("no calendar references in copy or rendered page source", () => {
  assert.deepEqual(findCalendarReferences(copyBlob), []);
  assert.deepEqual(findCalendarReferences(pageSources), []);
});

test("price copy is gated by SHOW_HVAC_PILOT_PRICE", () => {
  assert.equal(showPilotPrice({}), false);
  assert.equal(showPilotPrice({ SHOW_HVAC_PILOT_PRICE: "false" }), false);
  assert.equal(showPilotPrice({ SHOW_HVAC_PILOT_PRICE: "true" }), true);
  // The page only renders the gated price behind the flag.
  assert.ok(pageSources.includes("priceVisible &&"));
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

// --- Strategic Alliance positioning (added with the 2026-08 repositioning) ---

test("offer sells the four-workflow system, never a single workflow", () => {
  assert.match(offer.heading, /Always together/i);
  assert.equal(offer.workflows.length, 4);
  assert.match(offer.workflows[0], /Missed-call recovery/);
  assert.match(offer.workflows[1], /Estimate continuity/);
  assert.match(offer.workflows[2], /Customer reactivation/);
  assert.match(offer.workflows[3], /Referral continuity/);
  assert.match(offer.intro, /no partner is sold one workflow/i);
});

test("hero leads with the Strategic Alliance application posture", () => {
  assert.match(hero.title, /Strategic Alliances/i);
  assert.match(hero.primaryCta, /Apply/i);
  assert.doesNotMatch(hero.proofStrip, /One workflow/);
});

test("terms are Blueprint-first: findings call, then $799 report, launch range, arrears billing", () => {
  assert.match(pricing.body, /diagnostic and findings call first/i);
  assert.match(pricing.body, /\$799 findings report/);
  assert.match(pricing.body, /credits in full/i);
  assert.match(pricing.body, /\$2,500\u2013\$4,500|\$2,500.\$4,500/);
  assert.match(pricing.body, /2x/);
  assert.doesNotMatch(pricing.body, /\$1,?000\s*(per|\/|a)?\s*(business\s*)?week/i);
  assert.doesNotMatch(pricing.body, /\$3,?500/);
  assert.doesNotMatch(pricing.gatedPrice, /\$3,?500/);
});

test("faq explains the conditional fee-waiver instead of denying a guarantee", () => {
  const g = faq.find((f) => /guarantee revenue/i.test(f.q));
  assert.ok(g);
  assert.match(g.a, /fee structure, not an outcome/i);
  assert.doesNotMatch(g.a, /^No\./);
});

test("founder story keeps credential discipline and includes the 2019 book", () => {
  const joined = founder.body.join(" ");
  assert.match(joined, /HVAC certification training in 2012/);
  assert.match(joined, /independent residential contractor/);
  assert.match(joined, /2019/);
  assert.match(joined, /book/i);
  assert.doesNotMatch(joined, /licensed HVAC/i);
});

test("service schema describes the alliance, not a one-workflow pilot", () => {
  const ld = buildServiceLd();
  assert.match(ld.name, /Revenue Continuity System/i);
  assert.doesNotMatch(ld.name, /Pilot/i);
});
