// Single source of truth for the upgraded /industries/hvac conversion funnel.
//
// Implements the Livingry HVAC Funnel Upgrade ticket (Cosmos Deployment
// Ticket): a Hook -> Story -> Mechanism -> Offer sequence that positions
// Livingry as a Revenue Continuity System for established HVAC/R companies,
// with the $799 HVAC Revenue Continuity Blueprint as the primary paid
// front-end offer.
//
// Positioning rules enforced here and in tests/hvac-funnel-content.test.ts:
// - No fake proof, fake scarcity, unsupported guarantees, or invented results.
// - Messaging stays aligned to Revenue Continuity, not generic AI consulting.
// - Human-approval and existing-stack compatibility language is preserved.
// - Estimate Recovery is framed as an upcoming implementation module in
//   development, NOT a shipped tool, NOT integrated with named CRMs yet.
// - The "more than 30%" statement is always Michael's estimate of unrealized
//   productive capacity from his own contracting experience — never audited
//   revenue, a client result, or an HVAC benchmark.
// - The Clarity Promise is the only risk-reversal published now; the stronger
//   revenue/opportunity guarantee is NOT published.
// - No unsupported timeline-to-results claims (e.g. "first month", "month three").
// - All primary CTAs route to the Blueprint application flow.
//
// This module is intentionally self-contained. It does not mutate the shared
// ai-blueprint, revenue-continuity, or industry-content modules so the
// upgrade is rollback-safe: deleting src/app/industries/hvac/page.tsx and
// src/lib/hvac-funnel/content.ts restores the generic [slug] template.

import { site } from "@/lib/site";

export const HVAC_FUNNEL_ROUTE = "/industries/hvac";
export const HVAC_FUNNEL_URL = `${site.primaryDomain}${HVAC_FUNNEL_ROUTE}`;

// The Blueprint application flow. Every primary CTA on this page routes here.
// (The Founding Five application form lives at this anchor.)
export const BLUEPRINT_APPLY_HREF = "/hvac/founding-five#request-review";

export const HVAC_FUNNEL_EVENTS = {
  pageView: "hvac_funnel_page_view",
  primaryCtaClick: "hvac_funnel_primary_cta_click",
  secondaryCtaClick: "hvac_funnel_secondary_cta_click",
  blueprintSectionView: "hvac_funnel_blueprint_section_view",
  finalCtaClick: "hvac_funnel_final_cta_click",
} as const;

export type HvacFunnelEvent = (typeof HVAC_FUNNEL_EVENTS)[keyof typeof HVAC_FUNNEL_EVENTS];

export const seo = {
  title: "HVAC Revenue Continuity — Find the Leak Before You Buy More Traffic | Livingry",
  description:
    "Livingry helps established HVAC/R companies find where calls, estimates, past customers, referrals, and trust signals leak away — then maps human-controlled systems around the tools they already use. Start with the $799 HVAC Revenue Continuity Blueprint.",
  ogTitle: "You may not need more leads. You may need fewer leaks.",
  ogDescription:
    "Revenue Continuity Systems for established HVAC/R companies. The HVAC Revenue Continuity Blueprint maps where calls, estimates, past customers, referrals, and trust signals leak — then finds the leak worth repairing first.",
} as const;

// A direct, server-rendered answer placed near the top for humans and AI
// answer engines. Kept honest: no invented results, no shipped-tool claims.
export const directAnswer =
  "Livingry builds Revenue Continuity Systems for established U.S. HVAC/R companies. The first step is the $799 HVAC Revenue Continuity Blueprint: a fixed-scope diagnostic that maps how calls, estimates, past customers, referrals, and trust signals currently move through the business, identifies the highest-priority continuity gap, and lays out the next 90 days of corrective action. Human approval stays in place for consequential actions, and the system works around the CRM, phone, calendar, and dispatch stack the company already runs.";

// ---------------------------------------------------------------------------
// 1) HERO
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: "Revenue Continuity Systems for established HVAC/R companies",
  // H1 — verbatim from the ticket. Tests assert this exact string.
  headline: "You may not need more leads. You may need fewer leaks.",
  supportingLine: "Most HVAC companies don't have a lead problem. They have a follow-up problem.",
  subheadline:
    "Livingry helps established HVAC companies find where calls, estimates, past customers, referrals, and trust signals are leaking away—then map human-controlled systems around the tools they already use.",
  primaryCta: "Find My Largest Revenue Leak",
  secondaryCta: "See What the Blueprint Includes",
  trustStrip: [
    "Former contractor / HVAC-trained operator",
    "Human approval on consequential actions",
    "Works around your current operating stack",
    "Founding Five applications only",
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
  // Required story points, woven into the body below:
  // - Michael paid for leads and still lost them while he had tools in his hands.
  // - He was acting as technician, estimator, dispatcher, customer-service
  //   department, and follow-up system at the same time.
  // - The same thing happened after estimates went out: the estimate was sent,
  //   but nobody owned the next step.
  // - Reviews, referrals, photos, and reactivation opportunities were also
  //   lost between jobs.
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
  // Approved copy-block founder-story line.
  founderLine: "I know what it is like to pay for a lead and lose it before you can put the tools down.",
} as const;

// ---------------------------------------------------------------------------
// 3) FOUR-LEAK MECHANISM
// ---------------------------------------------------------------------------
// These are not four unrelated automations. They are one Revenue Continuity
// System. The longer eight-module capability list is intentionally NOT
// foregrounded here — additional capabilities move lower on the page.
export const fourLeaks = {
  headline: "Four handoffs decide whether paid opportunity becomes durable revenue.",
  framing: "These are not four unrelated automations. They are one Revenue Continuity System.",
  categoryLine: "This is not lead generation. It is Revenue Continuity.",
  leaks: [
    {
      name: "Missed Call Recovery",
      body: "A call goes unanswered while the team is on a job. The customer is already dialing the next company. A defined recovery path — not a pretend 'we were there' — keeps the opportunity alive.",
    },
    {
      name: "Estimate Follow-Up",
      body: "The estimate was sent. Nobody followed up. A calm, appropriate follow-through sequence turns unclosed estimates into a real decision moment instead of a quiet loss.",
    },
    {
      name: "Past-Customer Reactivation",
      body: "Satisfied customers disappear between service cycles. Relevant, opt-in reactivation gives them a reason to return, renew, and act — without spamming your best customers.",
    },
    {
      name: "Referral Automation",
      body: "Good outcomes do not become introductions. A timely, approved referral invitation after eligible completed jobs captures the word-of-mouth that already exists.",
    },
  ],
} as const;

// Additional implementation capabilities — kept LOWER on the page, not
// foregrounded in the four-leak mechanism (per ticket rule).
export const additionalCapabilities = {
  heading: "Additional implementation capabilities",
  subheading: "What we may build after the Blueprint",
  intro:
    "The Blueprint identifies which of these, if any, deserve to come next. They are implementation directions, not a checklist a single engagement completes.",
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
  // Approved copy-block human-control line (full form).
  humanControlLine:
    "The goal is not maximum AI. The goal is a calmer, more controllable operation in which capable people receive better information, open decisions stay visible, and consequential actions retain human approval.",
  // Required line-equivalent from the ticket.
  rooftopLine:
    "I do not remove the human from the loop. I work to keep the loop from breaking when the human is on a rooftop.",
} as const;

// ---------------------------------------------------------------------------
// 5) OFFER SECTION — THE HVAC REVENUE CONTINUITY BLUEPRINT
// ---------------------------------------------------------------------------
export const offer = {
  headline: "Before we build anything, we find the leak worth repairing first.",
  offerName: "The HVAC Revenue Continuity Blueprint",
  offerDescription:
    "A fixed-scope diagnostic for established HVAC/R companies that maps how calls, estimates, past customers, referrals, and discoverability / trust signals currently move through the business—then identifies the highest-priority continuity gap and the next 90 days of corrective action.",
  price: "$799",
  keyRules: [
    "The Blueprint is the primary paid front-end offer.",
    "It is clearly priced at $799.",
    "The language stays operational and concrete.",
  ],
  // Approved copy-block Blueprint offer line.
  offerLine:
    "The HVAC Revenue Continuity Blueprint maps how calls, estimates, past customers, referrals, and trust signals currently move through your business, then identifies the leak worth repairing first.",
  primaryCta: "Apply for the HVAC Revenue Continuity Blueprint — $799",
  secondaryCta: "See What the Blueprint Includes",
} as const;

// ---------------------------------------------------------------------------
// 6) DELIVERABLES / VALUE STACK
// ---------------------------------------------------------------------------
// Original Blueprint deliverables PLUS the two additions required by the
// ticket: Estimate Recovery Opportunity Scan and Agentic Search Visibility
// & Trust Audit.
export const deliverables = {
  heading: "Deliverables / Value Stack",
  items: [
    { name: "Revenue Continuity Mapping Intensive", body: "A structured mapping session of how calls, estimates, past customers, referrals, and trust signals currently move through the business." },
    { name: "Four-Leak Diagnostic", body: "A ranked view of where the four handoffs — missed calls, estimate follow-up, past-customer reactivation, and referrals — are leaking today." },
    { name: "Workflow Gap Map", body: "The specific handoffs, tools, and ownership gaps that let earned opportunity escape." },
    { name: "Opportunity and Impact Model", body: "An honest model of which gaps, if repaired, would recover the most already-earned opportunity — with stated assumptions, not audited revenue." },
    { name: "90-Day Repair Roadmap", body: "A prioritized sequence of the next 90 days of corrective action: what to address first, what it requires, and what has to be true for each step to work." },
    { name: "Existing-Stack Fit Review", body: "A review of how the recommended actions fit the CRM, phone, calendar, and dispatch stack the company already runs — working around it where practical." },
    { name: "Findings and Decision Call", body: "A live walkthrough of the findings so the owner can decide whether the report is worth acting on before anything is built." },
    { name: "First-Repair Action Brief", body: "A concrete brief for the first repair worth making, scoped so it can be executed with Livingry or with the company's own team." },
    // --- NEW deliverable (ticket requirement) ---
    { name: "Estimate Recovery Opportunity Scan", body: "A review of how open estimates are currently handled, where follow-up ownership breaks down, which estimate-aging patterns likely indicate recoverable opportunity, and whether Estimate Recovery should become the first implementation priority. Presented as a strategic diagnostic deliverable only — not a live app deployment." },
    // --- NEW deliverable (ticket requirement) ---
    { name: "Agentic Search Visibility & Trust Audit", body: "A review of the company's current website, service pages, trust signals, reviews, FAQs, discovery pages, and other elements that affect how AI-assisted search and answer engines can understand, describe, and recommend the company. Framed as a practical review of discoverability, clarity, and trust presentation — not vague AI jargon, and not a promise of rankings or guaranteed visibility outcomes." },
  ],
  // New deliverable definitions, surfaced explicitly so tests can assert them.
  newDeliverables: {
    estimateRecoveryScan: {
      name: "Estimate Recovery Opportunity Scan",
      definition:
        "A review of how open estimates are currently handled, where follow-up ownership breaks down, which estimate-aging patterns likely indicate recoverable opportunity, and whether Estimate Recovery should become the first implementation priority.",
      positioningRule: "Presented as a strategic diagnostic deliverable only, not as a live app deployment.",
    },
    agenticSearchAudit: {
      name: "Agentic Search Visibility & Trust Audit",
      definition:
        "A review of the company's current website, service pages, trust signals, reviews, FAQs, discovery pages, and other website elements that affect how AI-assisted search and answer engines can understand, describe, and recommend the company.",
      framingRule:
        "Framed as a practical review of discoverability, clarity, and trust presentation — not vague AI jargon, and not a promise of rankings or guaranteed visibility outcomes.",
    },
  },
  valueStackNotes: [
    "Anchor values may be shown.",
    "If shown, anchor values are labeled as proposed standalone anchors, not market-verified retail prices.",
    "The investment reveal remains $799.",
  ],
} as const;

// ---------------------------------------------------------------------------
// 7) RISK REVERSAL — THE BLUEPRINT CLARITY PROMISE ONLY
// ---------------------------------------------------------------------------
// Publish ONLY the Clarity Promise now. The stronger revenue / opportunity
// guarantee is NOT published unless separately approved.
export const riskReversal = {
  heading: "The Blueprint Clarity Promise",
  body: "If Livingry cannot deliver a documented current-state map, a ranked opportunity list, stated assumptions, and a practical 90-day roadmap from the information provided, the Blueprint fee is refunded.",
  ruleNote:
    "This is a clarity promise, not a revenue or opportunity guarantee. No stronger guarantee is published unless separately approved.",
} as const;

// ---------------------------------------------------------------------------
// 8) FOUNDING FIVE SCARCITY
// ---------------------------------------------------------------------------
// Scarcity must be real and manually maintained. No fake countdown timers,
// no evergreen urgency resets, no unsupported "only X left" claims. If
// availability is not actively maintained, use application-open language.
export const foundingFive = {
  headline: "Five companies. Founder-led diagnostics. One system improved through real operating conditions.",
  // Application-open language is the safe default; an availability count is
  // only rendered if an accurate number is supplied at render time.
  applicationOpenNote:
    "Applications are open for a limited number of Founding Five engagements. Availability is real and manually maintained — there are no countdown timers and no evergreen urgency resets.",
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
    "Existing inbound calls, estimates, customer records, and referral opportunities",
    "Owner or senior operator willing to participate in the mapping session",
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
// 10) HOW IT WORKS — simple 5-step process
// ---------------------------------------------------------------------------
export const howItWorks = {
  heading: "How it works",
  steps: [
    { name: "Apply", body: "Submit the Blueprint application. Livingry reviews it for fit and replies with an honest answer." },
    { name: "Map", body: "A structured mapping session documents how calls, estimates, past customers, referrals, and trust signals actually move through the business today." },
    { name: "Diagnose", body: "The four-leak diagnostic and opportunity model rank where the highest-priority continuity gap sits." },
    { name: "Decide", body: "A findings and decision call walks the owner through the map, the ranked opportunities, and the 90-day repair roadmap." },
    { name: "Implement by evidence", body: "The first repair is made first — by Livingry or by the company's own team — and subsequent work follows the roadmap, not a template." },
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
    "Sample Blueprint pages clearly labeled as sample, fictional, or anonymized",
    "A demonstration-oriented description of the upcoming Estimate Recovery direction",
    "Ethical boundaries and human-approval language",
  ],
  notAllowed: [
    "Fabricated testimonials",
    "Composite case studies presented as real",
    "Unverified ROI claims",
    "Unsupported timeline claims",
    "Language implying the upcoming Estimate Recovery tool is already deployed",
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
    a: "No. The Revenue Continuity System is about follow-through — missed calls, estimates, past customers, and referrals — operated as one system with human approval on consequential actions. AI may classify, summarize, draft, and route inside those workflows; people approve everything that reaches a customer as a commitment.",
  },
  {
    q: "Why pay for a diagnostic before implementation?",
    a: "Because no good general contractor starts swinging hammers without a walkthrough and an estimate. The Blueprint is the walkthrough and the estimate: it maps your workflows, ranks the highest-priority continuity gap, and scopes the next 90 days of corrective action before anything is built.",
  },
  {
    q: "Can we use the plan without hiring Livingry?",
    a: "Yes. The Blueprint findings report is specific enough to execute with any implementation partner, including your own team. If you do proceed with Livingry within four weeks, the $799 credits in full toward the work.",
  },
  {
    q: "What happens if Livingry is not a fit?",
    a: "You keep the report and the roadmap. The Blueprint Clarity Promise applies: if Livingry cannot deliver a documented current-state map, ranked opportunity list, stated assumptions, and a practical 90-day roadmap from the information provided, the Blueprint fee is refunded.",
  },
  {
    // NEW FAQ required by the ticket.
    q: "Is the Estimate Recovery tool included right now?",
    a: "Not as a live software deployment yet. The Blueprint includes an Estimate Recovery Opportunity Scan so the company can see whether that leak deserves repair first, and Founding Five companies may be considered for early deployment once the implementation module is completed.",
  },
];

// ---------------------------------------------------------------------------
// 13) FINAL CTA
// ---------------------------------------------------------------------------
export const finalCta = {
  headline: "Find the leak before you buy more traffic.",
  primaryCta: "Apply for the HVAC Revenue Continuity Blueprint — $799",
  microcopy:
    "Application-based. Founding Five capacity is limited. Completing the application does not obligate either party to proceed.",
} as const;

// ---------------------------------------------------------------------------
// ESTIMATE RECOVERY POSITIONING (upcoming module, NOT a shipped tool)
// ---------------------------------------------------------------------------
export const estimateRecoveryPositioning = {
  heading: "Estimate Recovery: the first module in development",
  // Approved positioning line.
  prePositioningLine:
    "Estimate Recovery is the first implementation module Livingry is developing beyond the Blueprint. For now, the Blueprint includes an Estimate Recovery Opportunity Scan to determine whether that leak deserves repair first.",
  approvedPositioning:
    "Estimate Recovery is the first implementation module Livingry is developing beyond the Blueprint. It is being positioned as a narrow, HVAC-native, vendor-agnostic recovery layer that drafts contextual follow-up for open estimates, escalates sensitive replies to humans, and is designed to support proof from original opportunity to paid invoice.",
  importantRestrictions: [
    "Do not say it is already shipped.",
    "Do not say it is integrated with ServiceTitan, Housecall Pro, Jobber, or other systems yet.",
    "Do not describe it as a client-facing deliverable already included beyond the strategic diagnostic review.",
    "Do not claim 'first' or 'only' in the market.",
  ],
  // Suggested lower-page treatment labels — one modest block is used.
  suggestedTreatments: [
    "What implementation may look like after the Blueprint",
    "The first repair we may build",
    "Estimate Recovery: the first module in development",
  ],
} as const;

// ---------------------------------------------------------------------------
// AGENTIC-SEARCH AUDIT POSITIONING
// ---------------------------------------------------------------------------
export const agenticSearchPositioning = {
  // Approved copy-block agentic-search line.
  agenticSearchLine:
    "The Blueprint also includes an Agentic Search Visibility & Trust Audit so the owner can see whether the current website is easy for answer engines and trust-sensitive buyers to understand.",
  whatThisMeans:
    "The Blueprint states that Livingry reviews how the company currently appears to AI-assisted search tools, answer engines, trust-sensitive discovery experiences, and customers evaluating website clarity and credibility.",
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
    "Framed as an included audit / assessment deliverable — not a promise of rankings or guaranteed visibility outcomes.",
} as const;

// ---------------------------------------------------------------------------
// Recommended application fields (ticket). These describe the Blueprint
// application flow the primary CTAs route to. The actual form is the existing
// Founding Five application at /hvac/founding-five#request-review.
// ---------------------------------------------------------------------------
export const applicationFields = [
  "Company name",
  "Owner / operator name",
  "Email",
  "Mobile phone",
  "Service area",
  "Truck count",
  "Current CRM / FSM",
  "Biggest leak (missed calls / estimates / past customers / referrals / other)",
  "Approximate monthly inbound opportunity volume",
  "Willingness to participate in mapping session",
] as const;

// ---------------------------------------------------------------------------
// Structured-data builders (pure functions so they can be unit-tested).
// ---------------------------------------------------------------------------
export function buildHvacFunnelServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "HVAC Revenue Continuity Blueprint",
    serviceType: "Revenue Continuity System diagnostic for established HVAC/R companies",
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
      name: "HVAC Revenue Continuity Blueprint",
      price: "799",
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