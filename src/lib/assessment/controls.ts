// The public HVAC Cash Flow Leak Diagnostic.
//
// This is the visitor-facing self-scoring form. It is deliberately a reduced
// surface of the practitioner document: one plain question and one evidence
// prompt per control, no leak-indicator lists and no measurement tables. The
// practitioner detail belongs on the call, not in a public form.
//
// Controls are grouped under the seven layers of the leakproofing map already
// published on the site (see `leakproofingMap` in lib/hvac-founding-five/content),
// so a visitor who reads both sees one framework rather than two.

export const ASSESSMENT_ROUTE = "/assessment";

/** Every control is scored 0–3, so 17 controls cap out at 51. */
export const MAX_CONTROL_SCORE = 3;

export type ChoiceValue = 0 | 1 | 2 | 3;

export const CHOICES: readonly {
  value: ChoiceValue;
  label: string;
  blurb: string;
}[] = [
  {
    value: 0,
    label: "Open leak",
    blurb: "No dependable process, or it depends entirely on memory.",
  },
  {
    value: 1,
    label: "Patched",
    blurb: "A process exists, but it is manual, inconsistent, or cannot be measured.",
  },
  {
    value: 2,
    label: "Controlled",
    blurb: "Documented and usually followed, but gaps, delays, or disconnected tools remain.",
  },
  {
    value: 3,
    label: "Sealed",
    blurb: "Observable, assigned, measured, and reliably produces the intended outcome.",
  },
] as const;

export type CategoryId =
  | "intake-capture"
  | "leak-detection"
  | "tradeops-context"
  | "routing-assignment"
  | "field-handoff"
  | "escalation-followthrough"
  | "close-continuity";

export interface AssessmentCategory {
  id: CategoryId;
  /** Position in the published seven-part leakproofing map. */
  layer: number;
  title: string;
  /** The layer's name in the published leakproofing map. */
  shorthand: string;
  summary: string;
}

export const CATEGORIES: readonly AssessmentCategory[] = [
  {
    id: "intake-capture",
    layer: 1,
    title: "Intake capture",
    shorthand: "Intake layer",
    summary:
      "Whether every inquiry that reaches the business lands somewhere accountable.",
  },
  {
    id: "leak-detection",
    layer: 2,
    title: "Leak detection",
    shorthand: "Detection layer",
    summary:
      "Whether work that has stalled becomes visible before the customer moves on.",
  },
  {
    id: "tradeops-context",
    layer: 3,
    title: "TradeOps context",
    shorthand: "TradeOps layer",
    summary:
      "Whether customer context, tool reliability, and data custody stay under your control.",
  },
  {
    id: "routing-assignment",
    layer: 4,
    title: "Routing and assignment",
    shorthand: "Routing layer",
    summary:
      "Whether work is qualified and assigned by explicit rules rather than in the moment.",
  },
  {
    id: "field-handoff",
    layer: 5,
    title: "Field handoff",
    shorthand: "Handoff layer",
    summary:
      "Whether the person doing the work arrives with everything already collected.",
  },
  {
    id: "escalation-followthrough",
    layer: 6,
    title: "Escalation and follow-through",
    shorthand: "Escalation layer",
    summary:
      "Whether delivered estimates reach a decision instead of going quiet.",
  },
  {
    id: "close-continuity",
    layer: 7,
    title: "Close and continuity",
    shorthand: "Close layer",
    summary:
      "Whether completion, payment, reviews, and repeat business are reconciled and measurable.",
  },
] as const;

export interface AssessmentControl {
  /** 1–17, matching the practitioner scorecard. */
  id: number;
  categoryId: CategoryId;
  title: string;
  question: string;
  /** What to look at before trusting the answer. */
  evidence: string;
  /**
   * A zero here outranks a high total: these are the access, closeout/payment,
   * and unresolved-issue controls where the downside is not merely lost revenue.
   */
  critical?: true;
}

export const CONTROLS: readonly AssessmentControl[] = [
  {
    id: 1,
    categoryId: "intake-capture",
    title: "Every inquiry lands in one accountable place",
    question:
      "Can every call, web form, email, text, social message, and referral be found in one workflow that someone owns?",
    evidence:
      "Trace one recent inquiry from each channel you use into the system where you would expect to find it.",
  },
  {
    id: 2,
    categoryId: "intake-capture",
    title: "New inquiries get an immediate acknowledgment",
    question:
      "Does every prospect quickly receive confirmation that you have their inquiry and what happens next?",
    evidence:
      "Compare inquiry timestamps against your first-response timestamps, including after-hours contacts.",
  },
  {
    id: 3,
    categoryId: "intake-capture",
    title: "Missed calls and abandoned forms trigger recovery",
    question:
      "When a caller hangs up, reaches voicemail, or starts an inquiry without finishing it, does a recovery action begin without someone remembering to start it?",
    evidence:
      "Sample missed calls and incomplete forms from the last 30 days and look at what actually happened next.",
  },
  {
    id: 4,
    categoryId: "leak-detection",
    title: "Every open opportunity has a status, an owner, and a next action",
    question:
      "Can you see where each active opportunity stands, who owns it, and what has to happen next?",
    evidence:
      "Open a handful of active records and check that owner, next action, and due date are all current.",
  },
  {
    id: 5,
    categoryId: "leak-detection",
    title: "Stalled work surfaces before the customer moves on",
    question:
      "Does something flag inquiries, estimates, approvals, invoices, or follow-ups that have sat longer than they should?",
    evidence:
      "Look for an aging report or alert, then trace how one recent stalled item was resolved.",
  },
  {
    id: 6,
    categoryId: "tradeops-context",
    title: "One system is the authority on the customer",
    question:
      "Is there a single authoritative place for customer identity, contact history, job status, estimates, invoices, reviews, and referrals?",
    evidence:
      "Look up the same customer in your CRM, phone system, scheduling, and invoicing tools and compare what each one says.",
  },
  {
    id: 7,
    categoryId: "tradeops-context",
    title: "Context survives every handoff",
    question:
      "Can office staff, dispatchers, technicians, and managers each see the context they need for their part of the work?",
    evidence:
      "Follow one completed job from first contact through closeout and note every point where information was re-entered or lost.",
  },
  {
    id: 8,
    categoryId: "tradeops-context",
    title: "Tool and automation failures are visible and recoverable",
    question:
      "When an integration, automation, or vendor service fails, does someone find out, own it, and recover the underlying work?",
    evidence:
      "Review error logs, failed automations, retry behaviour, and whatever the manual fallback is.",
  },
  {
    id: 9,
    categoryId: "tradeops-context",
    title: "You control access to your own customer data",
    question:
      "Do you control who can reach customer data, what they can do with it, and how access is removed when someone leaves?",
    evidence:
      "Review user roles, former-employee access, shared passwords, and whether you can export your complete customer history today.",
    critical: true,
  },
  {
    id: 10,
    categoryId: "routing-assignment",
    title: "Opportunities are qualified before they are scheduled",
    question:
      "Are urgency, job type, customer fit, location, value, and required expertise captured before work goes on the calendar?",
    evidence:
      "Compare the intake detail and the prioritisation decision across several recent opportunities.",
  },
  {
    id: 11,
    categoryId: "routing-assignment",
    title: "Scheduling and assignment follow explicit rules",
    question:
      "Are jobs assigned using availability, geography, skill, equipment, and urgency rather than one person's judgment in the moment?",
    evidence:
      "Review a representative week of dispatch decisions, and the exceptions someone made to them.",
  },
  {
    id: 12,
    categoryId: "field-handoff",
    title: "The field team gets a complete job packet before arrival",
    question:
      "Does the assigned worker receive customer history, scope, photos, equipment details, access instructions, promises, and required materials before the visit?",
    evidence:
      "Inspect a few recently dispatched job packets, then ask the technicians what they still had to chase down.",
  },
  {
    id: 13,
    categoryId: "escalation-followthrough",
    title: "Every estimate enters a defined follow-up sequence",
    question:
      "Does every estimate you deliver receive scheduled follow-up until the customer decides or explicitly declines?",
    evidence:
      "Sample estimates from the last 90 days and compare delivery, follow-up, response, and outcome.",
  },
  {
    id: 14,
    categoryId: "escalation-followthrough",
    title: "Unsold estimates are categorised and recoverable",
    question:
      "Do you record why work was not approved, and does that reason drive an appropriate recovery or later re-engagement?",
    evidence:
      "Review your lost-estimate reasons and what each category actually triggers. If “lost” is the only reason available, that is your answer.",
  },
  {
    id: 15,
    categoryId: "close-continuity",
    title: "Completion, payment, and open issues close together",
    question:
      "Before a job is marked complete, are work confirmation, customer acceptance, payment status, open issues, and required records all reconciled?",
    evidence:
      "Trace recent completed jobs through acceptance, invoicing, collection, and exception handling.",
    critical: true,
  },
  {
    id: 16,
    categoryId: "close-continuity",
    title: "Review requests follow a verified good outcome",
    question:
      "Do you ask for a review right after a confirmed positive result, and hold the request while an issue is still open?",
    evidence:
      "Check which satisfaction signal triggers the request, and confirm requests are suppressed while a complaint is unresolved. Timing a request after a genuine completion is legitimate; asking only the customers you expect to praise you is not.",
    critical: true,
  },
  {
    id: 17,
    categoryId: "close-continuity",
    title: "Referrals, repeat business, and annual customer value are measurable",
    question:
      "Can you identify who referred each customer, which customer generated each referral, what revenue resulted, and how both perform over the year?",
    evidence:
      "Pick several referred customers and trace the referring customer, the resulting work, the revenue, and the acknowledgment they received.",
  },
] as const;

export type BandId = "exposed" | "patched" | "controlled" | "sealed";

export interface AssessmentBand {
  id: BandId;
  /** Inclusive lower bound. */
  min: number;
  /** Inclusive upper bound. */
  max: number;
  label: string;
  /** One-line read of the operating condition. */
  condition: string;
  /** What the score suggests doing next. Directional, never a promise. */
  guidance: string;
}

export const BANDS: readonly AssessmentBand[] = [
  {
    id: "exposed",
    min: 0,
    max: 17,
    label: "Exposed",
    condition: "Core work depends on memory, individual effort, or disconnected tools.",
    guidance:
      "Seal one critical path before adding lead volume. More inquiries into an unsealed workflow mostly produces more escaped work.",
  },
  {
    id: "patched",
    min: 18,
    max: 30,
    label: "Patched",
    condition:
      "Important processes exist, but inconsistent handoffs and limited visibility still let value escape.",
    guidance:
      "Prioritise the highest-value leak that crosses two systems. Those are the ones nobody owns, so they persist the longest.",
  },
  {
    id: "controlled",
    min: 31,
    max: 42,
    label: "Controlled",
    condition:
      "The operation is functional and measurable, with specific gaps limiting predictability.",
    guidance:
      "Repair the few controls creating the most rework or lost conversion, rather than rebuilding what already works.",
  },
  {
    id: "sealed",
    min: 43,
    max: 51,
    label: "Sealed",
    condition: "The core workflow is controlled and observable.",
    guidance:
      "Focus on exception handling, optimisation, and keeping operator control as the system scales.",
  },
] as const;

export const TOTAL_CONTROLS = CONTROLS.length;
export const MAX_SCORE = TOTAL_CONTROLS * MAX_CONTROL_SCORE;

export const CONTROL_IDS: readonly number[] = CONTROLS.map((c) => c.id);
