import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { site } from "@/lib/site";
import { revenueLeaks } from "@/lib/revenue-leaks/content";

interface LeakPageProps {
  params: Promise<{ leak: string }>;
}

export function generateStaticParams() {
  return revenueLeaks.map((leak) => ({ leak: leak.slug }));
}

export async function generateMetadata({ params }: LeakPageProps): Promise<Metadata> {
  const { leak: slug } = await params;
  const leak = revenueLeaks.find((l) => l.slug === slug);
  if (!leak) return {};
  return {
    title: `${leak.name} — Diagnostic Question and Check | Livingry Services`,
    description: `${leak.fieldSituation} ${leak.diagnosticQuestion}`,
    alternates: { canonical: `/revenue-leaks/${leak.slug}` },
  };
}

export default async function RevenueLeakPage({ params }: LeakPageProps) {
  const { leak: slug } = await params;
  const leak = revenueLeaks.find((l) => l.slug === slug);
  if (!leak) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Revenue Leaks", href: "/revenue-leaks" },
    { label: leak.name, href: `/revenue-leaks/${leak.slug}` },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      {/* HERO — one operational story, one diagnostic question */}
      <section className="section paper-grain" aria-labelledby="leak-heading">
        <div className="container max-w-4xl">
          <div className="eyebrow">{leak.shortName} · Revenue Leak</div>
          <h1 id="leak-heading" className="serif mt-6">{leak.name}</h1>
          <p className="mt-7 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)" }}>
            {leak.diagnosticQuestion}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/assessment" className="btn btn-primary">
              {leak.actionLabel} <span aria-hidden>→</span>
            </Link>
            <Link href="/services-and-pricing" className="btn btn-secondary">
              See Services &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* THE OPERATIONAL STORY */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The field situation</div>
            <h2 id="story-heading" className="serif">What this looks like on a real Tuesday.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>{leak.fieldSituation}</p>
            <p className="mt-4 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              Claim label: {leak.evidenceBasis}
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* THE BREAK + THE BELIEF SHIFT */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="break-heading">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div>
            <div className="rule-label">The continuity break</div>
            <h2 id="break-heading" className="serif">Where the handoff stops connecting.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>{leak.continuityBreak}</p>
          </div>
          <div>
            <div className="rule-label">The belief shift</div>
            <h2 className="serif">What changes when you see it this way.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>{leak.beliefShift}</p>
          </div>
        </div>
      </section>

      {/* ONE PRACTICAL CHECK */}
      <section className="section" id="check" aria-labelledby="check-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">One check you can run today</div>
            <h2 id="check-heading" className="serif">Against your own records, not a benchmark.</h2>
            <p className="mt-5 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              This is a handoff check, not a diagnosis. It tells you whether the leak is worth
              examining — and what to bring to a real assessment.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="card">
              <p className="serif" style={{ fontSize: "var(--step-1)" }}>{leak.practicalCheck}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ONE ACTION */}
      <section className="section-tight paper-grain" aria-labelledby="action-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <h2 id="action-heading" className="serif" style={{ fontSize: "var(--step-3)" }}>
              {leak.actionLabel}
            </h2>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/assessment" className="btn btn-primary">
                Diagnose My Cash Flow Leaks <span aria-hidden>→</span>
              </Link>
              <Link href={site.booking.url} className="btn btn-secondary">
                Book My Leak Assessment
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              Offer links say it plainly: <Link href="/services-and-pricing" className="link" style={{ color: "var(--forest)" }}>See Services &amp; Pricing</Link> — pricing is published, not
              gated behind a request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}