// In-memory OTP store for the demo dashboard login gate.
// Process-local; not a substitute for Redis/Supabase in production.
// OPSEC: holds only short-lived numeric OTP codes, never Nostr key material.
// Codes come from crypto.randomInt (CSPRNG) — never Math.random (SEC-2026-005).

import { randomInt } from "node:crypto";

type OtpRecord = {
	code: string;
	createdAt: number;
	expiresAt: number;
	attempts: number;
};

const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const store = new Map<string, OtpRecord>();

export function generateOtp(sessionKey: string): string {
	// Uniform over [0, 1_000_000); padStart keeps the 6-digit UX contract
	// (e.g. "000123") that the legacy Math.random formulation produced.
	const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
	const now = Date.now();
	store.set(sessionKey, {
		code,
		createdAt: now,
		expiresAt: now + OTP_TTL_MS,
		attempts: 0,
	});
	return code;
}

export function verifyOtp(
	sessionKey: string,
	candidate: string,
): { ok: boolean; reason?: string } {
	const rec = store.get(sessionKey);
	if (!rec) return { ok: false, reason: "No OTP requested for this session." };
	if (Date.now() > rec.expiresAt) {
		store.delete(sessionKey);
		return { ok: false, reason: "Code expired. Request a new one." };
	}
	if (rec.attempts >= MAX_ATTEMPTS) {
		store.delete(sessionKey);
		return { ok: false, reason: "Too many attempts. Request a new code." };
	}
	rec.attempts += 1;
	if (rec.code !== candidate.trim()) {
		return { ok: false, reason: "Incorrect code." };
	}
	store.delete(sessionKey);
	return { ok: true };
}
