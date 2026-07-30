import { lifecycleStages } from "@/lib/hvac-operations/content";

// HVAC job-lifecycle flow map: Inquiry → … → Customer Continuity.
// The visual point is that risk concentrates at the handoffs between stages —
// the arrows — not inside any single tool. Horizontal on desktop, vertical
// stepper on mobile. Pure semantic HTML + CSS (no raster image), so screen
// readers get the full sequence as an ordered list.

export function HvacJourneyMap() {
  return (
    <figure className="diagram hvj">
      <ol className="hvj-track" aria-label="HVAC job lifecycle from inquiry to customer continuity">
        {lifecycleStages.map((stage, i) => (
          <li key={stage} className="hvj-item">
            <div className="hvj-stage">
              <span className="hvj-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="hvj-name">{stage}</span>
            </div>
            {i < lifecycleStages.length - 1 && (
              <div className="hvj-handoff" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hvj-handoff-label">handoff</span>
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        The stages work. The leaks live in the handoffs between them — where a
        call, a note, an approval, or a customer record moves from one tool or
        person to the next.
      </figcaption>
    </figure>
  );
}
