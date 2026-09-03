import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Leak Assessment — Trace One Suspected Cash-Flow Leak | Livingry Services",
  description:
    "Trace one suspected cash-flow leak from its first trigger to the next broken handoff. You leave with the priority and reasoning whether or not you hire Livingry Services. Standard service prices are available before the call.",
  alternates: { canonical: "/leak-assessment" },
  openGraph: {
    title: "Leak Assessment — Livingry Services",
    description:
      "One suspected leak, one mapped revenue-and-data handoff, one recommended next step. No obligation to purchase.",
    url: "/leak-assessment",
    type: "website",
  },
};

const expectationStrip = [
  "One suspected leak",
  "One mapped revenue-and-data handoff",
  "One recommended next step",
  "No obligation to purchase",
  "Standard service prices available before the call",
];

export default function LeakAssessmentPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Leak Assessment", href: "/leak-assessment" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      {/* Raw calendar URL is inlined on the primaryCta below on purpose: this
          page IS the canonical booking path, so sitewide booking CTAs route
          here (site.booking.url) and only this CTA opens the calendar.
          PLAN-2026-09-02-LSRU-01 WP3 Change 4 — prevents a self-link loop. */}
      <PageHero
        eyebrow="Leak Assessment"
        title="Trace one suspected cash-flow leak from the first trigger to the next broken handoff."
        lede="We will inspect the assumptions, follow the opportunity and its information, identify who owns the next action, and decide whether the break justifies building anything. You leave with the priority and reasoning whether or not you hire Livingry Services."
        primaryCta={{ label: "Book My Leak Assessment", href: "https://calendar.app.google/4UfTY4vavUc7iQBT6" }}
        secondaryCta={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />

      {/* EXPECTATION STRIP */}
      <section className="section" aria-labelledby="expectations-heading">
        <div className="container">
          <div className="rule-label">What to expect</div>
          <h2 id="expectations-heading" className="serif">Set before the call, so nothing is a surprise.</h2>
          <ul className="mt-8 grid gap-0 md:grid-cols-5">
            {expectationStrip.map((item, i) => (
              <li
                key={item}
                className="py-5 px-4 text-[0.95rem]"
                style={{ borderTop: "1px solid var(--ink)", borderRight: i < expectationStrip.length - 1 ? "1px solid var(--rule)" : undefined, color: "var(--ink)" }}
              >
                <span className="mono text-[0.72rem] block" style={{ color: "var(--ink-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="how-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">What gets inspected</div>
            <h2 id="how-heading" className="serif">The assessment follows the handoff, not a pitch.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Bring one suspected leak — a call pattern, a quiet estimate, a list you never call, or a
              completed job that produced no review or referral. We trace it from trigger to next
              action, name who owns the next step, and say plainly whether the break justifies building
              anything.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="card">
              <div className="eyebrow">The review covers</div>
              <ul className="mt-4 grid gap-3">
                {[
                  "The trigger and what happens immediately after it",
                  "The information attached to the opportunity and where it lives",
                  "Who owns the next action, and whether that ownership is written down",
                  "The approval point for anything consequential",
                  "The record of what happened — and whether it can be reviewed later",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                    <span aria-hidden style={{ color: "var(--copper)" }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 card">
              <p className="text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                Claim label: the assessment is a service description, not a result promise. The finding
                is directional until it is validated against your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EndCta
        title="Start with the diagnostic, then decide whether to validate it."
        primary={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondary={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />
    </>
  );
}