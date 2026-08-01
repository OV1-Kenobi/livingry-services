import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Industries — Livingry Services",
  description: "The Livingry method stays consistent. The workflows, language, data, approvals, and handoffs fit the industry. HVAC/R is our active focus; roofing is a planned expansion.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndex() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Industries"
        title="Built for the realities of your industry."
        lede="The underlying method is consistent. The workflows, language, data, approvals, and handoffs must fit the business that will use them."
      />
      <section className="section">
        <div className="container grid gap-8">
          {site.industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="grid gap-4 lg:grid-cols-12 py-10"
              style={{ borderTop: "1px solid var(--ink)" }}
            >
              <div className="lg:col-span-3">
                <span className={`pill ${ind.status === "active" ? "pill-active" : ind.status === "next" ? "pill-next" : "pill-future"}`}>
                  {ind.statusLabel}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h2 className="serif" style={{ fontSize: "var(--step-3)" }}>{ind.title}</h2>
                <p className="mt-3 max-w-2xl" style={{ color: "var(--ink-2)" }}>{ind.promise}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[0.95rem]" style={{ color: "var(--forest)" }}>
                  {ind.cta} <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
        </div>
      </section>
      <EndCta />
    </>
  );
}
