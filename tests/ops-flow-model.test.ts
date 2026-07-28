import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LIFECYCLE_STAGES,
  OPS_CONTROL_PLANE,
  PROOF_LEDGER_RAIL,
  RECOVERY_LOOP,
  FLOW_STAGE_CATEGORY_IDS,
} from "../src/lib/ops-dashboard/flow-model";
import { CATEGORY_BY_ID } from "../src/lib/ops-dashboard/categories";

// Structural guards for the replacement lifecycle diagram. These lock the
// information architecture the product requires: a left-to-right lifecycle,
// an Ops *control plane* (not a lifecycle stage), Recovery as a feedback loop,
// and the activity ledger as an audit rail.

test("lifecycle stages are in the required operating order", () => {
  assert.deepEqual(
    LIFECYCLE_STAGES.map((s) => s.stage),
    ["ATTRACT", "INTAKE", "COORDINATE", "EXECUTE", "RETAIN"],
  );
});

test("lifecycle stages map to the correct categories", () => {
  const laneIds = LIFECYCLE_STAGES.map((s) => s.lanes.map((l) => l.id));
  assert.deepEqual(laneIds, [
    ["discovery_trust"],
    ["response"],
    ["knowledge", "workflow"], // Coordinate is two coordinated lanes
    ["tradeops"],
    ["continuity"],
  ]);
});

test("Coordinate is the only multi-lane stage and groups Knowledge + Workflow", () => {
  const multi = LIFECYCLE_STAGES.filter((s) => s.lanes.length > 1);
  assert.equal(multi.length, 1);
  assert.equal(multi[0].stage, "COORDINATE");
  assert.equal(multi[0].eyebrow, "Coordinate");
  assert.deepEqual(multi[0].lanes.map((l) => l.id), ["knowledge", "workflow"]);
});

test("no lifecycle stage is labelled Support (Knowledge is not its own phase)", () => {
  for (const s of LIFECYCLE_STAGES) {
    assert.notEqual(s.eyebrow.toLowerCase(), "support", `${s.stage} must not be a Support phase`);
  }
});

test("only the first stage has no inbound flow label; the rest are labelled", () => {
  assert.equal(LIFECYCLE_STAGES[0].inbound, null);
  for (const s of LIFECYCLE_STAGES.slice(1)) {
    assert.ok(s.inbound && s.inbound.trim().length > 0, `${s.stage} needs an inbound flow label`);
  }
  assert.deepEqual(
    LIFECYCLE_STAGES.slice(1).map((s) => s.inbound),
    ["attention / signals", "enquiries / context", "approved work", "completed jobs"],
  );
});

test("Ops is a control plane spanning every stage, not a lifecycle stage", () => {
  assert.equal(OPS_CONTROL_PLANE.id, "ops_layer");
  assert.equal(OPS_CONTROL_PLANE.role, "control-plane");
  // The ops layer must never appear as a lifecycle lane.
  const allLaneIds = LIFECYCLE_STAGES.flatMap((s) => s.lanes.map((l) => l.id));
  assert.ok(!allLaneIds.includes("ops_layer"), "ops_layer must not be a lifecycle lane");
});

test("activity ledger is the bottom audit rail receiving from every stage", () => {
  assert.equal(PROOF_LEDGER_RAIL.role, "audit-rail");
  assert.equal(PROOF_LEDGER_RAIL.receivesFrom, "every-stage");
});

test("Recovery is an explicit feedback loop back to Intake/Coordinate", () => {
  assert.equal(RECOVERY_LOOP.id, "recovery");
  assert.equal(RECOVERY_LOOP.role, "feedback-loop");
  assert.deepEqual(RECOVERY_LOOP.flowsBackTo, ["response", "workflow"]);
  assert.ok(RECOVERY_LOOP.carries.trim().length > 0);
  // Recovery must not be placed inline as a lifecycle stage.
  const allLaneIds = LIFECYCLE_STAGES.flatMap((s) => s.lanes.map((l) => l.id));
  assert.ok(!allLaneIds.includes("recovery"), "recovery must not be a lifecycle lane");
});

test("every flow category id resolves to a real category", () => {
  for (const id of FLOW_STAGE_CATEGORY_IDS) {
    assert.ok(CATEGORY_BY_ID[id], `flow references unknown category ${id}`);
  }
});

test("the diagram covers all eight systems exactly once", () => {
  const systems = Object.values(CATEGORY_BY_ID).filter((c) => c.kind === "system").map((c) => c.id).sort();
  const covered = [...FLOW_STAGE_CATEGORY_IDS].sort();
  assert.deepEqual(covered, systems);
});
