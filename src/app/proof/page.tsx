import type { Metadata } from "next";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Founder Proof Ledger | Claims, Evidence and Attestations | Livingry.Services",
  description:
    "A transparent record separating Livingry's founder history, available evidence, corroboration, signed attestations, and current verification status.",
  alternates: { canonical: "/proof" },
};

const statusLegend: { status: string; meaning: string; label: string }[] = [
  { status: "Self-asserted", meaning: "The subject states the claim, but no independent evidence is currently attached", label: "Historical claim" },
  { status: "Evidence-backed", meaning: "Supporting records, images, correspondence, or work artifacts exist", label: "Evidence attached" },
  { status: "Corroborated", meaning: "One or more identifiable third parties attest to the claim", label: "Corroborated" },
  { status: "Issuer-verified", meaning: "The original issuer or an authorized successor confirms the claim", label: "Issuer verified" },
  { status: "Cryptographically attested", meaning: "A named signer has signed a defined claim or evidence manifest", label: "Signed attestation" },
  { status: "Currently valid", meaning: "A time-sensitive credential has been checked and has not expired", label: "Current as of [date]" },
  { status: "Revoked or expired", meaning: "The credential is no longer valid for current practice", label: "Expired / Revoked" },
];

const ledger: { claim: string; period: string; status: string; evidence: string; note: string }[] = [
  {
    claim: "Completed Permaculture Design training with Scott Pittman",
    period: "More than 25 years ago",
    status: "Historical claim",
    evidence: "Founder statement; corroboration will be added if recovered",
    note: "Signed certificate was lost in a house fire; teacher is deceased",
  },
  {
    claim: "Solar design and installation work",
    period: "Approximately 15 years ago",
    status: "Historical claim",
    evidence: "Project photographs, customer attestations, permits, invoices, or equipment records will be added if recovered",
    note: "Original provider is no longer operating",
  },
  {
    claim: "Texas HVAC technician experience",
    period: "Approximately 12 years ago",
    status: "Historical claim",
    evidence: "Employer, coworker, customer, registration, training, tax, or project records will be added if recovered",
    note: "Does not imply current licensure or certification",
  },
  {
    claim: "Bitcoin, Lightning, eCash, Nostr, and AI implementation work",
    period: "Current / recent",
    status: "Evidence-backed when linked",
    evidence: "Public repositories, signed releases, demonstrations, case studies, and client attestations",
    note: "Exact contribution and date shown per project; broad expertise badges are avoided",
  },
];

export default function ProofLedgerPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Proof Ledger", href: "/proof" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Founder Proof Ledger"
        title="What I claim, what I can show, and what remains unverified."
        lede="Trust should not require pretending that incomplete records are complete. This ledger separates personal history, available evidence, third-party corroboration, current credentials, and unresolved gaps. It will change as evidence is recovered or new attestations are added."
      />

      <section className="section">
        <div className="container">
          <div className="rule-label">Verification status legend</div>
          <h2 className="serif">Every claim shows exactly what kind of proof stands behind it.</h2>
          <p className="mt-4 max-w-3xl" style={{ color: "var(--ink-2)" }}>
            We never collapse these statuses into a single generic &ldquo;verified&rdquo; badge. Each claim below is labeled with one of the categories in this legend.
          </p>
          <div className="mt-8 grid gap-0">
            {statusLegend.map((s, i) => (
              <div key={s.status} className="py-4 grid gap-1 md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-6" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <h3 className="serif" style={{ fontSize: "0.98rem" }}>{s.status}</h3>
                <p className="text-[0.9rem]" style={{ color: "var(--ink-2)" }}>{s.meaning}</p>
                <span className="pill pill-next" style={{ whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="rule-label">Claim record list</div>
          <h2 className="serif">Initial ledger.</h2>
          <div className="mt-8 grid gap-6">
            {ledger.map((row) => (
              <div key={row.claim} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{row.claim}</h3>
                  <span className="pill pill-future">{row.status}</span>
                </div>
                <p className="mt-2 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>{row.period}</p>
                <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-2)" }}><span className="eyebrow mr-2">Available evidence</span>{row.evidence}</p>
                <p className="mt-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }}><span className="eyebrow mr-2">Verification note</span>{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rule-label">Dogfood commitment</div>
            <h2 className="serif">We are building our own proof trail first.</h2>
            <p className="mt-5" style={{ color: "var(--ink-2)" }}>
              Livingry will use the same practices it recommends to clients. New work is documented as it happens, with source-linked records, explicit customer consent, bounded AI assistance, human approvals, exportable evidence manifests, and signed attestations where appropriate.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              The goal is not to manufacture a replacement history for records that were lost. The goal is to label the gaps honestly, recover what can be responsibly corroborated, and prevent the same failure in the work created from this point forward.
            </p>
          </div>
          <div>
            <div className="rule-label">An honest note about historical credentials</div>
            <div className="card" aria-label="Credential verification disclosure">
              <p style={{ color: "var(--ink-2)" }}>
                The Permaculture Design, solar, and HVAC experience described in this ledger is part of the founder&apos;s personal work history. Some original certificates and ordinary issuer-verification paths are no longer available. We disclose that limitation rather than presenting these historical credentials as independently verified or currently valid. Where corroborating evidence can be responsibly recovered, Livingry will publish its source and verification status.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EndCta title="Curious what your own business could and could not prove tomorrow?" secondary={{ label: "See the Livingry Method", href: "/how-it-works" }} />
    </>
  );
}
