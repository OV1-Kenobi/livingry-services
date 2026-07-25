import type { Metadata } from "next";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { CHOICES, MAX_SCORE, TOTAL_CONTROLS, BANDS } from "@/lib/assessment/controls";
import { AssessmentForm } from "./AssessmentForm";

const DESCRIPTION =
  "Score your operation across 17 controls in seven layers, from first inquiry to referral. See where earned work escapes — and the first leak worth sealing.";

export const metadata: Metadata = {
  // Absolute so the root layout's "%s — Livingry Services" template does not
  // append the brand a second time.
  title: { absolute: "17-Point Operational Leak Assessment | Livingry Services" },
  description: DESCRIPTION,
  alternates: { canonical: "/assessment" },
  openGraph: {
    title: "17-Point Operational Leak Assessment",
    description: DESCRIPTION,
    url: "/assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "17-Point Operational Leak Assessment",
    description: DESCRIPTION,
  },
};

export default function AssessmentPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "17-Point Leak Assessment", href: "/assessment" },
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
            eyebrow={`Self-assessment · ${TOTAL_CONTROLS} controls · About 10 minutes`}
            title="Your business may not need more leads. It may need fewer leaks."
            lede="This traces what happens to an opportunity after it reaches you — intake, ownership, handoffs, scheduling, field readiness, estimate follow-up, payment, reviews, and referrals. Score each control honestly and you leave with a directional read on where value is escaping and which leak is worth sealing first."
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
              <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                Nothing you enter is stored or transmitted. Your answers stay in this browser tab
                and disappear when you close it.
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
