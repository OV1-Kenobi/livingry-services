import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Static guards on the persistence API and client hook. These enforce the
// security contract without a running server. Phase 1b hardening (ported
// from the livingry-ops Stage-3 remediation): the route is gated by REAL
// server-side session verification (HMAC-signed token via verifySession —
// no static cookie value exists anywhere), and every per-record lookup is
// tenant-scoped by the server-derived tenant.

const ROUTE = readFileSync(
  resolve(process.cwd(), "src/app/api/ops/config/route.ts"),
  "utf8",
);
const HOOK = readFileSync(
  resolve(process.cwd(), "src/components/ops/useOpsDashboard.ts"),
  "utf8",
);

test("config route verifies the session server-side (no static granted value)", () => {
  assert.ok(ROUTE.includes("verifySession"), "route calls server-side verifySession");
  // The legacy forgeable static value must not exist in the hardened surface.
  assert.ok(!/"granted"/.test(ROUTE), 'route must not accept a static "granted" value');
  assert.ok(ROUTE.includes("401"), "route returns 401 for unauthenticated callers");
});

test("config route resolves the tenant server-side, never from the request", () => {
  assert.ok(ROUTE.includes("resolveTenantId"), "route resolves tenant server-side");
  // The request must never supply a tenant id. Guard against the anti-pattern
  // seen in the older integrations route (client-supplied tenant_id from the
  // query string or request body).
  assert.ok(!ROUTE.includes("searchParams"), "no query-string parsing (would allow client tenant)");
  assert.ok(!/body\.tenant/i.test(ROUTE), "tenant is never read from the request body");
});

test("both GET and POST are exported and POST drives persistence", () => {
  assert.ok(/export async function GET/.test(ROUTE), "GET exported");
  assert.ok(/export async function POST/.test(ROUTE), "POST exported");
  assert.ok(ROUTE.includes("ConfigService"), "route uses the persistence service");
});

test("client hook uses no browser storage for app state", () => {
  assert.ok(!HOOK.includes("localStorage"), "no localStorage");
  assert.ok(!HOOK.includes("sessionStorage"), "no sessionStorage");
  assert.ok(!/document\.cookie/.test(HOOK), "no direct cookie writes");
  assert.ok(HOOK.includes("/api/ops/config"), "hook reads/writes via the gated API");
});
