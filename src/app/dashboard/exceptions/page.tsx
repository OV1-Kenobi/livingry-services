import { getExceptions } from "@/lib/dashboard-data";

const problemLabel: Record<string, string> = {
  safety_concern: "Safety concern",
  missing_credential: "Missing credential",
  price_discrepancy: "Price discrepancy",
  complaint: "Complaint / low satisfaction",
  insurance_language: "Insurance-related wording",
  missing_evidence: "Missing evidence",
  failed_integration: "Failed integration",
  low_ai_confidence: "AI confidence below threshold",
};

const severityStyle: Record<string, string> = {
  high: "#b23b3b",
  medium: "var(--copper)",
  low: "var(--ink-3)",
};

const levelLabel: Record<string, string> = {
  A0_observe: "A0 · Observe",
  A1_draft: "A1 · Draft",
  A2_bounded_execute: "A2 · Bounded execute",
  A3_escalate: "A3 · Escalate",
};

export default function ExceptionDeskPage() {
  const exceptions = getExceptions();
  return (
    <>
      <div className="rule-label">Exception Desk</div>
      <p className="mb-8" style={{ color: "var(--ink-2)", maxWidth: "44rem" }}>
        Every uncertain or risky case lands in one queue with an assigned owner and a
        due date. AI handles routine preparation — humans spend attention on ambiguity
        and risk.
      </p>

      <div className="grid gap-0">
        {exceptions.map((e, i) => (
          <div key={e.id} className="py-5" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="mono text-[0.72rem]" style={{ color: severityStyle[e.severity] }}>● {e.severity.toUpperCase()}</span>
                  <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{problemLabel[e.problemType]}</h3>
                  <span className={`pill ${e.status === "resolved" ? "pill-active" : e.status === "escalated" ? "pill-next" : "pill-future"}`}>
                    {e.status}
                  </span>
                </div>
                <p className="mt-2 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>
                  Owner: <strong>{e.owner}</strong> · Tenant: <span className="mono">{e.tenantId}</span>
                  {e.jobId && <> · Job: <span className="mono">{e.jobId}</span></>}
                  {e.customerId && <> · Customer: <span className="mono">{e.customerId}</span></>}
                </p>
              </div>
              <div className="text-right" style={{ minWidth: "12rem" }}>
                <div className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{levelLabel[e.automationLevel]}</div>
                <div className="mt-1 text-[0.85rem]" style={{ color: "var(--ink)" }}>Due {new Date(e.dueAt).toLocaleString()}</div>
                <div className="mt-1 mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>source: {e.sourceEvent}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--ink)", height: 0 }} />
      </div>

      <p className="mt-8 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
        Wire this queue to TRD-008 Exception Desk in n8n. Safety, credential, and
        insurance-language exceptions should always resolve to A3 (Escalate) and never
        auto-clear without a recorded human decision.
      </p>
    </>
  );
}
