import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/nostr-config";
import { getCuratedToolConfig } from "@/lib/ops-dashboard/private-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Serves the private, curated tool configuration for the authenticated client
// control panel. Gated by the SAME OTP session cookie as the rest of the
// dashboard, so real vendor config is never exposed to the public demo or to
// an unauthenticated caller. Returns 401 without a granted session.
export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get(SESSION_COOKIE)?.value !== "granted") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ tools: getCuratedToolConfig() });
}
