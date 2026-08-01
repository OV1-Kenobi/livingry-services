import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as content from "../src/lib/hvac-founding-five/content";
import {
  findFabrications,
  findScheduledClaims,
  findProhibitedClaims,
  findCalendarReferences,
  leakproofingMap,
  identity,
  sealedSystemPrinciple,
  hero,
} from "../src/lib/hvac-founding-five/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// Same guardrail-aware string collection used by the content test: scan
// visitor-facing copy, not the pattern machinery whose labels are literally
// the phrases we ban.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

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

const pageSource = readFileSync(resolve(root, "src/app/hvac/founding-five/page.tsx"), "utf8");
const adapterSource = readFileSync(resolve(root, "src/lib/hvac-founding-five/adapters.ts"), "utf8");
const allianceFormSource = readFileSync(resolve(root, "src/app/hvac/founding-five/AllianceApplicationForm.tsx"), "utf8");
const pageSources = [pageSource, allianceFormSource].join("\n");

test("no fabricated names, revenue figures, or case-study details in public copy", () => {
  assert.deepEqual(findFabrications(copyBlob), []);
  assert.deepEqual(findFabrications(pageSources), []);
});

test("no scheduled-assessment language in copy, page, or applicant email", () => {
  assert.deepEqual(findScheduledClaims(copyBlob), []);
  assert.deepEqual(findScheduledClaims(pageSources), []);
  assert.deepEqual(findScheduledClaims(adapterSource), []);
});

test("no over-promising prohibited claims after new patterns added", () => {
  const APPROVED_NEGATIONS = [
    "You do not need to commit to an AI transformation.",
    "Do you guarantee revenue?",
    "The company wants guaranteed revenue.",
  ];
  let scan = copyBlob;
  for (const phrase of APPROVED_NEGATIONS) scan = scan.split(phrase).join("");
  assert.deepEqual(findProhibitedClaims(scan), []);
});

test("this funnel does not introduce roofing", () => {
  // \b so we don't match the "roofing" substring inside "leakproofing".
  assert.doesNotMatch(copyBlob, /\broofing\b/i);
  assert.doesNotMatch(pageSource, /\broofing\b/i);
});

test("no trademark clutter (™) in copy or page", () => {
  assert.doesNotMatch(copyBlob, /™/);
  assert.doesNotMatch(pageSource, /™/);
});

test("no calendar anywhere in the funnel", () => {
  assert.deepEqual(findCalendarReferences(copyBlob), []);
  assert.deepEqual(findCalendarReferences(pageSources), []);
});

test("central belief is present and verbatim", () => {
  assert.equal(sealedSystemPrinciple, "A system that is unsealed cannot be scaled.");
  assert.equal(hero.belief, sealedSystemPrinciple);
  assert.ok(pageSource.includes("hero.belief"), "hero belief is rendered on the page");
});

test("seven-part map has exactly seven layers with plain names", () => {
  assert.equal(leakproofingMap.layers.length, 7);
  const names = leakproofingMap.layers.map((l) => l.name);
  assert.deepEqual(names, [
    "Intake capture",
    "Leak detection",
    "TradeOps context",
    "Routing and assignment",
    "Escalation and follow-through",
    "Field handoff",
    "Close and continuity",
  ]);
  // Numbered 1..7 in order.
  assert.deepEqual(leakproofingMap.layers.map((l) => l.n), [1, 2, 3, 4, 5, 6, 7]);
});

test("seven-part map renders server-side and states it is a diagnostic map, not a promise", () => {
  // Page is a server component (no "use client"), so the map is in server HTML
  // and understandable without JavaScript.
  assert.ok(!/^\s*["']use client["']/m.test(pageSource), "page must be a server component");
  assert.ok(pageSource.includes("leakproofingMap.layers.map"), "layers are rendered");
  assert.ok(pageSource.includes("leakproofingMap.disclaimer"), "disclaimer is rendered");
  assert.match(leakproofingMap.disclaimer, /diagnostic map, not a promise/i);
  assert.match(leakproofingMap.disclaimer, /does not rebuild all seven layers/i);
});

test("operator identity is defined as a way of working, not a membership", () => {
  assert.ok(pageSource.includes("identity.body"), "identity copy is rendered");
  assert.match(identity.body, /not a membership/i);
  assert.match(identity.body, /leakproof operator/i);
});
