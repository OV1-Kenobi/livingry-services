export type AutomationLevel = "A0_observe" | "A1_draft" | "A2_bounded_execute" | "A3_escalate";

export type NostrIdentity = { npub: string; nip05?: string; delegationScope?: string; verified: boolean };

export type LeakKpi = {
  id: string; label: string; value: number; unit: "count" | "currency" | "percent" | "hours";
  target?: number; trend: "up" | "down" | "flat"; severity: "ok" | "watch" | "critical"; tradePack: "core" | "hvac" | "roofing";
};

export type ExceptionRecord = {
  id: string;
  problemType: "safety_concern" | "missing_credential" | "price_discrepancy" | "complaint" | "insurance_language" | "missing_evidence" | "failed_integration" | "low_ai_confidence";
  severity: "low" | "medium" | "high"; owner: string; tenantId: string; jobId?: string; customerId?: string;
  dueAt: string; status: "open" | "escalated" | "resolved"; sourceEvent: string; automationLevel: AutomationLevel;
};

export type CredentialRecord = {
  id: string; employeeName: string;
  credentialType: "EPA_608_universal" | "EPA_608_type_i" | "EPA_608_type_ii" | "EPA_608_type_iii" | "state_license" | "manufacturer_cert";
  verificationSource: string; verifiedAt: string; jobTypePermissions: string[]; nostr: NostrIdentity;
};

export type CanonicalJobEvent = {
  eventId: string; eventType: "job.completed" | "job.booked" | "lead.intake" | "estimate.followup" | "inspection.completed";
  occurredAt: string; tenantId: string; trade: "hvac" | "roofing";
  sourceSystem: "jobber" | "ela" | "servicetitan" | "housecall_pro" | "spreadsheet" | "web_form" | "livingry_db";
  customerId: string; jobId: string; outcome?: string; amount?: number; automationLevel: AutomationLevel; auditSignature?: string;
};

export function getLeakKpis(): LeakKpi[] {
  return [
    { id: "leads-unanswered", label: "Leads not answered within target time", value: 3, unit: "count", target: 0, trend: "down", severity: "watch", tradePack: "core" },
    { id: "jobs-missing-info", label: "Booked jobs missing required information", value: 5, unit: "count", target: 0, trend: "flat", severity: "watch", tradePack: "core" },
    { id: "jobs-blocked-credential", label: "Jobs blocked by missing credential or evidence", value: 1, unit: "count", target: 0, trend: "down", severity: "critical", tradePack: "hvac" },
    { id: "completed-not-invoiced", label: "Completed jobs not invoiced", value: 2, unit: "count", target: 0, trend: "flat", severity: "watch", tradePack: "core" },
    { id: "unsold-estimates", label: "Unsold estimates without a next action", value: 7, unit: "count", target: 0, trend: "up", severity: "critical", tradePack: "roofing" },
    { id: "maintenance-not-offered", label: "Eligible customers not offered maintenance", value: 12, unit: "count", target: 0, trend: "up", severity: "watch", tradePack: "hvac" },
    { id: "reviews-not-triggered", label: "Completed jobs not entering the review workflow", value: 4, unit: "count", target: 0, trend: "down", severity: "watch", tradePack: "core" },
    { id: "recovery-awaiting", label: "Low-satisfaction customers awaiting recovery", value: 1, unit: "count", target: 0, trend: "flat", severity: "critical", tradePack: "core" },
    { id: "warranty-incomplete", label: "Warranty registrations incomplete", value: 3, unit: "count", target: 0, trend: "down", severity: "watch", tradePack: "roofing" },
    { id: "exceptions-overdue", label: "Automation exceptions overdue", value: 2, unit: "count", target: 0, trend: "flat", severity: "critical", tradePack: "core" },
    { id: "ai-drafts-edited", label: "AI drafts rejected or materially edited", value: 18, unit: "percent", target: 10, trend: "down", severity: "ok", tradePack: "core" },
    { id: "insurance-blocks", label: "Insurance-language blocks this week", value: 2, unit: "count", tradePack: "roofing", trend: "flat", severity: "ok" },
  ];
}

export function getExceptions(): ExceptionRecord[] {
  return [
    { id: "exc_1042", problemType: "missing_credential", severity: "high", owner: "Dispatcher", tenantId: "client_hvac_001", jobId: "job_8127", customerId: "cus_1049", dueAt: "2026-07-21T12:00:00-04:00", status: "open", sourceEvent: "evt_20260720_001", automationLevel: "A3_escalate" },
    { id: "exc_1041", problemType: "insurance_language", severity: "high", owner: "Authorized Manager", tenantId: "client_roof_002", jobId: "job_5521", customerId: "cus_2210", dueAt: "2026-07-21T09:00:00-04:00", status: "escalated", sourceEvent: "evt_20260720_014", automationLevel: "A3_escalate" },
    { id: "exc_1040", problemType: "price_discrepancy", severity: "medium", owner: "Estimator", tenantId: "client_hvac_001", jobId: "job_8098", customerId: "cus_0931", dueAt: "2026-07-22T17:00:00-04:00", status: "open", sourceEvent: "evt_20260719_022", automationLevel: "A1_draft" },
    { id: "exc_1039", problemType: "complaint", severity: "high", owner: "Customer-Service Manager", tenantId: "client_hvac_001", customerId: "cus_1188", dueAt: "2026-07-21T15:00:00-04:00", status: "open", sourceEvent: "evt_20260719_009", automationLevel: "A2_bounded_execute" },
    { id: "exc_1038", problemType: "missing_evidence", severity: "low", owner: "Crew Lead", tenantId: "client_roof_002", jobId: "job_5498", dueAt: "2026-07-23T10:00:00-04:00", status: "resolved", sourceEvent: "evt_20260718_031", automationLevel: "A1_draft" },
    { id: "exc_1037", problemType: "failed_integration", severity: "medium", owner: "Livingry Administrator", tenantId: "client_hvac_001", dueAt: "2026-07-21T08:00:00-04:00", status: "open", sourceEvent: "evt_20260720_002", automationLevel: "A0_observe" },
    { id: "exc_1036", problemType: "low_ai_confidence", severity: "low", owner: "Human Reviewer", tenantId: "client_roof_002", jobId: "job_5502", dueAt: "2026-07-22T13:00:00-04:00", status: "open", sourceEvent: "evt_20260720_007", automationLevel: "A1_draft" },
  ];
}

export function getCredentials(): CredentialRecord[] {
  return [
    { id: "cred_001", employeeName: "T. Alvarez", credentialType: "EPA_608_universal", verificationSource: "EPA Section 608 registry upload", verifiedAt: "2026-03-11", jobTypePermissions: ["refrigerant_recovery", "refrigerant_charge", "no_cool_diagnostic"], nostr: { npub: "npub1a3x...9kq2", nip05: "talvarez@client-hvac-001.livingry.services", delegationScope: "credential:epa608:universal", verified: true } },
    { id: "cred_002", employeeName: "J. Ruiz (apprentice)", credentialType: "EPA_608_type_i", verificationSource: "Manual office upload — pending secondary verification", verifiedAt: "2026-06-02", jobTypePermissions: ["supervised_refrigerant_work"], nostr: { npub: "npub1j9z...4mw7", verified: false } },
    { id: "cred_003", employeeName: "M. Chen", credentialType: "state_license", verificationSource: "Florida DBPR lookup", verifiedAt: "2026-01-29", jobTypePermissions: ["roofing_production", "inspection_lead"], nostr: { npub: "npub1m4c...7rte", nip05: "mchen@client-roof-002.livingry.services", delegationScope: "credential:roofing:inspection_lead", verified: true } },
  ];
}

export function getCanonicalEvents(): CanonicalJobEvent[] {
  return [
    { eventId: "evt_20260720_001", eventType: "job.completed", occurredAt: "2026-07-20T18:30:00-04:00", tenantId: "client_hvac_001", trade: "hvac", sourceSystem: "jobber", customerId: "cus_1049", jobId: "job_8127", outcome: "repaired", amount: 486.0, automationLevel: "A1_draft" },
    { eventId: "evt_20260720_007", eventType: "inspection.completed", occurredAt: "2026-07-20T14:05:00-04:00", tenantId: "client_roof_002", trade: "roofing", sourceSystem: "web_form", customerId: "cus_2199", jobId: "job_5502", automationLevel: "A1_draft" },
    { eventId: "evt_20260720_014", eventType: "estimate.followup", occurredAt: "2026-07-20T11:20:00-04:00", tenantId: "client_roof_002", trade: "roofing", sourceSystem: "spreadsheet", customerId: "cus_2210", jobId: "job_5521", automationLevel: "A3_escalate" },
    { eventId: "evt_20260719_022", eventType: "job.booked", occurredAt: "2026-07-19T09:40:00-04:00", tenantId: "client_hvac_001", trade: "hvac", sourceSystem: "ela", customerId: "cus_0931", jobId: "job_8098", automationLevel: "A1_draft" },
    { eventId: "evt_20260719_009", eventType: "lead.intake", occurredAt: "2026-07-19T08:02:00-04:00", tenantId: "client_hvac_001", trade: "hvac", sourceSystem: "housecall_pro", customerId: "cus_1188", jobId: "job_8071", automationLevel: "A2_bounded_execute" },
  ];
}
