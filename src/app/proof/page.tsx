import type { Metadata } from "next";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Proof should outlive the institution that issued it",
  description:
    "A first-person account of losing hard-won credentials to a fire, a closed company, and a rebrand — and how those losses became the client-control architecture behind Livingry.",
  alternates: { canonical: "/proof" },
  openGraph: {
    title: "Proof should outlive the institution that issued it",
    description:
      "Why Livingry gives clients the ability to create, credential, custody, export, and control their own data — built from firsthand experience of proof disappearing.",
    url: "/proof",
    type: "article",
  },
};

const losses: { era: string; title: string; body: string }[] = [
  {
    era: "More than 25 years ago",
    title: "A Permaculture Design certificate, lost to a house fire",
    body: "I earned a Permaculture Design certification and held the physical certificate. There was no digital backup. A house fire destroyed the document, and the person who issued it has since died. The training happened. The paper that recorded it, and the one person who could have re-issued it, are both gone.",
  },
  {
    era: "About 15 years ago",
    title: "A solar certification stranded when the company closed",
    body: "I trained and certified as a solar designer and installer through a private company. That company no longer exists. There is no successor to contact and no database left to query, so the certification became impossible to verify through the ordinary channel — not because the work never happened, but because the only institution that recorded it disappeared.",
  },
  {
    era: "About 12 years ago",
    title: "An HVAC card that survives only on paper",
    body: "My HVAC training is documented by a physical, Texas-issued card. It is the one artifact I can still hold. The company connected to that training has a new owner and was rebranded, so the trail behind the card now points to an entity that no longer answers to its old name. The card remains; the context around it has moved on.",
  },
];

const mapping: { pain: string; rule: string; body: string }[] = [
  {
    pain: "Physical-only loss",
    rule: "Redundant, exportable records and tested recovery",
    body: "If proof exists in exactly one place, one accident ends it. Records are kept in more than one location, in formats you can export yourself, and recovery is tested so you know it works before you need it.",
  },
  {
    pain: "Issuer disappearance",
    rule: "Portable evidence bundles, provenance, and independent attestations",
    body: "When the issuer is gone, verification cannot depend on them alone. Evidence travels as a self-contained bundle that carries its own provenance, alongside independent attestations from parties who are not the original issuer.",
  },
  {
    pain: "Company rebrand or ownership change",
    rule: "Durable identifiers independent of a vendor's current name",
    body: "Names and databases change hands. Records are anchored to durable identifiers that stay stable even when a vendor is renamed, sold, or shut down, so the meaning of the record does not depend on today's corporate branding.",
  },
];

const covenant: { commit: string; detail: string }[] = [
  {
    commit: "You hold the primary accounts, credentials, keys, and admin access",
    detail: "Systems are built on accounts you own. You keep the top-level credentials, encryption keys, and administrative access — not Livingry.",
  },
  {
    commit: "Your data and evidence are exportable",
    detail: "Client and operational data, and the evidence attached to it, can be exported by you in documented, portable formats at any time.",
  },
  {
    commit: "Workflows, integrations, recovery, and handoff are documented",
    detail: "How each system is wired, how it recovers, and how it would be handed off are written down and given to you — not held as tacit knowledge inside Livingry.",
  },
  {
    commit: "Material automation keeps human authority and observable records",
    detail: "Anything consequential runs behind a human decision, and every material action leaves a record you can see and review.",
  },
  {
    commit: "Your systems keep operating if the relationship ends",
    detail: "Because everything lives in tools you control, ending the Livingry relationship does not switch anything off or take your records with it.",
  },
];

const controlRows: { item: string; you: boolean; livingry: boolean }[] = [
  { item: "Primary accounts, credentials, and keys", you: true, livingry: false },
  { item: "Client and operational data + evidence exports", you: true, livingry: false },
  { item: "Day-to-day operation of a system", you: true, livingry: true },
  { item: "Configuration and improvement work", you: false, livingry: true },
  { item: "Sole, exclusive control of any record", you: false, livingry: false },
];

export default function ProofPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Proof", href: "/proof" },
  ];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Why ownership matters"
        title="Proof should outlive the institution that issued it."
        lede="I learned what happens when proof lives somewhere you do not control. Three times, the record of real work I did came down to a single document, a single company, or a single database — and each one eventually failed me. That experience is the reason Livingry is built the way it is."
      />

      {/* 1 · Firsthand losses — chronological editorial timeline */}
      <section className="section" aria-labelledby="losses-heading">
        <div className="container">
          <div className="rule-label">Three firsthand losses</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="losses-heading" className="serif">
                Three times, the proof disappeared before the skill did.
              </h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                What follows is my own history, in the order it happened. It describes training I completed and work I did. It is not a claim of current licensure or presently valid certification — it is the lived experience that shaped how I think about records.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ol className="proof-timeline">
                {losses.map((l) => (
                  <li key={l.title} className="proof-event">
                    <div className="proof-era">
                      <span className="eyebrow" style={{ color: "var(--copper-2)" }}>{l.era}</span>
                      <span className="pill pill-future" style={{ whiteSpace: "nowrap" }}>Historical experience</span>
                    </div>
                    <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>{l.title}</h3>
                    <p className="mt-3 text-[0.97rem]" style={{ color: "var(--ink-2)" }}>{l.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Governing principle — pull quote + interpretation */}
      <section className="section" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-labelledby="principle-heading">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label" style={{ color: "var(--seal)" }}>The governing principle</div>
            <h2 id="principle-heading" className="serif" style={{ color: "var(--paper)" }}>
              One rule holds all three lessons together.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <blockquote
              className="serif"
              style={{ fontSize: "var(--step-3)", lineHeight: 1.2, color: "var(--paper)", borderLeft: "3px solid var(--seal)", paddingLeft: "1.5rem" }}
            >
              &ldquo;He who creates, credentials, and custodies &lsquo;It&rsquo;, controls &lsquo;It&rsquo;, no matter what &lsquo;It&rsquo; is.&rdquo;
            </blockquote>
            <p className="mt-6" style={{ color: "var(--paper)", opacity: 0.85 }}>
              In plain language: when the only record of something lives inside another institution&apos;s exclusive system, your access to it — and anyone&apos;s ability to verify it — depends on that institution surviving and choosing to cooperate. When the fire came, the company folded, and the brand changed, that dependence is exactly what failed.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Pain to architecture mapping */}
      <section className="section" aria-labelledby="architecture-heading">
        <div className="container">
          <div className="rule-label">From pain to design rules</div>
          <div className="max-w-3xl">
            <h2 id="architecture-heading" className="serif">Each failure became a design requirement.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              I did not want anyone I work with to inherit the same fragility. So each way my own proof failed maps directly to a rule Livingry now builds by.
            </p>
          </div>
          <div className="mt-10 grid gap-0">
            {mapping.map((m, i) => (
              <div
                key={m.pain}
                className="grid gap-3 py-6 md:grid-cols-[1fr_auto_2fr] md:items-baseline md:gap-8"
                style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
              >
                <div>
                  <span className="eyebrow" style={{ color: "var(--copper-2)" }}>The failure</span>
                  <h3 className="serif mt-1" style={{ fontSize: "0.98rem" }}>{m.pain}</h3>
                </div>
                <span aria-hidden className="mono hidden md:inline" style={{ color: "var(--ink-3)" }}>&rarr;</span>
                <div>
                  <span className="eyebrow" style={{ color: "var(--forest)" }}>The design rule</span>
                  <h3 className="serif mt-1" style={{ fontSize: "0.98rem" }}>{m.rule}</h3>
                  <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 card" style={{ background: "var(--paper-2)" }} aria-label="Important caveat about cryptographic proof">
            <span className="eyebrow">A precise caveat</span>
            <p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
              Hashes and signatures can prove that a record is intact and show where it came from. They do not create legal authority, and they do not prove the underlying claim is true. Establishing that still requires an authoritative issuer or corroborating evidence. Livingry builds for integrity and portability — not for a false impression that cryptography alone makes a claim valid.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Livingry Client-Control Covenant */}
      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="covenant-heading">
        <div className="container">
          <div className="rule-label">The Livingry Client-Control Covenant</div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="covenant-heading" className="serif">What I build for clients — and for myself.</h2>
              <p className="mt-5" style={{ color: "var(--ink-2)" }}>
                Livingry gives clients the ability to create, credential, custody, export, and control their own client and operational data on systems they control — not systems Livingry controls. We do different things differently: this is the tooling I wish I had, and the tooling I have built for myself.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ol className="grid gap-0">
                {covenant.map((c, i) => (
                  <li
                    key={c.commit}
                    className="grid grid-cols-[auto_1fr] gap-4 py-5"
                    style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
                  >
                    <span className="mono text-[0.72rem]" style={{ color: "var(--copper)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{c.commit}</h3>
                      <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{c.detail}</p>
                    </div>
                  </li>
                ))}
                <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
              </ol>

              {/* Control comparison — meaning conveyed by text, not colour */}
              <div className="mt-10">
                <div className="eyebrow" style={{ color: "var(--ink-3)" }}>Who controls what</div>
                <table className="control-table mt-3">
                  <caption className="sr-only">
                    Who controls each part of a Livingry system: you, Livingry may operate, and what no single vendor should control alone.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Responsibility</th>
                      <th scope="col">You control</th>
                      <th scope="col">Livingry may operate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controlRows.map((r) => (
                      <tr key={r.item}>
                        <th scope="row">{r.item}</th>
                        <td>{r.you ? <span>Yes<span className="sr-only"> — you control this</span></span> : <span aria-label="No">&mdash;</span>}</td>
                        <td>{r.livingry ? <span>Yes<span className="sr-only"> — Livingry may operate this</span></span> : <span aria-label="No">&mdash;</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-[0.9rem]" style={{ color: "var(--ink-3)" }}>
                  No vendor — including Livingry — should hold sole, exclusive control of any record your business depends on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EndCta
        title="Map where your business could lose proof."
        primary={{ label: "Map where your business could lose proof", href: "/system-review" }}
      />
    </>
  );
}
