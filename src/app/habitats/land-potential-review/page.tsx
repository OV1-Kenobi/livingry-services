import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Land Potential Review — Livingry Habitats",
  description:
    "Explore the constraints, opportunities, systems, and next investigations that determine what your land could responsibly become. Initial focus Central Texas and wider Austin region.",
  alternates: { canonical: "/habitats/land-potential-review" },
  openGraph: {
    title: "Land Potential Review — Livingry Habitats",
    description:
      "A structured exploration of what your land could responsibly support — development constraints, opportunities, systems, and recommended next investigations.",
    url: "/habitats/land-potential-review",
    type: "website",
  },
};

export default function LandPotentialReview() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Habitats", href: "/habitats" },
    { label: "Land Potential Review", href: "/habitats/land-potential-review" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      {/* HERO per spec §5.3 */}
      <PageHero
        eyebrow="Land Potential Review · Livingry Habitats"
        title="" // TODO(michael): write Land Potential Review title
        lede="" // TODO(michael): write Land Potential Review lede
      />

      <hr />

      {/* PROFESSIONAL BOUNDARY BANNER per spec §5.3 — verbatim from §5.2 */}
      <section className="section-tight">
        <div className="container max-w-4xl">
          <div role="note" className="card" style={{ background: "var(--paper-2)", borderLeft: "3px solid var(--copper)" }}>
            <p style={{ color: "var(--ink-2)" }}>
              Livingry Habitats begins with development strategy, systems design,
              feasibility, and partner coordination. Licensed architecture, engineering,
              surveying, environmental work, permitting, and construction are performed
              or approved by qualified professionals in the project jurisdiction.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* WHAT WE EXPLORE — body slots are TODO(michael) */}
      <section className="section" aria-labelledby="explore-heading">
        <div className="container">
          <div className="rule-label">What we explore</div>
          <h2 id="explore-heading" className="serif">A structured investigation of land potential</h2>
          
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Development constraints</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write development constraints section */}
              </div>
            </div>

            <div>
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Site opportunities</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write site opportunities section */}
              </div>
            </div>

            <div>
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>System requirements</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write system requirements section */}
              </div>
            </div>

            <div>
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Next investigations</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write next investigations section */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* DELIVERABLES — body is TODO(michael) */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="deliverables-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">What you receive</div>
          <h2 id="deliverables-heading" className="serif">Land Potential Review deliverables</h2>
          <div className="mt-6" style={{ color: "var(--ink-2)" }}>
            {/* TODO(michael): write deliverables section */}
          </div>
        </div>
      </section>

      <hr />

      {/* PROCESS — body is TODO(michael) */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">How it works</div>
          <h2 id="process-heading" className="serif">The Land Potential Review process</h2>
          <div className="mt-6" style={{ color: "var(--ink-2)" }}>
            {/* TODO(michael): write process section */}
          </div>
        </div>
      </section>

      <hr />

      {/* GEOGRAPHIC FOCUS */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container max-w-3xl">
          <div className="rule-label">Geographic focus</div>
          <p className="serif" style={{ fontSize: "var(--step-1)", color: "var(--ink)" }}>
            Initial relationship focus: Central Texas and the wider Austin region.
          </p>
        </div>
      </section>

      {/* FINAL CTA per spec §5.3 */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <h2 id="cta-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
                Start a Land Potential Review
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                Submit the Land Potential Review form to begin the exploration of what your land could responsibly become.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/land-review" className="btn btn-primary">Request a Review <span aria-hidden>→</span></Link>
              <a href="mailto:ov@livingry.services" className="btn btn-ghost">Email to inquire</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
