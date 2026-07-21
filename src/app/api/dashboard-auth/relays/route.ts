import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEFAULT_RELAYS, RELAY_COOKIE } from "@/lib/nostr-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(RELAY_COOKIE)?.value;
  let selected: string[] = DEFAULT_RELAYS.map((r) => r.id);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) selected = parsed;
    } catch {}
  }
  return NextResponse.json({ options: DEFAULT_RELAYS, selected });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ids: unknown = body.selected;
  if (!Array.isArray(ids) || !ids.every((x) => typeof x === "string")) {
    return NextResponse.json({ ok: false, error: "selected must be an array of relay ids" }, { status: 400 });
  }
  const valid = ids.filter((id) => DEFAULT_RELAYS.some((r) => r.id === id));
  if (!valid.length) return NextResponse.json({ ok: false, error: "At least one valid relay must be selected" }, { status: 400 });

  const res = NextResponse.json({ ok: true, selected: valid });
  res.cookies.set(RELAY_COOKIE, JSON.stringify(valid), { httpOnly: false, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365, path: "/" });
  return res;
}
