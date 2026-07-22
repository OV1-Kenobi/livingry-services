import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "About — Livingry Services",
  description: "Livingry Services is a practice of OpenAgents Inc that designs and implements AI-native growth, workflow, knowledge, and discovery systems for useful businesses.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="About"
        title="An AI-native practice for businesses that would rather not be replaced by one."
        lede="Livingry Services is a practice of OpenAgents Inc. We use AI ourselves, every day, to build the kinds of systems we install for our clients — response, recovery, continuity, discovery, knowledge, and workflow — with human judgment always in the loop."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="rule-label">Who we are</div>
            <h2 className="serif">A small, opinionated team.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Livingry Services is led out of {site.location.city}, {site.location.region} by the founding team of {site.parent}. We have spent years building AI agents, Bitcoin-native payment infrastructure, and legal-tech systems — and we watched every one of those tools fail unless it was implemented inside a business that actually understood its own workflow.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              This practice exists to close that gap. We are not selling a product. We are installing systems.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rule-label">Where we come from</div>
            <h2 className="serif">Origins in AI, Bitcoin, and Nostr.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              {site.parent} builds open agentic infrastructure — including the Autopilot desktop agent, the Satnam sovereign-identity stack, and NIP-AC credit-envelope governance. The lessons from that work show up here: portable configurations, human-in-the-loop approval, verifiable evidence, and no lock-in.
            </p>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              When we implement AI in your business, you can point to exactly what it does, exactly what it does not do, and exactly which human is accountable for anything a customer will read as a promise.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="proof-matters-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">The lesson I could not recover from a filing cabinet</div>
            <h2 id="proof-matters-heading" className="serif">Proof should outlive the institution that issued it.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              More than 25 years ago, I completed Permaculture Design training with Scott Pittman, co-founder of the Permaculture Credit Union in Santa Fe. He signed my certificate. Years later, Scott passed away, and the certificate was lost in a house fire.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              My solar and HVAC records followed a different path to the same outcome. The companies that provided the training or certification eventually went out of business. The organizations that once could have confirmed what I learned and did were no longer there to answer the question.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              I still have the experience. I still carry the lessons into my work. But much of the conventional proof depended on a piece of paper, a company database, or an institution remaining available forever.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>They did not.</p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              That experience changed how I think about credentials, portfolios, reviews, and reputation. A person&apos;s history should not disappear because a document burns, a platform closes, an employer fails, a domain expires, or a database becomes inaccessible.
            </p>
            <p className="mt-4 serif italic" style={{ color: "var(--copper-2)", fontSize: "var(--step-1)" }}>
              This is why Livingry treats proof as part of the operating system — not as an afterthought added when someone asks for it.
            </p>
            <blockquote className="mt-6 serif" style={{ fontSize: "var(--step-1)", color: "var(--ink)", borderLeft: "2px solid var(--ink)", paddingLeft: "1.25rem" }}>
              The work may endure in the person while the proof disappears from the world. A better system preserves both.
            </blockquote>
            <div className="mt-8 card" aria-label="Credential verification disclosure">
              <div className="eyebrow">An honest note about my historical credentials</div>
              <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>
                The Permaculture Design, solar, and HVAC experience described here is part of my personal work history. Some original certificates and ordinary issuer-verification paths are no longer available. I disclose that limitation rather than presenting these historical credentials as independently verified or currently valid. Where corroborating evidence can be responsibly recovered, Livingry will publish its source and verification status.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/proof" className="link" style={{ color: "var(--forest)" }}>View the founder proof ledger →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">What we believe</div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Useful businesses deserve modern tools.", b: "The businesses that actually make life work — HVAC companies, roofers, law firms, medical practices — should not be the last to benefit from AI." },
              { t: "AI belongs behind human judgment.",       b: "We keep people responsible for anything a customer, client, or patient will read as a promise. AI drafts, routes, and summarizes; people commit." },
              { t: "Portability protects the client.",         b: "Every system we build lives in tools you own. If our relationship ends tomorrow, the workflow keeps running." },
              { t: "Small systems, honestly measured.",        b: "We would rather ship the smallest workflow that measurably closes a real leak than a beautiful strategy deck nobody implements." },
              { t: "Discovery is a fact problem.",             b: "The way to be found by AI answer engines is to be honestly, verifiably describable — not to game a ranking." },
              { t: "Boundaries are a feature.",                b: "Every implementation clearly states what it will and will not do. That is what makes it safe to actually use." },
              { t: "Proof should be created during the work.",  b: "Reconstructing evidence years later is expensive and sometimes impossible. We design workflows that capture source, consent, approvals, job evidence, customer acceptance, and review eligibility as normal by-products of delivering the service." },
              { t: "Proof should be portable.",                 b: "A client should be able to export its operational history, evidence manifests, reviews, and attestations in documented formats. Changing software vendors should not erase the business's memory." },
              { t: "Proof should be specific.",                 b: "A signature proves that a key signed a statement. It does not automatically prove that every statement is true. Livingry keeps the claim, evidence, signer, verification status, and expiration or revocation state separate." },
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
              The fastest path to a real conversation is the System Review. If you would prefer email, we read everything that comes in.
            </p>
            <div className="mt-6 grid gap-2 text-[0.95rem]" style={{ color: "var(--ink)" }}>
              <div><span className="eyebrow mr-3">Email</span><a className="link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
              <div><span className="eyebrow mr-3">Based in</span>{site.location.city}, {site.location.region}, {site.location.country}</div>
              <div><span className="eyebrow mr-3">Parent</span>{site.parent}</div>
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
