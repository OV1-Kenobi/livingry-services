import type { Metadata } from "next";
import Link from "next/link";
import { faqSections } from "@/lib/faq";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Livingry Services",
  description: "Answers about Livingry Services, the Leakproofing Framework, AI implementation, agent discovery, industries, and how engagements work.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }];

  // Aggregate FAQPage schema — helpful for AI answer engines.
  const allItems = faqSections.flatMap((s) => s.items);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={faqLd} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Frequently asked questions"
        title="Answers, in one place."
        lede="Everything a prospective client, a partner, or an AI agent researching Livingry Services on someone&rsquo;s behalf should be able to find quickly."
        primaryCta={{ label: "Find My Biggest Leak", href: "/system-review" }}
        secondaryCta={{ label: "For AI Agents", href: "/agents" }}
      />

      <section className="section-tight">
        <div className="container">
          <nav aria-label="FAQ sections" className="flex flex-wrap gap-2">
            {faqSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="pill"
                style={{ background: "var(--paper-2)" }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {faqSections.map((section) => (
        <section key={section.id} id={section.id} className="section" style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="container grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rule-label">{section.title}</div>
              {section.blurb && <p className="mt-3" style={{ color: "var(--ink-2)" }}>{section.blurb}</p>}
            </div>
            <div className="lg:col-span-8 grid gap-0">
              {section.items.map((f, i) => (
                <details
                  key={f.q}
                  className="py-5"
                  style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                >
                  <summary className="serif cursor-pointer list-none flex items-baseline justify-between gap-6" style={{ fontSize: "var(--step-1)" }}>
                    <span dangerouslySetInnerHTML={{ __html: f.q }} />
                    <span aria-hidden style={{ color: "var(--copper)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>+</span>
                  </summary>
                  <p className="mt-4" style={{ color: "var(--ink-2)" }} dangerouslySetInnerHTML={{ __html: f.a }} />
                </details>
              ))}
              <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </div>
          </div>
        </section>
      ))}

      <section className="section-tight">
        <div className="container">
          <div className="rule-label">Industry-specific FAQ</div>
          <p className="max-w-2xl" style={{ color: "var(--ink-2)" }}>
            Each industry page has its own FAQ tailored to that vertical&rsquo;s workflows, tools, and constraints.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/industries/hvac" className="btn btn-secondary">HVAC FAQ</Link>
            <Link href="/industries/roofing" className="btn btn-secondary">Roofing FAQ</Link>
            <Link href="/industries/professional-practices" className="btn btn-secondary">Professional Practices FAQ</Link>
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
