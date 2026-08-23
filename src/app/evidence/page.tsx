import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Evidence — What Livingry Services Can and Cannot Yet Claim",
  description:
    "The evidence ladder behind every claim on this site: Founder Experience, Verified Facts, Strategic Opinions, method demonstrations, demo data, product artifacts, pilot observations, and documented client outcomes.",
  alternates: { canonical: "/evidence" },
  openGraph: {
    title: "Evidence — Livingry Services",
    description:
      "No client outcomes are published yet, so this page is called Evidence, not Results. Every claim is labelled.",
    url: "/evidence",
    type: "website",
  },
};

const ladder = [
  {
    n: "1",
    label: "Founder Experience",
    detail:
      "Michael's firsthand history and observation — work as a solo residential contractor, hands-on trade experience, and years building AI agents. Never presented as client proof or an industry benchmark.",
  },
  {
    n: "2",
    label: "Verified Facts",
    detail:
      "Directly supported by a saved, accessible source. If a fact cannot be sourced, it is not published as a fact.",
  },
  {
    n: "3",
    label: "Strategic Opinions",
    detail:
      "Clearly framed operating judgment, recommendation, or hypothesis — like the refrigerant-leak analogy. Always labelled, never dressed as data.",
  },
  {
    n: "4",
    label: "Method demonstrations",
    detail:
      "The Find → Trace → Seal → Verify method, demonstrated under controlled conditions before any client commitment.",
  },
  {
    n: "5",
    label: "Public Demo · Demo Data",
    detail:
      "Synthetic demonstrations of the operating layer, always labelled as demo data and never presented as client results.",
  },
  {
    n: "6",
    label: "Product artifacts",
    detail:
      "The Livingry Ops web app and its components, shown in company-branded form on the client's own domain.",
  },
  {
    n: "7",
    label: "Approved pilot observations",
    detail: "Observations from pilot work, published only with permission and supporting evidence.",
  },
  {
    n: "8",
    label: "Documented client outcomes",
    detail:
      "Measured case studies — none exist yet. The site will rename Evidence to Results only when this rung is occupied.",
  },
];

const claimLabels = [
  {
    label: "Founder Experience",
    meaning: "Michael's firsthand history or observation; never presented as client proof or industry benchmark.",
  },
  {
    label: "Verified Fact",
    meaning: "Directly supported by a saved, accessible source.",
  },
  {
    label: "Strategic Opinion",
    meaning: "Clearly framed operating judgment, recommendation, or hypothesis.",
  },
  {
    label: "Requires Verification",
    meaning: "An unconfirmed metric, feature, pricing, integration, result, policy, or claim.",
  },
];

export default function EvidencePage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Evidence", href: "/evidence" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Evidence"
        title="Eight rungs. We only claim what we hold."
        lede="Livingry Services has founder experience, verified source material, a defined operating method, workflow demonstrations, product artifacts, and synthetic demo data. It does not yet have documented client outcomes — so this page is called Evidence, not Results, until measurement changes that."
        primaryCta={{ label: "How It Works", href: "/how-it-works" }}
        secondaryCta={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />

      {/* THE LADDER */}
      <section className="section" aria-labelledby="ladder-heading">
        <div className="container">
          <div className="rule-label">The evidence ladder</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="ladder-heading" className="serif">
                Each rung is a level of proof the site is willing to publish.
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Claims do not skip rungs. A Strategic Opinion cannot be presented as a Documented Client
                Outcome, and demo data is never shown as a client result. When a claim cannot meet its
                rung, it stays off the site.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-0">
              {ladder.map((rung, i) => (
                <div key={rung.n} className="grid grid-cols-[auto_1fr] gap-6 py-5" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <div className="num" style={{ minWidth: "2.5rem" }}>{rung.n}</div>
                  <div>
                    <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{rung.label}</h3>
                    <p className="mt-1 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{rung.detail}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* THE FOUNDER CONFESSION — Founder Experience, labelled */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="confession-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The founder confession</div>
            <h2 id="confession-heading" className="serif">
              Why this practice exists — in Michael's own words.
            </h2>
            <p className="mt-5 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              Claim label: Founder Experience. Michael's estimate, not audited revenue, not a typical
              result, not a client outcome, not an improvement promise.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="serif" style={{ fontSize: "var(--step-1)", lineHeight: 1.45, color: "var(--ink)" }}>
              "I looked back at years of solo contracting and estimated that more than 30 percent of my
              productive capacity went unrealized — work I earned but never captured, because the
              information, the ownership, and the record never stayed connected from one handoff to the
              next. Livingry Services exists to stop that kind of loss for established HVAC/R companies."
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              That estimate is the founding observation, not a claim about what any client will
              experience. Nothing on this site projects it onto your numbers.
            </p>
          </div>
        </div>
      </section>

      {/* CLAIM LABELS */}
      <section className="section" aria-labelledby="labels-heading">
        <div className="container">
          <div className="rule-label">How every consequential claim is labelled</div>
          <h2 id="labels-heading" className="serif">Four labels, applied consistently.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {claimLabels.map((label) => (
              <div key={label.label} className="card">
                <div className="eyebrow">{label.label}</div>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{label.meaning}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[0.9rem]" style={{ color: "var(--ink-3)", maxWidth: "46rem" }}>
            Claims involving revenue, profit, return on investment, conversion, time savings, capacity,
            client outcomes, testimonials, vendor features, integrations, legal ownership, privacy,
            retention, security, and pricing require direct verification before they appear.
          </p>
        </div>
      </section>

      <EndCta
        title="Judge the method on the evidence, not the promises."
        primary={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondary={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />
    </>
  );
}