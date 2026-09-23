import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { site } from "@/lib/site";
import {
  serviceLevels,
  dwyAddOns,
  dfyFoundingFive,
  dfyMechanics,
  pricingDisclosure,
  customItemNote,
} from "@/lib/services-pricing/content";

export const metadata: Metadata = {
  title: "Services & Pricing — Do It Yourself, Done With You, Done For You",
  description:
    "The three standard service choices with published base pricing: Do It Yourself ($649 one time), Done With You ($3,900 total), and Done For You (active management). No hidden standard prices.",
  alternates: { canonical: "/services-and-pricing" },
  openGraph: {
    title: "Services & Pricing — Livingry Services",
    description:
      "Standard scope and published base pricing for DIY ($649), DWY ($3,900 — 3 leak systems + spine), and DFY. AI Voice Answering — the 4th leak ($500 + vendor pass-through) — is the standard add-on. Custom items are quoted separately.",
    url: "/services-and-pricing",
    type: "website",
  },
};

export default function ServicesAndPricingPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services & Pricing", href: "/services-and-pricing" },
  ];

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Services & Pricing"
        title="Standard choices with published prices."
        lede="The standard scope and base price are visible before you decide whether to talk — transparent standard pricing is a trust requirement, not navigation clutter. A sales call may clarify fit and scope; it should not reveal a previously hidden standard price."
        primaryCta={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondaryCta={{ label: "Book My Leak Assessment", href: site.booking.url }}
      />

      {/* The three standard choices */}
      <section className="section" aria-labelledby="choices-heading">
        <div className="container">
          <div className="rule-label">The three standard choices</div>
          <h2 id="choices-heading" className="serif">What each choice includes, who implements, and when payment occurs.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceLevels.map((level) => (
              <div key={level.id} className="card h-full" style={{ borderTop: "3px solid var(--forest)" }}>
                <div className="eyebrow">{level.shortName}</div>
                <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{level.name}</h3>
                <p className="mt-2 serif" style={{ color: "var(--forest)", fontSize: "var(--step-1)" }}>
                  {level.priceLine}
                </p>
                <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  <span className="eyebrow mr-2">Best for</span>
                  {level.bestFor}
                </p>
                <div className="mt-6">
                  <div className="eyebrow">Includes</div>
                  <ul className="mt-3 grid gap-2">
                    {level.includes.map((item, i) => (
                      <li key={i} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink)" }}>
                        <span aria-hidden style={{ color: "var(--copper)" }}>▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {level.priceDetail && (
                  <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--rule)" }}>
                    <div className="eyebrow">Payment</div>
                    <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink)" }}>{level.priceDetail}</p>
                  </div>
                )}
                <div className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                  {level.responsibility}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DWY specifics */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="dwy-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Done With You — payment details</div>
            <h2 id="dwy-heading" className="serif">Payment is split at signing and at exit testing.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              $1,949 at signing. $1,951 when the system passes exit testing. If the client previously
              purchased the $649 Do It Yourself package, that amount is credited and $3,251 remains due
              at exit testing. There is no retry cap on retests.
            </p>
            <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
              Delivery target is 1–4 weeks, including the live owner exit-testing meeting and two weeks
              of post-delivery support.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rule-label">Standard add-ons</div>
            <h3 className="serif mt-3" style={{ fontSize: "var(--step-1)" }}>Standard add-on (4th leak).</h3>
            <ul className="mt-4 grid gap-0">
              {dwyAddOns.map((addOn, i) => (
                <li key={addOn.name} className="flex items-baseline justify-between gap-6 py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <span style={{ color: "var(--ink)" }}>{addOn.name}</span>
                  <span className="serif" style={{ color: "var(--forest)", fontSize: "var(--step-1)" }}>{addOn.price}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ul>
            <div className="mt-6 card">
              <div className="eyebrow">Custom items</div>
              <p className="mt-3" style={{ color: "var(--ink-2)" }}>{customItemNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DFY specifics */}
      <section className="section" aria-labelledby="dfy-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Done For You — active management</div>
            <h2 id="dfy-heading" className="serif">Reference pricing, shown openly.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              A prospect cannot skip directly to Done For You: the Done With You phase establishes the
              collected-revenue baseline and leak-category tracking required for active management.
            </p>
            <ul className="mt-4 grid gap-0 text-[0.95rem]">
              <li className="py-3" style={{ borderTop: "1px solid var(--rule)" }}>
                Standard reference: <strong>$2,500 to start</strong> · $2,500 final performance-trigger
                payment · $1,000 per week after the approved threshold mechanics trigger
              </li>
              <li className="py-3" style={{ borderTop: "1px solid var(--rule)" }}>
                {dfyFoundingFive.note} <strong>{dfyFoundingFive.priceLine.split("·")[0]}</strong> ·
                $1,250 final performance-trigger payment · $500 per week
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rule-label">Current billing mechanics</div>
            <ul className="mt-4 grid gap-3">
              {dfyMechanics.map((mech, i) => (
                <li key={i} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                  <span aria-hidden style={{ color: "var(--copper)" }}>▸</span>
                  <span>{mech}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 card">
              <p className="text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                Publish-ready note: the open decisions governing the precise 10-times measurement,
                baseline period, attribution, extension limits, repricing, and exclusivity mechanics are
                still being resolved. Until then, base prices are shown and performance-triggered billing
                is described conservatively — nothing missing is invented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing-disclosure rule */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">The pricing-disclosure rule</div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {pricingDisclosure.map((item, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                <span aria-hidden style={{ color: "var(--forest)" }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EndCta
        title="Find the leak before you buy more traffic."
        primary={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondary={{ label: "Book My Leak Assessment", href: site.booking.url }}
      />
    </>
  );
}