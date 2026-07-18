import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const homepageFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Livingry Services do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Livingry Services helps useful businesses stop losing the customers, opportunities, knowledge, and trust they have already worked to earn. We design and implement growth, workflow, and AI systems that improve response, follow-up, customer continuity, internal knowledge, and discovery — using the team and tools clients already have.",
        },
      },
      {
        "@type": "Question",
        name: "Which industries do you currently serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HVAC companies are our active implementation focus. Roofing companies are our next active vertical and we are opening founding-partner conversations. Legal and medical professional practices are in governed pilot development.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Livingry Leakproofing Framework?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Find what is leaking, trace where it leaks, seal the highest-value gap with the smallest useful system, verify the leak is closing under real conditions, and keep the business stronger by documenting the system and preserving client control.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={homepageFaq} />

      {/* HERO */}
      <section className="section paper-grain" aria-labelledby="hero-heading">
        <div className="container">
          <div className="max-w-4xl">
            <div className="eyebrow">Livingry Services · Growth, Workflow, and AI Systems</div>
            <h1 id="hero-heading" className="serif mt-6">
              Stop losing the business you already worked to earn.
            </h1>
            <p className="mt-7 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "48rem" }}>
              Livingry Services finds where customers, leads, estimates, knowledge, and trust are leaking out of your business — then designs and implements the systems that help you capture more of what you have already earned.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <Link href="/system-review" className="btn btn-primary">Find My Biggest Leak <span aria-hidden>→</span></Link>
              <Link href="/what-we-build" className="btn btn-secondary">See What We Build</Link>
            </div>
            <p className="mt-8 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              Human-controlled · Measurable · Built around the people and systems you already have.
            </p>
          </div>

          {/* Current focus strip */}
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-start">
            <div className="eyebrow" style={{ color: "var(--ink-3)" }}>Current implementation focus</div>
            <div className="lg:col-span-3 flex flex-wrap gap-2.5">
              <span className="pill pill-active">HVAC · Active</span>
              <span className="pill pill-next">Roofing · Founding partners</span>
              <span className="pill pill-future">Legal · In development</span>
              <span className="pill pill-future">Medical · In development</span>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* WHAT WE DO — leak table */}
      <section className="section" aria-labelledby="leaks-heading">
        <div className="container">
          <div className="rule-label">01 · What we do</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="leaks-heading" className="serif">
                Where does your business leak what it already earned?
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Most businesses do not only have a lead problem. They have a leakage problem: attention is earned but not captured; trust is built but not carried forward; knowledge exists but cannot be used; and good prospects disappear between one step and the next.
              </p>
              <div className="mt-8">
                <Link href="/system-review" className="btn btn-primary">Find My Biggest Leak <span aria-hidden>→</span></Link>
              </div>
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

      {/* METHOD */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="method-heading">
        <div className="container">
          <div className="rule-label">02 · The method</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="method-heading" className="serif">The Livingry Leakproofing Framework.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                We do not start by adding another tool. We start by identifying the point where value leaks out of the business — then close that gap with the smallest practical combination of process, content, training, automation, AI, and human accountability.
              </p>
              <p className="mt-4 serif italic" style={{ color: "var(--copper-2)", fontSize: "var(--step-1)" }}>
                Find the leak. Seal the gap. Keep more of what you already earned.
              </p>
            </div>
            <ol className="lg:col-span-7 grid gap-0">
              {site.method.map((m, i) => (
                <li key={m.n} className="grid grid-cols-[auto_1fr] gap-6 py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <div className="num" style={{ minWidth: "3rem" }}>{m.n}</div>
                  <div>
                    <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{m.name}</h3>
                    <p className="mt-2 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{m.blurb}</p>
                  </div>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ol>
          </div>
        </div>
      </section>

      <hr />

      {/* INDUSTRIES */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <div className="rule-label">03 · Industries</div>
          <div className="max-w-3xl">
            <h2 id="industries-heading" className="serif">Built for the realities of your industry.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The underlying method stays consistent. The workflows, language, data, approvals, and handoffs must fit the business that will use them.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {site.industries.map((ind) => (
              <Reveal key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="card block h-full transition-transform"
                  style={{ transitionDuration: "180ms" }}
                >
                  <span className={`pill ${ind.status === "active" ? "pill-active" : ind.status === "next" ? "pill-next" : "pill-future"}`}>
                    {ind.statusLabel}
                  </span>
                  <h3 className="serif mt-5">{ind.title}</h3>
                  <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{ind.promise}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[0.9rem]" style={{ color: "var(--forest)" }}>
                    {ind.cta} <span aria-hidden>→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* WHY LIVINGRY */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="why-heading">
        <div className="container">
          <div className="rule-label" style={{ color: "var(--seal)" }}>
            <span style={{ color: "var(--seal)" }}>04 · Why livingry</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="why-heading" className="serif" style={{ color: "var(--paper)" }}>
                Technology should increase our capacity to care for life — and for the useful work of the people around us.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p style={{ color: "var(--paper)", opacity: 0.85 }}>
                The name comes from Buckminster Fuller&apos;s distinction between <em>weaponry</em> and <em>livingry</em>: systems directed toward human-life advantage rather than conflict, waste, and extraction.
              </p>
              <p className="mt-4" style={{ color: "var(--paper)", opacity: 0.85 }}>
                Livingry Services applies that principle at the organizational level. We help useful businesses and practices use modern tools — including AI — to respond to people faster, reduce wasted effort, preserve hard-won knowledge, and keep responsibility in human hands.
              </p>
              <div className="mt-8">
                <Link href="/why-livingry" className="btn btn-secondary" style={{ borderColor: "var(--paper)", color: "var(--paper)" }}>
                  Read the full thinking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <div className="eyebrow">Free · No sales pressure</div>
              <h2 id="cta-heading" className="serif mt-4" style={{ fontSize: "var(--step-4)" }}>
                Find the highest-value leak in your business.
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                In one focused review, we identify where demand, customer trust, knowledge, or capacity is escaping — and the first system worth building to close it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/system-review" className="btn btn-primary">Find My Biggest Leak <span aria-hidden>→</span></Link>
              <Link href="/faq" className="btn btn-ghost">Read the FAQ <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
