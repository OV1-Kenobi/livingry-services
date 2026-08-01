// Single source of truth for the Revenue Continuity System / Strategic
// Alliance repositioning: program identity, the four continuity workflows,
// commercial framework (structure public, dollar figures gated), proof
// standard, fit criteria, and the founder field-story.
//
// Positioning rules enforced here and in tests:
// - No "guaranteed revenue" or outcome claims — the guarantee is a
//   conditional fee-waiver only, with no dollar threshold published.
// - The $799 setup fee is public; the weekly service fee and the proof
//   threshold are gated to the private proposal.
// - The four workflows are ONE system. No partner is sold a single workflow
//   as the complete product.
// - Founder credentials are training/work history, never current licensure.

export const ALLIANCE_APPLY_ROUTE = "/hvac/founding-five#request-review";

export const ALLIANCE_EVENTS = {
  applyClick: "hvac_alliance_apply_click",
  termsView: "hvac_alliance_terms_view",
  proofStandardView: "hvac_proof_standard_view",
} as const;

export type AllianceEvent = (typeof ALLIANCE_EVENTS)[keyof typeof ALLIANCE_EVENTS];

export const program = {
  systemName: "Revenue Continuity System",
  relationshipName: "Strategic Alliance",
  cohortName: "Founding Five",
  yearOneCapacity: 21,
  foundingCohortSize: 5,
  headline: "Applications are open for a limited number of HVAC/R Strategic Alliances.",
  coreExplanation:
    "Livingry installs a full Revenue Continuity System around the customers and opportunities your company has already earned: missed calls, open estimates, past customers, and referrals. We do not sell a loose collection of AI tools. We build the connected follow-through system that keeps value from leaking out between the phone, the office, the estimate, the completed job, and the next customer need.",
  capacityNote:
    "Capacity is deliberately limited because every alliance receives hands-on implementation, monitoring, and weekly reconciliation.",
} as const;

// The four connected leaks — one system, not four optional modules.
export const leaksIntro = {
  heading: "Four leaks. One system.",
  body: "A contractor can pay for leads, perform excellent work, prepare estimates, and earn customer goodwill — yet still lose value at the handoffs between phone, office, estimate, completed job, and future need. The Revenue Continuity System closes those handoffs with human-supervised workflows, clear ownership, and a shared proof ledger.",
  leaks: [
    "Missed calls and unworked inbound opportunities",
    "Estimates that receive no consistent follow-up",
    "Former customers who are never appropriately reactivated",
    "Satisfied customers who are never given a simple, timely opportunity to refer",
  ],
} as const;

// The sold offer: all four continuity workflows, always together.
export const workflows = {
  heading: "The Revenue Continuity System",
  intro:
    "Every alliance includes all four continuity workflows. The implementation order may vary based on your baseline, but no partner is sold one workflow as the complete product.",
  items: [
    {
      name: "Missed-call recovery",
      leak: "Inbound demand dies before a qualified response.",
      behavior:
        "Capture, classify, route, time-limit, escalate, and log every eligible inbound opportunity.",
      proofEvent: "Lead is contacted after a qualifying lapse, books, completes, and pays.",
    },
    {
      name: "Estimate continuity",
      leak: "Valid estimates are sent but not consistently worked.",
      behavior:
        "Identify eligible open estimates; execute the approved follow-up cadence; record disposition and next action.",
      proofEvent: "Previously unworked estimate is accepted, completes, and pays.",
    },
    {
      name: "Customer reactivation",
      leak: "Past customers disappear between service cycles.",
      behavior:
        "Segment eligible prior customers; use the approved contact sequence; route replies and bookings.",
      proofEvent: "Eligible inactive customer rebooks, completes, and pays.",
    },
    {
      name: "Referral continuity",
      leak: "Good outcomes do not become introductions.",
      behavior:
        "Trigger a timely, approved referral invitation after eligible completed jobs; track source and attribution.",
      proofEvent: "Referred customer is identifiable, completes, and pays.",
    },
  ],
  // Delivered inside every alliance but not sold as standalone products.
  implementationScope: {
    heading: "Delivered inside every alliance",
    body: "Booked-job continuity (scope, notes, photos, and approvals carried from office to field) and technician knowledge (approved job history, manuals, and procedures made findable with source visibility) are implemented as part of the system — they are how the four workflows hold up in real operations, not separate products.",
  },
} as const;

export const controls = {
  heading: "Non-negotiable controls",
  items: [
    "Your company remains the system of record for customers, estimates, jobs, invoices, pricing, and technical work.",
    "AI may classify, summarize, draft, route, and recommend — nothing more by default.",
    "A named person on your team approves pricing, discounts, safety guidance, dispatch exceptions, technical advice, and any nonstandard customer commitment.",
    "Every automated action carries an audit event, source record, timestamp, and workflow identifier.",
    "Customer communication happens only through approved channels and consent rules.",
  ],
} as const;

// The credibility engine. Public because the measurement discipline is what
// separates this from every "AI will grow your revenue" pitch.
export const proofStandard = {
  heading: "The proof standard",
  intro:
    "Both sides look at the same numbers. Every claimed dollar must complete a full proof chain before it counts.",
  definition:
    "Net verified recovered paid revenue = paid eligible invoices, minus refunds, credits, chargebacks, duplicate claims, and anything excluded by the attribution rules.",
  chain: [
    "Original opportunity",
    "Eligibility decision",
    "Workflow enrollment",
    "Logged contact sequence",
    "Customer response or booking",
    "Completed job",
    "Paid invoice",
    "Reconciliation approval",
  ],
  reportingRule:
    "We maintain two measures and never mix them: revenue received during the guarantee period, and trailing realized revenue from the same cohort that pays later inside the attribution window. The guarantee is never inflated by pipeline.",
  attributionNote:
    "Every claim is tagged to one of the four workflows — or marked not attributable. A dashboard total is not proof.",
} as const;

// Commercial framework. Structure is public; the weekly fee and the proof
// threshold stay gated to the private proposal.
export const terms = {
  heading: "Founding Five terms",
  setupFee: "$799",
  body: "Founding partners pay a $799 non-refundable setup fee plus the direct cost of the tools configured for their business. Livingry's service fee accrues from day one but is deferred until the shared proof ledger demonstrates the agreed level of recovered, attributable paid revenue.",
  foundingBenefits: [
    "Rate lock for the agreed initial term",
    "Priority input on the operating roadmap",
    "Quarterly benchmark access",
    "Case-study consideration — only with your explicit approval",
  ],
} as const;

// Conditional fee-waiver only. No dollar threshold, no revenue promise.
export const guarantee = {
  heading: "The guarantee, in plain terms",
  body: "If the four-part recovery system does not produce at least the agreed level of documented, attributable paid revenue during the guarantee period — and your team has met its operating commitments — Livingry waives its accrued service fees for that period. We do not promise revenue, lead volume, close rates, reviews, or rankings. We promise a measured system and a shared ledger, and we put our fee behind it.",
} as const;

export const fit = {
  acceptHeading: "A strong fit looks like",
  accept: [
    "An owner, GM, or operations leader with authority to change workflow",
    "Enough inbound demand, estimates, and customer history to create a real recovery opportunity",
    "Read access or exports from your field-service, CRM, phone, and invoicing systems",
    "One accountable internal operator we can work with each week",
    "Scheduling capacity to serve recovered work",
    "Willingness to use standardized dispositions and join a weekly reconciliation",
    "Direct payment of third-party tool, messaging, and telephony costs",
  ],
  deferHeading: "We will decline or defer when",
  defer: [
    "Someone wants “AI” without a business process owner",
    "Leads, estimates, customers, jobs, and paid invoices cannot be identified or exported",
    "There is no capacity to serve recovered demand",
    "The ask is unlimited customization or unsupervised commitments to customers",
    "Livingry would have to make technical diagnoses, pricing decisions, dispatch commitments, or customer promises without authorized human approval",
  ],
} as const;

export const allianceProcess = {
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
      body: "All four workflows run. Proof ledger and exceptions are reviewed daily, and your scorecard arrives every Friday.",
    },
    {
      title: "Reconciliation and continuation.",
      body: "We reconcile the ledger together. If the threshold is met, accrued fees are collected and weekly service continues. If not — and you met your commitments — the accrued fees are waived, and we review why before deciding anything.",
    },
  ],
} as const;

export const deliverables = {
  heading: "What a founding partner receives",
  items: [
    "Baseline extraction and a current-state leak map",
    "System-of-record map and field mappings",
    "Eligibility rules, approved scripts, and escalation paths",
    "All four continuity workflows, configured and tested",
    "Human-control and exception rules",
    "Shared proof ledger with source-record links",
    "Weekly executive scorecard, delivered every Friday",
    "Weekly 30-minute alliance review with your operating owner",
    "Four-week guarantee reconciliation ledger",
    "Staff orientation and full documentation handoff",
  ],
} as const;

export const partnerCommitments = {
  heading: "What Livingry needs from you",
  items: [
    "A named operating owner with authority and availability",
    "Read access or exports from your field-service, CRM, phone, and invoicing systems",
    "Accurate baseline information",
    "Timely review, approval, and disposition updates",
    "Direct payment of third-party tool and usage costs",
    "Capacity to serve the work the system recovers",
  ],
  note: "No public testimonial or named case study is ever required.",
} as const;

// Founder field-story. Three beats: the field, the systems turn, why this
// offer exists. Credential language is training/work history only — the
// Proof Matters disclosure (kept in hvac-founding-five/content.ts) renders
// adjacent wherever this is used.
export const founder = {
  heading: "Built from the field outward",
  beats: [
    {
      label: "The field",
      body: "I have run the calls this system recovers. Texas HVAC certification training in 2012, PV solar design-and-install training in 2018, and years as an independent residential contractor — answering the phone, writing the estimate, doing the work, sending the invoice, and asking for the review, all myself. I know exactly where a small operation loses the thread between an inquiry and a paid job.",
    },
    {
      label: "The systems turn",
      body: "I spent the following years building software — business apps, then AI agents and payment infrastructure — and kept seeing the same pattern from the other side: the tools worked, but the handoffs between them leaked. In 2019 I published a book on Bitcoin and sovereign financial infrastructure; the through-line has always been systems their owners can actually keep.",
    },
    {
      label: "Why this offer exists",
      body: "Livingry installs the operating system I needed in the field: follow-through that does not depend on memory, a person accountable for every consequential action, and records the company keeps.",
    },
  ],
} as const;

export const allianceFaq: { q: string; a: string }[] = [
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
    a: "Founding partners pay a $799 non-refundable setup fee plus the direct cost of the third-party tools configured for their business. Livingry's service fee accrues but is deferred until the proof ledger demonstrates the agreed recovery level.",
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
];
