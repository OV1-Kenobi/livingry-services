// Single source of truth for the HVAC Operations landing page
// (/operations/hvac): copy, engagement formats, event names, and SEO.
// Keeping copy here (rather than only inline in the page) lets the visible
// content, the JSON-LD, and automated content tests all read from one place.

export const HVAC_OPS_ROUTE = "/operations/hvac";

export const HVAC_OPS_EVENTS = {
  pageView: "hvac_ops_page_view",
  heroPrimaryCtaClick: "hvac_ops_hero_primary_cta_click",
  heroSecondaryCtaClick: "hvac_ops_hero_secondary_cta_click",
  leakMapView: "hvac_ops_leak_map_view",
  tradeopsView: "hvac_ops_tradeops_view",
  intakeClick: "hvac_ops_intake_click",
  fitConversationClick: "hvac_ops_fit_conversation_click",
} as const;

export type HvacOpsEvent = (typeof HVAC_OPS_EVENTS)[keyof typeof HVAC_OPS_EVENTS];

export const seo = {
  title: "HVAC Operations Systems | Livingry Services",
  description:
    "Livingry helps HVAC companies reduce lost inquiries, dormant estimates, broken job handoffs, and customer continuity gaps across the tools they already use.",
  ogTitle: "HVAC Operations Systems That Keep Work From Slipping Away",
  ogDescription:
    "Map, trace, and repair operational leaks across inquiries, estimates, jobs, field handoffs, and customer continuity — without a forced platform migration.",
} as const;

export const hero = {
  eyebrow: "Livingry Operations · HVAC/R Revenue Continuity",
  title:
    "Most HVAC companies don't have a lead problem. They have a follow-up problem.",
  lede: "Revenue leaks through four cracks: missed calls nobody returns, estimates that go quiet, past customers who never hear from you again, and referrals nobody asks for. Livingry installs the Revenue Continuity System — four connected workflows, human approval on every consequential action — around the customers you've already earned.",
  trustLine:
    "Every alliance begins with the Founding Five scorecard: 15 minutes, five leak sources, and a score that shows where revenue is escaping — then a fixed-price pilot behind a shared proof ledger.",
  primaryCta: "Apply for a Strategic Alliance",
  secondaryCta: "See the Founding Five Path",
} as const;

// The job-lifecycle stages shown in the hero flow map. The point of the visual
// is that risk concentrates at the handoffs between stages — the arrows — not
// inside any single tool.
export const lifecycleStages = [
  "Inquiry",
  "Response",
  "Estimate",
  "Booked Job",
  "Field Handoff",
  "Completion",
  "Customer Continuity",
] as const;

export const problem = {
  heading: "Your software may work. The handoffs between it may not.",
  intro:
    "Most operational loss does not begin with a missing app. It begins when an inquiry is not answered clearly, an estimate is not followed up appropriately, a booked job loses context, or a customer disappears after the invoice is paid.",
  stages: [
    {
      stage: "Inquiry",
      leak: "A call, web form, text, or referral gets no useful response.",
      focus: "Response accountability and routing.",
    },
    {
      stage: "Estimate",
      leak: "A viable repair or replacement proposal goes dormant.",
      focus: "Recovery policies and approved follow-up.",
    },
    {
      stage: "Booked job",
      leak: "Office commitments do not arrive clearly with the field team.",
      focus: "Scope, context, notes, and decision handoff.",
    },
    {
      stage: "Field completion",
      leak: "Photos, job notes, warranty steps, and customer obligations are scattered.",
      focus: "Completion controls and record continuity.",
    },
    {
      stage: "Payment and review",
      leak: "A successful job ends without a clear next action.",
      focus: "Customer communication, review request, and issue capture.",
    },
    {
      stage: "Maintenance",
      leak: "Existing customers do not receive timely service, renewal, or replacement follow-up.",
      focus: "Customer continuity and lifecycle triggers.",
    },
  ],
} as const;

export const tradeops = {
  heading: "An operations layer — not another system of record.",
  intro:
    "Livingry works around the systems your team already depends on. The goal is not to replace every tool. The goal is to make handoffs visible, policies explicit, and responsibility clear.",
  // Category labels only — no vendor names in the diagram.
  sourceTools: [
    "Field-service platform",
    "Phone system",
    "Estimate tool",
    "Shared inbox",
    "Spreadsheets",
    "Customer records",
  ],
  components: [
    {
      name: "Canonical events",
      body: "A shared view of what happened: inquiry received, contact attempted, estimate sent, job booked, work completed, payment status changed, review requested, maintenance due.",
    },
    {
      name: "Policy gates",
      body: "Clear rules for what must be present before work moves forward, such as confirmed scope, customer approval, technician context, or required closeout items.",
    },
    {
      name: "Human approvals",
      body: "People retain responsibility for consequential customer decisions. Automation can surface, prepare, route, and remind; it does not replace accountable judgment.",
    },
    {
      name: "Leak dashboards",
      body: "A practical way to see where response, recovery, handoff, or continuity is breaking down before the loss becomes invisible.",
    },
  ],
  outcome: "Clearer customer and team handoffs",
} as const;

export const firstSystems = {
  heading: "Start where value is already escaping.",
  modules: [
    {
      name: "Missed-demand recovery",
      outcome:
        "Find inquiries that did not receive a clear next step, then build a human-accountable response path.",
      designed:
        "Intake states, routing rules, response standards, and visibility into anything left unowned.",
    },
    {
      name: "Estimate recovery",
      outcome:
        "Identify appropriate follow-up for estimates, inspections, repair recommendations, and replacement decisions that went quiet.",
      designed:
        "Dormant-estimate triggers, approved message paths, and a person approving anything a customer receives.",
    },
    {
      name: "Booked-job continuity",
      outcome:
        "Carry scope, customer expectations, notes, photos, approvals, and known constraints from the office to the field team.",
      designed:
        "A defined handoff packet and the policy gates that stop a job from moving forward without it.",
    },
    {
      name: "Customer continuity",
      outcome:
        "Create accountable follow-up after completion: maintenance reminders, renewal opportunities, review requests, referrals, and appropriate replacement timing.",
      designed:
        "Lifecycle triggers from your own service history, with cadence and messaging your team controls.",
    },
    {
      name: "Technician knowledge",
      outcome:
        "Make approved job history, manuals, procedures, and team knowledge easier to find without hiding the source or removing human responsibility.",
      designed:
        "A scoped retrieval layer over records you already have, with source visibility on every answer.",
    },
  ],
} as const;

// The five-stage method with the tangible output each stage produces.
export const methodOutputs = [
  { name: "Find", output: "Initial leak map and baseline" },
  { name: "Trace", output: "Event and handoff map" },
  { name: "Seal", output: "Configured workflow, policy, or operating control" },
  { name: "Verify", output: "Review of operating evidence and exceptions" },
  { name: "Keep", output: "Ownership handoff, documentation, and next-cycle plan" },
] as const;

export const engagement = {
  heading: "Begin with one operational leak.",
  intro:
    "Three ways to start, depending on how much of the leak you can already name.",
  offers: [
    {
      name: "HVAC Leak Review",
      outcome: "Identify the most meaningful operational loss worth addressing first.",
      deliverables: [
        "Current-state leak map",
        "Baseline and evidence review",
        "Prioritized first-system recommendation",
        "Clear scope for next implementation work",
      ],
    },
    {
      name: "Recovery Sprint",
      outcome:
        "Build a governed response or recovery system for a defined lost-value problem.",
      deliverables: [
        "Missed inquiry response",
        "Dormant estimate follow-up",
        "After-hours continuity",
        "Service-agreement renewal",
        "Review and referral request flow",
      ],
      deliverableLabel: "Possible scope",
    },
    {
      name: "TradeOps Foundation",
      outcome:
        "Establish the initial cross-tool coordination layer around one or more critical job events.",
      deliverables: [
        "Event taxonomy",
        "Ownership and approval model",
        "Data and tool map",
        "Operating dashboard baseline",
        "Documentation and handoff",
      ],
    },
  ],
  qualification:
    "Best suited to established HVAC teams with enough inquiry, estimate, service, installation, or maintenance activity to measure where continuity is breaking down.",
} as const;

export const ownership = {
  heading: "Your tools. Your records. Your accountability.",
  points: [
    "Work around the systems your company already uses",
    "Keep customer and operating records accessible to the company",
    "Document the logic behind workflows and approvals",
    "Keep human responsibility visible where customer commitments matter",
    "Avoid hidden black-box automation",
  ],
} as const;

export const foundingFive = {
  heading: "Start with the scorecard. Earn the pilot.",
  body: "Every engagement begins with the Founding Five scorecard: 15 minutes, five leak sources, and a score that shows where revenue is escaping. Founding Five pilot partners keep the $2,500 all-in pilot price, and Tier 3, if added, is $1,000/week: the first four weekly cycles are delivered unpaid, with retroactive billing only after a written Recovery Ledger verifies $10,000 in qualifying documented collected recovery within those cycles.",
  primaryCta: "Apply for a Strategic Alliance",
  secondaryCta: "See the Founding Five Path",
  qualification:
    "For established U.S. HVAC/R operators with the records, capacity, and an accountable internal operator to run a measured system.",
} as const;
