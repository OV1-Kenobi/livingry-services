"use client";

import type { CategoryAnatomy } from "@/lib/ops-dashboard/types";
import { statusColor, statusLabel, tapTarget } from "./ui";
import type { OpsDashboardStore } from "./useOpsDashboard";

function Facet({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: "0.62rem" }}>{label}</div>
      <ul className="mt-1 grid gap-1">
        {items.map((it, i) => (
          <li key={i} className="text-[0.85rem]" style={{ color: "var(--ink-2)" }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

// Drill-down tray for one category. Answers the six required questions
// (what it does / what enters / what happens / what leaves / where humans
// intervene / how success is measured) and exposes the tool-configuration
// system. Public mode shows the vendor-neutral catalog as resettable
// simulated slots; private mode shows configured vendors with full
// choose / change / add / disable / replace controls and change history.
export function CategoryDetail({ category, store }: { category: CategoryAnatomy; store: OpsDashboardStore }) {
  const { mode } = store;
  const catalog = store.catalog[category.id] || [];
  const tools = store.toolsByCategory(category.id);

  return (
    <div>
      <div className="eyebrow" style={{ color: "var(--copper-2)" }}>{category.eyebrow}</div>
      <h3 className="serif mt-1" style={{ fontSize: "var(--step-2)" }}>{category.title}</h3>
      <p className="mt-2" style={{ color: "var(--ink-2)" }}>{category.purpose}</p>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Facet label="What enters" items={category.inputs} />
        <Facet label="What happens" items={category.processing} />
        <Facet label="What leaves" items={category.outputs} />
        <Facet label="Where humans intervene" items={category.humanIntervention} />
        <Facet label="How success is measured" items={category.successMeasures} />
        <Facet label="Capabilities" items={category.capabilities} />
        <Facet label="Permissions" items={category.permissions} />
        <Facet label="Approval requirements" items={category.approvalRequirements} />
      </div>

      <div className="mt-8">
        <div className="rule-label">
          {mode === "private" ? "Configured tools" : "Tool slots"}
        </div>

        {mode === "public" && (
          <p className="text-[0.82rem] mb-4" style={{ color: "var(--ink-3)" }}>
            Public demo shows generic, interchangeable tool slots only. The
            authenticated client dashboard shows the client&apos;s own
            configured tools here. Select a slot below to simulate choosing a
            vendor — it changes nothing and resets on demand.
          </p>
        )}

        {mode === "private" && store.configState === "loading" && (
          <p style={{ color: "var(--ink-3)" }}>Loading configuration…</p>
        )}
        {mode === "private" && store.configState === "error" && (
          <div className="card" style={{ borderColor: "#b23b3b" }}>
            <p className="text-[0.85rem]" style={{ color: "#b23b3b" }}>{store.configError}</p>
            <button className="btn btn-secondary mt-3" style={tapTarget} onClick={store.resetConfig}>Retry</button>
          </div>
        )}

        {mode === "private" && store.configState === "ready" && (
          <div className="grid gap-3">
            {tools.length === 0 && (
              <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>No tool configured in this category yet. Add one from the catalog below.</p>
            )}
            {tools.map((t) => (
              <div key={t.id} className="card" style={{ opacity: t.enabled ? 1 : 0.6 }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="serif" style={{ fontSize: "1rem" }}>{t.displayName}</h4>
                      <span className="mono text-[0.68rem]" style={{ color: statusColor[t.status] }}>● {statusLabel[t.status]}</span>
                    </div>
                    <p className="text-[0.82rem] mt-1" style={{ color: "var(--ink-2)" }}>{t.role}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="btn btn-secondary" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={() => store.setToolEnabled(t.id, !t.enabled)}>
                      {t.enabled ? "Disable" : "Enable"}
                    </button>
                    <button className="btn btn-ghost" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={() => store.removeTool(t.id)}>Remove</button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 mt-3">
                  <Facet label="Data inputs" items={t.dataInputs.length ? t.dataInputs : ["—"]} />
                  <Facet label="Data outputs" items={t.dataOutputs.length ? t.dataOutputs : ["—"]} />
                  <Facet label="Workflow participation" items={t.workflowParticipation.length ? t.workflowParticipation : ["—"]} />
                  <Facet label="Approval requirements" items={t.approvalRequirements} />
                </div>

                <details className="mt-3">
                  <summary className="text-[0.8rem]" style={{ color: "var(--ink-3)", cursor: "pointer" }}>Replace with a candidate alternative</summary>
                  <div className="grid gap-2 mt-2">
                    {catalog.map((cand) => (
                      <button key={cand.id} className="btn btn-secondary text-left" style={{ ...tapTarget, fontSize: "0.78rem", justifyContent: "flex-start" }} onClick={() => store.replaceTool(t.id, cand)}>
                        {cand.name} — <span style={{ color: "var(--ink-3)" }}>{cand.capability}</span>
                      </button>
                    ))}
                  </div>
                </details>

                <details className="mt-2">
                  <summary className="text-[0.8rem]" style={{ color: "var(--ink-3)", cursor: "pointer" }}>Change history ({t.changeHistory.length})</summary>
                  <ul className="mt-2 grid gap-1">
                    {t.changeHistory.map((h, i) => (
                      <li key={i} className="text-[0.75rem]" style={{ color: "var(--ink-3)" }}>
                        <span className="mono">{new Date(h.at).toLocaleDateString()}</span> · {h.action} — {h.detail}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        )}

        {/* Vendor-neutral catalog — candidate alternatives / add controls */}
        <div className="mt-5">
          <div className="eyebrow" style={{ fontSize: "0.62rem" }}>Vendor-neutral catalog</div>
          <div className="grid gap-2 mt-2">
            {catalog.map((cand) => {
              const selected = (store.simSelections[category.id] || []).includes(cand.id);
              return (
                <div key={cand.id} className="flex items-center justify-between gap-3 flex-wrap py-2" style={{ borderTop: "1px solid var(--rule)" }}>
                  <div style={{ maxWidth: "28rem" }}>
                    <span style={{ color: "var(--ink)", fontSize: "0.86rem" }}>{cand.name}</span>
                    <p className="text-[0.78rem]" style={{ color: "var(--ink-3)" }}>{cand.capability}</p>
                  </div>
                  {mode === "public" ? (
                    <button
                      className="btn"
                      style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem", background: selected ? "var(--forest)" : "transparent", color: selected ? "var(--paper)" : "var(--ink)", border: "1px solid var(--ink)" }}
                      aria-pressed={selected}
                      onClick={() => store.toggleSimSelection(category.id, cand.id)}
                    >
                      {selected ? "Selected (demo)" : "Try this slot"}
                    </button>
                  ) : (
                    <button className="btn btn-secondary" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={() => store.addTool(category.id, cand)}>
                      Add to category
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
