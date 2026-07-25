// Pure scoring for the public 17-Point Operational Leak Assessment.
//
// No React, no DOM, no I/O — the form renders whatever this returns, and the
// unit tests exercise it directly.

import {
  BANDS,
  CATEGORIES,
  CONTROLS,
  MAX_SCORE,
  TOTAL_CONTROLS,
  type AssessmentBand,
  type AssessmentCategory,
  type BandId,
  type CategoryId,
  type ChoiceValue,
} from "./controls";

/** Control id → score. A missing or null entry means "not answered yet". */
export type Answers = Readonly<Record<number, ChoiceValue | null | undefined>>;

export interface ControlScore {
  id: number;
  title: string;
  categoryId: CategoryId;
  categoryTitle: string;
  score: ChoiceValue;
}

export interface CategoryScore {
  id: CategoryId;
  layer: number;
  title: string;
  shorthand: string;
  summary: string;
  /** Sum of answered controls in this category. */
  score: number;
  /** Highest score this category could reach. */
  max: number;
  answered: number;
  total: number;
  complete: boolean;
  /** score / max, 0–1. Categories differ in size, so ranking uses this. */
  ratio: number;
}

export interface AssessmentResult {
  totalControls: number;
  answeredCount: number;
  /** Control ids still unanswered, ascending. */
  unanswered: number[];
  complete: boolean;
  /** Sum of answered controls. Partial until `complete`. */
  score: number;
  maxScore: number;
  /**
   * Null until every control is answered. A band derived from a partial score
   * would read as a verdict on the whole operation, which it is not.
   */
  band: AssessmentBand | null;
  categories: CategoryScore[];
  /** Weakest category by ratio. Null until complete. */
  lowestCategory: CategoryScore | null;
  /** The three weakest controls. Empty until complete. */
  lowestControls: ControlScore[];
  /** Zeros on access, closeout/payment, or unresolved-issue handling. */
  criticalZeros: ControlScore[];
}

function isAnswer(value: unknown): value is ChoiceValue {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

/**
 * Maps a completed total to its operating condition.
 * Throws on out-of-range input rather than silently clamping — a total outside
 * 0–51 means the caller has a bug, and quietly returning "Exposed" would hide it.
 */
export function bandForScore(score: number): AssessmentBand {
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    throw new RangeError(`Score must be an integer between 0 and ${MAX_SCORE}, received ${score}`);
  }
  const band = BANDS.find((b) => score >= b.min && score <= b.max);
  if (!band) throw new RangeError(`No band covers score ${score}`);
  return band;
}

export function scoreAssessment(answers: Answers): AssessmentResult {
  const answered: ControlScore[] = [];
  const unanswered: number[] = [];

  for (const control of CONTROLS) {
    const value = answers[control.id];
    if (!isAnswer(value)) {
      unanswered.push(control.id);
      continue;
    }
    const category = CATEGORIES.find((c) => c.id === control.categoryId) as AssessmentCategory;
    answered.push({
      id: control.id,
      title: control.title,
      categoryId: control.categoryId,
      categoryTitle: category.title,
      score: value,
    });
  }

  const score = answered.reduce((sum, c) => sum + c.score, 0);
  const complete = unanswered.length === 0;

  const categories: CategoryScore[] = CATEGORIES.map((category) => {
    const inCategory = CONTROLS.filter((c) => c.categoryId === category.id);
    const scored = answered.filter((c) => c.categoryId === category.id);
    const categoryScore = scored.reduce((sum, c) => sum + c.score, 0);
    const max = inCategory.length * 3;
    return {
      id: category.id,
      layer: category.layer,
      title: category.title,
      shorthand: category.shorthand,
      summary: category.summary,
      score: categoryScore,
      max,
      answered: scored.length,
      total: inCategory.length,
      complete: scored.length === inCategory.length,
      ratio: categoryScore / max,
    };
  });

  // A zero is a zero whether or not the rest of the form is filled in, so this
  // does not wait for completion the way the band does.
  const criticalIds = new Set(CONTROLS.filter((c) => c.critical).map((c) => c.id));
  const criticalZeros = answered
    .filter((c) => c.score === 0 && criticalIds.has(c.id))
    .sort((a, b) => a.id - b.id);

  // Ranking is only meaningful once every control has a value; a partial
  // ranking would point at whichever weak spot happened to be filled in first.
  const lowestControls = complete
    ? [...answered].sort((a, b) => a.score - b.score || a.id - b.id).slice(0, 3)
    : [];

  const lowestCategory = complete
    ? [...categories].sort((a, b) => a.ratio - b.ratio || a.score - b.score || a.layer - b.layer)[0]
    : null;

  return {
    totalControls: TOTAL_CONTROLS,
    answeredCount: answered.length,
    unanswered,
    complete,
    score,
    maxScore: MAX_SCORE,
    band: complete ? bandForScore(score) : null,
    categories,
    lowestCategory,
    lowestControls,
    criticalZeros,
  };
}

/** Context handed to the existing lead-capture path when someone books a triage. */
export interface TriageContext {
  score: number;
  band: AssessmentBand;
  category: AssessmentCategory | null;
}

/** The existing qualified-lead path. The assessment does not invent its own. */
export const TRIAGE_ROUTE = "/system-review";
const TRIAGE_HASH = "in-advance";

/**
 * Builds the triage link for a completed assessment. The score, band, and
 * weakest layer ride along as query params so the intake form can carry them
 * into the existing submission payload.
 */
export function buildTriageHref(result: AssessmentResult): string {
  if (!result.complete || !result.band) return TRIAGE_ROUTE;
  const params = new URLSearchParams({
    src: "assessment",
    score: String(result.score),
    band: result.band.id,
  });
  if (result.lowestCategory) params.set("focus", result.lowestCategory.id);
  return `${TRIAGE_ROUTE}?${params.toString()}#${TRIAGE_HASH}`;
}

/**
 * Reads assessment context back off a URL.
 *
 * Everything here arrives from a query string the visitor can edit by hand, so
 * each value is checked against the known vocabulary and the score is bounded.
 * Unrecognised input yields null rather than being echoed back into the page.
 */
export function parseTriageContext(params: URLSearchParams): TriageContext | null {
  if (params.get("src") !== "assessment") return null;

  const rawScore = params.get("score");
  if (rawScore === null || !/^\d{1,2}$/.test(rawScore)) return null;
  const score = Number(rawScore);
  if (score > MAX_SCORE) return null;

  const rawBand = params.get("band");
  const band = BANDS.find((b) => b.id === rawBand);
  if (!band) return null;
  // The band must actually match the score, or the pair is inconsistent.
  if (score < band.min || score > band.max) return null;

  const rawCategory = params.get("focus");
  const category = CATEGORIES.find((c) => c.id === rawCategory) ?? null;

  return { score, band, category };
}

/** One line of plain text describing a carried-over result. */
export function describeTriageContext(context: TriageContext): string {
  const focus = context.category
    ? ` Weakest layer: ${context.category.title} (${context.category.shorthand}).`
    : "";
  return `Self-assessment score ${context.score} of ${MAX_SCORE} — ${context.band.label}.${focus}`;
}

export type { AssessmentBand, AssessmentCategory, BandId, CategoryId, ChoiceValue };
