import type { ApprovalItem, LedgerEntry, Scenario, SystemHealth } from "./types";

// All data below is synthetic, clearly labeled "Demo Data" in the UI, and
// contains no real customer information, credentials, or vendor brands. It is
// safe to ship in the public bundle and render in public page source.

export function demoApprovals(): ApprovalItem[] {
  return [
    { id: "apr_001", title: "Send missed-call text-back to new caller", categoryId: "response", automationLevel: "A2_bounded_execute", requestedBy: "Front-desk assistant", detail: "Caller from a paid search ad hung up after 25s during business hours. Draft: offer callback + booking link.", status: "pending" },
    { id: "apr_002", title: "Approve estimate reactivation sequence", categoryId: "recovery", automationLevel: "A1_draft", requestedBy: "Recovery sequencer", detail: "3-touch, opt-out-aware follow-up on a 14-day-old $9,400 estimate. Awaiting owner sign-off before first send.", status: "pending" },
    { id: "apr_003", title: "Publish updated service-area page", categoryId: "discovery_trust", automationLevel: "A1_draft", requestedBy: "Content assistant", detail: "Rewrite clarifies two ZIP codes and adds a verifiable license reference. Needs human approval before publish.", status: "pending" },
    { id: "apr_004", title: "Trigger review request on completed job", categoryId: "review_referral", automationLevel: "A2_bounded_execute", requestedBy: "Review & Referral workflow", detail: "Job verified complaint-free by QC. Review invite queued to a consented customer.", status: "pending" },
    { id: "apr_005", title: "Escalate: possible insurance-coverage language", categoryId: "tradeops", automationLevel: "A3_escalate", requestedBy: "TradeOps policy gate", detail: "Draft reply referenced roof-damage coverage. Blocked and routed to an authorized human per policy.", status: "pending" },
  ];
}

export function demoLedger(): LedgerEntry[] {
  return [
    { id: "led_101", at: "2026-07-22T09:14:00-04:00", categoryId: "response", event: "Missed call from returning customer", action: "Text-back sent with callback offer", automationLevel: "A2_bounded_execute", approvedBy: "Auto (within bounds)", outcome: "Callback booked for 11:00", proof: "sig:evt-9f21…a7" },
    { id: "led_102", at: "2026-07-22T10:02:00-04:00", categoryId: "workflow", event: "Lead routed to dispatch", action: "Owner assigned, job pre-checked", automationLevel: "A1_draft", approvedBy: "Dispatcher", outcome: "Job marked field-ready", proof: "sig:evt-3c88…12" },
    { id: "led_103", at: "2026-07-22T13:40:00-04:00", categoryId: "recovery", event: "Cold estimate reactivated", action: "Clarifier message sent (opt-out honored)", automationLevel: "A1_draft", approvedBy: "Estimator", outcome: "Customer requested a call", proof: "sig:evt-77aa…d0" },
    { id: "led_104", at: "2026-07-22T16:18:00-04:00", categoryId: "tradeops", event: "Job completed & QC-verified", action: "Completion packet assembled", automationLevel: "A1_draft", approvedBy: "Crew lead", outcome: "Packet stored, no complaint", proof: "sig:evt-51b4…9e" },
    { id: "led_105", at: "2026-07-22T16:41:00-04:00", categoryId: "review_referral", event: "Verified completion eligible for feedback", action: "Review invite queued after eligibility check", automationLevel: "A2_bounded_execute", approvedBy: "Auto (within bounds)", outcome: "Invite delivered", proof: "sig:evt-22e7…4b" },
    { id: "led_106", at: "2026-07-22T17:03:00-04:00", categoryId: "discovery_trust", event: "5-star review received", action: "Proof surfaced on service page (pending approval)", automationLevel: "A1_draft", approvedBy: "Awaiting owner", outcome: "Queued for publish", proof: "sig:evt-90fc…aa" },
  ];
}

export function demoHealth(): SystemHealth[] {
  return [
    { label: "Orchestration core", status: "ok", detail: "Workflows responding normally" },
    { label: "Event intake", status: "ok", detail: "No backlog" },
    { label: "Policy gates", status: "watch", detail: "1 item escalated to a human" },
    { label: "Integrations", status: "ok", detail: "All configured adapters reachable" },
  ];
}

// Three guided scenarios required by the brief. Each step shows the full tool
// anatomy: input, processing, output, where a human intervenes, the control
// that bounds it, and how success is measured.
export function demoScenarios(): Scenario[] {
  return [
    {
      id: "missed-call-to-booking",
      title: "Missed call → booked appointment",
      summary: "A busy-hour missed call becomes a confirmed appointment without anyone dropping the ball.",
      steps: [
        { categoryId: "response", input: "Inbound call goes unanswered during a busy hour", processing: "Detect missed call, identify caller, draft a text-back with a booking link", output: "Text-back offering a callback and self-serve booking", humanIntervention: "None required within bounds; owner notified", control: "No promises of price or arrival time; business-hours only", successMeasure: "Time-to-first-response under target" },
        { categoryId: "knowledge", input: "Caller asks a common service question", processing: "Ground the answer in approved documents", output: "Cite-able answer; regulated topics escalated", humanIntervention: "Restricted topics routed to a human", successMeasure: "Correct answer without a human interruption", control: "No answers on regulated topics without review" },
        { categoryId: "workflow", input: "Caller picks a slot", processing: "Create the appointment, assign an owner, pre-check job readiness", output: "Confirmed appointment in the CRM", humanIntervention: "Dispatcher confirms capacity", control: "Human checkpoint before capacity is committed", successMeasure: "Booked appointment with a named owner" },
        { categoryId: "ops_layer", input: "All steps emit events", processing: "Record each action and approval to the ledger", output: "Proof entries for the whole path", humanIntervention: "Owner can review or reverse", control: "Every automated action leaves a signature", successMeasure: "Complete, auditable trail" },
      ],
    },
    {
      id: "cold-estimate-to-recovery",
      title: "Cold estimate → recovery sequence",
      summary: "A stalled estimate is reopened respectfully and turned back into a real decision.",
      steps: [
        { categoryId: "recovery", input: "Estimate sits 14 days with no next action", processing: "Draft an appropriate, opt-out-aware clarifier sequence", output: "Recovery sequence pending approval", humanIntervention: "Owner approves before first send", control: "No fake urgency; opt-outs respected", successMeasure: "Reactivated conversations" },
        { categoryId: "recovery", input: "Customer replies with a question", processing: "Analyze the reply; surface likely objection and next step", output: "Suggested response for the estimator", humanIntervention: "Ambiguous replies routed to a human", control: "AI drafts, human decides", successMeasure: "Higher proposal close rate" },
        { categoryId: "response", input: "Customer asks to talk", processing: "Route to the owning estimator with context", output: "Scheduled call", humanIntervention: "Estimator owns the conversation", control: "No commitment made on the estimator's behalf", successMeasure: "Recovered revenue" },
        { categoryId: "ops_layer", input: "Sequence events", processing: "Log touches, approvals, and outcome", output: "Recovery evidence in the ledger", humanIntervention: "Owner can pause anytime", control: "Auditable, reversible", successMeasure: "Defensible follow-up trail" },
      ],
    },
    {
      id: "completed-job-to-proof",
      title: "Completed job → review, proof & continuity",
      summary: "A verified job turns into captured proof and a well-timed continuity reminder.",
      steps: [
        { categoryId: "tradeops", input: "Job marked complete", processing: "Verify completion is complaint-free; assemble a completion packet", output: "Verified completion + packet", humanIntervention: "QC approval before the state is trusted", control: "Review cannot bypass an unresolved complaint", successMeasure: "Verified, complaint-free completions" },
        { categoryId: "continuity", input: "Verified completion", processing: "Queue a review invite and a maintenance reminder to a consented customer", output: "Review invite + scheduled reminder", humanIntervention: "Owner approves outreach", control: "Opt-in only; unsubscribes honored", successMeasure: "Repeat & referral revenue" },
        { categoryId: "discovery_trust", input: "Positive review received", processing: "Prepare to surface verifiable proof on the site", output: "Proof queued for publish", humanIntervention: "Owner approves every published fact", control: "No fabricated or unapproved proof", successMeasure: "Verifiable evidence coverage" },
        { categoryId: "ops_layer", input: "All events", processing: "Write audit entries and update the leak dashboard", output: "Activity ledger + measures", humanIntervention: "Owner reviews the ledger", control: "Every step signed", successMeasure: "Complete proof of value delivered" },
      ],
    },
  ];
}
