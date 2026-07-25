import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { IllustrativeImage } from "@/components/IllustrativeImage";
import { aiForHvacCompanies } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — AI General Contracting Field Guides for Trade Businesses",
  description:
    "Livingry Insights: the published field guide on AI for HVAC companies, plus the editorial roadmap of guides on AI general contracting, human-in-the-loop boundaries, and discovery in the age of AI search.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — AI General Contracting Field Guides for Trade Businesses",
    description:
      "Seven planned field guides on what AI actually does inside a trade or professional practice — published as each one can be written from real implementation evidence.",
    url: "/insights",
    type: "website",
  },
};

// The editorial roadmap. Every entry is a commitment; only entries carrying an
// href are actually published, and the rest link nowhere rather than to a thin
// URL. Status is the honest state of the work; the case study stays "Evidence
// pending" until the Founding Five program produces results we can verify.
type PillarStatus = "Published" | "In development" | "Planned" | "Evidence pending";

const pillars: {
  title: string;
  dek: string;
  tag: string;
  status: PillarStatus;
  answers: string;
  href?: string;
}[] = [
  {
    title: aiForHvacCompanies.title,
    dek: "What AI actually does inside an HVAC operation today, what is still hype, and a tool-agnostic way to compare options without a vendor in the room.",
    tag: "HVAC",
    status: "Published",
    answers: "What can AI realistically do for an HVAC company right now?",
    href: aiForHvacCompanies.path,
  },
  {
    title: "AI General Contracting: A New Category for Trade Businesses",
    dek: "The general-contractor analogy in full: what the role covers, who it is for, who it is not for, and how accountability is supposed to work.",
    tag: "Category",
    status: "In development",
    answers: "What is an AI general contractor, and why would a trade business hire one?",
  },
  {
    title: "Will AI Replace Your Dispatcher? An Honest Answer",
    dek: "The replacement fear addressed directly, and why the human-in-the-loop boundary is the part that makes these systems safe to actually run.",
    tag: "Governance",
    status: "Planned",
    answers: "Will AI replace dispatchers and office staff at a trade business?",
  },
  {
    title: "The Five Biggest AI Mistakes Trade Businesses Make",
    dek: "The recurring failure patterns we see in the field — buying the tool before naming the leak chief among them — and the smallest fix for each.",
    tag: "Method",
    status: "Planned",
    answers: "What goes wrong when a small business adopts AI tools on its own?",
  },
  {
    title: "Discovery & Trust in the Age of AI Search",
    dek: "How answer engines decide what to say about your business, why that description is now a business asset, and the AI-readable structure checklist.",
    tag: "Discovery & Trust",
    status: "In development",
    answers: "How do you get an AI assistant to describe your business accurately?",
  },
  {
    title: "What Good AI Onboarding Looks Like",
    dek: "The implementation playbook in plain English: what happens in week one, who needs to be in the room, and what you should refuse to sign.",
    tag: "Method",
    status: "Planned",
    answers: "What should an AI implementation engagement actually involve?",
  },
  {
    title: "Livingry Case Study: A Founding Five Implementation",
    dek: "One implementation documented end to end — the leak, the system, the baseline, and the measured result. Publishing only once a Founding Five client has verified evidence we are permitted to show.",
    tag: "Proof",
    status: "Evidence pending",
    answers: "What measurable result has a Livingry implementation actually produced?",
  },
];

const statusStyle: Record<PillarStatus, string> = {
  Published: "pill-active",
  "In development": "pill-next",
  Planned: "pill-future",
  "Evidence pending": "pill-future",
};

const publishedOn = new Date(`${aiForHvacCompanies.published}T00:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function Insights() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }];

  // CollectionPage + ItemList describe the hub's contents. Only the published
  // guide carries a url; the planned entries stay bare names, because marking an
  // unwritten piece as a work with an address is the fabrication this hub exists
  // to avoid. The Article schema itself lives on the article route.
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.primaryDomain}/insights#collection`,
    url: `${site.primaryDomain}/insights`,
    name: "Livingry Insights",
    description:
      "The editorial programme for Livingry Services: seven field guides on AI general contracting for trade and professional practices, published as each one can be written from real implementation evidence.",
    isPartOf: { "@id": `${site.primaryDomain}/#website` },
    publisher: { "@id": `${site.primaryDomain}/#organization` },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      name: "Pillar field guides",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: pillars.length,
      itemListElement: pillars.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        description: p.dek,
        ...(p.href ? { url: `${site.primaryDomain}${p.href}` } : {}),
      })),
    },
  };

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={collectionLd} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Insights"
        title="Field guides on AI general contracting."
        lede="Livingry Insights is a working editorial programme, not a blog archive. Seven guides on what AI actually does inside a trade or professional practice — each published only when it can be written from real implementation evidence rather than vendor marketing. The first one is live."
        primaryCta={{ label: "Book a Free System Review", href: "/system-review" }}
        secondaryCta={{ label: "Take the 10-Minute Leak Assessment", href: "/assessment" }}
      />

      <section className="section-tight" aria-labelledby="published-heading">
        <div className="container">
          <div className="rule-label">Published</div>
          <h2 id="published-heading" className="sr-only">
            Published field guides
          </h2>
          <article className="card grid gap-8 lg:grid-cols-12 items-start" style={{ padding: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            <div className="lg:col-span-5">
              <Link href={aiForHvacCompanies.path} tabIndex={-1} aria-hidden>
                <IllustrativeImage
                  base="insights/ai-for-hvac-companies-hero"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 460px, 100vw"
                  alt=""
                  style={{ borderRadius: "6px", border: "1px solid var(--rule)" }}
                />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{aiForHvacCompanies.category}</span>
                <span className="pill pill-active">Published</span>
              </div>
              <h3 className="serif mt-4" style={{ fontSize: "var(--step-3)", lineHeight: 1.1 }}>
                <Link href={aiForHvacCompanies.path} className="hover:text-forest">
                  {aiForHvacCompanies.title}
                </Link>
              </h3>
              <p className="mt-4" style={{ color: "var(--ink-2)" }}>
                {aiForHvacCompanies.excerpt}
              </p>
              <p className="mt-4 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
                <time dateTime={aiForHvacCompanies.published}>{publishedOn}</time> ·{" "}
                {aiForHvacCompanies.words.toLocaleString("en-US")} words · Tool-agnostic, fully cited
              </p>
              <Link href={aiForHvacCompanies.path} className="btn btn-primary mt-6">
                Read the field guide <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-tight">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">Why this hub exists</div>
            <h2 className="serif">Most &ldquo;AI for business&rdquo; writing is a vendor pitch.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              An owner researching AI for an HVAC company, a roofing crew, or a professional practice mostly finds two things: software marketing, and listicles written by people who have never stood in a dispatch office. Neither helps you decide anything.
            </p>
            <p className="mt-4" style={{ color: "var(--ink-2)" }}>
              These guides are the opposite. Each one is tool-agnostic, names its own boundaries, and is written from work we have actually done. That is also why they are dated by readiness rather than by a publishing calendar — we would rather publish fewer honest guides than pad the list to hit a number.
            </p>
            <p className="mt-4 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
              One guide is published so far. Statuses below are the real state of each piece — the six without a link
              are not written yet.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roadmap-heading">
        <div className="container">
          <div className="rule-label">The roadmap · seven pillar guides</div>
          <h2 id="roadmap-heading" className="serif max-w-3xl">What we are writing, and the question each one answers.</h2>
          <ol className="mt-10 grid gap-0">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-4 lg:grid-cols-12 py-8"
                style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
              >
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-3">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eyebrow">{p.tag}</span>
                  </div>
                  <span className={`pill ${statusStyle[p.status]} mt-3 inline-block`}>{p.status}</span>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="serif" style={{ fontSize: "var(--step-2)" }}>
                    {p.href ? (
                      <Link href={p.href} className="hover:text-forest">{p.title}</Link>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-3 max-w-2xl" style={{ color: "var(--ink-2)" }}>{p.dek}</p>
                  <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-3)" }}>
                    <span className="eyebrow" style={{ color: "var(--copper-2)" }}>Answers</span>
                    <span className="block mt-1.5">{p.answers}</span>
                  </p>
                </div>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </ol>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rule-label">In the meantime</div>
            <h2 className="serif">The material these guides are drawn from is already on the site.</h2>
          </div>
          <div className="lg:col-span-7">
            <p style={{ color: "var(--ink-2)" }}>
              You do not have to wait for the writing to get the substance. The framework, the seven system families, and the boundaries are all documented now.
            </p>
            <ul className="mt-6 grid gap-3">
              <li><Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>The Livingry Leakproofing Framework — the five-step method →</Link></li>
              <li><Link href="/what-we-build" className="link" style={{ color: "var(--forest)" }}>What we build — the seven system families →</Link></li>
              <li><Link href="/systems/discovery-and-trust" className="link" style={{ color: "var(--forest)" }}>Discovery &amp; Trust — being described accurately by AI →</Link></li>
              <li><Link href="/industries/hvac" className="link" style={{ color: "var(--forest)" }}>AI systems for HVAC companies →</Link></li>
              <li><Link href="/faq" className="link" style={{ color: "var(--forest)" }}>FAQ — boundaries, pricing, ownership, and exit →</Link></li>
              <li><Link href="/agents" className="link" style={{ color: "var(--forest)" }}>For AI agents — canonical facts about this practice →</Link></li>
            </ul>
            <p className="mt-8 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
              There is no mailing list to join — we have not connected an email provider, and we would rather say so than collect addresses we cannot yet use. The System Review form is the way to reach us.
            </p>
          </div>
        </div>
      </section>

      <EndCta
        title="Would you rather have the review than the reading?"
        primary={{ label: "Book a Free System Review", href: "/system-review" }}
        secondary={{ label: "Take the 10-Minute Leak Assessment", href: "/assessment" }}
      />
    </>
  );
}
