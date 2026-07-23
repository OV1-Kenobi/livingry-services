import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, FLOW_EDGES, CANDIDATE_CATALOG, CATEGORY_BY_ID } from "../src/lib/ops-dashboard/categories";

const VALID_IDS = new Set(CATEGORIES.map((c) => c.id));

test("exactly one orchestration layer, seven systems", () => {
  const orchestration = CATEGORIES.filter((c) => c.kind === "orchestration");
  const systems = CATEGORIES.filter((c) => c.kind === "system");
  assert.equal(orchestration.length, 1);
  assert.equal(orchestration[0].id, "ops_layer");
  assert.equal(systems.length, 7);
});

test("category ids are unique", () => {
  assert.equal(VALID_IDS.size, CATEGORIES.length);
});

test("every category answers the six required questions", () => {
  for (const c of CATEGORIES) {
    assert.ok(c.purpose.trim().length > 0, `${c.id} missing purpose`);
    assert.ok(c.inputs.length > 0, `${c.id} missing inputs`);
    assert.ok(c.processing.length > 0, `${c.id} missing processing`);
    assert.ok(c.outputs.length > 0, `${c.id} missing outputs`);
    assert.ok(c.humanIntervention.length > 0, `${c.id} missing humanIntervention`);
    assert.ok(c.successMeasures.length > 0, `${c.id} missing successMeasures`);
  }
});

test("flow edges only reference known categories", () => {
  for (const e of FLOW_EDGES) {
    assert.ok(VALID_IDS.has(e.from), `edge from unknown ${e.from}`);
    assert.ok(VALID_IDS.has(e.to), `edge to unknown ${e.to}`);
  }
});

test("every system routes events into the ops layer", () => {
  for (const c of CATEGORIES) {
    if (c.kind !== "system") continue;
    const hasEdge = FLOW_EDGES.some((e) => e.from === c.id && e.to === "ops_layer");
    assert.ok(hasEdge, `${c.id} does not connect to ops_layer`);
  }
});

test("every category has at least one interchangeable candidate", () => {
  for (const id of VALID_IDS) {
    assert.ok((CANDIDATE_CATALOG[id] ?? []).length >= 1, `${id} has no catalog candidates`);
  }
});

test("CATEGORY_BY_ID resolves every id", () => {
  for (const id of VALID_IDS) {
    assert.equal(CATEGORY_BY_ID[id].id, id);
  }
});
