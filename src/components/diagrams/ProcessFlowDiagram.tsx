import { site } from "@/lib/site";

// Deterministic Find → Trace → Seal → Verify → Keep process flow. One artifact
// and one decision/result cue per stage. Horizontal on desktop, stacks
// vertically on mobile. Driven by the canonical site.method so labels never
// drift from the rest of the site.

const Artifact = ({ children }: { children: React.ReactNode }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {children}
  </svg>
);

// Per-stage artifact icon + short result cue, keyed by method step number.
const DETAIL: Record<string, { artifact: React.ReactNode; label: string; cue: string }> = {
  "01": {
    artifact: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" strokeLinecap="round" /></>,
    label: "Leak inventory",
    cue: "Decide: which loss costs the most?",
  },
  "02": {
    artifact: <><path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" /></>,
    label: "Journey map",
    cue: "Pinpoint: where does it break?",
  },
  "03": {
    artifact: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    label: "The smallest useful system",
    cue: "Build: close the highest-value gap",
  },
  "04": {
    artifact: <><path d="M20 7 10 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></>,
    label: "Live test",
    cue: "Confirm: is the leak closing?",
  },
  "05": {
    artifact: <><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4Z" strokeLinejoin="round" /></>,
    label: "Documented handover",
    cue: "Result: your team stays in control",
  },
};

export function ProcessFlowDiagram({ className }: { className?: string }) {
  return (
    <figure className={`diagram ${className ?? ""}`}>
      <div className="flow">
        {site.method.map((m, i) => {
          const d = DETAIL[m.n];
          return (
            <div key={m.n} style={{ display: "contents" }}>
              <div className="flow-stage">
                <span className="flow-num">{m.n}</span>
                <span className="flow-name">{m.name}</span>
                <span className="flow-artifact">
                  <Artifact>{d.artifact}</Artifact>
                  {d.label}
                </span>
                <span className="flow-cue">{d.cue}</span>
              </div>
              {i < site.method.length - 1 && (
                <div className="flow-arrow" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <figcaption>
        The same five steps run on every engagement. Each stage produces one concrete artifact and
        answers one decision before the next begins.
      </figcaption>
    </figure>
  );
}
