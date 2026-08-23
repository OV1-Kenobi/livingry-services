import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Breadcrumbs, EndCta } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";
import { JsonLd } from "@/components/JsonLd";
import { IllustrativeImage } from "@/components/IllustrativeImage";
import { aiForHvacCompanies as article } from "@/lib/insights";

export const metadata: Metadata = {
  title: article.seoTitle,
  description: article.description,
  alternates: { canonical: article.path },
  openGraph: {
    title: article.seoTitle,
    description: article.description,
    url: article.path,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.published,
    images: [{ url: article.ogImage, width: 1200, height: 630, alt: article.heroAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: article.seoTitle,
    description: article.description,
    images: [article.ogImage],
  },
  keywords: [...article.keywords],
};

const url = `${site.primaryDomain}${article.path}`;

// External citation. Every source in this guide is a primary document — a
// regulator, a standards body, a published survey, or the vendor's own product
// page — so the label is the publisher, not a bare URL that would wrap badly.
function Cite({ sources }: { sources: readonly (readonly [string, string])[] }) {
  return (
    <>
      {" ("}
      {sources.map(([label, href], i) => (
        <span key={href}>
          {i > 0 && ", "}
          <a className="link" href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </span>
      ))}
      {")"}
    </>
  );
}

const src = {
  jobber: ["Jobber", "https://www.getjobber.com/home-service-trends-report/"],
  jobberAi: ["Jobber", "https://www.getjobber.com/features/ai/"],
  jobberReceptionist: ["Jobber", "https://www.getjobber.com/features/ai-receptionist/"],
  jobberDev: ["Jobber Developer Center", "https://developer.getjobber.com/"],
  stResidential: [
    "ServiceTitan residential survey",
    "https://www.globenewswire.com/news-release/2026/04/07/3269193/0/en/servicetitan-report-finds-74-of-residential-contractors-see-ai-as-key-to-efficiency-as-industry-shifts-toward-execution-led-growth.html",
  ],
  stStateOfAi: ["ServiceTitan State of AI", "https://www.servicetitan.com/guides/2026-ai-in-the-trades"],
  stVirtualAgent: ["ServiceTitan", "https://www.servicetitan.com/features/pro/virtual-agent"],
  stTitanIntelligence: ["ServiceTitan", "https://www.servicetitan.com/features/titan-intelligence"],
  stVoiceDashboard: [
    "ServiceTitan Voice Agents Dashboard",
    "https://help.servicetitan.com/release-hub/docs/use-the-voice-agents-dashboard-to-prove-ai-call-performance",
  ],
  stRecording: [
    "ServiceTitan call-recording settings",
    "https://help.servicetitan.com/docs/adjust-phones-pro-call-recording-settings",
  ],
  hcp: ["Housecall Pro", "https://www.housecallpro.com/features/ai-team/csr-ai/"],
  hcpApi: ["Housecall Pro API", "https://docs.housecallpro.com/"],
  callrail: ["CallRail", "https://www.callrail.com/conversation-intelligence"],
  sera: ["Sera", "https://sera.tech/"],
  fieldedge: ["FieldEdge", "https://fieldedge.com/hvac-software/"],
  serviceFusion: ["Service Fusion", "https://www.servicefusion.com/field-service-management-software"],
  fccNprm: ["FCC NPRM", "https://docs.fcc.gov/public/attachments/DOC-404036A1.pdf"],
  fccVoices: ["FCC", "https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal"],
  bls: [
    "U.S. Bureau of Labor Statistics",
    "https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm",
  ],
  nistGenAi: ["NIST Generative AI Profile", "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"],
  nistRmf: ["NIST AI RMF", "https://www.nist.gov/itl/ai-risk-management-framework"],
  nistRmfPdf: ["NIST AI RMF", "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"],
  owaspAgency: ["OWASP Excessive Agency", "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"],
  owaspInjection: ["OWASP Prompt Injection", "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"],
  googleReviews: ["Google Maps contribution policy", "https://support.google.com/contributionpolicy/answer/7400114"],
  ftcReviewQa: [
    "FTC Consumer Reviews and Testimonials Rule Q&A",
    "https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers",
  ],
  ftcWarning: ["FTC warning-letter template", "https://www.ftc.gov/system/files/ftc_gov/pdf/2025-Fake-Review-Warning-Template.pdf"],
  ftcEvolv: [
    "FTC on Evolv",
    "https://www.ftc.gov/news-events/news/press-releases/2024/11/ftc-takes-action-against-evolv-technologies-deceiving-users-about-its-ai-powered-security-screening",
  ],
  ftcAirAi: [
    "FTC on Air AI",
    "https://www.ftc.gov/news-events/news/press-releases/2026/03/air-ai-its-owners-will-be-banned-marketing-business-opportunities-settle-ftc-charges-company-misled",
  ],
  energyStar: ["ENERGY STAR", "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist"],
  lbnl: [
    "Chen et al.",
    "https://eta-publications.lbl.gov/sites/default/files/a_review_of_data-driven_fault_detection_and_diagnostics_for_building_hvac_systems.pdf",
  ],
  googleAiFeatures: ["Google Search Central", "https://developers.google.com/search/docs/appearance/ai-features"],
  bing: ["Bing Webmaster Guidelines", "https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a"],
  schemaHvac: ["Schema.org", "https://schema.org/HVACBusiness"],
  googleLocalBusiness: [
    "Google LocalBusiness documentation",
    "https://developers.google.com/search/docs/appearance/structured-data/local-business",
  ],
  caBpc: [
    "California Business and Professions Code § 17941",
    "https://law.justia.com/codes/california/code-bpc/division-7/part-3/chapter-6/section-17941/",
  ],
  utahSb226: ["Utah S.B. 226", "https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf"],
} as const;

const sections = [
  { id: "short-answer", label: "The short answer" },
  { id: "why-now", label: "Why HVAC companies are looking at AI now" },
  { id: "not-one-tool", label: "AI is not one tool that fixes the leak" },
  { id: "where-ai-helps", label: "Where AI can help today" },
  { id: "still-hype", label: "What is still hype" },
  { id: "autonomy-ceiling", label: "Decide the autonomy ceiling first" },
  { id: "legal-boundaries", label: "Legal and platform boundaries" },
  { id: "tool-categories", label: "Which AI tools to consider" },
  { id: "buy-integrate-build-wait", label: "Buy, integrate, build, or wait" },
  { id: "vendor-questions", label: "The 17 vendor questions" },
  { id: "ninety-day-rollout", label: "A 90-day rollout" },
  { id: "measuring-return", label: "Measuring return without inventing it" },
  { id: "minimum-data", label: "The minimum data to retain" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "start-with-a-leak", label: "Start with a leak, not a license" },
];

const stripTags = (html: string) => html.replace(/<[^>]+>/g, "");
const ext = (label: string, href: string) =>
  `<a class="link" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

// FAQ answers carry inline anchors, so they are authored as HTML and rendered
// the same way /faq renders its own — the JSON-LD gets the tag-stripped text.
const faqs: { q: string; a: string }[] = [
  {
    q: "Is it legal to have AI answer an HVAC company&rsquo;s phone?",
    a: `The FCC&rsquo;s AI-voice ruling addresses covered outbound calls. Its related rulemaking text says TCPA requirements do not extend to technologies used to answer inbound calls (${ext(
      "FCC",
      src.fccNprm[1],
    )}). State disclosure and recording laws may still apply, so the workflow should be reviewed for each operating jurisdiction.`,
  },
  {
    q: "Should callers be told they are speaking with AI?",
    a: `The lower-risk default is yes. California and Utah have bot or generative-AI disclosure provisions, and some vendor products leave the choice to the contractor (${ext(
      "California § 17941",
      src.caBpc[1],
    )}, ${ext("Utah S.B. 226", src.utahSb226[1])}, ${ext("Housecall Pro", src.hcp[1])}).`,
  },
  {
    q: "Can AI call or text past customers?",
    a: `Only when the contact complies with the applicable consent, revocation, and do-not-contact requirements. The FCC has confirmed that AI-generated voices count as artificial under the TCPA for covered outbound calls (${ext(
      "FCC",
      src.fccVoices[1],
    )}). Consent enforcement should live in the system of record, not in the model&rsquo;s prompt.`,
  },
  {
    q: "Can an HVAC company ask only happy customers for Google reviews?",
    a: `No. Google prohibits selectively soliciting positive reviews, and the FTC warns that the practice can violate the FTC Act. Generalized requests to purchasers are permitted (${ext(
      "Google",
      src.googleReviews[1],
    )}, ${ext("FTC", src.ftcReviewQa[1])}).`,
  },
  {
    q: "Can AI write review responses?",
    a: `AI can draft a response for human approval. It should not fabricate reviews, and negative-review replies should not post without a responsible person reviewing the customer history and proposed response. The FTC&rsquo;s rule explicitly covers fake and AI-generated reviews (${ext(
      "FTC",
      "https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials",
    )}).`,
  },
  {
    q: "Can every call be recorded and transcribed?",
    a: `Recording requirements vary by jurisdiction. Current software can support recording greetings, geographic exceptions, agent-side-only recording, and pauses during payment capture, but those controls must be configured to match the company&rsquo;s legal posture (${ext(
      "ServiceTitan",
      src.stRecording[1],
    )}).`,
  },
  {
    q: "Will AI replace office staff?",
    a: `The available evidence does not support staffing cuts as a responsible starting assumption. AI introduces review, escalation, training, exception-handling, and governance work, while the hardest roles for many contractors to fill remain skilled trade roles (${ext(
      "Jobber",
      src.jobber[1],
    )}, ${ext("ServiceTitan", src.stStateOfAi[1])}).`,
  },
  {
    q: "Can AI predict equipment failure?",
    a: `Not reliably for an ordinary small residential operation today. Peer-reviewed literature describes real-building deployment as rare and HVAC fault prognosis as underdeveloped, with major sensor, data-quality, and transferability constraints (${ext(
      "Chen et al.",
      src.lbnl[1],
    )}).`,
  },
  {
    q: "Does an HVAC company need <code>llms.txt</code> or special AI SEO?",
    a: `No special file guarantees inclusion. Google says normal indexing and snippet eligibility apply to AI features, while Bing says generative-engine optimization does not guarantee citations (${ext(
      "Google",
      src.googleAiFeatures[1],
    )}, ${ext("Bing", src.bing[1])}).`,
  },
  {
    q: "What is the biggest technical risk?",
    a: `Giving the AI more permission than the workflow requires. OWASP recommends minimum necessary functions and permissions, downstream authorization, human approval for high-impact actions, rate limits, and logging (${ext(
      "OWASP",
      src.owaspAgency[1],
    )}).`,
  },
];

const vendorQuestions: [string, string][] = [
  ["System of record", "Which system is authoritative for customers, jobs, estimates, communications, and consent?"],
  ["Data custody", "Can the company export all records in bulk without opening a support ticket?"],
  ["API and webhooks", "Which endpoints and events are documented, versioned, and available on the proposed plan?"],
  ["Access control", "Can the AI receive only the permissions required for this workflow?"],
  ["Auditability", "Does every interaction record the transcript, action, model or configuration version, result, and approver?"],
  ["Approval gates", "Which actions can be technically blocked until a named person approves them?"],
  ["Failed actions", "What happens when a booking, message, payment sync, or CRM write fails?"],
  ["Fallback", "Where do calls and tasks go during an outage, and can the fallback be tested?"],
  ["Model changes", "Will the vendor disclose model or material behavior changes?"],
  ["Consent", "Where are consent, revocation, and do-not-contact status stored and enforced?"],
  ["AI disclosure", "Can disclosure be mandatory by workflow and jurisdiction?"],
  ["Recording", "Are recording greetings, geographic exceptions, and payment pauses supported?"],
  ["Review compliance", "Can sentiment screening, incentives, requested content, and staff quotas be disabled or prevented?"],
  ["Training data", "Is customer or company data used to train shared models, and can that use be prohibited?"],
  ["Measurement", "Can the company export containment, booking, escalation, override, correction, and complaint data?"],
  ["Claims", "What sample, time period, comparison, and methodology support every sales claim?"],
  ["Exit", "What data, configuration, prompts, and knowledge files come back when the relationship ends?"],
];

const autonomyLevels: [string, string, string][] = [
  [
    "Assist",
    "Finds and presents information; a person decides and acts",
    "Safety triage support, diagnosis support, lead scoring, technician knowledge retrieval",
  ],
  ["Draft", "Prepares content; a person reviews and sends", "Estimates, invoice explanations, review replies, outbound campaign copy"],
  [
    "Act with approval",
    "Stages a consequential action; a person authorizes execution",
    "Dispatch plan, estimate follow-up, invoice message, review invitation batch",
  ],
  [
    "Autonomous with bounds",
    "Acts inside hard rules, with logging and escalation",
    "Inbound answering, approved standard booking, read-only reporting",
  ],
];

const toolCategories: [string, string, string, string][] = [
  [
    "Native field-service AI",
    "The FSM already contains customer history, capacity, pricebook, and job state",
    "ServiceTitan, Housecall Pro, Jobber",
    "Can the feature use the existing system of record without creating a shadow record?",
  ],
  [
    "AI reception and booking",
    "Missed calls, overflow, or after-hours intake are measured leaks",
    "ServiceTitan Virtual Agent, Housecall Pro CSR AI, Jobber AI Receptionist",
    "Which job types can it book, when must it transfer, and is every interaction reviewable?",
  ],
  [
    "Conversation intelligence",
    "The company already answers calls but cannot inspect quality or outcomes at scale",
    "CallRail, ServiceTitan Voice Agents Dashboard",
    "Are scores advisory, and can transcripts, outcomes, and errors be exported?",
  ],
  [
    "Reputation and communications",
    "Review invitations, messaging, and follow-up are inconsistent",
    "Podium, native FSM automations",
    "Does the system prevent review gating, incentives, requested content, and unauthorized outbound contact?",
  ],
  [
    "Operational orchestration",
    "Work crosses several systems and exceptions disappear between them",
    "A governed TradeOps layer",
    "Can it observe events, enforce deterministic rules, require approval, and expose failed integrations?",
  ],
];

export default function AiForHvacCompanies() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Insights", href: "/insights" },
    { label: article.title, href: article.path },
  ];

  // Article + FAQPage describe a genuinely published guide. No aggregateRating,
  // no invented author persona: the publisher is the practice itself, and the
  // dates are the real ones.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${site.primaryDomain}${article.ogImage}`, `${site.primaryDomain}${article.heroImage}`],
    datePublished: article.published,
    dateModified: article.published,
    inLanguage: "en-US",
    wordCount: article.words,
    isAccessibleForFree: true,
    author: { "@id": `${site.primaryDomain}/#organization` },
    publisher: { "@id": `${site.primaryDomain}/#organization` },
    isPartOf: { "@id": `${site.primaryDomain}/#website` },
    about: [
      { "@type": "Thing", name: "AI for HVAC companies" },
      { "@type": "Thing", name: "HVAC workflow automation" },
      { "@type": "Thing", name: "AI governance" },
    ],
    keywords: [...article.keywords].join(", "),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": `${url}#article` },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripTags(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) },
    })),
  };

  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <Breadcrumbs items={crumbs} />

      <article>
        <header className="section-tight paper-grain">
          <div className="container" style={{ maxWidth: "54rem" }}>
            <div className="eyebrow">Field guide · HVAC</div>
            <h1 className="serif mt-5" style={{ fontSize: "var(--step-4)", lineHeight: 1.05 }}>
              AI for HVAC Companies: A Practical Field Guide
            </h1>
            <p
              className="mt-6 serif"
              style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "44rem" }}
            >
              Where AI genuinely helps an HVAC operation, where it creates risk, how to evaluate the vendor market
              without a salesperson in the room, and how to prove one controlled workflow in 90 days.
            </p>
            <div className="article-meta mt-7">
              <span>
                Published{" "}
                <time dateTime={article.published}>
                  {new Date(`${article.published}T00:00:00Z`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </span>
              <span>{article.words.toLocaleString("en-US")} words</span>
              <span>{site.name}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/hvac/founding-five#scorecard" className="btn btn-primary">
                Take the Revenue Leak Scorecard <span aria-hidden>→</span>
              </Link>
              <Link href="/assessment" className="btn btn-secondary">
                Take the HVAC Cash Flow Leak Diagnostic
              </Link>
            </div>
          </div>
        </header>

        <div className="container" style={{ maxWidth: "54rem", paddingTop: "2.5rem" }}>
          <figure className="article-figure" style={{ margin: 0 }}>
            <IllustrativeImage
              base="insights/ai-for-hvac-companies-hero"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 880px) 54rem, 100vw"
              alt={article.heroAlt}
            />
            <figcaption>
              Editorial illustration of an HVAC operation with one AI-assisted path running through inquiry,
              scheduling, field work, invoicing, and follow-up. Illustration, not a documentary photograph of a
              client.
            </figcaption>
          </figure>
        </div>

        <nav aria-labelledby="contents-heading" className="container section-tight" style={{ maxWidth: "54rem" }}>
          <h2 id="contents-heading" className="rule-label" style={{ marginBottom: "1rem" }}>
            Contents
          </h2>
          <ol className="article-toc">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="article" style={{ paddingBottom: "var(--section)" }}>
          <p>
            Depending on which 2026 survey is quoted, HVAC artificial intelligence adoption is either{" "}
            <strong>81.5 percent</strong>, roughly <strong>25 percent</strong>, or only <strong>12 percent</strong>.
          </p>
          <p>
            Jobber reports 81.5 percent HVAC adoption, while ServiceTitan reports that about one-quarter of
            residential contractors use AI and only 12 percent have embedded it into operations
            <Cite sources={[src.jobber, src.stResidential, src.stStateOfAi]} />. The surveys are counting different
            things. Asking a chatbot to rewrite an email is &ldquo;using AI.&rdquo; Allowing software to answer a
            call, check live capacity, create a customer record, book a job, and preserve an audit trail is embedded
            operational AI.
          </p>
          <p>That distinction matters more than the adoption statistic.</p>
          <p>
            An HVAC company does not need more disconnected AI features. It needs a controlled operating system in
            which every inquiry, promise, handoff, estimate, review request, and exception has an owner. AI is useful
            when it closes a measured operational leak inside that system. It becomes dangerous when it creates
            commitments the business cannot see, verify, or reverse.
          </p>
          <p>
            This field guide explains what AI can realistically do for an HVAC business today, what should remain
            human, how to evaluate the growing vendor market, and how to prove value without handing control of the
            company to a model.
          </p>

          <h2 id="short-answer">The short answer</h2>
          <p>
            The best first use of AI for most HVAC companies is not diagnosis, predictive maintenance, or a fully
            autonomous &ldquo;AI employee.&rdquo; It is a bounded workflow around an existing operational leak:
          </p>
          <ul>
            <li>Answer an inbound call after hours.</li>
            <li>Capture the caller&rsquo;s information and reason for calling.</li>
            <li>Book only approved job types against real capacity.</li>
            <li>Transfer safety-sensitive or unusual calls to a person.</li>
            <li>Write the interaction back to the system of record.</li>
            <li>Show the result, error, or exception to a named human owner.</li>
          </ul>
          <p>
            Multiple field-service vendors now document versions of this capability, including capacity-aware
            booking, human escalation, transcripts, summaries, and configurable limits
            <Cite sources={[src.stVirtualAgent, src.hcp, src.jobberReceptionist]} />. The FCC also distinguishes
            inbound answering from outbound calling: its rulemaking text says TCPA requirements do not extend to
            technologies used to answer inbound calls
            <Cite sources={[src.fccNprm]} />.
          </p>
          <p>
            That does not make every implementation safe or profitable. It makes inbound answering a strong candidate
            for a measured pilot.
          </p>

          <h2 id="why-now">Why HVAC companies are looking at AI now</h2>
          <p>
            The HVACR occupation employs about 425,200 people, is projected to grow 8 percent from 2024 to 2034, and
            is expected to have about 40,100 openings per year over that period
            <Cite sources={[src.bls]} />. Those figures do not prove a specific national &ldquo;technician
            shortage,&rdquo; but they do describe a labor-intensive trade with sustained demand for skilled people.
          </p>
          <p>
            The opportunity is not to pretend AI can replace those skilled people. It is to stop wasting their time
            and stop losing work between systems.
          </p>
          <p>
            ServiceTitan&rsquo;s 2026 survey identifies training, integration complexity, difficulty understanding
            tools, and unclear return on investment as larger adoption barriers than employee resistance
            <Cite sources={[src.stStateOfAi]} />. That is an implementation problem, not a model problem.
          </p>
          <p>
            The operational pressure appears most clearly in response time. Jobber reports that more than 70 percent
            of customers expect a same-day response and more than half expect a response within an hour, while its
            HVAC respondents reported much lower within-the-hour performance
            <Cite sources={[src.jobber]} />. The exact percentages vary across surveys, but the mechanism is obvious:
            a call that is not answered, acknowledged, assigned, and followed through can disappear before a
            technician ever gets a chance to serve the customer.
          </p>

          <h2 id="not-one-tool">AI is not one tool that fixes the leak</h2>
          <p>Buying software does not produce a workflow. It adds another component to a workflow.</p>
          <p>
            Livingry Services uses a{" "}
            <Link href="/how-it-works" className="link" style={{ color: "var(--forest)" }}>
              five-part operating method
            </Link>
            :
          </p>
          <ol>
            <li>
              <strong>Find</strong> the point where an earned opportunity, promise, record, or next action disappears.
            </li>
            <li>
              <strong>Trace</strong> the customer, data, and decision path across every system and person.
            </li>
            <li>
              <strong>Seal</strong> one bounded failure point with the smallest useful intervention.
            </li>
            <li>
              <strong>Verify</strong> the before-and-after result and inspect the guardrails.
            </li>
            <li>
              <strong>Keep</strong> the workflow visible, owned, portable, and capable of being shut off.
            </li>
          </ol>
          <p>
            The same logic applies across{" "}
            <Link href="/what-we-build" className="link" style={{ color: "var(--forest)" }}>
              seven connected systems
            </Link>
            : response, recovery, customer continuity, discovery and trust, knowledge, workflow, and the TradeOps
            orchestration layer that observes and governs the rest.
          </p>

          <figure className="article-figure article-wide">
            <IllustrativeImage
              base="insights/hvac-customer-lifecycle"
              width={1600}
              height={806}
              sizes="(min-width: 880px) 54rem, 100vw"
              alt="Diagram of a seven-stage HVAC customer journey — inquiry, scheduling, field work, estimate, invoice, review and referral, and re-engagement — showing the common operational leak at each stage and the controlled AI pattern that seals it."
            />
            <figcaption>
              The seven-stage HVAC customer journey, the leak that recurs at each stage, and the controlled AI
              pattern that addresses it.
            </figcaption>
          </figure>

          <p>The &ldquo;before&rdquo; map for any workflow should identify:</p>
          <p className="article-formula">
            Customer action → system response → person responsible → information recorded → required next action →
            failure point → consequence
          </p>
          <p>The &ldquo;after&rdquo; map should identify:</p>
          <p className="article-formula">
            Trigger → captured context → deterministic rule → AI-assisted preparation → human approval where
            consequential → external action → verified result or exception
          </p>
          <p>
            This makes the AI one controlled participant in the workflow rather than an invisible manager of the
            business.
          </p>

          <h2 id="where-ai-helps">Where AI can help an HVAC company today</h2>

          <h3 id="inquiries">Inquiries and missed-call recovery</h3>
          <p>
            AI phone and messaging systems can answer inbound contacts, capture the request, recognize an existing
            customer, book against defined rules, transfer to a human, and save a transcript or summary. ServiceTitan,
            Housecall Pro, and Jobber each document combinations of these capabilities in their current products
            <Cite sources={[src.stVirtualAgent, src.hcp, src.jobberReceptionist]} />.
          </p>
          <p>
            The useful outcome is not &ldquo;calls handled by AI.&rdquo; It is fewer inquiries without an acknowledged
            owner and next action.
          </p>
          <p>Measure:</p>
          <ul>
            <li>Missed or abandoned inbound calls</li>
            <li>Median time to first response</li>
            <li>Share of calls contained without human intervention</li>
            <li>Booking rate on eligible calls</li>
            <li>Live-transfer rate and reasons</li>
            <li>Customer complaints and corrections</li>
            <li>AI-booked callback rate versus human-booked callback rate</li>
          </ul>

          <h3 id="call-summaries">Call summaries and operational visibility</h3>
          <p>
            Conversation-intelligence products can produce summaries, classify outcomes, tag calls, and roll up common
            call reasons. CallRail documents summaries, sentiment, lead scoring, outcome tags, and aggregate
            conversation analysis; ServiceTitan documents a dashboard with outcomes, escalation reasons, transcripts,
            and recordings
            <Cite sources={[src.callrail, src.stVoiceDashboard]} />.
          </p>
          <p>
            These tools are most valuable when the summary becomes a visible next action. A transcript that no one
            reviews is another storage expense. A tagged unbooked call assigned to a person with a deadline is a
            recovery workflow.
          </p>
          <p>
            Lead scores should remain advisory. NIST identifies performance disparities and harmful bias as
            generative-AI risks, and publicly documented vendor pages do not provide enough accuracy evidence to
            justify automatically deprioritizing callers
            <Cite sources={[src.nistGenAi]} />.
          </p>

          <h3 id="dispatch">Dispatch support</h3>
          <p>
            Current platforms document skill-, availability-, location-, route-, and predicted-value inputs for
            dispatch assistance. ServiceTitan describes automated board optimization, while Sera and FieldEdge
            describe matching based on skills, availability, routes, or location
            <Cite sources={[src.stTitanIntelligence, src.sera, src.fieldedge]} />.
          </p>
          <p>
            Dispatch should be an approval workflow, not an unobserved decision. The dispatcher needs to see the
            proposed board, its rationale, constraint violations, and the consequences of overriding it. Override rate
            is not evidence that people are &ldquo;resisting AI.&rdquo; It is evidence about whether the
            recommendation fits the actual operation.
          </p>

          <h3 id="field-capture">Field capture and knowledge retrieval</h3>
          <p>
            AI can reduce the friction of documenting work. Jobber describes voice-driven tasks in the field,
            FieldEdge supports mobile notes and photo capture, and ServiceTitan describes knowledge retrieval from a
            configured business knowledge base
            <Cite sources={[src.jobberAi, src.fieldedge, src.stVirtualAgent]} />.
          </p>
          <p>
            The safest pattern is retrieval from approved company material with a source attached. A technician should
            be able to distinguish a result taken from an approved manual, membership rule, or pricebook from an
            answer generated from general model knowledge.
          </p>

          <h3 id="estimates">Estimate preparation and follow-up</h3>
          <p>
            AI can draft estimate descriptions, summarize options, prepare follow-up messages, and flag estimates
            without a next action. Jobber documents quote drafting and follow-up assistance, while Service Fusion
            documents multi-option estimates and electronic approval
            <Cite sources={[src.jobberAi, src.serviceFusion]} />.
          </p>
          <p>
            The final scope, price, discount, warranty language, and timing promise should remain human-approved. A
            confidently worded model error becomes a customer commitment when it leaves the business.
          </p>

          <h3 id="closeout">Closeout, invoice communication, and payment</h3>
          <p>
            ServiceTitan documents invoice-summary and invoice-email generation, while Service Fusion and FieldEdge
            document accounting synchronization and mobile payment workflows
            <Cite sources={[src.stTitanIntelligence, src.serviceFusion, src.fieldedge]} />.
          </p>
          <p>
            AI can prepare the explanation. Deterministic systems should provide the amount, status, and accounting
            record. A person should approve exceptions, credits, disputes, and collection escalation.
          </p>

          <h3 id="reviews">Reviews, referrals, and customer continuity</h3>
          <p>This is one of the highest-value and highest-risk areas.</p>
          <p>
            Google prohibits selectively soliciting positive reviews, discouraging negative reviews, offering
            incentives, requesting specific review content, and setting staff review quotas
            <Cite sources={[src.googleReviews]} />. The FTC&rsquo;s Consumer Review Rule prohibits fake or
            AI-generated reviews, sentiment-conditioned incentives, suppression, and review gatekeeping, while its
            guidance permits generalized requests to purchasers
            <Cite sources={[src.ftcReviewQa, src.ftcWarning]} />.
          </p>
          <p>
            A sound workflow does not ask AI to predict who will leave five stars. It asks every eligible completed
            customer at a legitimate satisfaction point, unless an unresolved service issue requires operational
            attention first. The same policy must apply regardless of predicted sentiment.
          </p>
          <p>Track at least:</p>
          <ul>
            <li>Completed jobs eligible for an invitation</li>
            <li>Invitations sent</li>
            <li>Delivery and response rates</li>
            <li>Reviews received by platform</li>
            <li>Referrals attributed to each customer</li>
            <li>Referred opportunities converted</li>
            <li>Review and referral activity per customer per year</li>
            <li>Open issues that delayed, but did not permanently suppress, an invitation</li>
          </ul>
          <p>This is how review and referral behavior becomes improvable without becoming manipulative.</p>

          <h3 id="maintenance">Maintenance and re-engagement</h3>
          <p>
            ENERGY STAR recommends annual pre-season checkups, with cooling service in spring and heating service in
            fall, and lists a concrete inspection and maintenance scope
            <Cite sources={[src.energyStar]} />. That supports a legitimate recurring-service workflow.
          </p>
          <p>
            AI can surface lapsed members, aging equipment records, incomplete maintenance cycles, or customers due
            for an approved reminder. It should not invent a failure prediction or initiate outbound contact without
            the required consent state.
          </p>

          <h2 id="still-hype">What is still hype</h2>

          <h3 id="predictive-maintenance">Predictive maintenance for ordinary residential operations</h3>
          <p>
            The strongest public research does not support broad claims that a small residential contractor can
            reliably predict which customer&rsquo;s system will fail next. A Lawrence Berkeley National Laboratory
            affiliated review found that most data-driven HVAC fault-detection research relied on simulated or
            laboratory data, real-building deployment remained rare, and fault prognosis was still underdeveloped
            <Cite sources={[src.lbnl]} />.
          </p>
          <p>
            Connected equipment alerts can provide a diagnostic signal and a reason for a human to investigate. That
            is useful. It is not the same as a validated, portable failure-prediction system.
          </p>

          <h3 id="guaranteed-outcomes">Guaranteed revenue, labor savings, or booking rates</h3>
          <p>
            Vendor pages publish eye-catching outcome numbers, but the available pages often do not state the sample,
            comparison period, control group, or methodology. ServiceTitan attaches &ldquo;individual results may
            vary&rdquo; and &ldquo;past performance does not guarantee future results&rdquo; to its Virtual Agent
            performance material
            <Cite sources={[src.stVirtualAgent]} />. The FTC has also acted against unsupported AI performance and
            business-opportunity claims, including its cases involving Evolv and Air AI
            <Cite sources={[src.ftcEvolv, src.ftcAirAi]} />.
          </p>
          <p>
            The correct response is not to assume every claim is false. It is to require the methodology and replace
            the vendor&rsquo;s benchmark with the contractor&rsquo;s baseline.
          </p>

          <h3 id="ai-seo">&ldquo;AI SEO&rdquo; that guarantees citations</h3>
          <p>
            Google says pages do not need additional technical requirements to appear as supporting links in AI
            features beyond normal indexing and snippet eligibility. Bing says generative-engine optimization does not
            guarantee citations and structured data does not guarantee visibility
            <Cite sources={[src.googleAiFeatures, src.bing]} />.
          </p>
          <p>The useful work is ordinary and durable:</p>
          <ul>
            <li>Publish explicit answers to real customer questions.</li>
            <li>Give each service and location a clear, accurate page.</li>
            <li>Keep the Google Business Profile consistent with the real business.</li>
            <li>
              Use <code>HVACBusiness</code> structured data that matches visible page content.
            </li>
            <li>Put critical facts in text, not only in images.</li>
            <li>Maintain crawlability, internal links, and current information.</li>
          </ul>
          <p>
            Schema.org provides a specific <code>HVACBusiness</code> type, and Google recommends accurate
            LocalBusiness properties including business name, address, telephone, URL, hours, and geographic data
            <Cite sources={[src.schemaHvac, src.googleLocalBusiness]} />.
          </p>
          <p>
            This makes the business easier for machines to understand. It does not buy a citation. The same logic
            drives our{" "}
            <Link href="/systems/discovery-and-trust" className="link" style={{ color: "var(--forest)" }}>
              Discovery &amp; Trust work
            </Link>
            .
          </p>

          <h2 id="autonomy-ceiling">Decide the autonomy ceiling before choosing the tool</h2>
          <p>
            The question is not &ldquo;What can this model do?&rdquo; The question is &ldquo;What is the maximum safe
            authority for this workflow?&rdquo;
          </p>

          <figure className="article-figure article-wide">
            <IllustrativeImage
              base="insights/hvac-ai-autonomy-ceiling"
              width={1600}
              height={853}
              sizes="(min-width: 880px) 54rem, 100vw"
              alt="Diagram of four AI autonomy levels — assist, draft, act with approval, and autonomous with bounds — mapped against four HVAC workflow classes, showing that the ceiling is set by the consequence of a mistake rather than by model capability."
            />
            <figcaption>
              The autonomy ceiling is set by the consequence of an error, not by what the model is capable of doing.
            </figcaption>
          </figure>

          <p>
            NIST&rsquo;s AI Risk Management Framework organizes AI governance around GOVERN, MAP, MEASURE, and MANAGE.
            Its generative-AI profile calls out confabulation, data privacy, automation bias, harmful bias,
            information security, and third-party component risk
            <Cite sources={[src.nistRmf, src.nistGenAi]} />. OWASP similarly warns about excessive functionality,
            permissions, and autonomy, and recommends least privilege, downstream authorization, logging, and human
            approval for high-impact actions
            <Cite sources={[src.owaspAgency]} />.
          </p>

          <div className="article-wide">
            <table className="gc-table" role="table">
              <caption className="sr-only">
                Four AI autonomy levels, what the AI does at each level, and suitable HVAC examples.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Level</th>
                  <th scope="col">What the AI does</th>
                  <th scope="col">Suitable examples</th>
                </tr>
              </thead>
              <tbody>
                {autonomyLevels.map(([level, does, examples]) => (
                  <tr key={level}>
                    <th scope="row">{level}</th>
                    <td className="gc-does" data-label="What the AI does">
                      {does}
                    </td>
                    <td data-label="Suitable examples">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Regardless of level, every workflow needs a named owner, least-privilege access, a system of record, an
            audit trail, tested fallback, exception handling, and a kill switch.
          </p>

          <h2 id="legal-boundaries">The legal and platform boundaries owners should not delegate to a model</h2>
          <p>
            This section is operational guidance, not legal advice. Consent, recording, disclosure, and solicitation
            rules should be reviewed with counsel for every state in which the company operates.
          </p>

          <h3 id="inbound-vs-outbound">Inbound answering is not outbound calling</h3>
          <p>
            The FCC has confirmed that AI-generated voices are &ldquo;artificial&rdquo; under the TCPA and require
            prior express consent for covered outbound calls
            <Cite sources={[src.fccVoices]} />. The FCC&rsquo;s related rulemaking text separately states that TCPA
            requirements do not extend to technologies used to answer inbound calls
            <Cite sources={[src.fccNprm]} />.
          </p>
          <p>
            An AI receptionist answering the company&rsquo;s published line therefore has a different legal posture
            from an agent calling an unsold estimate or texting a lapsed customer. The switch from inbound to outbound
            should be a hard system boundary, not a prompt instruction.
          </p>

          <h3 id="disclosure">AI identity disclosure is not just a branding preference</h3>
          <p>
            Some vendors allow the contractor to decide whether to disclose that the caller is interacting with AI.
            Housecall Pro explicitly describes that disclosure as optional in its product FAQ
            <Cite sources={[src.hcp]} />.
          </p>
          <p>
            California provides a bot-disclosure safe harbor in covered online commercial interactions, while Utah
            requires disclosure on request and provides a broader safe harbor for clear disclosure at the outset and
            throughout the interaction
            <Cite sources={[src.caBpc, src.utahSb226]} />. The lower-risk operational default is clear disclosure,
            followed by state-specific legal review.
          </p>

          <h3 id="recording">Recording and transcription controls must follow the caller</h3>
          <p>
            Call-recording law varies by jurisdiction. ServiceTitan&rsquo;s own documentation recommends consulting an
            attorney and describes practical controls including recording greetings, area-code exceptions, agent-side-only
            recording, and an automatic pause during payment capture
            <Cite sources={[src.stRecording]} />.
          </p>
          <p>
            The system should store whether the call was recorded, the consent basis, the applicable policy, and the
            location-aware control used. It should not assume that enabling transcription in a vendor dashboard
            resolved the legal question.
          </p>

          <h2 id="tool-categories">Which AI tools should an HVAC company consider?</h2>
          <p>The market is easier to evaluate by category than by brand.</p>

          <div className="article-wide">
            <table className="gc-table" role="table">
              <caption className="sr-only">
                Five categories of HVAC AI tooling, the situation each fits, representative documented examples, and
                the main control question to ask about each.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Best fit</th>
                  <th scope="col">Representative documented examples</th>
                  <th scope="col">Main control question</th>
                </tr>
              </thead>
              <tbody>
                {toolCategories.map(([category, fit, examples, question]) => (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td data-label="Best fit">{fit}</td>
                    <td data-label="Representative documented examples">{examples}</td>
                    <td className="gc-does" data-label="Main control question">
                      {question}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            These are examples, not rankings. Vendor documentation shows what a company says its product can do, not
            whether the capability will produce a particular result in another contractor&rsquo;s operation.
          </p>

          <h2 id="buy-integrate-build-wait">Buy, integrate, build, or wait</h2>

          <h3 id="wait">Wait</h3>
          <p>
            Wait if the business cannot currently measure missed calls, response time, estimate status, review
            coverage, or workflow ownership. Unclear ROI and integration complexity are already among
            contractors&rsquo; leading AI-adoption obstacles, and automating an unmeasured process makes both problems
            worse
            <Cite sources={[src.stStateOfAi]} />.
          </p>
          <p>Waiting does not mean ignoring AI. It means instrumenting the workflow first.</p>

          <h3 id="buy">Buy the native feature</h3>
          <p>
            Start with the feature inside the existing field-service platform when that platform already holds live
            capacity, job types, customer history, and the authoritative record. Native access usually reduces
            integration burden, though the contractor must still verify permissions, exports, fallbacks, and approval
            gates.
          </p>

          <h3 id="integrate">Integrate a specialist</h3>
          <p>
            Use a specialist when the native feature does not solve the measured leak and the system of record has a
            documented API and relevant webhooks. Verify access before buying. Housecall Pro documents public API
            access at specified plan tiers, while Jobber documents queries, mutations, webhooks, and versioning
            <Cite sources={[src.hcpApi, src.jobberDev]} />.
          </p>
          <p>
            An integration that relies on screen scraping, shared passwords, or silent polling can create a larger
            leak than the one it fixes.
          </p>

          <h3 id="build">Build</h3>
          <p>
            Most small and midsize HVAC companies should not build their own general AI platform. They would inherit
            model inventory, security, testing, incident response, deactivation, fallback, and vendor-component
            governance obligations described by NIST and OWASP
            <Cite sources={[src.nistRmfPdf, src.owaspInjection]} />.
          </p>
          <p>
            A narrow read-only reporting layer over exported company data can be reasonable. A custom autonomous agent
            with broad CRM write access usually is not.
          </p>

          <h2 id="vendor-questions">The 17 questions to ask every HVAC AI vendor</h2>
          <p>Ask for the answers in writing.</p>
          <ol>
            {vendorQuestions.map(([topic, question]) => (
              <li key={topic}>
                <strong>{topic}:</strong> {question}
              </li>
            ))}
          </ol>
          <p>
            NIST recommends inventories, deactivation protocols, vendor-risk documentation, fallback testing,
            model-version tracking, override monitoring, and error or near-miss records
            <Cite sources={[src.nistGenAi]} />. OWASP recommends least privilege and authorization in downstream
            systems instead of relying on a model to decide what it may do
            <Cite sources={[src.owaspAgency]} />.
          </p>

          <h2 id="ninety-day-rollout">A 90-day HVAC AI rollout</h2>

          <figure className="article-figure article-wide">
            <IllustrativeImage
              base="insights/hvac-ai-90-day-roadmap"
              width={1600}
              height={827}
              sizes="(min-width: 880px) 54rem, 100vw"
              alt="Roadmap of a 90-day HVAC AI rollout in three phases: days 0 to 30 find and trace with baseline measurement, days 31 to 60 seal and verify with one bounded pilot, and days 61 to 90 keep, expand, or stop on the evidence."
            />
            <figcaption>
              Ninety days from baseline measurement to a bounded pilot and an evidence-based go-or-stop decision.
            </figcaption>
          </figure>

          <h3 id="days-0-30">Days 0 to 30: Find and trace</h3>
          <ul>
            <li>Inventory every AI-enabled tool, data path, owner, model, permission, and shutdown method.</li>
            <li>
              Baseline missed calls, median response time, estimate win rate, review-invitation coverage, and referral
              attribution.
            </li>
            <li>Map one workflow from customer action through verified result.</li>
            <li>Audit consent, recording, disclosure, review solicitation, and fallback.</li>
            <li>Identify the system of record and every shadow copy of customer data.</li>
            <li>Select one leak with a measurable consequence.</li>
          </ul>
          <p>
            NIST specifically recommends maintaining an AI inventory and protocols for deactivation
            <Cite sources={[src.nistGenAi]} />.
          </p>

          <h3 id="days-31-60">Days 31 to 60: Seal and verify</h3>
          <ul>
            <li>
              Pilot one workflow, preferably after-hours inbound answering or another bounded, reversible use case.
            </li>
            <li>Whitelist bookable job types and define non-negotiable transfer conditions.</li>
            <li>Turn on clear AI disclosure.</li>
            <li>Review every AI-handled interaction during the first week.</li>
            <li>Log errors, corrections, near misses, overrides, and complaints.</li>
            <li>Keep estimate, invoice, and review-reply generation at draft level.</li>
          </ul>

          <h3 id="days-61-90">Days 61 to 90: Keep, expand, or stop</h3>
          <ul>
            <li>Compare before-and-after measurements.</li>
            <li>Compare AI-booked jobs with human-booked jobs on correction and callback rates.</li>
            <li>Test outage routing and a full data export.</li>
            <li>
              Try to make the system exceed its authority, disclose another customer&rsquo;s information, or create an
              unauthorized promise.
            </li>
            <li>Expand only if the result improved and the guardrails held.</li>
            <li>Stop or reduce scope if quality, visibility, or control deteriorated.</li>
          </ul>

          <h2 id="measuring-return">How to measure return without inventing it</h2>
          <p>
            No credible independent benchmark found in this research supports a universal dollar return for AI in
            residential HVAC. Measure the company&rsquo;s own inputs.
          </p>

          <h3 id="recovered-call">Recovered-call contribution</h3>
          <p className="article-formula">
            Missed calls before pilot × AI containment rate × eligible-call booking rate × average ticket ×
            gross-margin rate
          </p>

          <h3 id="estimate-followup">Estimate-follow-up contribution</h3>
          <p className="article-formula">
            Estimates issued × change in win rate × average estimate value × gross-margin rate
          </p>

          <h3 id="capacity-released">Administrative capacity released</h3>
          <p className="article-formula">Verified hours saved per week × 52 × fully loaded hourly cost</p>

          <h3 id="tco">Total cost of ownership</h3>
          <p className="article-formula">
            Subscription and usage fees + implementation + integration + human review + escalation handling + expected
            migration cost
          </p>

          <h3 id="net-return">Net return</h3>
          <p className="article-formula">
            (Recovered-call contribution + estimate contribution + released capacity − total cost) ÷ total cost
          </p>

          <p>Report the quality guardrails beside the financial result:</p>
          <ul>
            <li>Escalation rate and reasons</li>
            <li>Human override rate</li>
            <li>Complaint and near-miss count</li>
            <li>Correction and callback rates</li>
            <li>Failed integration count and recovery time</li>
            <li>Consent-revocation propagation time</li>
            <li>Review invitation coverage across all eligible customers</li>
          </ul>
          <p>
            NIST recommends documenting human overrides and tracking errors, near misses, and negative impacts
            <Cite sources={[src.nistGenAi]} />. An ROI figure without quality and control measures is not an operating
            result.
          </p>

          <h2 id="minimum-data">The minimum data an HVAC company should retain</h2>
          <p>
            The company does not need a new database project before every pilot. It does need enough structured
            history to answer who acted, what changed, and what happened next.
          </p>
          <p>At minimum, retain:</p>
          <ul>
            <li>
              <strong>Customer:</strong> identity, service locations, preferred channel, language, membership, source
              system
            </li>
            <li>
              <strong>Inquiry:</strong> channel, direction, timestamps, handler, disclosure, recording state,
              transcript, intent, escalation, outcome
            </li>
            <li>
              <strong>Job:</strong> type, required skills, booking source, schedule, assignee, completion, equipment,
              resolution, callback relationship
            </li>
            <li>
              <strong>Estimate:</strong> options, pricebook version, drafting source, human approver, follow-ups,
              decision
            </li>
            <li>
              <strong>Communication:</strong> sender, AI involvement, model or configuration version, approval,
              delivery result
            </li>
            <li>
              <strong>Review:</strong> eligible job, invitation timing, generalized-solicitation flag, platform,
              response, reply approval
            </li>
            <li>
              <strong>Referral:</strong> referring customer, contact permission, resulting opportunity, conversion
            </li>
            <li>
              <strong>Consent:</strong> type, basis, capture artifact, scope, revocation channel, propagation time,
              do-not-contact status
            </li>
          </ul>
          <p>
            This model supports customer-level and year-level review and referral reporting. It also allows the owner
            to distinguish a model suggestion from a human-approved commitment.
          </p>

          <h2 id="faq">Frequently asked questions</h2>
          <div className="grid gap-0">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="py-5"
                style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
              >
                <summary
                  className="serif cursor-pointer list-none flex items-baseline justify-between gap-6"
                  style={{ fontSize: "var(--step-1)" }}
                >
                  <span dangerouslySetInnerHTML={{ __html: f.q }} />
                  <span
                    aria-hidden
                    style={{ color: "var(--copper)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4" style={{ color: "var(--ink-2)" }} dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
          </div>

          <h2 id="start-with-a-leak">Start with a leak, not a license</h2>
          <p>
            The HVAC companies most likely to benefit from AI are not necessarily the ones with the largest software
            budgets. They are the ones willing to define the workflow, establish a baseline, constrain authority,
            inspect exceptions, and keep custody of their operational history.
          </p>
          <p>The first question is not:</p>
          <p className="article-formula">Which AI product should the company buy?</p>
          <p>It is:</p>
          <p className="article-formula">
            Where is an earned opportunity, promise, record, or next action currently escaping, and what would prove
            that the leak was sealed?
          </p>
          <p>
            Livingry Services helps HVAC owners trace that path across the systems they already use, choose one
            bounded workflow, establish the controls, and verify the result before expanding.
          </p>
          <p>
            <strong>Start with a 15-minute Leak Triage.</strong> No new software recommendation. No ad-spend pitch.
            First determine whether earned opportunities are escaping from the systems already in use.
          </p>
          <div className="flex flex-wrap gap-3" style={{ marginTop: "0.5rem" }}>
            <Link href="/hvac/founding-five#scorecard" className="btn btn-primary">
              Take the Revenue Leak Scorecard <span aria-hidden>→</span>
            </Link>
            <Link href="/assessment" className="btn btn-secondary">
              Complete the HVAC Cash Flow Leak Diagnostic
            </Link>
          </div>

          <div className="article-callout" style={{ marginTop: "2.5rem" }}>
            <p>
              <strong>Important:</strong> This article provides operational and educational guidance, not legal
              advice. Consult qualified counsel about consent, call recording, AI disclosure, advertising, customer
              communications, and review practices in every jurisdiction where the business operates.
            </p>
          </div>
        </div>
      </article>

      <EndCta
        title="Find the leak before you shop for the tool."
        primary={{ label: "Take the Revenue Leak Scorecard", href: "/hvac/founding-five#scorecard" }}
        secondary={{ label: "Take the HVAC Cash Flow Leak Diagnostic", href: "/assessment" }}
      />
    </>
  );
}
