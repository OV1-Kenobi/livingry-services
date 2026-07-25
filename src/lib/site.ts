export const site = {
  name: "Livingry Services",
  tagline: "Systems that stop already-earned value from leaking away.",
  shortDescription:
    "Livingry Services designs and implements the growth, workflow, and AI systems that help useful businesses stop losing the customers, opportunities, knowledge, and trust they have already worked to earn.",
  legalName: "Livingry Services",
  founded: "2025",
  location: {
    city: "Lecanto",
    region: "Florida",
    country: "United States",
  },
  contact: {
    email: "ov@livingry.services",
    // placeholder — user can add later
    phone: null as string | null,
  },
  // Primary CTA target — Google Calendar Appointment Schedule.
  // Every "Find My Biggest Leak" / "Book a Leak Assessment" button ultimately points here.
  booking: {
    url: "https://calendar.app.google/4UfTY4vavUc7iQBT6",
    label: "Book a Leak Assessment",
    // Short reassurance shown under booking CTAs — deliberately neutral about length,
    // because the length lives on the Google booking page itself.
    reassurance: "Live conversation. No sales pressure. If we are not the right fit, we say so.",
  },
  // Domain will be swapped once user attaches livingry.services (or chosen)
  primaryDomain: "https://livingry.services",
  // Twitter / social handles — placeholder
  social: {
    x: null as string | null,
    linkedin: null as string | null,
    github: null as string | null,
  },
  // The buyer-facing access point. "AI general contractor" is the frame; the
  // Leakproofing Framework below is the proof of how the work actually happens.
  positioning: {
    headline: "Stop earning revenue you keep walking away from.",
    subhead: "We are the AI general contractor for trade and professional practices.",
    definition:
      "An AI general contractor curates, integrates, and governs the AI tools across a business's operation the way a building general contractor hires and coordinates subcontractors — the owner never has to learn the trade themselves, and one party stays accountable for the result.",
  },
  method: [
    { n: "01", name: "Find",   blurb: "Identify the leads, customers, knowledge, and trust already leaking away." },
    { n: "02", name: "Trace",  blurb: "Map exactly where the customer journey, workflow, or information path breaks down." },
    { n: "03", name: "Seal",   blurb: "Build the smallest useful system to close the highest-value gap." },
    { n: "04", name: "Verify", blurb: "Test the workflow, content, handoff, or discovery improvement under real conditions." },
    { n: "05", name: "Keep",   blurb: "Measure what is being retained and leave your team in control of the system." },
  ],
  systemFamilies: [
    {
      slug: "response-systems",
      title: "Response Systems",
      leak: "A call, form, chat, or referral goes unanswered.",
      improves: "Faster useful response and better routing.",
      aiGc:
        "We curate the after-hours answering path, voicemail-to-text or AI receptionist, lead-routing rules, and the CRM handoff that fit your operation — then write the limits on what the AI is allowed to say.",
      family: "Growth Systems",
    },
    {
      slug: "recovery-systems",
      title: "Recovery Systems",
      leak: "An inspection, consultation, proposal, or estimate goes cold.",
      improves: "More appropriate follow-up and renewed conversations.",
      aiGc:
        "We select and wire the reactivation tooling that reads your estimate records and drafts the right nudge at the right interval — with a person approving anything before it reaches a customer.",
      family: "Growth Systems",
    },
    {
      slug: "customer-continuity",
      title: "Customer Continuity",
      leak: "Existing customers are forgotten until a competitor appears.",
      improves: "Relevant return, renewal, referral, and maintenance opportunities.",
      aiGc:
        "We choose and sequence the maintenance, warranty, and replacement-eligibility tooling against your own service history, so cadence comes from what you actually installed and when — not a generic drip template.",
      family: "Growth Systems",
    },
    {
      slug: "discovery-and-trust",
      title: "Discovery & Trust Systems",
      leak: "Services, proof, and differentiators are unclear online or to AI systems.",
      improves: "Better customer understanding and stronger AI and search discovery evidence.",
      aiGc:
        "We build the AI-readable layer — structured data, llms.txt, canonical facts, and answerable FAQ structure — so answer engines describe your services accurately, then monitor what they actually say about you.",
      family: "Discovery & Trust",
    },
    {
      slug: "knowledge-systems",
      title: "Knowledge Systems",
      leak: "Useful knowledge is trapped in people, inboxes, or documents.",
      improves: "Faster answers, safer reuse, and stronger team continuity.",
      aiGc:
        "We evaluate and install the retrieval layer over the documents and threads you already have, scoped so each role only surfaces what it should — knowledge your team can ask for instead of a wiki nobody updates.",
      family: "Knowledge & Workflow",
    },
    {
      slug: "workflow-systems",
      title: "Workflow Systems",
      leak: "Teams duplicate work or lose ownership during handoffs.",
      improves: "Clearer responsibility, fewer dropped details, better visibility.",
      aiGc:
        "We pick the automation and handoff tooling that fits the software you already run, wiring in named ownership and exception alerts so work cannot silently stall between two people who each think the other has it.",
      family: "Knowledge & Workflow",
    },
    {
      slug: "tradeops-layer",
      title: "TradeOps Layer",
      leak: "Completed jobs, technician records, estimates, and reviews leak between whatever software a trade business already runs.",
      improves: "One vendor-agnostic operations layer — canonical job events, policy gates, human approval, and leak dashboards — built around Jobber, ServiceTitan, Housecall Pro, Ela, spreadsheets, or none of the above.",
      aiGc:
        "We act as the integrator across whatever field-service, accounting, and scheduling software you already run — normalizing job events into one record, adding policy gates and human approval, and keeping the operations layer portable if you change vendors.",
      family: "Knowledge & Workflow",
    },
  ],
  industries: [
    {
      slug: "hvac",
      title: "HVAC Companies",
      status: "active",
      statusLabel: "Active Implementation Focus",
      promise:
        "Recover missed calls, revive appropriate estimates, improve seasonal customer continuity, and give office teams faster, clearer ways to route real demand.",
      cta: "Find My HVAC Revenue Leaks",
    },
    {
      slug: "roofing",
      title: "Roofing Companies",
      status: "next",
      statusLabel: "Now Opening Founding-Partner Conversations",
      promise:
        "Turn storm-season and homeowner interest into timely, well-routed conversations — with clearer service information, stronger inspection follow-up, and better continuity from first inquiry through estimate review.",
      cta: "Find My Roofing Growth Leaks",
    },
    {
      slug: "professional-practices",
      title: "Professional Practices",
      status: "future",
      statusLabel: "Governed Pilots in Development",
      promise:
        "For established firms and practices that need better intake, knowledge, client communication, and discovery — implemented with appropriate professional, privacy, and security controls.",
      cta: "Review My Intake Gaps",
    },
  ],
} as const;

export type Industry = (typeof site.industries)[number];
export type SystemFamily = (typeof site.systemFamilies)[number];
