"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  CATEGORIES,
  CHOICES,
  CONTROLS,
  MAX_SCORE,
  TOTAL_CONTROLS,
  type ChoiceValue,
} from "@/lib/assessment/controls";
import { buildTriageHref, scoreAssessment, type Answers } from "@/lib/assessment/scoring";
import { site } from "@/lib/site";

function controlDomId(id: number) {
  return `control-${id}`;
}

export function AssessmentForm() {
  // Answers live in component state only. Nothing is written to storage or sent
  // anywhere until the visitor chooses to book a triage, which routes through
  // the site's existing lead-capture path.
  const [answers, setAnswers] = useState<Answers>({});
  const [showGaps, setShowGaps] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const gapsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => scoreAssessment(answers), [answers]);
  const { answeredCount, complete, score, unanswered } = result;

  const setAnswer = useCallback((controlId: number, value: ChoiceValue) => {
    setAnswers((prev) => ({ ...prev, [controlId]: value }));
  }, []);

  function handleReveal() {
    if (!complete) {
      setShowGaps(true);
      // Move the user to the list of what is still missing rather than to a
      // result they have not finished earning.
      requestAnimationFrame(() => gapsRef.current?.focus());
      return;
    }
    setRevealed(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function handleReset() {
    setAnswers({});
    setShowGaps(false);
    setRevealed(false);
    requestAnimationFrame(() => formTopRef.current?.focus());
  }

  const percentComplete = Math.round((answeredCount / TOTAL_CONTROLS) * 100);
  const showResult = revealed && complete;
  const triageHref = buildTriageHref(result);

  return (
    <>
      {/* Progress — sticky so the count and running score stay visible while scrolling. */}
      <div className="asm-progress asm-noprint">
        <div className="container asm-progress-inner">
          <div className="asm-progress-figures">
            <p className="asm-progress-count">
              <strong>{answeredCount}</strong> of {TOTAL_CONTROLS} answered
            </p>
            <p className="asm-progress-score">
              Running score <strong>{score}</strong> / {MAX_SCORE}
            </p>
          </div>
          <div
            className="asm-progress-track"
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={TOTAL_CONTROLS}
            aria-label="Assessment completion"
            aria-valuetext={`${answeredCount} of ${TOTAL_CONTROLS} controls answered`}
          >
            <div className="asm-progress-fill" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
        {/* Announced to screen readers as answers change; visually redundant. */}
        <p role="status" aria-live="polite" className="asm-sr-only">
          {answeredCount} of {TOTAL_CONTROLS} controls answered. Running score {score} of {MAX_SCORE}.
          {complete ? " All controls answered — your result is ready." : ""}
        </p>
      </div>

      <div ref={formTopRef} tabIndex={-1} className="asm-focus-anchor" />

      <form
        className="asm-form asm-noprint"
        aria-label="HVAC cash flow leak diagnostic"
        onSubmit={(e) => {
          e.preventDefault();
          handleReveal();
        }}
      >
        {CATEGORIES.map((category) => {
          const controls = CONTROLS.filter((c) => c.categoryId === category.id);
          const categoryScore = result.categories.find((c) => c.id === category.id)!;
          return (
            <section
              key={category.id}
              className="section-tight asm-category"
              aria-labelledby={`category-${category.id}`}
            >
              <div className="container">
                <div className="asm-category-head">
                  <div>
                    <div className="eyebrow">
                      Layer {category.layer} · {category.shorthand}
                    </div>
                    <h2 id={`category-${category.id}`} className="serif asm-category-title">
                      {category.title}
                    </h2>
                    <p className="asm-category-summary">{category.summary}</p>
                  </div>
                  <p className="asm-category-tally" aria-hidden>
                    {categoryScore.answered}/{categoryScore.total}
                  </p>
                </div>

                <div className="asm-controls">
                  {controls.map((control) => {
                    const value = answers[control.id];
                    const missing = showGaps && (value === undefined || value === null);
                    return (
                      <fieldset
                        key={control.id}
                        id={controlDomId(control.id)}
                        className="asm-control"
                        data-missing={missing ? "true" : undefined}
                      >
                        <legend className="asm-legend">
                          <span className="asm-control-num mono">
                            {String(control.id).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="asm-control-title serif">{control.title}</span>
                            <span className="asm-control-question">{control.question}</span>
                          </span>
                        </legend>

                        <p className="asm-evidence">
                          <span className="asm-evidence-label">Check before you score:</span>{" "}
                          {control.evidence}
                        </p>

                        {missing && (
                          <p className="asm-inline-missing">Not answered yet.</p>
                        )}

                        <div className="asm-choices">
                          {CHOICES.map((choice) => {
                            const inputId = `control-${control.id}-${choice.value}`;
                            return (
                              <label key={choice.value} className="asm-choice" htmlFor={inputId}>
                                <input
                                  id={inputId}
                                  className="asm-radio"
                                  type="radio"
                                  name={`control-${control.id}`}
                                  value={choice.value}
                                  checked={value === choice.value}
                                  onChange={() => setAnswer(control.id, choice.value)}
                                />
                                <span className="asm-choice-body">
                                  <span className="asm-choice-head">
                                    <span className="asm-choice-value mono">{choice.value}</span>
                                    <span className="asm-choice-label">{choice.label}</span>
                                  </span>
                                  <span className="asm-choice-blurb">{choice.blurb}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        <section className="section-tight">
          <div className="container">
            {showGaps && !complete && (
              <div
                ref={gapsRef}
                tabIndex={-1}
                role="alert"
                className="ff-error-summary asm-gaps"
              >
                <p>
                  <strong>
                    {unanswered.length} control{unanswered.length === 1 ? "" : "s"} still
                    unanswered.
                  </strong>{" "}
                  A partial score would misread the operation, so the result stays hidden until
                  all {TOTAL_CONTROLS} are scored.
                </p>
                <ul>
                  {unanswered.map((id) => {
                    const control = CONTROLS.find((c) => c.id === id)!;
                    return (
                      <li key={id}>
                        <a href={`#${controlDomId(id)}`}>
                          {String(id).padStart(2, "0")} — {control.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="asm-actions">
              <button type="submit" className="btn btn-primary">
                {complete ? "Show my result" : `Show my result (${answeredCount}/${TOTAL_CONTROLS})`}
                <span aria-hidden>→</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={answeredCount === 0}
              >
                Start over
              </button>
            </div>
          </div>
        </section>
      </form>

      {showResult && result.band && (
        <section className="section asm-result-section" id="result">
          <div className="container">
            <div ref={resultRef} tabIndex={-1} className="asm-focus-anchor" />

            <div className="asm-result-head">
              <div>
                <div className="eyebrow">Your result</div>
                <h2 className="serif asm-result-title">
                  {result.band.label}
                </h2>
                <p className="asm-result-condition">{result.band.condition}</p>
              </div>
              <p className="asm-result-score">
                <strong>{score}</strong>
                <span> / {MAX_SCORE}</span>
              </p>
            </div>

            <p className="asm-result-guidance">{result.band.guidance}</p>

            <div className="asm-caveat">
              <p>
                This score is directional. It reflects what you believe is true right now, not
                what your records show. Before acting on it, verify each control against actual
                records, timestamps, reports, and a live walkthrough of the workflow — a control
                that feels sealed and a control that is sealed are frequently different controls.
              </p>
            </div>

            {result.criticalZeros.length > 0 && (
              <div className="asm-critical" role="note" aria-labelledby="critical-heading">
                <h3 id="critical-heading" className="serif asm-critical-title">
                  A high total does not erase a zero here
                </h3>
                <p>
                  You scored 0 on {result.criticalZeros.length === 1 ? "a control" : "controls"}{" "}
                  where the exposure is not only lost revenue. These are worth attention ahead of
                  anything else on the list:
                </p>
                <ul className="asm-critical-list">
                  {result.criticalZeros.map((control) => (
                    <li key={control.id}>
                      <span className="mono asm-control-num">
                        {String(control.id).padStart(2, "0")}
                      </span>{" "}
                      {control.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="asm-result-grid">
              <div>
                <div className="rule-label">Score by layer</div>
                <table className="control-table asm-table">
                  <caption className="asm-sr-only">
                    Assessment score for each of the seven layers
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Layer</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.categories.map((category) => (
                      <tr
                        key={category.id}
                        data-lowest={
                          result.lowestCategory?.id === category.id ? "true" : undefined
                        }
                      >
                        <th scope="row">
                          {category.title}
                          <span className="asm-table-shorthand">{category.shorthand}</span>
                        </th>
                        <td className="asm-table-score">
                          {category.score} / {category.max}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="asm-result-lists">
                {result.lowestCategory && (
                  <div>
                    <div className="rule-label">Weakest layer</div>
                    <p className="serif asm-lowest-category">{result.lowestCategory.title}</p>
                    <p className="asm-lowest-category-note">
                      {result.lowestCategory.score} of {result.lowestCategory.max} points.{" "}
                      {result.lowestCategory.summary}
                    </p>
                  </div>
                )}

                <div>
                  <div className="rule-label">Three lowest controls</div>
                  <ol className="asm-lowest-controls">
                    {result.lowestControls.map((control) => (
                      <li key={control.id}>
                        <span className="mono asm-control-num">
                          {String(control.id).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="asm-lowest-control-title">{control.title}</span>
                          <span className="asm-lowest-control-meta">
                            {control.categoryTitle} · scored {control.score} of 3
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Result-specific CTAs per plan §9: validate the leak with Michael,
                or continue due diligence with published pricing. */}
            <div className="asm-cta">
              <div className="eyebrow">Next step</div>
              <h3 className="serif asm-cta-title">
                Validate This Leak With Michael
              </h3>
              <p className="asm-cta-lede">
                A focused review of the layer your own answers scored lowest —{" "}
                {result.lowestCategory?.title.toLowerCase()}. It decides one thing:
                whether earned opportunities are escaping from the systems you already run.
              </p>
              <ul className="asm-cta-points">
                <li>No new software recommendation.</li>
                <li>No ad-spend pitch.</li>
                <li>
                  If nothing meaningful is escaping, we say so and the call ends early.
                </li>
              </ul>
              <div className="asm-cta-actions">
                <Link href={triageHref} className="btn btn-primary" data-analytics="assessment-triage">
                  Validate This Leak With Michael
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/services-and-pricing" className="btn btn-secondary" data-analytics="assessment-pricing">
                  Compare Services &amp; Pricing
                </Link>
                <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
                  Print or save this result
                </button>
                <button type="button" className="btn btn-ghost" onClick={handleReset}>
                  Start over
                </button>
              </div>
              <p className="asm-cta-note">
                Your score, band, and weakest layer travel with the validation link so the call starts
                from your answers. Nothing has been sent anywhere yet — {site.booking.reassurance}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
