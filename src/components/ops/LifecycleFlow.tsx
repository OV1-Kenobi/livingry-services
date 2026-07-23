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
// explicit feedback loop beneath the lifecycle. On narrow screens the whole
// diagram collapses to a single vertical column in the same reading order.
export function LifecycleFlow({ categories, selectedId, highlightIds, onSelect, onOpenLedger }: Props) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, CategoryAnatomy>;
  const isHi = (id: CategoryId) => highlightIds.includes(id);
  const isSel = (id: CategoryId) => selectedId === id;

  function stageNode(id: CategoryId) {
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
          borderRadius: "8px",
          padding: "0.65rem 0.7rem",
          minHeight: "44px",
          width: "100%",
          cursor: "pointer",
          boxShadow: isSel(id) ? "0 4px 16px rgba(179,106,58,0.22)" : "0 1px 4px rgba(15,21,18,0.06)",
          transition: "border-color .15s ease, box-shadow .15s ease",
        }}
      >
        <span className="block eyebrow" style={{ fontSize: "0.62rem", color: "var(--copper-2)" }}>{c.eyebrow}</span>
        <span className="block" style={{ fontSize: "0.84rem", fontWeight: 500, lineHeight: 1.18 }}>{c.title}</span>
      </button>
    );
  }

  return (
    <div className="lf-root" role="group" aria-label="Operating lifecycle and data-flow map">
      <style>{`
        .lf-root { --lf-gap: 0.55rem; display: grid; gap: 0.75rem; }
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
        .lf-stage { flex: 1 1 0; min-width: 0; display: grid; gap: 0.4rem; align-content: start; }
        .lf-lanes { display: grid; gap: 0.4rem; }
        .lf-conn {
          flex: 0 0 auto; align-self: center; display: grid; justify-items: center; gap: 0.15rem;
          min-width: 34px;
        }
        .lf-conn .lf-conn-label {
          font-size: 0.62rem; color: var(--ink-3); text-align: center; line-height: 1.05; max-width: 74px;
        }
        .lf-arrow { color: var(--ink-3); display: inline-flex; }
        .lf-arrow svg { width: 26px; height: 12px; }
        .lf-recovery {
          border: 2px dashed var(--copper); border-radius: 8px; background: var(--paper-2);
          padding: 0.6rem 0.8rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
        }
        .lf-recovery .lf-loopback {
          display: inline-flex; align-items: center; gap: 0.35rem; color: var(--copper-2);
          font-size: 0.66rem;
        }
        .lf-recovery .lf-loopback svg { width: 30px; height: 12px; }
        @media (max-width: 640px) {
          .lf-lifecycle { flex-direction: column; align-items: stretch; }
          .lf-conn { min-width: 0; }
          .lf-conn .lf-conn-label { font-size: 0.75rem; max-width: none; }
          .lf-arrow.lf-arrow-flow svg { transform: rotate(90deg); }
          .lf-rail .lf-rail-sub { font-size: 0.8rem; }
          .lf-recovery { flex-direction: column; align-items: stretch; }
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
        <svg viewBox="0 0 26 12"><path d="M13 0 L13 12 M8 7 L13 12 L18 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </div>

      {/* Ordered lifecycle */}
      <div className="lf-lifecycle" role="list" aria-label="Operating lifecycle stages">
        {LIFECYCLE_STAGES.map((s) => (
          <div key={s.stage} style={{ display: "contents" }}>
            {s.inbound && (
              <div className="lf-conn" aria-hidden>
                <span className="lf-conn-label">{s.inbound}</span>
                <span className="lf-arrow lf-arrow-flow">
                  <svg viewBox="0 0 26 12"><path d="M0 6 L24 6 M19 1 L24 6 L19 11" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                </span>
              </div>
            )}
            <section className="lf-stage" role="listitem" aria-label={`${s.eyebrow} stage`}>
              <div className="lf-lanes">
                {s.lanes.map((lane) => stageNode(lane.id))}
              </div>
            </section>
          </div>
        ))}
      </div>

      {/* Recovery feedback loop — flows stale opportunities back upstream */}
      <div className="lf-recovery" data-role="feedback-loop">
        <span className="lf-loopback" aria-hidden>
          <span className="lf-arrow">
            <svg viewBox="0 0 30 12"><path d="M30 6 L6 6 M11 1 L6 6 L11 11" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
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
            flex: "1 1 220px", minWidth: 0,
            border: `2px solid ${isSel(RECOVERY_LOOP.id) || isHi(RECOVERY_LOOP.id) ? "var(--copper)" : "var(--rule)"}`,
            background: "var(--white)", color: "var(--ink)", borderRadius: "8px",
            padding: "0.6rem 0.7rem", minHeight: "44px", cursor: "pointer",
          }}
        >
          <span className="block eyebrow" style={{ fontSize: "0.62rem", color: "var(--copper-2)" }}>{RECOVERY_LOOP.eyebrow}</span>
          <span className="block" style={{ fontSize: "0.84rem", fontWeight: 500, lineHeight: 1.18 }}>{RECOVERY_LOOP.title}</span>
          <span className="block" style={{ fontSize: "0.7rem", color: "var(--ink-3)", marginTop: "0.15rem" }}>carries {RECOVERY_LOOP.carries}</span>
        </button>
      </div>

      {/* Upward audit arrow: every stage writes into the ledger below */}
      <div className="lf-arrow" aria-hidden style={{ justifySelf: "center" }}>
        <svg viewBox="0 0 26 12"><path d="M13 0 L13 12 M8 7 L13 12 L18 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
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
