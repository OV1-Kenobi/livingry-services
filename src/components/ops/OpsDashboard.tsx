"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CategoryId, DashboardMode } from "@/lib/ops-dashboard/types";
import { useOpsDashboard } from "./useOpsDashboard";
import { FlowMap } from "./FlowMap";
import { CategoryDetail } from "./CategoryDetail";
import { ApprovalQueue } from "./ApprovalQueue";
import { ProofLedger } from "./ProofLedger";
import { ScenarioPanel } from "./ScenarioPanel";
import { healthColor, tapTarget } from "./ui";

type Tray = "category" | "approvals" | "ledger" | "scenarios";

// The shared full-viewport control panel. The SAME shell renders both the
// public streetfront demo (mode="public") and the authenticated client product
// (mode="private"). Mode is fixed by the route and passed in as a prop — there
// is no client-side control that can escalate one into the other.
export function OpsDashboard({ mode }: { mode: DashboardMode }) {
  const store = useOpsDashboard(mode);
  const [selectedId, setSelectedId] = useState<CategoryId>("ops_layer");
  const [tray, setTray] = useState<Tray>("category");
  const [scenarioId, setScenarioId] = useState<string | null>(null);

  const selectedCategory = useMemo(
    () => store.categories.find((c) => c.id === selectedId) ?? store.categories[0],
    [store.categories, selectedId],
  );

  // Which nodes/edges to highlight on the flow map.
  const highlightIds = useMemo<CategoryId[]>(() => {
    if (tray === "scenarios" && scenarioId) {
      const sc = store.scenarios.find((s) => s.id === scenarioId);
      if (sc) return Array.from(new Set(sc.steps.map((s) => s.categoryId)));
    }
    return selectedCategory ? [selectedCategory.id] : [];
  }, [tray, scenarioId, store.scenarios, selectedCategory]);

  const pendingCount = store.approvals.filter((a) => a.status === "pending").length;
  const isPublic = mode === "public";

  function selectCategory(id: CategoryId) {
    setSelectedId(id);
    setTray("category");
  }

  const reviewHref = `/system-review?ops_category=${encodeURIComponent(selectedCategory?.id ?? "")}${scenarioId ? `&ops_scenario=${encodeURIComponent(scenarioId)}` : ""}`;

  return (
    <div style={{ background: "var(--paper)" }}>
      {/* Top status bar */}
      <div style={{ borderBottom: "1px solid var(--rule)", background: "var(--white)" }}>
        <div className="container" style={{ paddingBlock: "0.75rem" }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="eyebrow" style={{ color: "var(--copper-2)" }}>Livingry Ops</span>
              <span
                className="mono text-[0.68rem]"
                style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", border: "1px solid var(--rule)", color: isPublic ? "var(--copper)" : "var(--forest)", background: "var(--paper-2)" }}
              >
                {isPublic ? "Public demo · Demo Data" : "Client control panel · Live config"}
              </span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                {store.health.map((h) => (
                  <span key={h.label} className="flex items-center gap-1 text-[0.74rem]" style={{ color: "var(--ink-2)" }} title={h.detail}>
                    <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: healthColor[h.status], display: "inline-block" }} />
                    {h.label}
                  </span>
                ))}
              </div>
              <span className="mono text-[0.72rem]" style={{ color: pendingCount ? "var(--copper)" : "var(--ink-3)" }}>{pendingCount} pending</span>
              {isPublic && (
                <button className="btn btn-ghost" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={store.resetDemo}>Reset demo</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: "1.5rem" }}>
        <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* Compact sidebar */}
            <aside>
              <div className="rule-label">Systems</div>
              <nav className="grid gap-1 mt-2" aria-label="Categories">
                {store.categories.map((c) => (
                  <button
                    key={c.id}
                    className="text-left"
                    aria-pressed={tray === "category" && selectedId === c.id}
                    onClick={() => selectCategory(c.id)}
                    style={{
                      ...tapTarget,
                      padding: "0.5rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: tray === "category" && selectedId === c.id ? "var(--copper)" : "transparent",
                      background: tray === "category" && selectedId === c.id ? "var(--paper-2)" : "transparent",
                      color: "var(--ink)",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    <span className="block eyebrow" style={{ fontSize: "0.55rem", color: "var(--copper-2)" }}>{c.eyebrow}</span>
                    {c.title}
                  </button>
                ))}
              </nav>

              <div className="rule-label mt-6">Views</div>
              <nav className="grid gap-1 mt-2" aria-label="Dashboard views">
                {([
                  ["approvals", `Approvals (${pendingCount})`],
                  ["ledger", "Proof ledger"],
                  ["scenarios", "Guided scenarios"],
                ] as [Tray, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    className="text-left"
                    aria-pressed={tray === key}
                    onClick={() => setTray(key)}
                    style={{
                      ...tapTarget,
                      padding: "0.5rem 0.6rem",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: tray === key ? "var(--copper)" : "transparent",
                      background: tray === key ? "var(--paper-2)" : "transparent",
                      color: "var(--ink)",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main column */}
            <main className="grid gap-6" style={{ minWidth: 0 }}>
              <section aria-label="Work and data-flow map">
                <div className="rule-label">Work &amp; data flow</div>
                <p className="text-[0.82rem] mt-1 mb-3" style={{ color: "var(--ink-3)" }}>
                  Attract → intake → coordinate → execute → retain, all governed by the Ops layer. Select any node to inspect it.
                </p>
                <FlowMap
                  categories={store.categories}
                  edges={store.edges}
                  selectedId={tray === "category" ? selectedId : null}
                  highlightIds={highlightIds}
                  onSelect={selectCategory}
                />
              </section>

              <section className="card" aria-live="polite" style={{ minWidth: 0 }}>
                {tray === "category" && selectedCategory && (
                  <CategoryDetail category={selectedCategory} store={store} />
                )}
                {tray === "approvals" && <ApprovalQueue store={store} />}
                {tray === "ledger" && <ProofLedger store={store} />}
                {tray === "scenarios" && (
                  <ScenarioPanel scenarios={store.scenarios} activeId={scenarioId} onSelect={setScenarioId} />
                )}
              </section>

              {/* Conversion CTAs — preserve explored context via query params */}
              {isPublic && (
                <section className="card-flat" style={{ background: "var(--paper-2)" }}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div style={{ maxWidth: "34rem" }}>
                      <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>Make this your operating system</h3>
                      <p className="text-[0.85rem] mt-1" style={{ color: "var(--ink-2)" }}>
                        This is a live, safe simulation. Your real dashboard is custom-built on your own tools and data.
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Link href={reviewHref} className="btn btn-primary" style={tapTarget}>Build This for My Business <span aria-hidden>→</span></Link>
                      <Link href={reviewHref} className="btn btn-secondary" style={tapTarget}>Map My Workflow</Link>
                      <Link href="/system-review" className="btn btn-ghost" style={tapTarget}>Find My Biggest Leak</Link>
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
