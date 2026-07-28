// Full content for each system family page.
// Written to double as human-readable pages AND rich agent context.

export type SystemContent = {
  slug: string;
  title: string;
  family: string;
  eyebrow: string;
  lede: string;
  problem: string[];
  build: { title: string; body: string }[];
  outcomes: string[];
  boundaries: string[];
  faq: { q: string; a: string }[];
  cta: { primary: string; secondary?: string };
};

export const systemContents: Record<string, SystemContent> = {
  "response-systems": {
    slug: "response-systems",
    title: "Response Systems",
    family: "Growth Systems",
    eyebrow: "Growth Systems · Response",
    lede: "Stop losing customers between the moment they reach out and the moment someone can help them. Response Systems route the right inquiry to the right person or process, quickly and reliably — without asking your team to be faster than the physics of a busy day.",
    problem: [
      "Missed phone calls with no useful follow-up.",
      "Web forms and chats that sit for hours or land in the wrong inbox.",
      "Referrals that arrive without context and get dropped.",
      "After-hours inquiries treated the same as walk-ins.",
      "Emergency and routine requests handled with the same delay.",
    ],
    build: [
      { title: "Missed-call recovery",       body: "Every unanswered call receives a timely, useful next step — a text, a callback offer, or an alternate path — with the office informed and the customer never left silent." },
      { title: "Speed-to-lead workflows",    body: "Website and phone inquiries are routed to a responsible person or process within minutes, with the context they need to respond intelligently." },
      { title: "Intake qualification",       body: "Clear questions capture the details that decide whether an inquiry is emergency, routine, or out-of-scope — before it interrupts a technician or attorney." },
      { title: "After-hours and overflow",   body: "Approved after-hours behavior: what to say, what to schedule, what to escalate, and what to promise — never inventing capacity you do not have." },
      { title: "CRM and inbox integration",  body: "Every inquiry becomes a tracked record in the systems your team already uses — no shadow tools, no lost paper trails." },
    ],
    outcomes: [
      "More qualified conversations reaching the right person.",
      "Higher rate of first-contact useful responses.",
      "Fewer customers lost to the competitor who answered first.",
      "Team members interrupted less often by low-value inquiries.",
    ],
    boundaries: [
      "We do not pretend to be your business or make commitments on its behalf.",
      "We do not contact customers who have not appropriately opted in.",
      "We do not invent urgency, prices, timelines, or eligibility.",
      "We keep a person accountable for anything a customer will read as a promise.",
    ],
    faq: [
      { q: "Do you replace our answering service or reception team?", a: "No. Response Systems complement the people you already have. They cover the gaps around missed calls, after-hours, overflow, and routing — so your team is not asked to be in three places at once." },
      { q: "How is this different from a chatbot?", a: "A chatbot is one narrow tactic. A Response System is the full path from first contact to a responsible next step, including how humans are informed and how records flow into your CRM." },
      { q: "Will you use AI on our customers?", a: "Only where it clearly helps them and only where we can supervise its behavior. We use AI to prepare, summarize, and route — humans stay accountable for commitments." },
    ],
    cta: { primary: "Find My Response Leaks", secondary: "See the Method" },
  },
  "recovery-systems": {
    slug: "recovery-systems",
    title: "Recovery Systems",
    family: "Growth Systems",
    eyebrow: "Growth Systems · Recovery",
    lede: "Every unclosed estimate, unreviewed inspection, and abandoned consultation is money you already paid to earn. Recovery Systems reopen the right conversation at the right time — without becoming spam, and without pretending the customer is someone they are not.",
    problem: [
      "Estimates go out and are never followed up on.",
      "Inspections happen but the customer never hears from you again.",
      "Proposals sit in inboxes with no reminder or clarification.",
      "The team is unsure who owns the follow-up — so no one does.",
      "Old CRM records go untouched because nobody has time to sort them.",
    ],
    build: [
      { title: "Estimate reactivation",     body: "A defined sequence of appropriate touches — with room for pause, decline, or human handoff — that turns cold estimates into a genuine decision moment." },
      { title: "Inspection follow-through", body: "Every inspection gets a review path: findings, recommendations, timing, and a clear invitation to the next appropriate step." },
      { title: "Proposal clarifiers",       body: "Short, useful nudges that answer common questions — financing, insurance boundaries, scheduling — without adding pressure." },
      { title: "Ownership and hand-offs",   body: "One accountable owner per opportunity, visible to the team, escalated when needed, closed when done." },
      { title: "Recovery evidence",         body: "Reporting that shows which recoveries worked, which did not, and where the money is actually coming back from." },
    ],
    outcomes: [
      "Recovered revenue from work you already competed for.",
      "Higher close rates on proposals that would otherwise go cold.",
      "Fewer awkward silences after a homeowner or client walks a lot or reviews a document.",
      "A defensible paper trail of professional, appropriate follow-up.",
    ],
    boundaries: [
      "No sequences that ignore opt-outs, do-not-contact requests, or clear disinterest.",
      "No fake urgency, invented offers, or fabricated storm damage.",
      "No claims about coverage, results, or eligibility we cannot support.",
      "No promises Livingry Services makes on your behalf — the words are yours, reviewed by you.",
    ],
    faq: [
      { q: "How aggressive is your follow-up?", a: "Deliberately less aggressive than most sales sequences. Recovery Systems are designed to be useful — clarifying options, answering common questions, and inviting a real decision — not to badger people until they mute you." },
      { q: "Can this hurt our reputation?", a: "Only if it is designed badly. We design around the customer&apos;s actual next question, respect opt-outs, and route ambiguous responses to a human. That protects reputation better than the do-nothing default of never following up." },
      { q: "Do we own the sequences?", a: "Yes. Content, workflow, and data live in your systems. You can pause, revise, or turn everything off without our involvement." },
    ],
    cta: { primary: "Find My Recovery Leaks", secondary: "See the Method" },
  },
  "customer-continuity": {
    slug: "customer-continuity",
    title: "Customer Continuity Systems",
    family: "Growth Systems",
    eyebrow: "Growth Systems · Continuity",
    lede: "The customers you already served are the cheapest, warmest, most honest opportunity you have. Customer Continuity Systems create relevant reasons to return, renew, and maintain — while respecting the trust that made them a customer in the first place.",
    problem: [
      "Past customers only hear from you when something breaks.",
      "Seasonal maintenance opportunities go unused.",
      "Warranty and renewal windows pass without a timely reminder.",
      "Dormant customers are never given a relevant reason to return.",
      "Loyal customers get poached by the first competitor with a marketing budget.",
    ],
    build: [
      { title: "Maintenance and renewal cadence", body: "Timely, appropriate reminders tied to real service life, warranty windows, and seasonal patterns — not manufactured urgency." },
      { title: "Segmented outreach",              body: "Different messages for different customer histories — new, recurring, dormant, VIP — so no one gets the wrong touch." },
      { title: "Reactivation of dormant records", body: "A careful re-introduction to customers who have not heard from you in a long time, framed as service, not sales." },
      { title: "Repeat-service routing",          body: "When a customer indicates they need work done again, Review & Referral Systems routes the opportunity to the right owner with full service history." },
      { title: "Handoff to your team",            body: "When continuity produces a real conversation, it lands in the hands of a human who can carry it forward, with context." },
    ],
    outcomes: [
      "More repeat revenue from the base you already serve.",
      "A softer, more trustworthy communication rhythm with past customers.",
      "Better data on which customer segments actually respond, and how.",
      "A defensible edge against competitors trying to buy your customers back.",
    ],
    boundaries: [
      "Only opt-in and reasonably-expected communications.",
      "Clear preferences, easy pause, and respected unsubscribes.",
      "No manipulative urgency or invented scarcity.",
      "No AI-generated messages sent without a responsible human owner.",
    ],
    faq: [
      { q: "Isn&apos;t this just email marketing?", a: "Email is one channel. Continuity is a discipline: showing up at the right moment, in the right voice, with something actually useful — across whatever channels your customers actually use." },
      { q: "How is this different from a loyalty program?", a: "Loyalty programs try to buy behavior with points. Continuity Systems earn behavior with usefulness — timely maintenance reminders, honest updates, clear service." },
      { q: "Will you email our whole list?", a: "Only after we can defend the list, the message, and the consent. If any of those are shaky, we help you clean them up first." },
    ],
    cta: { primary: "Find My Continuity Leaks", secondary: "See the Method" },
  },
  "discovery-and-trust": {
    slug: "discovery-and-trust",
    title: "Discovery & Trust Systems",
    family: "Discovery & Trust",
    eyebrow: "Discovery & Trust",
    lede: "Customers now ask AI assistants and answer engines whom to hire and what to choose. Discovery & Trust Systems make your services, evidence, expertise, and customer fit clear and easy to verify — so people and the AI systems working for them can actually understand, trust, and recommend you.",
    problem: [
      "Your services, coverage area, and specialties are unclear online.",
      "Your proof — reviews, credentials, work examples — is scattered or missing.",
      "AI systems and search engines get your basic facts wrong or miss you entirely.",
      "Your website explains less than your team knows.",
      "You have no way to update the story an AI is telling about you.",
    ],
    build: [
      { title: "Clarity of offer",           body: "A page-by-page rewrite of what you do, who you do it for, and why choosing you is reasonable — in the words your customers actually use." },
      { title: "Evidence architecture",      body: "Consistent, verifiable presentation of reviews, licenses, coverage areas, service history, and project proof — so both humans and AI can confirm what you claim." },
      { title: "AI-readable structure",      body: "Schema.org data, FAQ structure, canonical URLs, and machine-friendly summaries so answer engines and AI agents can parse your business without guessing." },
      { title: "Authoritative source pages", body: "The pages you want AI to cite when it describes you — clear, factual, and easy for both humans and machines to verify." },
      { title: "Discovery monitoring",       body: "A recurring check on how AI assistants and search engines describe you, and where their descriptions diverge from what is true." },
    ],
    outcomes: [
      "Clearer customer understanding before the first call.",
      "Stronger, more verifiable evidence for AI systems and answer engines.",
      "Fewer prospective customers lost to unclear information.",
      "A defensible source of truth about your business that you actually control.",
    ],
    boundaries: [
      "We reduce discovery gaps. We do not guarantee AI rankings or citations we do not control.",
      "We publish facts we can defend. We do not manufacture proof, reviews, or credentials.",
      "We improve clarity. We do not manipulate answer engines.",
      "Every fact we publish is one you have approved.",
    ],
    faq: [
      { q: "Is this AI SEO?", a: "It overlaps. But traditional SEO optimizes for keyword rankings; Discovery & Trust Systems optimize for the whole path from &lsquo;a person or agent asks about a business like yours&rsquo; to &lsquo;you are described accurately and chosen appropriately.&rsquo;" },
      { q: "Can you guarantee ChatGPT or Perplexity will recommend us?", a: "No — and be skeptical of anyone who promises they can. We can make you significantly easier to describe accurately, easier to verify, and easier to prefer when the evidence supports it." },
      { q: "Do you need to rebuild our whole website?", a: "Usually not. Most of this work happens inside your existing site — better copy, better structure, better evidence — plus a small number of new pages an AI can cite as authoritative." },
    ],
    cta: { primary: "Find My Discovery Gaps", secondary: "See How AI Finds Businesses" },
  },
  "knowledge-systems": {
    slug: "knowledge-systems",
    title: "Knowledge Systems",
    family: "Knowledge & Workflow",
    eyebrow: "Knowledge & Workflow · Knowledge",
    lede: "Your best knowledge lives in people, inboxes, and old documents — and it leaks out every time a good person leaves, an email is buried, or a tribal answer is given the wrong way. Knowledge Systems turn what your team already knows into information the whole team can safely use.",
    problem: [
      "Answers depend on which person picks up the phone.",
      "New hires take months to become useful.",
      "The same questions get answered dozens of times a week.",
      "Documents exist but no one can find the current version.",
      "AI tools are used privately by staff with no shared oversight.",
    ],
    build: [
      { title: "Trusted knowledge library",      body: "A single, curated source of the answers your team actually needs — sorted by role, task, and customer situation." },
      { title: "Staff-facing knowledge assistant", body: "A safe internal AI assistant grounded in your approved documents — helpful, cite-able, and never freelancing on legal or clinical judgment." },
      { title: "Content review discipline",      body: "Every fact has an owner, a review date, and a way to be corrected — so knowledge stays alive." },
      { title: "Approved external content",      body: "The parts of your knowledge that are safe for customers become clear service pages, FAQs, and follow-ups." },
      { title: "Human-approval design",          body: "Explicit rules about what the assistant can answer directly, what it must escalate, and what it must never touch." },
    ],
    outcomes: [
      "Faster answers for both staff and customers.",
      "Less repeat work and fewer &ldquo;who knows this?&rdquo; interruptions.",
      "Safer, more consistent use of AI inside the team.",
      "New team members reaching usefulness in weeks, not quarters.",
    ],
    boundaries: [
      "No AI answers on regulated topics without required human review.",
      "No storage or use of data you have not approved.",
      "No hidden AI use — every assistant is disclosed and governed.",
      "No lock-in. Content and workflows are portable.",
    ],
    faq: [
      { q: "Can we use this for legal or medical questions?", a: "In governed pilots, yes — with explicit review and approval requirements, restricted topics, and a very clear line about what is and is not the practice&apos;s advice." },
      { q: "Where does the AI actually run?", a: "Depending on your privacy needs, we design for hosted, self-hosted, or hybrid options — and we tell you exactly where each answer originates." },
      { q: "What happens when our knowledge changes?", a: "Owned, reviewed, versioned. The system is only as trustworthy as the review discipline behind it — and we make that discipline lightweight enough to actually happen." },
    ],
    cta: { primary: "Find My Knowledge Gaps", secondary: "See the Method" },
  },
  "workflow-systems": {
    slug: "workflow-systems",
    title: "Workflow Systems",
    family: "Knowledge & Workflow",
    eyebrow: "Knowledge & Workflow · Workflow",
    lede: "Most operational pain is not a missing tool — it is a broken handoff. Workflow Systems coordinate work between people, software, and (where appropriate) AI, so nothing falls through the cracks and the humans stay responsible for the calls that matter.",
    problem: [
      "Nobody owns the handoff between sales, service, and billing.",
      "Details are re-entered into three tools by hand.",
      "Exceptions are handled by whoever happens to notice.",
      "Managers cannot see status without asking around.",
      "Automation is added tool by tool, without any picture of the whole flow.",
    ],
    build: [
      { title: "End-to-end journey map",  body: "A shared, honest picture of how a customer or client moves through your business today — the good, the workaround, and the leak." },
      { title: "Ownership and escalation", body: "Who owns each step, who is notified on delay, and who steps in when something is stuck." },
      { title: "Human-approved automation", body: "Automations for the routine parts of a workflow, with explicit human checkpoints where judgment is needed." },
      { title: "Reporting and evidence",   body: "Simple, defensible reporting on cycle times, exceptions, and outcomes — visible to the people responsible for them." },
      { title: "Change discipline",        body: "A quiet, predictable way to change workflows without breaking the business — because they will change." },
    ],
    outcomes: [
      "Fewer dropped details and rework loops.",
      "Clearer ownership of every step.",
      "Better visibility for managers without another dashboard nobody opens.",
      "Automation that saves time without hiding responsibility.",
    ],
    boundaries: [
      "No automation of decisions that require professional judgment.",
      "No hidden steps. Every workflow is documented.",
      "No dependency on us to keep the workflow running.",
      "No changes that violate professional, legal, or compliance requirements you already carry.",
    ],
    faq: [
      { q: "Do we have to rip out our current tools?", a: "Almost never. Workflow Systems work with the CRMs, field-service tools, calendars, and inboxes you already use. We add glue, not shelfware." },
      { q: "Will automation replace jobs?", a: "That is not the goal, and it is not what a healthy Workflow System produces. The goal is fewer wasted hours from your existing people so they can do the work that actually needs their judgment." },
      { q: "How do we know the workflow is really working?", a: "Because we agree upfront on the evidence — response time, cycle time, missed handoff count, exception rate — and we report against it plainly." },
    ],
    cta: { primary: "Find My Workflow Gaps", secondary: "See the Method" },
  },
  "tradeops-layer": {
    slug: "tradeops-layer",
    title: "TradeOps Layer",
    family: "Knowledge & Workflow",
    eyebrow: "Knowledge & Workflow · TradeOps",
    lede: "Livingry TradeOps is the AI operations layer that stops completed jobs, customer trust, technician time, and follow-up revenue from leaking away — built as a vendor-agnostic core with interchangeable adapters for Jobber, ServiceTitan, Housecall Pro, Ela, spreadsheets, email, or web forms, not as an Ela-dependent product or a one-off automation.",
    problem: [
      "Leads sit unanswered while the office is busy with the job in front of them.",
      "Jobs get dispatched before required photos, credentials, or access notes are confirmed.",
      "Completed work never turns into a clean packet — parts, notes, photos, and recommendations stay scattered.",
      "Reviews, maintenance offers, and referral requests get triggered off a raw status flag instead of a verified, complaint-free completion.",
      "Uncertain or risky situations — safety concerns, missing credentials, insurance language, price discrepancies — have no single queue, so they get missed or handled inconsistently.",
    ],
    build: [
      { title: "Canonical job events", body: "Every webhook from Ela, Jobber, ServiceTitan, Housecall Pro, a spreadsheet, or a web form is normalized into one common event and data model — customer, property, job, asset, estimate, credential, evidence, exception, opportunity — so the same workflow logic runs regardless of source system." },
      { title: "n8n orchestration core", body: "Small, single-purpose n8n workflows (not one giant canvas) handle event intake, identity resolution, AI extraction, policy gates, human approval, system writes, communications, and exception routing — each with its own audit trail." },
      { title: "Human approval model", body: "Four automation levels — Observe, Draft, Bounded Execute, Escalate — gate every action. Clients start in shadow mode and only advance to autonomous execution after measured accuracy and explicit approval." },
      { title: "Exception Desk", body: "Safety concerns, missing credentials, price discrepancies, complaints, insurance language, missing evidence, and low-confidence AI outputs all route to one queue with a defined owner and escalation path — instead of falling through separate cracks." },
      { title: "Trade packs", body: "The HVAC/R Pack adds equipment records, EPA Section 608 credential verification, refrigerant documentation, and maintenance-plan triggers. The Roofing Pack adds inspection evidence chains, storm-event tracking, production milestones, and a configurable insurance-language guardrail." },
      { title: "Leak dashboard", body: "One operator view built around leaks, not generic activity — unanswered leads, jobs blocked by missing evidence, unsold estimates without a next action, completed jobs that never entered the review workflow, and overdue exceptions." },
    ],
    outcomes: [
      "Faster, more consistent response to every lead regardless of which system or channel it arrived through.",
      "Jobs that reach the field with the credentials, evidence, and access information they need — or a flagged exception instead of a silent gap.",
      "Completion packets, maintenance offers, and review requests that trigger off verified, complaint-free job states.",
      "A defensible audit trail for every AI-assisted decision and every human approval.",
      "A system that keeps working if a client changes field-service software, or never adopts one at all.",
    ],
    boundaries: [
      "AI may summarize, classify, extract, draft, and recommend — it may not diagnose conclusively, promise insurance coverage, guarantee arrival times, approve discounts, or bind the company.",
      "Credentials are read from verified records only. The system never infers that a technician is legally qualified from job history alone.",
      "Insurance-related language is blocked or routed to an authorized, counsel-approved process by default — never left to an LLM to interpret dynamically.",
      "Review requests cannot bypass an unresolved complaint or skip quality-control approval.",
      "Ela, or any single vendor, remains an optional adapter. It is never allowed to become the system of record.",
    ],
    faq: [
      { q: "Do we have to use Ela, or a specific CRM, for this to work?", a: "No. TradeOps is built with interchangeable adapters. If you already run Jobber, ServiceTitan, Housecall Pro, or another field-service platform, we build automation around it. If you want a general admin assistant, we connect Ela where it genuinely helps. If you have no usable system, we deploy a lightweight database with n8n and Brevo — without forcing a migration." },
      { q: "What happens to our data if we remove one of the adapters later?", a: "Removing any single adapter, including Ela, should never break the normalized workflow core. That is one of our acceptance criteria before any client goes live, and clients can export their operational data at any time." },
      { q: "How much does AI act on its own?", a: "Almost none, at first. Every client starts in Observe or Draft mode. Workflows only advance to bounded autonomous execution after we measure accuracy on that specific workflow and you explicitly approve it. Safety, credential, complaint, and insurance-related cases always require a human." },
      { q: "Is this specific to HVAC and roofing?", a: "The TradeOps Core — intake, job readiness, completion packets, continuity, and the Exception Desk — is shared across trades. HVAC/R and Roofing are the first two trade packs built on top of it, because refrigerant compliance and storm/insurance workflows each need their own guardrails." },
      { q: "How is this priced?", a: "Engagements begin with a TradeOps Diagnostic — a 7–10 business day workflow map, integration inventory, and revenue-leak register — followed by a scoped TradeOps Launch and, for ongoing clients, Managed Optimization. Pricing is quoted after the Diagnostic, once we know which leak is worth closing first." },
    ],
    cta: { primary: "Find My TradeOps Leaks", secondary: "See the Method" },
  },
  "review-and-referral-systems": {
    slug: "review-and-referral-systems",
    title: "Review & Referral Systems",
    family: "Growth & Trust Systems",
    eyebrow: "Growth & Trust Systems · Review & Referral",
    lede: "Good work creates value after the job is finished — but only if the business captures it responsibly. Review & Referral Systems turn verified delivery into approved proof, warm introductions, and stronger discovery evidence, while routing unresolved concerns to a human before any public request is made.",
    problem: [
      "Successful jobs close without an intentional feedback step.",
      "Reviews arrive inconsistently and are disconnected from the service record.",
      "Referrals lack context, attribution, permission, or a responsible owner.",
      "Proof stays trapped in inboxes, field-service records, and individual conversations.",
      "Dissatisfied customers receive automated review requests instead of human resolution.",
      "SEO and AI-discovery pages lack current, verifiable evidence from real delivery.",
    ],
    build: [
      { title: "Completion eligibility gate", body: "Confirms the job is complete and checks complaints, callbacks, disputes, safety, billing, and consent before outreach." },
      { title: "Feedback and service-recovery path", body: "Gives customers a clear private response path and routes concerns to an accountable person." },
      { title: "Review request workflow", body: "Sends a timely, neutral, human-approved request to the appropriate review destination." },
      { title: "Referral capture and attribution", body: "Captures permission, relationship, need, source, and ownership before routing the introduction." },
      { title: "Proof approval ledger", body: "Stores exact approved language, evidence, usage permission, related service, and re-verification status." },
      { title: "Discovery handoff", body: "Gives Discovery & Trust Systems approved evidence for pages, structured data, and answer-engine source material." },
      { title: "Closed-loop reporting", body: "Reports eligible completions, requests, responses, approved proof, referrals, service-recovery cases, and downstream outcomes." },
    ],
    outcomes: [
      "More completed jobs converted into approved trust assets.",
      "More referred prospects reaching a responsible person with context.",
      "Better attribution between delivered work and new opportunities.",
      "Stronger evidence for local search, SEO, and agentic discovery.",
      "Fewer reputation-damaging requests sent during unresolved service issues.",
      "A measurable loop from delivery to proof to discovery to new demand.",
    ],
    boundaries: [
      "No fabricated reviews, ratings, testimonials, credentials, or customer language.",
      "No review gating based on predicted sentiment or requested star rating.",
      "No undisclosed incentives or manipulative scripts.",
      "No outreach to customers without an appropriate permission basis.",
      "No public use of customer content without approval.",
      "No referred prospect added to broad marketing without their own permission.",
      "No automation may suppress, hide, or privately bury a legitimate complaint.",
      "A human owns every service-recovery case and every public-proof approval.",
    ],
    faq: [
      { q: "Is this reputation management?", a: "It includes reputation safeguards, but it is broader. It connects verified delivery to feedback, service recovery, reviews, referrals, proof approval, CRM routing, and discovery evidence." },
      { q: "Do you ask only happy customers for reviews?", a: "No. The workflow checks whether the work is complete and whether an unresolved issue requires human attention. It does not manipulate review platforms by screening customers for a desired rating." },
      { q: "Can reviews help AI assistants find and recommend the business?", a: "Reviews alone are not enough, but approved, attributable proof strengthens the evidence Discovery & Trust Systems can structure and publish for people, search engines, answer engines, and AI agents." },
      { q: "What happens when a customer is unhappy?", a: "The public request stops. A human-owned service-recovery case opens with the relevant job context and an observable resolution trail." },
    ],
    cta: { primary: "Find My Review & Referral Leaks", secondary: "See the Completed-Job-to-Proof Workflow" },
  },
};

export const systemSlugs = Object.keys(systemContents);
