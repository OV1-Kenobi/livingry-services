"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createOpportunity, createPromise, createTask, fetchDashboardKpis, fetchExceptions,
  fetchOpportunities, fetchPromises, fetchTasks, resolveTenantId, updateException,
  updatePromise, updateTask, type DashboardKpis, type DbException, type DbOpportunity,
  type DbPromise, type DbTask,
} from "@/lib/ops-api-client";

const stageLabel: Record<string, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified", discovery_scheduled: "Discovery scheduled",
  discovery_complete: "Discovery complete", proposal_drafting: "Proposal drafting", proposal_sent: "Proposal sent",
  negotiation: "Negotiation", won: "Won", lost: "Lost", nurture: "Nurture", disqualified: "Disqualified",
};

const severityColor: Record<string, string> = { P1: "#b23b3b", P2: "#b23b3b", P3: "var(--copper)", P4: "var(--ink-3)" };
const inputStyle = { border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.55rem 0.8rem" };

export default function OpsCenterPage() {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tab, setTab] = useState<"attention" | "pipeline" | "tasks" | "promises" | "exceptions">("attention");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [kpis, setKpis] = useState<DashboardKpis | null>(null);
  const [opportunities, setOpportunities] = useState<DbOpportunity[]>([]);
  const [tasks, setTasks] = useState<DbTask[]>([]);
  const [promises, setPromises] = useState<DbPromise[]>([]);
  const [exceptions, setExceptions] = useState<DbException[]>([]);

  const [oppForm, setOppForm] = useState({ service_type: "", next_action: "", next_action_due_at: "" });
  const [taskForm, setTaskForm] = useState({ title: "", due_at: "", priority: "medium" as DbTask["priority"] });
  const [promiseForm, setPromiseForm] = useState({ text: "", due_at: "", direction: "livingry_to_client" as DbPromise["direction"] });

  useEffect(() => {
    (async () => {
      try {
        const id = await resolveTenantId();
        setTenantId(id);
      } catch (e: any) {
        setError(e.message || "Failed to resolve tenant. Run /api/ops/setup first.");
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (tenantId) refreshAll(tenantId);
  }, [tenantId]);

  async function refreshAll(id: string) {
    setLoading(true);
    setError(null);
    try {
      const [k, o, t, p, e] = await Promise.all([
        fetchDashboardKpis(id), fetchOpportunities(id), fetchTasks(id), fetchPromises(id), fetchExceptions(id),
      ]);
      setKpis(k); setOpportunities(o); setTasks(t); setPromises(p); setExceptions(e);
    } catch (e: any) {
      setError(e.message || "Failed to load Ops Center data");
    } finally {
      setLoading(false);
    }
  }

  async function addOpportunity() {
    if (!tenantId || !oppForm.service_type) return;
    await createOpportunity(tenantId, {
      service_type: oppForm.service_type,
      next_action: oppForm.next_action || undefined,
      next_action_due_at: oppForm.next_action_due_at || undefined,
    });
    setOppForm({ service_type: "", next_action: "", next_action_due_at: "" });
    refreshAll(tenantId);
  }

  async function addTask() {
    if (!tenantId || !taskForm.title || !taskForm.due_at) return;
    await createTask(tenantId, taskForm);
    setTaskForm({ title: "", due_at: "", priority: "medium" });
    refreshAll(tenantId);
  }

  async function completeTask(id: string) {
    if (!tenantId) return;
    await updateTask(id, { status: "completed" });
    refreshAll(tenantId);
  }

  async function snoozeTask(id: string) {
    if (!tenantId) return;
    const reason = window.prompt("Snooze reason:") || "unspecified";
    await updateTask(id, { status: "snoozed", snooze_reason: reason });
    refreshAll(tenantId);
  }

  async function addPromise() {
    if (!tenantId || !promiseForm.text || !promiseForm.due_at) return;
    await createPromise(tenantId, promiseForm);
    setPromiseForm({ text: "", due_at: "", direction: "livingry_to_client" });
    refreshAll(tenantId);
  }

  async function fulfillPromise(id: string) {
    if (!tenantId) return;
    await updatePromise(id, { status: "fulfilled" });
    refreshAll(tenantId);
  }

  async function resolveExceptionRow(id: string) {
    if (!tenantId) return;
    await updateException(id, { status: "resolved" });
    refreshAll(tenantId);
  }

  async function suppressExceptionRow(id: string) {
    if (!tenantId) return;
    await updateException(id, { status: "suppressed" });
    refreshAll(tenantId);
  }

  const openExceptions = useMemo(() => exceptions.filter((e) => e.status !== "resolved" && e.status !== "suppressed"), [exceptions]);
  const dueToday = useMemo(() => {
    const today = new Date().toDateString();
    return tasks.filter((t) => t.status === "open" && new Date(t.due_at).toDateString() === today);
  }, [tasks]);
  const openPromisesCount = useMemo(() => promises.filter((p) => p.status === "open").length, [promises]);
  const activeOppsCount = useMemo(() => opportunities.filter((o) => !["won", "lost", "disqualified"].includes(o.stage)).length, [opportunities]);

  if (error) {
    return (
      <div className="card">
        <div className="rule-label" style={{ color: "#b23b3b" }}>Ops Center error</div>
        <p className="mt-2" style={{ color: "var(--ink-2)" }}>{error}</p>
        <p className="mt-2 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
          If the tenant hasn&apos;t been created yet, POST to <code>/api/ops/setup</code> with the
          <code> x-setup-secret</code> header first, then reload.
        </p>
      </div>
    );
  }

  if (loading || !tenantId) {
    return <p style={{ color: "var(--ink-3)" }}>Loading ops layer…</p>;
  }

  const tabs: { id: typeof tab; label: string; count?: number }[] = [
    { id: "attention", label: "Needs Attention", count: openExceptions.length },
    { id: "pipeline", label: "Pipeline", count: opportunities.length },
    { id: "tasks", label: "Tasks", count: tasks.filter((t) => t.status === "open").length },
    { id: "promises", label: "Promises", count: openPromisesCount },
    { id: "exceptions", label: "Exception Log", count: exceptions.length },
  ];

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="rule-label">Livingry Ops Layer · Live control panel</div>
          <p style={{ color: "var(--ink-2)", maxWidth: "40rem" }}>
            Live campaign-launch working panel backed by Postgres — every
            record here is shared, persisted, and multi-device. Opportunities,
            tasks, promises, and exceptions are real CRUD entities wired to
            the Ops API.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => tenantId && refreshAll(tenantId)}>Refresh</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="card"><div className="eyebrow">Needs attention</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)", color: "#b23b3b" }}>{kpis?.open_exceptions ?? openExceptions.length}</div></div>
        <div className="card"><div className="eyebrow">Due today</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{dueToday.length}</div></div>
        <div className="card"><div className="eyebrow">Active pipeline</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{activeOppsCount}</div></div>
        <div className="card"><div className="eyebrow">Open promises</div><div className="serif mt-2" style={{ fontSize: "var(--step-3)" }}>{kpis?.overdue_promises ?? openPromisesCount}</div></div>
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
                <span className="mono text-[0.72rem]" style={{ color: severityColor[e.severity] }}>● {e.severity} · {e.code}</span>
                <p className="mt-1" style={{ color: "var(--ink)" }}>{e.resolution || JSON.stringify(e.details_json)}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => resolveExceptionRow(e.id)}>Resolve</button>
                <button className="btn btn-ghost" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => suppressExceptionRow(e.id)}>Suppress</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "pipeline" && (
        <>
          <div className="card mb-8">
            <div className="rule-label">Log new opportunity</div>
            <div className="grid gap-3 md:grid-cols-2 mt-3">
              <input placeholder="Service type *" value={oppForm.service_type} onChange={(e) => setOppForm({ ...oppForm, service_type: e.target.value })} style={inputStyle} />
              <input placeholder="Next action" value={oppForm.next_action} onChange={(e) => setOppForm({ ...oppForm, next_action: e.target.value })} style={inputStyle} />
              <input type="date" placeholder="Next action due" value={oppForm.next_action_due_at} onChange={(e) => setOppForm({ ...oppForm, next_action_due_at: e.target.value })} style={inputStyle} />
            </div>
            <button className="btn btn-primary mt-4" onClick={addOpportunity}>Add opportunity</button>
          </div>

          <div className="grid gap-0">
            {opportunities.length === 0 && <p style={{ color: "var(--ink-3)" }}>No opportunities yet.</p>}
            {opportunities.map((o, i) => (
              <div key={o.id} className="py-4" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{o.service_type || "Untitled opportunity"}{o.company_name && ` · ${o.company_name}`}</h3>
                    <p className="mt-1 text-[0.85rem]" style={{ color: "var(--ink-2)" }}>Stage: {stageLabel[o.stage] || o.stage}</p>
                    {o.next_action && <p className="mt-1 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>Next: {o.next_action}{o.next_action_due_at && ` (due ${new Date(o.next_action_due_at).toLocaleDateString()})`}</p>}
                  </div>
                  <span className="pill pill-next">{stageLabel[o.stage] || o.stage}</span>
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
              <input placeholder="Title *" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} style={inputStyle} />
              <input type="datetime-local" value={taskForm.due_at} onChange={(e) => setTaskForm({ ...taskForm, due_at: e.target.value })} style={inputStyle} />
              <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as DbTask["priority"] })} style={inputStyle}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button className="btn btn-primary mt-4" onClick={addTask}>Add task</button>
          </div>

          <div className="grid gap-0">
            {tasks.length === 0 && <p style={{ color: "var(--ink-3)" }}>No tasks yet.</p>}
            {tasks.map((t, i) => (
              <div key={t.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div>
                  <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{t.priority.toUpperCase()} · due {new Date(t.due_at).toLocaleString()}</span>
                  <p style={{ color: "var(--ink)" }}>{t.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`pill ${t.status === "completed" ? "pill-active" : t.status === "snoozed" ? "pill-future" : "pill-next"}`}>{t.status}</span>
                  {t.status === "open" && (
                    <>
                      <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => completeTask(t.id)}>Complete</button>
                      <button className="btn btn-ghost" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => snoozeTask(t.id)}>Snooze</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "promises" && (
        <>
          <div className="card mb-8">
            <div className="rule-label">Log promise</div>
            <div className="grid gap-3 md:grid-cols-3 mt-3">
              <input placeholder="Promise text *" value={promiseForm.text} onChange={(e) => setPromiseForm({ ...promiseForm, text: e.target.value })} style={inputStyle} />
              <input type="datetime-local" value={promiseForm.due_at} onChange={(e) => setPromiseForm({ ...promiseForm, due_at: e.target.value })} style={inputStyle} />
              <select value={promiseForm.direction} onChange={(e) => setPromiseForm({ ...promiseForm, direction: e.target.value as DbPromise["direction"] })} style={inputStyle}>
                <option value="livingry_to_client">Livingry → Client</option>
                <option value="client_to_livingry">Client → Livingry</option>
              </select>
            </div>
            <button className="btn btn-primary mt-4" onClick={addPromise}>Add promise</button>
          </div>

          <div className="grid gap-0">
            {promises.length === 0 && <p style={{ color: "var(--ink-3)" }}>No promises logged yet.</p>}
            {promises.map((p, i) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
                <div>
                  <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{p.direction === "livingry_to_client" ? "Livingry → Client" : "Client → Livingry"} · due {new Date(p.due_at).toLocaleString()}</span>
                  <p style={{ color: "var(--ink)" }}>{p.text}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`pill ${p.status === "fulfilled" ? "pill-active" : "pill-next"}`}>{p.status}</span>
                  {p.status === "open" && <button className="btn btn-secondary" style={{ fontSize: "0.78rem", paddingBlock: "0.35rem" }} onClick={() => fulfillPromise(p.id)}>Fulfill</button>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "exceptions" && (
        <div className="grid gap-0">
          {exceptions.length === 0 && <p style={{ color: "var(--ink-3)" }}>No exceptions logged yet.</p>}
          {exceptions.map((e, i) => (
            <div key={e.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
              <div>
                <span className="mono text-[0.72rem]" style={{ color: severityColor[e.severity] }}>{e.severity} · {e.code}</span>{" "}
                <span style={{ color: "var(--ink-2)" }}>{e.resolution || JSON.stringify(e.details_json)}</span>
              </div>
              <span className={`pill ${e.status === "resolved" ? "pill-active" : e.status === "suppressed" ? "pill-future" : "pill-next"}`}>{e.status}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>
        This panel implements the Command Center slice of the Livingry Ops
        Layer Dogfood MVP spec (leak detection, pipeline, tasks, promises,
        exceptions) against the live Postgres-backed Ops API — every action
        here writes to the shared database, not browser storage.
      </p>
    </>
  );
}
