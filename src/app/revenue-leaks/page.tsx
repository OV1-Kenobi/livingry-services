import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import {
  revenueLeaks,
  revenueContinuityDefinition,
  revenueContinuityHeading,
} from "@/lib/revenue-leaks/content";

export const metadata: Metadata = {
  title: "Revenue Leaks — Missed Calls, Dropped Estimates, Dead Client Lists, Lost Referrals",
  description:
    "Four cash-flow leaks every HVAC/R company can check today: missed calls and slow response, dropped estimates, dead client lists, and lost referrals, reviews, and testimonials.",
  alternates: { canonical: "/revenue-leaks" },
  openGraph: {
    title: "The Four Revenue Leaks — Livingry Services",
    description:
      "Each leak is a handoff where the opportunity and the information needed to act on it stop connecting. Check all four against your own operation.",
    url: "/revenue-leaks",
    type: "website",
  },
};

export default function RevenueLeaksPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Revenue Leaks", href: "/revenue-leaks" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Revenue Leaks"
        title="Four handoffs where already-created value escapes."
        lede="A shop can look busy while opportunities slip between the phone call, estimate, customer record, completed job, and next follow-up. Each leak below names the handoff, the continuity break, and the diagnostic question worth asking about your own operation."
        primaryCta={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondaryCta={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />

      <section className="section" aria-labelledby="leaks-heading">
        <div className="container grid gap-6">
          {revenueLeaks.map((leak, i) => (
            <div key={leak.slug} className="card" style={{ borderLeft: "3px solid var(--forest)" }}>
              <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5">
                  <div className="eyebrow">
                    {String(i + 1).padStart(2, "0")} · {leak.shortName}
                  </div>
                  <h2 className="serif mt-2" style={{ fontSize: "var(--step-2)" }}>{leak.name}</h2>
                  <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                    Diagnostic question: {leak.diagnosticQuestion}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <p style={{ color: "var(--ink-2)" }}>{leak.fieldSituation}</p>
                  <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                    <span style={{ color: "var(--copper-2)" }}>The break:</span> {leak.continuityBreak}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <Link href={`/revenue-leaks/${leak.slug}`} className="link" style={{ color: "var(--forest)" }}>
                      {leak.actionLabel} →
                    </Link>
                    <Link href={`/revenue-leaks/${leak.slug}#check`} className="link" style={{ color: "var(--forest)" }}>
                      One check you can run today →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }} id="data-continuity" aria-labelledby="continuity-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">{revenueContinuityHeading}</div>
            <h2 id="continuity-heading" className="serif">
              The leaks stop when the handoffs stay connected.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              {revenueContinuityDefinition}
            </p>
            <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              Claim label: Strategic Opinion — a plain-English definition of the category, not an audited
              result or client outcome.
            </p>
            <div className="mt-6">
              <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>
                Read how Livingry Services works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EndCta
        title="Diagnose the four handoffs before adding another lead source."
        primary={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondary={{ label: "See services and pricing", href: "/services-and-pricing" }}
      />
    </>
  );
}