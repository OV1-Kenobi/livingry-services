import type { Metadata } from "next";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { LandReviewForm } from "./LandReviewForm";

export const metadata: Metadata = {
  title: "Land Potential Review — Livingry Habitats",
  description:
    "Explore the constraints, opportunities, systems, and next investigations that determine what your land could responsibly become.",
  alternates: { canonical: "/land-review" },
  openGraph: {
    title: "Land Potential Review — Livingry Habitats",
    description:
      "Submit your land potential review request to explore what your land could responsibly become.",
    url: "/land-review",
    type: "website",
  },
};

export default function LandReviewPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Habitats", href: "/habitats" },
    { label: "Land Potential Review", href: "/land-review" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Land Potential Review · Livingry Habitats"
        title="What could your land responsibly become?"
        lede="" // TODO(michael): write Land Potential Review page subhead (short, ~30 words max)
      />

      <hr />

      <section className="section">
        <div className="container max-w-3xl">
          <LandReviewForm />
        </div>
      </section>

      <hr />

      {/* PROFESSIONAL BOUNDARY BANNER per spec §6.5 — verbatim from §5.2.2 */}
      <section className="section-tight" style={{ background: "var(--paper-2)" }}>
        <div className="container max-w-4xl">
          <div role="note" className="card" style={{ borderLeft: "3px solid var(--copper)" }}>
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

      {/* CONSENT LANGUAGE per spec §6.5 */}
      <section className="section-tight">
        <div className="container max-w-3xl">
          <p className="text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
            Submitting this form does not create an architect-client, engineer-client,
            contractor-client, brokerage, fiduciary, investment-advisory, or
            capital-placement relationship.
          </p>
        </div>
      </section>
    </>
  );
}
