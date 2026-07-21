// Livingry Ops Layer — dogfood MVP types.
// Mirrors the core tables/lifecycle from the Dogfood MVP Functional
// Specification: contacts/companies collapse into "Lead", opportunities,
// engagements collapse into "Task"/"Promise" tracking for the MVP slice,
// and leak categories drive the Command Center's "Needs Attention" queue.

export type LeakCode =
  | "LEAD_UNANSWERED"
  | "NEXT_ACTION_MISSING"
  | "PROMISE_OVERDUE"
  | "PROPOSAL_STALLED"
  | "APPROVAL_WAITING"
  | "REVIEW_MISSED"
  | "CLIENT_RISK";

export type OpportunityStage =
  | "new"
  | "contacted"
  | "qualified"
  | "discovery_scheduled"
  | "discovery_complete"
  | "proposal_drafting"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost"
  | "nurture"
  | "disqualified";

export type Lead = {
  id: string;
  name: string;
  businessName?: string;
  email?: string;
  phone?: string;
  serviceInterest: string;
  primaryProblem?: string;
  source: string;
  consentToRespond: boolean;
  stage: OpportunityStage;
  ownerId: string;
  nextAction?: string;
  nextActionDueAt?: string;
  createdAt: string;
  lastInteractionAt?: string;
  proposalSentAt?: string;
  followUpDueAt?: string;
};

export type TaskStatus = "open" | "completed" | "snoozed";

export type OpsTask = {
  id: string;
  title: string;
  ownerId: string;
  dueAt: string;
  priority: "low" | "medium" | "high";
  status: TaskStatus;
  entityType: "lead" | "engagement" | "general";
  entityId?: string;
  createdAt: string;
  completedAt?: string;
  snoozeReason?: string;
};

export type PromiseDirection = "livingry_to_client" | "client_to_livingry";
export type PromiseStatus = "open" | "fulfilled" | "renegotiated" | "waived" | "breached";

export type OpsPromise = {
  id: string;
  text: string;
  direction: PromiseDirection;
  entityId?: string;
  dueAt: string;
  originalDueAt: string;
  status: PromiseStatus;
  createdAt: string;
};

export type OpsException = {
  id: string;
  code: LeakCode;
  severity: "P1" | "P2" | "P3" | "P4";
  entityId?: string;
  details: string;
  status: "open" | "acknowledged" | "resolved" | "suppressed";
  createdAt: string;
  resolvedAt?: string;
};

export type OpsState = {
  leads: Lead[];
  tasks: OpsTask[];
  promises: OpsPromise[];
  exceptions: OpsException[];
};
