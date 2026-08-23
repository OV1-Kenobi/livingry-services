import type { Metadata } from "next";
import { getCanonicalEvents } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Operator Dashboard — Livingry TradeOps", robots: { index: false, follow: false } };

const sourceLabel: Record<string, string> = { jobber: "Jobber", ela: "Ela", servicetitan: "ServiceTitan", housecall_pro: "Housecall Pro", spreadsheet: "Spreadsheet", web_form: "Web form", livingry_db: "Livingry DB" };
const levelLabel: Record<string, string> = { A0_observe: "A0", A1_draft: "A1", A2_bounded_execute: "A2", A3_escalate: "A3" };

export default function EventLogPage() {
  const events = getCanonicalEvents();
  return (
    <>
      <div className="rule-label">Canonical job event log</div>
      <p className="mb-8" style={{ color: "var(--ink-2)", maxWidth: "48rem" }}>Every webhook — regardless of source system — normalizes into one canonical event before entering the n8n orchestration core. Once the audit-event envelope is wrapped in a signed Nostr event, each row below gains an <span className="mono">auditSignature</span> (event id) that makes the record tamper-evident and independently verifiable off-platform.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.85rem]" style={{ borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid var(--ink)" }}>{["Event ID", "Type", "Occurred", "Trade", "Source", "Tenant", "Job", "Level"].map((h) => (<th key={h} className="text-left py-3 pr-4 mono" style={{ color: "var(--ink-3)", fontSize: "0.72rem", fontWeight: 500 }}>{h}</th>))}</tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.eventId} style={{ borderBottom: "1px solid var(--rule)" }}>
                <td className="py-3 pr-4 mono" style={{ color: "var(--ink)" }}>{e.eventId}</td>
                <td className="py-3 pr-4" style={{ color: "var(--ink-2)" }}>{e.eventType}</td>
                <td className="py-3 pr-4" style={{ color: "var(--ink-2)" }}>{new Date(e.occurredAt).toLocaleString()}</td>
                <td className="py-3 pr-4" style={{ color: "var(--ink-2)" }}>{e.trade}</td>
                <td className="py-3 pr-4" style={{ color: "var(--ink-2)" }}>{sourceLabel[e.sourceSystem]}</td>
                <td className="py-3 pr-4 mono" style={{ color: "var(--ink-3)" }}>{e.tenantId}</td>
                <td className="py-3 pr-4 mono" style={{ color: "var(--ink-3)" }}>{e.jobId}</td>
                <td className="py-3 pr-4"><span className="mono text-[0.72rem]" style={{ padding: "0.15rem 0.5rem", border: "1px solid var(--rule)", borderRadius: "999px" }}>{levelLabel[e.automationLevel]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-8 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Backed by TRD-001 Event Intake. Point this table at the live event store once the n8n webhook receiver and Nostr signing service are deployed.</p>
    </>
  );
}
