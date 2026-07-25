import { test } from "node:test";
import assert from "node:assert/strict";
import { getCuratedToolConfig } from "../src/lib/ops-dashboard/private-config";
import { CATEGORY_BY_ID } from "../src/lib/ops-dashboard/categories";

test("curated private config provides the seven client tools", () => {
  const tools = getCuratedToolConfig();
  assert.equal(tools.length, 7);
});

test("every configured tool maps to a real category and carries full anatomy", () => {
  for (const t of getCuratedToolConfig()) {
    assert.ok(CATEGORY_BY_ID[t.categoryId], `tool ${t.id} maps to unknown category ${t.categoryId}`);
    assert.ok(t.displayName.trim().length > 0, `tool ${t.id} missing displayName`);
    assert.ok(t.role.trim().length > 0, `tool ${t.id} missing role`);
    assert.ok(t.capabilities.length > 0, `tool ${t.id} missing capabilities`);
    assert.ok(t.approvalRequirements.length > 0, `tool ${t.id} missing approvalRequirements`);
    assert.ok(Array.isArray(t.changeHistory), `tool ${t.id} missing changeHistory`);
  }
});

test("tool ids are unique", () => {
  const ids = getCuratedToolConfig().map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});

// Guard the security boundary at the source level: the private-config module
// must declare itself server-only and the API route must gate on the session.
test("config API route enforces the OTP session cookie", async () => {
  const { readFileSync } = await import("node:fs");
  const { resolve } = await import("node:path");
  const routeSrc = readFileSync(resolve(process.cwd(), "src/app/api/ops/config/route.ts"), "utf8");
  assert.ok(routeSrc.includes("SESSION_COOKIE"), "config route must check SESSION_COOKIE");
  assert.ok(routeSrc.includes("401"), "config route must return 401 when unauthorized");
  assert.ok(routeSrc.includes("granted"), "config route must require the granted session value");
});
