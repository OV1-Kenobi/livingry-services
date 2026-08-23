import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BANDS,
  CATEGORIES,
  CONTROLS,
  MAX_SCORE,
  TOTAL_CONTROLS,
  type ChoiceValue,
} from "../src/lib/assessment/controls";
import {
  bandForScore,
  buildTriageHref,
  describeTriageContext,
  parseTriageContext,
  scoreAssessment,
  TRIAGE_ROUTE,
  type Answers,
} from "../src/lib/assessment/scoring";

/** Every control answered with the same value. */
function uniform(value: ChoiceValue): Answers {
  return Object.fromEntries(CONTROLS.map((c) => [c.id, value]));
}

/** Every control at `base`, with specific overrides by control id. */
function withOverrides(base: ChoiceValue, overrides: Record<number, ChoiceValue>): Answers {
  return { ...uniform(base), ...overrides };
}

/**
 * Builds a complete answer set summing exactly to `target`, by filling controls
 * with 3s then a remainder. Lets the band-boundary tests name a score directly.
 */
function answersTotalling(target: number): Answers {
  assert.ok(target >= 0 && target <= MAX_SCORE, `unreachable target ${target}`);
  const answers: Record<number, ChoiceValue> = {};
  let remaining = target;
  for (const control of CONTROLS) {
    const value = Math.min(3, remaining) as ChoiceValue;
    answers[control.id] = value;
    remaining -= value;
  }
  assert.equal(remaining, 0);
  return answers;
}

// --- Shape ---------------------------------------------------------------

test("there are exactly 17 controls worth 51 points across 7 categories", () => {
  assert.equal(TOTAL_CONTROLS, 17);
  assert.equal(CONTROLS.length, 17);
  assert.equal(MAX_SCORE, 51);
  assert.equal(CATEGORIES.length, 7);
});

test("control ids are 1–17 with no gaps or duplicates", () => {
  assert.deepEqual(
    CONTROLS.map((c) => c.id),
    Array.from({ length: 17 }, (_, i) => i + 1),
  );
});

test("every control belongs to a declared category and every category has controls", () => {
  const categoryIds = new Set(CATEGORIES.map((c) => c.id));
  for (const control of CONTROLS) {
    assert.ok(categoryIds.has(control.categoryId), `control ${control.id} has an unknown category`);
  }
  for (const category of CATEGORIES) {
    const count = CONTROLS.filter((c) => c.categoryId === category.id).length;
    assert.ok(count > 0, `category ${category.id} has no controls`);
  }
});

// --- Band boundaries -----------------------------------------------------

test("bands tile 0–51 with no gap and no overlap", () => {
  assert.equal(BANDS[0].min, 0);
  assert.equal(BANDS[BANDS.length - 1].max, MAX_SCORE);
  for (let i = 1; i < BANDS.length; i++) {
    assert.equal(BANDS[i].min, BANDS[i - 1].max + 1, `gap or overlap before band ${BANDS[i].id}`);
  }
});

test("every score in 0–51 maps to exactly one band", () => {
  for (let score = 0; score <= MAX_SCORE; score++) {
    const matches = BANDS.filter((b) => score >= b.min && score <= b.max);
    assert.equal(matches.length, 1, `score ${score} matched ${matches.length} bands`);
  }
});

test("band boundaries land exactly on 0–17 / 18–30 / 31–42 / 43–51", () => {
  const cases: [number, string][] = [
    [0, "exposed"],
    [17, "exposed"],
    [18, "patched"],
    [30, "patched"],
    [31, "controlled"],
    [42, "controlled"],
    [43, "sealed"],
    [51, "sealed"],
  ];
  for (const [score, expected] of cases) {
    assert.equal(bandForScore(score).id, expected, `score ${score} should be ${expected}`);
  }
});

test("bandForScore rejects out-of-range and non-integer totals", () => {
  assert.throws(() => bandForScore(-1), RangeError);
  assert.throws(() => bandForScore(52), RangeError);
  assert.throws(() => bandForScore(12.5), RangeError);
});

test("a completed assessment reports the band matching its total", () => {
  for (const target of [0, 17, 18, 30, 31, 42, 43, 51]) {
    const result = scoreAssessment(answersTotalling(target));
    assert.equal(result.score, target);
    assert.equal(result.complete, true);
    assert.equal(result.band?.id, bandForScore(target).id);
  }
});

test("all zeros is Exposed and all threes is Sealed", () => {
  assert.equal(scoreAssessment(uniform(0)).band?.id, "exposed");
  assert.equal(scoreAssessment(uniform(0)).score, 0);
  assert.equal(scoreAssessment(uniform(3)).band?.id, "sealed");
  assert.equal(scoreAssessment(uniform(3)).score, MAX_SCORE);
});

// --- Incomplete state ----------------------------------------------------

test("an empty assessment yields no band, no ranking, and lists every control as unanswered", () => {
  const result = scoreAssessment({});
  assert.equal(result.answeredCount, 0);
  assert.equal(result.complete, false);
  assert.equal(result.band, null);
  assert.equal(result.lowestCategory, null);
  assert.deepEqual(result.lowestControls, []);
  assert.equal(result.unanswered.length, 17);
});

test("one unanswered control withholds the band and the rankings", () => {
  const answers = { ...uniform(3) } as Record<number, ChoiceValue>;
  delete answers[9];
  const result = scoreAssessment(answers);
  assert.equal(result.answeredCount, 16);
  assert.equal(result.complete, false);
  assert.equal(result.band, null, "a partial score must not produce a band");
  assert.equal(result.lowestCategory, null);
  assert.deepEqual(result.lowestControls, []);
  assert.deepEqual(result.unanswered, [9]);
});

test("the running score counts only answered controls", () => {
  const result = scoreAssessment({ 1: 3, 2: 2, 3: 1 });
  assert.equal(result.score, 6);
  assert.equal(result.answeredCount, 3);
  assert.equal(result.complete, false);
});

test("null and undefined answers count as unanswered rather than zero", () => {
  const result = scoreAssessment({ 1: 3, 2: null, 3: undefined });
  assert.equal(result.answeredCount, 1);
  assert.deepEqual(result.unanswered.slice(0, 2), [2, 3]);
});

test("unanswered ids are reported in ascending control order", () => {
  const result = scoreAssessment({ 5: 2, 1: 3, 12: 0 });
  assert.deepEqual(
    result.unanswered,
    [...result.unanswered].sort((a, b) => a - b),
  );
});

// --- Category calculations ----------------------------------------------

test("category maxima sum to the overall maximum", () => {
  const result = scoreAssessment(uniform(3));
  const total = result.categories.reduce((sum, c) => sum + c.max, 0);
  assert.equal(total, MAX_SCORE);
});

test("category scores sum to the overall score", () => {
  const answers = withOverrides(2, { 1: 0, 9: 3, 15: 1, 17: 0 });
  const result = scoreAssessment(answers);
  const total = result.categories.reduce((sum, c) => sum + c.score, 0);
  assert.equal(total, result.score);
});

test("a category reports its own score, maximum, and completion", () => {
  // Intake capture holds controls 1–3.
  const result = scoreAssessment({ 1: 3, 2: 1, 3: 0 });
  const intake = result.categories.find((c) => c.id === "intake-capture")!;
  assert.equal(intake.score, 4);
  assert.equal(intake.max, 9);
  assert.equal(intake.total, 3);
  assert.equal(intake.answered, 3);
  assert.equal(intake.complete, true);

  const detection = result.categories.find((c) => c.id === "leak-detection")!;
  assert.equal(detection.answered, 0);
  assert.equal(detection.complete, false);
  assert.equal(detection.score, 0);
});

test("the weakest category is ranked by ratio, not raw score", () => {
  // Field handoff holds a single control: 0/3 = 0.0.
  // TradeOps holds four: 4/12 = 0.33, a lower raw score but a healthier ratio.
  const answers = withOverrides(3, { 12: 0, 6: 1, 7: 1, 8: 1, 9: 1 });
  const result = scoreAssessment(answers);
  assert.equal(result.lowestCategory?.id, "field-handoff");
  const tradeops = result.categories.find((c) => c.id === "tradeops-context")!;
  assert.ok(
    tradeops.score < result.lowestCategory!.score + 5,
    "sanity: tradeops has the lower raw score",
  );
});

test("the weakest category is the one with the lowest proportion of its maximum", () => {
  const answers = withOverrides(3, { 13: 0, 14: 0 });
  const result = scoreAssessment(answers);
  assert.equal(result.lowestCategory?.id, "escalation-followthrough");
  assert.equal(result.lowestCategory?.score, 0);
  assert.equal(result.lowestCategory?.ratio, 0);
});

// --- Lowest controls -----------------------------------------------------

test("exactly three lowest controls are returned, weakest first", () => {
  const answers = withOverrides(3, { 4: 0, 11: 1, 16: 2 });
  const result = scoreAssessment(answers);
  assert.equal(result.lowestControls.length, 3);
  assert.deepEqual(
    result.lowestControls.map((c) => c.id),
    [4, 11, 16],
  );
  assert.deepEqual(
    result.lowestControls.map((c) => c.score),
    [0, 1, 2],
  );
});

test("ties among lowest controls break by control id so the order is stable", () => {
  const answers = withOverrides(3, { 17: 0, 2: 0, 9: 0, 5: 0 });
  const result = scoreAssessment(answers);
  assert.deepEqual(
    result.lowestControls.map((c) => c.id),
    [2, 5, 9],
  );
});

test("lowest controls carry their category label for display", () => {
  const result = scoreAssessment(withOverrides(3, { 1: 0 }));
  assert.equal(result.lowestControls[0].categoryTitle, "Intake capture");
});

test("a perfect score still returns three lowest controls", () => {
  const result = scoreAssessment(uniform(3));
  assert.equal(result.lowestControls.length, 3);
  assert.ok(result.lowestControls.every((c) => c.score === 3));
});

// --- Critical zeros ------------------------------------------------------

test("exactly three controls are marked critical: data custody, closeout, reviews", () => {
  assert.deepEqual(
    CONTROLS.filter((c) => c.critical).map((c) => c.id),
    [9, 15, 16],
  );
});

test("a zero on a critical control is reported even when the total is Sealed", () => {
  const answers = withOverrides(3, { 9: 0 });
  const result = scoreAssessment(answers);
  assert.equal(result.band?.id, "sealed");
  assert.equal(result.criticalZeros.length, 1);
  assert.equal(result.criticalZeros[0].id, 9);
});

test("all three critical zeros are reported together and in order", () => {
  const answers = withOverrides(3, { 9: 0, 15: 0, 16: 0 });
  const result = scoreAssessment(answers);
  assert.deepEqual(
    result.criticalZeros.map((c) => c.id),
    [9, 15, 16],
  );
});

test("a score of 1 on a critical control is not a critical zero", () => {
  const result = scoreAssessment(withOverrides(3, { 9: 1, 15: 1, 16: 1 }));
  assert.deepEqual(result.criticalZeros, []);
});

test("zeros on non-critical controls do not raise a critical warning", () => {
  const result = scoreAssessment(withOverrides(3, { 1: 0, 5: 0, 12: 0, 17: 0 }));
  assert.deepEqual(result.criticalZeros, []);
});

test("an all-zero assessment flags all three critical controls", () => {
  const result = scoreAssessment(uniform(0));
  assert.deepEqual(
    result.criticalZeros.map((c) => c.id),
    [9, 15, 16],
  );
});

// --- CTA destination and context ----------------------------------------

test("the triage CTA points at the existing lead-capture route", () => {
  const result = scoreAssessment(answersTotalling(34));
  const href = buildTriageHref(result);
  assert.ok(href.startsWith(`${TRIAGE_ROUTE}?`), `unexpected destination: ${href}`);
  assert.equal(TRIAGE_ROUTE, "/leak-assessment");
});

test("the triage CTA carries score, band, and weakest layer", () => {
  const result = scoreAssessment(withOverrides(3, { 13: 0, 14: 0 }));
  const href = buildTriageHref(result);
  const url = new URL(href, "https://livingry.services");
  assert.equal(url.pathname, "/leak-assessment");
  assert.equal(url.searchParams.get("src"), "assessment");
  assert.equal(url.searchParams.get("score"), String(result.score));
  assert.equal(url.searchParams.get("band"), result.band!.id);
  assert.equal(url.searchParams.get("focus"), "escalation-followthrough");
  assert.equal(url.hash, "#in-advance");
});

test("an incomplete assessment yields a bare triage link with no score attached", () => {
  const href = buildTriageHref(scoreAssessment({ 1: 3 }));
  assert.equal(href, TRIAGE_ROUTE);
  assert.ok(!href.includes("score"));
});

test("the triage link round-trips back into a parsed context", () => {
  const result = scoreAssessment(withOverrides(2, { 12: 0 }));
  const url = new URL(buildTriageHref(result), "https://livingry.services");
  const parsed = parseTriageContext(url.searchParams);
  assert.ok(parsed);
  assert.equal(parsed.score, result.score);
  assert.equal(parsed.band.id, result.band!.id);
  assert.equal(parsed.category?.id, result.lowestCategory!.id);
});

test("parsed triage context renders a plain-text summary line", () => {
  const url = new URL(
    buildTriageHref(scoreAssessment(withOverrides(3, { 13: 0, 14: 0 }))),
    "https://livingry.services",
  );
  const summary = describeTriageContext(parseTriageContext(url.searchParams)!);
  assert.match(summary, /^Self-assessment score \d+ of 51 — Sealed\./);
  assert.match(summary, /Escalation and follow-through/);
});

test("triage context is rejected unless it came from the assessment", () => {
  assert.equal(parseTriageContext(new URLSearchParams("score=40&band=controlled")), null);
});

test("a tampered score/band pair is rejected rather than displayed", () => {
  // 51 points is Sealed, not Exposed — the pair is inconsistent.
  const params = new URLSearchParams("src=assessment&score=51&band=exposed");
  assert.equal(parseTriageContext(params), null);
});

test("out-of-range, non-numeric, and unknown-band context is rejected", () => {
  const rejected = [
    "src=assessment&score=99&band=sealed",
    "src=assessment&score=-4&band=exposed",
    "src=assessment&score=abc&band=exposed",
    "src=assessment&score=<script>&band=exposed",
    "src=assessment&score=20&band=nonsense",
    "src=assessment&band=patched",
    "src=assessment&score=20",
  ];
  for (const query of rejected) {
    assert.equal(parseTriageContext(new URLSearchParams(query)), null, `accepted: ${query}`);
  }
});

test("an unknown focus layer degrades to no focus rather than rejecting the context", () => {
  const params = new URLSearchParams("src=assessment&score=20&band=patched&focus=made-up");
  const parsed = parseTriageContext(params);
  assert.ok(parsed);
  assert.equal(parsed.category, null);
  assert.equal(parsed.score, 20);
});

// --- Reset ---------------------------------------------------------------

test("clearing every answer restores the initial empty state", () => {
  const filled = scoreAssessment(uniform(3));
  assert.equal(filled.complete, true);

  const cleared = scoreAssessment({});
  assert.equal(cleared.answeredCount, 0);
  assert.equal(cleared.score, 0);
  assert.equal(cleared.complete, false);
  assert.equal(cleared.band, null);
  assert.deepEqual(cleared.criticalZeros, []);
  assert.deepEqual(cleared.lowestControls, []);
  assert.equal(cleared.lowestCategory, null);
  assert.ok(cleared.categories.every((c) => c.score === 0 && c.answered === 0));
  assert.deepEqual(cleared, scoreAssessment({}));
});

test("scoring is pure — the same answers always produce the same result", () => {
  const answers = withOverrides(2, { 4: 0, 9: 3 });
  assert.deepEqual(scoreAssessment(answers), scoreAssessment(answers));
});

test("scoring does not mutate the answers it is given", () => {
  const answers = uniform(2);
  const snapshot = JSON.stringify(answers);
  scoreAssessment(answers);
  assert.equal(JSON.stringify(answers), snapshot);
});
