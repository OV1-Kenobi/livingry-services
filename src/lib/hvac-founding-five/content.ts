// Single source of truth for the Founding Five HVAC pilot page copy, FAQ,
// structured data, and guardrails. Keeping copy here (rather than only inline
// in the page) lets the visible FAQ, the FAQPage JSON-LD, and the automated
// prohibited-claims tests all read from the same place.

import { site } from "@/lib/site";

export const HVAC_ROUTE = "/hvac/founding-five";
export const HVAC_URL = `${site.primaryDomain}${HVAC_ROUTE}`;

export const FOUNDING_FIVE_CAPACITY = 5;

export const seo = {
  title: "Founding Five HVAC Pilot | Livingry Services",
  description:
    "Livingry is selecting five established U.S. HVAC companies for founder-led, remote implementation of one measurable operational workflow.",
  ogTitle: "One HVAC workflow is costing you more than it should.",
  ogDescription:
    "One workflow. Human-controlled AI. A measured before-and-after implementation for five founding HVAC partners.",
} as const;

// A direct, server-rendered 40–80 word answer placed near the top of the page
// for humans and AI systems. (Word count verified in tests.)
export const directAnswer =
  "The Founding Five HVAC Pilot is a paid, founder-led program in which Livingry Services selects five established U.S. HVAC companies and remotely implements one bounded operational workflow for each. Livingry diagnoses one place where calls, estimates, promises, reviews, or repeat business fall through, redesigns that workflow with human-controlled AI, and measures the result before and after.";

export const hero = {
  eyebrow: "THE LIVINGRY FOUNDING FIVE",
  title: "One HVAC workflow is costing you more than it should.",
  intro:
    "Livingry Services is selecting five established U.S. HVAC companies for founder-led implementations.",
  body: "We identify one place where calls, estimates, customer promises, reviews, or repeat business are falling between the cracks. Then we redesign that workflow, implement the smallest useful correction, and measure what changed.",
  proofStrip:
    "Remote implementation · One workflow · Human-controlled AI · Five founding partners",
  primaryCta: "Request a Private Workflow Review",
  secondaryAnchor: "See how the pilot works",
  noCalendarNote:
    "No public calendar. Qualified companies receive a private workflow observation before a fit call is offered.",
} as const;

export const problem = {
  heading: "The problem is rarely “not enough software.”",
  intro:
    "Most established HVAC companies already have phones, forms, field-service software, office procedures, and capable people. The leaks appear between them:",
  leaks: [
    "An after-hours caller reaches voicemail and receives no accountable next step.",
    "A web inquiry is acknowledged but never clearly owned.",
    "An unsold estimate receives inconsistent follow-up.",
    "A promise made on a call never reaches the responsible person.",
    "A completed job never triggers the right review request.",
    "An existing customer opportunity remains buried in old records.",
  ],
  pullQuote:
    "If the next action depends on one person remembering, it is not yet a dependable workflow.",
} as const;

export const offer = {
  heading: "Five companies. Five workflows. Five measured implementations.",
  intro:
    "Each Founding Five partner chooses one bounded workflow to diagnose, redesign, and implement:",
  workflows: [
    "Missed-call recovery.",
    "New-inquiry response.",
    "Unsold-estimate follow-up.",
    "Promise and next-action extraction.",
    "Completed-job review continuity.",
    "Existing-customer reactivation, when data quality and communication permissions support it.",
  ],
  closer:
    "This is not a replacement of the company’s entire software stack. It is one controlled improvement around a real operating problem.",
} as const;

export const process = {
  heading: "How the pilot works",
  steps: [
    {
      title: "Request a private review.",
      body: "Tell Livingry which repeated workflow causes the most frustration or lost follow-through.",
    },
    {
      title: "Receive a private observation.",
      body: "Livingry researches one externally observable workflow and records a short, company-specific micro-audit.",
    },
    {
      title: "Confirm or correct the hypothesis.",
      body: "If the observation is relevant, a short Pilot Fit Call examines what actually happens inside the operation.",
    },
    {
      title: "Map before and after.",
      body: "Livingry documents the current handoffs, the proposed correction, human approvals, exception handling, and measurement.",
    },
    {
      title: "Implement one workflow.",
      body: "The workflow is built, tested, launched under supervision, and refined.",
    },
    {
      title: "Measure what changed.",
      body: "Both parties compare the agreed baseline and post-launch result. Low-volume workflows may need more than 30 days to evaluate.",
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
    "Private workflow diagnosis.",
    "Current-state workflow map.",
    "Proposed before-and-after map.",
    "Implementation of one bounded workflow.",
    "Human-control and exception rules.",
    "Basic staff orientation.",
    "Baseline and post-implementation measurement.",
    "30 days of monitoring and refinement after supervised launch.",
    "Final before-and-after report.",
  ],
} as const;

export const commitment = {
  heading: "What Livingry needs from you",
  items: [
    "Access to the relevant people, workflow, and software.",
    "One responsible decision-maker.",
    "Accurate baseline information.",
    "Timely review and approval.",
    "Permission to measure the selected workflow.",
    "Permission to tell the story, anonymously if preferred.",
  ],
  note: "No public testimonial or named case study is required.",
} as const;

export const fit = {
  isHeading: "This is likely a fit if",
  is: [
    "The company is an established U.S. HVAC operation.",
    "A decision-maker will participate.",
    "The company has enough recurring volume to observe the workflow.",
    "A repeated operational bottleneck is identifiable.",
    "Remote access and meetings are workable.",
    "The company can begin within 30 days.",
    "The company is willing to measure one process before and after.",
  ],
  isNotHeading: "This is not a fit if",
  isNot: [
    "The goal is free AI advice or a generic chatbot demonstration.",
    "The company wants guaranteed revenue.",
    "Nobody will own the pilot internally.",
    "The company will not provide baseline information or relevant access.",
    "The request is to replace the entire CRM or build unrelated custom software.",
    "The work would require Livingry to perform licensed HVAC services.",
  ],
} as const;

export const founder = {
  heading: "Built from the field outward",
  body: [
    "I have worked as an HVAC technician and independent contractor. I understand what happens when the person solving the customer’s problem must also answer calls, document work, follow up, collect payment, request the review, and remember every unfinished promise.",
    "Livingry builds the operating systems I needed then—not another collection of disconnected tools.",
  ],
  // Approved Proof Matters disclosure, adjacent to the founder copy. Does not
  // imply current licensure; links to the canonical /proof page.
  proofDisclosure:
    "This describes training completed and work done. It is not a claim of current HVAC licensure or presently valid certification.",
  proofLinkLabel: "Read why proof should outlive the institution that issued it",
  proofHref: "/proof",
} as const;

export const pricing = {
  heading: "A paid, bounded pilot",
  body: "Founding Five projects are paid implementation engagements, not free consulting. Qualified companies receive a one-page proposal after the workflow is confirmed. Third-party software and communication usage are disclosed separately.",
  // Gated copy — only rendered when SHOW_HVAC_PILOT_PRICE is explicitly enabled.
  gatedPrice:
    "Founding Five Pilot: $3,500 plus direct third-party usage costs. A 50% payment reserves the position; the remainder is due when the workflow enters supervised production.",
} as const;

export const faq: { q: string; a: string }[] = [
  {
    q: "Is this an AI receptionist?",
    a: "Not necessarily. A missed-call workflow may use voice, text, forms, or existing staff. The pilot selects the smallest useful correction rather than forcing one product.",
  },
  {
    q: "Will Livingry replace our CRM or field-service platform?",
    a: "No. The default is to work around existing systems where reliable access is available. Any limitation is identified before implementation.",
  },
  {
    q: "Does AI communicate with customers without approval?",
    a: "Only within an approved workflow and defined authority. Consequential actions and uncertain cases are routed to a responsible person.",
  },
  {
    q: "Can the work be completed remotely?",
    a: "Yes. The founding program is designed for qualified U.S. HVAC companies able to provide appropriate remote access and participate in remote meetings.",
  },
  {
    q: "Do you guarantee revenue?",
    a: "No. Livingry agrees on a workflow and measurement; it does not promise unsupported revenue outcomes.",
  },
  {
    q: "Do we have to publicly endorse Livingry?",
    a: "No. The pilot requires permission to document the result, but the story may be anonymized.",
  },
  {
    q: "How long does it take?",
    a: "The working target is one week for mapping and baseline confirmation, one week to build and test, one week of supervised operation, and one week for bounded launch. Measurement may continue longer when volume is low.",
  },
  {
    q: "What happens if an integration is not technically possible?",
    a: "The limitation is documented and the parties decide whether to revise the workflow, use an alternative, or stop before unsupported work proceeds.",
  },
];

export const finalCta = {
  heading: "You do not need to commit to an AI transformation.",
  body: "You need to determine whether one costly, repeated workflow can work better than it does today.",
  cta: "Request My Private Review",
  note: "Requests are reviewed before scheduling access is provided.",
} as const;

export const successState = {
  heading: "Your request has been received.",
  body: "Livingry will review your company and the workflow you described. If there appears to be a relevant, externally observable issue, you will receive a private workflow observation or a request for clarification. Scheduling access is provided only after the observation is confirmed as worth discussing.",
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
];

// Copy must not imply current calendar scheduling in this funnel.
export const CALENDAR_PATTERNS: RegExp[] = [
  /calendar\.app\.google/i,
  /calendly\.com/i,
  /cal\.com/i,
  /book a time/i,
  /schedule a call/i,
];

export function findProhibitedClaims(text: string): string[] {
  return PROHIBITED_PATTERNS.filter((p) => p.pattern.test(text)).map((p) => p.label);
}

export function findCalendarReferences(text: string): string[] {
  return CALENDAR_PATTERNS.filter((p) => p.test(text)).map((p) => p.source);
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
    name: "Founding Five HVAC Workflow Implementation Pilot",
    serviceType: "Operational workflow implementation",
    provider: { "@id": `${site.primaryDomain}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Established HVAC companies",
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
