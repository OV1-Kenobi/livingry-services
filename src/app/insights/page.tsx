import type { Metadata } from "next";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Insights — Livingry Services",
  description: "Notes on AI implementation, leakproofing, agent discovery, and building AI-native systems inside real businesses.",
  alternates: { canonical: "/insights" },
};

const drafts = [
  {
    title: "Why &lsquo;more leads&rsquo; is almost never the actual problem",
    dek: "The single most common misdiagnosis in AI Growth engagements — and the leak-map that usually reveals what is really going on.",
    tag: "Method",
    date: "Coming soon",
  },
  {
    title: "Agent discovery is a fact problem, not a ranking problem",
    dek: "How to make your business easy for answer engines to describe accurately — without pretending you can control what they say.",
    tag: "Discovery & Trust",
    date: "Coming soon",
  },
  {
    title: "The boundary is the feature",
    dek: "Every AI system we install ships with a written list of things it will never do. That is what makes it safe to actually use.",
    tag: "Governance",
    date: "Coming soon",
  },
  {
    title: "What HVAC companies teach us about AI implementation",
    dek: "The dispatch board is the real product. The AI is just glue.",
    tag: "HVAC",
    date: "Coming soon",
  },
];

export default function Insights() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Insights"
        title="Field notes from implementing AI inside real businesses."
        lede="Short essays on leakproofing, agent discovery, human-in-the-loop design, and what actually happens when you install an AI-native workflow in an HVAC office, a roofing crew, or a professional practice."
      />
      <section className="section">
        <div className="container grid gap-4">
          {drafts.map((d) => (
            <article key={d.title} className="grid gap-4 lg:grid-cols-12 py-8" style={{ borderTop: "1px solid var(--ink)" }}>
              <div className="lg:col-span-3">
                <div className="eyebrow">{d.tag}</div>
                <div className="mono text-[0.82rem] mt-2" style={{ color: "var(--ink-3)" }}>{d.date}</div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="serif" style={{ fontSize: "var(--step-2)" }} dangerouslySetInnerHTML={{ __html: d.title }} />
                <p className="mt-3 max-w-2xl" style={{ color: "var(--ink-2)" }}>{d.dek}</p>
              </div>
            </article>
          ))}
          <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
            Publishing begins alongside the first HVAC and roofing implementations. If you would like to be notified, the System Review form includes an opt-in for occasional (rare) letters.
          </p>
        </div>
      </section>
      <EndCta />
    </>
  );
}
