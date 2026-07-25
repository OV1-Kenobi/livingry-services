"use client";

export type DbOpportunity = {
  id: string; tenant_id: string; company_id: string | null; primary_contact_id: string | null;
  company_name: string | null; contact_name: string | null; stage: string; service_type: string | null;
  value_estimate_cents: number | null; next_action: string | null; next_action_due_at: string | null;
  owner_id: string | null; stage_entered_at: string; last_interaction_at: string | null;
  created_at: string; updated_at: string;
};

export type DbTask = {
  id: string; tenant_id: string; entity_type: string; entity_id: string | null; title: string;
  owner_id: string | null; priority: "low" | "medium" | "high"; status: "open" | "completed" | "snoozed";
  due_at: string; completed_at: string | null; snooze_reason: string | null; created_at: string; updated_at: string;
};

export type DbPromise = {
  id: string; tenant_id: string; entity_type: string | null; entity_id: string | null;
  direction: "livingry_to_client" | "client_to_livingry"; text: string; due_at: string; original_due_at: string;
  status: "open" | "fulfilled" | "renegotiated" | "waived" | "breached"; created_at: string; updated_at: string;
};

export type DbException = {
  id: string; tenant_id: string; code: string; severity: "P1" | "P2" | "P3" | "P4";
  entity_type: string | null; entity_id: string | null;
  status: "open" | "acknowledged" | "investigating" | "waiting" | "resolved" | "suppressed";
  owner_id: string | null; due_at: string | null; details_json: Record<string, any>;
  resolution: string | null; created_at: string; resolved_at: string | null;
};

export type DashboardKpis = {
  overdue_tasks: number; due_soon_tasks: number; open_exceptions: number;
  overdue_promises: number; stalled_opportunities: number;
  integrations: { category: string; status: string; billing_status: string }[];
};

const TENANT_STORAGE_KEY = "livingry_tenant_id";

async function jsonOrThrow(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function resolveTenantId(): Promise<string> {
  if (typeof window === "undefined") throw new Error("resolveTenantId must run in the browser");
  const cached = window.localStorage.getItem(TENANT_STORAGE_KEY);
  if (cached) return cached;
  const data = await jsonOrThrow(await fetch("/api/ops/tenant"));
  window.localStorage.setItem(TENANT_STORAGE_KEY, data.tenant.id);
  return data.tenant.id;
}

export async function fetchDashboardKpis(tenantId: string): Promise<DashboardKpis> {
  return jsonOrThrow(await fetch(`/api/ops/dashboard?tenant_id=${tenantId}`));
}

export async function fetchOpportunities(tenantId: string): Promise<DbOpportunity[]> {
  const data = await jsonOrThrow(await fetch(`/api/ops/opportunities?tenant_id=${tenantId}`));
  return data.opportunities;
}

export async function createOpportunity(
  tenantId: string,
  input: { service_type: string; next_action?: string; next_action_due_at?: string; stage?: string }
): Promise<DbOpportunity> {
  const data = await jsonOrThrow(await fetch("/api/ops/opportunities", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenant_id: tenantId, ...input }),
  }));
  return data.opportunity;
}

export async function fetchTasks(tenantId: string, status?: string): Promise<DbTask[]> {
  const qs = status ? `&status=${status}` : "";
  const data = await jsonOrThrow(await fetch(`/api/ops/tasks?tenant_id=${tenantId}${qs}`));
  return data.tasks;
}

export async function createTask(
  tenantId: string,
  input: { title: string; due_at: string; priority?: "low" | "medium" | "high" }
): Promise<DbTask> {
  const data = await jsonOrThrow(await fetch("/api/ops/tasks", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenant_id: tenantId, ...input }),
  }));
  return data.task;
}

export async function updateTask(id: string, patch: Partial<Pick<DbTask, "status" | "due_at" | "snooze_reason">>): Promise<DbTask> {
  const data = await jsonOrThrow(await fetch(`/api/ops/tasks/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
  return data.task;
}

export async function fetchPromises(tenantId: string): Promise<DbPromise[]> {
  const data = await jsonOrThrow(await fetch(`/api/ops/promises?tenant_id=${tenantId}`));
  return data.promises;
}

export async function createPromise(
  tenantId: string,
  input: { text: string; due_at: string; direction: "livingry_to_client" | "client_to_livingry" }
): Promise<DbPromise> {
  const data = await jsonOrThrow(await fetch("/api/ops/promises", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenant_id: tenantId, ...input }),
  }));
  return data.promise;
}

export async function updatePromise(id: string, patch: Partial<Pick<DbPromise, "status" | "due_at">>): Promise<DbPromise> {
  const data = await jsonOrThrow(await fetch(`/api/ops/promises/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
  return data.promise;
}

export async function fetchExceptions(tenantId: string): Promise<DbException[]> {
  const data = await jsonOrThrow(await fetch(`/api/ops/exceptions?tenant_id=${tenantId}`));
  return data.exceptions;
}

export async function updateException(
  id: string,
  patch: Partial<Pick<DbException, "status" | "resolution" | "owner_id">>
): Promise<DbException> {
  const data = await jsonOrThrow(await fetch(`/api/ops/exceptions/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
  return data.exception;
}
