"use client";

import { CATEGORY_BY_ID } from "@/lib/ops-dashboard/categories";
import type { Scenario } from "@/lib/ops-dashboard/types";
import { tapTarget } from "./ui";

type Props = {
  scenarios: Scenario[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

// Guided walk-throughs. Selecting a scenario highlights its path on the flow
// map (handled by the shell) and expands each step's full anatomy: input,
// processing, output, human intervention, the control that bounds it, and how
// success is measured.
export function ScenarioPanel({ scenarios, activeId, onSelect }: Props) {
  const active = scenarios.find((s) => s.id === activeId) ?? null;

  return (
    <div>
      <div className="rule-label">Guided scenarios</div>
      <div className="flex gap-2 flex-wrap mt-2 mb-4">
        {scenarios.map((s) => (
          <button
            key={s.id}
            className={s.id === activeId ? "btn btn-primary" : "btn btn-secondary"}
            style={{ ...tapTarget, fontSize: "0.78rem", paddingBlock: "0.4rem" }}
            aria-pressed={s.id === activeId}
            onClick={() => onSelect(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {!active && (
        <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Pick a scenario to trace its path across the systems.</p>
      )}

      {active && (
        <div>
          <p className="text-[0.9rem] mb-4" style={{ color: "var(--ink-2)" }}>{active.summary}</p>
          <ol className="grid gap-3">
            {active.steps.map((step, i) => {
              const cat = CATEGORY_BY_ID[step.categoryId];
              return (
                <li key={i} className="card">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>Step {i + 1}</span>
                    <span className="eyebrow" style={{ fontSize: "0.6rem", color: "var(--copper-2)" }}>{cat?.title ?? step.categoryId}</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 mt-2 text-[0.82rem]">
                    <div><strong style={{ color: "var(--ink)" }}>What enters:</strong> <span style={{ color: "var(--ink-2)" }}>{step.input}</span></div>
                    <div><strong style={{ color: "var(--ink)" }}>What happens:</strong> <span style={{ color: "var(--ink-2)" }}>{step.processing}</span></div>
                    <div><strong style={{ color: "var(--ink)" }}>What leaves:</strong> <span style={{ color: "var(--ink-2)" }}>{step.output}</span></div>
                    <div><strong style={{ color: "var(--ink)" }}>Human intervenes:</strong> <span style={{ color: "var(--ink-2)" }}>{step.humanIntervention}</span></div>
                    <div><strong style={{ color: "var(--ink)" }}>Control:</strong> <span style={{ color: "var(--ink-2)" }}>{step.control}</span></div>
                    <div><strong style={{ color: "var(--ink)" }}>Success measured:</strong> <span style={{ color: "var(--ink-2)" }}>{step.successMeasure}</span></div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
