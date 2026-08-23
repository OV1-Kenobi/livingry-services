// src/lib/ops-gate.ts — SERVER-ONLY access gate for the legacy ops route
// family (SEC-2026-002 remediation).
//
// Every ops route must run through `resolveOpsTenant`:
//   1. The session cookie is verified server-side (HMAC signature + expiry +
//      store presence, via src/lib/session.ts). No static value is ever
//      accepted. A missing/forged cookie gets a 401 before anything else.
//   2. The tenant is taken from the authenticated session context — NEVER
//      from query parameters or the request body. If the session predates
//      workspace provisioning, the tenant is re-resolved server-side and
//      bound back into the session (still never client-supplied).
//   3. The route then responds with the established 503 contract when no
//      tenant exists (persistence unavailable vs. not provisioned).
//
// `opsRateLimit` applies the existing in-memory rate-limit pattern
// (src/lib/hvac-founding-five/rate-limit.ts) to the mutating ops surface,
// with a tighter tier on the credential-touching integrations routes
// (POST/PATCH/DELETE), where a flood could rotate or destroy encrypted tool
// credentials. Limits are per-IP and per-instance, consistent with the
// documented per-instance semantics of the shared rate-limit module.

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import { SESSION_COOKIE } from "@/lib/nostr-config";
import { PgConfigRepo } from "@/lib/ops-dashboard/config-store";
import { setSessionTenant, verifySession } from "@/lib/session";

export function readSessionCookie(req: Request): string | undefined {
	const header = req.headers.get("cookie");
	if (!header) return undefined;
	for (const part of header.split(";")) {
		const eq = part.indexOf("=");
		if (eq === -1) continue;
		if (part.slice(0, eq).trim() === SESSION_COOKIE)
			return part.slice(eq + 1).trim();
	}
	return undefined;
}

export type OpsTenantResolution =
	| { ok: true; tenantId: string; persistenceUnavailable: false }
	| { ok: true; tenantId: null; persistenceUnavailable: boolean }
	| { ok: false; response: NextResponse };

export async function resolveOpsTenant(
	req: Request,
): Promise<OpsTenantResolution> {
	const cookieValue = readSessionCookie(req);
	const snap = verifySession(cookieValue);
	if (!snap) {
		return {
			ok: false,
			response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
		};
	}
	if (snap.tenantId)
		return { ok: true, tenantId: snap.tenantId, persistenceUnavailable: false };

	// Pre-provisioning session: resolve the tenant strictly server-side and bind
	// it into the session so all subsequent requests read it from the session
	// context. Request input is never consulted.
	try {
		const resolved = await new PgConfigRepo(query).resolveTenantId();
		if (resolved && setSessionTenant(cookieValue, resolved)) {
			return { ok: true, tenantId: resolved, persistenceUnavailable: false };
		}
		return { ok: true, tenantId: null, persistenceUnavailable: false };
	} catch {
		return { ok: true, tenantId: null, persistenceUnavailable: true };
	}
}

export function opsRateTierResponse(
	resolution: Extract<OpsTenantResolution, { ok: true }>,
	notProvisionedMessage: string,
): NextResponse {
	return NextResponse.json(
		{
			error: resolution.persistenceUnavailable
				? "Persistence unavailable"
				: notProvisionedMessage,
		},
		{ status: 503 },
	);
}

// Per-IP, per-instance limits on the mutating ops surface.
const TIERS = {
	// General ops mutations (create/update/delete beyond credentials).
	standard: { limit: 120, windowMs: 60 * 1000 },
	// Credential-touching integrations writes (credential create/rotate/remove).
	credentialWrite: { limit: 20, windowMs: 10 * 60 * 1000 },
} as const;

export type OpsRateTier = keyof typeof TIERS;

/** Returns a 429 response when over the limit, null when allowed. */
export function opsRateLimit(
	req: Request,
	tier: OpsRateTier,
): NextResponse | null {
	const forwarded = req.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
	const opts = TIERS[tier];
	const rl = rateLimit(`ops:${tier}:${ip}`, opts);
	if (!rl.allowed) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
		);
	}
	return null;
}
