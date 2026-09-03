import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { IllustrativeImage } from "@/components/IllustrativeImage";
import { homepageMethod } from "@/lib/homepage-framework";
import { revenueLeaks, canonicalPositioningLine } from "@/lib/revenue-leaks/content";
import { serviceLevels } from "@/lib/services-pricing/content";

// Homepage FAQ — four questions per the plan's message hierarchy. Answers
// promise no outcome, figure, or fixed timeline.
const homepageFaq = [
  {
    q: "What does Livingry Services do?",
    a: "Livingry Services helps established HVAC/R companies work the calls, estimates, past customers, and referrals they already paid to create — while keeping people accountable for consequential decisions.",
  },
  {
    q: "Is this lead generation or another CRM?",
    a: "No. We are not a lead-gen agency, a customer relationship management (CRM) replacement, or a generic automation shop. We diagnose where already-created value escapes and design the smallest human-controlled layer that keeps it connected.",
  },
  {
    q: "Will AI make decisions without human approval?",
    a: "Consequential actions remain human-approved. The operating layer can capture information, organize the record, prepare a response, and route the next step — but a named person stays responsible for approving anything that commits the company.",
  },
  {
    q: "What does a diagnostic result actually tell me?",
    a: "It returns a directional read: the likely priority leak, why it ranked first, the inputs and assumptions behind it, and one check you can run immediately. It is not a revenue forecast or a promise.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Revenue Clarity & Capture for HVAC/R Companies — Livingry Services" },
  description:
    "Livingry Services helps established HVAC/R companies work the calls, estimates, past customers, and referrals they already paid to create — while keeping people accountable for consequential decisions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Before you buy more leads, find where the ones you already paid for are leaking out.",
    description:
      "Diagnose the four cash-flow leaks — missed calls, dropped estimates, dead client lists, and lost referrals and reviews — before adding another lead source or tool.",
    url: "/",
    type: "website",
  },
};

const diagnosticsReturns = [
  "Likely priority leak",
  "Why it ranked first",
  "Inputs and assumptions",
  "Information or ownership break",
  "One immediate check",
  "What requires live validation",
  "A directional opportunity indicator only if approved",
];

const evidenceLadder = [
  { n: "1", label: "Founder Experience", detail: "Michael's firsthand history and observation — never presented as client proof or industry benchmark." },
  { n: "2", label: "Verified Facts", detail: "Directly supported by a saved, accessible source." },
  { n: "3", label: "Strategic Opinions", detail: "Clearly framed operating judgment, clearly labelled as such." },
  { n: "4", label: "Method demonstrations", detail: "The Find → Trace → Seal → Verify method, shown under controlled conditions." },
  { n: "5", label: "Public Demo · Demo Data", detail: "Synthetic demonstrations, always labelled as demo data — never presented as client results." },
  { n: "6", label: "Product artifacts", detail: "The Livingry Ops operating layer, shown in client-branded form." },
  { n: "7", label: "Approved pilot observations", detail: "Published only with permission and evidence." },
  { n: "8", label: "Documented client outcomes", detail: "Published only after measurement is documented — none exist yet." },
];

export default function Home() {
  const homepageFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={homepageFaqLd} />

      {/* HERO — Revenue Clarity & Capture per plan §6 */}
      <section className="section paper-grain" aria-labelledby="hero-heading">
        <div className="container">
          <div className="max-w-4xl">
            <div className="eyebrow">Revenue Clarity &amp; Capture for established HVAC/R operators</div>
            <h1 id="hero-heading" className="serif mt-6">
              Before you buy more leads, find where the ones you already paid for are leaking out.
            </h1>
            <p className="mt-6 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)" }}>
              {canonicalPositioningLine}
            </p>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <Link href="/assessment" className="btn btn-primary">
                Diagnose My Cash Flow Leaks <span aria-hidden>→</span>
              </Link>
              <Link href="/services-and-pricing" className="link" style={{ color: "var(--forest)" }}>
                See services and pricing
              </Link>
            </div>
            <p className="mt-8 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              A 17-point self-assessment with directional findings—not a revenue forecast or promise.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* REFRIGERANT-LEAK SECTION — plan §6 */}
      <section className="section" aria-labelledby="refrigerant-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The refrigerant analogy</div>
            <h2 id="refrigerant-heading" className="serif">
              Adding more leads to a leaking system can raise the cost without fixing the problem.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              An HVAC system can keep running while refrigerant escapes at a connection. A shop can look
              busy while opportunities escape between the phone call, estimate, customer record, completed
              job, and next follow-up. The first job is to identify the break—not pour more into the
              system.
            </p>
            <p className="mt-4 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              Claim label: Strategic Opinion supported by a familiar operating analogy. Not an audited
              financial result, industry benchmark, or outcome promise.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* FOUR OBSERVABLE LEAKS — plan §6, each card links to its landing page */}
      <section className="section" aria-labelledby="leaks-heading">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rule-label">01 · Four observable leaks</div>
              <h2 id="leaks-heading" className="serif">Every shop can check all four today.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Each leak is a handoff where the opportunity and the information needed to act on it stop
                connecting. The continuity break names where it happens; the diagnostic question is the
                one worth asking about your own operation.
              </p>
              <p className="mt-6">
                <Link href="/revenue-leaks" className="link" style={{ color: "var(--forest)" }}>
                  Read the four leaks in full →
                </Link>
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-4 md:grid-cols-2">
              {revenueLeaks.map((leak) => (
                <Link
                  key={leak.slug}
                  href={`/revenue-leaks/${leak.slug}`}
                  className="card block"
                  style={{ borderTop: "3px solid var(--forest)" }}
                >
                  <div className="eyebrow">{leak.shortName}</div>
                  <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{leak.name}</h3>
                  <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>
                    <span style={{ color: "var(--copper-2)" }}>The break:</span> {leak.continuityBreak}
                  </p>
                  <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink)" }}>
                    <span style={{ color: "var(--forest)" }}>Diagnostic question:</span> {leak.diagnosticQuestion}
                  </p>
                  <div className="mt-4">
                    <span className="link" style={{ color: "var(--forest)" }}>{leak.actionLabel} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* HOW IT WORKS — four steps per plan §6 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="method-heading">
        <div className="container">
          <div className="rule-label">02 · How it works</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="method-heading" className="serif">Find the break before you pour more in.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                More traffic does not repair a broken handoff. The method finds what is worth fixing
                before another lead source or disconnected tool is added — then builds the smallest
                useful human-controlled layer and verifies it under real conditions.
              </p>
              <p className="mt-6">
                <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>
                  Read the full framework →
                </Link>
              </p>
            </div>
            <ol className="lg:col-span-7 grid gap-0">
              {homepageMethod.map((m, i) => (
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

      {/* WHAT THE DIAGNOSTIC RETURNS — plan §6 */}
      <section className="section" aria-labelledby="diagnostic-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">03 · What the diagnostic returns</div>
            <h2 id="diagnostic-heading" className="serif">Directional findings, not a forecast.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The 17-point self-assessment covers missed calls, dropped estimates, past customers, and
              lost referrals, reviews, and testimonials. Your answers stay in the browser tab; the result
              tells you what appears to be leaking and what to check first.
            </p>
            <div className="mt-7">
              <Link href="/assessment" className="btn btn-primary">
                Diagnose My Cash Flow Leaks <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-0">
              {diagnosticsReturns.map((item, i) => (
                <li key={item} className="py-3" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
          </div>
        </div>
      </section>

      <hr />

      {/* EVIDENCE LADDER — plan §6 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="evidence-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">04 · Evidence</div>
            <h2 id="evidence-heading" className="serif">Eight rungs, and we only claim what we hold.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Every consequential claim on this site carries a label: Founder Experience, Verified Fact,
              Strategic Opinion, or Requires Verification. No client outcomes are published yet — so the
              site does not call itself Results.
            </p>
            <p className="mt-6">
              <Link href="/evidence" className="link" style={{ color: "var(--forest)" }}>
                Read the full evidence ladder →
              </Link>
            </p>
          </div>
          <div className="lg:col-span-7 grid gap-0">
            {evidenceLadder.map((rung, i) => (
              <div key={rung.n} className="grid grid-cols-[auto_1fr] gap-6 py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
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
      </section>

      <hr />

      {/* HUMAN CONTROL — plan §6, anchored for the footer Trust column */}
      <section className="section" id="human-approval" aria-labelledby="human-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">05 · Human control</div>
            <h2 id="human-heading" className="serif">The work can move faster without removing accountability.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>{canonicalPositioningLine}</p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              The operating layer can capture information, organize the record, prepare a response, and
              route the next step. A named person remains responsible for approving consequential action.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* WHY MICHAEL — lead with lived experience per plan §6 */}
      <section className="section" aria-labelledby="founder-heading">
        <div className="container">
          <div className="rule-label">06 · Who does the work</div>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <h2 id="founder-heading" className="serif">Built by someone who has done the work</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Michael Ovsen ran work as a solo residential contractor and has hands-on trade
                experience — HVAC, solar, and permaculture — before years of building AI agents and
                Bitcoin-native payment infrastructure. He watches a shop through the eyes of the person
                holding the invoice, not the dashboard.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Before I built Livingry, I ran work as a solo residential contractor. I know what it is like to pay for a lead and lose it before I could put the tools down. The phone would buzz in my pocket while I had tools in my hands and a client watching. Some of those paid leads were being sent to local competitors at the same time. The first contractor to respond had the advantage. I was not ignoring the opportunity. I was doing the work the last opportunity had already paid me to do.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                That is one reason Livingry begins with missed-call recovery.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Livingry Services is his estimate that more than
                30 percent of his own productive capacity went unrealized because the work and its
                records never connected — a Founder Experience estimate, not audited revenue, a typical
                result, or a client outcome.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Livingry Services is an independent practice, not a vendor's reseller. The relevant
                qualifications are field experience, hands-on contracting, and years building
                human-controlled AI systems.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/about" className="link" style={{ color: "var(--forest)" }}>Read the full story →</Link>
                <Link href="/evidence" className="link" style={{ color: "var(--forest)" }}>How claims are labelled →</Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <figure className="diagram" style={{ maxWidth: "26rem" }}>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--rule)" }}>
                  <IllustrativeImage
                    base="founder-origin-collage"
                    height={800}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    alt="Editorial illustration of three credential-loss failure modes — a fire-damaged frame, a disappeared issuer, and a rebranded company — resolving into owner-controlled custody. Illustration, not a documentary portrait."
                  />
                </div>
                <figcaption>Editorial illustration of the origin story — not a documentary portrait.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* WIN/WIN/WIN — canonical definition per plan §12, anchored for the footer */}
      <section className="section" id="winwinwin" aria-labelledby="www-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">07 · Win/Win/Win</div>
            <h2 id="www-heading" className="serif">Livingry Services wins when its clients win because their customers win.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              This is the only sustainable path for service industries. If a proposed system does not
              improve that chain of service, Livingry Services should not recommend building it.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="card">
                <div className="eyebrow">The customer wins</div>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  Through clearer, more consistent service and fewer dropped handoffs.
                </p>
              </div>
              <div className="card">
                <div className="eyebrow">The client wins</div>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  By capturing more value from work and demand already created, while retaining judgment and control.
                </p>
              </div>
              <div className="card">
                <div className="eyebrow">Livingry Services wins</div>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  By being paid for systems and support that improve that service chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* SERVICES PREVIEW — all three choices with base prices per plan §6 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="services-heading">
        <div className="container">
          <div className="rule-label">08 · Services &amp; Pricing</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="services-heading" className="serif">Choose planning, guided implementation, or active management.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                The standard scope and price are visible before you decide whether to talk. A sales call
                may clarify fit; it never reveals a previously hidden standard price.
              </p>
              <p className="mt-6">
                <Link href="/services-and-pricing" className="btn btn-primary">
                  See Services &amp; Pricing <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-4 md:grid-cols-3">
              {serviceLevels.map((level) => (
                <div key={level.id} className="card h-full">
                  <div className="eyebrow">{level.shortName}</div>
                  <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{level.name}</h3>
                  <p className="mt-3 serif" style={{ color: "var(--forest)", fontSize: "var(--step-1)" }}>
                    {level.priceLine}
                  </p>
                  <p className="mt-3 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>
                    {level.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* FAQ — four questions */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="rule-label">09 · Common questions</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-heading" className="serif">Questions people actually ask</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Straight answers about what Livingry Services does, what it will not do, and where the
                human stays accountable.
              </p>
              <p className="mt-6 flex flex-wrap gap-4">
                <Link href="/faq" className="link" style={{ color: "var(--forest)" }}>Read the full FAQ →</Link>
                <Link href="/insights" className="link" style={{ color: "var(--forest)" }}>Insights →</Link>
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

      {/* FINAL ACTION — plan §6 */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <h2 id="cta-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
              Find the leak before you buy more traffic.
            </h2>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/assessment" className="btn btn-primary">
                Diagnose My Cash Flow Leaks <span aria-hidden>→</span>
              </Link>
              <Link href="/services-and-pricing" className="btn btn-ghost">
                See services and pricing <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}