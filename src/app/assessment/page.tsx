import type { Metadata } from "next";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { CHOICES, MAX_SCORE, TOTAL_CONTROLS, BANDS } from "@/lib/assessment/controls";
import { AssessmentForm } from "./AssessmentForm";

const DESCRIPTION =
  "Score 17 controls across seven layers — missed calls, estimates, past customers, referrals, reviews, and testimonials. Directional findings, not a forecast.";

export const metadata: Metadata = {
  // Absolute so the root layout's "%s — Livingry Services" template does not
  // append the brand a second time.
  title: { absolute: "HVAC Cash Flow Leak Diagnostic | Livingry Services" },
  description: DESCRIPTION,
  alternates: { canonical: "/assessment" },
  openGraph: {
    title: "HVAC Cash Flow Leak Diagnostic",
    description: DESCRIPTION,
    url: "/assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Cash Flow Leak Diagnostic",
    description: DESCRIPTION,
  },
};

export default function AssessmentPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "HVAC Cash Flow Leak Diagnostic", href: "/assessment" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <div className="asm-noprint">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="asm-page">
        <div className="asm-noprint">
          <PageHero
            eyebrow={`Self-assessment · ${TOTAL_CONTROLS} controls`}
            title="Your business may not need more leads. It may need fewer leaks."
            lede="This traces four handoffs — missed calls, dropped estimates, past customers, and lost referrals, reviews, and testimonials. Score each control honestly and you leave with a directional read on where value is escaping and which leak is worth sealing first. Results are directional by design: a range, not a forecast."
          />
        </div>

        {/* How scoring works — the reader needs the 0–3 vocabulary before question one. */}
        <section className="section-tight asm-noprint" id="how-scoring-works">
          <div className="container grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rule-label">How scoring works</div>
              <h2 className="serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}>
                Score each control from 0 to 3.
              </h2>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                {TOTAL_CONTROLS} controls, {MAX_SCORE} points available. The score is only as good
                as the honesty behind it, so do not award a 3 without being able to point at the
                record, timestamp, report, or live workflow that proves it.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Ranges are acceptable here. You are scoring your belief about each control, and a
                control that feels sealed and a control that is sealed are frequently different
                controls — the point is the direction, and what to check first.
              </p>
              <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                How your answers are used: they are added up in this browser tab to rank the layers
                and name the weakest handoff. Your answers are kept in this browser tab for the
                length of your visit, so navigating the site will not lose them. Nothing you enter
                is stored or transmitted, and your answers disappear when you close the tab. The
                result is a directional read — not a revenue forecast or promise. If you ask for the
                written report below your results, only your email address, anything you optionally
                add, your overall score and band, and your top-leak category are sent — never your answers.
              </p>
            </div>
            <div className="lg:col-span-7">
              <dl className="asm-legend-list">
                {CHOICES.map((choice) => (
                  <div key={choice.value} className="asm-legend-item">
                    <dt>
                      <span className="asm-legend-value mono">{choice.value}</span>
                      <span className="asm-legend-label">{choice.label}</span>
                    </dt>
                    <dd>{choice.blurb}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <AssessmentForm />

        {/* Interpretation table — visible before completion so the bands are not a surprise. */}
        <section
          className="section-tight asm-noprint"
          id="how-to-read-it"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <div className="container">
            <div className="rule-label">How to read the total</div>
            <table className="control-table asm-bands-table">
              <caption className="asm-sr-only">
                Score ranges and the operating condition each one indicates
              </caption>
              <thead>
                <tr>
                  <th scope="col">Score</th>
                  <th scope="col">Condition</th>
                  <th scope="col">What it indicates</th>
                </tr>
              </thead>
              <tbody>
                {BANDS.map((band) => (
                  <tr key={band.id}>
                    <th scope="row" className="mono asm-band-range">
                      {band.min}–{band.max}
                    </th>
                    <td className="asm-band-label">{band.label}</td>
                    <td>{band.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-[0.9rem]" style={{ color: "var(--ink-3)", maxWidth: "46rem" }}>
              A high total does not erase a zero. Any 0 on data custody, closeout and payment, or
              unresolved-issue handling is worth treating as the first priority regardless of where
              the total lands.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
