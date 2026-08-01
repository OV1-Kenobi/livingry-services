import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { HvacFieldContext } from "@/components/HvacFieldContext";
import { BlueprintAnalytics } from "./BlueprintAnalytics";
import { site } from "@/lib/site";
import { HVAC_ROUTE } from "@/lib/hvac-founding-five/content";
import {
  BLUEPRINT_ROUTE,
  blueprintSeo,
  blueprint,
  blueprintFlow,
  blueprintReport,
  blueprintWhy,
  blueprintToAlliance,
  blueprintFaq,
} from "@/lib/ai-blueprint/content";

export const metadata: Metadata = {
  title: blueprintSeo.title,
  description: blueprintSeo.description,
  alternates: { canonical: BLUEPRINT_ROUTE },
  openGraph: {
    title: blueprintSeo.ogTitle,
    description: blueprintSeo.ogDescription,
    url: BLUEPRINT_ROUTE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: blueprintSeo.ogTitle,
    description: blueprintSeo.ogDescription,
  },
};

function buildBlueprintFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blueprintFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function buildBlueprintServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Opportunity Blueprint for HVAC Companies",
    serviceType: "Fixed-scope operational AI diagnostic",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Established HVAC/R companies",
    },
    description: blueprintSeo.description,
    url: `${site.primaryDomain}${BLUEPRINT_ROUTE}`,
  };
}

export default function BlueprintPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Operations", href: "/operations" },
    { label: "HVAC", href: "/operations/hvac" },
    { label: "AI Opportunity Blueprint", href: BLUEPRINT_ROUTE },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={buildBlueprintServiceLd()} />
      <JsonLd data={buildBlueprintFaqLd()} />
      <BlueprintAnalytics />

      {/* HERO */}
      <header className="section" style={{ background: "var(--paper)" }}>
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-8" style={{ color: "var(--copper)" }}>{blueprint.eyebrow}</p>
          <h1 className="serif mt-4 max-w-4xl" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15 }}>
            {blueprint.title}
          </h1>
          <p className="mt-6 max-w-3xl" style={{ color: "var(--ink-2)", fontSize: "1.125rem", lineHeight: 1.7 }}>
            {blueprint.lede}
          </p>
          <p className="mt-6 eyebrow" style={{ color: "var(--ink-3)" }}>
            Diagnostic + findings call first · $799 report only if you want it · 100% credited toward launch
          </p>
          <div className="mt-9 flex flex-wrap gap-3 items-center">
            <Link href={`${HVAC_ROUTE}#request-review`} className="btn btn-primary" data-analytics="hvac-blueprint-cta">
              {blueprint.primaryCta} <span aria-hidden>→</span>
            </Link>
            <a href="#the-report" className="btn btn-secondary">{blueprint.secondaryCta}</a>
          </div>
          <HvacFieldContext />
        </div>
      </header>

      <hr />

      {/* GC FRAMING */}
      <section className="section" style={{ background: "var(--forest)", color: "var(--paper)" }} aria-labelledby="bp-gc-heading">
        <div className="container max-w-3xl">
          <h2 id="bp-gc-heading" className="serif" style={{ color: "var(--paper)" }}>
            {blueprint.gcFraming.heading}
          </h2>
          <p className="mt-5" style={{ color: "var(--paper-2)", fontSize: "1.125rem", lineHeight: 1.7 }}>
            {blueprint.gcFraming.body}
          </p>
        </div>
      </section>

      {/* FLOW */}
      <section className="section" aria-labelledby="bp-flow-heading">
        <div className="container">
          <div className="rule-label">01 · How it works</div>
          <h2 id="bp-flow-heading" className="serif max-w-3xl">{blueprintFlow.heading}</h2>
          <ol className="mt-10 grid gap-0">
            {blueprintFlow.steps.map((s, i) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <span className="eyebrow" style={{ color: "var(--copper)", minWidth: "2.5rem" }}>
                  {String(s.n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="serif" style={{ fontSize: "1.25rem" }}>{s.name}</h3>
                  <p className="mt-2" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr />

      {/* REPORT CONTENTS */}
      <section className="section" id="the-report" style={{ background: "var(--paper-2)" }} aria-labelledby="bp-report-heading" data-analytics-view="blueprint-scope">
        <div className="container">
          <div className="rule-label">02 · The findings report</div>
          <h2 id="bp-report-heading" className="serif max-w-3xl">{blueprintReport.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {blueprintReport.items.map((item) => (
              <div key={item.name} className="card">
                <h3 className="serif" style={{ fontSize: "1.125rem" }}>{item.name}</h3>
                <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 card" style={{ borderLeft: "3px solid var(--copper)" }}>
            <div className="rule-label" style={{ color: "var(--copper)" }}>Pricing, in plain terms</div>
            <p className="mt-4" style={{ color: "var(--ink)", lineHeight: 1.7 }}>{blueprint.priceNote}</p>
            <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{blueprint.creditMechanic}</p>
            <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{blueprint.launchRangeNote}</p>
          </div>
        </div>
      </section>

      <hr />

      {/* WHY */}
      <section className="section" aria-labelledby="bp-why-heading">
        <div className="container">
          <div className="rule-label">03 · Why it works this way</div>
          <h2 id="bp-why-heading" className="serif max-w-3xl">{blueprintWhy.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {blueprintWhy.points.map((p) => (
              <div key={p.name}>
                <h3 className="serif" style={{ fontSize: "1.125rem" }}>{p.name}</h3>
                <p className="mt-2" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* ALLIANCE CONNECTION */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="bp-alliance-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">04 · The alliance path</div>
          <h2 id="bp-alliance-heading" className="serif">{blueprintToAlliance.heading}</h2>
          <p className="mt-5" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{blueprintToAlliance.body}</p>
          <p className="mt-5">
            <Link href={HVAC_ROUTE} className="btn btn-secondary">
              See the Founding Five alliance <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      <hr />

      {/* FAQ */}
      <section className="section" aria-labelledby="bp-faq-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">05 · Questions</div>
          <h2 id="bp-faq-heading" className="serif">Blueprint questions, answered plainly.</h2>
          <div className="mt-8 grid gap-0">
            {blueprintFaq.map((f) => (
              <details key={f.q} className="py-5" style={{ borderTop: "1px solid var(--rule)" }}>
                <summary className="serif" style={{ fontSize: "1.0625rem", cursor: "pointer" }}>{f.q}</summary>
                <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="bp-cta-heading">
        <div className="container max-w-3xl">
          <h2 id="bp-cta-heading" className="serif" style={{ color: "var(--paper)" }}>
            The walkthrough costs you an hour. The estimate costs nothing until you ask for it in writing.
          </h2>
          <p className="mt-5" style={{ color: "var(--paper-2)", lineHeight: 1.7 }}>
            Apply for a Strategic Alliance Review. If there is a fit, your Blueprint diagnostic begins there.
          </p>
          <p className="mt-7">
            <Link href={`${HVAC_ROUTE}#request-review`} className="btn btn-primary" data-analytics="hvac-blueprint-cta">
              {blueprint.primaryCta} <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
