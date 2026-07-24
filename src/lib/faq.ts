export type FaqItem = { q: string; a: string };
export type FaqSection = { id: string; title: string; blurb?: string; items: FaqItem[] };

export const faqSections: FaqSection[] = [
  {
    id: "company",
    title: "About Livingry Services",
    blurb: "Who we are, what we do, and who we work with.",
    items: [
      { q: "What is Livingry Services?", a: "Livingry Services is an independent, AI-native implementation practice that designs and installs growth, workflow, knowledge, and discovery systems inside established businesses. We are based in Lecanto, Florida." },
      { q: "What does Livingry Services actually sell?", a: "We sell implementation. Our engagements produce working response, recovery, continuity, discovery, knowledge, or workflow systems installed inside the client&rsquo;s existing tools — not slide decks, strategy memos, or software subscriptions." },
      { q: "Who are your ideal clients?", a: "Established, useful service businesses and professional practices. HVAC companies are our active focus, roofing companies are our next active vertical, and legal and medical professional practices are in governed pilot development." },
      { q: "Where are you based?", a: "Lecanto, Florida. We work with clients across the United States remotely, with occasional on-site engagements where the work justifies travel." },
      { q: "Is Livingry Services independent?", a: "Yes. Livingry Services is an independent practice, built and delivered by its founder." },
      { q: "How do I contact Livingry Services?", a: "Email ov@livingry.services or submit the System Review form on this website. We reply within one business day." },
    ],
  },
  {
    id: "method",
    title: "The Livingry Leakproofing Framework",
    blurb: "How we work, from first call to installed system.",
    items: [
      { q: "What is the Livingry Leakproofing Framework?", a: "A five-step method: Find what is leaking, Trace where it leaks, Seal the highest-value gap with the smallest useful system, Verify the leak is closing under real conditions, and Keep the business stronger by documenting the system and preserving client control." },
      { q: "What is a &lsquo;leak&rsquo; in your language?", a: "Any place where a business loses customers, opportunities, knowledge, or trust it has already worked to earn. Common leaks include missed calls, cold estimates, forgotten past customers, unclear website information, disorganized intake, and tribal knowledge stuck in individual people." },
      { q: "What is a System Review?", a: "A structured first conversation and observation of your website, response paths, CRM records, customer journey, discovery presence, and internal knowledge. The outcome is a written identification of the highest-value leak, why it occurs, the smallest practical fix, and the evidence that would show whether it is closing." },
      { q: "How long does a System Review take?", a: "The conversation itself is typically 60–90 minutes. The written review is delivered within one to two weeks depending on scope." },
      { q: "Is the System Review free?", a: "Yes, at the initial fit stage. We do not charge for the first System Review because we would rather turn down engagements we cannot help than charge for a report you do not use." },
      { q: "What is a Revenue Recovery Sprint?", a: "A fixed-scope, time-boxed implementation engagement that closes one specific leak — most commonly missed-call recovery, estimate follow-through, or a Discovery & Trust rebuild. Pricing is quoted after the System Review." },
    ],
  },
  {
    id: "ai-implementation",
    title: "AI implementation and boundaries",
    blurb: "How we use AI inside client businesses, and where we refuse to.",
    items: [
      { q: "How does Livingry Services use AI?", a: "AI drafts, routes, summarizes, and prepares work for humans. Humans commit anything a customer, client, or patient will read as a promise. That boundary is written into every implementation." },
      { q: "Will your AI talk to my customers?", a: "Only where clearly disclosed and appropriately supervised. In most implementations, AI is invisible to the customer — it prepares information, suggests responses, and routes work — while your team owns the actual communication." },
      { q: "Do you build chatbots?", a: "A chatbot is a narrow tactic, not a system. We include AI-assisted conversation where it demonstrably helps, but always as part of a broader Response, Recovery, or Discovery system with clear ownership and boundaries." },
      { q: "What AI will you not do?", a: "We will not invent facts, storm damage, urgency, or eligibility. We will not contact customers who have not opted in. We will not automate decisions that require professional judgment. We will not run any workflow whose behavior we cannot fully describe." },
      { q: "Which AI models and tools do you use?", a: "We are model-agnostic and stack-agnostic. Depending on the workflow, privacy requirements, and cost profile, we use frontier hosted models, self-hosted open models, or hybrid setups. We choose the smallest tool that reliably solves the leak." },
      { q: "Where does client data go?", a: "Into the tools you already use — your CRM, your inbox, your calendar — plus, where necessary, an approved AI provider. We document every data flow and, in governed pilots, we design around explicit privacy, retention, and jurisdiction constraints." },
    ],
  },
  {
    id: "agent-discovery",
    title: "Agent discovery and AI SEO",
    blurb: "How we help businesses be found, described, and chosen by AI systems.",
    items: [
      { q: "What is agent discovery?", a: "Agent discovery is the practice of making a business easy for AI answer engines, agents, and modern search tools to find, describe accurately, and recommend appropriately. It overlaps with SEO but focuses on facts, evidence, and verifiability rather than keyword ranking." },
      { q: "Do you guarantee ChatGPT or Perplexity will recommend our business?", a: "No. Be skeptical of anyone who promises they can. We can make your business significantly easier for answer engines to describe accurately and prefer where the evidence supports it — but we do not control any AI system&rsquo;s output." },
      { q: "How is Discovery & Trust different from traditional SEO?", a: "Traditional SEO optimizes for a search engine ranking a page. Discovery & Trust optimizes for the whole path from &lsquo;a person or agent asks about a business like yours&rsquo; to &lsquo;you are described accurately and chosen appropriately.&rsquo; That means clearer facts, verifiable evidence, machine-readable structure, and monitoring what AI systems actually say about you." },
      { q: "What is llms.txt?", a: "An emerging convention that publishes a machine-readable map of a website&rsquo;s key facts and pages for AI crawlers. This site publishes both /llms.txt and /llms-full.txt so agents can find canonical facts about Livingry Services quickly." },
      { q: "Do you use schema.org and structured data?", a: "Yes, on every page. Organization, Service, FAQPage, BreadcrumbList, and HowTo schema are used where appropriate to help both search engines and AI systems parse offerings and facts accurately." },
    ],
  },
  {
    id: "industries",
    title: "Industries",
    blurb: "Where we currently work and how we expand to new verticals.",
    items: [
      { q: "Do you only work with HVAC companies?", a: "No. HVAC is our active implementation focus — the vertical where our systems are most mature. Roofing is our next active market and we are opening founding-partner conversations. Legal and medical professional practices are in governed pilot development." },
      { q: "Can you help my roofing company?", a: "Yes, as a founding partner. We are opening a small number of roofing implementations to harden the Roofing AI Growth System with real-world data. Founding partners get preferred pricing and a heavier hand in shaping the product." },
      { q: "Can you help my law firm?", a: "In governed pilots. Livingry Services does not provide legal advice and is not a law firm. We build operational and information workflows — intake, client communication, knowledge, discovery — with explicit boundaries against practicing law." },
      { q: "Can you help my medical or dental practice?", a: "In governed pilots subject to privacy and compliance controls appropriate to your practice type. We build administrative and information workflows only — never diagnostic, treatment, or clinical automation." },
      { q: "Will you take on my industry?", a: "Reach out. We prioritize verticals where established, useful businesses lose earned value in ways our systems demonstrably close. If we are not the right fit, we will say so clearly." },
    ],
  },
  {
    id: "engagement",
    title: "Working together",
    blurb: "Pricing, ownership, exit, and how the relationship actually works.",
    items: [
      { q: "How is Livingry Services priced?", a: "Most engagements begin with a free System Review. Implementation follows either as a fixed-scope Revenue Recovery Sprint or as a monthly implementation retainer. Pricing is quoted after the System Review, once we know which gap is worth closing first." },
      { q: "Who owns the systems you build?", a: "You do. Content, workflows, integrations, and data live in tools you own. If our relationship ends, the systems keep running without us." },
      { q: "What happens if we want to stop working with you?", a: "You keep everything. We hand off documentation, ownership, and access, and remove ourselves from any accounts we were added to. There are no exit fees or ransomed configurations." },
      { q: "Do you sign NDAs and BAAs?", a: "NDAs, yes, routinely. BAAs (business associate agreements) only where the engagement is a governed medical pilot with the appropriate legal, privacy, and technical scope in place." },
      { q: "How fast can we start?", a: "System Reviews are typically scheduled within one to two weeks. Sprint-scope implementations begin within four to six weeks of a signed agreement, depending on integrations and content-review requirements." },
    ],
  },
];
