import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Terms — Livingry Services",
  description: "Terms of use for the Livingry Services website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Terms", href: "/terms" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="Legal" title="Terms of use." lede="The straightforward version of what this website is and is not." />
      <section className="section-tight">
        <div className="narrow prose">
          <h2 className="serif">This website is informational</h2>
          <p>This site describes services offered by {site.legalName}. Nothing on this site is an offer, contract, warranty, guarantee, or professional advice. Any engagement between {site.legalName} and a client is governed by a separate written agreement.</p>

          <h2 className="serif mt-10">No legal, medical, or financial advice</h2>
          <p>Livingry Services is not a law firm, is not a medical practice, and does not provide legal, medical, diagnostic, clinical, or financial advice. Descriptions on this website of work with legal or medical practices refer to operational, informational, and workflow systems — never to the practice of law or medicine.</p>

          <h2 className="serif mt-10">Statements about AI and outcomes</h2>
          <p>References on this site to AI capabilities, discovery outcomes, revenue recovery, or measurable improvement describe patterns we design for and pursue. They are not guarantees. Actual outcomes depend on the client&apos;s business, market, team, evidence, and adherence to the implementation.</p>

          <h2 className="serif mt-10">Third parties</h2>
          <p>Where we reference specific CRM, field-service, or workflow tools, we do so for illustration. Trademarks belong to their respective owners. Livingry Services is not affiliated with any third-party tool referenced unless explicitly stated.</p>

          <h2 className="serif mt-10">Content and attribution</h2>
          <p>Content on this website is © {new Date().getFullYear()} {site.legalName}. You are welcome to quote short passages with attribution and a link back. Please do not republish full pages without written permission.</p>

          <h2 className="serif mt-10">Contact</h2>
          <p>Questions about these terms may be sent to {site.contact.email}.</p>

          <p className="mt-10 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Last updated: {new Date().toISOString().slice(0, 10)}.</p>
        </div>
      </section>
    </>
  );
}
