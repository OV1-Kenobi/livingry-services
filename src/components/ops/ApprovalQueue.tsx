"use client";

import { AUTOMATION_LABEL } from "@/lib/ops-dashboard/types";
import { CATEGORY_BY_ID } from "@/lib/ops-dashboard/categories";
import { tapTarget } from "./ui";
import type { OpsDashboardStore } from "./useOpsDashboard";

const statusTone: Record<string, string> = {
  pending: "var(--copper)",
  approved: "var(--forest)",
  rejected: "#b23b3b",
};

// Human-in-the-loop approval queue. Identical in both modes; every queued
// action names the category, automation level, and requester, and records the
// operator's decision to the proof ledger. Decisions here are simulated (no
// external action is ever taken) — they only move demo state and write a
// ledger entry so the human-approval model is visible end to end.
export function ApprovalQueue({ store }: { store: OpsDashboardStore }) {
  const { approvals } = store;
  const pending = approvals.filter((a) => a.status === "pending");

  return (
    <div>
      <div className="rule-label">Approval queue</div>
      <p className="text-[0.82rem] mb-4" style={{ color: "var(--ink-3)" }}>
        Nothing acts without a human within bounds. {pending.length} awaiting a decision.
      </p>

      {approvals.length === 0 && (
        <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Queue is empty.</p>
      )}

      <div className="grid gap-3">
        {approvals.map((a) => {
          const cat = CATEGORY_BY_ID[a.categoryId];
          return (
            <div key={a.id} className="card" style={{ opacity: a.status === "pending" ? 1 : 0.72 }}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div style={{ maxWidth: "32rem" }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="eyebrow" style={{ fontSize: "0.6rem", color: "var(--copper-2)" }}>{cat?.title ?? a.categoryId}</span>
                    <span className="mono text-[0.66rem]" style={{ color: "var(--ink-3)" }}>{AUTOMATION_LABEL[a.automationLevel]}</span>
                  </div>
                  <h4 className="serif mt-1" style={{ fontSize: "1rem" }}>{a.title}</h4>
                  <p className="text-[0.82rem] mt-1" style={{ color: "var(--ink-2)" }}>{a.detail}</p>
                  <p className="text-[0.72rem] mt-1" style={{ color: "var(--ink-3)" }}>Requested by {a.requestedBy}</p>
                </div>
                {a.status === "pending" ? (
                  <div className="flex gap-2 flex-wrap">
                    <button className="btn btn-primary" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={() => store.decideApproval(a.id, "approved")}>Approve</button>
                    <button className="btn btn-secondary" style={{ ...tapTarget, fontSize: "0.75rem", paddingBlock: "0.35rem" }} onClick={() => store.decideApproval(a.id, "rejected")}>Reject</button>
                  </div>
                ) : (
                  <span className="mono text-[0.72rem]" style={{ color: statusTone[a.status] }}>● {a.status}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
