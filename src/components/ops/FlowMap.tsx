"use client";

import type { CategoryAnatomy, CategoryId, FlowEdge } from "@/lib/ops-dashboard/types";

type Props = {
  categories: CategoryAnatomy[];
  edges: FlowEdge[];
  selectedId: CategoryId | null;
  highlightIds: CategoryId[];
  onSelect: (id: CategoryId) => void;
};

// Central interactive work / data-flow map. Categories are positioned as an
// operating pipeline (attract → intake → coordinate → execute → retain) with
// the Ops Layer governing at the center. Nodes are real buttons so the map is
// fully keyboard accessible; the SVG layer draws directional data-flow edges.
export function FlowMap({ categories, edges, selectedId, highlightIds, onSelect }: Props) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, CategoryAnatomy>;

  return (
    <div
      className="relative ops-flowmap"
      role="group"
      aria-label="Work and data-flow map"
      style={{ width: "100%", background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: "8px", overflow: "hidden" }}
    >
      {/* Desktop keeps the wide 16:10 map. At ~390px the map goes taller and
          nodes narrow so labels stay legible (>=12px) and touch targets stay
          >=44px without introducing nested scrolling. */}
      <style>{`
        .ops-flowmap {
          --flow-aspect: 16 / 10;
          --flow-min-h: 320px;
          --node-max: 160px;
          --node-eyebrow: 0.6rem;
          --node-title: 0.8rem;
          aspect-ratio: var(--flow-aspect);
          min-height: var(--flow-min-h);
        }
        @media (max-width: 640px) {
          .ops-flowmap {
            --flow-aspect: 3 / 4;
            --flow-min-h: 480px;
            --node-max: 42vw;
            --node-eyebrow: 0.75rem;
            --node-title: 0.82rem;
          }
        }
      `}</style>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <marker id="opsArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-3)" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const from = byId[e.from];
          const to = byId[e.to];
          if (!from || !to) return null;
          const active = highlightIds.includes(e.from) && highlightIds.includes(e.to);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={active ? "var(--copper)" : "var(--rule)"}
              strokeWidth={active ? 0.8 : 0.4}
              markerEnd="url(#opsArrow)"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {categories.map((c) => {
        const selected = selectedId === c.id;
        const highlighted = highlightIds.includes(c.id);
        const isOps = c.kind === "orchestration";
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            aria-pressed={selected}
            className="absolute text-left"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: "translate(-50%, -50%)",
              maxWidth: "var(--node-max)",
              padding: "0.5rem 0.7rem",
              minHeight: "44px",
              borderRadius: "8px",
              border: `2px solid ${selected || highlighted ? "var(--copper)" : isOps ? "var(--forest)" : "var(--rule)"}`,
              background: isOps ? "var(--forest)" : "var(--white)",
              color: isOps ? "var(--paper)" : "var(--ink)",
              boxShadow: selected ? "0 4px 16px rgba(179,106,58,0.25)" : "0 1px 4px rgba(15,21,18,0.06)",
              cursor: "pointer",
              transition: "border-color .15s ease, box-shadow .15s ease",
            }}
          >
            <span className="eyebrow block" style={{ color: isOps ? "var(--seal)" : "var(--copper-2)", fontSize: "var(--node-eyebrow)" }}>{c.eyebrow}</span>
            <span className="block" style={{ fontSize: "var(--node-title)", fontWeight: 500, lineHeight: 1.15 }}>{c.title}</span>
          </button>
        );
      })}
    </div>
  );
}
