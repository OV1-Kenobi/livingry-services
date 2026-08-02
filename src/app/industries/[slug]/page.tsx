import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industryContents, industrySlugs } from "@/lib/industry-content";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { HvacFieldContext } from "@/components/HvacFieldContext";

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = industryContents[slug];
  if (!c) return {};
  return {
    title: `${c.title} — AI Growth Systems for ${c.title.replace(" Companies", "").replace(" Practices", " Practices")}`,
    description: c.lede,
    alternates: { canonical: `/industries/${c.slug}` },
    openGraph: { title: `${c.title} — Livingry Services`, description: c.lede, type: "article" },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = industryContents[slug];
  if (!c) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: c.title, href: `/industries/${c.slug}` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${c.title} — AI Growth System`,
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: "United States",
    description: c.lede,
    url: `${site.primaryDomain}/industries/${c.slug}`,
    audience: { "@type": "BusinessAudience", audienceType: c.title },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${c.title} Implementation Modules`,
      itemListElement: c.modules.map((m) => ({ "@type": "Offer", name: m })),
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

      <section className="section paper-grain">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="eyebrow">{c.eyebrow}</span>
            <span className={`pill ${c.status === "active" ? "pill-active" : c.status === "next" ? "pill-next" : "pill-future"}`}>
              {c.statusLabel}
            </span>
          </div>
          <h1 className="serif mt-6">{c.hero}</h1>
          <p className="mt-7 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "50rem" }}>
            {c.lede}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {c.status === "active" ? (
              <Link href="/system-review" className="btn btn-primary">{c.cta.primary} <span aria-hidden>→</span></Link>
            ) : (
              <Link href="/industries" className="btn btn-secondary">See Active Industries</Link>
            )}
            <Link href="/how-it-works" className="btn btn-secondary">See the Method</Link>
          </div>
          {c.slug === "hvac" && (
            <p className="mt-8 text-[0.95rem]" style={{ color: "var(--ink-2)", maxWidth: "46rem" }}>
              Running an established US HVAC company?{" "}
              <Link href="/operations/hvac" className="link" style={{ color: "var(--forest)" }}>
                Explore HVAC Operations →
              </Link>{" "}
              or{" "}
              <Link href="/hvac/founding-five" className="link" style={{ color: "var(--forest)" }}>
                see the Founding Five HVAC program →
              </Link>
            </p>
          )}
        </div>
      </section>

      {c.slug === "hvac" && (
        <section className="section-tight">
          <div className="container">
            <HvacFieldContext />
          </div>
        </section>
      )}

      <hr />

      {/* Gaps */}
      <section className="section">
        <div className="container">
          <div className="rule-label">Where {c.title.toLowerCase()} lose already-earned value</div>
          <div className="grid gap-6 md:grid-cols-2">
            {c.gaps.map((g) => (
              <div key={g.title} className="card">
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{g.title}</h3>
                <p className="mt-3 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* Modules */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Implementation modules</div>
            <h2 className="serif">What we typically build for {c.title.toLowerCase()}.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              We do not deliver all of these at once. The System Review identifies the highest-value leak; we start there and add modules only where the evidence supports it.
            </p>
          </div>
          <ul className="lg:col-span-7 grid gap-0">
            {c.modules.map((m, i) => (
              <li key={i} className="py-4 flex items-baseline gap-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <span className="mono text-[0.72rem]" style={{ color: "var(--copper)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--ink)" }}>{m}</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ul>
        </div>
      </section>

      <hr />

      {/* What the system never does */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rule-label">What this system never does</div>
            <h2 className="serif">Boundaries we hold, on purpose.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Every implementation is designed so a customer, regulator, or professional reviewer can see exactly what the system will and will not do.
            </p>
          </div>
          <ul className="grid gap-0">
            {c.never.map((n, i) => (
              <li key={i} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <span className="mono text-[0.72rem] mr-3" style={{ color: "var(--ink-3)" }}>—</span>
                <span style={{ color: "var(--ink-2)" }}>{n}</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ul>
        </div>
      </section>

      <hr />

      {/* Review Questions */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container">
          <div className="rule-label" style={{ color: "var(--seal)" }}>System Review questions we start with</div>
          <div className="grid gap-6 md:grid-cols-2">
            {c.reviewQuestions.map((q, i) => (
              <div key={i} className="py-4" style={{ borderTop: "1px solid rgba(246,241,228,0.16)" }}>
                <span className="mono text-[0.72rem] mr-3" style={{ color: "var(--seal)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span dangerouslySetInnerHTML={{ __html: q }} />
              </div>
            ))}
          </div>
          {c.status === "active" && (
            <div className="mt-10">
              <Link href="/system-review" className="btn btn-primary" style={{ background: "var(--copper)", color: "var(--paper)" }}>
                {c.cta.primary} <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

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

      {c.status === "active" ? (
        <EndCta title={`Ready to close ${c.title.toLowerCase()} leaks?`} primary={{ label: c.cta.primary, href: "/system-review" }} />
      ) : (
        <EndCta title="Ready to explore what's available today?" primary={{ label: "See Active Industries", href: "/industries" }} />
      )}
    </>
  );
}
