import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { systemContents, systemSlugs } from "@/lib/system-content";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return systemSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = systemContents[slug];
  if (!c) return {};
  return {
    title: `${c.title} — Livingry Services`,
    description: c.lede,
    alternates: { canonical: `/systems/${c.slug}` },
    openGraph: { title: `${c.title} — Livingry Services`, description: c.lede, type: "article" },
  };
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = systemContents[slug];
  if (!c) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "What We Build", href: "/what-we-build" },
    { label: c.title, href: `/systems/${c.slug}` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    serviceType: c.family,
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: "United States",
    description: c.lede,
    url: `${site.primaryDomain}/systems/${c.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${c.title} — Implementation Modules`,
      itemListElement: c.build.map((b) => ({
        "@type": "Offer",
        name: b.title,
        description: b.body,
      })),
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        primaryCta={{ label: c.cta.primary, href: "/system-review" }}
        secondaryCta={c.cta.secondary ? { label: c.cta.secondary, href: "/how-it-works" } : undefined}
      />

      {/* HVAC-specific application of the TradeOps Layer */}
      {c.slug === "tradeops-layer" && (
        <section className="section-tight">
          <div className="container max-w-4xl">
            <p style={{ color: "var(--ink-2)" }}>
              For HVAC teams, the TradeOps Layer connects the operational events
              that move between inquiry, estimate, booked job, field work,
              customer follow-up, and maintenance — without requiring a forced
              platform migration.{" "}
              <Link href="/operations/hvac" className="link" style={{ color: "var(--forest)" }}>
                See how it applies to HVAC operations →
              </Link>
            </p>
          </div>
        </section>
      )}

      <hr />

      {/* Problem */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Where the leak shows up</div>
            <h2 className="serif">If any of these sound familiar, you have a {c.family.toLowerCase()} leak.</h2>
          </div>
          <ul className="lg:col-span-7 grid gap-0">
            {c.problem.map((p, i) => (
              <li key={i} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <p style={{ color: "var(--ink-2)" }}>{p}</p>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ul>
        </div>
      </section>

      <hr />

      {/* Build */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">What we build</div>
          <div className="grid gap-8 md:grid-cols-2">
            {c.build.map((b) => (
              <div key={b.title} className="card">
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{b.title}</h3>
                <p className="mt-3 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* Outcomes & Boundaries */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rule-label">What comes back</div>
            <h2 className="serif">Outcomes we measure.</h2>
            <ul className="mt-6 grid gap-0">
              {c.outcomes.map((o, i) => (
                <li key={i} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <span className="mono text-[0.72rem] mr-3" style={{ color: "var(--copper)" }}>▲</span>
                  <span style={{ color: "var(--ink)" }}>{o}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
          <div>
            <div className="rule-label">What this never does</div>
            <h2 className="serif">Boundaries we hold.</h2>
            <ul className="mt-6 grid gap-0">
              {c.boundaries.map((o, i) => (
                <li key={i} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <span className="mono text-[0.72rem] mr-3" style={{ color: "var(--ink-3)" }}>—</span>
                  <span style={{ color: "var(--ink-2)" }}>{o}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
        </div>
      </section>

      <hr />

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="rule-label">Common questions</div>
          <div className="grid gap-8 md:grid-cols-2">
            {c.faq.map((f) => (
              <div key={f.q}>
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }} dangerouslySetInnerHTML={{ __html: f.q }} />
                <p className="mt-3" style={{ color: "var(--ink-2)" }} dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-tight">
        <div className="container">
          <div className="rule-label">Related systems</div>
          <div className="grid gap-4 md:grid-cols-3">
            {site.systemFamilies.filter((s) => s.slug !== c.slug).slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/systems/${s.slug}`} className="card block">
                <div className="eyebrow">{s.family}</div>
                <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>{s.leak}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EndCta title={`Ready to close ${c.title.toLowerCase()} leaks?`} primary={{ label: c.cta.primary, href: "/system-review" }} />
    </>
  );
}
