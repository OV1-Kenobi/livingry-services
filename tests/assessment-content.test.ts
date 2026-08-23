import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  ASSESSMENT_ROUTE,
  BANDS,
  CATEGORIES,
  CHOICES,
  CONTROLS,
} from "../src/lib/assessment/controls";
import { TRIAGE_ROUTE } from "../src/lib/assessment/scoring";
import { PROHIBITED_PATTERNS, FABRICATION_PATTERNS } from "../src/lib/hvac-founding-five/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const read = (rel: string) => readFileSync(resolve(root, rel), "utf8");

const pageSource = read("src/app/assessment/page.tsx");
const formSource = read("src/app/assessment/AssessmentForm.tsx");
const controlsSource = read("src/lib/assessment/controls.ts");

/** All visitor-facing copy for the assessment, as one blob. */
const copy = [
  ...CONTROLS.flatMap((c) => [c.title, c.question, c.evidence]),
  ...CATEGORIES.flatMap((c) => [c.title, c.shorthand, c.summary]),
  ...CHOICES.flatMap((c) => [c.label, c.blurb]),
  ...BANDS.flatMap((b) => [b.label, b.condition, b.guidance]),
].join("\n");

// --- Route + wiring ------------------------------------------------------

test("the canonical route is /assessment", () => {
  assert.equal(ASSESSMENT_ROUTE, "/assessment");
});

test("the route is registered in the sitemap", () => {
  assert.match(read("src/app/sitemap.ts"), /"\/assessment"/);
});

test("the route is reachable from the public header and footer", () => {
  assert.match(read("src/components/Header.tsx"), /href="\/assessment"/);
  assert.match(read("src/components/Footer.tsx"), /href="\/assessment"/);
});

test("the existing booking funnel cross-links to the assessment without replacing itself", () => {
  const leakAssessment = read("src/app/leak-assessment/page.tsx");
  assert.match(leakAssessment, /href: "\/assessment"/);
  // The calendar remains the primary CTA on that page.
  assert.match(leakAssessment, /site\.booking\.url/);
});

test("the assessment sends its CTA to the Leak Assessment page, not an invented booking link", () => {
  assert.equal(TRIAGE_ROUTE, "/leak-assessment");
  const external = /https?:\/\/(?!livingry\.services)/g;
  assert.equal(formSource.match(external), null, "assessment form links off-site");
  for (const pattern of [/calendly\.com/i, /cal\.com/i, /calendar\.app\.google/i]) {
    assert.ok(!pattern.test(formSource), `form hardcodes a booking vendor: ${pattern}`);
  }
});

// --- Metadata ------------------------------------------------------------

test("the page declares the intended title, canonical, and Open Graph data", () => {
  // Official diagnostic name per founder Decision 2 (2026-08-22).
  assert.match(pageSource, /HVAC Cash Flow Leak Diagnostic \| Livingry Services/);
  assert.match(pageSource, /canonical: "\/assessment"/);
  assert.match(pageSource, /openGraph:/);
  assert.match(pageSource, /twitter:/);
});

test("the meta description is under 160 characters", () => {
  const match = pageSource.match(/const DESCRIPTION =\s*\n?\s*"([^"]+)"/);
  assert.ok(match, "could not read DESCRIPTION");
  const description = match[1];
  assert.ok(
    description.length < 160,
    `description is ${description.length} characters: ${description}`,
  );
  assert.ok(description.length > 60, "description is too short to be useful");
});

// --- Positioning guardrails ---------------------------------------------

test("assessment copy contains no prohibited claim from the positioning guide", () => {
  for (const { label, pattern } of PROHIBITED_PATTERNS) {
    assert.ok(!pattern.test(copy), `prohibited claim in assessment copy: ${label}`);
  }
});

test("assessment page and form contain no prohibited claim", () => {
  for (const { label, pattern } of PROHIBITED_PATTERNS) {
    assert.ok(!pattern.test(pageSource), `prohibited claim on the page: ${label}`);
    assert.ok(!pattern.test(formSource), `prohibited claim in the form: ${label}`);
  }
});

test("assessment copy invents no proof, owner, or revenue figure", () => {
  for (const { label, pattern } of FABRICATION_PATTERNS) {
    assert.ok(!pattern.test(copy), `fabricated detail in assessment copy: ${label}`);
    assert.ok(!pattern.test(pageSource), `fabricated detail on the page: ${label}`);
  }
});

test("results promise no revenue outcome", () => {
  const revenueClaims = [
    /\bguarantee/i,
    /\bwill (increase|recover|earn|make) you\b/i,
    /\bROI\b/,
    /\b\$\d/,
    /\d+%\s*(more|increase|lift|growth)/i,
  ];
  for (const pattern of revenueClaims) {
    assert.ok(!pattern.test(copy), `revenue promise in copy: ${pattern}`);
    assert.ok(!pattern.test(formSource), `revenue promise in the result view: ${pattern}`);
  }
});

test("results do not shame the visitor", () => {
  const shaming = [
    /\byou (are|'re) (failing|losing|bleeding)\b/i,
    /\bembarrass/i,
    /\bexcuse\b/i,
    /\bshould be ashamed\b/i,
    /\bnegligen/i,
    /\bincompeten/i,
    /\blazy\b/i,
    /\bfault\b/i,
    /\bblame\b/i,
  ];
  for (const pattern of shaming) {
    assert.ok(!pattern.test(copy), `shaming language in copy: ${pattern}`);
    assert.ok(!pattern.test(formSource), `shaming language in the result view: ${pattern}`);
  }
});

test("this is the independent Livingry site — no OpenAgents references", () => {
  for (const source of [pageSource, formSource, controlsSource]) {
    assert.ok(!/openagents/i.test(source), "OpenAgents reference found");
  }
});

// --- Result copy requirements -------------------------------------------

test("the result explains that the score is directional and needs verification", () => {
  assert.match(formSource, /directional/i);
  for (const word of ["records", "timestamps", "reports", "workflow"]) {
    assert.ok(
      new RegExp(word, "i").test(formSource),
      `the verification caveat omits "${word}"`,
    );
  }
});

test("the CTA states the validation promises without timing claims", () => {
  // Decision 24: no timing claims — the former "15-minute Leak Triage" framing
  // was removed with it.
  assert.match(formSource, /Validate This Leak With Michael/);
  assert.ok(!/15-minute/.test(formSource), "no duration promise may remain in the form");
  assert.match(formSource, /No new software recommendation/i);
  assert.match(formSource, /No ad-spend pitch/i);
  assert.match(formSource, /escaping from the systems you already run/i);
});

test("the page tells the visitor their answers are not stored or transmitted", () => {
  assert.match(pageSource, /Nothing you enter is stored or transmitted/i);
});

// --- Control and band vocabulary ----------------------------------------

test("the four choices are labelled 0 Open leak, 1 Patched, 2 Controlled, 3 Sealed", () => {
  assert.deepEqual(
    CHOICES.map((c) => [c.value, c.label]),
    [
      [0, "Open leak"],
      [1, "Patched"],
      [2, "Controlled"],
      [3, "Sealed"],
    ],
  );
});

test("the four bands are labelled Exposed, Patched, Controlled, Sealed", () => {
  assert.deepEqual(
    BANDS.map((b) => b.label),
    ["Exposed", "Patched", "Controlled", "Sealed"],
  );
});

test("categories are numbered as the seven published leakproofing layers", () => {
  assert.deepEqual(
    CATEGORIES.map((c) => c.layer),
    [1, 2, 3, 4, 5, 6, 7],
  );
});

test("every control asks a question and offers an evidence prompt", () => {
  for (const control of CONTROLS) {
    assert.ok(control.title.length > 10, `control ${control.id} has a thin title`);
    assert.match(control.question, /\?$/, `control ${control.id} does not ask a question`);
    assert.ok(control.evidence.length > 30, `control ${control.id} has a thin evidence prompt`);
  }
});

test("questions stay short enough for a business owner to answer without the field guide", () => {
  for (const control of CONTROLS) {
    const words = control.question.trim().split(/\s+/).length;
    assert.ok(words <= 40, `control ${control.id} asks a ${words}-word question`);
  }
});

test("control titles are unique", () => {
  const titles = CONTROLS.map((c) => c.title);
  assert.equal(new Set(titles).size, titles.length);
});

// --- Accessibility affordances present in the markup --------------------

test("controls render as fieldsets with legends and native radios", () => {
  assert.match(formSource, /<fieldset/);
  assert.match(formSource, /<legend/);
  assert.match(formSource, /type="radio"/);
});

test("progress and score changes are announced to screen readers", () => {
  assert.match(formSource, /role="status"/);
  assert.match(formSource, /aria-live="polite"/);
  assert.match(formSource, /role="progressbar"/);
});

test("an incomplete attempt raises an alert instead of a result", () => {
  assert.match(formSource, /role="alert"/);
  assert.match(formSource, /still\s*\n?\s*unanswered/);
});

test("reset and print affordances exist", () => {
  assert.match(formSource, /Start over/);
  assert.match(formSource, /window\.print\(\)/);
});

test("no browser storage is used, so there is nothing stale to reset", () => {
  for (const source of [formSource, pageSource]) {
    assert.ok(!/localStorage|sessionStorage|document\.cookie/.test(source));
  }
});
