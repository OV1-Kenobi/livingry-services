import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const { rows } = await query(
    `select id, name, slug from tenants order by created_at asc limit 1`
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "No tenant found. Run /api/ops/setup first." }, { status: 404 });
  }
  return NextResponse.json({ tenant: rows[0] });
}
