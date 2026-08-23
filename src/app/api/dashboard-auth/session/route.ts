import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/nostr-config";
import { readSessionCookie } from "@/lib/ops-gate";
import { destroySession, verifySession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-side session probe: grants only when the signed session token
// verifies (HMAC + expiry + store presence). The static "granted" value no
// longer exists anywhere in the surface.
export async function GET(req: Request) {
	const granted = verifySession(readSessionCookie(req)) !== null;
	return NextResponse.json({ granted });
}

export async function DELETE(req: Request) {
	destroySession(readSessionCookie(req));
	const res = NextResponse.json({ ok: true });
	res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
	return res;
}
