import type { Metadata } from "next";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { ReviewForm } from "./ReviewForm";

export const metadata: Metadata = {
  title: "System Review — Find My Biggest Leak",
  description: "In one focused review, we identify where demand, customer trust, knowledge, or capacity is escaping your business — and the first system worth building to close it.",
  alternates: { canonical: "/system-review" },
};

export default function SystemReview() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "System Review", href: "/system-review" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="System Review · Free · No sales pressure"
        title="Find the highest-value leak in your business."
        lede="In one focused review, we identify where the demand, customer trust, knowledge, or operational capacity your business already earned is escaping — and the first system worth building to close it."
      />
      <section className="section-tight">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">What you receive</div>
            <ol className="grid gap-4">
              {[
                "The highest-value leak we found",
                "Where and why it occurs",
                "The people, systems, and customer moments involved",
                "The smallest practical fix",
                "The evidence that will show whether the gap is closing",
                "What you should not automate",
              ].map((line, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="mono text-[0.72rem]" style={{ color: "var(--copper)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: "var(--ink)" }}>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              We reply within one business day. If we are not the right fit, we say so — clearly and without a pitch.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
