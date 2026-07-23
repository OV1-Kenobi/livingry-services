// SERVER-ONLY. Tenant-scoped persistence for the authenticated Ops control
// panel, backed by the existing Postgres integration_connections table. This
// module must never be imported by a client component — it is only reachable
// through the OTP-session-gated /api/ops/config route.
//
// Design:
//  - The repository interface (ConfigRepo) abstracts data access so the
//    business logic (ConfigService) is testable with an in-memory repo and
//    runs against Postgres in production (PgConfigRepo).
//  - Tenant identity is ALWAYS resolved server-side (resolveTenantId). A caller
//    never supplies a tenant id, so cross-tenant access is impossible.
//  - App-level tool anatomy + change history live in integration_connections.
//    config_json; native columns stay authoritative for provider/category/
//    status/signup_url. Credential columns are never touched here.

import { CATEGORIES } from "./categories";
import { getCuratedToolConfig } from "./private-config";
import type {
  CandidateTool,
  CategoryId,
  ConnectionStatus,
  IntegrationCategoryKey,
  ToolConfig,
} from "./types";

export type ConnectionRow = {
  provider: string;
  category: IntegrationCategoryKey;
  display_name: string;
  status: string;
  signup_url: string | null;
  config_json: Record<string, unknown> | null;
};

export type ConnectionUpsert = {
  provider: string;
  category: IntegrationCategoryKey;
  display_name: string;
  status: string;
  signup_url: string | null;
  config_json: Record<string, unknown>;
};

// Data-access boundary. Every method is already tenant-scoped by argument;
// implementations must filter by tenant_id and never widen the scope.
export interface ConfigRepo {
  // Resolve the single intended private workspace, server-side only.
  resolveTenantId(): Promise<string | null>;
  listConnections(tenantId: string): Promise<ConnectionRow[]>;
  upsertConnection(tenantId: string, row: ConnectionUpsert): Promise<void>;
  deleteConnection(tenantId: string, provider: string): Promise<void>;
}

const CURATED_BY_PROVIDER: Record<string, ToolConfig> = Object.fromEntries(
  getCuratedToolConfig().map((t) => [t.provider, t]),
);

const DB_TO_APP_STATUS: Record<string, ConnectionStatus> = {
  active: "connected",
  configured: "configured",
  not_configured: "not_configured",
  paused: "disabled",
  error: "error",
};

const APP_TO_DB_STATUS: Record<ConnectionStatus, string> = {
  connected: "active",
  configured: "configured",
  not_configured: "not_configured",
  disabled: "paused",
  error: "error",
};

function nowIso() {
  return new Date().toISOString();
}

function categoryForKey(key: IntegrationCategoryKey): CategoryId {
  const match = CATEGORIES.find((c) => c.integrationKeys.includes(key));
  return match?.id ?? "ops_layer";
}

// Merge a persisted DB row with the curated default (matched by provider) so a
// freshly seeded workspace with an empty config_json still renders full tool
// anatomy. Persisted config_json always wins over the curated default.
export function rowToToolConfig(row: ConnectionRow): ToolConfig {
  const cj = (row.config_json ?? {}) as Partial<ToolConfig> & { categoryId?: CategoryId };
  const def = CURATED_BY_PROVIDER[row.provider];
  const status: ConnectionStatus = cj.status ?? DB_TO_APP_STATUS[row.status] ?? "configured";
  return {
    id: row.provider,
    provider: row.provider,
    displayName: row.display_name ?? def?.displayName ?? row.provider,
    categoryId: cj.categoryId ?? def?.categoryId ?? categoryForKey(row.category),
    integrationKey: row.category,
    role: cj.role ?? def?.role ?? "",
    status,
    enabled: cj.enabled ?? def?.enabled ?? (status === "connected" || status === "configured"),
    capabilities: cj.capabilities ?? def?.capabilities ?? [],
    workflowParticipation: cj.workflowParticipation ?? def?.workflowParticipation ?? [],
    dataInputs: cj.dataInputs ?? def?.dataInputs ?? [],
    dataOutputs: cj.dataOutputs ?? def?.dataOutputs ?? [],
    permissions: cj.permissions ?? def?.permissions ?? [],
    approvalRequirements: cj.approvalRequirements ?? def?.approvalRequirements ?? [],
    signupUrl: row.signup_url ?? def?.signupUrl,
    changeHistory: cj.changeHistory ?? def?.changeHistory ?? [],
  };
}

function toolToUpsert(tool: ToolConfig): ConnectionUpsert {
  return {
    provider: tool.provider,
    category: tool.integrationKey,
    display_name: tool.displayName,
    status: APP_TO_DB_STATUS[tool.status] ?? "configured",
    signup_url: tool.signupUrl ?? null,
    // Store the full app anatomy so it is authoritative on the next read.
    config_json: {
      categoryId: tool.categoryId,
      role: tool.role,
      status: tool.status,
      enabled: tool.enabled,
      capabilities: tool.capabilities,
      workflowParticipation: tool.workflowParticipation,
      dataInputs: tool.dataInputs,
      dataOutputs: tool.dataOutputs,
      permissions: tool.permissions,
      approvalRequirements: tool.approvalRequirements,
      changeHistory: tool.changeHistory,
    },
  };
}

// Business logic for the private tool configuration. All methods are scoped to
// a single tenant id resolved by the route; nothing here reads request input.
export class ConfigService {
  constructor(private repo: ConfigRepo, private tenantId: string) {}

  async list(): Promise<ToolConfig[]> {
    const rows = await this.repo.listConnections(this.tenantId);
    return rows.map(rowToToolConfig);
  }

  private async find(provider: string): Promise<ToolConfig | undefined> {
    return (await this.list()).find((t) => t.provider === provider);
  }

  async setEnabled(provider: string, enabled: boolean): Promise<ToolConfig[]> {
    const tool = await this.find(provider);
    if (!tool) return this.list();
    const next: ToolConfig = {
      ...tool,
      enabled,
      status: enabled ? "configured" : "disabled",
      changeHistory: [
        { at: nowIso(), action: enabled ? "enabled" : "disabled", detail: `${enabled ? "Enabled" : "Disabled"} ${tool.displayName}.` },
        ...tool.changeHistory,
      ],
    };
    await this.repo.upsertConnection(this.tenantId, toolToUpsert(next));
    return this.list();
  }

  async replace(provider: string, candidate: CandidateTool): Promise<ToolConfig[]> {
    const tool = await this.find(provider);
    if (!tool) return this.list();
    const next: ToolConfig = {
      ...tool,
      id: candidate.id,
      provider: candidate.id,
      displayName: candidate.name,
      role: candidate.capability,
      status: "configured",
      enabled: true,
      signupUrl: candidate.url,
      changeHistory: [
        { at: nowIso(), action: "replaced", detail: `Replaced ${tool.displayName} with ${candidate.name}.` },
        ...tool.changeHistory,
      ],
    };
    // Provider is the natural key; if it changes, remove the old row first.
    if (candidate.id !== provider) {
      await this.repo.deleteConnection(this.tenantId, provider);
    }
    await this.repo.upsertConnection(this.tenantId, toolToUpsert(next));
    return this.list();
  }

  async add(categoryId: CategoryId, candidate: CandidateTool): Promise<ToolConfig[]> {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    const integrationKey: IntegrationCategoryKey = cat?.integrationKeys[0] ?? "orchestration";
    const newTool: ToolConfig = {
      id: candidate.id,
      provider: candidate.id,
      displayName: candidate.name,
      categoryId,
      integrationKey,
      role: candidate.capability,
      status: "not_configured",
      enabled: false,
      capabilities: [candidate.capability],
      workflowParticipation: cat?.workflowParticipation ?? [],
      dataInputs: [],
      dataOutputs: [],
      permissions: ["Inherits category permissions"],
      approvalRequirements: ["Inherits category approval requirements"],
      signupUrl: candidate.url,
      changeHistory: [{ at: nowIso(), action: "added", detail: `Added ${candidate.name} from the vendor-neutral catalog.` }],
    };
    await this.repo.upsertConnection(this.tenantId, toolToUpsert(newTool));
    return this.list();
  }

  async remove(provider: string): Promise<ToolConfig[]> {
    await this.repo.deleteConnection(this.tenantId, provider);
    return this.list();
  }
}

// ---- Postgres-backed repository (production) ----

type Queryable = <T = Record<string, unknown>>(
  text: string,
  params?: unknown[],
) => Promise<{ rows: T[]; rowCount: number }>;

export class PgConfigRepo implements ConfigRepo {
  constructor(private query: Queryable) {}

  async resolveTenantId(): Promise<string | null> {
    const slug = process.env.DEFAULT_TENANT_SLUG || "livingry-dogfood";
    const bySlug = await this.query<{ id: string }>(
      "select id from tenants where slug = $1 limit 1",
      [slug],
    );
    if (bySlug.rows[0]) return bySlug.rows[0].id;
    const first = await this.query<{ id: string }>(
      "select id from tenants order by created_at asc limit 1",
    );
    return first.rows[0]?.id ?? null;
  }

  async listConnections(tenantId: string): Promise<ConnectionRow[]> {
    const { rows } = await this.query<ConnectionRow>(
      `select provider, category, display_name, status, signup_url, config_json
         from integration_connections
        where tenant_id = $1
        order by category, provider`,
      [tenantId],
    );
    return rows;
  }

  async upsertConnection(tenantId: string, row: ConnectionUpsert): Promise<void> {
    // Never touches credential columns — only the config surface.
    await this.query(
      `insert into integration_connections
         (tenant_id, category, provider, display_name, status, signup_url, config_json)
       values ($1,$2,$3,$4,$5,$6,$7)
       on conflict (tenant_id, provider) do update set
         category = excluded.category,
         display_name = excluded.display_name,
         status = excluded.status,
         signup_url = excluded.signup_url,
         config_json = excluded.config_json,
         updated_at = now()`,
      [tenantId, row.category, row.provider, row.display_name, row.status, row.signup_url, JSON.stringify(row.config_json)],
    );
  }

  async deleteConnection(tenantId: string, provider: string): Promise<void> {
    await this.query(
      "delete from integration_connections where tenant_id = $1 and provider = $2",
      [tenantId, provider],
    );
  }
}
