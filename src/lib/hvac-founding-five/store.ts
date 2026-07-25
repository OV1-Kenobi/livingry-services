// Persistence for Founding Five requests.
//
// The pipeline depends only on the RequestStore interface, so it is fully
// testable with the in-memory implementation. When DATABASE_URL is configured
// the route uses the Postgres-backed store (see sql/migrations/0002…),
// otherwise it falls back to the in-memory store and logs a warning. This
// keeps the funnel staging-runnable without a database while remaining a
// drop-in for the repository's existing pg persistence.

import type { FoundingFiveRequest, NormalizedSubmission, RequestState } from "./types";

export interface RequestStore {
  findByDedupeKey(dedupeKey: string): Promise<FoundingFiveRequest | null>;
  create(record: FoundingFiveRequest): Promise<FoundingFiveRequest>;
  // Records a repeat submission without creating a competing active record.
  recordDuplicate(
    existing: FoundingFiveRequest,
    submission: NormalizedSubmission,
    at: string,
  ): Promise<FoundingFiveRequest>;
  list(): Promise<FoundingFiveRequest[]>;
}

export class InMemoryRequestStore implements RequestStore {
  private byId = new Map<string, FoundingFiveRequest>();
  private byDedupe = new Map<string, string>();

  async findByDedupeKey(dedupeKey: string): Promise<FoundingFiveRequest | null> {
    const id = this.byDedupe.get(dedupeKey);
    return id ? this.byId.get(id) ?? null : null;
  }

  async create(record: FoundingFiveRequest): Promise<FoundingFiveRequest> {
    this.byId.set(record.id, record);
    this.byDedupe.set(record.dedupeKey, record.id);
    return record;
  }

  async recordDuplicate(
    existing: FoundingFiveRequest,
    _submission: NormalizedSubmission,
    at: string,
  ): Promise<FoundingFiveRequest> {
    const updated: FoundingFiveRequest = {
      ...existing,
      submissionCount: existing.submissionCount + 1,
      updatedAt: at,
      // Surface the repeat as work to do rather than dropping it.
      nextAction: `Review repeat request (${existing.submissionCount + 1} total) from ${existing.companyName}`,
      nextActionDueAt: at,
    };
    this.byId.set(existing.id, updated);
    return updated;
  }

  async list(): Promise<FoundingFiveRequest[]> {
    return [...this.byId.values()];
  }
}

// Postgres-backed store. Lazy-imports the pool so the in-memory path never
// requires pg configuration. The table is created by
// sql/migrations/0002_hvac_founding_five.sql.
export class PgRequestStore implements RequestStore {
  async findByDedupeKey(dedupeKey: string): Promise<FoundingFiveRequest | null> {
    const { query } = await import("@/lib/db");
    const { rows } = await query<Record<string, unknown>>(
      `select * from hvac_founding_five_requests where dedupe_key = $1 limit 1`,
      [dedupeKey],
    );
    return rows[0] ? rowToRecord(rows[0]) : null;
  }

  async create(record: FoundingFiveRequest): Promise<FoundingFiveRequest> {
    const { query } = await import("@/lib/db");
    await query(
      `insert into hvac_founding_five_requests
        (id, created_at, updated_at, state, owner_id, next_action, next_action_due_at,
         full_name, company_name, email_normalized, company_domain, role, phone,
         company_website, workflow_problem, consent_text_version, consent_at,
         metadata_json, dedupe_key, duplicate_of, submission_count)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`,
      [
        record.id, record.createdAt, record.updatedAt, record.state, record.ownerId,
        record.nextAction, record.nextActionDueAt, record.fullName, record.companyName,
        record.emailNormalized, record.companyDomain, record.role, record.phone,
        record.companyWebsite, record.workflowProblem, record.consentTextVersion,
        record.consentAt, JSON.stringify(record.metadata), record.dedupeKey,
        record.duplicateOf ?? null, record.submissionCount,
      ],
    );
    return record;
  }

  async recordDuplicate(
    existing: FoundingFiveRequest,
    _submission: NormalizedSubmission,
    at: string,
  ): Promise<FoundingFiveRequest> {
    const { query } = await import("@/lib/db");
    const count = existing.submissionCount + 1;
    const nextAction = `Review repeat request (${count} total) from ${existing.companyName}`;
    await query(
      `update hvac_founding_five_requests
         set submission_count = $2, updated_at = $3, next_action = $4, next_action_due_at = $3
       where id = $1`,
      [existing.id, count, at, nextAction],
    );
    return { ...existing, submissionCount: count, updatedAt: at, nextAction, nextActionDueAt: at };
  }

  async list(): Promise<FoundingFiveRequest[]> {
    const { query } = await import("@/lib/db");
    const { rows } = await query<Record<string, unknown>>(
      `select * from hvac_founding_five_requests order by created_at desc`,
    );
    return rows.map(rowToRecord);
  }
}

function rowToRecord(r: Record<string, unknown>): FoundingFiveRequest {
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v));
  return {
    id: String(r.id),
    createdAt: iso(r.created_at),
    updatedAt: iso(r.updated_at),
    state: r.state as RequestState,
    ownerId: String(r.owner_id),
    nextAction: String(r.next_action),
    nextActionDueAt: iso(r.next_action_due_at),
    fullName: String(r.full_name),
    companyName: String(r.company_name),
    emailNormalized: String(r.email_normalized),
    companyDomain: String(r.company_domain),
    role: String(r.role),
    phone: String(r.phone ?? ""),
    companyWebsite: String(r.company_website ?? ""),
    workflowProblem: String(r.workflow_problem ?? ""),
    consentTextVersion: String(r.consent_text_version),
    consentAt: iso(r.consent_at),
    metadata: (r.metadata_json as Record<string, string>) ?? {},
    dedupeKey: String(r.dedupe_key),
    duplicateOf: r.duplicate_of ? String(r.duplicate_of) : undefined,
    submissionCount: Number(r.submission_count ?? 1),
  };
}
