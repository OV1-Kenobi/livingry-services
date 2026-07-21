"use client";

// Browser-persisted store for the Livingry Ops Layer dogfood Command
// Center. Uses localStorage so the control panel is immediately usable
// for real campaign tracking this week without waiting on a Postgres
// deployment. Shaped so records can migrate 1:1 into the tables defined
// in the Dogfood MVP Functional Specification (contacts/companies,
// opportunities, tasks, promises, exceptions) once a real backend exists.

import type { Lead, OpsException, OpsPromise, OpsState, OpsTask, LeakCode } from "./ops-types";

const STORAGE_KEY = "livingry_ops_state_v1";
const OWNER_ID = "owner_primary";

function uuid(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function emptyState(): OpsState {
  return { leads: [], tasks: [], promises: [], exceptions: [] };
}

export function loadState(): OpsState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as OpsState;
    return {
      leads: parsed.leads || [],
      tasks: parsed.tasks || [],
      promises: parsed.promises || [],
      exceptions: parsed.exceptions || [],
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: OpsState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportStateJson(state: OpsState): string {
  return JSON.stringify(state, null, 2);
}

const RESPONSE_SLA_HOURS = 4;
const FOLLOWUP_SLA_HOURS = 48;

function addException(state: OpsState, code: LeakCode, severity: OpsException["severity"], entityId: string | undefined, details: string) {
  const alreadyOpen = state.exceptions.some((e) => e.entityId === entityId && e.code === code && e.status === "open");
  if (alreadyOpen) return;
  state.exceptions.push({ id: uuid(), code, severity, entityId, details, status: "open", createdAt: nowIso() });
}

export function recomputeExceptions(state: OpsState): OpsState {
  const now = Date.now();
  const next: OpsState = { ...state, exceptions: state.exceptions.map((e) => ({ ...e })) };

  for (const lead of next.leads) {
    const ageHours = (now - new Date(lead.createdAt).getTime()) / 3_600_000;
    const hasResponded = Boolean(lead.lastInteractionAt);
    if (!hasResponded && ageHours > RESPONSE_SLA_HOURS && lead.stage === "new") {
      addException(next, "LEAD_UNANSWERED", "P2", lead.id, `${lead.name} has had no logged response for ${Math.round(ageHours)}h.`);
    }
    if (["contacted", "qualified", "discovery_scheduled", "discovery_complete", "proposal_drafting", "negotiation"].includes(lead.stage) && (!lead.nextAction || !lead.nextActionDueAt)) {
      addException(next, "NEXT_ACTION_MISSING", "P3", lead.id, `${lead.name} is active but has no next action, owner, or due date.`);
    }
    if (lead.stage === "proposal_sent" && lead.proposalSentAt) {
      const sentHours = (now - new Date(lead.proposalSentAt).getTime()) / 3_600_000;
      if (sentHours > FOLLOWUP_SLA_HOURS && !lead.followUpDueAt) {
        addException(next, "PROPOSAL_STALLED", "P2", lead.id, `Proposal sent to ${lead.name} ${Math.round(sentHours)}h ago with no follow-up scheduled.`);
      }
    }
  }

  for (const promise of next.promises) {
    if (promise.status === "open" && new Date(promise.dueAt).getTime() < now) {
      addException(next, "PROMISE_OVERDUE", "P2", promise.id, `Promise overdue: "${promise.text}"`);
    }
  }

  return next;
}

export function seedIfEmpty(state: OpsState): OpsState {
  if (state.leads.length || state.tasks.length) return state;
  const createdAt = nowIso();
  return {
    ...state,
    leads: [
      { id: uuid(), name: "Sample inbound lead", businessName: "Example HVAC Co.", serviceInterest: "AI ops layer", source: "campaign_launch_week1", consentToRespond: true, stage: "new", ownerId: OWNER_ID, createdAt },
    ],
    tasks: [
      { id: uuid(), title: "Confirm campaign tracking UTM parameters", ownerId: OWNER_ID, dueAt: createdAt, priority: "high", status: "open", entityType: "general", createdAt },
    ],
  };
}

export const OPS_OWNER_ID = OWNER_ID;

export function newLeadId() { return uuid(); }
export function isoNow() { return nowIso(); }
