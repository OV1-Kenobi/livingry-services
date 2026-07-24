import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { ProcessFlowDiagram } from "@/components/diagrams/ProcessFlowDiagram";

export const metadata: Metadata = {
  title: "How It Works — The Livingry Leakproofing Framework",
  description: "Find the leak. Seal the gap. Keep more of what you already earned. A five-step framework for closing the highest-value gap in your business.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "01", name: "Find", short: "Identify the leaks",
    body: "We start by identifying the leads, customers, knowledge, and trust already leaking away — not by picking a tool. The System Review is a structured conversation and observation of your website, response paths, CRM records, customer journey, discovery presence, and internal knowledge.",
    deliverables: ["Leak inventory across response, recovery, continuity, discovery, knowledge, and workflow", "First estimate of value at risk", "Priority ranking by impact and cost to close"],
  },
  {
    n: "02", name: "Trace", short: "Map where the loss happens",
    body: "Once the leaks are named, we trace exactly where in the customer journey, workflow, or information path each one occurs. This is where a &lsquo;we need more leads&rsquo; problem often reveals itself as a follow-up problem, a routing problem, or an evidence problem.",
    deliverables: ["Journey and workflow map annotated with leak points", "Root-cause description per leak", "System family recommendation (Response, Recovery, Continuity, Discovery, Knowledge, Workflow)"],
  },
  {
    n: "03", name: "Seal", short: "Build the smallest useful system",
    body: "We build the smallest practical improvement that closes the highest-value gap. Depending on the leak, that may be a follow-up sequence, a routing rule, a service page, an AI-assisted intake, a knowledge assistant, or a workflow redesign — with real content, real integrations, and real ownership.",
    deliverables: ["Working system in your existing tools", "Content, workflow, and approval definitions", "Documented ownership and change process"],
  },
  {
    n: "04", name: "Verify", short: "Prove it under real conditions",
    body: "We measure whether the gap is closing under real conditions — response time, conversations recovered, appointments booked, estimates revived, staff time saved, or discovery clarity — using evidence agreed upon before we start.",
    deliverables: ["Baseline vs. post-implementation metrics", "Qualitative review with the affected team", "Adjustments based on what the evidence actually shows"],
  },
  {
    n: "05", name: "Keep", short: "Leave your team stronger",
    body: "We leave the business stronger: documented system, client-owned accounts and data, trained team, portable configuration, and no unnecessary dependency on Livingry Services. If it makes sense to continue, we do; if it does not, we do not.",
    deliverables: ["System documentation and runbook", "Ownership and escalation defined", "Optional monthly implementation retainer for continued improvement"],
  },
];

export default function HowItWorks() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "How It Works", href: "/how-it-works" }];
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "The Livingry Leakproofing Framework",
    description: "A five-step framework for stopping already-earned value from leaking away.",
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
        title="Find the leak. Seal the gap. Keep more of what you already earned."
        lede="The Livingry Leakproofing Framework is deliberately simple. It exists to prevent the two most common consulting failures: adding technology that solves the wrong problem, and delivering a report that never becomes a working system."
        primaryCta={{ label: "Find My Biggest Leak", href: "/system-review" }}
      />
      <section className="section-tight">
        <div className="container">
          <div className="rule-label">The five steps at a glance</div>
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
                <p style={{ color: "var(--ink-2)" }} dangerouslySetInnerHTML={{ __html: s.body }} />
                <div className="mt-6">
                  <div className="eyebrow">Deliverables</div>
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

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">Which system family fits your leak</div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {site.systemFamilies.map((s) => (
              <a key={s.slug} href={`/systems/${s.slug}`} className="card block">
                <div className="eyebrow">{s.family}</div>
                <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>{s.leak}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
