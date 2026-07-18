import type { Metadata } from "next";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Why Livingry — Technology in Service of More Capable Organizations",
  description: "Livingry, from Buckminster Fuller: technology directed toward human-life advantage rather than conflict, waste, and extraction. What that means for how Livingry Services designs and implements AI systems.",
  alternates: { canonical: "/why-livingry" },
};

export default function WhyLivingry() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Why Livingry", href: "/why-livingry" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Why Livingry"
        title="Technology should increase our capacity to care for life — and for the useful work of the people around us."
        lede="The name comes from Buckminster Fuller&rsquo;s distinction between weaponry and livingry: systems directed toward human-life advantage rather than conflict, waste, and extraction. Livingry Services applies that principle at the organizational level."
      />

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The idea</div>
            <h2 className="serif">Livingry, in one sentence.</h2>
            <p className="mt-5 serif italic" style={{ fontSize: "var(--step-1)", color: "var(--copper-2)" }}>
              Livingry is what happens when useful resources start working together again.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              A customer who gets a timely answer. An estimate that receives the follow-up it deserved. A team that can find what it needs. A website that explains the truth clearly. A skilled professional spending less time chasing information and more time helping people. A business that keeps more of the value it works hard to create.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              That is the work of Livingry Services: finding the value that has gone dormant, disconnected, or unseen — and designing the systems that put it back into useful circulation.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rule-label">The translation</div>
            <table className="w-full mt-3" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink)" }}>
                  <th className="text-left py-3 text-[0.82rem] eyebrow" style={{ color: "var(--ink-3)" }}>Livingry concept</th>
                  <th className="text-left py-3 text-[0.82rem] eyebrow" style={{ color: "var(--ink-3)" }}>Commercial expression</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI life-support system", "Practical system that helps the organization function better"],
                  ["Human-circumstance advantage", "More capable people, clearer work, better service"],
                  ["Comprehensive design science", "Map the whole customer and operating system first"],
                  ["World Game", "Treat the business as a connected system of people, resources, information, and consequences"],
                  ["Livingry vs. weaponry", "Technology that supports agency and useful work, rather than extraction, manipulation, or replacement"],
                  ["More-with-less", "Less wasted effort, fewer dropped opportunities, more useful output from existing capacity"],
                ].map(([a, b]) => (
                  <tr key={a} style={{ borderBottom: "1px solid var(--rule)" }}>
                    <td className="py-4 pr-6 serif" style={{ color: "var(--ink)", fontSize: "0.98rem" }}>{a}</td>
                    <td className="py-4" style={{ color: "var(--ink-2)", fontSize: "0.95rem" }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr />

      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label" style={{ color: "var(--seal)" }}>The practical test</div>
            <h2 className="serif" style={{ color: "var(--paper)" }}>Every engagement has to earn a &lsquo;yes&rsquo; to at least three of these.</h2>
          </div>
          <ul className="lg:col-span-7 grid gap-0">
            {[
              "Does this help people receive a more timely, clear, competent response?",
              "Does it reduce genuinely wasted time, information, capacity, or effort?",
              "Does it make the client organization more capable rather than more dependent?",
              "Does it retain human responsibility for consequential judgment?",
              "Does it improve trust, understanding, or continuity rather than merely increase activity?",
              "Can we measure a real improvement?",
              "Would we be comfortable explaining exactly how the system works to the affected people?",
            ].map((q, i) => (
              <li key={i} className="py-4 flex items-baseline gap-4" style={{ borderTop: i === 0 ? "1px solid rgba(246,241,228,0.24)" : "1px solid rgba(246,241,228,0.14)" }}>
                <span className="mono text-[0.72rem]" style={{ color: "var(--seal)", width: "2rem" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--paper)" }}>{q}</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(246,241,228,0.24)", height: 0 }} />
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rule-label">Things we do not say</div>
            <ul className="grid gap-3" style={{ color: "var(--ink-3)" }}>
              <li>&ldquo;We are building the World Game.&rdquo;</li>
              <li>&ldquo;We are replacing the military-industrial complex.&rdquo;</li>
              <li>&ldquo;We provide life support.&rdquo;</li>
              <li>&ldquo;AI will solve humanity&rsquo;s problems.&rdquo;</li>
              <li>&ldquo;We make the world work for everyone.&rdquo;</li>
            </ul>
          </div>
          <div>
            <div className="rule-label">Things we do say</div>
            <ul className="grid gap-3" style={{ color: "var(--ink)" }}>
              <li>&ldquo;We apply a livingry principle: technology should help people and useful organizations become more capable.&rdquo;</li>
              <li>&ldquo;We build systems that reduce friction between a person&rsquo;s need and a competent response.&rdquo;</li>
              <li>&ldquo;We use AI where it creates real advantage — and keep people responsible where judgment matters.&rdquo;</li>
              <li>&ldquo;We leave clients more capable and in control.&rdquo;</li>
            </ul>
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
