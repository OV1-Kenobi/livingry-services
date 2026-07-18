export type IndustryContent = {
  slug: string;
  title: string;
  status: "active" | "next" | "future";
  statusLabel: string;
  eyebrow: string;
  hero: string;
  lede: string;
  gaps: { title: string; body: string }[];
  modules: string[];
  never: string[];
  reviewQuestions: string[];
  faq: { q: string; a: string }[];
  cta: { primary: string };
};

export const industryContents: Record<string, IndustryContent> = {
  hvac: {
    slug: "hvac",
    title: "HVAC Companies",
    status: "active",
    statusLabel: "Active Implementation Focus",
    eyebrow: "Industries · HVAC",
    hero: "Stop good HVAC demand from leaking away when the office gets busy.",
    lede: "Missed calls, delayed follow-up, unreviewed estimates, and quiet past customers all cost work your team already earned. The HVAC AI Growth System closes those gaps with clearer response, recovery, and continuity workflows built around the CRM, calendar, and dispatch tools you already use.",
    gaps: [
      { title: "Missed calls with no useful follow-up",  body: "Every unanswered call is a customer who is already dialing your competitor. We install a defined recovery path — text, callback offer, or after-hours flow — that keeps the customer engaged without pretending you were there." },
      { title: "Slow response to new inquiries",         body: "Web forms and referrals sit until someone happens to notice. Speed-to-lead routing gets the right person a useful summary in minutes, not hours." },
      { title: "Estimates that go cold",                 body: "The estimate went out. Nobody followed up. A calm, appropriate follow-through sequence turns unclosed estimates into a real decision moment." },
      { title: "Maintenance and membership drop-off",    body: "Existing members and past customers are forgotten between seasons. Continuity workflows create relevant reasons to return, renew, refer, and act — without spamming your best customers." },
      { title: "Emergency vs. routine handled the same", body: "A furnace failure in January cannot wait behind a filter-change question. Intake qualification separates the emergency path from the routine one, both for humans and automated triage." },
    ],
    modules: [
      "Missed-call recovery and after-hours handling",
      "Speed-to-lead workflows for web, phone, and referral inquiries",
      "Estimate reactivation and proposal clarifiers",
      "Maintenance and membership continuity",
      "System replacement education and financing FAQs",
      "Service-area and emergency routing",
      "Website inquiry qualification and CRM handoff",
      "Discovery & Trust pages so answer engines describe you accurately",
    ],
    never: [
      "Invent storm damage, pricing, or urgency.",
      "Promise capacity you do not have.",
      "Contact customers who have not opted in.",
      "Make commitments on behalf of your business without human review.",
      "Give medical, legal, or financial advice.",
    ],
    reviewQuestions: [
      "How quickly does a new inquiry receive a useful response?",
      "What happens when the office misses a call?",
      "How are unclosed estimates followed up on?",
      "What percentage of past members are actively contacted each season?",
      "How does an emergency get separated from a routine service call?",
      "What proves your service area, credentials, and pricing to a homeowner or an AI answer engine?",
    ],
    faq: [
      { q: "Do we have to switch CRMs?", a: "No. We integrate with the field-service and CRM tools you already use — Housecall Pro, ServiceTitan, FieldEdge, Jobber, and similar systems — and keep records where your team already looks for them." },
      { q: "How fast can we see revenue impact?", a: "Missed-call recovery and estimate follow-through typically produce measurable results within the first full month. Continuity systems compound more slowly — usually visible by month three." },
      { q: "Will your AI answer customer calls?", a: "Only where clearly disclosed and appropriately supervised. Most of our AI work is invisible to the customer — routing, summarization, and drafting for humans to send." },
      { q: "Do you write our marketing content?", a: "We write the operational content — response sequences, follow-ups, service FAQs, discovery pages — that closes leaks. Broader brand campaign work is not our focus." },
      { q: "How is this priced?", a: "Most engagements begin with a fixed-scope Revenue Recovery Sprint, followed by a monthly implementation retainer. Pricing is quoted after the initial System Review, once we understand which gap is worth closing first." },
    ],
    cta: { primary: "Find My HVAC Revenue Leaks" },
  },
  roofing: {
    slug: "roofing",
    title: "Roofing Companies",
    status: "next",
    statusLabel: "Now Opening Founding-Partner Conversations",
    eyebrow: "Industries · Roofing",
    hero: "Stop roofing opportunities from leaking between inquiry and signed work.",
    lede: "A homeowner can request an inspection, receive an estimate, and still disappear because the path forward was unclear or no one followed up at the right time. The Roofing AI Growth System closes the gaps from first inquiry through inspection, estimate review, insurance-process questions, and customer continuity — while keeping human judgment in charge of anything a homeowner will read as a promise.",
    gaps: [
      { title: "Slow response to inspection requests",   body: "Storm and seasonal demand shows up in waves. Speed-to-lead routing turns first-touch chaos into a defined, human-supervised path — every homeowner hears back before they call the next company." },
      { title: "Estimates left without a clear review path", body: "Roofing decisions are stressful and slow. A calm follow-through — options, timing, financing, insurance boundaries — turns cold estimates into real decisions." },
      { title: "Homeowner confusion about process",     body: "Repair, replacement, insurance, timing, materials, financing — all get conflated. Clear, honest content on your site and in follow-up sequences removes the friction before it kills the sale." },
      { title: "Past customers never asked to refer",   body: "Roofing is inherently referral-heavy. A gentle, opt-in referral and review workflow captures the word-of-mouth that already exists — without turning it into a sales tactic." },
      { title: "Unclear service area and specialties",  body: "AI assistants and search engines cannot recommend you if they cannot verify what you do, where you do it, and what you refuse to do." },
    ],
    modules: [
      "Lead response for inspection requests",
      "Storm and seasonal campaign readiness",
      "Estimate and insurance-process follow-up",
      "Existing-customer referral and maintenance workflows",
      "Service-area and project-type qualification",
      "Project education, FAQ, and proof pages",
      "Website conversion and evidence architecture",
      "Discovery & Trust pages for AI answer engines",
    ],
    never: [
      "Provide insurance or legal advice.",
      "Make coverage or claim-outcome promises.",
      "Invent storm damage, pricing, urgency, or eligibility.",
      "Promise a project outcome we cannot support.",
      "Contact customers who have not opted in.",
    ],
    reviewQuestions: [
      "How quickly does a new inspection inquiry receive a useful response?",
      "What happens when the office misses a call?",
      "Can a homeowner clearly understand inspection, repair, replacement, materials, financing, and insurance boundaries from your site alone?",
      "How are unclosed estimates handled?",
      "What proves your geographic coverage, expertise, reviews, project types, and differentiators?",
      "How is storm-related urgency handled without fabricated claims?",
      "Which existing customers are eligible for referral, maintenance, or review outreach?",
    ],
    faq: [
      { q: "Is this a founding-partner engagement?", a: "For now, yes. We are opening a small number of roofing implementations in 2026 to harden the Roofing AI Growth System with real-world data. Founding partners get lower pricing and a heavier hand in shaping the product." },
      { q: "Do you work with insurance-restoration roofers?", a: "Yes, with appropriate boundaries. We do not give insurance advice, make coverage claims, or invent storm damage. We do help create clearer, faster, human-supervised customer communication around the insurance process." },
      { q: "Which tools do you integrate with?", a: "JobNimbus, AccuLynx, Roofr, HubSpot, and similar tools are common integration targets. We start with whatever you already use and add glue rather than shelfware." },
      { q: "How is this priced?", a: "Most engagements begin with a fixed-scope Inspection-to-Estimate Sprint, followed by a monthly implementation retainer. Founding-partner terms are quoted after the initial System Review." },
    ],
    cta: { primary: "Find My Roofing Growth Leaks" },
  },
  "professional-practices": {
    slug: "professional-practices",
    title: "Professional Practices",
    status: "future",
    statusLabel: "Governed Pilots in Development",
    eyebrow: "Industries · Professional Practices",
    hero: "Practical systems for professional practices — with governance that matches your obligations.",
    lede: "Livingry Services is developing carefully governed Professional Practice implementations for law firms and medical practices. The System Review is available today; broader implementation begins when the required professional review, privacy, and security controls are hardened to a standard we — and you — are willing to defend.",
    gaps: [
      { title: "Intake friction that costs qualified matters", body: "Prospective clients contact a firm, fail to reach the right next step, receive an unclear response, or never complete intake. Governed intake systems remove that friction without touching legal advice." },
      { title: "Client communication bottlenecks",             body: "Attorneys and clinicians spend time on communication a well-designed workflow could handle — with human review still owning anything that requires professional judgment." },
      { title: "Knowledge trapped in individual practitioners", body: "The firm knows the answer. Any individual attorney or clinician may not know that the firm knows it. Governed internal knowledge systems make that knowledge safely reusable." },
      { title: "Discovery information that undersells the firm", body: "Practice areas, jurisdictions, credentials, and outcomes are unclear online. AI assistants and search engines describe firms inaccurately or not at all. Discovery & Trust improvements fix that with facts you approve." },
      { title: "Ungoverned staff use of AI",                   body: "Team members are already using AI tools privately, often on regulated information. A governed alternative — with clear boundaries — is safer than pretending it is not happening." },
    ],
    modules: [
      "Law-firm inquiry and intake workflows (governed)",
      "Client education and information systems",
      "Internal knowledge and document workflows (governed)",
      "Appointment and follow-up coordination",
      "Factual website and Discovery & Trust improvements",
      "Medical practice administrative workflow readiness reviews",
    ],
    never: [
      "Provide legal or medical advice.",
      "Make diagnostic, treatment, or outcome claims.",
      "Handle regulated data without appropriate agreements and controls.",
      "Operate any workflow that requires professional judgment without a licensed reviewer.",
      "Contact clients, patients, or their representatives without appropriate consent.",
    ],
    reviewQuestions: [
      "What is the current path from prospective client / patient first contact to a completed, qualified intake?",
      "Which communications are currently unsupervised, and which are supervised?",
      "Where is professional judgment required, and who owns each decision?",
      "What privacy, security, retention, and jurisdiction requirements apply to your data?",
      "How is AI currently used inside the firm or practice, and by whom?",
      "What would &lsquo;a defensible governed pilot&rsquo; look like to your senior partners or clinical leadership?",
    ],
    faq: [
      { q: "Are you offering legal or medical advice?", a: "No. Livingry Services is not a law firm, is not a medical practice, and provides no legal, medical, diagnostic, or clinical advice. We design operational and information workflows that support professional judgment — never replace it." },
      { q: "Is client or patient data safe?", a: "Only when the engagement is designed around appropriate agreements, storage, access, retention, and jurisdiction controls. If those cannot be met, we do not run the workflow." },
      { q: "When will you take broader engagements?", a: "As governed pilots mature and the required review, privacy, and security controls are proven at the standard we and our partners are willing to defend. For now, the System Review is available; broader implementation is scoped case-by-case." },
      { q: "Do you have professional-services references we can talk to?", a: "Founding-partner references will be introduced privately during the System Review, subject to their consent." },
    ],
    cta: { primary: "Review My Intake Gaps" },
  },
};

export const industrySlugs = Object.keys(industryContents);
