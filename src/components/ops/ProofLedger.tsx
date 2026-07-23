"use client";

import { AUTOMATION_LABEL } from "@/lib/ops-dashboard/types";
import { CATEGORY_BY_ID } from "@/lib/ops-dashboard/categories";
import type { OpsDashboardStore } from "./useOpsDashboard";

// Activity / proof ledger. Every automated or approved action leaves a signed,
// auditable entry. Shared by both modes; in the public demo the signatures are
// synthetic, in the private product they reference the Nostr-backed audit
// stream. Newest first.
export function ProofLedger({ store }: { store: OpsDashboardStore }) {
  const { ledger } = store;

  return (
    <div>
      <div className="rule-label">Activity &amp; proof ledger</div>
      <p className="text-[0.82rem] mb-4" style={{ color: "var(--ink-3)" }}>
        Every automated action leaves a signature. {ledger.length} recorded.
      </p>

      {ledger.length === 0 && (
        <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>No activity recorded yet.</p>
      )}

      <div className="grid gap-0">
        {ledger.map((l, i) => {
          const cat = CATEGORY_BY_ID[l.categoryId];
          return (
            <div key={l.id} className="py-3 flex items-start justify-between gap-4 flex-wrap" style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}>
              <div style={{ maxWidth: "34rem" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="mono text-[0.7rem]" style={{ color: "var(--ink-3)" }}>{new Date(l.at).toLocaleString()}</span>
                  <span className="eyebrow" style={{ fontSize: "0.58rem", color: "var(--copper-2)" }}>{cat?.title ?? l.categoryId}</span>
                </div>
                <div className="mt-1" style={{ color: "var(--ink)" }}>{l.event}</div>
                <p className="text-[0.82rem]" style={{ color: "var(--ink-2)" }}>{l.action} — {l.outcome}</p>
              </div>
              <div className="text-right" style={{ minWidth: "12rem" }}>
                <div className="mono text-[0.66rem]" style={{ color: "var(--ink-3)" }}>{AUTOMATION_LABEL[l.automationLevel]}</div>
                <div className="text-[0.74rem]" style={{ color: "var(--ink-2)" }}>{l.approvedBy}</div>
                <div className="mono text-[0.68rem]" style={{ color: "var(--moss)" }}>{l.proof}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
