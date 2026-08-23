import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { ProcessFlowDiagram } from "@/components/diagrams/ProcessFlowDiagram";
import { canonicalPositioningLine, revenueContinuityDefinition } from "@/lib/revenue-leaks/content";

export const metadata: Metadata = {
  title: "How It Works — Find, Trace, Seal, Verify",
  description:
    "Find the handoff most worth examining, trace the opportunity and its information, seal the smallest useful human-controlled layer, and verify under real conditions.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "01",
    name: "Find",
    short: "Identify the handoff most worth examining",
    body:
      "We start with the operational field, not a tool. The 17-point assessment and a direct look at your response paths name the calls, estimates, past customers, and completed jobs where opportunity is escaping — and which handoff is worth examining first.",
    deliverables: [
      "Priority ranking of the four revenue leaks against your operation",
      "The handoff most worth examining first",
      "First estimate of what is escaping at that handoff",
    ],
  },
  {
    n: "02",
    name: "Trace",
    short: "Follow the opportunity and its information",
    body:
      "Once the handoff is named, we trace the opportunity and its information from trigger to next action. This is where a 'we need more leads' problem often reveals itself as a follow-up problem, an ownership problem, or a record problem.",
    deliverables: [
      "The trigger, the responsible person, and the next action at each step",
      "Root-cause description of the break",
      "The evidence we will need to verify a fix has happened",
    ],
  },
  {
    n: "03",
    name: "Seal",
    short: "Design the smallest useful human-controlled layer",
    body:
      "We design the smallest useful layer around the break — capturing the information, organizing the record, preparing the response, and routing the next step. A named person remains responsible for approving consequential action.",
    deliverables: [
      "The designed layer and the approval points inside it",
      "Ownership, exception path, and audit record defined",
      "Standard service scope matched: Do It Yourself, Done With You, or Done For You",
    ],
  },
  {
    n: "04",
    name: "Verify",
    short: "Review what was captured, prepared, approved, completed, and recorded",
    body:
      "We verify under real conditions — what was captured, prepared, approved, completed, and recorded — against evidence agreed on before we started. A control that feels sealed and a control that is sealed are frequently different controls.",
    deliverables: [
      "Live owner exit-testing for guided implementations",
      "Baseline comparison against the agreed evidence",
      "Adjustments based on what the records actually show",
    ],
  },
];

export default function HowItWorks() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "How It Works", href: "/how-it-works" }];
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "The Find, Trace, Seal, Verify method",
    description: "Find the handoff most worth examining, trace the opportunity and its information, seal the smallest useful human-controlled layer, and verify what was captured, prepared, approved, completed, and recorded.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.body,
    })),
  };
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={howToLd} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="How It Works"
        title="Find the break before you pour more in."
        lede="The method is deliberately simple — Find, Trace, Seal, Verify. It exists to prevent the two most common consulting failures: adding technology that solves the wrong problem, and delivering a report that never becomes a working system."
        primaryCta={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondaryCta={{ label: "Book My Leak Assessment", href: "/leak-assessment" }}
      />
      <section className="section-tight">
        <div className="container">
          <div className="rule-label">The four steps at a glance</div>
          <ProcessFlowDiagram />
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-14">
          {steps.map((s) => (
            <div key={s.n} className="grid gap-6 lg:grid-cols-12" style={{ borderTop: "1px solid var(--ink)", paddingTop: "2.5rem" }}>
              <div className="lg:col-span-4">
                <div className="num">{s.n}</div>
                <h2 className="serif mt-3">{s.name}</h2>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--copper-2)" }}>{s.short}</p>
              </div>
              <div className="lg:col-span-8">
                <p style={{ color: "var(--ink-2)" }}>{s.body}</p>
                <div className="mt-6">
                  <div className="eyebrow">What that produces</div>
                  <ul className="mt-3 grid gap-2">
                    {s.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink)" }}>
                        <span aria-hidden style={{ color: "var(--copper)" }}>▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVENUE & DATA CONTINUITY — anchored for the footer Trust column */}
      <section className="section" style={{ background: "var(--paper-2)" }} id="data-continuity" aria-labelledby="continuity-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Revenue &amp; Data Continuity</div>
            <h2 id="continuity-heading" className="serif">What stays connected from one handoff to the next.</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="serif" style={{ fontSize: "var(--step-1)", lineHeight: 1.45, color: "var(--ink)" }}>
              {revenueContinuityDefinition}
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              The four steps above are how that continuity gets restored — at the one handoff that is
              worth examining first.
            </p>
          </div>
        </div>
      </section>

      {/* HUMAN CONTROL */}
      <section className="section" id="human-approval" aria-labelledby="human-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Human control</div>
            <h2 id="human-heading" className="serif">Faster, without removing accountability.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>{canonicalPositioningLine}</p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              The operating layer can capture information, organize the record, prepare a response, and
              route the next step. A named person remains responsible for approving consequential
              action — and the exception path routes anything urgent, ambiguous, or consequential to a
              human before it travels.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* WIN/WIN/WIN */}
      <section className="section" style={{ background: "var(--paper-2)" }} id="winwinwin" aria-labelledby="www-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Win/Win/Win</div>
            <h2 id="www-heading" className="serif">Livingry Services wins when its clients win because their customers win.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              If a proposed system does not improve that chain of service, Livingry Services should not
              recommend building it. This is the only sustainable path for service industries.
            </p>
          </div>
          <div className="lg:col-span-7 grid gap-3">
            <div className="card">
              <div className="eyebrow">The customer wins</div>
              <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                Through clearer, more consistent service and fewer dropped handoffs.
              </p>
            </div>
            <div className="card">
              <div className="eyebrow">The client wins</div>
              <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                By capturing more value from work and demand already created, while retaining judgment
                and control.
              </p>
            </div>
            <div className="card">
              <div className="eyebrow">Livingry Services wins</div>
              <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                By being paid for systems and support that improve that service chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE DIAGNOSTIC PATH */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Start here</div>
            <h2 className="serif">Diagnose before you buy or build.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              More traffic does not repair a broken handoff. Find what is worth fixing before adding
              another lead source or disconnected tool.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card h-full">
                <div className="eyebrow">Self-assessment</div>
                <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>HVAC Cash Flow Leak Diagnostic</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  A 17-point self-assessment scoring four handoffs — missed calls, dropped
                  estimates, past customers, and lost referrals. Directional findings,
                  nothing stored or sent.
                </p>
                <div className="mt-5">
                  <Link href="/assessment" className="link" style={{ color: "var(--forest)" }}>
                    Take the diagnostic →
                  </Link>
                </div>
              </div>
              <div className="card h-full">
                <div className="eyebrow">With Michael</div>
                <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>Leak Assessment</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  Trace one suspected leak from first trigger to next broken handoff. You leave with the
                  priority and reasoning whether or not you hire us.
                </p>
                <div className="mt-5">
                  <Link href="/leak-assessment" className="link" style={{ color: "var(--forest)" }}>
                    See how the Leak Assessment works →
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/services-and-pricing" className="btn btn-secondary">
                See Services &amp; Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EndCta
        title="Find the leak before you buy more traffic."
        primary={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondary={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />
    </>
  );
}