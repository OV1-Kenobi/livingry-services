"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lead, OpsPromise, OpsState, OpsTask, OpportunityStage } from "@/lib/ops-types";
import {
  exportStateJson,
  isoNow,
  loadState,
  newLeadId,
  OPS_OWNER_ID,
  recomputeExceptions,
  saveState,
  seedIfEmpty,
} from "@/lib/ops-store-client";

const STAGES: OpportunityStage[] = [
  "new", "contacted", "qualified", "discovery_scheduled", "discovery_complete",
  "proposal_drafting", "proposal_sent", "negotiation", "won", "lost", "nurture", "disqualified",
];

const stageLabel: Record<OpportunityStage, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified", discovery_scheduled: "Discovery scheduled",
  discovery_complete: "Discovery complete", proposal_drafting: "Proposal drafting", proposal_sent: "Proposal sent",
  negotiation: "Negotiation", won: "Won", lost: "Lost", nurture: "Nurture", disqualified: "Disqualified",
};

const severityColor: Record<string, string> = { P1: "#b23b3b", P2: "#b23b3b", P3: "var(--copper)", P4: "var(--ink-3)" };
const leakLabel: Record<string, string> = {
  LEAD_UNANSWERED: "Lead unanswered", NEXT_ACTION_MISSING: "Missing next action", PROMISE_OVERDUE: "Promise overdue",
  PROPOSAL_STALLED: "Proposal stalled", APPROVAL_WAITING: "Approval waiting", REVIEW_MISSED: "Review missed", CLIENT_RISK: "Client risk",
};

export default function OpsCenterPage() {
  const [state, setState] = useState<OpsState | null>(null);
  const [tab, setTab] = useState<"attention" | "pipeline" | "tasks" | "promises" | "exceptions">("attention");
  const [leadForm, setLeadForm] = useState({ name: "", businessName: "", email: "", phone: "", serviceInterest: "", source: "" });
  const [taskForm, setTaskForm] = useState({ title: "", dueAt: "", priority: "medium" as OpsTask["priority"] });
  const [promiseForm, setPromiseForm] = useState({ text: "", dueAt: "", direction: "livingry_to_client" as OpsPromise["direction"] });

  useEffect(() => {
    const loaded = seedIfEmpty(loadState());
    const withChecks = recomputeExceptions(loaded);
    setState(withChecks);
    saveState(withChecks);
  }, []);

  function commit(next: OpsState) {
    const withChecks = recomputeExceptions(next);
    setState(withChecks);
    saveState(withChecks);
  }

  function addLead() {
    if (!state || !leadForm.name || !leadForm.serviceInterest) return;
    const lead: Lead = {
      id: newLeadId(),
      name: leadForm.name,
      businessName: leadForm.businessName || undefined,
      email: leadForm.email || undefined,
      phone: leadForm.phone || undefined,
      serviceInterest: leadForm.serviceInterest,
      source: leadForm.source || "manual_entry",
      consentToRespond: true,
      stage: "new",
      ownerId: OPS_OWNER_ID,
      createdAt: isoNow(),
    };
    commit({ ...state, leads: [lead, ...state.leads] });
    setLeadForm({ name: "", businessName: "", email: "", phone: "", serviceInterest: "", source: "" });
  }

  function updateLeadStage(id: string, stage: OpportunityStage) {
    if (!state) return;
    const leads = state.leads.map((l) => {
      if (l.id !== id) return l;
      const patch: Partial<Lead> = { stage };
      if (stage === "proposal_sent" && !l.proposalSentAt) patch.proposalSentAt = isoNow();
      return { ...l, ...patch };
    });
    commit({ ...state, leads });
  }

  function logLeadResponse(id: string) {
    if (!state) return;
    const leads = state.leads.map((l) => (l.id === id ? { ...l, lastInteractionAt: isoNow(), stage: l.stage === "new" ? "contacted" as const : l.stage } : l));
    commit({ ...state, leads });
  }

  function setLeadNextAction(id: string, nextAction: string, dueAt: string) {
    if (!state) return;
    const leads = state.leads.map((l) => (l.id === id ? { ...l, nextAction, nextActionDueAt: dueAt } : l));
    commit({ ...state, leads });
  }

  function addTask() {
    if (!state || !taskForm.title || !taskForm.dueAt) return;
    const task: OpsTask = { id: newLeadId(), title: taskForm.title, ownerId: OPS_OWNER_ID, dueAt: taskForm.dueAt, priority: taskForm.priority, status: "open", entityType: "general", createdAt: isoNow() };
    commit({ ...state, tasks: [task, ...state.tasks] });
    setTaskForm({ title: "", dueAt: "", priority: "medium" });
  }

  function completeTask(id: string) {
    if (!state) return;
    const tasks = state.tasks.map((t) => (t.id === id ? { ...t, status: "completed" as const, completedAt: isoNow() } : t));
    commit({ ...state, tasks });
  }

  function snoozeTask(id: string) {
    if (!state) return;
    const reason = window.prompt("Snooze reason:") || "unspecified";
    const tasks = state.tasks.map((t) => (t.id === id ? { ...t, status: "snoozed" as const, snoozeReason: reason } : t));
    commit({ ...state, tasks });
  }

  function addPromise() {
    if (!state || !promiseForm.text || !promiseForm.dueAt) return;
    const promise: OpsPromise = { id: newLeadId(), text: promiseForm.text, direction: promiseForm.direction, dueAt: promiseForm.dueAt, originalDueAt: promiseForm.dueAt, status: "open", createdAt: isoNow() };
    commit({ ...state, promises: [promise, ...state.promises] });
    setPromiseForm({ text: "", dueAt: "", direction: "livingry_to_client" });
  }

  function fulfillPromise(id: string) {
    if (!state) return;
    const promises = state.promises.map((p) => (p.id === id ? { ...p, status: "fulfilled" as const } : p));
    commit({ ...state, promises });
  }

  function resolveException(id: string) {
    if (!state) return;
    const exceptions = state.exceptions.map((e) => (e.id === id ? { ...e, status: "resolved" as const, resolvedAt: isoNow() } : e));
    commit({ ...state, exceptions });
  }

  function suppressException(id: string) {
    if (!state) return;
    const exceptions = state.exceptions.map((e) => (e.id === id ? { ...e, status: "suppressed" as const } : e));
    commit({ ...state, exceptions });
  }

  function exportData() {
    if (!state) return;
    const blob = new Blob([exportStateJson(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `livingry-ops-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const openExceptions = useMemo(() => (state ? state.exceptions.filter((e) => e.status === "open") : []), [state]);
  const dueToday = useMemo(() => {
    if (!state) return [];
    const today = new Date().toDateString();
    return state.tasks.filter((t) => t.status === "open" && new Date(t.dueAt).toDateString() === today);
  }, [state]);
  const openPromisesCount = useMemo(() => (state ? state.promises.filter((p) => p.status === "open").length : 0), [state]);
  const activeLeadsCount = useMemo(() => (state ? state.leads.filter((l) => !["won", "lost", "disqualified"].includes(l.stage)).length : 0), [state]);

  if (!state) {
    return <p style={{ color: "var(--ink-3)" }}>Loading ops layer…</p>;
  }

  const tabs: { id: typeof tab; label: string; count?: number }[] = [
    { id: "attention", label: "Needs Attention", count: openExceptions.length },
    { id: "pipeline", label: "Pipeline", count: state.leads.length },
    { id: "tasks", label: "Tasks", count: state.tasks.filter((t) => t.status === "open").length },
    { id: "promises", label: "Promises", count: openPromisesCount },
    { id: "exceptions", label: "Exception Log", count: state.exceptions.length },
  ];

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="rule-label">Livingry Ops Layer · Dogfood control panel</div>
          <p style={{ color: "var(--ink-2)", maxWidth: "40rem" }}>
            Live campaign-launch working panel — data is stored in this browser
            and structured to migrate directly into the Ops Layer Postgres
            schema (leads → contacts/opportunities, tasks, promises,
            exceptions) once the backend is deployed.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={exportData}>Export JSON</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="card"><div className="eyebrow">Needs attention</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)", color: "#b23b3b" }}>{openExceptions.length}</div></div>
        <div className="card"><div className="eyebrow">Due today</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{dueToday.length}</div></div>
        <div className="card"><div className="eyebrow">Active pipeline</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{activeLeadsCount}</div></div>
        <div className="card"><div className="eyebrow">Open promises</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{openPromisesCount}</div></div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8" aria-label="Ops Center sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="btn"
            style={{
              paddingBlock: "0.5rem", paddingInline: "1rem", fontSize: "0.85rem",
              background: tab === t.id ? "var(--ink)" : "transparent",
              color: tab === t.id ? "var(--paper)" : "var(--ink)",
              border: "1px solid var(--ink)",
            }}
          >
            {t.label}{typeof t.count === "number" ? ` (${t.count})` : ""}
          </button>
        ))}
      </nav>

      {tab === "attention" && (
        <div className="grid gap-0">
          {openExceptions.length === 0 && <p style={{ color: "var(--ink-3)" }}>No open leaks right now.</p>}
          {openExceptions.map((e, i) => (
            <div key={e.id} className="py-4 flex items-start justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
              <div>
                <span className="mono text-[0.72rem]" style={{ color: severityColor[e.severity] }}>● {e.severity} · {leakLabel[e.code]}</span>
                <p className="mt-1" style={{ color: "var(--ink)" }}>{e.details}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => resolveException(e.id)}>Resolve</button>
                <button className="btn btn-ghost" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => suppressException(e.id)}>Suppress</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "pipeline" && (
        <>
          <div className="card mb-8">
            <div className="rule-label">Log new inbound lead</div>
            <div className="grid gap-3 md:grid-cols-2 mt-3">
              <input placeholder="Contact name *" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input placeholder="Business name" value={leadForm.businessName} onChange={(e) => setLeadForm({ ...leadForm, businessName: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input placeholder="Email" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input placeholder="Phone" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input placeholder="Service interest *" value={leadForm.serviceInterest} onChange={(e) => setLeadForm({ ...leadForm, serviceInterest: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input placeholder="Campaign / source" value={leadForm.source} onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
            </div>
            <button className="btn btn-primary mt-4" onClick={addLead}>Add lead</button>
          </div>

          <div className="grid gap-0">
            {state.leads.map((l, i) => (
              <div key={l.id} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{l.name}{l.businessName && ` · ${l.businessName}`}</h3>
                    <p className="mt-1 text-[0.85rem]" style={{ color: "var(--ink-2)" }}>{l.serviceInterest} · source: {l.source}</p>
                    {l.nextAction && <p className="mt-1 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>Next: {l.nextAction} (due {new Date(l.nextActionDueAt || "").toLocaleDateString()})</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select value={l.stage} onChange={(e) => updateLeadStage(l.id, e.target.value as OpportunityStage)} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.35rem 0.6rem", fontSize: "0.8rem" }}>
                      {STAGES.map((s) => (<option key={s} value={s}>{stageLabel[s]}</option>))}
                    </select>
                    {!l.lastInteractionAt && <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => logLeadResponse(l.id)}>Log response</button>}
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }}
                      onClick={() => {
                        const action = window.prompt("Next action:");
                        const due = window.prompt("Due date (YYYY-MM-DD):");
                        if (action && due) setLeadNextAction(l.id, action, new Date(due).toISOString());
                      }}
                    >
                      Set next action
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "tasks" && (
        <>
          <div className="card mb-8">
            <div className="rule-label">Add task</div>
            <div className="grid gap-3 md:grid-cols-3 mt-3">
              <input placeholder="Title *" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input type="date" value={taskForm.dueAt} onChange={(e) => setTaskForm({ ...taskForm, dueAt: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as OpsTask["priority"] })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
            </div>
            <button className="btn btn-primary mt-4" onClick={addTask}>Add task</button>
          </div>
          <div className="grid gap-0">
            {state.tasks.map((t, i) => (
              <div key={t.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", opacity: t.status === "completed" ? 0.5 : 1 }}>
                <div>
                  <span className="mono text-[0.7rem]" style={{ color: "var(--ink-3)" }}>{t.priority.toUpperCase()}</span>{" "}
                  <span style={{ color: "var(--ink)", textDecoration: t.status === "completed" ? "line-through" : "none" }}>{t.title}</span>
                  <span className="mono text-[0.72rem] ml-2" style={{ color: "var(--ink-3)" }}>due {new Date(t.dueAt).toLocaleDateString()}</span>
                  {t.status === "snoozed" && <span className="mono text-[0.72rem] ml-2" style={{ color: "var(--copper)" }}>snoozed: {t.snoozeReason}</span>}
                </div>
                {t.status === "open" && (
                  <div className="flex gap-2">
                    <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.3rem" }} onClick={() => completeTask(t.id)}>Complete</button>
                    <button className="btn btn-ghost" style={{ fontSize: "0.78rem", paddingBlock: "0.3rem" }} onClick={() => snoozeTask(t.id)}>Snooze</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "promises" && (
        <>
          <div className="card mb-8">
            <div className="rule-label">Log a promise</div>
            <div className="grid gap-3 md:grid-cols-3 mt-3">
              <input placeholder="Commitment text *" value={promiseForm.text} onChange={(e) => setPromiseForm({ ...promiseForm, text: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <input type="date" value={promiseForm.dueAt} onChange={(e) => setPromiseForm({ ...promiseForm, dueAt: e.target.value })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }} />
              <select value={promiseForm.direction} onChange={(e) => setPromiseForm({ ...promiseForm, direction: e.target.value as OpsPromise["direction"] })} style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" }}>
                <option value="livingry_to_client">Livingry → client</option>
                <option value="client_to_livingry">Client → Livingry</option>
              </select>
            </div>
            <button className="btn btn-primary mt-4" onClick={addPromise}>Add promise</button>
          </div>
          <div className="grid gap-0">
            {state.promises.map((p, i) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)", opacity: p.status === "fulfilled" ? 0.5 : 1 }}>
                <div>
                  <span className="mono text-[0.7rem]" style={{ color: "var(--ink-3)" }}>{p.direction === "livingry_to_client" ? "→ CLIENT" : "← CLIENT"}</span>{" "}
                  <span style={{ color: "var(--ink)" }}>{p.text}</span>
                  <span className="mono text-[0.72rem] ml-2" style={{ color: new Date(p.dueAt) < new Date() && p.status === "open" ? "#b23b3b" : "var(--ink-3)" }}>due {new Date(p.dueAt).toLocaleDateString()}</span>
                </div>
                {p.status === "open" && <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.3rem" }} onClick={() => fulfillPromise(p.id)}>Mark fulfilled</button>}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "exceptions" && (
        <div className="grid gap-0">
          {state.exceptions.length === 0 && <p style={{ color: "var(--ink-3)" }}>No exceptions logged yet.</p>}
          {state.exceptions.map((e, i) => (
            <div key={e.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
              <div>
                <span className="mono text-[0.72rem]" style={{ color: severityColor[e.severity] }}>{e.severity} · {leakLabel[e.code]}</span>{" "}
                <span style={{ color: "var(--ink-2)" }}>{e.details}</span>
              </div>
              <span className={`pill ${e.status === "resolved" ? "pill-active" : e.status === "suppressed" ? "pill-future" : "pill-next"}`}>{e.status}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>
        This panel implements the Command Center slice of the Livingry Ops
        Layer Dogfood MVP spec (leak detection, pipeline, tasks, promises,
        exceptions) against browser storage. Data structures match the
        Postgres schema so records can be exported and migrated without
        rework once OPS-001 through OPS-012 are deployed on n8n.
      </p>
    </>
  );
}
