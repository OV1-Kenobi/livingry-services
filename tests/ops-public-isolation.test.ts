import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getPublicDashboardData, PRIVATE_VENDOR_NAMES } from "../src/lib/ops-dashboard/public";

// The public payload is the ONLY data the unauthenticated demo ever sees. It
// must never carry a real vendor brand name, credential, or private config.
test("public payload contains no private vendor brand names", () => {
  const json = JSON.stringify(getPublicDashboardData());
  for (const name of PRIVATE_VENDOR_NAMES) {
    assert.ok(
      !json.toLowerCase().includes(name.toLowerCase()),
      `Public payload leaked private vendor name: ${name}`,
    );
  }
});

test("public payload is explicitly public mode with all eight categories", () => {
  const data = getPublicDashboardData();
  assert.equal(data.mode, "public");
  assert.equal(data.categories.length, 8);
  const ids = data.categories.map((c) => c.id).sort();
  assert.deepEqual(ids, [
    "continuity",
    "discovery_trust",
    "knowledge",
    "ops_layer",
    "recovery",
    "response",
    "tradeops",
    "workflow",
  ]);
});

test("public catalog exposes only vendor-neutral candidates", () => {
  const data = getPublicDashboardData();
  for (const [categoryId, candidates] of Object.entries(data.catalog)) {
    assert.ok(candidates.length >= 1, `Category ${categoryId} has no candidates`);
    for (const c of candidates) {
      assert.equal(c.neutral, true, `Candidate ${c.id} is not vendor-neutral`);
      assert.equal(c.url, undefined, `Public candidate ${c.id} must not carry a signup url`);
    }
  }
});

// Static import-graph guard: nothing in the public data path may import the
// server-only private configuration module.
test("public data modules never import the private-config module", () => {
  const files = [
    "src/lib/ops-dashboard/public.ts",
    "src/lib/ops-dashboard/categories.ts",
    "src/lib/ops-dashboard/demo-data.ts",
  ];
  for (const rel of files) {
    const src = readFileSync(resolve(process.cwd(), rel), "utf8");
    assert.ok(
      !src.includes("private-config"),
      `${rel} imports the server-only private-config module`,
    );
  }
});

// The client bundle path (useOpsDashboard) must fetch private config over the
// gated API, not import it directly.
test("useOpsDashboard does not statically import private-config", () => {
  const src = readFileSync(resolve(process.cwd(), "src/components/ops/useOpsDashboard.ts"), "utf8");
  assert.ok(!src.includes("private-config"), "useOpsDashboard statically imports private-config");
  assert.ok(src.includes("/api/ops/config"), "useOpsDashboard should fetch the gated config API");
});
