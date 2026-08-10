// Single source of truth for the /industries/hvac conversion funnel.
//
// Implements a consolidated founding-funnel sequence: a Hook -> Story ->
// Mechanism -> Offer sequence that routes every visitor into the Founding
// Five Tier 2 Pilot funnel — the site's ONE offer — through the Revenue Leak
// Scorecard at /hvac/founding-five#scorecard.
//
// Positioning rules enforced here and in tests/hvac-funnel-content.test.ts:
// - No fake proof, fake scarcity, unsupported guarantees, or invented results.
// - The Founding Five Tier 2 Pilot is $2,500 all-in and always visible.
//   Included: $199 Revenue Continuity Assessment, $497 Livingry Ops Tenant
//   Integration ($649 bundled / $696 separate value), Missed-Call Recovery,
//   Dropped-Estimate Recovery, Agentic Search Optimization, plus onboarding,
//   training, integration, and setup. Tier 1 value is included, never
//   credited or added.
// - Client Reactivation is the first a-la-carte upgrade, not an included
//   workflow. The next 16 clients are priced higher by scope.
// - No outcome guarantees of any kind. The $10,000 threshold / $4,000
//   retroactive Tier 3 language is used verbatim from the canonical terms.
// - All primary CTAs route to the Founding Five scorecard flow.
// - Estimate Recovery follow-up is a live pilot foundation; no shipped-tool
//   claims beyond that.
//
// This module is intentionally self-contained. It does not mutate the shared
// ai-blueprint, revenue-continuity, or industry-content modules so the
// upgrade is rollback-safe: deleting src/app/industries/hvac/page.tsx and
// src/lib/hvac-funnel/content.ts restores the generic [slug] template.

import { site } from "@/lib/site";

export const HVAC_FUNNEL_ROUTE = "/industries/hvac";
export const HVAC_FUNNEL_URL = `${site.primaryDomain}${HVAC_FUNNEL_ROUTE}`;

// The Founding Five scorecard flow — the ONE sitewide intake. Every primary
// CTA on this page routes here.
export const BLUEPRINT_APPLY_HREF = "/hvac/founding-five#scorecard";

export const HVAC_FUNNEL_EVENTS = {
  pageView: "hvac_funnel_page_view",
  primaryCtaClick: "hvac_funnel_primary_cta_click",
  secondaryCtaClick: "hvac_funnel_secondary_cta_click",
  blueprintSectionView: "hvac_funnel_blueprint_section_view",
  finalCtaClick: "hvac_funnel_final_cta_click",
} as const;

export type HvacFunnelEvent = (typeof HVAC_FUNNEL_EVENTS)[keyof typeof HVAC_FUNNEL_EVENTS];

export const seo = {
  title: "HVAC Revenue Continuity — Founding Five Tier 2 Pilot, $2,500 All-In | Livingry",
  description:
    "Livingry helps established HVAC/R companies find where calls, estimates, and search answers leak away — then runs the three foundations that seal them. The Founding Five Tier 2 Pilot is $2,500 all-in for five HVAC/R companies. Human-reviewed before any follow-up.",
  ogTitle: "You may not need more leads. You may need fewer leaks.",
  ogDescription:
    "The Founding Five Tier 2 Pilot, $2,500 all-in: Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization, with the $199 Assessment and $497 Tenant Integration included. Five HVAC/R companies.",
} as const;

// A direct, server-rendered answer placed near the top for humans and AI
// answer engines. Kept honest: no invented results, no outcome guarantees.
export const directAnswer =
  "Livingry builds Revenue Continuity Systems for established U.S. HVAC/R companies. The Founding Five Tier 2 Pilot is $2,500 all-in: Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization, including the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration, and onboarding and setup. Human approval stays in place for consequential actions, and the system works around the CRM, phone, calendar, and dispatch stack the company already runs.";

// ---------------------------------------------------------------------------
// 1) HERO
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: "Founding Five Tier 2 Pilot for established HVAC/R companies",
  // H1 — verbatim from the ticket. Tests assert this exact string.
  headline: "You may not need more leads. You may need fewer leaks.",
  supportingLine: "Most HVAC companies don't have a lead problem. They have a follow-up problem.",
  subheadline:
    "Livingry runs the three foundations that keep the demand you already pay for from leaking — missed calls, dropped estimates, and the search answers your customers get from competitors — at a single all-in pilot price, with human approval on every consequential action.",
  primaryCta: "Take the 15-Minute Revenue Leak Scorecard",
  secondaryCta: "See the Founding Five Path",
  trustStrip: [
    "Founding Five Tier 2 Pilot — $2,500 all-in",
    "Former contractor / HVAC-trained operator",
    "Human approval on consequential actions",
    "Works around your current operating stack",
  ],
  rules: {
    oneDominantCta: true,
    reduceCompetingLinksAboveFold: true,
    focusOnLeakProblem: true,
  },
} as const;

// ---------------------------------------------------------------------------
// 2) FOUNDER STORY / EPIPHANY BRIDGE
// ---------------------------------------------------------------------------
// Michael's field stories are valid founder proof. They are NOT client case
// studies, audited revenue claims, or industry benchmarks. The "more than
// 30%" statement is always framed as Michael's estimate of unrealized
// productive capacity from his own contracting experience.
export const founderStory = {
  headline: "I was busy. The opportunities were still escaping.",
  body: [
    "I know what it is like to pay for a lead and lose it before you can put the tools down. For years I ran as a solo residential contractor — technician, estimator, dispatcher, customer-service department, and follow-up system, all at the same time, often on the same roof.",
    "The same thing happened after every estimate went out. The estimate was sent. Then nobody owned the next step. The reviews, the referrals, the before-and-after photos, the reactivation of past customers — all of it fell between jobs, because the technical work had an owner and the handoffs did not.",
    "In my own operation I estimate I realized less than 30% of my productive capacity — not as an audited revenue figure, not as a client result, and not as an HVAC industry benchmark. It is my own estimate of the unrealized productive capacity I watched escape while I was busy doing the work.",
  ],
  // The epiphany line, verbatim from the ticket.
  epiphany: "The technical work had an owner. The handoffs did not.",
  // Boundary note — required wherever the 30% estimate appears.
  boundaryNote:
    "Michael's field stories are founder proof. They are not client case studies, audited revenue claims, or industry benchmarks. The 'more than 30%' figure is Michael's estimate of unrealized productive capacity from his own contracting experience.",
  founderLine: "I know what it is like to pay for a lead and lose it before you can put the tools down.",
} as const;

// ---------------------------------------------------------------------------
// 3) MECHANISM — the pilot's three foundations + the first upgrade
// ---------------------------------------------------------------------------
// These are not three unrelated automations. They are one Revenue Continuity
// System. Client Reactivation is explicitly the first a-la-carte upgrade.
export const fourLeaks = {
  headline: "Three foundations decide whether paid opportunity becomes durable revenue.",
  framing: "These are not three unrelated automations. They are one Revenue Continuity System.",
  categoryLine: "This is not lead generation. It is Revenue Continuity.",
  leaks: [
    {
      name: "Missed-Call Recovery",
      body: "A call goes unanswered while the team is on a job. The customer is already dialing the next company. A defined recovery path — not a pretend 'we were there' — keeps the opportunity alive.",
    },
    {
      name: "Dropped-Estimate Recovery",
      body: "The estimate was sent. Nobody followed up. A calm, appropriate follow-through sequence turns unclosed estimates into a real decision moment instead of a quiet loss.",
    },
    {
      name: "Agentic Search Optimization",
      body: "Your customers ask the search engine a question and get a competitor's answer. The pilot operates the answers, listings, and knowledge signals your business has earned the right to hold — without promising rankings.",
    },
    {
      name: "Client Reactivation — the first upgrade",
      body: "Satisfied customers disappear between service cycles. Reactivation is NOT included in the pilot; it is the first a-la-carte upgrade available after the three foundations are live.",
    },
  ],
} as const;

// Additional implementation capabilities — kept LOWER on the page, not
// foregrounded in the mechanism.
export const additionalCapabilities = {
  heading: "Additional implementation capabilities",
  subheading: "What implementation may include after the pilot",
  intro:
    "The pilot identifies which of these, if any, deserve to come next. They are implementation directions, not a checklist a single pilot completes.",
  items: [
    "Speed-to-lead workflows for web, phone, and referral inquiries",
    "Maintenance and membership continuity",
    "System replacement education and financing FAQs",
    "Service-area and emergency routing",
    "Website inquiry qualification and CRM handoff",
    "Booked-job handoff continuity (scope, notes, photos, approvals)",
    "Technician knowledge retrieval with source visibility",
  ],
} as const;

// ---------------------------------------------------------------------------
// 4) HUMAN-CONTROL / CALM-OPERATIONS SECTION
// ---------------------------------------------------------------------------
export const humanControl = {
  headline: "Quiet systems. Human judgment. Fewer dropped handoffs.",
  ideas: [
    "The goal is not 'maximum AI.'",
    "The goal is a calmer, more controllable operation.",
    "Useful systems help the team receive better information, keep open decisions visible, and preserve human approval.",
    "Livingry works around the existing CRM, phone, calendar, and dispatch stack where practical.",
  ],
  humanControlLine:
    "The goal is not maximum AI. The goal is a calmer, more controllable operation in which capable people receive better information, open decisions stay visible, and consequential actions retain human approval.",
  rooftopLine:
    "I do not remove the human from the loop. I work to keep the loop from breaking when the human is on a rooftop.",
} as const;

// ---------------------------------------------------------------------------
// 5) OFFER SECTION — THE FOUNDING FIVE TIER 2 PILOT
// ---------------------------------------------------------------------------
export const offer = {
  headline: "Before you buy more traffic, seal the leaks you already pay for.",
  offerName: "The Founding Five Tier 2 Pilot",
  offerDescription:
    "A $2,500 all-in pilot for five HVAC/R companies: Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization — including the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration ($649 bundled / $696 separate value), and onboarding, training, integration, and setup. Tier 1 value is included, not credited and not added.",
  price: "$2,500 all-in",
  keyRules: [
    "The Founding Five Tier 2 Pilot is the primary offer — always visible, never gated.",
    "It is clearly priced at $2,500 all-in.",
    "The next 16 clients after the Founding Five are priced higher, by scope.",
    "The language stays operational and concrete.",
  ],
  offerLine:
    "The pilot maps how calls, estimates, and search answers currently move through your business, then runs the three foundations that recover them — measured against a shared proof ledger.",
  primaryCta: "Take the 15-Minute Revenue Leak Scorecard",
  secondaryCta: "See the pilot deliverables",
} as const;

// ---------------------------------------------------------------------------
// 6) DELIVERABLES / VALUE STACK
// ---------------------------------------------------------------------------
export const deliverables = {
  heading: "Deliverables / Value Stack",
  title: "What the pilot includes.",
  items: [
    { name: "Revenue Continuity Assessment ($199, included)", body: "A fixed-scope diagnostic and live walkthrough of how calls, estimates, and search answers currently move through the business, presented live with the findings." },
    { name: "Livingry Ops Tenant Integration ($497, included)", body: "Your company's private tenant inside Livingry Ops — workflows, ledger, exception desk, and integration layer configured around the tools you already run." },
    { name: "Missed-Call Recovery", body: "Capture, classify, route, time-limit, escalate, and log every eligible inbound call, with human approval on every consequential action." },
    { name: "Dropped-Estimate Recovery", body: "Identify eligible open estimates and execute the approved follow-up cadence with recorded dispositions — validated on test records before touching production data." },
    { name: "Agentic Search Optimization", body: "Operate the answers, listings, and knowledge signals your market asks search engines for, so the demand you already pay for stops routing to competitors. An audit of discoverability and trust presentation — not a promise of rankings." },
    { name: "Shared Proof Ledger", body: "Every recovered dollar measured against a written Recovery Ledger with source-record links, reconciled weekly." },
    { name: "Onboarding, Training, Integration, and Setup", body: "Staff orientation, human-control and exception rules, and full documentation handoff — inside the $2,500 price, never added to it." },
    { name: "Weekly Executive Scorecard", body: "Delivered every Friday, with a weekly 30-minute pilot review with your operating owner." },
  ],
  newDeliverables: {
    estimateRecoveryScan: {
      name: "Dropped-Estimate Recovery (pilot foundation)",
      definition:
        "A review of how open estimates are currently handled, where follow-up ownership breaks down, and which estimate-aging patterns indicate recoverable opportunity — then the approved follow-up cadence runs on eligible open estimates with recorded dispositions.",
      positioningRule: "Presented as an operational pilot foundation with human approval and recorded dispositions — not an unsupervised automation.",
    },
    agenticSearchAudit: {
      name: "Agentic Search Optimization (pilot foundation)",
      definition:
        "A review of the company's current website, service pages, trust signals, reviews, FAQs, and discovery pages, then ongoing operation of the answers and knowledge signals that shape how AI-assisted search describes and recommends the company.",
      framingRule:
        "Framed as operating discoverability, clarity, and trust presentation — not a promise of rankings or guaranteed visibility outcomes.",
    },
  },
  valueStackNotes: [
    "The pilot price is $2,500 all-in and always visible.",
    "Tier 1 value (Assessment + Tenant Integration) is included, not credited and not added.",
    "The next 16 clients after the Founding Five are priced higher, by scope.",
  ],
} as const;

// ---------------------------------------------------------------------------
// 7) NO OUTCOME GUARANTEES — the honest risk section
// ---------------------------------------------------------------------------
export const riskReversal = {
  heading: "Outcome guarantees? No. A measured system? Yes.",
  body: "Livingry does not guarantee revenue, lead volume, close rates, reviews, or rankings — for any tier, at any price. The written Recovery Ledger verifies what actually gets collected, and it is the only basis for threshold-based billing. Tier 3, if added, is $1,000/week: the first four weekly cycles are delivered unpaid, and a retroactive bill of the accrued four weeks plus a $4,000 related fee is issued only after the ledger verifies $10,000 in qualifying documented collected recovery within those cycles.",
  ruleNote:
    "No fee-waiver promise exists in this funnel. The Recovery Ledger, not a promise, is what any continuation decision is made from.",
} as const;

// ---------------------------------------------------------------------------
// 8) FOUNDING FIVE SCARCITY
// ---------------------------------------------------------------------------
// Scarcity must be real and manually maintained. No fake countdown timers,
// no evergreen urgency resets, no unsupported "only X left" claims.
export const foundingFive = {
  headline: "Five companies. One all-in price. A measured system.",
  applicationOpenNote:
    "The Founding Five cohort is exactly five HVAC/R companies at $2,500 all-in. Availability is real and manually maintained — there are no countdown timers and no evergreen urgency resets. After the cohort, the next 16 clients are priced higher, by scope.",
  rules: [
    "Scarcity must be real and manually maintained.",
    "If an availability count is shown, it must be accurate.",
    "If availability is not actively maintained, application-open language is used instead.",
  ],
  neverUse: [
    "Fake countdown timers",
    "Evergreen urgency resets",
    "Unsupported 'only X left' claims",
  ],
} as const;

// ---------------------------------------------------------------------------
// 9) QUALIFICATION
// ---------------------------------------------------------------------------
export const qualification = {
  headline: "This is designed for an established operation—not a company searching for its first customers.",
  strongFit: [
    "U.S.-based HVAC/R company",
    "Typically 3–12 trucks",
    "Existing inbound calls, estimates, customer records, and search reach",
    "Owner or senior operator willing to participate in the scorecard and fit conversation",
    "Enough operating history to examine real handoffs",
    "Desire for a calmer, owner-controlled company",
    "Commitment to human approval on consequential actions",
  ],
  weakFit: [
    "No meaningful current opportunity flow",
    "Wants guaranteed revenue without participation",
    "Wants unsupervised systems making consequential commitments",
    "Unwilling to provide the required information",
    "Wants 'AI' for appearance rather than operational outcome",
  ],
} as const;

// ---------------------------------------------------------------------------
// 10) HOW IT WORKS — scorecard-to-ledger path
// ---------------------------------------------------------------------------
export const howItWorks = {
  heading: "How the Founding Five pilot works",
  steps: [
    { name: "Scorecard", body: "Fifteen minutes about your operation and the leaks that cost you the most. Every scorecard is reviewed by a person — no bot triage, no public calendar." },
    { name: "Human review and fit call", body: "A short call confirms authority, data access, volume, capacity, and your internal operator — before any promise is made." },
    { name: "Assessment + Tenant Integration", body: "The included $199 Revenue Continuity Assessment maps how calls, estimates, and search answers move through the business; the included $497 Tenant Integration configures your private Livingry Ops tenant around the tools you already run." },
    { name: "Three-foundation launch", body: "Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization go live — validated on test records before touching production data." },
    { name: "Ledger and weekly review", body: "Every recovered dollar is reconciled against the written Recovery Ledger, with weekly scorecards and a weekly 30-minute review with your operating owner." },
  ],
} as const;

// ---------------------------------------------------------------------------
// 11) PROOF ARCHITECTURE — an honest proof ladder
// ---------------------------------------------------------------------------
export const proofArchitecture = {
  heading: "Proof architecture",
  intro:
    "This funnel does not yet have verified client case studies, so the proof ladder is honest about what is and is not proven.",
  allowed: [
    "Michael's founder confession / contractor story",
    "Confirmed field and HVAC-adjacent experience, stated conservatively",
    "Personally funded testing of AI tools",
    "Sample pages clearly labeled as sample, fictional, or anonymized",
    "An operational description of the three included pilot foundations",
    "Ethical boundaries and human-approval language",
  ],
  notAllowed: [
    "Fabricated testimonials",
    "Composite case studies presented as real",
    "Unverified ROI claims",
    "Unsupported timeline claims",
    "Outcome guarantees of any kind",
  ],
} as const;

// ---------------------------------------------------------------------------
// 12) FAQ
// ---------------------------------------------------------------------------
export const faq: { q: string; a: string }[] = [
  {
    q: "Do we have to switch CRMs?",
    a: "No. Livingry works around the CRM, phone, calendar, and dispatch stack you already run, where practical. Your company remains the system of record for customers, estimates, jobs, invoices, pricing, and technical work.",
  },
  {
    q: "Is this an AI answering service?",
    a: "No. The pilot is about follow-through — missed calls, dropped estimates, and search readiness — operated as one system with human approval on consequential actions. AI may classify, summarize, draft, and route inside those workflows; people approve everything that reaches a customer as a commitment.",
  },
  {
    q: "What is the all-in price?",
    a: "The Founding Five Tier 2 Pilot is $2,500 all-in for five HVAC/R companies: the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration ($649 bundled / $696 separate value), Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization, plus onboarding, training, integration, and setup. Tier 1 value is included, not credited and not added.",
  },
  {
    q: "Is Client Reactivation included?",
    a: "No. The pilot's three foundations are Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization. Client Reactivation is the first a-la-carte upgrade once those foundations are live.",
  },
  {
    q: "Do you guarantee revenue?",
    a: "No. Livingry does not guarantee revenue, lead volume, close rates, reviews, or rankings — for any tier, at any price. The written Recovery Ledger verifies what actually gets collected, and it is the only basis for threshold-based billing.",
  },
  {
    q: "What is the next-16 distinction?",
    a: "The Founding Five is exactly five HVAC/R companies at the $2,500 all-in pilot price. The next 16 clients are priced higher, by scope.",
  },
  {
    q: "How does the $10,000 recovery threshold work?",
    a: "It applies only to Tier 3, which is optional at $1,000/week. The first four weekly cycles are delivered unpaid. A retroactive bill of the accrued four weeks plus a $4,000 related fee is issued only after the written Recovery Ledger verifies $10,000 in qualifying documented collected recovery within those cycles.",
  },
  {
    q: "What happens if Livingry is not a fit?",
    a: "You get a fast, honest answer rather than a slow maybe. Every scorecard is reviewed by a person, and no fee of any kind is charged before mutual fit is confirmed in writing.",
  },
];

// ---------------------------------------------------------------------------
// 13) FINAL CTA
// ---------------------------------------------------------------------------
export const finalCta = {
  headline: "Find the leak before you buy more traffic.",
  primaryCta: "Take the 15-Minute Revenue Leak Scorecard",
  microcopy:
    "Scorecard-based, human-reviewed, no public calendar. Founding Five capacity is exactly five companies. Submitting a scorecard does not obligate either party to proceed.",
} as const;

// ---------------------------------------------------------------------------
// FOLLOW-UP OPPORTUNITY POSITIONING (after the three foundations)
// ---------------------------------------------------------------------------
export const estimateRecoveryPositioning = {
  heading: "What implementation may look like after the pilot",
  prePositioningLine:
    "After Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization are live, Client Reactivation is the first a-la-carte upgrade — followed by referral continuity and the longer capability list below.",
  approvedPositioning:
    "Further upgrades — client reactivation, referral continuity, maintenance-and-membership continuity — are scoped and priced a la carte once the three pilot foundations are live. Nothing beyond the $2,500 all-in pilot price is ever assumed or silently added.",
  importantRestrictions: [
    "Do not present reactivation or referral continuity as included pilot workflows.",
    "Do not claim 'first' or 'only' in the market.",
    "Do not promise outcomes for upgrades.",
  ],
  suggestedTreatments: [
    "What implementation may look like after the pilot",
    "The first upgrades we may add",
    "After the three foundations: reactivation first",
  ],
} as const;

// ---------------------------------------------------------------------------
// AGENTIC-SEARCH POSITIONING — included pilot foundation, not a rankings promise
// ---------------------------------------------------------------------------
export const agenticSearchPositioning = {
  agenticSearchLine:
    "The pilot includes Agentic Search Optimization: operating the answers, listings, and knowledge signals that answer engines (AI-assisted search) use to describe and recommend the company.",
  whatThisMeans:
    "Livingry reviews and operates how the company appears to AI-assisted search tools, answer engines, trust-sensitive discovery experiences, and customers evaluating website clarity and credibility.",
  focusAreas: [
    "Service-page clarity",
    "FAQ coverage",
    "Structured trust signals",
    "Reviews / testimonials presence",
    "Before-and-after proof opportunities",
    "Discoverability gaps",
    "Whether the current site describes the company in a way that answer engines can interpret accurately",
  ],
  importantRule:
    "Framed as an included pilot foundation — not a promise of rankings or guaranteed visibility outcomes.",
} as const;

// ---------------------------------------------------------------------------
// Scorecard fields (the ONE sitewide intake).
// ---------------------------------------------------------------------------
// These describe the Revenue Leak Scorecard the primary CTAs route to. The
// actual form lives at /hvac/founding-five#scorecard and posts to the
// Founding Five pipeline.
export const applicationFields = [
  "Full name",
  "Work email",
  "Mobile phone",
  "Company name",
  "Role",
  "Primary city, state, and markets served",
  "Active field vehicles/teams",
  "Current FSM / CRM",
  "Top two leaks (missed calls / dropped estimates / search readiness / reactivation / other)",
  "Weekly calls + estimates volume",
  "Record readiness",
] as const;

// ---------------------------------------------------------------------------
// Structured-data builders (pure functions so they can be unit-tested).
// ---------------------------------------------------------------------------
export function buildHvacFunnelServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Founding Five Tier 2 Pilot — HVAC Revenue Continuity",
    serviceType: "Revenue Continuity System pilot for established HVAC/R companies",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Established HVAC/R companies",
    },
    description: seo.description,
    url: HVAC_FUNNEL_URL,
    offers: {
      "@type": "Offer",
      name: "Founding Five Tier 2 Pilot",
      price: "2500",
      priceCurrency: "USD",
      description: offer.offerDescription,
    },
  };
}

export function buildHvacFunnelFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildHvacFunnelBreadcrumbLd() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "HVAC", href: HVAC_FUNNEL_ROUTE },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.primaryDomain}${c.href}`,
    })),
  };
}