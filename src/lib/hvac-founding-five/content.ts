// Single source of truth for the Founding Five Tier 2 Pilot page copy, FAQ,
// structured data, and guardrails. Keeping copy here (rather than only inline
// in the page) lets the visible FAQ, the FAQPage JSON-LD, and the automated
// prohibited-claims tests all read from the same place.
//
// Canonical commercial terms (fixed — see /hvac/founding-five and docs):
// - Founding Five Tier 2 pilot: $2,500 all-in, ALWAYS visible.
// - Included: $199 Revenue Continuity Assessment, $497 Livingry Ops Tenant
//   Integration, $649 bundle / $696 separate value, Missed-Call Recovery,
//   Dropped-Estimate Recovery, Agentic Search Optimization, plus onboarding,
//   training, integration, and setup. Tier 1 value is included, never
//   credited or added.
// - Cohort: five HVAC/R companies, visibly labeled.
// - Next 16 clients: higher, scope-based pricing.
// - Tier 3 (optional): $1,000/week; first four weekly cycles delivered
//   unpaid; retroactive $4,000 only after a written Recovery Ledger verifies
//   $10,000 in qualifying documented collected recovery within those cycles.
// - Client Reactivation: first a-la-carte upgrade, not included.
// - No outcome guarantees of any kind; third-party costs separate.

import { site } from "@/lib/site";
import { founder as canonicalFounder, allianceFaq as canonicalFaq } from "@/lib/revenue-continuity/content";

export const HVAC_ROUTE = "/hvac/founding-five";
export const HVAC_URL = `${site.primaryDomain}${HVAC_ROUTE}`;
export const HVAC_SCORECARD_ANCHOR = `${HVAC_ROUTE}#scorecard`;

export const FOUNDING_FIVE_CAPACITY = 5;

// The central belief the funnel is built around. Stated plainly, used verbatim
// on the page and reused in tests so the wording cannot drift.
export const sealedSystemPrinciple = "A system that is unsealed cannot be scaled.";

export const seo = {
  title: "Founding Five Tier 2 Pilot — $2,500 All-In | Livingry Services",
  description:
    "Livingry's Founding Five Tier 2 Pilot: $2,500 all-in for Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization — including the $199 Revenue Continuity Assessment and $497 Livingry Ops Tenant Integration. Five HVAC/R companies. No outcome guarantees. Human-reviewed before any follow-up.",
  ogTitle: "Stop buying more leads before you seal the leaks.",
  ogDescription:
    "The Founding Five Tier 2 Pilot, $2,500 all-in, for five HVAC/R companies: missed calls, dropped estimates, and search readiness, run on a shared proof ledger with human approval where it matters.",
} as const;

// A direct, server-rendered 40–80 word answer placed near the top of the page
// for humans and AI systems. (Word count verified in tests.)
export const directAnswer =
  "The Founding Five is an invite-only HVAC/R pilot cohort of five companies. The Tier 2 pilot is $2,500 all-in: Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization, including the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration, and onboarding and setup. Every recovered dollar is measured against a shared proof ledger, and applications are human-reviewed before any follow-up.";

export const hero = {
  eyebrow: "Founding Five Strategic Alliance — Invite-Only HVAC/R Pilot Cohort",
  title: "Stop buying more leads before you seal the leaks.",
  intro:
    "Livingry runs the three follow-through foundations that keep the demand you already pay for from leaking: missed calls, dropped estimates, and rivals winning the search answers your customers ask for.",
  premise:
    "Missed calls. Dropped estimates. Customers who ask the wrong answer questions and never reach you. These are not five separate problems — they are one system leaking at three handoffs.",
  belief: sealedSystemPrinciple,
  body: "We do not sell a loose collection of AI tools. We install the connected follow-through system that keeps value from leaking out between the phone, the office, the estimate, and the search engine — measured against a shared proof ledger, with human approval on every consequential action.",
  proofStrip:
    "Calls. Estimates. Search readiness. Human-reviewed where judgment matters.",
  primaryCta: "Take the 15-Minute Revenue Leak Scorecard",
  secondaryAnchor: "See the Founding Five Path",
  noCalendarNote:
    "No public calendar. Every scorecard is human-reviewed; fit conversations follow only for qualified companies.",
} as const;

export const problem = {
  heading: "The problem is rarely “not enough leads.”",
  intro:
    "Most established HVAC companies already have phones, forms, field-service software, office procedures, and capable people. The leaks appear between them:",
  leaks: [
    "A caller reaches voicemail and receives no accountable next step — the demand dies before a qualified response.",
    "A valid estimate is sent, then worked inconsistently or not at all.",
    "Your customers ask the search engine a question and get a competitor's answer — because nobody operates the answers your business has earned the right to hold.",
    "A past customer who would have rebooked is never appropriately contacted again — the reactivation gap the pilot addresses first.",
  ],
  pullQuote:
    "If the next action depends on one person remembering, it is not yet a dependable workflow.",
} as const;

export const offer = {
  heading: "One pilot price. The three foundations that seal the leaks. Always together.",
  intro:
    "Every Founding Five Tier 2 pilot includes all three foundations. Implementation order may vary with your baseline, but no partner is sold one foundation as the complete pilot:",
  foundations: [
    "Missed-Call Recovery — capture, classify, route, time-limit, escalate, and log every eligible inbound call.",
    "Dropped-Estimate Recovery — identify eligible open estimates and execute the approved follow-up cadence with recorded dispositions.",
    "Agentic Search Optimization — operate the answers, listings, and knowledge signals your market asks search engines for, so the demand you already pay for stops routing to competitors.",
  ],
  includedPriceNote:
    "Every pilot also includes the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration ($649 bundled / $696 separate value), and onboarding, training, integration, and setup — all inside the $2,500 all-in price. Tier 1 value is included, not credited and not added.",
  reactivationUpgrade:
    "Client Reactivation is the first a-la-carte upgrade available after these three foundations are live — it is never silently sold as part of the pilot.",
  closer:
    "Booked-job handoffs and technician knowledge are implemented inside every pilot as operating scope — they are how the three foundations hold up in the field, not separate products.",
} as const;

// The seven-part diagnostic model. Plain operational names first; the short
// internal shorthand in parentheses. This is a MAP for locating a leak, not a
// checklist a single pilot completes — the disclaimer below is load-bearing and
// is asserted in tests.
export const leakproofingMap = {
  heading: "The seven-part leakproofing map",
  intro:
    "Earned value tends to leak at the same seams in most trade operations. This is the map Livingry uses to locate one: the seven layers a single request passes through, from first contact to close. Plain names first; the shorthand we use internally in parentheses.",
  layers: [
    {
      n: 1,
      name: "Intake capture",
      short: "the intake layer",
      body: "Every inquiry — call, form, or search — receives an accountable state and a clear next action, so nothing sits unowned.",
    },
    {
      n: 2,
      name: "Leak detection",
      short: "the detection layer",
      body: "Overdue, abandoned, or ownerless work becomes visible instead of quietly disappearing.",
    },
    {
      n: 3,
      name: "TradeOps context",
      short: "the TradeOps layer",
      body: "Relevant customer, job, asset, and policy context stays connected to the work rather than scattered across tools and memories.",
    },
    {
      n: 4,
      name: "Routing and assignment",
      short: "the routing layer",
      body: "Deterministic rules assign responsibility. AI may prepare recommendations; a person remains accountable for the decision.",
    },
    {
      n: 5,
      name: "Escalation and follow-through",
      short: "the escalation layer",
      body: "Exceptions and unresolved commitments reach a responsible person before a customer moves on.",
    },
    {
      n: 6,
      name: "Field handoff",
      short: "the handoff layer",
      body: "Technicians receive the approved information they need for the work, at the point they need it.",
    },
    {
      n: 7,
      name: "Close and continuity",
      short: "the close layer",
      body: "Payment, documentation, review requests, and appropriate future follow-up are completed — or explicitly excepted with a reason.",
    },
  ],
  disclaimer:
    "This is a diagnostic map, not a promise. A pilot does not rebuild all seven layers on day one. It seals the three foundations that cut across them — and measures the result against the ledger.",
} as const;

// Aspirational operating identity. Defined in plain terms on first use, and
// explicitly framed as a way of working rather than a membership, certification,
// verified status, or a mark we claim to own.
export const identity = {
  heading: "Built for leakproof operators",
  body: "The owners who get the most from a pilot share one instinct: they refuse to pour more traffic, tools, or automation into a system that already leaks. We call that operating identity a leakproof operator. It is not a membership, a certification, or a badge you earn — just a way of running a business that treats an unsealed workflow as the first thing to fix.",
} as const;

export const process = {
  heading: "How the Founding Five pilot begins",
  steps: [
    {
      title: "Take the scorecard.",
      body: "Fifteen minutes about your operation and the leaks that cost you the most. Every scorecard is human-reviewed; poor fits get a fast, honest answer.",
    },
    {
      title: "Human review.",
      body: "Livingry reads every scorecard. No bot triage, no public calendar — fit conversations follow only for qualified companies.",
    },
    {
      title: "Fit conversation.",
      body: "A short call confirms authority, data access, volume, capacity, and your internal operator — before any promise is made.",
    },
    {
      title: "Baseline and system map.",
      body: "We sign the pilot and attribution agreements, map your systems of record, extract baseline data, and define eligibility rules, approved scripts, and escalation paths. No threshold clock runs before readiness is signed off.",
    },
    {
      title: "Three-foundation launch.",
      body: "Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization go live — validated on test records before touching production data. Client Reactivation follows as the first a-la-carte upgrade.",
    },
    {
      title: "Recovery review.",
      body: "The three foundations run. The written Recovery Ledger and exception desk are reviewed daily, and your scorecard arrives every Friday.",
    },
    {
      title: "Reconciliation and continuation.",
      body: "We reconcile the ledger together. Threshold-based billing applies only to Tier 3: a retroactive bill is issued only after the written Recovery Ledger verifies $10,000 in qualifying documented collected recovery inside the first four weekly cycles. Otherwise, we review what the ledger actually shows before deciding anything.",
    },
  ],
} as const;

// Before/after workflow rendered as a semantic, accessible diagram (never an image).
export const workflow = {
  beforeLabel: "Before",
  before: [
    "Customer action",
    "System response",
    "Person responsible",
    "Information recorded",
    "Required next action",
    "Failure point",
    "Consequence",
  ],
  afterLabel: "After",
  after: [
    "Trigger",
    "Information captured",
    "Deterministic rule",
    "AI-assisted preparation where useful",
    "Human approval where consequential",
    "External action",
    "Verified result or exception",
  ],
  caption:
    "AI may listen, classify, summarize, or draft. Rules determine what happens next. People retain approval where the action affects safety, price, customer commitments, credentials, privacy, or material business consequences.",
} as const;

export const deliverables = {
  heading: "What a Founding Five partner receives",
  items: [
    "The $199 Revenue Continuity Assessment — included.",
    "The $497 Livingry Ops Tenant Integration — included.",
    "Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization, configured and tested.",
    "Onboarding, training, integration, and setup.",
    "Human-control and exception rules.",
    "Shared proof ledger with source-record links.",
    "Weekly executive scorecard, delivered every Friday.",
    "Weekly 30-minute pilot review with your operating owner.",
    "Staff orientation and full documentation handoff.",
    "Client Reactivation available as the first a-la-carte upgrade.",
  ],
} as const;

export const commitment = {
  heading: "What Livingry needs from you",
  items: [
    "A named operating owner with authority and availability.",
    "Read access or exports from your field-service, CRM, phone, and invoicing systems.",
    "Accurate baseline information.",
    "Timely review, approval, and disposition updates.",
    "Direct payment of third-party tool, messaging, and telephony costs.",
    "Capacity to serve the work the system recovers.",
  ],
  note: "No public testimonial or named case study is ever required.",
} as const;

export const fit = {
  isHeading: "A strong fit looks like",
  is: [
    "An established U.S. HVAC/R operation with enough inbound demand, estimates, and search reach to create a real recovery opportunity.",
    "An owner, GM, or operations leader with authority to change workflow.",
    "Read access or exports from the field-service, CRM, phone, and invoicing systems.",
    "One accountable internal operator we can work with each week.",
    "Scheduling capacity to serve recovered work.",
    "Willingness to use standardized dispositions and join a weekly reconciliation.",
    "Direct payment of third-party tool and usage costs.",
  ],
  isNotHeading: "We will decline or defer when",
  isNot: [
    "Someone wants “AI” without a business process owner.",
    "Leads, estimates, customers, jobs, and paid invoices cannot be identified or exported.",
    "There is no capacity to serve recovered demand.",
    "The ask is unlimited customization or unsupervised commitments to customers.",
    "Livingry would have to make technical diagnoses, pricing decisions, dispatch commitments, or customer promises without authorized human approval.",
    "The work would require Livingry to perform licensed HVAC services.",
  ],
} as const;

// Re-export canonical founder story from revenue-continuity to eliminate drift.
// The revenue-continuity version is the source of truth; hvac-founding-five adds
// the Proof Matters disclosure.
export const founder = {
  ...canonicalFounder,
  // Map beats array to body array for backwards compatibility with existing rendering
  body: canonicalFounder.beats.map((beat) => beat.body),
  // Approved Proof Matters disclosure, adjacent to the founder copy. Does not
  // imply current licensure; links to the canonical /proof page.
  proofDisclosure:
    "This describes training completed and work done. It is not a claim of current HVAC licensure or presently valid certification.",
  proofLinkLabel: "Read why proof should outlive the institution that issued it",
  proofHref: "/proof",
} as const;

export const pricing = {
  heading: "Founding Five terms — one price, all-in, always visible",
  pilotPrice: "$2,500 all-in",
  body:
    "The Founding Five Tier 2 Pilot is $2,500 all-in for five HVAC/R companies, visibly labeled under the Founding Five Cohort Pilot Agreement. It includes the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration ($649 bundled / $696 separate value), Missed-Call Recovery, Dropped-Estimate Recovery, Agentic Search Optimization, plus onboarding, training, integration, and setup. Tier 1 value is included in the pilot, not credited and not added.",
  nextSixteen:
    "After the Founding Five, the next 16 clients are priced higher, by scope. The Founding Five price is cohort-limited by design.",
  tier3:
    "Tier 3 is optional at $1,000/week. The first four weekly cycles are delivered unpaid. A retroactive bill — the accrued four weeks plus a $4,000 related fee — is issued only after a written Recovery Ledger verifies $10,000 in qualifying documented collected recovery within those first four weekly cycles.",
  noGuarantee:
    "Livingry does not guarantee revenue, lead volume, close rates, reviews, or rankings — for any tier, at any price. The written Recovery Ledger is the only basis for threshold-based billing.",
  thirdParty:
    "Third-party tool, messaging, and telephony costs are opened in your name and paid directly to your company.",
} as const;

export const humanControl = {
  heading: "What Livingry does not do",
  body: "The pilot never removes the human from the loop. A named person on your team approves pricing, discounts, safety guidance, dispatch exceptions, technical advice, and any nonstandard customer commitment. Livingry does not make technical diagnoses, pricing decisions, dispatch commitments, or customer promises without authorized human approval — and it does not perform licensed HVAC services.",
  items: [
    "No licensed HVAC work.",
    "No pricing or discount decisions without your approval.",
    "No customer commitments outside approved scripts and consent rules.",
    "No unlimited customization or unsupervised automation.",
  ],
} as const;

// Re-export canonical FAQ from revenue-continuity, then add HVAC-specific questions.
// The canonical allianceFaq is the source of truth for common questions.
export const faq: { q: string; a: string }[] = [
  ...canonicalFaq.slice(0, 3), // First 3 canonical questions
  {
    q: "What do we pay, and when?",
    a: "The Founding Five Tier 2 Pilot is $2,500 all-in — the Assessment, the Tenant Integration, the three foundations, and onboarding are all inside that price, never added to it. Direct third-party tool, messaging, and telephony costs are billed separately in your company's name.",
  },
  ...canonicalFaq.slice(3), // Remaining canonical questions
  {
    q: "What is the next-16 distinction?",
    a: "The Founding Five is exactly five HVAC/R companies at the $2,500 all-in pilot price. The next 16 clients are priced higher, by scope, because the pilot price is a founding-cohort price, not a rate card.",
  },
  {
    q: "How is the $10,000 recovery threshold verified?",
    a: "Only through a written Recovery Ledger: paid eligible invoices with a complete proof chain — original opportunity, eligibility decision, workflow enrollment, logged contacts, customer response, completed job, paid invoice, and reconciliation approval. Booked appointments and dashboard totals do not count.",
  },
  {
    q: "What happens if the threshold is not met?",
    a: "Nothing is billed retroactively. The written Recovery Ledger is reviewed jointly, and any continuation decision is made from what the ledger actually shows — not from projections or promises.",
  },
  {
    q: "What happens if an integration is not technically possible?",
    a: "The limitation is documented and the parties decide whether to revise the workflow, use an alternative, or stop before unsupported work proceeds.",
  },
];

export const finalCta = {
  heading: "Five companies. One all-in price. A measured system.",
  body: "The Founding Five Tier 2 Pilot is $2,500 all-in for five HVAC/R companies — the Assessment, the Tenant Integration, and the three foundations, all inside one price. Capacity is deliberately limited because every pilot receives hands-on implementation, monitoring, and weekly reconciliation.",
  cta: "Take the 15-Minute Revenue Leak Scorecard",
  note: "Every scorecard is human-reviewed. Fit conversations follow only for qualified companies.",
  signature: "Seal the client container.",
} as const;

export const successState = {
  heading: "Your scorecard has been received.",
  body: "Livingry reviews every scorecard by hand: market fit, leadership readiness, data access, volume, capacity, and an accountable internal operator. If the fit looks real, you will receive an invitation to a fit conversation by email — there is no public calendar and no bot triage. If it does not, you will get a fast, honest answer rather than a slow maybe.",
} as const;

export const consent = {
  text: "I agree that Livingry Services may contact me about this scorecard. Submission does not enroll me in unrelated marketing messages.",
  // Versioned so stored consent evidence stays interpretable if the wording changes.
  version: "hvac-ff-consent-v2",
} as const;

// ---------------------------------------------------------------------------
// Guardrails: prohibited claims that must never appear in the public funnel.
// Used by automated tests to scan rendered/serialized page content.
// ---------------------------------------------------------------------------

export const PROHIBITED_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "AI transformation", pattern: /\bAI transformation\b/i },
  { label: "AI workforce", pattern: /\bAI workforce\b/i },
  { label: "AI employee", pattern: /\bAI employee\b/i },
  { label: "replace your staff", pattern: /replace your staff/i },
  { label: "revolutionize", pattern: /\brevolutioni[sz]e\b/i },
  { label: "10x", pattern: /\b10x\b/i },
  { label: "guaranteed revenue", pattern: /guarantee[d]? revenue/i },
  { label: "fully autonomous", pattern: /fully autonomous/i },
  { label: "integrate with everything", pattern: /integrate with everything/i },
  { label: "no risk", pattern: /\bno risk\b/i },
  { label: "Florida-only claim", pattern: /serving florida/i },
  { label: "free strategy call", pattern: /free strategy call/i },
  // Over-promising absolutes imported from the raw positioning doc. These must
  // never reach public copy: they describe outcomes Livingry cannot guarantee.
  { label: "commercial malpractice", pattern: /commercial malpractice/i },
  { label: "Intake Lock claim", pattern: /intake lock/i },
  { label: "100% capture", pattern: /100%\s*(intake|capture)/i },
  { label: "transaction finality", pattern: /transaction finality/i },
  { label: "20-second response", pattern: /\b20[-\s]?second/i },
  { label: "physically impossible queue", pattern: /physically impossible/i },
  { label: "never terminates", pattern: /never (terminat|stops|ends)/i },
  { label: "perfect/optimal resource", pattern: /(perfect|optimal) resource/i },
  { label: "join the ranks", pattern: /(join|welcome to) the ranks/i },
  // The superseded commercial model must never return to public copy.
  { label: "old $799 findings report", pattern: /\$799/ },
  { label: "old $2,500–$4,500 launch range", pattern: /\$2,?500[–-]\$4,?500/ },
  { label: "fee-waiver guarantee", pattern: /fee[- ]waiver (guarantee|period)|waiv(es|ed|ing)? (accrued|the|our)? ?service fees?/i },
  { label: "2x fee coverage", pattern: /\b2x\b/ },
  { label: "12-week test run", pattern: /12[- ]week (test|trial|guarantee)/i },
  { label: "4-workflow launch", pattern: /four[- ]workflow|4[- ]workflow launch/i },
];

// Copy must not imply current calendar scheduling in this funnel.
export const CALENDAR_PATTERNS: RegExp[] = [
  /calendar\.app\.google/i,
  /calendly\.com/i,
  /cal\.com/i,
  /book a time/i,
  /schedule a call/i,
];

// Fabricated names, revenue figures, and case-study details from the raw
// positioning doc. None describe a real, owner-approved engagement, so they
// must never appear in public copy.
export const FABRICATION_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "Dave case study", pattern: /\bDave\b/ },
  { label: "let's call him", pattern: /let'?s call him/i },
  { label: "$64,000 outcome", pattern: /\$64,?000/ },
  { label: "$5.2M revenue", pattern: /\$5\.2\s*m/i },
  { label: "$3M operation", pattern: /\$3\s*m\b/i },
  { label: "capture-rate jump", pattern: /30%?\s*to\s*92%/i },
  { label: "capture rate went", pattern: /capture rate went/i },
  { label: "300 inquiries", pattern: /300\s+(inquiries|leads)/i },
  { label: "ruptured gas tank", pattern: /ruptured gas tank/i },
];

// Copy must never claim an observation, assessment, or call is already
// scheduled — scheduling access follows a confirmed observation.
export const SCHEDULED_PATTERNS: RegExp[] = [
  /\bis scheduled\b/i,
  /\bhas been scheduled\b/i,
  /\bwe('ve| have) scheduled\b/i,
  /\byour (assessment|observation|review) is (scheduled|booked)\b/i,
];

export function findProhibitedClaims(text: string): string[] {
  return PROHIBITED_PATTERNS.filter((p) => p.pattern.test(text)).map((p) => p.label);
}

export function findCalendarReferences(text: string): string[] {
  return CALENDAR_PATTERNS.filter((p) => p.test(text)).map((p) => p.source);
}

export function findFabrications(text: string): string[] {
  return FABRICATION_PATTERNS.filter((p) => p.pattern.test(text)).map((p) => p.label);
}

export function findScheduledClaims(text: string): string[] {
  return SCHEDULED_PATTERNS.filter((p) => p.test(text)).map((p) => p.source);
}

// ---------------------------------------------------------------------------
// Structured data builders (pure functions so they can be unit-tested).
// ---------------------------------------------------------------------------

export function buildBreadcrumbLd() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "HVAC", href: "/industries/hvac" },
    { label: "Founding Five Pilot", href: HVAC_ROUTE },
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

export function buildServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Founding Five Tier 2 Pilot — HVAC/R Revenue Continuity",
    serviceType: "Revenue continuity system implementation and operation",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Established HVAC/R companies",
    },
    description: directAnswer,
    url: HVAC_URL,
  };
}

export function buildFaqLd() {
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