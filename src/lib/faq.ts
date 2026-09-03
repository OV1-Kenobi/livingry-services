export type FaqItem = { q: string; a: string };
export type FaqSection = { id: string; title: string; blurb?: string; items: FaqItem[] };

// The six questions rendered visibly on the homepage and marked up as FAQPage
// there. Written to be quotable in full by an answer engine, so each answer
// stands alone without the surrounding page. Timing language deliberately
// describes when measurement can begin rather than promising an outcome.
export const homepageFaq: FaqItem[] = [
  {
    q: "What is an AI general contractor for trade businesses?",
    a: "An outside partner who curates, integrates, and governs AI tools across your operation the way a building general contractor hires and coordinates subcontractors. You stay the owner and the decision-maker, and you never have to become an AI expert to get the benefit.",
  },
  {
    q: "Do you sell AI software?",
    a: "No. We integrate AI into the tools you already own — your CRM, inbox, calendar, and field-service software. You hold the accounts, keys, and admin access, and the systems keep running if our engagement ends.",
  },
  {
    q: "Will the AI talk to my customers without me?",
    a: "Only where you have explicitly approved it, with human review for anything a customer will read as a promise. In most implementations AI stays invisible to the customer: it drafts, routes, and summarizes, and your team commits.",
  },
  {
    q: "Which AI tools do you use?",
    a: "It depends on your operation. We are model- and stack-agnostic across frontier hosted, self-hosted, and hybrid setups, and we choose the smallest tool that reliably seals the leak rather than the largest platform available.",
  },
  {
    q: "How long until I see results?",
    a: "Measurement can begin in your first full operating cycle after a system goes live. How quickly change becomes visible depends on your baseline, the quality of your existing data, and the volume moving through that workflow — so we agree on the evidence before we build.",
  },
  {
    q: "I run an HVAC company — what would you actually do for me?",
    a: "Start with a free System Review. In one focused conversation we identify your highest-value leak, name the smallest system that would close it, and tell you what evidence would confirm it is closing. You get the written review whether or not we work together.",
  },
];

export const faqSections: FaqSection[] = [
  {
    id: "company",
    title: "About Livingry Services",
    blurb: "Who we are and what we do.",
    items: [
      { q: "What does Livingry Services do?", a: "Livingry Services helps established HVAC/R companies work the calls, estimates, past customers, and referrals they already paid to create — while keeping people accountable for consequential decisions. We install human-controlled workflows that seal the handoffs where opportunities and operating information routinely leak: after a missed call, after an estimate goes quiet, after the job is done, and when past customers go silent." },
      { q: "What is Revenue Clarity & Capture?", a: "Revenue Clarity & Capture means understanding where opportunities and operating information break down across your handoffs — and then capturing more of the value you already paid or worked to create. The broader category is Revenue & Data Continuity: the opportunity, the information needed to act on it, the responsible person, the approval point, and the record of what happened stay connected from one handoff to the next." },
    ],
  },
  {
    id: "diagnostic",
    title: "The four leaks and the diagnostic",
    blurb: "What is leaking, and how the self-assessment works.",
    items: [
      { q: "What are the four observable leaks?", a: "1. <strong>Missed Calls & Slow Response</strong> — Calls arrive while your team is occupied. Without a capture and routing layer, the caller, reason, urgency, and next step can disappear. 2. <strong>Dropped Estimates</strong> — An estimate that sits with no next date, named owner, or record of what the customer is waiting on. 3. <strong>Dead Client Lists</strong> — Service history that is not usable for recontact. No defined reason, no defined time to reach out again. 4. <strong>Lost Referrals, Reviews & Testimonials</strong> — Completed work that never becomes a photo, review request, testimonial permission, or referral opportunity." },
      { q: "How does the HVAC Cash Flow Leak Diagnostic work?", a: "The HVAC Cash Flow Leak Diagnostic is a 17-point self-assessment. It covers missed calls, dropped estimates, past customers, and lost referrals, reviews, and testimonials. You answer questions about your current handoffs and operating habits. The diagnostic runs entirely in your browser. Nothing you enter is stored or transmitted. Your answers disappear when you close the tab. You receive a directional readout: your likely priority leak, why it ranked first, where the revenue or data handoff breaks, inputs and assumptions, one immediate check, and what requires live validation." },
      { q: "What happens after the diagnostic?", a: "Two practical next steps are available: 1. <strong>Validate This Leak With Michael</strong> — a no-obligation Leak Assessment call. We trace one suspected cash-flow leak from the first trigger to the next broken handoff. You leave with the priority and reasoning whether or not you hire Livingry Services. 2. <strong>Compare Services & Pricing</strong> — see the three standard service options and base prices before any call." },
    ],
  },
  {
    id: "services",
    title: "Services, pricing, and ownership",
    blurb: "Published prices, ownership, and the path to Done For You.",
    items: [
      { q: "What are the service options and what do they cost?", a: "Three standard choices, published openly. <strong>Do It Yourself (DIY): $649 one time.</strong> Assessment and curation plan. Company-branded Livingry Ops web app on your own subdomain. Agentic-search assessment and optimization plan. Lead Readiness and Local Demand Intelligence package. Planning and setup guidance. Your team implements. <strong>Done With You (DWY): $2,500 total.</strong> Everything in DIY, plus two standard leak systems (Dropped Estimates, Dead Client Lists), your trained and branded Company Operating System Agent on your own infrastructure, implementation coordination, live exit testing, a 1–4 week delivery target, and two weeks of post-delivery support (unlimited async plus up to 3 hrs/week live with screen sharing). Payment: $1,249 at signing and $1,251 at exit testing. Prior DIY $649 credited, leaving $1,851 at exit testing. Standard add-ons: Missed Calls & Slow Response $500, Lost Referrals & Reviews $500. Self-hosting custom-quoted. <strong>Done For You (DFY):</strong> requires DWY completion because DWY establishes the baseline. Standard: $2,500 to start, $2,500 final performance-trigger payment, $1,000 per week after the threshold. Founding Five: $1,250 to start, $1,250 final performance-trigger payment, $500 per week after the threshold. The trigger is 10× collected revenue vs. the DWY baseline, measured cumulatively since deployment. At the week-four assessment, three outcomes are possible: threshold met (retroactive billing, 52-week exclusivity begins); threshold not met and extended (continues unbilled); threshold not met and no extension (ends at the initial payment, no further obligation)." },
      { q: "Do I own what is built?", a: "Yes. Livingry Services is structured for a clean handoff. Clients own their critical infrastructure as much as they want to own it. Your identities, credentials, and data remain yours. No proprietary black box, no sandbox lock-in. If you want to bring management in-house later, the path is designed for that. The license for your forked copy of the Company Operating System Agent and Livingry Ops web app is perpetual, non-transferable, and non-revocable. You may not sell or share the code to other companies." },
      { q: "Can I skip to Done For You?", a: "No. Done For You requires Done With You completion because the DWY phase establishes the collected-revenue baseline and leak-category tracking that active management depends on." },
    ],
  },
  {
    id: "ai",
    title: "AI implementation and boundaries",
    blurb: "How AI is used, and where it stops.",
    items: [
      { q: "Does Livingry replace my team?", a: "No. Livingry installs a human-controlled operating layer behind your team's existing tools. The field crew does not need to become AI specialists. The office does not need to surrender judgment. A named person remains responsible for approving consequential action." },
      { q: "What does Livingry not do?", a: "Livingry Services is not a full CRM, dispatcher, invoicing suite, or generic automation canvas. It is not an autonomous pricing, diagnosis, scheduling, negotiation, or customer-service system. It does not guarantee revenue, growth, conversion rate, time savings, or capacity gain." },
      { q: "Is there a guarantee?", a: "No. The diagnostic provides directional findings — not a revenue forecast or promise. The performance-trigger model ties billing to a measured outcome, but no specific result is guaranteed or implied." },
      { q: "How does AI fit into this?", a: "AI is useful when it multiplies the judgment of people who already know their work. In Livingry's model, AI may draft, classify, summarize, organize, and recommend. A named human approves consequential action. The durable product is the queue, approval decision, exception routing, operational policy, timeline, and audit trail — not any particular AI model or vendor." },
      { q: "What about AI discoverability and agent discovery?", a: "The DIY package includes an agentic-search assessment and optimization plan. This examines how your business appears to AI-powered search tools and agent-based workflows, and provides a practical plan for improving your discoverability in those channels. It is not a standalone product or a separate purchase — it is a native part of the DIY package, and your team or web designer implements the plan." },
    ],
  },
  {
    id: "engagement",
    title: "Getting started",
    blurb: "First steps, expansion, and response.",
    items: [
      { q: "How do I get started?", a: "Start with the HVAC Cash Flow Leak Diagnostic. It takes a few minutes, runs in your browser, and gives you a directional readout on your most likely cash-flow leak. Then decide whether to validate it with Michael on a Leak Assessment call." },
      { q: "What about roofing?", a: "Roofing is a planned expansion. Livingry Services is not currently enrolling roofing companies. The current focus is established HVAC/R operators." },
      { q: "How quickly do you respond to inquiries?", a: "We read everything that comes in. Response timing depends on current workload. The Leak Assessment call is the fastest path to a concrete conversation about your operation." },
    ],
  },
];
