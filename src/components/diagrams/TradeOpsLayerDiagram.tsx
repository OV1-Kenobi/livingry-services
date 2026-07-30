import { tradeops } from "@/lib/hvac-operations/content";

// TradeOps Layer architecture diagram: existing tools and records flow into
// the Livingry coordination layer (events · policies · human approvals ·
// visibility) and out as clearer handoffs. Category labels only — no vendor
// names or logos. Semantic HTML so the structure is accessible without the
// visual treatment.

export function TradeOpsLayerDiagram() {
  return (
    <figure className="diagram tol">
      <div className="tol-row">
        <span className="tol-caption">Existing tools and records</span>
        <ul className="tol-sources" aria-label="Examples of existing tools and records the layer works around">
          {tradeops.sourceTools.map((tool) => (
            <li key={tool} className="tol-source">
              {tool}
            </li>
          ))}
        </ul>
      </div>

      <div className="tol-arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="tol-layer">
        <span className="tol-layer-name">Livingry TradeOps Layer</span>
        <ul className="tol-parts" aria-label="What the layer provides">
          <li>Canonical events</li>
          <li>Policy gates</li>
          <li>Human approvals</li>
          <li>Operational visibility</li>
        </ul>
      </div>

      <div className="tol-arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="tol-outcome">{tradeops.outcome}</p>

      <figcaption>
        The layer coordinates what moves between the tools you already run — it
        does not replace them, and it does not hold your records hostage.
      </figcaption>
    </figure>
  );
}
