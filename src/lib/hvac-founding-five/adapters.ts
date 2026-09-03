// Server-only integration adapters for the Founding Five pipeline.
//
// Every adapter is defined by an interface the pipeline depends on. Real
// implementations are gated behind environment variables; when a provider is
// not configured a deterministic no-op adapter is returned so the funnel runs
// end-to-end in staging without production credentials. No adapter ever places
// secrets or PII into logs.

import type { FoundingFiveRequest, NormalizedSubmission } from "./types";

// Distinguish retryable transient failures from permanent ones.
export class TransientError extends Error {}
export class PermanentError extends Error {}

export type AdapterOutcome = { attempted: boolean; ok: boolean; note: string };

export interface ContactSync {
  // Upsert the contact into the marketing/lifecycle system (Brevo).
  upsertContact(sub: NormalizedSubmission): Promise<AdapterOutcome>;
}

export interface OpportunityRouter {
  // Hand the opportunity to orchestration (n8n) for internal routing.
  routeOpportunity(record: FoundingFiveRequest): Promise<AdapterOutcome>;
}

export interface Notifier {
  sendApplicantAck(sub: NormalizedSubmission): Promise<AdapterOutcome>;
  sendOwnerAlert(record: FoundingFiveRequest): Promise<AdapterOutcome>;
}

export interface ExceptionSink {
  // Route a permanent failure to a visible internal exception representation.
  record(entry: {
    code: string;
    severity: "P1" | "P2" | "P3" | "P4";
    details: string;
    entityId?: string;
  }): Promise<void>;
}

// --------------------------- retry helper ---------------------------------

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { attempts?: number; delayMs?: number; sleep?: (ms: number) => Promise<void> } = {},
): Promise<T> {
  const attempts = opts.attempts ?? 3;
  const delayMs = opts.delayMs ?? 0;
  const sleep = opts.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (err instanceof PermanentError) throw err;
      if (i < attempts - 1 && delayMs) await sleep(delayMs * (i + 1));
    }
  }
  throw lastErr;
}

// --------------------------- Brevo ----------------------------------------

class NoopContactSync implements ContactSync {
  async upsertContact(): Promise<AdapterOutcome> {
    return { attempted: false, ok: false, note: "brevo-not-configured" };
  }
}

class BrevoContactSync implements ContactSync {
  constructor(private apiKey: string, private listId?: number) {}
  async upsertContact(sub: NormalizedSubmission): Promise<AdapterOutcome> {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": this.apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: sub.emailNormalized,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: sub.fullName,
          COMPANY: sub.companyName,
          ROLE: sub.role,
          WEBSITE: sub.companyWebsite,
          SOURCE: "HVAC Founding Five",
        },
        ...(this.listId ? { listIds: [this.listId] } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    }).catch((e) => {
      throw new TransientError(e instanceof Error ? e.message : "brevo-network");
    });
    if (res.status === 429 || res.status >= 500) {
      throw new TransientError(`brevo-http-${res.status}`);
    }
    if (!res.ok && res.status !== 204) {
      // 400-class (other than dup) — do not retry.
      throw new PermanentError(`brevo-http-${res.status}`);
    }
    return { attempted: true, ok: true, note: "brevo-ok" };
  }
}

// --------------------------- n8n ------------------------------------------

class NoopOpportunityRouter implements OpportunityRouter {
  async routeOpportunity(): Promise<AdapterOutcome> {
    return { attempted: false, ok: false, note: "n8n-not-configured" };
  }
}

class N8nOpportunityRouter implements OpportunityRouter {
  constructor(private url: string, private token?: string) {}
  async routeOpportunity(record: FoundingFiveRequest): Promise<AdapterOutcome> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.token ? { "x-webhook-token": this.token } : {}),
      },
      // Only non-sensitive routing fields — no consent text, no raw metadata dump.
      body: JSON.stringify({
        id: record.id,
        state: record.state,
        company: record.companyName,
        domain: record.companyDomain,
        role: record.role,
        next_action: record.nextAction,
        owner_id: record.ownerId,
        due_at: record.nextActionDueAt,
        source: "HVAC Founding Five",
      }),
      signal: AbortSignal.timeout(10_000),
    }).catch((e) => {
      throw new TransientError(e instanceof Error ? e.message : "n8n-network");
    });
    if (res.status === 429 || res.status >= 500) {
      throw new TransientError(`n8n-http-${res.status}`);
    }
    if (!res.ok) throw new PermanentError(`n8n-http-${res.status}`);
    return { attempted: true, ok: true, note: "n8n-ok" };
  }
}

// --------------------------- notifier -------------------------------------

// Redact an email to its domain so staging logs prove intent without storing
// the PII local-part (e.g. "jane@northwind-hvac.com" -> "***@northwind-hvac.com").
function redactEmail(email: string): string {
  const at = email.indexOf("@");
  return at === -1 ? "***" : `***${email.slice(at)}`;
}

class ConsoleNotifier implements Notifier {
  async sendApplicantAck(sub: NormalizedSubmission): Promise<AdapterOutcome> {
    // No provider configured — record intent without leaking PII or the body.
    console.log(
      "[hvac-ff] applicant-ack (no email provider)",
      JSON.stringify({ toDomain: redactEmail(sub.emailNormalized) }),
    );
    return { attempted: false, ok: false, note: "email-not-configured" };
  }
  async sendOwnerAlert(record: FoundingFiveRequest): Promise<AdapterOutcome> {
    console.log(
      "[hvac-ff] owner-alert (no email provider)",
      JSON.stringify({ requestId: record.id, company: record.companyName }),
    );
    return { attempted: false, ok: false, note: "email-not-configured" };
  }
}

class ResendNotifier implements Notifier {
  constructor(
    private apiKey: string,
    private from: string,
    private ownerTo: string,
  ) {}

  private async send(to: string, subject: string, text: string): Promise<AdapterOutcome> {
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);
    const { error } = await resend.emails.send({ from: this.from, to: [to], subject, text });
    if (error) throw new TransientError(error.message || "resend-error");
    return { attempted: true, ok: true, note: "resend-ok" };
  }

  // Applicant acknowledgement — no secrets, submission summary only, and no
  // public calendar: follow-up is human-reviewed before any scheduling offer.
  async sendApplicantAck(sub: NormalizedSubmission): Promise<AdapterOutcome> {
    const text = [
      "Your Founding Five Scorecard has been received.",
      "",
      "Livingry reviews every scorecard by hand — not by bot. If the fit looks real, you will receive an invitation to a fit conversation by email; there is no public calendar and no bot triage. If it does not, you will get a fast, honest answer rather than a slow maybe.",
      "",
      `Company: ${sub.companyName}`,
      `Leaks you identified: ${sub.primaryLeaks.join("; ")}`,
      `Markets: ${sub.markets}`,
      "",
      "Privacy: https://livingry.services/privacy",
      "Contact: ov@livingry.services",
    ].join("\n");
    return this.send(sub.emailNormalized, "Livingry — your scorecard has been received", text);
  }

  // Owner alert — contains no secrets.
  async sendOwnerAlert(record: FoundingFiveRequest): Promise<AdapterOutcome> {
    const text = [
      "New Founding Five scorecard (looks worth reviewing).",
      "",
      `Company: ${record.companyName}`,
      `Domain: ${record.companyDomain}`,
      `Role: ${record.role}`,
      `Markets: ${record.metadata.markets ?? ""}`,
      `Team size: ${record.metadata.team_size ?? ""}`,
      `FSM/CRM: ${record.metadata.fsm ?? ""}`,
      `Primary leaks: ${record.metadata.primary_leaks ?? ""}`,
      `Weekly volume: ${record.metadata.weekly_volume ?? ""}`,
      `Readiness: ${record.metadata.readiness ?? ""}`,
      "",
      `State: ${record.state}`,
      `Owner: ${record.ownerId}`,
      `Next action: ${record.nextAction}`,
      `Due: ${record.nextActionDueAt}`,
    ].join("\n");
    return this.send(this.ownerTo, `Founding Five · ${record.companyName}`, text);
  }
}

// --------------------------- exception sink -------------------------------

class ConsoleExceptionSink implements ExceptionSink {
  async record(entry: {
    code: string;
    severity: string;
    details: string;
    entityId?: string;
  }): Promise<void> {
    console.error("[hvac-ff][exception]", JSON.stringify(entry));
  }
}

// --------------------------- factory --------------------------------------

export type Adapters = {
  contactSync: ContactSync;
  router: OpportunityRouter;
  notifier: Notifier;
  exceptions: ExceptionSink;
};

export function buildAdaptersFromEnv(env: NodeJS.ProcessEnv = process.env): Adapters {
  const contactSync = env.BREVO_API_KEY
    ? new BrevoContactSync(
        env.BREVO_API_KEY,
        env.BREVO_LIST_ID ? Number(env.BREVO_LIST_ID) : undefined,
      )
    : new NoopContactSync();

  const router = env.N8N_WEBHOOK_URL
    ? new N8nOpportunityRouter(env.N8N_WEBHOOK_URL, env.N8N_WEBHOOK_TOKEN)
    : new NoopOpportunityRouter();

  const notifier = env.RESEND_API_KEY
    ? new ResendNotifier(
        env.RESEND_API_KEY,
        env.HVAC_FF_FROM || "Livingry Services <noreply@livingry.services>",
        env.HVAC_FF_OWNER_TO || "ov@livingry.services",
      )
    : new ConsoleNotifier();

  return { contactSync, router, notifier, exceptions: new ConsoleExceptionSink() };
}
