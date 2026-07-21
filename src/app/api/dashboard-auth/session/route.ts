import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/nostr-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const granted = cookieStore.get(SESSION_COOKIE)?.value === "granted";
  return NextResponse.json({ granted });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
