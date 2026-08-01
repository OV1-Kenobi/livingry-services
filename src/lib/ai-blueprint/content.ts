// Single source of truth for the AI Opportunity Blueprint: the diagnostic
// stage that precedes every Strategic Alliance. Payment flow (enforced in
// tests): the diagnostic and findings call happen first; the company pays
// $799 ONLY if they decide they want the written findings report; the fee
// credits 100% toward a workflow launch scoped at $2,500–$4,500 per the
// company's specific needs; ongoing operational fees are billed in arrears
// only after recovered, attributable revenue has covered 2x those fees.

export const BLUEPRINT_ROUTE = "/operations/hvac/blueprint";

export const BLUEPRINT_EVENTS = {
  pageView: "hvac_blueprint_page_view",
  primaryCtaClick: "hvac_blueprint_primary_cta_click",
  scopeView: "hvac_blueprint_scope_view",
} as const;

export type BlueprintEvent = (typeof BLUEPRINT_EVENTS)[keyof typeof BLUEPRINT_EVENTS];

export const blueprintSeo = {
  title: "AI Opportunity Blueprint for HVAC Companies | Livingry Services",
  description:
    "A fixed-scope diagnostic that maps an HVAC company's core workflows, identifies the highest-return AI opportunities, and delivers a prioritized 90-day implementation roadmap — pay only if you want the findings report, credited in full toward implementation.",
  ogTitle: "See exactly where AI pays for itself in your HVAC business — before you build anything.",
  ogDescription:
    "Workflow mapping and a findings call first. Pay only for the findings report, and every dollar of it credits toward implementation.",
} as const;

export const blueprint = {
  eyebrow: "Livingry Operations · AI Opportunity Blueprint",
  title: "See exactly where AI pays for itself in your business — before you spend a dollar on implementation.",
  lede: "The AI Opportunity Blueprint is a fixed-scope diagnostic for HVAC companies. Livingry maps your core workflows, identifies the three to five highest-return AI opportunities, and walks you through the findings live. If you want the written report — the ranked opportunities, the curated tools, and the 90-day roadmap — it is $799, credited in full toward implementation if you proceed.",
  gcFraming: {
    heading: "No good general contractor starts swinging hammers without a walkthrough and an estimate.",
    body: "The Blueprint is the walkthrough and the estimate. The walkthrough comes first; you pay only if the estimate is worth having in writing.",
  },
  price: "$799",
  priceNote:
    "The findings call comes first — you pay only if you decide you want the written findings report. The $799 covers the report, and any AI sub-contractor or vendor subscriptions your plan calls for are separate, opened in your name, and billed directly to you by those vendors.",
  creditMechanic:
    "100% of the Blueprint fee credits toward your workflow launch if you proceed within four weeks of the findings call. If you were ever going to build, the report is effectively free.",
  launchRangeNote:
    "Workflow-launch engagements are scoped between $2,500 and $4,500 depending on your company's specific needs — as with your own customers, no two operations are identical, so the launch is priced from your Blueprint rather than a flat rate card.",
  gateNote:
    "Billing is weekly. The first four weeks are a gate: the weekly operational fee accrues but is invoiced only if the shared proof ledger shows recovered, attributable revenue covering at least 2x those four weeks of fees by the end of week four. If it does, the accrued fees settle from covered revenue and weekly billing continues in arrears. If it does not — or the relationship is not working — you stop there, owe nothing for those weeks, and keep everything built.",
  exitNote:
    "After the full 12-week test run, if the system has not proven worth it to you, we go our separate ways. You keep everything we built, the documentation, and the knowledge your team gained.",
  primaryCta: "Book My Blueprint Call",
  secondaryCta: "See what the report includes",
} as const;

export const blueprintFlow = {
  heading: "How the Blueprint works",
  steps: [
    {
      n: 1,
      name: "Diagnostic",
      body: "Livingry maps your core workflows — inquiry, estimate, scheduling, field handoff, completion, follow-up — as they actually run today, including the tools and people involved. Five to seven business days.",
    },
    {
      n: 2,
      name: "Findings call",
      body: "A live walkthrough of what the map shows: where the highest-return AI opportunities are, what each is worth in estimated hours and dollars, and what it would take to realize them.",
    },
    {
      n: 3,
      name: "Findings report — $799, your call",
      body: "If the findings are worth acting on, the written report — ranked opportunities, curated tool stack, and a prioritized 90-day roadmap — is $799. If not, you owe nothing and keep what you learned on the call.",
    },
    {
      n: 4,
      name: "Workflow launch — credited in full",
      body: "If you proceed within four weeks of the findings call, the entire $799 credits toward a launch scoped at $2,500–$4,500 for your company's specific configuration.",
    },
    {
      n: 5,
      name: "The four-week gate",
      body: "Weekly fees accrue for the first four weeks but are invoiced only if the proof ledger shows recovered, attributable revenue covering at least 2x them by the end of week four. Covered — the accrued fees settle and weekly billing continues in arrears. Not covered, or the relationship is not working — you stop there, owe nothing, and keep everything built.",
    },
    {
      n: 6,
      name: "The 12-week test run",
      body: "From week five on, weekly fees bill in arrears against the ledger. After the full 12-week run, if the system has not proven worth it to you, we go our separate ways — you keep the build, the documentation, and everything your team learned.",
    },
  ],
} as const;

export const blueprintReport = {
  heading: "What the findings report includes",
  items: [
    {
      name: "Workflow map",
      body: "Your core workflows documented as they actually run today — every handoff, tool, and owner — so the opportunities are grounded in your operation rather than a template.",
    },
    {
      name: "Ranked AI opportunities",
      body: "The three to five highest-return opportunities in your operation, each with an estimated hours-and-dollars impact and the reasoning behind the estimate.",
    },
    {
      name: "Curated tool stack",
      body: "The specific AI sub-contractor tools and vendors matched to each opportunity — cutting through the noise so you act on a plan instead of evaluating products cold.",
    },
    {
      name: "90-day implementation roadmap",
      body: "A prioritized sequence: what to build first, what it costs, what it returns, and what has to be true for each step to work.",
    },
  ],
} as const;

export const blueprintWhy = {
  heading: "Why it works this way",
  points: [
    {
      name: "The call comes before the invoice.",
      body: "You hear the findings before you decide the report is worth $799. There is no version of this where you pay to discover there was nothing to find.",
    },
    {
      name: "The report is the proposal.",
      body: "Nobody buys a serious implementation cold. The report gives you the map, the math, and the plan — and if you build, the build is priced from your own workflows rather than a generic pitch.",
    },
    {
      name: "Every company is scoped, not rate-carded.",
      body: "Your customers do not all get the same job, and neither do ours. Launch pricing ranges from $2,500 to $4,500 because the right scope depends on what the diagnostic actually finds.",
    },
    {
      name: "The ledger pays for the service.",
      body: "The first four weeks are gated: fees accrue but are invoiced only when the proof ledger shows 2x coverage. From there, weekly billing stays in arrears. If the system is not paying for itself, you are not paying for it either.",
    },
  ],
} as const;

// How the Blueprint feeds the Strategic Alliance funnel.
export const blueprintToAlliance = {
  heading: "The Blueprint is how every alliance begins.",
  body: "Founding Five alliances do not start with a sales call. They start with the Blueprint: the diagnostic that maps your workflows, proves where the Revenue Continuity System pays, and scopes the workflow launch. The $799 report fee is the only payment before the launch — and it credits in full when you proceed.",
} as const;

export const blueprintFaq: { q: string; a: string }[] = [
  {
    q: "Do I pay anything before the findings call?",
    a: "No. The diagnostic and the findings call happen first. You pay the $799 only if you decide you want the written findings report — the ranked opportunities, curated tools, and 90-day roadmap.",
  },
  {
    q: "What does the $799 report include?",
    a: "The complete written record of the diagnostic: your workflow map, the three to five ranked AI opportunities with estimated impact, the curated tool stack for each, and a prioritized 90-day implementation roadmap. It is specific enough to execute with any implementation partner, including your own team.",
  },
  {
    q: "What if I do not proceed after the report?",
    a: "You keep the report. If you do proceed within four weeks, 100% of the $799 credits toward your workflow launch.",
  },
  {
    q: "Why is the launch priced as a range instead of a fixed number?",
    a: "Every company's systems, records, and workflows are different — as with your own customers, a fair price depends on the actual job. The launch is scoped between $2,500 and $4,500 based on what your Blueprint finds, never quoted flat for everyone.",
  },
  {
    q: "When do the weekly operational fees actually get billed?",
    a: "Weekly fees accrue from launch but stay unbilled through the first four weeks. At the end of week four, if the shared proof ledger shows recovered, attributable revenue covering at least 2x those accrued fees, they settle from covered revenue and weekly billing continues in arrears. If coverage is not there — or the relationship is not working — you stop and owe nothing for those weeks.",
  },
  {
    q: "What happens after the 12-week test run?",
    a: "If the system has proven itself, weekly service continues in arrears against the ledger. If it has not proven worth it to you, we go our separate ways: you keep everything we built, the full documentation, and the knowledge your team gained.",
  },
  {
    q: "How is this different from the Strategic Alliance?",
    a: "The Blueprint is the diagnostic; the alliance is the launch-and-operate engagement. Every alliance starts with a Blueprint — it is how the Revenue Continuity System gets scoped and priced against your actual workflows before the guarantee period begins.",
  },
  {
    q: "Will you just recommend whatever tools pay you referral fees?",
    a: "Tool curation is documented in the report with the reasoning for each pick. Vendor accounts are opened in your name and billed directly to you; Livingry's incentive is the implementation working, not the subscription count.",
  },
];
