// Lifecycle state model and record shapes for the Founding Five HVAC pilot.

export type RequestState =
  | "new_request"
  | "researching"
  | "audit_prepared"
  | "audit_sent"
  | "fit_call_invited"
  | "fit_call_scheduled"
  | "qualified"
  | "proposal_sent"
  | "pilot_won"
  | "pilot_lost"
  | "nurture"
  | "disqualified";

export const REQUEST_STATES: RequestState[] = [
  "new_request",
  "researching",
  "audit_prepared",
  "audit_sent",
  "fit_call_invited",
  "fit_call_scheduled",
  "qualified",
  "proposal_sent",
  "pilot_won",
  "pilot_lost",
  "nurture",
  "disqualified",
];

// States in which a record is considered "active" and therefore must carry a
// next action, a responsible owner, and a due timestamp.
export const TERMINAL_STATES: RequestState[] = [
  "pilot_won",
  "pilot_lost",
  "disqualified",
];

export function isActiveState(state: RequestState): boolean {
  return !TERMINAL_STATES.includes(state);
}

// The Founding Five Scorecard submission plus consent. All selections are
// enumerated server-side; free text is limited to name, company, and markets.
export type SubmissionInput = {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  companyWebsite?: string;
  role: string;
  workflowProblem: string;
  markets: string;
  teamSize: string;
  fsm: string;
  primaryLeaks: string[];
  weeklyVolume: string;
  readiness: string;
  consent: boolean;
  // Hidden metadata (never rendered, never placed in URLs/logs/analytics).
  formName?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  landingUrl?: string;
  firstTouchAt?: string;
  consentTextVersion?: string;
  honeypot?: string;
  analyticsSessionId?: string;
};

export type NormalizedSubmission = {
  fullName: string;
  companyName: string;
  workEmail: string;
  emailNormalized: string;
  phone: string;
  companyWebsite: string;
  companyDomain: string;
  role: string;
  workflowProblem: string;
  markets: string;
  teamSize: string;
  fsm: string;
  primaryLeaks: string[];
  weeklyVolume: string;
  readiness: string;
  consent: boolean;
  consentTextVersion: string;
  // dedup key = normalized email + normalized company domain
  dedupeKey: string;
  metadata: Record<string, string>;
};

export type FoundingFiveRequest = {
  id: string;
  createdAt: string;
  updatedAt: string;
  state: RequestState;
  // Active-record invariants.
  ownerId: string;
  nextAction: string;
  nextActionDueAt: string;
  // Contact / company.
  fullName: string;
  companyName: string;
  emailNormalized: string;
  companyDomain: string;
  role: string;
  phone: string;
  companyWebsite: string;
  workflowProblem: string;
  // Consent evidence.
  consentTextVersion: string;
  consentAt: string;
  // Attribution metadata (no secrets, no sensitive customer records).
  metadata: Record<string, string>;
  // Dedup bookkeeping — repeats are recorded, never silently dropped.
  dedupeKey: string;
  duplicateOf?: string;
  submissionCount: number;
};

export type OwnerAlert = {
  subject: string;
  body: string;
};

export type ApplicantAck = {
  subject: string;
  body: string;
};
