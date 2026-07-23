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

const CONFIG_STORAGE_KEY = "livingry_ops_config_v1";

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

  // Private configured tools (loaded from the gated API, editable, persisted
  // to localStorage as a preview layer pending per-tenant DB persistence).
  const [tools, setTools] = useState<ToolConfig[]>([]);
  const [configState, setConfigState] = useState<PrivateConfigState>(mode === "private" ? "loading" : "idle");
  const [configError, setConfigError] = useState<string | null>(null);

  const loadPrivateConfig = useCallback(async () => {
    setConfigState("loading");
    setConfigError(null);
    // Prefer a locally persisted edit set so operator changes survive reloads.
    try {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem(CONFIG_STORAGE_KEY) : null;
      if (saved) {
        setTools(JSON.parse(saved) as ToolConfig[]);
        setConfigState("ready");
        return;
      }
    } catch {
      /* fall through to server fetch */
    }
    try {
      const res = await fetch("/api/ops/config");
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

  const persist = useCallback((next: ToolConfig[]) => {
    setTools(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — in-memory only */
      }
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
  const setToolEnabled = useCallback((toolId: string, enabled: boolean) => {
    persist(tools.map((t) => (t.id === toolId
      ? { ...t, enabled, status: enabled ? "configured" : "disabled", changeHistory: [{ at: nowIso(), action: enabled ? "enabled" : "disabled", detail: `${enabled ? "Enabled" : "Disabled"} ${t.displayName}.` }, ...t.changeHistory] }
      : t)));
  }, [tools, persist]);

  const replaceTool = useCallback((toolId: string, candidate: CandidateTool) => {
    persist(tools.map((t) => (t.id === toolId
      ? {
          ...t,
          provider: candidate.id,
          displayName: candidate.name,
          role: candidate.capability,
          status: "configured",
          enabled: true,
          signupUrl: candidate.url,
          changeHistory: [{ at: nowIso(), action: "replaced", detail: `Replaced with ${candidate.name}.` }, ...t.changeHistory],
        }
      : t)));
  }, [tools, persist]);

  const addTool = useCallback((categoryId: CategoryId, candidate: CandidateTool) => {
    const cat = data.categories.find((c) => c.id === categoryId);
    const integrationKey = cat?.integrationKeys[0] ?? "orchestration";
    const newTool: ToolConfig = {
      id: `cfg_${candidate.id}_${Date.now()}`,
      provider: candidate.id,
      displayName: candidate.name,
      categoryId,
      integrationKey,
      role: candidate.capability,
      status: "not_configured",
      enabled: false,
      capabilities: [candidate.capability],
      workflowParticipation: cat?.workflowParticipation ?? [],
      dataInputs: [],
      dataOutputs: [],
      permissions: ["Inherits category permissions"],
      approvalRequirements: ["Inherits category approval requirements"],
      signupUrl: candidate.url,
      changeHistory: [{ at: nowIso(), action: "added", detail: `Added ${candidate.name} from the vendor-neutral catalog.` }],
    };
    persist([...tools, newTool]);
  }, [tools, persist, data.categories]);

  const removeTool = useCallback((toolId: string) => {
    persist(tools.filter((t) => t.id !== toolId));
  }, [tools, persist]);

  // ---- Demo reset ----
  const resetDemo = useCallback(() => {
    setApprovals(data.approvals.map((a) => ({ ...a })));
    setLedger(data.ledger.map((l) => ({ ...l })));
    setSimSelections({});
  }, [data]);

  const resetConfig = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(CONFIG_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
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
