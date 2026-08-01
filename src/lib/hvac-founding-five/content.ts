// Single source of truth for the Founding Five HVAC pilot page copy, FAQ,
// structured data, and guardrails. Keeping copy here (rather than only inline
// in the page) lets the visible FAQ, the FAQPage JSON-LD, and the automated
// prohibited-claims tests all read from the same place.

import { site } from "@/lib/site";

export const HVAC_ROUTE = "/hvac/founding-five";
export const HVAC_URL = `${site.primaryDomain}${HVAC_ROUTE}`;

export const FOUNDING_FIVE_CAPACITY = 5;

// The central belief the funnel is built around. Stated plainly, used verbatim
// on the page and reused in tests so the wording cannot drift.
export const sealedSystemPrinciple = "A system that is unsealed cannot be scaled.";

export const seo = {
  title: "HVAC/R Strategic Alliance — Founding Five | Livingry Services",
  description:
    "Livingry is accepting applications from established U.S. HVAC/R companies for a limited number of Strategic Alliances: a four-part Revenue Continuity System with a shared proof ledger and a conditional fee-waiver guarantee.",
  ogTitle: "Applications are open for a limited number of HVAC/R Strategic Alliances.",
  ogDescription:
    "One Revenue Continuity System around missed calls, open estimates, past customers, and referrals. Human-controlled AI. Measured against a shared proof ledger.",
} as const;

// A direct, server-rendered 40–80 word answer placed near the top of the page
// for humans and AI systems. (Word count verified in tests.)
export const directAnswer =
  "The Founding Five is the entry cohort of Livingry's HVAC/R Strategic Alliance program: a founder-led engagement that installs a four-part Revenue Continuity System — missed-call recovery, estimate continuity, customer reactivation, and referral continuity — around the customers and opportunities an established company has already earned. Every recovered dollar is measured against a shared proof ledger, and Livingry's accrued service fee is waived if the agreed recovery level is not met during the guarantee period.";

export const hero = {
  eyebrow: "THE LIVINGRY FOUNDING FIVE",
  title: "Applications are open for a limited number of HVAC/R Strategic Alliances.",
  intro:
    "Livingry installs a full Revenue Continuity System around the customers and opportunities your company has already earned.",
  premise:
    "Missed calls. Open estimates. Past customers. Referrals that were never asked for. These are not four separate problems — they are one system leaking at four handoffs.",
  belief: sealedSystemPrinciple,
  body: "We do not sell a loose collection of AI tools. We build the connected follow-through system that keeps value from leaking out between the phone, the office, the estimate, the completed job, and the next customer need — and we measure every recovered dollar against a shared proof ledger.",
  proofStrip:
    "Four connected workflows · Shared proof ledger · Human approval on consequential actions · Conditional fee-waiver guarantee",
  primaryCta: "Apply for a Founding Five Alliance",
  secondaryAnchor: "See how an alliance works",
  noCalendarNote:
    "No public calendar. Applications are reviewed first; fit conversations follow for qualified companies.",
} as const;

export const problem = {
  heading: "The problem is rarely “not enough software.”",
  intro:
    "Most established HVAC companies already have phones, forms, field-service software, office procedures, and capable people. The leaks appear between them:",
  leaks: [
    "A caller reaches voicemail and receives no accountable next step — the demand dies before a qualified response.",
    "A valid estimate is sent, then worked inconsistently or not at all.",
    "A past customer who would have rebooked is never appropriately contacted again.",
    "A satisfied customer is never given a simple, timely opportunity to refer.",
  ],
  pullQuote:
    "If the next action depends on one person remembering, it is not yet a dependable workflow.",
} as const;

export const offer = {
  heading: "One Revenue Continuity System. Four connected workflows. Always together.",
  intro:
    "Every alliance includes all four continuity workflows. The implementation order may vary based on your baseline, but no partner is sold one workflow as the complete product:",
  workflows: [
    "Missed-call recovery — capture, classify, route, time-limit, escalate, and log every eligible inbound opportunity.",
    "Estimate continuity — identify eligible open estimates and execute the approved follow-up cadence with recorded dispositions.",
    "Customer reactivation — segment eligible prior customers and run the approved contact sequence, routing replies and bookings.",
    "Referral continuity — trigger a timely, approved referral invitation after eligible completed jobs, with source attribution.",
  ],
  closer:
    "Booked-job handoffs and technician knowledge are implemented inside every alliance as operating scope — they are how the four workflows hold up in the field, not separate products.",
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
      body: "Every inquiry — call, form, text, or referral — receives an accountable state and a clear next action, so nothing sits unowned.",
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
    "This is a diagnostic map, not a promise. An alliance does not rebuild all seven layers on day one. It seals the four follow-through workflows that cut across them — and measures the result against the ledger.",
} as const;

// Aspirational operating identity. Defined in plain terms on first use, and
// explicitly framed as a way of working rather than a membership, certification,
// verified status, or a mark we claim to own.
export const identity = {
  heading: "Built for leakproof operators",
  body: "The owners who get the most from an alliance share one instinct: they refuse to pour more traffic, tools, or automation into a system that already leaks. We call that operating identity a leakproof operator. It is not a membership, a certification, or a badge you earn — just a way of running a business that treats an unsealed workflow as the first thing to fix.",
} as const;

export const process = {
  heading: "How an alliance begins",
  steps: [
    {
      title: "Apply.",
      body: "Tell us about your operation and the leak that costs you the most. Poor-fit applications get a fast, honest answer.",
    },
    {
      title: "Fit conversation.",
      body: "A short call confirms authority, data access, volume, capacity, and your internal operator — before any promise is made.",
    },
    {
      title: "Baseline and system map.",
      body: "We sign the alliance and attribution agreements, map your systems of record, extract baseline data, and define eligibility rules, approved scripts, and escalation paths. The guarantee clock does not start until readiness is signed off.",
    },
    {
      title: "Four-workflow launch.",
      body: "Missed-call capture, estimate follow-up, reactivation, and referral invitations go live — validated on test records before touching production data.",
    },
    {
      title: "Guarantee period.",
      body: "All four workflows run. The proof ledger and exception desk are reviewed daily, and your scorecard arrives every Friday.",
    },
    {
      title: "Reconciliation and continuation.",
      body: "We reconcile the ledger together. If the agreed recovery level is met, accrued fees are collected and weekly service continues. If not — and you met your commitments — the accrued fees are waived, and we review why before deciding anything.",
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
  heading: "What a founding partner receives",
  items: [
    "Baseline extraction and a current-state leak map.",
    "System-of-record map and field mappings.",
    "Eligibility rules, approved scripts, and escalation paths.",
    "All four continuity workflows, configured and tested.",
    "Human-control and exception rules.",
    "Shared proof ledger with source-record links.",
    "Weekly executive scorecard, delivered every Friday.",
    "Weekly 30-minute alliance review with your operating owner.",
    "Guarantee-period reconciliation ledger.",
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
    "An established U.S. HVAC/R operation with enough inbound demand, estimates, and customer history to create a real recovery opportunity.",
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

export const founder = {
  heading: "Built from the field outward",
  body: [
    "I spent years as a solo residential contractor in Austin — tools in hand, clients watching, phone buzzing with leads I was paying for and couldn't answer. Thumbtack and HouseCall Pro sent the same leads to my competitors at the same time they sent them to me; I lost jobs I never even knew about. I failed to follow up on estimates in time to close, failed to take the before-and-after pictures, failed to ask for the testimonials, reviews, and referrals. Texas HVAC certification training in 2012, PV solar design-and-install training in 2018 — and I probably failed to realize over 30% of my productive capacity, even as a one-man operation.",
    "I spent the following years building software — business apps, then AI agents and payment infrastructure, including three months as Operations Lead at an open-source AI lab. When I started building seriously with AI, I realized the tools that could have saved my contracting business already exist — unevenly distributed, buried under hype, locked behind institutional budgets most tradesmen can't touch. In 2019 I published a book on Bitcoin and sovereign financial infrastructure; the through-line has always been systems their owners can actually keep.",
    "Livingry installs the operating system I needed in the field: follow-through that does not depend on memory, a person accountable for every consequential action, and records the company keeps. I don't remove the human from the loop — I make sure the loop doesn't break when the human is in an attic. I built this for the contractor I was at 35.",
  ],
  // Approved Proof Matters disclosure, adjacent to the founder copy. Does not
  // imply current licensure; links to the canonical /proof page.
  proofDisclosure:
    "This describes training completed and work done. It is not a claim of current HVAC licensure or presently valid certification.",
  proofLinkLabel: "Read why proof should outlive the institution that issued it",
  proofHref: "/proof",
} as const;

export const pricing = {
  heading: "Founding Five terms",
  body: "Every alliance begins with the AI Opportunity Blueprint: a diagnostic and findings call first — you pay the $799 findings report only if you decide the findings are worth having in writing. That fee credits in full toward a workflow launch scoped at $2,500–$4,500 for your company's specific configuration, and ongoing operational fees are billed only after rendered services have produced recovered, attributable revenue covering at least 2x those fees.",
  // Gated copy — only rendered when SHOW_HVAC_PILOT_PRICE is explicitly enabled.
  gatedPrice:
    "Founding Five Alliance: $799 findings report (after the findings call, only if you want it), credited in full toward a $2,500–$4,500 workflow launch within four weeks. Operational fees bill in arrears behind 2x recovered-revenue coverage, and Livingry's accrued service fee is waived for the guarantee period if the agreed recovery threshold is not met and operating commitments were kept.",
} as const;

export const faq: { q: string; a: string }[] = [
  {
    q: "Is this an AI receptionist or a collection of AI tools?",
    a: "No. The Revenue Continuity System is four connected workflows — missed calls, estimates, past customers, and referrals — installed and operated as one system. AI may classify, summarize, draft, and route inside those workflows; people approve everything consequential.",
  },
  {
    q: "Will Livingry replace our CRM or field-service platform?",
    a: "No. Your company remains the system of record. The system works around the tools you already run, and anything we build is documented and handed to you.",
  },
  {
    q: "Do you guarantee revenue?",
    a: "We guarantee the fee structure, not an outcome. If the system does not produce the agreed level of documented, attributable paid revenue during the guarantee period — and your team has met its operating commitments — Livingry waives its accrued service fees for that period. We never promise lead volume, close rates, or revenue totals.",
  },
  {
    q: "What do we pay to start?",
    a: "Nothing before the findings call. Every alliance begins with the AI Opportunity Blueprint: we map your workflows and walk you through the findings live. The $799 findings report is your call — pay only if you want it in writing — and it credits in full toward a workflow launch scoped at $2,500–$4,500. Ongoing operational fees bill only after recovered, attributable revenue has covered them 2x over.",
  },
  {
    q: "Why is capacity limited?",
    a: "Every alliance receives hands-on implementation, monitoring, weekly scorecards, and weekly reconciliation. That operating load is real, so Year One is capped and a waitlist forms once active capacity is full.",
  },
  {
    q: "What counts as recovered revenue?",
    a: "Only paid eligible invoices with a complete proof chain: original opportunity, eligibility decision, workflow enrollment, logged contacts, customer response, completed job, paid invoice, and reconciliation approval. Booked appointments, positive replies, and dashboard totals do not count.",
  },
  {
    q: "Does AI communicate with our customers without approval?",
    a: "Only within approved workflows, channels, and consent rules. Pricing, discounts, safety guidance, dispatch exceptions, technical advice, and nonstandard commitments always route to a named person on your team.",
  },
  {
    q: "Can the work be done remotely?",
    a: "Yes. The program is designed for established U.S. HVAC/R companies able to provide appropriate system access and participate in remote reviews.",
  },
  {
    q: "Do we have to endorse Livingry publicly?",
    a: "No. Case-study consideration is optional and requires your explicit approval; anonymized outcome reporting is the default.",
  },
  {
    q: "What happens if the threshold is not met?",
    a: "If your team met its operating commitments, the accrued Livingry service fees for the guarantee period are waived. We then do a joint root-cause review of the ledger before any continuation decision — a pilot that misses the threshold still has to explain why.",
  },
  {
    q: "What happens if an integration is not technically possible?",
    a: "The limitation is documented and the parties decide whether to revise the workflow, use an alternative, or stop before unsupported work proceeds.",
  },
];

export const finalCta = {
  heading: "The first five partners shape the operating standard.",
  body: "The diagnostic and findings call come first. The $799 findings report is the only payment before your workflow launch — and it credits in full when you proceed. Capacity is deliberately limited because every alliance receives hands-on implementation, monitoring, and weekly reconciliation.",
  cta: "Apply for a Founding Five Alliance",
  note: "Applications are reviewed before a fit conversation is offered.",
  signature: "Seal the client container.",
} as const;

export const successState = {
  heading: "Your application has been received.",
  body: "Livingry reviews every application against the alliance fit criteria: authority, data access, volume, capacity, and an accountable internal operator. If the fit looks real, you will receive an invitation to schedule your Strategic Alliance Review — a calendar link arrives with your confirmation email. If it does not, you will get a fast, honest answer rather than a slow maybe.",
} as const;

export const consent = {
  text: "I agree that Livingry Services may contact me about this request. Submission does not enroll me in unrelated marketing messages.",
  // Versioned so stored consent evidence stays interpretable if the wording changes.
  version: "hvac-ff-consent-v1",
} as const;

// Price visibility is controlled by configuration and hidden by default.
// Note: this module also exports a `process` const (the pilot steps), so we
// read the environment via globalThis to avoid shadowing Node's global.
export function showPilotPrice(
  env: Record<string, string | undefined> = globalThis.process.env,
): boolean {
  return env.SHOW_HVAC_PILOT_PRICE === "true";
}

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
    { label: "Founding Five Alliance", href: HVAC_ROUTE },
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
    name: "HVAC/R Revenue Continuity System — Strategic Alliance",
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
