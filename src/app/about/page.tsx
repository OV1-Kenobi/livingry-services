import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { IllustrativeImage } from "@/components/IllustrativeImage";
import { canonicalPositioningLine } from "@/lib/revenue-leaks/content";

export const metadata: Metadata = {
  title: "About — Livingry Services",
  description:
    "Livingry Services helps established HVAC/R companies work the calls, estimates, past customers, and referrals they already paid to create — while keeping people accountable for consequential decisions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Livingry Services",
    description:
      "An independent practice grounded in field work. Human-controlled systems, records clients own, and no client outcomes claimed before they are documented.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="About"
        title="An independent practice built on field experience."
        lede={canonicalPositioningLine}
        primaryCta={{ label: "Diagnose My Cash Flow Leaks", href: "/assessment" }}
        secondaryCta={{ label: "Book My Leak Assessment", href: site.booking.url }}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="rule-label">Where this comes from</div>
            <h2 className="serif">Grounded in field work, not slideware.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The founder came up through hands-on trades and field work — a Permaculture Design Certificate with Scott Pittman, organizing the first Permaculture Design Course at the Kerrville Folk Festival ranch, Texas HVAC certification training in 2012, PV solar design-and-install training in 2018, and years as a solo residential contractor — before years of building AI agents and Bitcoin-native payment infrastructure, including a 2019 book on Bitcoin and three months as Operations Lead at an open-source AI lab. That combination is the point: technology only earns its place when it makes real, useful work easier to do and easier to keep.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Before I built Livingry, I ran work as a solo residential contractor. I know what it is like to pay for a lead and lose it before I could put the tools down.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The phone would buzz in my pocket while I had tools in my hands and a client watching. Some of those paid leads were being sent to local competitors at the same time. The first contractor to respond had the advantage. I was not ignoring the opportunity. I was doing the work the last opportunity had already paid me to do.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              That distinction did not matter to the homeowner waiting for an answer. The lead moved on. The money I spent to create the opportunity was gone.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              A missed call is not a phone problem. It is a continuity problem. That moment — tools in hand, lead already lost — is why Livingry begins with missed-call recovery and why the four leaks matter: missed calls, dropped estimates, dead client lists, and lost referrals. Each one is a handoff where the opportunity and the information needed to act on it stop connecting.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              It also taught a harder lesson. Records of that work were lost — to a fire, to a company that closed, to a rebrand — because each one depended on an institution staying available forever. Those losses became the design requirements behind Livingry.
            </p>
            <p className="mt-6">
              <a href="/evidence" className="link" style={{ color: "var(--forest)" }}>How this story is labelled as evidence &rarr;</a>
            </p>
            <figure className="diagram mt-8" style={{ maxWidth: "26rem" }}>
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
          <div className="lg:col-span-6">
            <div className="rule-label">The name</div>
            <h2 className="serif">Livingry, from Buckminster Fuller.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Fuller drew a line between <em>weaponry</em> and <em>livingry</em>: technology directed toward human-life advantage rather than conflict, waste, and extraction. Livingry Services applies that principle at the level of a business — using modern tools, including AI, to help useful organizations respond faster, waste less, preserve hard-won knowledge, and keep responsibility in human hands.
            </p>
            <p className="mt-6">
              <a href="/how-it-works#data-continuity" className="link" style={{ color: "var(--forest)" }}>See what Revenue &amp; Data Continuity means &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }} id="ownership-and-handoff" aria-labelledby="control-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Systems you keep</div>
            <h2 id="control-heading" className="serif">Everything we build lives in tools you own.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              We install systems inside accounts, data, and tools you control — not ours. You hold the primary credentials and keys, your data and its evidence stay exportable, and the way each system works is documented and handed to you rather than kept in our heads.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              The test is simple: if our relationship ended tomorrow, the workflow would keep running and nothing would switch off. Capability we add should stay with you.
            </p>
            <p className="mt-6">
              <a href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>See how ownership is designed into the method &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="trades-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Where we start</div>
            <h2 id="trades-heading" className="serif">Trades are the first application, not the boundary.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              We begin with trades and home-services businesses — HVAC first, roofing next — because their work is concrete, their leaks are measurable, and getting it right there is unforgiving. That focus sharpens the systems.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              But the underlying idea — capture value while the work happens, keep humans accountable, and leave the client in control — has to be proven somewhere first. HVAC/R is where we prove it. I built this for the contractor I was at 35.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">What we believe</div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Useful businesses deserve modern tools.", b: "The businesses that actually make life work should not be the last to benefit from AI." },
              { t: "AI belongs behind human judgment.", b: "People stay responsible for anything a customer will read as a promise. AI drafts, routes, and summarizes; people commit." },
              { t: "Portability protects the client.", b: "Every system lives in tools you own. If our relationship ends, the workflow keeps running." },
              { t: "Small systems, honestly measured.", b: "We would rather ship the smallest workflow that measurably closes a real leak than a strategy deck nobody implements." },
              { t: "Discovery is a fact problem.", b: "The way to be found by AI answer engines is to be honestly, verifiably describable — not to game a ranking." },
              { t: "Boundaries are a feature.", b: "Every implementation states what it will and will not do. That is what makes it safe to actually use." },
            ].map((c) => (
              <div key={c.t} className="card">
                <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{c.t}</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <div className="rule-label">Contact</div>
            <h2 className="serif">Talk to us.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              The fastest path to a real conversation is the Leak Assessment — one suspected leak,
              traced from its first trigger to the next broken handoff. If you would prefer email, we
              read everything that comes in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/leak-assessment" className="btn btn-primary">Book My Leak Assessment <span aria-hidden>→</span></Link>
            </div>
            <div className="mt-6 grid gap-2 text-[0.95rem]" style={{ color: "var(--ink)" }}>
              <div><span className="eyebrow mr-3">Email</span><a className="link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
              <div><span className="eyebrow mr-3">Based in</span>{site.location.city}, {site.location.region}, {site.location.country}</div>
            </div>
          </div>
          <div>
            <div className="rule-label">Not-for-us</div>
            <h2 className="serif">Who we are not the right fit for.</h2>
            <ul className="mt-5 grid gap-3" style={{ color: "var(--ink-2)" }}>
              <li>Companies looking for a chatbot that pretends to be a human.</li>
              <li>Companies planning to replace their team with AI.</li>
              <li>Companies without a real customer base to serve well.</li>
              <li>Anyone hoping AI will make dishonest marketing more efficient.</li>
              <li>Anyone whose success depends on manipulating an answer engine.</li>
            </ul>
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
