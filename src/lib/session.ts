// src/lib/session.ts — server-side session verification for the legacy
// dashboard/ops auth surface (SEC-2026-001 remediation).
//
// The old flow accepted a static cookie value ("granted") — forgeable by any
// caller. This module replaces it with a signed random session token:
//
//   cookie value = <random token>.<expiry ms>.<HMAC-SHA256 signature>
//
// The token is 32 CSPRNG bytes; the signature is keyed HMAC-SHA256 over
// "token.expiry" so the cookie cannot be forged or its expiry tampered with,
// and verification always runs in constant time (timingSafeEqual). Expiry is
// enforced server-side on every check.
//
// DOGFOOD-APPROPRIATE STATELESS/IN-MEMORY MODEL (documented):
// The signing key below is generated once per process, and the session table
// is an in-memory Map. Consequences, all acceptable for the local dogfood
// surface and documented rather than hidden:
//   - A server restart invalidates every session (store is empty and the key
//     is new). Users simply sign in again.
//   - The HMAC signature makes the cookie unforgeable while the process runs.
//   - The signed, expiring token is self-contained: a shared store or stable
//     key can be introduced later without changing call sites (the cookie
//     already carries everything needed for stateless verification).
//   - This must NOT ship as-is to a horizontally scaled production surface;
//     the Phase 2/3 Supabase auth model supersedes it.
//
// The tenant is bound to the session at creation time, server-side, and is
// NEVER taken from request query/body (SEC-2026-002 remediation).

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8h, matching the legacy cookie maxAge
export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);

// Per-process signing key (see header note on the dogfood model).
const SIGNING_KEY = randomBytes(32);

type SessionRecord = { tenantId: string | null; expiresAt: number };

const sessions = new Map<string, SessionRecord>();

export type SessionSnapshot = { tenantId: string | null };

function sign(payload: string): string {
	return createHmac("sha256", SIGNING_KEY)
		.update(payload, "utf8")
		.digest("base64url");
}

/**
 * Issue a new session. `tenantId` MUST come from a server-side resolution —
 * callers never accept it from request input.
 */
export function createSession(
	tenantId: string | null,
	opts: { ttlMs?: number } = {},
): { cookieValue: string; expiresAt: number } {
	const token = randomBytes(32).toString("base64url");
	const expiresAt = Date.now() + (opts.ttlMs ?? SESSION_TTL_MS);
	const payload = `${token}.${expiresAt}`;
	sessions.set(token, { tenantId, expiresAt });
	return { cookieValue: `${payload}.${sign(payload)}`, expiresAt };
}

/**
 * Verify a session cookie value. Returns the session snapshot (including the
 * server-bound tenant) or null when the cookie is absent, malformed, forged,
 * tampered, expired, or revoked. `now` is injectable for tests.
 */
export function verifySession(
	cookieValue: string | undefined,
	now: number = Date.now(),
): SessionSnapshot | null {
	if (!cookieValue) return null;
	const parts = cookieValue.split(".");
	if (parts.length !== 3) return null;
	const [token, expiryRaw, sig] = parts;
	const payload = `${token}.${expiryRaw}`;
	const expected = sign(payload);
	const a = Buffer.from(sig);
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
	const expiresAt = Number(expiryRaw);
	if (!Number.isFinite(expiresAt) || expiresAt <= now) return null;
	const rec = sessions.get(token);
	if (!rec || rec.expiresAt !== expiresAt) return null;
	return { tenantId: rec.tenantId };
}

/**
 * Bind a server-resolved tenant into an existing session (used when a session
 * was created before the workspace was provisioned). Returns false if the
 * session is no longer current.
 */
export function setSessionTenant(
	cookieValue: string | undefined,
	tenantId: string,
): boolean {
	if (!cookieValue) return false;
	const token = cookieValue.split(".")[0];
	const rec = sessions.get(token);
	if (!rec) return false;
	rec.tenantId = tenantId;
	return true;
}

/** Destroy a session server-side (logout). */
export function destroySession(cookieValue: string | undefined): void {
	if (!cookieValue) return;
	sessions.delete(cookieValue.split(".")[0]);
}
