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
