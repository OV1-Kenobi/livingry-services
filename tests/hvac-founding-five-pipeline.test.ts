import { test } from "node:test";
import assert from "node:assert/strict";
import { processSubmission } from "../src/lib/hvac-founding-five/pipeline";
import { InMemoryRequestStore } from "../src/lib/hvac-founding-five/store";
import { normalizeSubmission } from "../src/lib/hvac-founding-five/validation";
import {
  PermanentError,
  TransientError,
  type Adapters,
  type AdapterOutcome,
} from "../src/lib/hvac-founding-five/adapters";
import {
  REQUEST_STATES,
  TERMINAL_STATES,
  isActiveState,
  type FoundingFiveRequest,
} from "../src/lib/hvac-founding-five/types";
import { rateLimit, __resetRateLimits } from "../src/lib/hvac-founding-five/rate-limit";
import { assertNoPii } from "../src/lib/hvac-founding-five/analytics";

const ok = (note: string): AdapterOutcome => ({ attempted: true, ok: true, note });

function recordingAdapters(over: Partial<Adapters> = {}): { adapters: Adapters; exceptions: unknown[] } {
  const exceptions: unknown[] = [];
  const adapters: Adapters = {
    contactSync: { upsertContact: async () => ok("brevo") },
    router: { routeOpportunity: async () => ok("n8n") },
    notifier: {
      sendApplicantAck: async () => ok("ack"),
      sendOwnerAlert: async () => ok("owner"),
    },
    exceptions: { record: async (e) => void exceptions.push(e) },
    ...over,
  };
  return { adapters, exceptions };
}

function sub(over: Record<string, string> = {}) {
  return normalizeSubmission({
    fullName: "Jane Operator",
    companyName: "Northwind Heating",
    workEmail: "jane@northwind-hvac.com",
    phone: "5552134567",
    companyWebsite: "northwind-hvac.com",
    role: "Owner",
    workflowProblem: "After-hours calls go to voicemail and nobody follows up.",
    consent: true,
    ...over,
  });
}

test("success path creates an active record with owner, next action, due date", async () => {
  const store = new InMemoryRequestStore();
  const { adapters } = recordingAdapters();
  const res = await processSubmission(sub(), { store, adapters });
  assert.equal(res.ok, true);
  assert.equal(res.duplicate, false);
  assert.equal(res.state, "new_request");
  const [rec] = await store.list();
  assert.ok(isActiveState(rec.state));
  assert.ok(rec.ownerId);
  assert.ok(rec.nextAction);
  assert.ok(rec.nextActionDueAt);
  assert.equal(rec.submissionCount, 1);
});

test("duplicate submissions are recorded, never dropped, and alert the owner", async () => {
  const store = new InMemoryRequestStore();
  const { adapters } = recordingAdapters();
  await processSubmission(sub(), { store, adapters });
  const res2 = await processSubmission(sub(), { store, adapters });
  assert.equal(res2.duplicate, true);
  const all = await store.list();
  assert.equal(all.length, 1, "no competing record created");
  assert.equal(all[0].submissionCount, 2);
  assert.match(all[0].nextAction, /repeat request/i);
  assert.equal(res2.channels.ownerAlert.ok, true);
});

test("permanent adapter failure is surfaced but submission still succeeds", async () => {
  const store = new InMemoryRequestStore();
  const { adapters, exceptions } = recordingAdapters({
    contactSync: {
      upsertContact: async () => {
        throw new PermanentError("brevo-http-400");
      },
    },
  });
  const res = await processSubmission(sub(), { store, adapters });
  assert.equal(res.ok, true);
  assert.equal(res.channels.contactSync.ok, false);
  assert.equal((await store.list()).length, 1, "record persisted despite provider failure");
  assert.equal(exceptions.length, 1);
});

test("transient failures are retried and can then succeed", async () => {
  const store = new InMemoryRequestStore();
  let attempts = 0;
  const { adapters, exceptions } = recordingAdapters({
    router: {
      routeOpportunity: async () => {
        attempts += 1;
        if (attempts < 3) throw new TransientError("n8n-http-503");
        return ok("n8n");
      },
    },
  });
  const res = await processSubmission(sub(), {
    store,
    adapters,
    retry: { attempts: 3, delayMs: 0 },
  });
  assert.equal(attempts, 3);
  assert.equal(res.channels.router.ok, true);
  assert.equal(exceptions.length, 0);
});

test("state model: 12 states, correct terminals, active invariant", () => {
  assert.equal(REQUEST_STATES.length, 12);
  assert.deepEqual(TERMINAL_STATES, ["pilot_won", "pilot_lost", "disqualified"]);
  for (const s of REQUEST_STATES) {
    assert.equal(isActiveState(s), !TERMINAL_STATES.includes(s));
  }
});

test("rate limit allows 5 per window then blocks", () => {
  __resetRateLimits();
  const key = "test-key";
  for (let i = 0; i < 5; i++) {
    assert.equal(rateLimit(key).allowed, true, `request ${i + 1} should be allowed`);
  }
  const blocked = rateLimit(key);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSec > 0);
});

test("analytics rejects PII keys", () => {
  assert.throws(() => assertNoPii({ email: "x@y.com" }));
  assert.throws(() => assertNoPii({ workflow_problem: "..." }));
  assert.doesNotThrow(() => assertNoPii({ state: "new_request", duplicate: true }));
});

test("owner alert body carries no secrets", async () => {
  const store = new InMemoryRequestStore();
  let alertBody = "";
  const { adapters } = recordingAdapters({
    notifier: {
      sendApplicantAck: async () => ok("ack"),
      sendOwnerAlert: async (r: FoundingFiveRequest) => {
        alertBody = JSON.stringify(r);
        return ok("owner");
      },
    },
  });
  await processSubmission(sub(), { store, adapters });
  assert.ok(!/api[_-]?key|secret|token|password/i.test(alertBody));
});
