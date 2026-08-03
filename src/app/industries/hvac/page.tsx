import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { HvacFieldContext } from "@/components/HvacFieldContext";
import {
  HVAC_FUNNEL_ROUTE,
  BLUEPRINT_APPLY_HREF,
  seo,
  directAnswer,
  hero,
  founderStory,
  fourLeaks,
  additionalCapabilities,
  humanControl,
  offer,
  deliverables,
  riskReversal,
  foundingFive,
  qualification,
  howItWorks,
  proofArchitecture,
  faq,
  finalCta,
  estimateRecoveryPositioning,
  agenticSearchPositioning,
  buildHvacFunnelServiceLd,
  buildHvacFunnelFaqLd,
  buildHvacFunnelBreadcrumbLd,
} from "@/lib/hvac-funnel/content";

// Dedicated /industries/hvac conversion funnel.
//
// In Next.js App Router a static segment (`hvac`) takes precedence over the
// sibling dynamic segment (`[slug]`), so this page overrides the generic
// industry template for HVAC only. This is rollback-safe: deleting this file
// restores the generic /industries/[slug] template automatically.
//
// This is a server component (no "use client") so the full conversion
// sequence is server-rendered and understandable without JavaScript.

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: HVAC_FUNNEL_ROUTE },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: HVAC_FUNNEL_ROUTE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
};

export default function HvacFunnelPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "HVAC", href: HVAC_FUNNEL_ROUTE },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={buildHvacFunnelBreadcrumbLd()} />
      <JsonLd data={buildHvacFunnelServiceLd()} />
      <JsonLd data={buildHvacFunnelFaqLd()} />
      <Breadcrumbs items={crumbs} />

      {/* 1) HERO */}
      <section className="section paper-grain" aria-labelledby="hvac-hero-heading">
        <div className="container max-w-4xl">
          <div className="eyebrow">{hero.eyebrow}</div>
          {/* H1 — verbatim from the ticket */}
          <h1 id="hvac-hero-heading" className="serif mt-6">{hero.headline}</h1>
          <p className="mt-6 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "50rem" }}>
            {hero.supportingLine}
          </p>
          <p className="mt-5" style={{ color: "var(--ink-2)", maxWidth: "50rem" }}>{hero.subheadline}</p>
          {/* Direct, server-rendered answer for humans and AI answer engines. */}
          <p className="sr-only">{directAnswer}</p>

          <div className="mt-9 flex flex-wrap gap-3 items-center">
            {/* Primary CTA routes to the Blueprint application flow. */}
            <Link href={BLUEPRINT_APPLY_HREF} className="btn btn-primary" data-analytics="hvac-funnel-primary-cta">
              {hero.primaryCta} <span aria-hidden>→</span>
            </Link>
            {/* Secondary CTA scrolls to the Blueprint details section. */}
            <a href="#blueprint-offer" className="btn btn-secondary" data-analytics="hvac-funnel-secondary-cta">
              {hero.secondaryCta}
            </a>
          </div>

          {/* Trust strip */}
          <ul className="mt-9 grid gap-2 sm:grid-cols-2" style={{ maxWidth: "48rem" }}>
            {hero.trustStrip.map((t) => (
              <li key={t} className="flex gap-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>
                <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <HvacFieldContext />
          </div>
        </div>
      </section>

      <hr />

      {/* 2) FOUNDER STORY / EPIPHANY BRIDGE — immediately after the hero */}
      <section className="section" aria-labelledby="hvac-founder-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The founder</div>
            <h2 id="hvac-founder-heading" className="serif">{founderStory.headline}</h2>
            <p className="mt-6 serif italic" style={{ fontSize: "var(--step-1)", color: "var(--copper-2)", borderLeft: "3px solid var(--copper)", paddingLeft: "1.25rem" }}>
              {founderStory.epiphany}
            </p>
          </div>
          <div className="lg:col-span-7">
            {founderStory.body.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "mt-4"} style={{ color: "var(--ink-2)" }}>{p}</p>
            ))}
            <div className="mt-6 card" style={{ background: "var(--paper-2)" }}>
              <span className="eyebrow">Proof boundary</span>
              <p className="mt-2" style={{ color: "var(--ink-2)" }}>{founderStory.boundaryNote}</p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* 3) FOUR-LEAK MECHANISM — primary mechanism above the offer */}
      <section className="section" aria-labelledby="hvac-leaks-heading">
        <div className="container">
          <div className="rule-label">The mechanism</div>
          <h2 id="hvac-leaks-heading" className="serif max-w-3xl">{fourLeaks.headline}</h2>
          <p className="mt-5 serif" style={{ fontSize: "var(--step-1)", color: "var(--forest)" }}>
            {fourLeaks.framing}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {fourLeaks.leaks.map((l, i) => (
              <div key={l.name} className="card">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[0.72rem]" style={{ color: "var(--copper)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{l.name}</h3>
                </div>
                <p className="mt-3 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{l.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 serif" style={{ fontSize: "var(--step-1)", color: "var(--ink)" }}>
            {fourLeaks.categoryLine}
          </p>
        </div>
      </section>

      <hr />

      {/* 4) HUMAN-CONTROL / NEW OPPORTUNITY SECTION */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-control-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Human control</div>
            <h2 id="hvac-control-heading" className="serif">{humanControl.headline}</h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-3">
              {humanControl.ideas.map((idea) => (
                <li key={idea} className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6" style={{ color: "var(--ink-2)" }}>{humanControl.humanControlLine}</p>
            <p className="mt-4 serif italic" style={{ fontSize: "var(--step-1)", color: "var(--copper-2)", borderLeft: "3px solid var(--copper)", paddingLeft: "1.25rem" }}>
              {humanControl.rooftopLine}
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* 5) OFFER SECTION — THE HVAC REVENUE CONTINUITY BLUEPRINT */}
      <section className="section" id="blueprint-offer" aria-labelledby="hvac-offer-heading" data-analytics-view="hvac-funnel-blueprint-section">
        <div className="container max-w-3xl">
          <div className="rule-label" style={{ color: "var(--copper)" }}>The offer</div>
          <h2 id="hvac-offer-heading" className="serif">{offer.headline}</h2>
          <p className="mt-6 serif" style={{ fontSize: "var(--step-2)", color: "var(--ink)" }}>
            # {offer.offerName}
          </p>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{offer.offerDescription}</p>
          <p className="mt-6 card" style={{ borderLeft: "3px solid var(--copper)" }}>
            <span className="eyebrow" style={{ color: "var(--copper)" }}>Investment</span>
            <span className="block mt-2 serif" style={{ fontSize: "var(--step-3)", color: "var(--ink)" }}>{offer.price}</span>
          </p>
          <p className="mt-5" style={{ color: "var(--ink-2)" }}>{offer.offerLine}</p>
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {/* Primary CTA routes to the Blueprint application flow. */}
            <Link href={BLUEPRINT_APPLY_HREF} className="btn btn-primary" data-analytics="hvac-funnel-offer-cta">
              {offer.primaryCta} <span aria-hidden>→</span>
            </Link>
            <a href="#deliverables" className="btn btn-secondary">{offer.secondaryCta}</a>
          </div>
        </div>
      </section>

      <hr />

      {/* 6) DELIVERABLES / VALUE STACK */}
      <section className="section" id="deliverables" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-deliverables-heading">
        <div className="container">
          <div className="rule-label">Deliverables &amp; value stack</div>
          <h2 id="hvac-deliverables-heading" className="serif max-w-3xl">What the Blueprint includes.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {deliverables.items.map((item) => (
              <div key={item.name} className="card">
                <h3 className="serif" style={{ fontSize: "1.0625rem" }}>{item.name}</h3>
                <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Explicit highlight of the two new deliverables required by the ticket. */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card" style={{ borderLeft: "3px solid var(--forest)" }}>
              <span className="eyebrow" style={{ color: "var(--forest)" }}>New deliverable</span>
              <h3 className="serif mt-2" style={{ fontSize: "1.0625rem" }}>{deliverables.newDeliverables.estimateRecoveryScan.name}</h3>
              <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{deliverables.newDeliverables.estimateRecoveryScan.definition}</p>
              <p className="mt-3 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>{deliverables.newDeliverables.estimateRecoveryScan.positioningRule}</p>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--copper)" }}>
              <span className="eyebrow" style={{ color: "var(--copper)" }}>New deliverable</span>
              <h3 className="serif mt-2" style={{ fontSize: "1.0625rem" }}>{deliverables.newDeliverables.agenticSearchAudit.name}</h3>
              <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{deliverables.newDeliverables.agenticSearchAudit.definition}</p>
              <p className="mt-3 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>{deliverables.newDeliverables.agenticSearchAudit.framingRule}</p>
            </div>
          </div>

          <div className="mt-10 card" style={{ borderLeft: "3px solid var(--copper)" }}>
            <div className="rule-label" style={{ color: "var(--copper)" }}>Value stack notes</div>
            <ul className="mt-3 grid gap-2">
              {deliverables.valueStackNotes.map((n) => (
                <li key={n} className="text-[0.92rem]" style={{ color: "var(--ink-2)" }}>· {n}</li>
              ))}
            </ul>
            <p className="mt-4 serif" style={{ fontSize: "var(--step-2)", color: "var(--ink)" }}>
              Investment: {offer.price}
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* 7) RISK REVERSAL — THE BLUEPRINT CLARITY PROMISE ONLY */}
      <section className="section" aria-labelledby="hvac-risk-heading">
        <div className="container max-w-3xl">
          <div className="rule-label" style={{ color: "var(--forest)" }}>Risk reversal</div>
          <h2 id="hvac-risk-heading" className="serif">{riskReversal.heading}</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{riskReversal.body}</p>
          <p className="mt-4 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>{riskReversal.ruleNote}</p>
        </div>
      </section>

      <hr />

      {/* 8) FOUNDING FIVE SCARCITY — real, manually maintained, no fake urgency */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-founding-five-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">Founding Five</div>
          <h2 id="hvac-founding-five-heading" className="serif">{foundingFive.headline}</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{foundingFive.applicationOpenNote}</p>
        </div>
      </section>

      <hr />

      {/* 9) QUALIFICATION */}
      <section className="section" aria-labelledby="hvac-fit-heading">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <div className="rule-label" style={{ color: "var(--forest)" }}>Strong fit</div>
            <h2 id="hvac-fit-heading" className="serif">{qualification.headline}</h2>
            <ul className="mt-6 grid gap-0">
              {qualification.strongFit.map((d, i) => (
                <li key={d} className="py-4 flex gap-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>{d}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
          <div>
            <div className="rule-label" style={{ color: "var(--copper-2)" }}>Weak fit</div>
            <h2 className="serif">Not a fit</h2>
            <ul className="mt-6 grid gap-0">
              {qualification.weakFit.map((d, i) => (
                <li key={d} className="py-4 flex gap-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", color: "var(--ink-2)" }}>
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

      {/* 10) HOW IT WORKS — simple 5-step process */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-how-heading">
        <div className="container">
          <div className="rule-label">How it works</div>
          <h2 id="hvac-how-heading" className="serif max-w-3xl">{howItWorks.heading}</h2>
          <ol className="mt-10 grid gap-0">
            {howItWorks.steps.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[auto_1fr] gap-6 py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div className="num" style={{ minWidth: "3rem" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.name}</h3>
                  <p className="mt-2 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{s.body}</p>
                </div>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ol>
        </div>
      </section>

      <hr />

      {/* 11) PROOF ARCHITECTURE — an honest proof ladder */}
      <section className="section" aria-labelledby="hvac-proof-heading">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rule-label">Proof architecture</div>
            <h2 id="hvac-proof-heading" className="serif">{proofArchitecture.heading}</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{proofArchitecture.intro}</p>
          </div>
          <div>
            <div className="rule-label" style={{ color: "var(--forest)" }}>Allowed proof</div>
            <ul className="mt-4 grid gap-2">
              {proofArchitecture.allowed.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="rule-label mt-8" style={{ color: "var(--copper-2)" }}>Not allowed</div>
            <ul className="mt-4 grid gap-2">
              {proofArchitecture.notAllowed.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--ink-3)" }}>—</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <hr />

      {/* ESTIMATE RECOVERY POSITIONING — modest lower-page block, NOT a live tool */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-er-heading">
        <div className="container max-w-3xl">
          <div className="rule-label" style={{ color: "var(--forest)" }}>What implementation may look like after the Blueprint</div>
          <h2 id="hvac-er-heading" className="serif">{estimateRecoveryPositioning.heading}</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{estimateRecoveryPositioning.prePositioningLine}</p>
          <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{estimateRecoveryPositioning.approvedPositioning}</p>
          <p className="mt-5 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
            Estimate Recovery is in development. It is not yet shipped and not yet integrated with ServiceTitan, Housecall Pro, Jobber, or other systems. No 'first' or 'only' market claim is made.
          </p>
        </div>
      </section>

      <hr />

      {/* AGENTIC-SEARCH AUDIT POSITIONING — included audit, not a rankings promise */}
      <section className="section" aria-labelledby="hvac-agentic-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">Agentic Search Visibility &amp; Trust Audit</div>
          <h2 id="hvac-agentic-heading" className="serif">How the company appears to answer engines and trust-sensitive buyers.</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{agenticSearchPositioning.agenticSearchLine}</p>
          <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{agenticSearchPositioning.whatThisMeans}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {agenticSearchPositioning.focusAreas.map((f) => (
              <li key={f} className="flex gap-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>
                <span aria-hidden style={{ color: "var(--copper)" }}>·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>{agenticSearchPositioning.importantRule}</p>
        </div>
      </section>

      <hr />

      {/* ADDITIONAL IMPLEMENTATION CAPABILITIES — kept LOWER, not foregrounded */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-additional-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">{additionalCapabilities.subheading}</div>
            <h2 id="hvac-additional-heading" className="serif">{additionalCapabilities.heading}</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>{additionalCapabilities.intro}</p>
          </div>
          <ul className="lg:col-span-7 grid gap-0">
            {additionalCapabilities.items.map((m, i) => (
              <li key={i} className="py-4 flex items-baseline gap-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--ink-2)" }}>{m}</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ul>
        </div>
      </section>

      <hr />

      {/* 12) FAQ */}
      <section className="section" aria-labelledby="hvac-faq-heading">
        <div className="container">
          <div className="rule-label">Frequently asked questions</div>
          <h2 id="hvac-faq-heading" className="serif max-w-3xl">Common questions.</h2>
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

      {/* 13) FINAL CTA */}
      <section className="section paper-grain" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="hvac-final-heading">
        <div className="container max-w-3xl">
          <h2 id="hvac-final-heading" className="serif" style={{ color: "var(--paper)" }}>{finalCta.headline}</h2>
          <p className="mt-7">
            {/* Primary CTA routes to the Blueprint application flow. */}
            <Link href={BLUEPRINT_APPLY_HREF} className="btn btn-primary" data-analytics="hvac-funnel-final-cta">
              {finalCta.primaryCta} <span aria-hidden>→</span>
            </Link>
          </p>
          <p className="mt-6 text-[0.92rem]" style={{ color: "var(--paper-2)", opacity: 0.9 }}>
            {finalCta.microcopy}
          </p>
        </div>
      </section>
    </>
  );
}
