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

// NOTE: The source-level guard on /api/ops/config was removed with the route
// itself — the entire Ops API surface is quarantined out of the public build
// per founder Decisions 5/26 (2026-08-22).
