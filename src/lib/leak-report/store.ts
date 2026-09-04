// Persistence for voluntary Leak Priority Report requests.
//
// Follows the same shape as the Founding Five request store: the route
// depends only on the LeakReportStore interface (fully testable with the
// in-memory implementation), and uses the Postgres-backed store when
// DATABASE_URL is configured (table created by
// sql/migrations/0004_leak_report_requests.sql), otherwise the in-memory
// store with a logged warning. The stored request is the source of truth the
// founder fulfils manually until an email service provider is selected.

export interface LeakReportRequest {
  id: string;
  createdAt: string;
  emailNormalized: string;
  fullName: string | null;
  phone: string | null;
  companyWebsite: string | null;
  score: number;
  band: string;
  focusCategory: string | null;
  consentTextVersion: string;
  consentAt: string;
}

export interface NewLeakReportRequest {
  emailNormalized: string;
  fullName: string | null;
  phone: string | null;
  companyWebsite: string | null;
  score: number;
  band: string;
  focusCategory: string | null;
  consentTextVersion: string;
  consentAt: string;
}

export interface LeakReportStore {
  create(record: NewLeakReportRequest): Promise<LeakReportRequest>;
  list(): Promise<LeakReportRequest[]>;
}

function defaultId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `leakreport_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export class InMemoryLeakReportStore implements LeakReportStore {
  private records: LeakReportRequest[] = [];

  async create(input: NewLeakReportRequest): Promise<LeakReportRequest> {
    const record: LeakReportRequest = {
      ...input,
      id: defaultId(),
      createdAt: new Date().toISOString(),
    };
    this.records.push(record);
    return record;
  }

  async list(): Promise<LeakReportRequest[]> {
    return [...this.records];
  }
}

// Postgres-backed store. Lazy-imports the pool so the in-memory path never
// requires pg configuration.
export class PgLeakReportStore implements LeakReportStore {
  async create(input: NewLeakReportRequest): Promise<LeakReportRequest> {
    const { query } = await import("@/lib/db");
    const { rows } = await query<Record<string, unknown>>(
      `insert into leak_report_requests
        (id, email_normalized, full_name, phone, company_website,
         score, band, focus_category, consent_text_version, consent_at)
       values (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)
       returning id, created_at, email_normalized, full_name, phone,
         company_website, score, band, focus_category,
         consent_text_version, consent_at`,
      [
        input.emailNormalized,
        input.fullName,
        input.phone,
        input.companyWebsite,
        input.score,
        input.band,
        input.focusCategory,
        input.consentTextVersion,
        input.consentAt,
      ],
    );
    const row = rows[0] as Record<string, string | number | null>;
    return {
      id: String(row.id),
      createdAt: String(row.created_at),
      emailNormalized: String(row.email_normalized),
      fullName: (row.full_name as string | null) ?? null,
      phone: (row.phone as string | null) ?? null,
      companyWebsite: (row.company_website as string | null) ?? null,
      score: Number(row.score),
      band: String(row.band),
      focusCategory: (row.focus_category as string | null) ?? null,
      consentTextVersion: String(row.consent_text_version),
      consentAt: String(row.consent_at),
    };
  }

  async list(): Promise<LeakReportRequest[]> {
    const { query } = await import("@/lib/db");
    const { rows } = await query<Record<string, unknown>>(
      `select id, created_at, email_normalized, full_name, phone,
              company_website, score, band, focus_category,
              consent_text_version, consent_at
         from leak_report_requests order by created_at desc`,
    );
    return (rows as Record<string, string | number | null>[]).map((row) => ({
      id: String(row.id),
      createdAt: String(row.created_at),
      emailNormalized: String(row.email_normalized),
      fullName: (row.full_name as string | null) ?? null,
      phone: (row.phone as string | null) ?? null,
      companyWebsite: (row.company_website as string | null) ?? null,
      score: Number(row.score),
      band: String(row.band),
      focusCategory: (row.focus_category as string | null) ?? null,
      consentTextVersion: String(row.consent_text_version),
      consentAt: String(row.consent_at),
    }));
  }
}
