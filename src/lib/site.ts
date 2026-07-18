export const site = {
  name: "Livingry Services",
  tagline: "Systems that stop already-earned value from leaking away.",
  shortDescription:
    "Livingry Services designs and implements the growth, workflow, and AI systems that help useful businesses stop losing the customers, opportunities, knowledge, and trust they have already worked to earn.",
  legalName: "Livingry Services (a practice of OpenAgents Inc)",
  parent: "OpenAgents Inc",
  founded: "2025",
  location: {
    city: "Lecanto",
    region: "Florida",
    country: "United States",
  },
  contact: {
    email: "ov@openagents.com",
    // placeholder — user can add later
    phone: null as string | null,
  },
  // Domain will be swapped once user attaches livingry.services (or chosen)
  primaryDomain: "https://livingry.services",
  // Twitter / social handles — placeholder
  social: {
    x: null as string | null,
    linkedin: null as string | null,
    github: "https://github.com/OpenAgentsInc",
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
      family: "Growth Systems",
    },
    {
      slug: "recovery-systems",
      title: "Recovery Systems",
      leak: "An inspection, consultation, proposal, or estimate goes cold.",
      improves: "More appropriate follow-up and renewed conversations.",
      family: "Growth Systems",
    },
    {
      slug: "customer-continuity",
      title: "Customer Continuity",
      leak: "Existing customers are forgotten until a competitor appears.",
      improves: "Relevant return, renewal, referral, and maintenance opportunities.",
      family: "Growth Systems",
    },
    {
      slug: "discovery-and-trust",
      title: "Discovery & Trust Systems",
      leak: "Services, proof, and differentiators are unclear online or to AI systems.",
      improves: "Better customer understanding and stronger AI and search discovery evidence.",
      family: "Discovery & Trust",
    },
    {
      slug: "knowledge-systems",
      title: "Knowledge Systems",
      leak: "Useful knowledge is trapped in people, inboxes, or documents.",
      improves: "Faster answers, safer reuse, and stronger team continuity.",
      family: "Knowledge & Workflow",
    },
    {
      slug: "workflow-systems",
      title: "Workflow Systems",
      leak: "Teams duplicate work or lose ownership during handoffs.",
      improves: "Clearer responsibility, fewer dropped details, better visibility.",
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
