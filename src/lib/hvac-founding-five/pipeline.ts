// Founding Five submission pipeline. Pure orchestration over injected
// dependencies so every path (success, duplicate, provider failure, retry) is
// deterministically testable without network or database access.

import { recordServerEvent, HVAC_EVENTS } from "./analytics";
import {
  type AdapterOutcome,
  type Adapters,
  PermanentError,
  withRetry,
} from "./adapters";
import type { RequestStore } from "./store";
import type { FoundingFiveRequest, NormalizedSubmission } from "./types";

export type PipelineDeps = {
  store: RequestStore;
  adapters: Adapters;
  ownerId?: string;
  researchDueHours?: number;
  now?: () => Date;
  idGen?: () => string;
  retry?: { attempts?: number; delayMs?: number; sleep?: (ms: number) => Promise<void> };
};

export type PipelineResult = {
  ok: boolean;
  requestId: string;
  duplicate: boolean;
  state: FoundingFiveRequest["state"];
  channels: {
    contactSync: AdapterOutcome;
    router: AdapterOutcome;
    applicantAck: AdapterOutcome;
    ownerAlert: AdapterOutcome;
  };
};

const DEFAULT_OWNER = "owner_primary";
const DEFAULT_RESEARCH_DUE_HOURS = 48;

function defaultId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `hvacff_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

// Runs an adapter with retry. On permanent failure (or exhausted retries) it
// records an exception and returns a failed-but-non-throwing outcome so the
// submission itself (whose source of truth is the persisted record) succeeds.
async function runChannel(
  label: string,
  fn: () => Promise<AdapterOutcome>,
  deps: PipelineDeps,
  entityId: string,
): Promise<AdapterOutcome> {
  try {
    return await withRetry(fn, deps.retry);
  } catch (err) {
    const permanent = err instanceof PermanentError;
    const note = err instanceof Error ? err.message : String(err);
    await deps.adapters.exceptions.record({
      code: `HVAC_FF_${label.toUpperCase()}_FAILED`,
      severity: permanent ? "P2" : "P3",
      details: `${label} failed (${permanent ? "permanent" : "transient-exhausted"}): ${note}`,
      entityId,
    });
    return { attempted: true, ok: false, note };
  }
}

export async function processSubmission(
  sub: NormalizedSubmission,
  deps: PipelineDeps,
): Promise<PipelineResult> {
  const now = deps.now ?? (() => new Date());
  const idGen = deps.idGen ?? defaultId;
  const ownerId = deps.ownerId ?? DEFAULT_OWNER;
  const researchDueHours = deps.researchDueHours ?? DEFAULT_RESEARCH_DUE_HOURS;
  const nowIso = now().toISOString();

  // Step 3: deduplicate by normalized email + company domain — never discard.
  const existing = await deps.store.findByDedupeKey(sub.dedupeKey);
  if (existing) {
    const updated = await deps.store.recordDuplicate(existing, sub, nowIso);
    // Still alert the owner so the repeat is actioned, not lost.
    const ownerAlert = await runChannel(
      "owner_alert",
      () => deps.adapters.notifier.sendOwnerAlert(updated),
      deps,
      updated.id,
    );
    const applicantAck = await runChannel(
      "applicant_ack",
      () => deps.adapters.notifier.sendApplicantAck(sub),
      deps,
      updated.id,
    );
    recordServerEvent(HVAC_EVENTS.formSuccess, { duplicate: true, state: updated.state });
    return {
      ok: true,
      requestId: updated.id,
      duplicate: true,
      state: updated.state,
      channels: {
        contactSync: { attempted: false, ok: false, note: "skipped-duplicate" },
        router: { attempted: false, ok: false, note: "skipped-duplicate" },
        applicantAck,
        ownerAlert,
      },
    };
  }

  // Steps 2, 5, 6, 7, 8: create the internal opportunity record with consent
  // evidence, initial state, owner, and research due date.
  const dueAt = new Date(now().getTime() + researchDueHours * 3_600_000).toISOString();
  const record: FoundingFiveRequest = {
    id: idGen(),
    createdAt: nowIso,
    updatedAt: nowIso,
    state: "new_request",
    ownerId,
    nextAction: "Research one externally observable workflow and prepare a micro-audit",
    nextActionDueAt: dueAt,
    fullName: sub.fullName,
    companyName: sub.companyName,
    emailNormalized: sub.emailNormalized,
    companyDomain: sub.companyDomain,
    role: sub.role,
    phone: sub.phone,
    companyWebsite: sub.companyWebsite,
    workflowProblem: sub.workflowProblem,
    consentTextVersion: sub.consentTextVersion,
    consentAt: nowIso,
    metadata: sub.metadata,
    dedupeKey: sub.dedupeKey,
    submissionCount: 1,
  };
  await deps.store.create(record);

  // Steps 4, 9, 10, 11, 12: external channels, each retried, permanent
  // failures surfaced to the exception sink.
  const contactSync = await runChannel(
    "contact_sync",
    () => deps.adapters.contactSync.upsertContact(sub),
    deps,
    record.id,
  );
  const router = await runChannel(
    "router",
    () => deps.adapters.router.routeOpportunity(record),
    deps,
    record.id,
  );
  const applicantAck = await runChannel(
    "applicant_ack",
    () => deps.adapters.notifier.sendApplicantAck(sub),
    deps,
    record.id,
  );
  const ownerAlert = await runChannel(
    "owner_alert",
    () => deps.adapters.notifier.sendOwnerAlert(record),
    deps,
    record.id,
  );

  recordServerEvent(HVAC_EVENTS.formSuccess, { duplicate: false, state: record.state });

  return {
    ok: true,
    requestId: record.id,
    duplicate: false,
    state: record.state,
    channels: { contactSync, router, applicantAck, ownerAlert },
  };
}
