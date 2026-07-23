"use client";

import type { CategoryAnatomy, CategoryId } from "@/lib/ops-dashboard/types";
import {
  LIFECYCLE_STAGES,
  OPS_CONTROL_PLANE,
  PROOF_LEDGER_RAIL,
  RECOVERY_LOOP,
} from "@/lib/ops-dashboard/flow-model";

type Props = {
  categories: CategoryAnatomy[];
  selectedId: CategoryId | null;
  highlightIds: CategoryId[];
  onSelect: (id: CategoryId) => void;
  onOpenLedger: () => void;
};

// Deterministic lifecycle diagram. No absolute positioning, no coordinate math:
// the operating lifecycle is a CSS Flex row (Attract → Intake → Coordinate →
// Execute → Retain) governed by the full-width Ops control rail on top and
// audited by the full-width Proof Ledger rail on the bottom. Recovery is an
// explicit feedback loop beneath the lifecycle. At <=1100px the whole diagram
// collapses to a single vertical column in the same reading order (covering
// tablet and mobile) so nothing is ever compressed or clipped horizontally.
export function LifecycleFlow({ categories, selectedId, highlightIds, onSelect, onOpenLedger }: Props) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, CategoryAnatomy>;
  const isHi = (id: CategoryId) => highlightIds.includes(id);
  const isSel = (id: CategoryId) => selectedId === id;

  // A single lifecycle control. Shows only the category title — the stage label
  // (eyebrow) is rendered once at the stage level so a multi-lane stage like
  // COORDINATE reads as one stage containing several controls.
  function laneNode(id: CategoryId) {
    const c = byId[id];
    if (!c) return null;
    const active = isSel(id) || isHi(id);
    return (
      <button
        key={id}
        type="button"
        onClick={() => onSelect(id)}
        aria-pressed={isSel(id)}
        className="lf-node text-left"
        data-active={active ? "true" : "false"}
        style={{
          border: `2px solid ${active ? "var(--copper)" : "var(--rule)"}`,
          background: "var(--white)",
          color: "var(--ink)",
          borderRadius: "6px",
          padding: "0.55rem 0.6rem",
          minHeight: "44px",
          width: "100%",
          cursor: "pointer",
          boxShadow: isSel(id) ? "0 4px 16px rgba(179,106,58,0.22)" : "0 1px 3px rgba(15,21,18,0.06)",
          transition: "border-color .15s ease, box-shadow .15s ease",
        }}
      >
        <span className="block" style={{ fontSize: "0.84rem", fontWeight: 500, lineHeight: 1.18 }}>{c.title}</span>
      </button>
    );
  }

  return (
    <div className="lf-root" role="group" aria-label="Operating lifecycle and data-flow map">
      <style>{`
        .lf-root { --lf-gap: 0.5rem; display: grid; gap: 0.7rem; }
        .lf-rail {
          border-radius: 8px; padding: 0.7rem 0.9rem; width: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
          cursor: pointer; text-align: left; min-height: 44px;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .lf-rail .lf-rail-title { font-size: 0.9rem; font-weight: 600; line-height: 1.15; }
        .lf-rail .lf-rail-sub { font-size: 0.75rem; line-height: 1.25; }
        .lf-control { background: var(--forest); color: var(--paper); border: 2px solid var(--forest); }
        .lf-control .lf-eyebrow { color: var(--seal); }
        .lf-audit { background: var(--paper-2); color: var(--ink); border: 2px solid var(--rule); }
        .lf-audit .lf-eyebrow { color: var(--copper-2); }
        .lf-rail:focus-visible, .lf-node:focus-visible { outline: 3px solid var(--copper); outline-offset: 2px; }
        .lf-lifecycle { display: flex; align-items: stretch; gap: var(--lf-gap); }
        .lf-stage {
          flex: 1 1 0; min-width: 0; display: grid; gap: 0.35rem; align-content: start;
          background: var(--paper-2); border: 1px solid var(--rule); border-radius: 8px; padding: 0.5rem;
        }
        .lf-stage-eyebrow { font-size: 0.62rem; color: var(--copper-2); }
        .lf-lanes { display: grid; gap: 0.35rem; }
        .lf-conn {
          flex: 0 0 auto; align-self: center; display: grid; justify-items: center; gap: 0.15rem;
          min-width: 30px;
        }
        .lf-conn .lf-conn-label {
          font-size: 0.62rem; color: var(--ink-3); text-align: center; line-height: 1.05; max-width: 68px;
        }
        .lf-arrow { color: var(--ink-3); display: inline-flex; }
        .lf-arrow svg { width: 24px; height: 12px; }
        .lf-recovery {
          border: 2px dashed var(--copper); border-radius: 8px; background: var(--paper-2);
          padding: 0.55rem 0.75rem; display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap;
        }
        .lf-recovery .lf-loopback {
          display: inline-flex; align-items: center; gap: 0.35rem; color: var(--copper-2);
          font-size: 0.68rem; font-weight: 500;
        }
        .lf-recovery .lf-loopback svg { width: 28px; height: 12px; }
        .lf-recovery .lf-node { flex: 1 1 200px; }
        @media (max-width: 1100px) {
          .lf-lifecycle { flex-direction: column; align-items: stretch; }
          .lf-conn { min-width: 0; padding-block: 0.05rem; }
          .lf-conn .lf-conn-label { font-size: 0.78rem; max-width: none; }
          .lf-arrow.lf-arrow-flow svg { transform: rotate(90deg); }
          .lf-stage-eyebrow { font-size: 0.78rem; }
          .lf-rail .lf-rail-sub { font-size: 0.8rem; }
          .lf-lanes { grid-auto-flow: column; grid-auto-columns: 1fr; }
          .lf-recovery { padding: 0.5rem 0.65rem; gap: 0.45rem; }
          .lf-recovery .lf-carries { display: none; }
        }
        @media (max-width: 560px) {
          .lf-lanes { grid-auto-flow: row; }
        }
      `}</style>

      {/* Full-width control rail — governs every stage */}
      <button
        type="button"
        className="lf-rail lf-control"
        onClick={() => onSelect(OPS_CONTROL_PLANE.id)}
        aria-pressed={isSel(OPS_CONTROL_PLANE.id)}
        data-role="control-plane"
        style={{ boxShadow: isHi(OPS_CONTROL_PLANE.id) || isSel(OPS_CONTROL_PLANE.id) ? "0 4px 16px rgba(179,106,58,0.25)" : undefined }}
      >
        <span>
          <span className="block eyebrow lf-eyebrow" style={{ fontSize: "0.62rem" }}>{OPS_CONTROL_PLANE.eyebrow}</span>
          <span className="lf-rail-title">{OPS_CONTROL_PLANE.title}</span>
        </span>
        <span className="lf-rail-sub" style={{ color: "var(--seal)", maxWidth: "26rem" }}>{OPS_CONTROL_PLANE.summary}</span>
      </button>

      {/* Downward governance arrow: ops observes/controls the lifecycle below */}
      <div className="lf-arrow" aria-hidden style={{ justifySelf: "center" }}>
        <svg viewBox="0 0 24 12"><path d="M12 0 L12 12 M7 7 L12 12 L17 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </div>

      {/* Ordered lifecycle */}
      <div className="lf-lifecycle" role="list" aria-label="Operating lifecycle stages">
        {LIFECYCLE_STAGES.map((s) => (
          <div key={s.stage} style={{ display: "contents" }}>
            {s.inbound && (
              <div className="lf-conn" aria-hidden>
                <span className="lf-conn-label">{s.inbound}</span>
                <span className="lf-arrow lf-arrow-flow">
                  <svg viewBox="0 0 24 12"><path d="M0 6 L22 6 M17 1 L22 6 L17 11" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                </span>
              </div>
            )}
            <section className="lf-stage" role="listitem" aria-label={`${s.eyebrow} stage`} data-stage={s.stage}>
              <div className="eyebrow lf-stage-eyebrow">{s.eyebrow}</div>
              <div className="lf-lanes">
                {s.lanes.map((lane) => laneNode(lane.id))}
              </div>
            </section>
          </div>
        ))}
      </div>

      {/* Recovery feedback loop — flows stale opportunities back upstream */}
      <div className="lf-recovery" data-role="feedback-loop">
        <span className="lf-loopback" aria-hidden>
          <span className="lf-arrow">
            <svg viewBox="0 0 28 12"><path d="M28 6 L6 6 M11 1 L6 6 L11 11" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </span>
          loops back to Intake / Coordinate
        </span>
        <button
          type="button"
          onClick={() => onSelect(RECOVERY_LOOP.id)}
          aria-pressed={isSel(RECOVERY_LOOP.id)}
          className="lf-node text-left"
          data-active={isSel(RECOVERY_LOOP.id) || isHi(RECOVERY_LOOP.id) ? "true" : "false"}
          style={{
            minWidth: 0,
            border: `2px solid ${isSel(RECOVERY_LOOP.id) || isHi(RECOVERY_LOOP.id) ? "var(--copper)" : "var(--rule)"}`,
            background: "var(--white)", color: "var(--ink)", borderRadius: "6px",
            padding: "0.5rem 0.6rem", minHeight: "44px", cursor: "pointer",
          }}
        >
          <span className="block eyebrow" style={{ fontSize: "0.62rem", color: "var(--copper-2)" }}>{RECOVERY_LOOP.eyebrow}</span>
          <span className="block" style={{ fontSize: "0.84rem", fontWeight: 500, lineHeight: 1.18 }}>{RECOVERY_LOOP.title}</span>
          <span className="block lf-carries" style={{ fontSize: "0.7rem", color: "var(--ink-3)", marginTop: "0.15rem" }}>carries {RECOVERY_LOOP.carries}</span>
        </button>
      </div>

      {/* Upward audit arrow: every stage writes into the ledger below */}
      <div className="lf-arrow" aria-hidden style={{ justifySelf: "center" }}>
        <svg viewBox="0 0 24 12"><path d="M12 0 L12 12 M7 7 L12 12 L17 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </div>

      {/* Full-width audit rail — receives events from every stage */}
      <button
        type="button"
        className="lf-rail lf-audit"
        onClick={onOpenLedger}
        data-role="audit-rail"
      >
        <span>
          <span className="block eyebrow lf-eyebrow" style={{ fontSize: "0.62rem" }}>{PROOF_LEDGER_RAIL.eyebrow}</span>
          <span className="lf-rail-title">{PROOF_LEDGER_RAIL.title}</span>
        </span>
        <span className="lf-rail-sub" style={{ color: "var(--ink-3)", maxWidth: "26rem" }}>{PROOF_LEDGER_RAIL.summary}</span>
      </button>
    </div>
  );
}
