// Single source of truth for the Revenue Continuity System / Strategic
// Alliance repositioning: program identity, the four continuity workflows,
// commercial framework, proof standard, fit criteria, and the founder
// field-story.
//
// Commercial terms corrected 2026-09-02 per the 2026-08-10 consolidated offer
// decision (PLAN-2026-09-02-LSRU-01 WP3):
// - Founding Five = the Done For You tier at the founding rate ($1,250 /
//   $1,250 / $500 per week), half the standard reference pricing ($2,500 /
//   $2,500 / $1,000 per week). It follows the Done With You implementation,
//   which establishes the collected-revenue baseline.
// - Trigger: 10× collected revenue vs the DWY baseline, measured cumulatively
//   since deployment. Week-four assessment; 52-week exclusivity once met.
// - No outcome guarantees of any kind. Third-party costs separate.
// - The superseded model (Tier 2/3 labels, $199/$497 components, $10,000
//   threshold, $4,000 fee) must never render on public pages that read from
//   this module. NOTE: the `terms` export below is legacy (renders on no
//   public page) and is retained only while its consumers are dispositioned;
//   the Founding Five page renders canonical terms from
//   hvac-founding-five/content.ts.
// - The four workflows are ONE system. No partner is sold a single workflow
//   as the complete product.
// - Founder credentials are training/work history, never current licensure.

export const ALLIANCE_APPLY_ROUTE = "/hvac/founding-five#scorecard";

export const ALLIANCE_EVENTS = {
  applyClick: "hvac_alliance_apply_click",
  termsView: "hvac_alliance_terms_view",
  proofStandardView: "hvac_proof_standard_view",
} as const;

export type AllianceEvent = (typeof ALLIANCE_EVENTS)[keyof typeof ALLIANCE_EVENTS];

export const program = {
  systemName: "Revenue Continuity System",
  relationshipName: "Founding Five Tier 2 Pilot",
  cohortName: "Founding Five",
  yearOneCapacity: 21,
  foundingCohortSize: 5,
  headline: "Stop buying more leads before you seal the leaks.",
  coreExplanation:
    "Livingry installs a full Revenue Continuity System around the customers and opportunities your company has already earned: missed calls, dropped estimates, and the customers search engines send your way. We do not sell a loose collection of AI tools. We build the connected follow-through system that keeps value from leaking out between the phone, the office, the estimate, the completed job, and the next customer need.",
  capacityNote:
    "Capacity is deliberately limited to five Founding Five companies because every pilot receives hands-on implementation, monitoring, and weekly reconciliation.",
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
    body: "Booked-job continuity (scope, notes, photos, and approvals carried from office to field) and technician knowledge (approved job history, manuals, and procedures made findable with source visibility) are implemented as part of the system — they are how those workflows hold up in real operations, not separate products.",
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
    "Every claim is tagged to its continuity workflow — or marked not attributable. A dashboard total is not proof.",
} as const;

// Commercial framework. Public and fixed for the Founding Five cohort.
export const terms = {
  heading: "Terms, in plain language",
  assessment: {
    name: "Revenue Continuity Assessment",
    amount: "$199",
    body: "The fixed-scope diagnostic: a live walkthrough of how calls, estimates, and search traffic actually move through the business today, with the findings presented live. Included in the $2,500 pilot — never added to it.",
  },
  tenantIntegration: {
    name: "Livingry Ops Tenant Integration",
    amount: "$497",
    body: "Your company's private tenant inside Livingry Ops — the workflows, ledger, exception desk, and integration layer configured around the tools you already run. Included in the pilot.",
  },
  bundle: {
    name: "Assessment + Tenant Integration bundle",
    amount: "$649",
    body: "The $199 Assessment and $497 Tenant Integration together normally price at $649 as a bundle, or $696 separately. Both are already included in the $2,500 all-in pilot price.",
  },
  pilot: {
    name: "Founding Five Tier 2 Pilot",
    amount: "$2,500 all-in",
    body: "The pilot price includes the $199 Revenue Continuity Assessment, the $497 Livingry Ops Tenant Integration, three foundations — Missed-Call Recovery, Dropped-Estimate Recovery, and Agentic Search Optimization — plus onboarding, training, integration, and setup. Tier 1 value is included, not credited and not added. The pilot is visibly labeled under the Founding Five Cohort Pilot Agreement.",
  },
  nextSixteen: {
    name: "The next 16 clients",
    body: "After the five Founding Five companies, the next 16 clients are priced higher, by scope. The Founding Five price is cohort-limited by design.",
  },
  tier3: {
    name: "Tier 3 (optional)",
    body: "At $1,000/week. The first four weekly cycles are delivered unpaid. A retroactive bill — the accrued four weeks plus a $4,000 related fee — is issued only after a written Recovery Ledger verifies $10,000 in qualifying documented collected recovery within those first four weekly cycles. No portion of Tier 3 is collectible before that ledger verification.",
  },
  noOutcomeGuarantees:
    "Livingry does not guarantee revenue, lead volume, close rates, reviews, or rankings — for any tier, at any price. The written Recovery Ledger is the only basis for threshold-based billing.",
  vendorCosts:
    "Third-party tool, messaging, and telephony costs are opened in the partner's name and paid directly by the partner.",
} as const;

export const recoveryThreshold = {
  heading: "Performance-trigger billing — how it works",
  body: "Collected revenue is tracked weekly against your Done With You baseline. The trigger is 10× collected revenue relative to baseline, measured cumulatively since deployment. Supporting indicators explain why revenue moved but do not trigger billing. At the week-four assessment: if the threshold is met, the final performance-trigger payment and weekly fees are billed retroactively, and the 52-week exclusivity period begins; if it is not met and both parties extend, work continues unbilled under the same terms; if it is not met and there is no extension, the engagement ends at the initial payment with no further obligation.",
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
      body: "We sign the pilot and attribution agreements, map your systems of record, extract baseline data, and define eligibility rules, approved scripts, and escalation paths. No billing threshold clock runs before readiness is signed off.",
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
    "Weekly 30-minute pilot review with your operating owner",
    "Written Recovery Ledger for threshold-based billing",
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
      body: "I spent years as a solo residential contractor in Austin — tools in hand, clients watching, phone buzzing with leads I was paying for and couldn't answer. Thumbtack and HouseCall Pro sent the same leads to my competitors at the same time they sent them to me; I lost jobs I never even knew about. I failed to follow up on estimates in time to close, failed to take the before-and-after pictures, failed to ask for the testimonials, reviews, and referrals. Texas HVAC certification training in 2012, PV solar design-and-install training in 2018 — and probably failed to realize over 30% of my productive capacity, even as a one-man operation.",
    },
    {
      label: "The systems turn",
      body: "I spent the following years building software — business apps, then AI agents and payment infrastructure, including three months as Operations Lead at an open-source AI lab. When I started building seriously with AI, I realized the tools that could have saved my contracting business already exist — unevenly distributed, buried under hype, and locked behind institutional budgets most tradesmen can't touch. In 2019 I published a book on Bitcoin and sovereign financial infrastructure; the through-line has always been systems their owners can actually keep.",
    },
    {
      label: "Why this offer exists",
      body: "Livingry installs the operating system I needed in the field: follow-through that does not depend on memory, a person accountable for every consequential action, and records the company keeps. I don't remove the human from the loop — I make sure the loop doesn't break when the human is in an attic. I built this for the contractor I was at 35.",
    },
  ],
  principle:
    "I seek Win/Win/Win outcomes — for the owners, the employees, and the customers. If that alignment isn't possible, I don't act.",
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
    a: "No. We never promise revenue, lead volume, close rates, reviews, or rankings — at any price. Billing is performance-triggered: collected revenue is measured weekly against your Done With You baseline, and the week-four assessment decides whether the threshold has been met. No outcome is ever guaranteed.",
  },
  {
    q: "What do we pay to start?",
    a: "The Founding Five rate is $1,250 to start, $1,250 as the final performance-trigger payment, and $500 per week after the threshold — half the standard Done For You reference pricing. It follows the Done With You implementation ($2,500 total), which establishes your operating baseline. Direct third-party tool, messaging, and telephony costs are billed separately, in your name.",
  },
  {
    q: "Is there a fee-waiver guarantee?",
    a: "No. Livingry does not offer any fee-waiver guarantee. Billing is performance-triggered: at the week-four assessment, if collected revenue meets the 10× threshold relative to your Done With You baseline, the final payment and weekly fees are billed retroactively and the 52-week exclusivity period begins. If it is not met and both parties extend, work continues unbilled under the same terms; if there is no extension, the engagement ends at the initial payment with no further obligation.",
  },
  {
    q: "Is Client Reactivation included in the pilot?",
    a: "Past-customer reactivation is one of the four Revenue Continuity workflows and is part of the Done With You implementation (the Dead Client Lists system). Missed Calls & Slow Response and Lost Referrals & Reviews are available as standard add-ons to the Done With You implementation.",
  },
  {
    q: "Why is capacity limited?",
    a: "The Founding Five cohort is exactly five HVAC/R companies. Every partner receives hands-on implementation, monitoring, weekly scorecards, and weekly reconciliation.",
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
    a: "Nothing is billed retroactively. At the week-four assessment, if the threshold is not met and both parties extend, work continues unbilled under the same terms; if there is no extension, the engagement ends at the initial payment with no further obligation.",
  },
];
