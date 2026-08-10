import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { OrchestrationGraphic } from "@/components/diagrams/OrchestrationGraphic";

export const metadata: Metadata = {
  title: "What We Build — Livingry Systems",
  description: "Growth, workflow, knowledge, and discovery systems that stop already-earned value from leaking away. Response, Recovery, Continuity, Discovery & Trust, Knowledge, and Workflow Systems.",
  alternates: { canonical: "/what-we-build" },
};

const families = [
  { name: "Growth Systems", blurb: "Help useful demand reach the right next step.", slugs: ["response-systems", "recovery-systems", "customer-continuity"] },
  { name: "Discovery & Trust", blurb: "Make your business easier to understand, verify, and choose — for people and AI systems alike.", slugs: ["discovery-and-trust"] },
  { name: "Knowledge & Workflow", blurb: "Turn what your team knows into information the whole team can safely use, and coordinate the work between people, software, and (where appropriate) AI.", slugs: ["knowledge-systems", "workflow-systems"] },
];

export default function WhatWeBuild() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "What We Build", href: "/what-we-build" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="What We Build"
        title="Modern systems for useful work."
        lede="Every Livingry System begins with a real constraint: an unanswered customer, a fragmented handoff, knowledge that cannot be found, a process no one can see, or capacity that is being wasted. We use the smallest combination of people, process, information, automation, and AI that improves it."
        primaryCta={{ label: "Take the Revenue Leak Scorecard", href: "/hvac/founding-five#scorecard" }}
        secondaryCta={{ label: "See the Method", href: "/how-it-works" }}
      />
      <hr />
      <section className="section">
        <div className="container grid gap-16">
          {families.map((fam) => (
            <div key={fam.name}>
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="rule-label">Family</div>
                  <h2 className="serif">{fam.name}</h2>
                  <p className="mt-4" style={{ color: "var(--ink-2)" }}>{fam.blurb}</p>
                </div>
                <div className="lg:col-span-8 grid gap-4">
                  {fam.slugs.map((slug) => {
                    const s = site.systemFamilies.find((x) => x.slug === slug)!;
                    return (
                      <Link key={slug} href={`/systems/${slug}`} className="card block">
                        <div className="flex items-baseline justify-between gap-6">
                          <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                          <span className="mono text-[0.72rem]" style={{ color: "var(--forest)" }}>Read →</span>
                        </div>
                        <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                          <span style={{ color: "var(--copper-2)" }}>Leak · </span>{s.leak}
                        </p>
                        <p className="text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                          <span style={{ color: "var(--forest)" }}>Fix · </span>{s.improves}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <hr className="mt-16" />
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="orch-heading">
        <div className="container">
          <div className="rule-label">How the systems are coordinated</div>
          <div className="max-w-3xl">
            <h2 id="orch-heading" className="serif">One operations layer over seven categories.</h2>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              Individual systems close individual leaks. The Ops layer is the eighth system: it
              observes and coordinates across all seven categories, applies policy gates, and keeps
              a human in control of every consequential action.
            </p>
          </div>
          <div className="mt-10">
            <OrchestrationGraphic />
          </div>
          <div className="mt-6">
            <Link href="/explore-demo" className="link" style={{ color: "var(--forest)" }}>
              Explore the Ops demo dashboard →
            </Link>
          </div>
        </div>
      </section>
      <EndCta />
    </>
  );
}
