// Deterministic, server-rendered revenue-leak diagram for the homepage.
// Shows three concrete leak points closing at a sealed workflow. No fabricated
// dollar values or metrics — only real, legible labels. Calm and disciplined:
// three aligned channels, not a floating-card collage.

const channels = [
  {
    name: "Missed call",
    leak: "Rings out before anyone responds",
    kept: "Answered or called back, then routed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 5c0 8 7 15 15 15l1-4-5-2-2 2a11 11 0 0 1-5-5l2-2-2-5H4Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Dormant estimate",
    leak: "Sent, then goes cold with no nudge",
    kept: "Revived with a timely, relevant follow-up",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6V3Z" strokeLinejoin="round" />
        <path d="M14 3v4h4M9 12h6M9 16h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Neglected follow-up",
    leak: "Past customer forgotten until a competitor calls",
    kept: "Kept in view for return and referral",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20 12a8 8 0 1 1-3-6.2M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function RevenueLeakDiagram({ className }: { className?: string }) {
  return (
    <figure className={`diagram ${className ?? ""}`}>
      <div className="blueprint leak-diagram">
        {channels.map((c) => (
          <div className="leak-channel" key={c.name}>
            <div className="leak-source">
              {c.icon}
              <span>
                <span className="leak-source-name">{c.name}</span>
                <span style={{ display: "block", fontSize: "0.85rem", color: "var(--copper-2)" }}>
                  {c.leak}
                </span>
              </span>
            </div>
            <div className="leak-track">
              <span className="leak-gap" aria-hidden="true" />
              <span className="leak-seal-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                Sealed
              </span>
              <span className="leak-kept">
                <span className="leak-solid" aria-hidden="true" style={{ display: "block", marginBottom: "0.3rem" }} />
                {c.kept}
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        Illustrative diagram. Each channel shows a common point where earned demand leaks out —
        and how a sealed workflow captures it instead. No figures shown are actual client results.
      </figcaption>
    </figure>
  );
}
