import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ConfigService,
  type ConfigRepo,
  type ConnectionRow,
  type ConnectionUpsert,
} from "../src/lib/ops-dashboard/config-store";
import { getCuratedToolConfig } from "../src/lib/ops-dashboard/private-config";
import type { CandidateTool } from "../src/lib/ops-dashboard/types";

// In-memory ConfigRepo standing in for Postgres. Data is keyed by tenant id so
// the tests can prove tenant scoping and cross-tenant isolation without a live
// database, and prove edits survive a "reload" (a new ConfigService over the
// same repo instance).
class InMemoryRepo implements ConfigRepo {
  private store = new Map<string, Map<string, ConnectionRow>>();
  constructor(private canonicalTenant: string) {
    this.store.set(canonicalTenant, new Map());
  }
  private tenant(id: string) {
    let m = this.store.get(id);
    if (!m) {
      m = new Map();
      this.store.set(id, m);
    }
    return m;
  }
  async resolveTenantId(): Promise<string | null> {
    return this.canonicalTenant;
  }
  async listConnections(tenantId: string): Promise<ConnectionRow[]> {
    return [...this.tenant(tenantId).values()].map((r) => ({ ...r }));
  }
  async upsertConnection(tenantId: string, row: ConnectionUpsert): Promise<void> {
    this.tenant(tenantId).set(row.provider, { ...row });
  }
  async deleteConnection(tenantId: string, provider: string): Promise<void> {
    this.tenant(tenantId).delete(provider);
  }
  // Test helper: raw row count for a tenant.
  count(tenantId: string): number {
    return this.tenant(tenantId).size;
  }
}

// Seed a tenant with the curated catalog the way /api/ops/setup would: native
// columns populated, config_json empty. rowToToolConfig fills anatomy from the
// curated default matched by provider.
function seedCurated(repo: InMemoryRepo, tenantId: string) {
  for (const t of getCuratedToolConfig()) {
    void repo.upsertConnection(tenantId, {
      provider: t.provider,
      category: t.integrationKey,
      display_name: t.displayName,
      status: "configured",
      signup_url: t.signupUrl ?? null,
      config_json: {},
    });
  }
}

const TENANT_A = "tenant-a";
const TENANT_B = "tenant-b";

const CANDIDATE: CandidateTool = {
  id: "generic-front-desk",
  name: "Front-desk / booking assistant",
  neutral: true,
  capability: "Answer, qualify, and book across phone, form, and chat.",
};

test("seeded workspace lists the full curated catalog with anatomy", async () => {
  const repo = new InMemoryRepo(TENANT_A);
  seedCurated(repo, TENANT_A);
  const svc = new ConfigService(repo, TENANT_A);
  const tools = await svc.list();
  assert.equal(tools.length, 7);
  const victoria = tools.find((t) => t.provider === "victoria_ai");
  assert.ok(victoria, "victoria_ai present");
  // Anatomy filled from the curated default even though config_json was empty.
  assert.ok(victoria!.capabilities.length > 0);
  assert.equal(victoria!.id, victoria!.provider, "id is the provider natural key");
});

test("setEnabled persists and appends change history", async () => {
  const repo = new InMemoryRepo(TENANT_A);
  seedCurated(repo, TENANT_A);
  const svc = new ConfigService(repo, TENANT_A);
  const before = (await svc.list()).find((t) => t.provider === "brevo")!;
  const historyLen = before.changeHistory.length;

  await svc.setEnabled("brevo", false);
  const after = (await svc.list()).find((t) => t.provider === "brevo")!;
  assert.equal(after.enabled, false);
  assert.equal(after.status, "disabled");
  assert.equal(after.changeHistory.length, historyLen + 1);
  assert.equal(after.changeHistory[0].action, "disabled");
});

test("add, replace, and remove persist across a simulated reload", async () => {
  const repo = new InMemoryRepo(TENANT_A);
  seedCurated(repo, TENANT_A);

  // Session 1: add a tool to the response category.
  const svc1 = new ConfigService(repo, TENANT_A);
  await svc1.add("response", CANDIDATE);
  assert.equal((await svc1.list()).length, 8);

  // Session 2 (new service, SAME repo = new request/device): the add survived.
  const svc2 = new ConfigService(repo, TENANT_A);
  let tools = await svc2.list();
  assert.equal(tools.length, 8);
  const added = tools.find((t) => t.provider === CANDIDATE.id)!;
  assert.ok(added, "added tool persisted");
  assert.equal(added.categoryId, "response");

  // Replace victoria_ai with the candidate (different provider) — old row goes.
  await svc2.replace("victoria_ai", { ...CANDIDATE, id: "generic-scheduler", name: "Scheduler" });
  tools = await svc2.list();
  assert.ok(!tools.find((t) => t.provider === "victoria_ai"), "old provider removed");
  const replaced = tools.find((t) => t.provider === "generic-scheduler")!;
  assert.equal(replaced.changeHistory[0].action, "replaced");

  // Remove it in a third session; reload confirms deletion stuck.
  const svc3 = new ConfigService(repo, TENANT_A);
  await svc3.remove("generic-scheduler");
  const svc4 = new ConfigService(repo, TENANT_A);
  assert.ok(!(await svc4.list()).find((t) => t.provider === "generic-scheduler"));
});

test("mutations never touch another tenant's workspace", async () => {
  const repo = new InMemoryRepo(TENANT_A);
  seedCurated(repo, TENANT_A);
  seedCurated(repo, TENANT_B);
  assert.equal(repo.count(TENANT_A), 7);
  assert.equal(repo.count(TENANT_B), 7);

  const svcA = new ConfigService(repo, TENANT_A);
  await svcA.remove("victoria_ai");
  await svcA.add("response", CANDIDATE);
  await svcA.setEnabled("brevo", false);

  // Tenant B is completely untouched.
  assert.equal(repo.count(TENANT_B), 7);
  const bTools = await new ConfigService(repo, TENANT_B).list();
  assert.ok(bTools.find((t) => t.provider === "victoria_ai"), "B still has victoria");
  assert.equal(bTools.find((t) => t.provider === "brevo")!.enabled, true);
  assert.ok(!bTools.find((t) => t.provider === CANDIDATE.id), "B did not get A's add");
});
