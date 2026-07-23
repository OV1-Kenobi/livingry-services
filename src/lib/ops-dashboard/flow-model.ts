import type { CategoryId } from "./types";

// Single source of truth for the lifecycle flow diagram. This is deliberately
// coordinate-free: the renderer lays it out with CSS Grid/Flex, and the
// structural tests assert the ordering and roles below. It encodes only
// relationships the product already represents — nothing more.

// The Ops layer is NOT a lifecycle stage. It is the orchestration/control
// plane that spans and governs every stage (rendered as the full-width top
// rail) and simultaneously receives an audit event stream from every stage
// (rendered as the full-width bottom rail).
export const OPS_CONTROL_PLANE = {
  id: "ops_layer" as CategoryId,
  eyebrow: "Orchestrate & Govern",
  title: "Dashboard / Ops Layer",
  role: "control-plane" as const,
  summary: "Observes and controls every stage: work/data flow, approvals, exceptions, and policy gates.",
};

// The bottom audit rail. Same underlying category (ops_layer) but a distinct
// role in the diagram: it receives events from every stage.
export const PROOF_LEDGER_RAIL = {
  id: "ops_layer" as CategoryId,
  eyebrow: "Audit",
  title: "Activity & Proof Ledger",
  role: "audit-rail" as const,
  summary: "Every stage writes a defensible, timestamped record here — one immutable audit trail.",
  receivesFrom: "every-stage" as const,
};

// A lane is a single category within a lifecycle stage. Most stages have one
// lane; COORDINATE has two coordinated lanes (Knowledge + Workflow).
export type FlowLane = { id: CategoryId };

export type LifecycleStage = {
  // Stable ordering key, asserted by the structural tests.
  stage: "ATTRACT" | "INTAKE" | "COORDINATE" | "EXECUTE" | "RETAIN";
  eyebrow: string;
  // Short label for what flows INTO this stage from the previous one. The
  // first stage has no inbound label (nothing precedes attract).
  inbound: string | null;
  lanes: FlowLane[];
};

// Ordered left-to-right operating lifecycle. Order is significant and tested.
export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { stage: "ATTRACT", eyebrow: "Attract", inbound: null, lanes: [{ id: "discovery_trust" }] },
  { stage: "INTAKE", eyebrow: "Intake", inbound: "attention / signals", lanes: [{ id: "response" }] },
  {
    stage: "COORDINATE",
    eyebrow: "Coordinate",
    inbound: "enquiries / context",
    lanes: [{ id: "knowledge" }, { id: "workflow" }],
  },
  { stage: "EXECUTE", eyebrow: "Execute", inbound: "approved work", lanes: [{ id: "tradeops" }] },
  { stage: "RETAIN", eyebrow: "Retain", inbound: "completed jobs", lanes: [{ id: "continuity" }] },
];

// Recovery is an explicit feedback loop beneath the main lifecycle. It takes
// stale estimates / missed opportunities from the later stages and feeds them
// back toward Intake/Coordinate — it is not an arbitrary seventh point on a
// radial map.
export const RECOVERY_LOOP = {
  id: "recovery" as CategoryId,
  eyebrow: "Reactivate",
  title: "Recovery Systems",
  role: "feedback-loop" as const,
  carries: "stale estimates / missed opportunities",
  flowsBackTo: ["response", "workflow"] as CategoryId[],
};

// Every non-ops category referenced by the lifecycle + recovery loop, in the
// order they appear. Used to sanity-check coverage in tests.
export const FLOW_STAGE_CATEGORY_IDS: CategoryId[] = [
  ...LIFECYCLE_STAGES.flatMap((s) => s.lanes.map((l) => l.id)),
  RECOVERY_LOOP.id,
];
