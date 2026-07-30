import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { HvacJourneyMap } from "@/components/diagrams/HvacJourneyMap";
import { TradeOpsLayerDiagram } from "@/components/diagrams/TradeOpsLayerDiagram";
import { HvacOpsAnalytics } from "./HvacOpsAnalytics";
import {
  HVAC_OPS_ROUTE,
  seo,
  hero,
  problem,
  tradeops,
  firstSystems,
  methodOutputs,
  engagement,
  ownership,
  foundingFive,
} from "@/lib/hvac-operations/content";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: HVAC_OPS_ROUTE },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: HVAC_OPS_ROUTE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
};

export default function HvacOperationsPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Operations", href: "/operations" },
    { label: "HVAC", href: HVAC_OPS_ROUTE },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "HVAC Operations Systems",
    serviceType: "Vendor-independent operations implementation for HVAC companies",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description: seo.description,
    url: `${site.primaryDomain}${HVAC_OPS_ROUTE}`,
    audience: { "@type": "BusinessAudience", audienceType: "HVAC companies" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC operations engagements",
      itemListElement: engagement.offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        description: o.outcome,
      })),
    },
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: `${site.primaryDomain}${HVAC_OPS_ROUTE}`,
    isPartOf: { "@id": `${site.primaryDomain}/#website` },
    about: { "@id": `${site.primaryDomain}/#organization` },
  };

  return (
    <>
      <HvacOpsAnalytics />
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={serviceLd} />
      <JsonLd data={webPageLd} />
      <Breadcrumbs items={crumbs} />

      {/* HERO */}
      <section className="section paper-grain" aria-labelledby="hvac-hero-heading">
        <div className="container">
          <div className="max-w-4xl">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1 id="hvac-hero-heading" className="serif mt-6">
              {hero.title}
            </h1>
            <p
              className="mt-7 serif"
              style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "50rem" }}
            >
              {hero.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <a href="#leak-review" className="btn btn-primary" data-analytics="hvac-ops-hero-primary">
                {hero.primaryCta} <span aria-hidden>→</span>
              </a>
              <a href="#tradeops-layer" className="btn btn-secondary" data-analytics="hvac-ops-hero-secondary">
                {hero.secondaryCta}
              </a>
            </div>
            <p className="mt-8 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              {hero.trustLine}
            </p>
          </div>

          <div className="mt-12">
            <HvacJourneyMap />
          </div>
        </div>
      </section>

      <hr />

      {/* PROBLEM — leak map across six operational stages */}
      <section className="section" aria-labelledby="hvac-problem-heading" data-analytics-view="leak-map">
        <div className="container">
          <div className="rule-label">01 · Where the value leaks</div>
          <div className="max-w-3xl">
            <h2 id="hvac-problem-heading" className="serif">
              {problem.heading}
            </h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              {problem.intro}
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="gc-table" role="table">
              <caption className="sr-only">
                Six stages of the HVAC job lifecycle, a sample leak at each stage, and the Livingry focus that closes it
              </caption>
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Sample leak</th>
                  <th scope="col">Livingry focus</th>
                </tr>
              </thead>
              <tbody>
                {problem.stages.map((s) => (
                  <tr key={s.stage}>
                    <th scope="row">{s.stage}</th>
                    <td data-label="Sample leak">{s.leak}</td>
                    <td data-label="Livingry focus">{s.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr />

      {/* TRADEOPS LAYER */}
      <section
        className="section"
        id="tradeops-layer"
        style={{ background: "var(--paper-2)" }}
        aria-labelledby="hvac-tradeops-heading"
        data-analytics-view="tradeops"
      >
        <div className="container">
          <div className="rule-label">02 · The TradeOps Layer</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="hvac-tradeops-heading" className="serif">
                {tradeops.heading}
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                {tradeops.intro}
              </p>
            </div>
            <div className="lg:col-span-7">
              <TradeOpsLayerDiagram />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tradeops.components.map((c, i) => (
              <div key={c.name} className="card">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[0.72rem]" style={{ color: "var(--copper-2)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{c.name}</h3>
                </div>
                <p className="mt-3 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8">
            <Link href="/systems/tradeops-layer" className="link" style={{ color: "var(--forest)" }}>
              Read the full TradeOps Layer system description →
            </Link>
          </p>
        </div>
      </section>

      <hr />

      {/* FIRST SYSTEMS — five outcome-led modules */}
      <section className="section" aria-labelledby="hvac-systems-heading">
        <div className="container">
          <div className="rule-label">03 · First systems</div>
          <div className="max-w-3xl">
            <h2 id="hvac-systems-heading" className="serif">
              {firstSystems.heading}
            </h2>
          </div>

          <ul className="mt-10 grid gap-0" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {firstSystems.modules.map((m, i) => (
              <li
                key={m.name}
                className="grid gap-3 py-7 md:grid-cols-12 md:gap-8"
                style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
              >
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="mono text-[0.72rem]" style={{ color: "var(--copper)", minWidth: "2rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{m.name}</h3>
                </div>
                <p className="md:col-span-5" style={{ color: "var(--ink-2)" }}>{m.outcome}</p>
                <p className="md:col-span-3 text-[0.92rem]" style={{ color: "var(--ink-3)" }}>
                  <span className="eyebrow" style={{ color: "var(--forest)" }}>What gets designed</span>
                  <span className="block mt-1.5">{m.designed}</span>
                </p>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0, padding: 0 }} />
          </ul>
        </div>
      </section>

      <hr />

      {/* METHOD — five stages with tangible outputs */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-method-heading">
        <div className="container">
          <div className="rule-label">04 · The method</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="hvac-method-heading" className="serif">
                A disciplined first operating cycle.
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                The same five steps run on every engagement. Each stage produces
                one concrete artifact before the next begins.
              </p>
              <p className="mt-6">
                <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>
                  Read the full Leakproofing Framework →
                </Link>
              </p>
            </div>
            <ol className="lg:col-span-7 grid gap-0">
              {site.method.map((m, i) => {
                const output = methodOutputs.find((o) => o.name === m.name)?.output;
                return (
                  <li
                    key={m.n}
                    className="grid grid-cols-[auto_1fr] gap-6 py-6"
                    style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                  >
                    <div className="num" style={{ minWidth: "3rem" }}>{m.n}</div>
                    <div>
                      <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{m.name}</h3>
                      <p className="mt-2 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{m.blurb}</p>
                      {output && (
                        <p className="mt-2 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                          <span style={{ color: "var(--forest)" }}>Output · </span>
                          {output}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ol>
          </div>
        </div>
      </section>

      <hr />

      {/* ENGAGEMENT — three initial formats */}
      <section className="section" aria-labelledby="hvac-engagement-heading">
        <div className="container">
          <div className="rule-label">05 · Ways to start</div>
          <div className="max-w-3xl">
            <h2 id="hvac-engagement-heading" className="serif">
              {engagement.heading}
            </h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              {engagement.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {engagement.offers.map((o) => (
              <div key={o.name} className="card h-full">
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{o.name}</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  <span style={{ color: "var(--forest)" }}>Outcome · </span>
                  {o.outcome}
                </p>
                <div className="mt-4">
                  <span className="eyebrow" style={{ color: "var(--copper-2)" }}>
                    {"deliverableLabel" in o && o.deliverableLabel ? o.deliverableLabel : "Deliverables"}
                  </span>
                  <ul className="mt-2 grid gap-1.5 text-[0.92rem]" style={{ color: "var(--ink-2)", paddingLeft: "1.1rem" }}>
                    {o.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[0.95rem]" style={{ color: "var(--ink-3)", maxWidth: "46rem" }}>
            {engagement.qualification}
          </p>
        </div>
      </section>

      <hr />

      {/* OWNERSHIP */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="hvac-ownership-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">06 · Ownership</div>
            <h2 id="hvac-ownership-heading" className="serif">
              {ownership.heading}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-3">
              {ownership.points.map((p) => (
                <li key={p} className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/proof" className="link" style={{ color: "var(--forest)" }}>
                Why ownership matters →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDING FIVE CTA + INTAKE */}
      <section className="section-tight paper-grain" id="leak-review" aria-labelledby="hvac-cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <h2 id="hvac-cta-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
                {foundingFive.heading}
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                {foundingFive.body}
              </p>
              <p className="mt-3 max-w-xl text-[0.92rem]" style={{ color: "var(--ink-3)" }}>
                {foundingFive.qualification}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/hvac/founding-five#request-review"
                className="btn btn-primary"
                data-analytics="hvac-ops-intake"
              >
                {foundingFive.primaryCta} <span aria-hidden>→</span>
              </Link>
              <a
                href={site.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                data-analytics="hvac-ops-fit-call"
              >
                {foundingFive.secondaryCta} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <p className="mt-6 text-[0.85rem]" style={{ color: "var(--ink-3)", maxWidth: "46rem" }}>
            A request is not an implementation commitment. Livingry reviews the
            operating problem you describe and responds with the appropriate next step.
          </p>
        </div>
      </section>
    </>
  );
}
