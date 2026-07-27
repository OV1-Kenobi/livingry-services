import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Regenerative Development Systems for Landowners — Livingry Habitats",
  description:
    "Livingry Habitats helps landowners explore what their land could responsibly become. Pattern Language, permaculture, climate-responsive design, natural materials, private home systems. Initial focus Central Texas.",
  alternates: { canonical: "/habitats" },
  openGraph: {
    title: "Regenerative Development Systems for Landowners — Livingry Habitats",
    description:
      "Explore the constraints, opportunities, systems, and next investigations that determine what your land could responsibly become.",
    url: "/habitats",
    type: "website",
  },
};

export default function Habitats() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Habitats", href: "/habitats" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      {/* HERO SLOT per spec §5.2.1 */}
      <PageHero
        eyebrow="Livingry Habitats · Regenerative development systems"
        title="Explore what your land could responsibly become."
        lede="" // TODO(michael): write hero supporting copy
      />

      <hr />

      {/* PROFESSIONAL BOUNDARY BANNER per spec §5.2.2 — REQUIRED, verbatim */}
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

      {/* SIX DESIGN FIELDS per spec §5.2.3 — Each body is TODO(michael) */}
      <section className="section" aria-labelledby="fields-heading">
        <div className="container">
          <div className="rule-label">Design fields</div>
          <h2 id="fields-heading" className="serif">Six systems for regenerative development</h2>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Land and water</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing land and water systems */}
              </p>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Human patterns</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing human patterns and Pattern Language */}
              </p>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Climate and envelope</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing climate-responsive design */}
              </p>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Natural construction</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing natural construction materials */}
              </p>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Private home systems</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing private home systems */}
              </p>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Energy and compute</h3>
              <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                {/* TODO(michael): write the section describing energy and compute systems */}
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* MATERIAL PRINCIPLE per spec §5.2.4 */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container max-w-3xl">
          <h2 className="serif">No material ideology.</h2>
          <div className="mt-5" style={{ color: "var(--ink-2)" }}>
            {/* TODO(michael): write the material principle body */}
          </div>
        </div>
      </section>

      <hr />

      {/* ENGAGEMENT LADDER per spec §5.2.5 */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="rule-label">How to work together</div>
          <h2 id="services-heading" className="serif">Three levels of engagement</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Land Potential Review</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write Land Potential Review service description */}
              </div>
              <div className="mt-6">
                <Link href="/habitats/land-potential-review" className="link" style={{ color: "var(--copper-2)" }}>
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Habitat Feasibility Study</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write Habitat Feasibility Study service description */}
              </div>
              <div className="mt-6">
                <a href="mailto:ov@livingry.services" className="link" style={{ color: "var(--copper-2)" }}>
                  Email to inquire →
                </a>
              </div>
            </div>

            <div className="card">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Development Formation</h3>
              <div className="mt-3" style={{ color: "var(--ink-2)" }}>
                {/* TODO(michael): write Development Formation service description */}
              </div>
              <div className="mt-6">
                <a href="mailto:ov@livingry.services" className="link" style={{ color: "var(--copper-2)" }}>
                  Email to inquire →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* INITIAL MARKET per spec §5.2.6 */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container max-w-3xl">
          <div className="rule-label">Geographic focus</div>
          <p className="serif" style={{ fontSize: "var(--step-1)", color: "var(--ink)" }}>
            Initial relationship focus: Central Texas and the wider Austin region.
          </p>
        </div>
      </section>

      <hr />

      {/* IDEAL PARTNERS per spec §5.2.7 — Six bullet slots, each TODO(michael) */}
      <section className="section" aria-labelledby="partners-heading">
        <div className="container max-w-3xl">
          <div className="rule-label">Who we work with</div>
          <h2 id="partners-heading" className="serif">Ideal partners</h2>
          <ul className="mt-8 grid gap-4">
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 1 */}</span>
            </li>
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 2 */}</span>
            </li>
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 3 */}</span>
            </li>
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 4 */}</span>
            </li>
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 5 */}</span>
            </li>
            <li className="flex gap-3" style={{ color: "var(--ink-2)" }}>
              <span aria-hidden style={{ color: "var(--copper)" }}>•</span>
              <span>{/* TODO(michael): write ideal partner type 6 */}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA per spec §5.2.8 */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <h2 id="cta-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
                Request a Land Potential Review
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                Explore the constraints, opportunities, systems, and next investigations that determine what your land could responsibly become.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/land-review" className="btn btn-primary">Start a Land Potential Review <span aria-hidden>→</span></Link>
              <Link href="#fields-heading" className="btn btn-ghost">See how the process works <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

