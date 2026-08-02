import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { homepageFaq } from "@/lib/faq";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { OrchestrationGraphic } from "@/components/diagrams/OrchestrationGraphic";

export const metadata: Metadata = {
  title: "AI General Contracting for HVAC/R Operations — Livingry Services",
  description:
    "Livingry Operations coordinates specialist AI tools, workflows, and human approvals to close operational leaks without forcing businesses into another disconnected platform.",
  alternates: { canonical: "/operations" },
  openGraph: {
    title: "AI General Contracting for HVAC/R Operations — Livingry Services",
    description:
      "You run the business. We coordinate the AI stack behind it.",
    url: "/operations",
    type: "website",
  },
};

export default function Operations() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Operations", href: "/operations" },
  ];

  // FAQPage schema for the 6 operations questions (full set per spec §4.5)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Service schema for AI General Contracting per spec §4.6
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI General Contracting for HVAC/R Operations",
    serviceType: "Operational AI implementation and governance",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "Livingry Operations curates, integrates, and governs AI tools inside the systems a business already runs — closing the places where leads, estimates, customers, knowledge, and trust leak away.",
    url: `${site.primaryDomain}/operations`,
  };

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={faqLd} />
      <JsonLd data={serviceLd} />
      <Breadcrumbs items={crumbs} />

      {/* HERO per spec §4.2.1 */}
      <PageHero
        eyebrow="Livingry Operations · AI general contracting"
        title="You run the business. We coordinate the AI stack behind it."
        lede="Livingry Operations curates, integrates, and governs specialist AI tools inside the systems you already run — closing the places where leads, estimates, customers, knowledge, and trust leak away, with humans accountable throughout."
        primaryCta={{ label: "Find the highest-value leak", href: "/system-review" }}
        secondaryCta={{ label: "See the method", href: "/how-it-works" }}
      />

      <hr />

      {/* GC EXPLANATION per spec §4.2.2 — Written ONCE here, disclaimer included */}
      <section className="section" aria-labelledby="gc-heading">
        <div className="container">
          <div className="rule-label">01 · The AI general contractor role</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="gc-heading" className="serif">What is AI general contracting?</h2>
              <p className="mt-5 serif" style={{ fontSize: "var(--step-1)", lineHeight: 1.45, color: "var(--ink)" }}>
                An outside partner who curates, integrates, and governs AI tools across your operation the way a building general contractor hires and coordinates subcontractors.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-5">
              <p style={{ color: "var(--ink-2)" }}>
                A general contractor does not pour the foundation or run the wire. They hire the right subs, sequence the work, hold them to scope, and own the result. <strong>For your business&rsquo;s AI stack, we play that role.</strong> You never need to choose between two scheduling tools, stand up a retrieval layer, or work out how a chatbot should behave against your CRM. That is our job.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                Running an HVAC/R operation is already a full-time job, and AI tooling changes faster than any owner can track. Most of what is written about &ldquo;AI for business&rdquo; is either a vendor pitch or a shallow list. <strong>We sit between you and the AI vendors</strong> — testing, comparing, integrating, governing, and handing the keys back to your team.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                The belief worth discarding first is that <em>AI is one tool you can buy that will fix the leak.</em> It is not. Every workflow that loses value has its own shape, and each leak needs the right tool wired in correctly — with a person still accountable for anything a customer will read as a promise.
              </p>
              <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)", fontStyle: "italic" }}>
                Disclaimer: Livingry does not perform licensed HVAC work. We build operational systems; technical judgment, licensure, and customer relationships remain with your qualified team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* SEVEN SYSTEM FAMILIES per spec §4.2.3 — Full Leak/Fix/AI-GC-here for each */}
      <section className="section" aria-labelledby="systems-heading">
        <div className="container">
          <div className="rule-label">02 · Eight system families</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="systems-heading" className="serif">Where does your business leak what it already earned?</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Most businesses do not only have a lead problem. They have a leakage problem: attention is earned but not captured; trust is built but not carried forward; knowledge exists but cannot be used; and good prospects disappear between one step and the next.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Each of the eight system families below names a specific leak — and the AI work we take on to close it.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-0">
                {site.systemFamilies.map((s, i) => (
                  <li key={s.slug}>
                    <Link
                      href={`/systems/${s.slug}`}
                      className="grid gap-1 py-6 group"
                      style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                        <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="mt-1 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                        <span style={{ color: "var(--copper-2)" }}>Leak · </span>{s.leak}
                      </div>
                      <div className="text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                        <span style={{ color: "var(--forest)" }}>Fix · </span>{s.improves}
                      </div>
                      <p className="mt-2 text-[0.92rem]" style={{ color: "var(--ink-2)", borderLeft: "2px solid var(--copper)", paddingLeft: "0.85rem" }}>
                        <span className="eyebrow" style={{ color: "var(--copper-2)" }}>AI general contracting here</span>
                        <span className="block mt-1.5">{s.aiGc}</span>
                      </p>
                    </Link>
                  </li>
                ))}
                <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* PLATFORM COMPARISON TABLE per spec §4.2.4 and §4.3 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="comparison-heading">
        <div className="container">
          <div className="rule-label">03 · How Livingry Operations is different</div>
          <div className="max-w-4xl">
            <h2 id="comparison-heading" className="serif">Not another AI platform</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Generic AI platforms start with what they have. Livingry Operations starts with what your business actually needs — then curates, integrates, and governs the right tools to close it.
            </p>
          </div>

          {/* LEGAL_NEEDS_REVIEW marker per spec §4.3 */}
          {/* LEGAL_NEEDS_REVIEW: comparative marketing claim */}
          <div className="mt-10 overflow-x-auto">
            <table className="gc-table" role="table">
              <caption className="sr-only">
                Comparison between generic AI platforms and Livingry Operations approach
              </caption>
              <thead>
                <tr>
                  <th scope="col">Generic AI platform</th>
                  <th scope="col">Livingry Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Generic AI platform">Starts with available agents</td>
                  <td data-label="Livingry Operations">Starts with the operational leak</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Broad, generic workflows</td>
                  <td data-label="Livingry Operations">Industry-specific policy packs</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Measures tasks</td>
                  <td data-label="Livingry Operations">Measures operational outcomes</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Platform-controlled memory</td>
                  <td data-label="Livingry Operations">Governed, portable context</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Encourages broad autonomy</td>
                  <td data-label="Livingry Operations">Assigns bounded authority</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Depends on one ecosystem</td>
                  <td data-label="Livingry Operations">Coordinates replaceable specialist tools</td>
                </tr>
                <tr>
                  <td data-label="Generic AI platform">Self-service configuration</td>
                  <td data-label="Livingry Operations">Expert-led implementation and verification</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr />

      {/* INDUSTRIES per spec §4.2.5 and §4.4 */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <div className="rule-label">04 · Industries</div>
          <div className="max-w-3xl">
            <h2 id="industries-heading" className="serif">Built for the realities of your industry</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The underlying method stays consistent. The workflows, language, data, approvals, and handoffs must fit the business that will use them.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {site.industries.map((ind) => (
              <div key={ind.slug} className="card">
                <span className={`pill ${ind.status === "active" ? "pill-active" : ind.status === "next" ? "pill-next" : "pill-future"}`}>
                  {ind.statusLabel}
                </span>
                <h3 className="serif mt-5">{ind.title}</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{ind.promise}</p>
                <div className="mt-6">
                  <Link href={`/industries/${ind.slug}`} className="link" style={{ color: "var(--forest)" }}>
                    {ind.cta} <span aria-hidden>→</span>
                  </Link>
                </div>
                {/* HVAC Founding Five secondary CTAs per spec §4.4 */}
                {ind.slug === "hvac" && (
                  <div className="mt-3 grid gap-1.5">
                    <Link href="/operations/hvac" className="link text-[0.9rem]" style={{ color: "var(--copper-2)" }}>
                      Explore HVAC Operations <span aria-hidden>→</span>
                    </Link>
                    <Link href="/hvac/founding-five" className="link text-[0.9rem]" style={{ color: "var(--copper-2)" }}>
                      See the Founding Five pilot <span aria-hidden>→</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* OPS DEMO per spec §4.2.6 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="demo-heading">
        <div className="container">
          <div className="rule-label">05 · See how the systems coordinate</div>
          <div className="max-w-3xl">
            <h2 id="demo-heading" className="serif">One operations layer over eight categories</h2>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              Individual systems close individual leaks. The Ops layer is the ninth layer: it observes and coordinates across all eight categories, applies policy gates, and keeps a human in control of every consequential action.
            </p>
          </div>
          <div className="mt-10">
            <OrchestrationGraphic />
          </div>
          <div className="mt-8">
            <Link href="/ops" className="btn btn-primary">
              Explore the Ops demo dashboard <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <hr />

      {/* WHO THIS IS FOR / NOT FOR per spec §4.2.7 — mirrors HVAC Founding Five fit pattern */}
      <section className="section" aria-labelledby="fit-heading">
        <div className="container">
          <div className="rule-label">06 · Who this is for</div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 id="fit-heading" className="serif">This is for you if:</h2>
              <ul className="mt-6 grid gap-3">
                <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>You run an established U.S. HVAC/R operation</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>You lose leads, estimates, customers, or knowledge in ways you can name</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>You want AI to help your team, not replace your judgment</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>You want to own the tools and keep the records if the relationship ends</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                  <span>You are willing to measure whether a system is actually closing the leak</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="serif">This is not for you if:</h2>
              <ul className="mt-6 grid gap-3">
                <li className="flex gap-3" style={{ color: "var(--ink-3)" }}>
                  <span aria-hidden>✗</span>
                  <span>You want a platform that does everything for everyone</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-3)" }}>
                  <span aria-hidden>✗</span>
                  <span>You need AI to make decisions without human review</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-3)" }}>
                  <span aria-hidden>✗</span>
                  <span>You want the fastest, cheapest chatbot rather than the right system</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-3)" }}>
                  <span aria-hidden>✗</span>
                  <span>You are looking for a strategy report instead of a working implementation</span>
                </li>
                <li className="flex gap-3" style={{ color: "var(--ink-3)" }}>
                  <span aria-hidden>✗</span>
                  <span>You cannot name a specific workflow or customer journey that is leaking value</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* FAQ per spec §4.2.8 and §4.5 — All 6 questions from homepageFaq */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="rule-label">07 · Common questions</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-heading" className="serif">Questions business owners ask</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Straight answers about what an AI general contractor does, what we will not do, and where the human stays accountable.
              </p>
              <p className="mt-6">
                <Link href="/faq" className="link" style={{ color: "var(--forest)" }}>Read the full FAQ →</Link>
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-0">
              {homepageFaq.map((f, i) => (
                <div key={f.q} className="py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{f.q}</h3>
                  <p className="mt-3" style={{ color: "var(--ink-2)" }}>{f.a}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA per spec §4.2.8 — Dual CTA */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <h2 id="cta-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
                Find the highest-value leak
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                In one focused review, we identify where demand, customer trust, knowledge, or capacity is escaping — and the first system worth building to close it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/system-review" className="btn btn-primary">Find My Biggest Leak <span aria-hidden>→</span></Link>
              <Link href="/assessment" className="btn btn-ghost">Take the Leak Assessment <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

