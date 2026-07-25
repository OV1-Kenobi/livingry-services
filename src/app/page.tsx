import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { homepageFaq } from "@/lib/faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { IllustrativeImage } from "@/components/IllustrativeImage";
import { RevenueLeakDiagram } from "@/components/diagrams/RevenueLeakDiagram";

// Each row pairs the owner's real need with the shortcut most owners reach for
// and the general-contracting alternative. Deliberately tool-agnostic: we name
// categories of tooling, never a vendor we have not actually selected for a client.
const gcRows = [
  {
    need: "Speed-to-lead on web and phone inquiries",
    alone: "Buy a chatbot and hope it converts.",
    gc: "Curate the lead-routing path that fits your CRM, send after-hours demand to a real responder, and put written limits on what the AI is allowed to say.",
  },
  {
    need: "Estimate follow-through",
    alone: "Set a calendar reminder.",
    gc: "Build a reactivation workflow that drafts the right nudge at the right interval from your own estimate records, with a person approving anything before it leaves.",
  },
  {
    need: "Customer continuity",
    alone: "Send one annual email.",
    gc: "Sequence maintenance, warranty, replacement-eligibility, and seasonal contact on the cadence your service history actually justifies.",
  },
  {
    need: "Knowledge trapped in your team",
    alone: "Start a wiki nobody updates.",
    gc: "Put a retrieval layer over the documents and threads you already have, scoped by role, so answers come on demand instead of through one busy person.",
  },
  {
    need: "Discovery on AI search and answer engines",
    alone: "Ignore it.",
    gc: "Build the AI-readable structure — structured data, llms.txt, canonical facts, answerable FAQs — so answer engines describe you accurately, then monitor what they say.",
  },
];

// The root layout supplies a title template; the homepage sets an absolute
// title so the brand name is not appended twice.
export const metadata: Metadata = {
  title: {
    absolute: "AI General Contracting for Trade & Professional Practices — Livingry Services",
  },
  description:
    "Livingry Services is the AI general contractor for trade and professional practices. We curate, integrate, and govern AI tools inside the systems you already run — so leads, estimates, customers, and knowledge stop leaking away.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI General Contracting for Trade & Professional Practices — Livingry Services",
    description:
      "We curate the right AI tools for your operation, integrate them into the systems you already use, and stay accountable when something breaks.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  // FAQPage schema mirrors the six questions rendered visibly below. Keeping the
  // two generated from one source is what keeps the markup honest.
  const homepageFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={homepageFaqLd} />

      {/* HERO */}
      <section className="section paper-grain" aria-labelledby="hero-heading">
        <div className="container">
          <div className="max-w-4xl">
            <div className="eyebrow">Livingry Services · AI General Contracting</div>
            <h1 id="hero-heading" className="serif mt-6">
              {site.positioning.headline}
            </h1>
            <p className="mt-6 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "48rem" }}>
              {site.positioning.subhead}
            </p>
            <p className="mt-6" style={{ color: "var(--ink-2)", maxWidth: "46rem" }}>
              You did not start your business to become an AI expert. But the tooling that used to be a big-company advantage is now within reach, and your competitors are quietly wiring it up. We curate the right AI tools for your operation, integrate them into the systems you already use, and stay accountable when something breaks. You run the business. We run the AI stack behind it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <Link href="/system-review" className="btn btn-primary">Book a Free System Review <span aria-hidden>→</span></Link>
              <Link href="/assessment" className="btn btn-secondary">Take the 10-Minute Leak Assessment</Link>
            </div>
            <p className="mt-8 text-[0.88rem]" style={{ color: "var(--ink-3)", maxWidth: "44rem" }}>
              Named for Buckminster Fuller&rsquo;s <em>livingry</em> — technology pointed at preserving and extending human life rather than extracting from it. We build in tools you control, with records you can carry forward.
            </p>
          </div>

          {/* Current focus strip */}
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-start">
            <div className="eyebrow" style={{ color: "var(--ink-3)" }}>Current implementation focus</div>
            <div className="lg:col-span-3 flex flex-wrap gap-2.5">
              <span className="pill pill-active">HVAC · Active</span>
              <span className="pill pill-next">Roofing · Founding partners</span>
              <span className="pill pill-future">Legal · In development</span>
              <span className="pill pill-future">Medical · In development</span>
            </div>
            <div className="lg:col-start-2 lg:col-span-3 text-[0.9rem]">
              <Link href="/hvac/founding-five" className="link" style={{ color: "var(--forest)" }}>
                See the Founding Five HVAC program →
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <RevenueLeakDiagram />
          </div>
        </div>
      </section>

      <hr />

      {/* WHAT IS AI GENERAL CONTRACTING */}
      <section className="section" aria-labelledby="gc-heading">
        <div className="container">
          <div className="rule-label">01 · The short answer</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="gc-heading" className="serif">What is AI general contracting?</h2>
              <p className="mt-5 serif" style={{ fontSize: "var(--step-1)", lineHeight: 1.45, color: "var(--ink)" }}>
                Livingry Services is an AI general contractor for trade and professional practices. We curate, integrate, and govern AI tools inside the systems a business already runs — closing the places where leads, estimates, customers, knowledge, and trust leak away, with humans accountable throughout.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-5">
              <p style={{ color: "var(--ink-2)" }}>
                A general contractor does not pour the foundation or run the wire. They hire the right subs, sequence the work, hold them to scope, and own the result. <strong>For your business&rsquo;s AI stack, we play that role.</strong> You never need to choose between two scheduling tools, stand up a retrieval layer, or work out how a chatbot should behave against your CRM. That is our job.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                Running an HVAC, roofing, legal, or medical practice is already a full-time job, and AI tooling changes faster than any owner can track. Most of what is written about &ldquo;AI for business&rdquo; is either a vendor pitch or a shallow list. <strong>We sit between you and the AI vendors</strong> — testing, comparing, integrating, governing, and handing the keys back to your team.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                The belief worth discarding first is that <em>AI is one tool you can buy that will fix the leak.</em> It is not. Every workflow that loses value has its own shape, and each leak needs the right tool wired in correctly — with a person still accountable for anything a customer will read as a promise.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <table className="gc-table" role="table">
              <caption className="sr-only">
                What a trade or professional practice actually needs, the shortcut most owners reach for on their own, and what Livingry Services does as an AI general contractor.
              </caption>
              <thead>
                <tr>
                  <th scope="col">What you actually need</th>
                  <th scope="col">What you might do alone</th>
                  <th scope="col">What we do as your AI general contractor</th>
                </tr>
              </thead>
              <tbody>
                {gcRows.map((r) => (
                  <tr key={r.need}>
                    <th scope="row" data-label="What you actually need">{r.need}</th>
                    <td data-label="What you might do alone">{r.alone}</td>
                    <td data-label="What we do as your AI general contractor" className="gc-does">{r.gc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/system-review" className="btn btn-primary">Book a Free System Review <span aria-hidden>→</span></Link>
            <Link href="/how-it-works" className="btn btn-ghost">See how the work runs <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <hr />

      {/* WHAT WE DO — leak table */}
      <section className="section" aria-labelledby="leaks-heading">
        <div className="container">
          <div className="rule-label">02 · What we do</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="leaks-heading" className="serif">
                Where does your business leak what it already earned?
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Most businesses do not only have a lead problem. They have a leakage problem: attention is earned but not captured; trust is built but not carried forward; knowledge exists but cannot be used; and good prospects disappear between one step and the next.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                Each of the seven system families below names a specific leak — and the AI work we take on to close it.
              </p>
              <div className="mt-8">
                <Link href="/system-review" className="btn btn-primary">Find My Biggest Leak <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-0">
                {site.systemFamilies.map((s, i) => (
                  <li key={s.slug}>
                    <Link
                      href={`/systems/${s.slug}`}
                      className="grid gap-1 py-6 group"
                      style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{s.title}</h3>
                        <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="mt-1 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
                        <span style={{ color: "var(--copper-2)" }}>Leak · </span>{s.leak}
                      </div>
                      <div className="text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
                        <span style={{ color: "var(--forest)" }}>Fix · </span>{s.improves}
                      </div>
                      <p className="mt-2 text-[0.92rem]" style={{ color: "var(--ink-2)", borderLeft: "2px solid var(--copper)", paddingLeft: "0.85rem" }}>
                        <span className="eyebrow" style={{ color: "var(--copper-2)" }}>AI general contracting here</span>
                        <span className="block mt-1.5">{s.aiGc}</span>
                      </p>
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

      {/* METHOD */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="method-heading">
        <div className="container">
          <div className="rule-label">03 · The method</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="method-heading" className="serif">The Livingry Leakproofing Framework.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Adding traffic, tools, or automation to a workflow that already leaks only multiplies the waste. A system that is unsealed cannot be scaled — so we seal the workflow first, then scale the work.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                We do not start by adding another tool. We start by identifying the point where value leaks out of the business — then close that gap with the smallest practical combination of process, content, training, automation, AI, and human accountability.
              </p>
              <p className="mt-4 serif italic" style={{ color: "var(--copper-2)", fontSize: "var(--step-1)" }}>
                Find the leak. Seal the gap. Keep more of what you already earned.
              </p>
              <p className="mt-6">
                <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>Read the full framework →</Link>
              </p>
            </div>
            <ol className="lg:col-span-7 grid gap-0">
              {site.method.map((m, i) => (
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

      {/* FOUNDER CREDIBILITY */}
      <section className="section" aria-labelledby="founder-heading">
        <div className="container">
          <div className="rule-label">04 · Who does the work</div>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <h2 id="founder-heading" className="serif">Built by someone who has done the work.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Livingry Services is an independent practice. The founder came up through hands-on trades and field work — permaculture design, solar, and HVAC — before years of building AI agents, Bitcoin-native payment infrastructure, and legal-tech systems. That combination is the point: an AI general contractor has to understand the job site as well as the stack.
              </p>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                It also taught a harder lesson. Records of that work were lost — to a fire, to a company that closed, to a rebrand — because each one depended on an institution staying available forever. Those losses are the design requirements behind Livingry: build in tools the client controls, with records they can carry forward.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/about" className="link" style={{ color: "var(--forest)" }}>Why Livingry →</Link>
                <Link href="/proof" className="link" style={{ color: "var(--forest)" }}>Read the origin story →</Link>
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

      {/* INDUSTRIES */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <div className="rule-label">05 · Industries</div>
          <div className="max-w-3xl">
            <h2 id="industries-heading" className="serif">Built for the realities of your industry.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The underlying method stays consistent. The workflows, language, data, approvals, and handoffs must fit the business that will use them.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {site.industries.map((ind) => (
              <Reveal key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="card block h-full transition-transform"
                  style={{ transitionDuration: "180ms" }}
                >
                  <span className={`pill ${ind.status === "active" ? "pill-active" : ind.status === "next" ? "pill-next" : "pill-future"}`}>
                    {ind.statusLabel}
                  </span>
                  <h3 className="serif mt-5">{ind.title}</h3>
                  <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{ind.promise}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[0.9rem]" style={{ color: "var(--forest)" }}>
                    {ind.cta} <span aria-hidden>→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr />

      {/* WHY LIVINGRY */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="why-heading">
        <div className="container">
          <div className="rule-label" style={{ color: "var(--seal)" }}>
            <span style={{ color: "var(--seal)" }}>06 · Why livingry</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="why-heading" className="serif" style={{ color: "var(--paper)" }}>
                Technology should increase our capacity to care for life — and for the useful work of the people around us.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p style={{ color: "var(--paper)", opacity: 0.85 }}>
                The name comes from Buckminster Fuller&apos;s distinction between <em>weaponry</em> and <em>livingry</em>: systems directed toward human-life advantage rather than conflict, waste, and extraction.
              </p>
              <p className="mt-4" style={{ color: "var(--paper)", opacity: 0.85 }}>
                Livingry Services applies that principle at the organizational level. We help useful businesses and practices use modern tools — including AI — to respond to people faster, reduce wasted effort, preserve hard-won knowledge, and keep responsibility in human hands.
              </p>
              <div className="mt-8">
                <Link href="/why-livingry" className="btn btn-secondary" style={{ borderColor: "var(--paper)", color: "var(--paper)" }}>
                  Read the full thinking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="rule-label">07 · Common questions</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-heading" className="serif">Questions owners actually ask.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Straight answers about what an AI general contractor does, what we will not do, and where the human stays accountable.
              </p>
              <p className="mt-6">
                <Link href="/faq" className="link" style={{ color: "var(--forest)" }}>Read the full FAQ →</Link>
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-0">
              {homepageFaq.map((f, i) => (
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

      {/* PROOF THAT CAN TRAVEL */}
      <section className="section" aria-labelledby="proof-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="rule-label">Records you can carry forward</div>
            <h2 id="proof-heading" className="serif">Your business history should not disappear with a vendor.</h2>
          </div>
          <div className="lg:col-span-6">
            <p style={{ color: "var(--ink-2)" }}>
              Credentials expire. Companies close. Documents are destroyed. Platforms change. Livingry builds in tools you control, with records you can carry forward — so what your business earns stays with your business, even if a vendor or a tool goes away.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/proof" className="link" style={{ color: "var(--forest)" }}>Why ownership matters →</Link>
              <Link href="/insights" className="link" style={{ color: "var(--forest)" }}>Insights →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight paper-grain" aria-labelledby="cta-heading">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 items-end">
            <div>
              <div className="eyebrow">Free · No sales pressure</div>
              <h2 id="cta-heading" className="serif mt-4" style={{ fontSize: "var(--step-4)" }}>
                Find the highest-value leak in your business.
              </h2>
              <p className="mt-4 max-w-xl" style={{ color: "var(--ink-2)" }}>
                In one focused review, we identify where demand, customer trust, knowledge, or capacity is escaping — and the first system worth building to close it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/system-review" className="btn btn-primary">Book a Free System Review <span aria-hidden>→</span></Link>
              <Link href="/assessment" className="btn btn-ghost">Take the Leak Assessment <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
