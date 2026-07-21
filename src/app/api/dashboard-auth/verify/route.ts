import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp-store";
import { SESSION_COOKIE } from "@/lib/nostr-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const sessionKey = String(body.sessionKey || "");
  const code = String(body.code || "");
  if (!sessionKey || !code) return NextResponse.json({ ok: false, error: "Missing session or code." }, { status: 400 });

  const result = verifyOtp(sessionKey, code);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.reason }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "granted", { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 8, path: "/" });
  return res;
}
