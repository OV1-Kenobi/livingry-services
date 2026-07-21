import { getLeakKpis, getExceptions } from "@/lib/dashboard-data";

const severityColor: Record<string, string> = {
  ok: "var(--forest)",
  watch: "var(--copper)",
  critical: "#b23b3b",
};

const tradePackLabel: Record<string, string> = {
  core: "TradeOps Core",
  hvac: "HVAC/R Pack",
  roofing: "Roofing Pack",
};

function formatValue(value: number, unit: string) {
  if (unit === "currency") return `$${value.toLocaleString()}`;
  if (unit === "percent") return `${value}%`;
  if (unit === "hours") return `${value}h`;
  return `${value}`;
}

export default function DashboardOverviewPage() {
  const kpis = getLeakKpis();
  const exceptions = getExceptions();
  const openExceptions = exceptions.filter((e) => e.status !== "resolved");
  const critical = kpis.filter((k) => k.severity === "critical");

  return (
    <>
      <div className="rule-label">Leak overview</div>
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <div className="card">
          <div className="eyebrow">Critical leaks</div>
          <div className="serif mt-2" style={{ fontSize: "var(--step-4)", color: "#b23b3b" }}>{critical.length}</div>
          <p className="mt-2 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>Metrics currently past target with rising or flat trend.</p>
        </div>
        <div className="card">
          <div className="eyebrow">Open exceptions</div>
          <div className="serif mt-2" style={{ fontSize: "var(--step-4)" }}>{openExceptions.length}</div>
          <p className="mt-2 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>Awaiting an owner's action across all tenants.</p>
        </div>
        <div className="card">
          <div className="eyebrow">Tracked KPIs</div>
          <div className="serif mt-2" style={{ fontSize: "var(--step-4)" }}>{kpis.length}</div>
          <p className="mt-2 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>Core, HVAC/R, and Roofing leak indicators.</p>
        </div>
      </div>

      <div className="rule-label">Core &amp; vertical KPIs</div>
      <div className="grid gap-0 mb-4">
        {kpis.map((k, i) => (
          <div
            key={k.id}
            className="py-4 flex items-center justify-between gap-4 flex-wrap"
            style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
          >
            <div style={{ minWidth: "16rem" }}>
              <span className="mono text-[0.7rem] mr-2" style={{ color: "var(--ink-3)" }}>{tradePackLabel[k.tradePack]}</span>
              <div style={{ color: "var(--ink)" }}>{k.label}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="mono" style={{ color: "var(--ink-3)", fontSize: "0.78rem" }}>
                {k.trend === "up" ? "▲" : k.trend === "down" ? "▼" : "▬"}
              </span>
              <span className="serif" style={{ fontSize: "var(--step-1)", color: severityColor[k.severity] }}>
                {formatValue(k.value, k.unit)}
              </span>
              {typeof k.target === "number" && (
                <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>target {formatValue(k.target, k.unit)}</span>
              )}
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
      </div>

      <p className="mt-6 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
        Data shown is a representative placeholder set. Connect this view to the n8n
        OPS-902 KPI Digest workflow and the Nostr audit-event stream to replace it with
        live tenant data.
      </p>
    </>
  );
}
