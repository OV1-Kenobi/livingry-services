import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { homepageMethod } from "@/lib/homepage-framework";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { IllustrativeImage } from "@/components/IllustrativeImage";

// Umbrella homepage FAQ — shrunk from 6 to 4 per spec §3.9. Operations page
// keeps all 6. These questions are written to apply to either Operations or Habitats.
const umbrellaFaq = [
  {
    q: "What does Livingry Services do?",
    a: "Livingry Services installs Revenue Continuity Systems for established U.S. HVAC/R companies — sealing the client container against the four revenue leaks: missed calls, quiet estimates, past customers, and unasked referrals. Roofing is a planned expansion.",
  },
  {
    q: "Do you sell AI software or land-planning software?",
    a: "No. We design and implement systems, then hand control to the people who will use them. You own the tools, the records, and the decision-making authority.",
  },
  {
    q: "Will AI make decisions without human approval?",
    a: "Only within workflows you have explicitly approved, and never for decisions that require your judgment, your pricing authority, or a commitment to a customer. Humans stay accountable.",
  },
  {
    q: "How long until I see results?",
    a: "Measurement can begin in your first full operating cycle after a system goes live. How quickly change becomes visible depends on your baseline, the quality of your existing data, and the volume moving through that workflow — so we agree on the evidence before we build.",
  },
];

// The root layout supplies a title template; the homepage sets an absolute
// title so the brand name is not appended twice.
export const metadata: Metadata = {
  title: {
    absolute: "Systems in Service of Life and Capability — Livingry Services",
  },
  description:
    "Livingry Services installs Revenue Continuity Systems for established U.S. HVAC/R companies. Four connected workflows — missed calls, estimates, past customers, and referrals — with human approval on every consequential action.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Systems in Service of Life and Capability — Livingry Services",
    description:
      "Livingry designs and implements life-supporting systems for organizations and places — helping retain more of the opportunity, knowledge, energy, trust, and capability already available.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  // FAQPage schema mirrors the 4 questions rendered visibly below (shrunk from 6 per spec).
  // Keeping the two generated from one source is what keeps the markup honest.
  const homepageFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: umbrellaFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={homepageFaqLd} />

      {/* HERO — Umbrella positioning per spec §3.1 */}
      <section className="section paper-grain" aria-labelledby="hero-heading">
        <div className="container">
          <div className="max-w-4xl">
            <div className="eyebrow">Livingry Services · Systems in service of life and capability</div>
            <h1 id="hero-heading" className="serif mt-6">
              Stop already-earned value from leaking away.
            </h1>
            <p className="mt-6 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)" }}>
              Revenue leaks through four cracks: missed calls nobody returns, estimates
              that go quiet, past customers who never hear from you again, and referrals
              nobody asks for. Livingry seals the client container — four connected
              workflows, human approval on every consequential action.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <Link href="/operations/hvac" className="btn btn-primary">Seal the Client Container <span aria-hidden>→</span></Link>
              <Link href="/hvac/founding-five#scorecard" className="btn btn-secondary">Start with the Revenue Leak Scorecard</Link>
            </div>
            <p className="mt-8 text-[0.88rem]" style={{ color: "var(--ink-3)" }}>
              Human-accountable · Vendor-independent · Built around tools and records you control
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* TWO-PATH SELECTOR — Operations vs Habitats per spec §3.2 */}
      <section className="section" aria-labelledby="practices-heading">
        <div className="container">
          <div className="grid gap-6">
            {/* Operations Card */}
            <Reveal>
              <div className="card h-full" style={{ borderLeft: "3px solid var(--forest)" }}>
                <div className="eyebrow" style={{ color: "var(--forest)" }}>Livingry Operations</div>
                <h2 className="serif mt-3" style={{ fontSize: "var(--step-2)" }}>
                  AI general contracting for HVAC/R operations
                </h2>
                <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                  Coordinate specialist AI tools, workflows, and human approvals to close operational leaks without forcing businesses into another disconnected platform. Built for HVAC/R; roofing is a planned expansion.
                </p>
                <div className="mt-6">
                  <span className="pill pill-active text-[0.85rem]">Active pilots · HVAC Founding Five</span>
                </div>
                {/* HVAC-specific entry point — the active implementation focus gets
                    its own path off the corporate homepage. */}
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--rule)" }}>
                  <div className="eyebrow" style={{ color: "var(--copper-2)" }}>For HVAC operators</div>
                  <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                    Stop losing booked work, unsold estimates, and repeat customers between the systems you already use.
                  </p>
                  <div className="mt-3">
                    <Link href="/operations/hvac" className="link" style={{ color: "var(--forest)" }}>
                      Explore HVAC Operations →
                    </Link>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/operations" className="link" style={{ color: "var(--forest)" }}>
                    Explore Operations →
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <hr />

      {/* COMPACT SYSTEM FAMILIES — 2-line-per-family per spec §3.4 */}
      <section className="section" aria-labelledby="systems-heading">
        <div className="container">
          <div className="rule-label">01 · System families</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="systems-heading" className="serif">
                Eight system families for organizations and places
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Each family names a specific leak and the system we build to close it. The full AI general contracting work lives in Operations; the underlying method applies to both operations and development planning.
              </p>
              <div className="mt-8">
                <Link href="/operations" className="btn btn-primary">See Operations Systems <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-0">
                {site.systemFamilies.map((s, i) => (
                  <li key={s.slug}>
                    <Link
                      href={`/systems/${s.slug}`}
                      className="grid gap-1.5 py-5 group"
                      style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                        <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="text-[0.93rem]" style={{ color: "var(--ink-2)" }}>
                        <span style={{ color: "var(--copper-2)" }}>Leak:</span> {s.leak}
                      </div>
                      <div className="text-[0.93rem]" style={{ color: "var(--ink-3)" }}>
                        <span style={{ color: "var(--forest)" }}>Fix:</span> {s.improves}
                      </div>
                    </Link>
                  </li>
                ))}
                <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* LEAKPROOFING FRAMEWORK — Widened for umbrella per spec §3.3 */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="method-heading">
        <div className="container">
          <div className="rule-label">02 · The method</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="method-heading" className="serif">The Livingry Leakproofing Framework</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Adding traffic, tools, or automation to a system that already leaks only multiplies the waste. A system that is unsealed cannot be scaled — so we seal the gap first, then scale the work.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                We do not start by adding another tool or making another plan. We start by identifying the point where value leaks away — whether that is in a customer journey, a workflow, an information path, or the development potential of a place — then close that gap with the smallest practical system.
              </p>
              <p className="mt-4 serif italic" style={{ color: "var(--copper-2)", fontSize: "var(--step-1)" }}>
                Find the leak. Seal the gap. Keep more of what you already earned.
              </p>
              <p className="mt-6">
                <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>Read the full framework →</Link>
              </p>
            </div>
            <ol className="lg:col-span-7 grid gap-0">
              {homepageMethod.map((m, i) => (
                <li key={m.n} className="grid grid-cols-[auto_1fr] gap-6 py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <div className="num" style={{ minWidth: "3rem" }}>{m.n}</div>
                  <div>
                    <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{m.name}</h3>
                    <p className="mt-2 text-[0.98rem]" style={{ color: "var(--ink-2)" }}>{m.blurb}</p>
                  </div>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </ol>
          </div>
        </div>
      </section>

      <hr />

      {/* FOUNDER BLOCK — Shortened ~60% per spec §3.5 */}
      <section className="section" aria-labelledby="founder-heading">
        <div className="container">
          <div className="rule-label">03 · Who does the work</div>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <h2 id="founder-heading" className="serif">Built by someone who has done the work</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Livingry Services is an independent practice. The founder came up through hands-on trades — permaculture design, solar, and HVAC — before years as a solo residential contractor and years of building AI agents and Bitcoin payment infrastructure, including three months as Operations Lead at an open-source AI lab. That combination is the point: to seal the client container, you have to understand the work site as well as the stack. I built this for the contractor I was at 35.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/about" className="link" style={{ color: "var(--forest)" }}>Read the full story →</Link>
                <Link href="/proof" className="link" style={{ color: "var(--forest)" }}>Why ownership matters →</Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <figure className="diagram" style={{ maxWidth: "26rem" }}>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--rule)" }}>
                  <IllustrativeImage
                    base="founder-origin-collage"
                    height={800}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    alt="Editorial illustration of three credential-loss failure modes — a fire-damaged frame, a disappeared issuer, and a rebranded company — resolving into owner-controlled custody. Illustration, not a documentary portrait."
                  />
                </div>
                <figcaption>Editorial illustration of the origin story — not a documentary portrait.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* INDUSTRIES — Compact per spec §3.6, HVAC Founding Five link preserved */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <div className="rule-label">04 · Industries (Operations)</div>
          <div className="max-w-3xl">
            <h2 id="industries-heading" className="serif">Revenue Continuity Systems for HVAC/R companies</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The underlying method stays consistent. The workflows, language, data, approvals, and handoffs must fit the industry that will use them.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {site.industries.map((ind) => (
              <div key={ind.slug} className="grid gap-1.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <Link href={`/industries/${ind.slug}`} className="serif" style={{ fontSize: "var(--step-1)", color: "var(--ink)" }}>
                    {ind.title}
                  </Link>
                  <span className={`pill text-[0.85rem] ${ind.status === "active" ? "pill-active" : ind.status === "next" ? "pill-next" : "pill-future"}`}>
                    {ind.statusLabel}
                  </span>
                </div>
                <p className="text-[0.93rem]" style={{ color: "var(--ink-2)" }}>{ind.promise}</p>
                {ind.slug === "hvac" && (
                  <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    <Link href="/operations/hvac" className="link text-[0.9rem]" style={{ color: "var(--forest)" }}>
                      Explore HVAC Operations →
                    </Link>
                    <Link href="/hvac/founding-five" className="link text-[0.9rem]" style={{ color: "var(--forest)" }}>
                      See the Founding Five HVAC pilot →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/operations" className="link" style={{ color: "var(--forest)" }}>
              Explore all Operations systems →
            </Link>
          </div>
        </div>
      </section>

      <hr />

      {/* FAQ — Shrunk from 6 to 4 questions per spec §3.9 */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="rule-label">05 · Common questions</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-heading" className="serif">Questions people actually ask</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Straight answers about what Livingry Services does, what we will not do, and where the human stays accountable.
              </p>
              <p className="mt-6">
                <Link href="/faq" className="link" style={{ color: "var(--forest)" }}>Read the full FAQ →</Link>
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-0">
              {umbrellaFaq.map((f, i) => (
                <div key={f.q} className="py-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{f.q}</h3>
                  <p className="mt-3" style={{ color: "var(--ink-2)" }}>{f.a}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* PROOF POSTURE — Preserved per spec §3.9 */}
      <section className="section" aria-labelledby="proof-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="rule-label">06 · Records you can carry forward</div>
            <h2 id="proof-heading" className="serif">Your work should not disappear with a vendor</h2>
          </div>
          <div className="lg:col-span-6">
            <p style={{ color: "var(--ink-2)" }}>
              Credentials expire. Companies close. Documents are destroyed. Platforms change. Livingry builds in tools you control, with records you can carry forward — so what you earn stays with you, even if a vendor or a tool goes away.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/proof" className="link" style={{ color: "var(--forest)" }}>Why ownership matters →</Link>
              <Link href="/insights" className="link" style={{ color: "var(--forest)" }}>Insights →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL CTA — Operations and Habitats per spec §3.7 */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading" className="serif mb-10" style={{ fontSize: "var(--step-3)" }}>
            Seal the client container.
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card" style={{ borderLeft: "3px solid var(--forest)" }}>
              <h3 className="serif" style={{ fontSize: "var(--step-2)" }}>Find an operational leak</h3>
              <p className="mt-3" style={{ color: "var(--ink-2)" }}>
                In one focused review, we identify where demand, customer trust, knowledge, or capacity is escaping — and the first system worth building to close it.
              </p>
              <div className="mt-6">
                <Link href="/hvac/founding-five#scorecard" className="btn btn-primary">Take the Revenue Leak Scorecard <span aria-hidden>→</span></Link>
              </div>
            </div>

            <div className="card" style={{ borderLeft: "3px solid var(--copper-2)" }}>
              <h3 className="serif" style={{ fontSize: "var(--step-2)" }}>See where AI pays for itself</h3>
              <p className="mt-3" style={{ color: "var(--ink-2)" }}>
                The Founding Five Path starts with a 15-minute scorecard: five leak sources, a score that shows where revenue is escaping, and a pilot price fixed before anything is built.
              </p>
              <div className="mt-6">
                <Link href="/hvac/founding-five" className="btn btn-secondary">See the Founding Five Path <span aria-hidden>→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
