import { site } from "@/lib/site";

// Deterministic seven-system orchestration graphic. One Ops layer (the eighth
// system) observes and coordinates the seven generic system categories, using
// the site's existing category names. This is a compact overview — it does NOT
// duplicate the full interactive dashboard.

// Short display labels derived from the canonical system families.
const SHORT: Record<string, string> = {
  "response-systems": "Response",
  "recovery-systems": "Recovery",
  "customer-continuity": "Continuity",
  "discovery-and-trust": "Discovery & Trust",
  "knowledge-systems": "Knowledge",
  "workflow-systems": "Workflow",
  "tradeops-layer": "TradeOps",
};

export function OrchestrationGraphic({ className }: { className?: string }) {
  return (
    <figure className={`diagram ${className ?? ""}`}>
      <div className="blueprint orch">
        <div className="orch-hub">
          <div className="eyebrow">The eighth system · Ops layer</div>
          <p style={{ maxWidth: "40rem", marginInline: "auto", color: "var(--paper)", opacity: 0.9 }}>
            One vendor-agnostic operations layer observes and coordinates the seven system
            categories — with policy gates, human approval, and an activity ledger.
          </p>
        </div>
        <svg className="orch-brace" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 1 V5 Q2 9 6 9 H46 Q50 9 50 11 Q50 9 54 9 H94 Q98 9 98 5 V1"
            fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <ol className="orch-grid">
          {site.systemFamilies.map((s, i) => (
            <li className="orch-tile" key={s.slug}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{SHORT[s.slug] ?? s.title}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        The Ops layer does not replace your tools — it coordinates across the seven categories and
        keeps a human in control of every consequential action.
      </figcaption>
    </figure>
  );
}
