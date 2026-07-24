import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import {
  HVAC_ROUTE,
  buildBreadcrumbLd,
  buildFaqLd,
  buildServiceLd,
  commitment,
  deliverables,
  directAnswer,
  faq,
  finalCta,
  fit,
  founder,
  hero,
  offer,
  pricing,
  problem,
  process,
  seo,
  showPilotPrice,
  workflow,
} from "@/lib/hvac-founding-five/content";
import { FoundingFiveForm } from "./FoundingFiveForm";
import { HvacAnalytics } from "./HvacAnalytics";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: HVAC_ROUTE },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: HVAC_ROUTE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
};

export default function FoundingFivePage() {
  const priceVisible = showPilotPrice();
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "HVAC", href: "/industries/hvac" },
    { label: "Founding Five Pilot", href: HVAC_ROUTE },
  ];

  return (
    <>
      <HvacAnalytics />
      <JsonLd data={buildBreadcrumbLd()} />
      <JsonLd data={buildServiceLd()} />
      <JsonLd data={buildFaqLd()} />
      <Breadcrumbs items={crumbs} />

      {/* HERO */}
      <section className="section paper-grain" aria-labelledby="ff-hero-heading">
        <div className="container max-w-4xl">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 id="ff-hero-heading" className="serif mt-6">{hero.title}</h1>
          <p className="mt-7 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "50rem" }}>
            {hero.intro}
          </p>
          <p className="mt-5" style={{ color: "var(--ink-2)", maxWidth: "50rem" }}>{hero.body}</p>

          {/* Direct, server-rendered answer for humans and AI systems. */}
          <p className="sr-only">{directAnswer}</p>

          <p className="mt-6 eyebrow" style={{ color: "var(--ink-3)" }}>{hero.proofStrip}</p>

          <div className="mt-9 flex flex-wrap gap-3 items-center">
            <a href="#request-review" className="btn btn-primary" data-analytics="hvac-primary-cta">
              {hero.primaryCta} <span aria-hidden>→</span>
            </a>
            <a href="#how-it-works" className="btn btn-secondary">{hero.secondaryAnchor}</a>
          </div>
          <p className="mt-8 text-[0.9rem]" style={{ color: "var(--ink-3)", maxWidth: "46rem" }}>
            {hero.noCalendarNote}
          </p>
        </div>
      </section>

      <hr />

      {/* PROBLEM */}
      <section className="section" aria-labelledby="ff-problem-heading">
        <div className="container">
          <div className="rule-label">01 · The problem</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="ff-problem-heading" className="serif">{problem.heading}</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>{problem.intro}</p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-0">
                {problem.leaks.map((l, i) => (
                  <li key={i} className="py-4 flex items-baseline gap-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                    <span className="mono text-[0.72rem]" style={{ color: "var(--copper)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ color: "var(--ink-2)" }}>{l}</span>
                  </li>
                ))}
                <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
              </ul>
              <blockquote className="mt-6 serif italic" style={{ fontSize: "var(--step-1)", color: "var(--copper-2)", borderLeft: "3px solid var(--copper)", paddingLeft: "1.25rem" }}>
                {problem.pullQuote}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* OFFER */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="ff-offer-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">02 · The offer</div>
            <h2 id="ff-offer-heading" className="serif">{offer.heading}</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>{offer.intro}</p>
            <p className="mt-4" style={{ color: "var(--ink-3)" }}>{offer.closer}</p>
          </div>
          <ol className="lg:col-span-7 grid gap-0">
            {offer.workflows.map((w, i) => (
              <li key={i} className="py-4 flex items-baseline gap-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <span className="mono text-[0.72rem]" style={{ color: "var(--forest)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--ink)" }}>{w}</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ol>
        </div>
      </section>

      <hr />

      {/* PROCESS */}
      <section className="section" id="how-it-works" aria-labelledby="ff-process-heading">
        <div className="container">
          <div className="rule-label">03 · How the pilot works</div>
          <h2 id="ff-process-heading" className="serif max-w-3xl">{process.heading}</h2>
          <ol className="mt-10 grid gap-0">
            {process.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-6 py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div className="num" style={{ minWidth: "3rem" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                  <p className="mt-2 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{s.body}</p>
                </div>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ol>
        </div>
      </section>

      <hr />

      {/* BEFORE / AFTER — semantic accessible diagram */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="ff-diagram-heading">
        <div className="container">
          <div className="rule-label" style={{ color: "var(--seal)" }}>The workflow, before and after</div>
          <h2 id="ff-diagram-heading" className="serif" style={{ color: "var(--paper)" }}>
            From “someone has to remember” to a verified result.
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {[
              { label: workflow.beforeLabel, steps: workflow.before, accent: "var(--copper)" },
              { label: workflow.afterLabel, steps: workflow.after, accent: "var(--seal)" },
            ].map((col) => (
              <div key={col.label}>
                <h3 className="eyebrow" style={{ color: col.accent }}>{col.label}</h3>
                <ol className="ff-flow mt-4" aria-label={`${col.label} workflow steps`}>
                  {col.steps.map((step, i) => (
                    <li key={i} className="ff-flow-step">
                      <span className="ff-flow-num" style={{ color: col.accent }}>{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[0.92rem]" style={{ color: "var(--paper)", opacity: 0.82, maxWidth: "60rem" }}>
            {workflow.caption}
          </p>
        </div>
      </section>

      <hr />

      {/* DELIVERABLES + COMMITMENT */}
      <section className="section" aria-labelledby="ff-deliverables-heading">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <div className="rule-label">04 · What you receive</div>
            <h2 id="ff-deliverables-heading" className="serif">{deliverables.heading}</h2>
            <ul className="mt-6 grid gap-0">
              {deliverables.items.map((d, i) => (
                <li key={i} className="py-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>{d}</li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
          <div>
            <div className="rule-label">05 · What Livingry needs</div>
            <h2 className="serif">{commitment.heading}</h2>
            <ul className="mt-6 grid gap-0">
              {commitment.items.map((d, i) => (
                <li key={i} className="py-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>{d}</li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
            <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>{commitment.note}</p>
          </div>
        </div>
      </section>

      <hr />

      {/* FIT */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="ff-fit-heading">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <div className="rule-label" style={{ color: "var(--forest)" }}>Likely a fit</div>
            <h2 id="ff-fit-heading" className="serif">{fit.isHeading}</h2>
            <ul className="mt-6 grid gap-0">
              {fit.is.map((d, i) => (
                <li key={i} className="py-3 flex gap-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>{d}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
          <div>
            <div className="rule-label" style={{ color: "var(--copper-2)" }}>Not a fit</div>
            <h2 className="serif">{fit.isNotHeading}</h2>
            <ul className="mt-6 grid gap-0">
              {fit.isNot.map((d, i) => (
                <li key={i} className="py-3 flex gap-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--ink-3)" }}>—</span>
                  <span>{d}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
        </div>
      </section>

      <hr />

      {/* FOUNDER + Proof Matters disclosure */}
      <section className="section" aria-labelledby="ff-founder-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">06 · The founder</div>
            <h2 id="ff-founder-heading" className="serif">{founder.heading}</h2>
          </div>
          <div className="lg:col-span-7">
            {founder.body.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "mt-4"} style={{ color: "var(--ink-2)" }}>{p}</p>
            ))}
            <div className="mt-6 card" style={{ background: "var(--paper-2)" }}>
              <span className="eyebrow">Proof Matters</span>
              <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{founder.proofDisclosure}</p>
              <Link
                href={founder.proofHref}
                className="link mt-3 inline-block"
                style={{ color: "var(--forest)" }}
                data-analytics="hvac-proof-matters"
              >
                {founder.proofLinkLabel} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* PRICING */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="ff-pricing-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">07 · Pricing</div>
          <h2 id="ff-pricing-heading" className="serif">{pricing.heading}</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)" }}>{pricing.body}</p>
          {priceVisible && (
            <p className="mt-4 card" style={{ color: "var(--ink)" }}>{pricing.gatedPrice}</p>
          )}
        </div>
      </section>

      <hr />

      {/* FAQ */}
      <section className="section" aria-labelledby="ff-faq-heading">
        <div className="container">
          <div className="rule-label">08 · Frequently asked questions</div>
          <h2 id="ff-faq-heading" className="serif max-w-3xl">Frequently asked questions</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{f.q}</h3>
                <p className="mt-3" style={{ color: "var(--ink-2)" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA + FORM */}
      <section className="section paper-grain" id="request-review" aria-labelledby="ff-final-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="eyebrow">Request a private review</div>
            <h2 id="ff-final-heading" className="serif mt-4" style={{ fontSize: "var(--step-4)" }}>{finalCta.heading}</h2>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>{finalCta.body}</p>
            <p className="mt-6 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>{finalCta.note}</p>
          </div>
          <div className="lg:col-span-7">
            <FoundingFiveForm />
          </div>
        </div>
      </section>
    </>
  );
}
