import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createSession,
  destroySession,
  setSessionTenant,
  verifySession,
} from "../src/lib/session";

// Unit evidence for the server-side session verification ported from the
// livingry-ops Stage-3 remediation (SEC-2026-001): the cookie is a signed,
// expiring random token; verification is constant-time; nothing accepts a
// static value.

test("issued session verifies and returns the server-bound tenant", () => {
  const { cookieValue, expiresAt } = createSession("tenant-abc");
  const snap = verifySession(cookieValue);
  assert.ok(snap, "valid session must verify");
  assert.equal(snap!.tenantId, "tenant-abc");
  assert.ok(expiresAt > Date.now(), "expiry is in the future");
});

test("missing, malformed, and forged cookies are rejected", () => {
  assert.equal(verifySession(undefined), null);
  assert.equal(verifySession(""), null);
  assert.equal(verifySession("not-a-session"), null);
  assert.equal(verifySession("a.b.c.d"), null);

  const { cookieValue } = createSession(null);
  const parts = cookieValue.split(".");
  // Tampered signature / tampered expiry must fail.
  assert.equal(verifySession(`${parts[0]}.${parts[1]}.bogussignature`), null);
  assert.equal(verifySession(`${parts[0]}.99999999999999.${parts[2]}`), null);
  // A fabricated token with a self-consistent-looking structure still fails
  // because the HMAC key is process-private.
  assert.equal(verifySession(`forgedtoken.99999999999999.${parts[2]}`), null);
});

test("expired sessions are rejected server-side", () => {
  const { cookieValue } = createSession(null, { ttlMs: -1000 });
  assert.equal(verifySession(cookieValue), null, "expired session must not verify");
  const { cookieValue: fresh } = createSession(null);
  const later = Date.now() + 9 * 60 * 60 * 1000;
  assert.equal(verifySession(fresh, later), null, "session past TTL must not verify");
});

test("destroyed sessions no longer verify (server-side logout)", () => {
  const { cookieValue } = createSession(null);
  assert.ok(verifySession(cookieValue));
  destroySession(cookieValue);
  assert.equal(verifySession(cookieValue), null);
});

test("setSessionTenant binds a server-resolved tenant to a live session", () => {
  const { cookieValue } = createSession(null);
  assert.ok(setSessionTenant(cookieValue, "tenant-xyz"));
  assert.equal(verifySession(cookieValue)!.tenantId, "tenant-xyz");
  assert.equal(setSessionTenant(undefined, "t"), false);
  assert.equal(setSessionTenant("bogus.cookie", "t"), false);
});
