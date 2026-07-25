// Shared model for the Livingry Ops orchestration dashboard.
// The SAME model powers both the public "streetfront" demo (unauthenticated,
// generic categories, synthetic Demo Data) and the authenticated client
// control panel (private mode, preconfigured with the client's curated tools).
// Only data source, permissions, persistence, configured vendors, and
// execution capability differ between the two modes — never the shell,
// categories, workflow model, tool anatomy, approval concepts, or ledger.

export type DashboardMode = "public" | "private";

// Reuse the four-level automation ladder already used across the site
// (Observe → Draft → Bounded Execute → Escalate).
export type AutomationLevel = "A0_observe" | "A1_draft" | "A2_bounded_execute" | "A3_escalate";

export const AUTOMATION_LABEL: Record<AutomationLevel, string> = {
  A0_observe: "Observe",
  A1_draft: "Draft",
  A2_bounded_execute: "Bounded Execute",
  A3_escalate: "Escalate",
};

// The seven functional categories already represented across the Livingry
// site, plus the eighth orchestration/governance layer (Dashboard / Ops).
export type CategoryId =
  | "response"
  | "recovery"
  | "continuity"
  | "discovery_trust"
  | "knowledge"
  | "workflow"
  | "tradeops"
  | "ops_layer";

// Keys used by the existing Postgres integration_connections taxonomy, so a
// configured tool can be traced back to the persisted vendor registry.
export type IntegrationCategoryKey =
  | "booking_scheduling"
  | "operations_admin"
  | "content_creation"
  | "sales_call_intelligence"
  | "marketing_crm"
  | "sales_outreach"
  | "orchestration";

export type CategoryAnatomy = {
  id: CategoryId;
  title: string;
  eyebrow: string;
  kind: "system" | "orchestration";
  // Layout coordinates for the flow map, as viewport percentages (0–100).
  x: number;
  y: number;
  // Every category answers these six questions.
  purpose: string; // what it does
  inputs: string[]; // what enters
  processing: string[]; // what happens
  outputs: string[]; // what leaves
  humanIntervention: string[]; // where humans intervene
  successMeasures: string[]; // how success is measured
  // Structural attributes surfaced in the drill-down tray.
  capabilities: string[];
  workflowParticipation: string[]; // scenario ids this category participates in
  permissions: string[];
  approvalRequirements: string[];
  // Which integration_connections categories map into this layer (private).
  integrationKeys: IntegrationCategoryKey[];
};

export type FlowEdge = {
  from: CategoryId;
  to: CategoryId;
  label: string;
};

// A vendor-neutral candidate a category can be configured with. Public mode
// shows these as the interchangeable catalog; private mode uses them as the
// "candidate alternatives" a configured slot can be replaced with.
export type CandidateTool = {
  id: string;
  name: string;
  neutral: boolean; // true = generic descriptor, false = named example option
  capability: string;
  url?: string;
};

export type ConnectionStatus =
  | "connected"
  | "configured"
  | "not_configured"
  | "error"
  | "disabled";

export type ChangeHistoryEntry = {
  at: string;
  action: string;
  detail: string;
};

// A configured tool inside a category (private mode). This is the "tool
// anatomy" shared with the public demo — the public demo simply renders the
// same shape with generic candidates and no real vendor brands.
export type ToolConfig = {
  id: string;
  provider: string;
  displayName: string;
  categoryId: CategoryId;
  integrationKey: IntegrationCategoryKey;
  role: string;
  status: ConnectionStatus;
  enabled: boolean;
  capabilities: string[];
  workflowParticipation: string[];
  dataInputs: string[];
  dataOutputs: string[];
  permissions: string[];
  approvalRequirements: string[];
  signupUrl?: string;
  changeHistory: ChangeHistoryEntry[];
};

export type ApprovalItem = {
  id: string;
  title: string;
  categoryId: CategoryId;
  automationLevel: AutomationLevel;
  requestedBy: string;
  detail: string;
  status: "pending" | "approved" | "rejected";
};

export type LedgerEntry = {
  id: string;
  at: string;
  categoryId: CategoryId;
  event: string;
  action: string;
  automationLevel: AutomationLevel;
  approvedBy: string;
  outcome: string;
  proof: string; // audit signature / reference
};

export type ScenarioStep = {
  categoryId: CategoryId;
  input: string;
  processing: string;
  output: string;
  humanIntervention: string;
  control: string;
  successMeasure: string;
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  steps: ScenarioStep[];
};

export type SystemHealth = {
  label: string;
  status: "ok" | "watch" | "critical";
  detail: string;
};

// The full public-safe payload. Contains NO real vendor brand names — safe to
// ship in the public bundle and render in public page source.
export type PublicDashboardData = {
  mode: "public";
  categories: CategoryAnatomy[];
  edges: FlowEdge[];
  catalog: Record<CategoryId, CandidateTool[]>;
  approvals: ApprovalItem[];
  ledger: LedgerEntry[];
  scenarios: Scenario[];
  health: SystemHealth[];
};
