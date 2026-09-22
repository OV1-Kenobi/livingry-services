// Single source of truth for the Founding Five page copy, FAQ, structured
// data, and guardrails. Keeping copy here (rather than only inline in the
// page) lets the visible FAQ, the FAQPage JSON-LD, and the automated
// prohibited-claims tests all read from the same place.
//
// Canonical commercial terms (corrected 2026-09-02 per the 2026-08-10
// consolidated offer decision; see PLAN-2026-09-02-LSRU-01 WP3 and the
// approved copy in the Company OS planning tree):
// - Founding Five = the Done For You tier at the founding rate: $1,250 to
//   start, $1,250 final performance-trigger payment, $500/week after the
//   threshold. Standard DFY reference: $2,500 / $2,500 / $1,000 per week.
// - DFY requires DWY completion ($3,900 total: $1,949 at signing + $1,951 at
//   exit testing; prior DIY $649 credited, leaving $3,251). Standard add-ons:
//   Missed Calls & Slow Response $500, Lost Referrals & Reviews $500.
// - Trigger: 10× collected revenue vs the DWY baseline, measured cumulatively
//   since deployment. Week-four assessment; 52-week exclusivity once met.
// - No outcome guarantees of any kind; third-party costs separate.
// - The superseded model (Tier 2/3 labels, $199 assessment, $497 tenant
//   integration, $649/$696 bundle arithmetic, $10,000 threshold, $4,000 fee,
//   "Agentic Search Optimization" as a foundation) must never appear in
//   public copy — asserted in tests.

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
  title: "Founding Five Strategic Alliance — HVAC/R Revenue Continuity | Livingry Services",
  description:
    "Livingry's Founding Five: a capacity-limited founding cohort for established HVAC/R operators moving from diagnosis into active Done For You management at the founding rate. Follows the Done With You implementation, which establishes the operating baseline. No outcome guarantees. Human-reviewed before any follow-up.",
  ogTitle: "Before you buy more leads, find where the ones you already paid for are leaking out.",
  ogDescription:
    "The Founding Five is a capacity-limited founding cohort for established HVAC/R operators — active Done For You management at the founding rate, following the Done With You implementation. Human-reviewed before any follow-up.",
} as const;

// A direct, server-rendered 40–80 word answer placed near the top of the page
// for humans and AI systems. (Word count verified in tests.)
export const directAnswer =
  "The Founding Five is a capacity-limited founding cohort for established HVAC/R operators ready to move from diagnosis into active Done For You management. Founding Five pricing is $1,250 to start, $1,250 as the final performance-trigger payment, and $500 per week after the threshold — half the standard rate. It follows the Done With You implementation, which establishes your operating baseline. Applications are human-reviewed before any follow-up.";

export const hero = {
  eyebrow: "Founding Five Strategic Alliance — Invite-Only HVAC/R Pilot Cohort",
  title: "Before you buy more leads, find where the ones you already paid for are leaking out.",
  intro:
    "The Founding Five is a capacity-limited founding cohort for established HVAC/R operators ready to move from diagnosis into active Done For You management.",
  premise:
    "This is not a mass-market program. It is reserved for right-sized, right-positioned, right-located operators whose leak potential justifies the engagement.",
  belief: sealedSystemPrinciple,
  body: "Livingry Services is a small team. The Founding Five gives Michael and the Livingry team time to work closely with a small group of operators — proving the Done For You model under real conditions before opening it to a wider market.",
  proofStrip:
    "Calls. Estimates. Past customers. Referrals. Human-reviewed where judgment matters.",
  primaryCta: "Apply for the Founding Five Strategic Alliance",
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
    "A completed job never becomes a review, testimonial, or referral opportunity.",
    "A past customer who would have rebooked is never appropriately contacted again — the reactivation gap.",
  ],
  pullQuote:
    "If the next action depends on one person remembering, it is not yet a dependable workflow.",
} as const;

export const offer = {
  heading: "How Done For You works",
  intro:
    "Done For You (DFY) is active management after the Done With You (DWY) implementation establishes your operating baseline. You cannot skip directly to Done For You: the Done With You phase establishes the collected-revenue baseline and leak-category tracking required for active management.",
  steps: [
    {
      title: "Step 1 — Done With You (DWY)",
      body: "Livingry acts as general contractor over implementation. Three standard leak systems (Dropped Estimates, Dead Client Lists, and Lost Referrals & Reviews/Testimonials) plus minimal n8n spine go live. Your Company Operating System Agent is deployed on your own infrastructure. Exit testing confirms everything works. (DWY: $3,900 total — $1,949 at signing + $1,951 at exit testing. Prior DIY $649 credited, leaving $3,251 at exit testing.)",
    },
    {
      title: "Step 2 — Done For You (DFY)",
      body: "Livingry Services retains ongoing responsibility for operating, maintaining, and repairing the systems built during onboarding.",
    },
  ],
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
      body: "We sign the engagement and attribution agreements, map your systems of record, extract baseline data, and define eligibility rules, approved scripts, and escalation paths.",
    },
    {
      title: "Launch.",
      body: "The leak systems approved in your implementation go live — validated on test records before touching production data.",
    },
    {
      title: "Weekly review.",
      body: "The approved systems run. Tracking and exceptions are reviewed weekly, and your scorecard arrives every Friday.",
    },
    {
      title: "Reconciliation and continuation.",
      body: "We reconcile the results together. Collected revenue is tracked weekly against your DWY baseline. At the week-four assessment: if the threshold is met, the final performance-trigger payment and weekly fees are billed retroactively and the 52-week exclusivity period begins; if it is not met and both parties extend, work continues unbilled under the same terms; if it is not met and there is no extension, the engagement ends at the initial payment with no further obligation.",
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
    "Management of the approved leak systems after the Done With You baseline is established.",
    "Weekly tracking of collected revenue against the Done With You baseline.",
    "Performance-triggered billing with retroactive payment at the week-four assessment.",
    "52-week exclusivity period once the threshold is met.",
    "Human-control and exception rules.",
    "Verified records with source links.",
    "Weekly executive scorecard, delivered every Friday.",
    "Weekly 30-minute review with your operating owner.",
    "Staff orientation and full documentation handoff.",
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
  heading: "Founding Five pricing",
  pilotPrice: "$1,250 to start",
  body:
    "Done For You (DFY) is active management after the Done With You (DWY) implementation establishes your operating baseline. You cannot skip directly to Done For You: the Done With You phase establishes the collected-revenue baseline and leak-category tracking required for active management. The Founding Five rate is half the standard reference pricing, shown openly side by side.",
  pricingTable: [
    { label: "To start", founding: "$1,250", standard: "$2,500" },
    { label: "Final performance-trigger payment", founding: "$1,250", standard: "$2,500" },
    { label: "Per week after the threshold", founding: "$500", standard: "$1,000" },
  ],
  noGuarantee:
    "Livingry Services does not guarantee revenue, conversion, booked jobs, reviews, time savings, or growth. The diagnostic provides directional findings. The performance-trigger model ties billing to a measured outcome, but no specific result is promised or implied.",
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
    a: "The Founding Five rate is $1,250 to start, $1,250 as the final performance-trigger payment, and $500 per week after the threshold — half the standard Done For You reference pricing. It follows the Done With You implementation ($3,900 total), which establishes your operating baseline. Direct third-party tool, messaging, and telephony costs are billed separately in your company's name.",
  },
  ...canonicalFaq.slice(3), // Remaining canonical questions
  {
    q: "How does the performance trigger work?",
    a: "Collected revenue is tracked weekly against your Done With You baseline. The trigger is 10× collected revenue relative to baseline, measured cumulatively since deployment. At the week-four assessment: if the threshold is met, the final payment and weekly fees are billed retroactively and the 52-week exclusivity period begins; if it is not met and both parties extend, work continues unbilled under the same terms; if it is not met and there is no extension, the engagement ends at the initial payment with no further obligation.",
  },
  {
    q: "What happens if an integration is not technically possible?",
    a: "The limitation is documented and the parties decide whether to revise the workflow, use an alternative, or stop before unsupported work proceeds.",
  },
];

export const finalCta = {
  heading: "Five companies. One founding rate. A measured system.",
  body: "The Founding Five is a capacity-limited founding cohort for established HVAC/R operators moving from diagnosis into active Done For You management — at half the standard rate. Capacity is deliberately limited because every partner receives hands-on implementation, monitoring, and weekly reconciliation.",
  cta: "Apply for the Founding Five Strategic Alliance",
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
    name: "Founding Five Strategic Alliance — HVAC/R Revenue Continuity",
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