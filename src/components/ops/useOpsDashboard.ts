"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPublicDashboardData } from "@/lib/ops-dashboard/public";
import { CANDIDATE_CATALOG } from "@/lib/ops-dashboard/categories";
import type {
  ApprovalItem,
  CandidateTool,
  CategoryId,
  DashboardMode,
  LedgerEntry,
  ToolConfig,
} from "@/lib/ops-dashboard/types";

type PrivateConfigState = "idle" | "loading" | "ready" | "error";

function nowIso() {
  return new Date().toISOString();
}

// Shared state for both public and private dashboard modes. The `mode` is
// fixed by the route and can never be changed from the client — there is no
// setter and no query-param path that escalates a public session into a
// private one. Private vendor config is fetched only in private mode from the
// OTP-gated /api/ops/config route and is never bundled into the public build.
export function useOpsDashboard(mode: DashboardMode) {
  const data = useMemo(() => getPublicDashboardData(), []);

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => data.approvals.map((a) => ({ ...a })));
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => data.ledger.map((l) => ({ ...l })));

  // Public simulated selections (in-memory, resettable) — which candidate a
  // visitor has "tried" per category. No effect on any real system.
  const [simSelections, setSimSelections] = useState<Record<string, string[]>>({});

  // Private configured tools. The server (Postgres, tenant-scoped, OTP-gated)
  // is the single source of truth: config is loaded from and every edit is
  // written back through /api/ops/config, so changes persist across sessions
  // and devices. No browser storage is used for app state.
  const [tools, setTools] = useState<ToolConfig[]>([]);
  const [configState, setConfigState] = useState<PrivateConfigState>(mode === "private" ? "loading" : "idle");
  const [configError, setConfigError] = useState<string | null>(null);

  const loadPrivateConfig = useCallback(async () => {
    setConfigState("loading");
    setConfigError(null);
    try {
      const res = await fetch("/api/ops/config", { cache: "no-store" });
      if (!res.ok) throw new Error(`Config request failed (${res.status})`);
      const body = await res.json();
      setTools(body.tools as ToolConfig[]);
      setConfigState("ready");
    } catch (e) {
      setConfigError(e instanceof Error ? e.message : "Failed to load configuration");
      setConfigState("error");
    }
  }, []);

  useEffect(() => {
    if (mode === "private") loadPrivateConfig();
  }, [mode, loadPrivateConfig]);

  // Send a mutation to the gated API and adopt the server's authoritative
  // tool list from the response. On failure the local state is untouched and
  // the error surfaces so the operator can retry.
  const mutate = useCallback(async (body: Record<string, unknown>) => {
    setConfigError(null);
    try {
      const res = await fetch("/api/ops/config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Config update failed (${res.status})`);
      const payload = await res.json();
      setTools(payload.tools as ToolConfig[]);
    } catch (e) {
      setConfigError(e instanceof Error ? e.message : "Failed to save configuration");
    }
  }, []);

  // ---- Approval queue controls (both modes) ----
  const decideApproval = useCallback((id: string, decision: "approved" | "rejected") => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: decision } : a)));
    setLedger((prev) => {
      const appr = approvals.find((a) => a.id === id);
      if (!appr) return prev;
      const entry: LedgerEntry = {
        id: `led_sim_${id}_${decision}`,
        at: nowIso(),
        categoryId: appr.categoryId,
        event: appr.title,
        action: decision === "approved" ? "Operator approved queued action" : "Operator rejected queued action",
        automationLevel: appr.automationLevel,
        approvedBy: "You (demo operator)",
        outcome: decision === "approved" ? "Action released within bounds" : "Action held; routed for review",
        proof: `sig:sim-${id}`,
      };
      return [entry, ...prev.filter((l) => l.id !== entry.id)];
    });
  }, [approvals]);

  // ---- Public simulated candidate selection ----
  const toggleSimSelection = useCallback((categoryId: CategoryId, candidateId: string) => {
    setSimSelections((prev) => {
      const current = prev[categoryId] || [];
      const next = current.includes(candidateId)
        ? current.filter((c) => c !== candidateId)
        : [...current, candidateId];
      return { ...prev, [categoryId]: next };
    });
  }, []);

  // ---- Private tool configuration controls ----
  // The tool id served by the API equals its provider (natural key), so these
  // pass the id straight through as the provider the server mutates.
  const setToolEnabled = useCallback((toolId: string, enabled: boolean) => {
    void mutate({ op: "setEnabled", provider: toolId, enabled });
  }, [mutate]);

  const replaceTool = useCallback((toolId: string, candidate: CandidateTool) => {
    void mutate({ op: "replace", provider: toolId, candidate });
  }, [mutate]);

  const addTool = useCallback((categoryId: CategoryId, candidate: CandidateTool) => {
    void mutate({ op: "add", categoryId, candidate });
  }, [mutate]);

  const removeTool = useCallback((toolId: string) => {
    void mutate({ op: "remove", provider: toolId });
  }, [mutate]);

  // ---- Demo reset ----
  const resetDemo = useCallback(() => {
    setApprovals(data.approvals.map((a) => ({ ...a })));
    setLedger(data.ledger.map((l) => ({ ...l })));
    setSimSelections({});
  }, [data]);

  // Re-read the authoritative configuration from the server (used as a retry
  // after a load/save error). Server state is never discarded from the client.
  const resetConfig = useCallback(() => {
    loadPrivateConfig();
  }, [loadPrivateConfig]);

  const toolsByCategory = useCallback(
    (categoryId: CategoryId) => tools.filter((t) => t.categoryId === categoryId),
    [tools],
  );

  return {
    mode,
    categories: data.categories,
    edges: data.edges,
    catalog: CANDIDATE_CATALOG,
    scenarios: data.scenarios,
    health: data.health,
    approvals,
    ledger,
    tools,
    toolsByCategory,
    configState,
    configError,
    simSelections,
    decideApproval,
    toggleSimSelection,
    setToolEnabled,
    replaceTool,
    addTool,
    removeTool,
    resetDemo,
    resetConfig,
  };
}

export type OpsDashboardStore = ReturnType<typeof useOpsDashboard>;
