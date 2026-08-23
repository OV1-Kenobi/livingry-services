import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/nostr-config";
import { PgConfigRepo } from "@/lib/ops-dashboard/config-store";
import { verifyOtp } from "@/lib/otp-store";
import { createSession, SESSION_MAX_AGE_SECONDS } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	const body = await req.json().catch(() => ({}));
	const sessionKey = String(body.sessionKey || "");
	const code = String(body.code || "");
	if (!sessionKey || !code)
		return NextResponse.json(
			{ ok: false, error: "Missing session or code." },
			{ status: 400 },
		);

	const result = verifyOtp(sessionKey, code);
	if (!result.ok)
		return NextResponse.json(
			{ ok: false, error: result.reason },
			{ status: 401 },
		);

	// A correct OTP issues a signed, expiring session token (SEC-2026-001).
	// The tenant claim is resolved strictly server-side and bound into the
	// session — never accepted from the client. When the DB is unavailable or
	// unprovisioned the session is still issued (tenant bound later, still
	// server-side, by the ops gate).
	let tenantId: string | null = null;
	try {
		tenantId = await new PgConfigRepo(query).resolveTenantId();
	} catch {
		tenantId = null; // pre-provisioning / persistence unavailable — not fatal here
	}

	const session = createSession(tenantId);
	const res = NextResponse.json({ ok: true });
	res.cookies.set(SESSION_COOKIE, session.cookieValue, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: SESSION_MAX_AGE_SECONDS,
		path: "/",
	});
	return res;
}
