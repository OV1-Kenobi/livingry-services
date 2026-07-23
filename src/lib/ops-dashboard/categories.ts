import type { CandidateTool, CategoryAnatomy, CategoryId, FlowEdge } from "./types";

// The eight layers of the Ops dashboard. The first seven mirror the system
// families already on the Livingry site; the eighth (Ops Layer) is the
// orchestration + governance plane that integrates them. These definitions
// are vendor-neutral and identical in both public and private mode.
export const CATEGORIES: CategoryAnatomy[] = [
  {
    id: "discovery_trust",
    title: "Discovery & Trust Systems",
    eyebrow: "Attract",
    kind: "system",
    x: 12,
    y: 16,
    purpose:
      "Make services, proof, and differentiators clear and verifiable so people and AI answer engines can understand, trust, and recommend the business.",
    inputs: ["Service pages", "Reviews & credentials", "AI/search visibility signals"],
    processing: ["Clarify offer", "Structure machine-readable evidence", "Monitor how AI describes the business"],
    outputs: ["Authoritative source pages", "Structured trust data", "Discovery gap reports"],
    humanIntervention: ["Approve every published fact", "Sign off on claims and evidence"],
    successMeasures: ["Discovery gaps closed", "Verifiable evidence coverage", "Accurate AI descriptions"],
    capabilities: ["Content clarity", "Evidence architecture", "AI-readable structure", "Discovery monitoring"],
    workflowParticipation: ["completed-job-to-proof"],
    permissions: ["Publish only approved facts", "No fabricated proof, reviews, or credentials"],
    approvalRequirements: ["Human approval before any public claim is published"],
    integrationKeys: ["content_creation"],
  },
  {
    id: "response",
    title: "Response Systems",
    eyebrow: "Intake",
    kind: "system",
    x: 44,
    y: 12,
    purpose:
      "Route the right inquiry to the right person or process, quickly and reliably, so nothing is lost between first contact and useful help.",
    inputs: ["Missed calls", "Web forms & chat", "Referrals", "After-hours inquiries"],
    processing: ["Qualify intent", "Route by urgency", "Draft first useful response"],
    outputs: ["Routed lead", "Booked appointment", "Tracked CRM record"],
    humanIntervention: ["Confirm bookings that imply capacity", "Handle anything read as a promise"],
    successMeasures: ["Speed to first useful response", "First-contact resolution", "Leads answered within target"],
    capabilities: ["Missed-call recovery", "Speed-to-lead routing", "Intake qualification", "After-hours coverage"],
    workflowParticipation: ["missed-call-to-booking", "cold-estimate-to-recovery"],
    permissions: ["May draft & route", "May not invent price, urgency, or eligibility"],
    approvalRequirements: ["Human owner for any customer-facing commitment"],
    integrationKeys: ["booking_scheduling"],
  },
  {
    id: "knowledge",
    title: "Knowledge Systems",
    eyebrow: "Support",
    kind: "system",
    x: 12,
    y: 50,
    purpose:
      "Turn what the team already knows into information the whole team can safely reuse — grounded, cite-able, and governed.",
    inputs: ["Approved documents", "Tribal answers", "Recurring questions"],
    processing: ["Curate trusted library", "Ground assistant answers", "Enforce review discipline"],
    outputs: ["Cited answers", "Approved external content", "Escalations on restricted topics"],
    humanIntervention: ["Review regulated topics", "Own and date every fact"],
    successMeasures: ["Faster answers", "Reduced repeat work", "Time-to-usefulness for new hires"],
    capabilities: ["Trusted knowledge library", "Staff-facing assistant", "Content review discipline", "Human-approval design"],
    workflowParticipation: ["missed-call-to-booking", "cold-estimate-to-recovery", "completed-job-to-proof"],
    permissions: ["No answers on regulated topics without required review", "No hidden AI use"],
    approvalRequirements: ["Restricted topics always escalate to a human"],
    integrationKeys: [],
  },
  {
    id: "workflow",
    title: "Workflow Systems",
    eyebrow: "Coordinate",
    kind: "system",
    x: 44,
    y: 44,
    purpose:
      "Coordinate work between people, software, and AI so nothing falls through the cracks and humans stay responsible for the calls that matter.",
    inputs: ["Cross-team handoffs", "Status changes", "Exceptions"],
    processing: ["Assign ownership", "Automate routine steps", "Escalate on delay"],
    outputs: ["Clear ownership", "Cycle-time reporting", "Exception routing"],
    humanIntervention: ["Approve judgment steps", "Step in on stuck work"],
    successMeasures: ["Fewer dropped handoffs", "Shorter cycle times", "Lower exception rate"],
    capabilities: ["Journey mapping", "Ownership & escalation", "Human-approved automation", "Change discipline"],
    workflowParticipation: ["missed-call-to-booking", "cold-estimate-to-recovery", "completed-job-to-proof"],
    permissions: ["No automation of decisions needing professional judgment", "Every workflow documented"],
    approvalRequirements: ["Explicit human checkpoints where judgment is needed"],
    integrationKeys: ["operations_admin"],
  },
  {
    id: "tradeops",
    title: "TradeOps Layer",
    eyebrow: "Execute",
    kind: "system",
    x: 76,
    y: 30,
    purpose:
      "Normalize completed jobs, credentials, evidence, and follow-up into one vendor-agnostic operations model with policy gates and human approval.",
    inputs: ["Canonical job events", "Credentials & evidence", "Estimates & inspections"],
    processing: ["Normalize events", "Check job readiness", "Gate risky actions"],
    outputs: ["Completion packets", "Verified job states", "Exception Desk items"],
    humanIntervention: ["Safety, credential, insurance & complaint cases", "Advance from shadow to autonomous mode"],
    successMeasures: ["Jobs field-ready with evidence", "Verified complaint-free completions", "Defensible audit trail"],
    capabilities: ["Canonical job events", "Human approval model", "Exception Desk", "Trade packs"],
    workflowParticipation: ["completed-job-to-proof", "cold-estimate-to-recovery"],
    permissions: ["May classify, extract, draft, recommend", "May not diagnose, bind the company, or promise coverage"],
    approvalRequirements: ["Credentials read from verified records only", "Insurance language blocked or counsel-routed"],
    integrationKeys: ["operations_admin"],
  },
  {
    id: "recovery",
    title: "Recovery Systems",
    eyebrow: "Reactivate",
    kind: "system",
    x: 44,
    y: 76,
    purpose:
      "Reopen the right conversation at the right time on cold estimates, inspections, and proposals — useful, not spammy, and never impersonating the customer's relationship.",
    inputs: ["Unsold estimates", "Unreviewed inspections", "Stalled proposals"],
    processing: ["Sequence appropriate touches", "Clarify options", "Route ambiguous replies to a human"],
    outputs: ["Reactivated opportunity", "Recovery evidence", "Decision moment"],
    humanIntervention: ["Own each opportunity", "Handle any non-standard reply"],
    successMeasures: ["Recovered revenue", "Higher proposal close rate", "Respected opt-outs"],
    capabilities: ["Estimate reactivation", "Inspection follow-through", "Proposal clarifiers", "Recovery evidence"],
    workflowParticipation: ["cold-estimate-to-recovery"],
    permissions: ["No sequences that ignore opt-outs", "No fake urgency or invented offers"],
    approvalRequirements: ["Human owner per opportunity", "Content reviewed by the client"],
    integrationKeys: ["sales_call_intelligence", "sales_outreach"],
  },
  {
    id: "continuity",
    title: "Customer Continuity",
    eyebrow: "Retain",
    kind: "system",
    x: 76,
    y: 66,
    purpose:
      "Create relevant reasons for past customers to return, renew, refer, and act — while respecting the trust that earned them in the first place.",
    inputs: ["Service history", "Warranty & season windows", "Customer segments"],
    processing: ["Time maintenance cadence", "Segment outreach", "Trigger review/referral paths"],
    outputs: ["Renewal reminders", "Review & referral invitations", "Reactivation of dormant records"],
    humanIntervention: ["Approve outreach", "Own real conversations that result"],
    successMeasures: ["Repeat & referral revenue", "Response by segment", "Retention vs. churn"],
    capabilities: ["Maintenance & renewal cadence", "Referral & review workflows", "Segmented outreach", "Dormant reactivation"],
    workflowParticipation: ["completed-job-to-proof"],
    permissions: ["Opt-in & expected communications only", "Respected unsubscribes"],
    approvalRequirements: ["No AI message sent without a responsible human owner"],
    integrationKeys: ["marketing_crm"],
  },
  {
    id: "ops_layer",
    title: "Dashboard / Ops Layer",
    eyebrow: "Orchestrate & Govern",
    kind: "orchestration",
    x: 50,
    y: 44,
    purpose:
      "The orchestration and governance plane that integrates the seven systems: one control panel for work/data flow, approvals, exceptions, and the proof ledger.",
    inputs: ["Events from every category", "Approval decisions", "Configuration changes"],
    processing: ["Orchestrate workflows", "Enforce policy gates", "Record audit proof"],
    outputs: ["Approval queue", "Exception routing", "Activity / Proof Ledger", "Leak dashboard"],
    humanIntervention: ["Approve or reject queued actions", "Configure tools per category"],
    successMeasures: ["Open exceptions cleared", "Approvals within SLA", "Every automated action has proof"],
    capabilities: ["Workflow orchestration", "Human approval model", "Exception Desk", "Proof ledger", "Tool configuration"],
    workflowParticipation: ["missed-call-to-booking", "cold-estimate-to-recovery", "completed-job-to-proof"],
    permissions: ["Governs but does not bypass category-level approval rules"],
    approvalRequirements: ["Configuration changes are audited", "No category can escalate past its approval requirements"],
    integrationKeys: ["orchestration"],
  },
];

export const CATEGORY_BY_ID: Record<CategoryId, CategoryAnatomy> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryAnatomy>;

// Data-flow edges for the central flow map. The Ops Layer sits at the center
// and every system connects into it; systems also connect to each other along
// the operating pipeline (attract → intake → coordinate → execute → retain).
export const FLOW_EDGES: FlowEdge[] = [
  { from: "discovery_trust", to: "response", label: "qualified interest" },
  { from: "response", to: "workflow", label: "routed lead" },
  { from: "workflow", to: "tradeops", label: "ready job" },
  { from: "tradeops", to: "continuity", label: "verified completion" },
  { from: "continuity", to: "recovery", label: "dormant / at-risk" },
  { from: "recovery", to: "response", label: "re-engaged" },
  { from: "knowledge", to: "workflow", label: "grounded answers" },
  { from: "response", to: "ops_layer", label: "events" },
  { from: "workflow", to: "ops_layer", label: "events" },
  { from: "tradeops", to: "ops_layer", label: "events" },
  { from: "recovery", to: "ops_layer", label: "events" },
  { from: "continuity", to: "ops_layer", label: "events" },
  { from: "discovery_trust", to: "ops_layer", label: "events" },
  { from: "knowledge", to: "ops_layer", label: "events" },
];

// Vendor-neutral catalog of interchangeable candidates per category. Public
// mode renders these as the tool slots; private mode offers them as the
// "candidate alternatives" a configured slot can be replaced with. Kept
// deliberately generic so no future business is locked to a specific vendor.
export const CANDIDATE_CATALOG: Record<CategoryId, CandidateTool[]> = {
  discovery_trust: [
    { id: "generic-content-assistant", name: "Content & trust assistant", neutral: true, capability: "Draft clear, evidence-backed service content for human approval." },
    { id: "generic-schema-tool", name: "Structured-data / schema tool", neutral: true, capability: "Publish machine-readable evidence for search & AI answer engines." },
    { id: "generic-review-hub", name: "Review & reputation hub", neutral: true, capability: "Aggregate verifiable reviews and credentials." },
  ],
  response: [
    { id: "generic-front-desk", name: "Front-desk / booking assistant", neutral: true, capability: "Answer, qualify, and book across phone, form, and chat." },
    { id: "generic-scheduler", name: "Scheduling / calendar system", neutral: true, capability: "Offer real availability and confirm appointments." },
    { id: "generic-missed-call", name: "Missed-call recovery service", neutral: true, capability: "Text-back and callback offers on unanswered calls." },
  ],
  knowledge: [
    { id: "generic-kb", name: "Knowledge base", neutral: true, capability: "Single curated source of approved answers." },
    { id: "generic-rag-assistant", name: "Grounded staff assistant", neutral: true, capability: "Cite-able internal assistant restricted to approved docs." },
  ],
  workflow: [
    { id: "generic-ops-assistant", name: "Operations / admin assistant", neutral: true, capability: "Automate routine admin and fulfillment steps." },
    { id: "generic-workflow-engine", name: "Workflow automation engine", neutral: true, capability: "Orchestrate multi-step handoffs with human checkpoints." },
    { id: "generic-pm", name: "Task / project tracker", neutral: true, capability: "Track ownership, due dates, and status." },
  ],
  tradeops: [
    { id: "generic-fsm", name: "Field-service / job platform", neutral: true, capability: "Source of job, estimate, and completion events." },
    { id: "generic-credential", name: "Credential & evidence registry", neutral: true, capability: "Verify technician credentials and capture job evidence." },
  ],
  recovery: [
    { id: "generic-sales-intel", name: "Sales-call intelligence", neutral: true, capability: "Analyze sales conversations and surface next steps." },
    { id: "generic-sequencer", name: "Follow-up sequencer", neutral: true, capability: "Run appropriate, opt-out-respecting recovery touches." },
    { id: "generic-coaching", name: "Sales performance / coaching platform", neutral: true, capability: "Coach reps and track performance & commission." },
  ],
  continuity: [
    { id: "generic-crm", name: "CRM & multichannel messaging", neutral: true, capability: "Segmented email/SMS outreach tied to service history." },
    { id: "generic-loyalty", name: "Maintenance & renewal scheduler", neutral: true, capability: "Time renewal, warranty, and seasonal reminders." },
  ],
  ops_layer: [
    { id: "generic-orchestrator", name: "Agent & workflow orchestrator", neutral: true, capability: "Visible orchestration core wiring every category together." },
    { id: "generic-audit", name: "Audit / proof ledger", neutral: true, capability: "Record a defensible trail for every automated action." },
  ],
};
