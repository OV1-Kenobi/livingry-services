import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { ReviewForm } from "./ReviewForm";

export const metadata: Metadata = {
  title: "Book a Leak Assessment — Livingry Services",
  description:
    "Book a Leak Assessment call with Livingry Services. In one focused conversation we identify where demand, customer trust, knowledge, or capacity is escaping your business — and the first system worth building to close it.",
  alternates: { canonical: "/system-review" },
};

export default function SystemReview() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Book a Leak Assessment", href: "/system-review" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Leak Assessment · Live call · No sales pressure"
        title="Find the highest-value leak in your business."
        lede="Pick a time that works. On the call, we walk through a consistent Leak Assessment together — the same one used for every Livingry engagement. You leave with a clear picture of where value is escaping and what would be worth building first."
        primaryCta={{ label: site.booking.label, href: site.booking.url }}
        secondaryCta={{ label: "Send details in advance", href: "#in-advance" }}
      />

      {/* Booking-first block */}
      <section className="section-tight" id="book">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">What happens on the call</div>
            <ol className="grid gap-4">
              {[
                "We walk the Leak Assessment together — Scope, Symptoms, Signals, Systems, Seal.",
                "We look at whichever surfaces you can share on the call: website, CRM, inbox, calendar, one recent lost job.",
                "We name the highest-value leak we can see, and the smallest useful system to close it.",
                "You leave with clear next steps — whether or not those next steps involve us.",
              ].map((line, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-3">
                  <span
                    className="mono text-[0.72rem]"
                    style={{ color: "var(--copper)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "var(--ink)" }}>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              {site.booking.reassurance}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="card">
              <div className="eyebrow">Step 1</div>
              <h2
                className="serif mt-2"
                style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}
              >
                Pick a time on the calendar.
              </h2>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                The Google booking page shows current available times. If none of them work, mention it in Step 2 below and we will find a fit.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={site.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  data-analytics="book-primary"
                >
                  {site.booking.label} <span aria-hidden>→</span>
                </a>
                <a
                  href="#in-advance"
                  className="btn btn-secondary"
                  data-analytics="book-secondary-details"
                >
                  Or send details first
                </a>
              </div>
              <p
                className="mt-5 text-[0.85rem]"
                style={{ color: "var(--ink-3)" }}
              >
                Opens Google Calendar in a new tab. You will receive a
                confirmation with a video link.
              </p>
              <p
                className="mt-4 text-[0.9rem]"
                style={{ color: "var(--ink-2)" }}
              >
                Not ready for a call?{" "}
                <Link href="/assessment" className="link">
                  Score your own operation first
                </Link>{" "}
                — 17 controls, about 10 minutes, no email required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form / details-in-advance block */}
      <section
        className="section"
        id="in-advance"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Step 2 · Optional</div>
            <h2
              className="serif mt-2"
              style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}
            >
              Send us details so we walk in informed.
            </h2>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              Not required — you can just book above. But if you fill this in, we do the reading before the call and use the time on your actual situation, not on background questions.
            </p>
            <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              Submissions are saved to our follow-up system so nothing gets lost, and we reply within one business day if you have not already booked a time.
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
