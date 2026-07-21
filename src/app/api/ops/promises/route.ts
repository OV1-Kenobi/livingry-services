import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get("tenant_id");
  if (!tenantId) return NextResponse.json({ error: "tenant_id required" }, { status: 400 });
  const { rows } = await query(
    `select * from promises where tenant_id = $1 order by due_at asc`,
    [tenantId]
  );
  return NextResponse.json({ promises: rows });
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  if (!b.tenant_id || !b.text || !b.due_at || !b.direction) {
    return NextResponse.json({ error: "tenant_id, text, due_at, direction required" }, { status: 400 });
  }
  const { rows } = await query(
    `insert into promises
      (tenant_id, entity_type, entity_id, direction, text, promisor, beneficiary, due_at, original_due_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$8) returning *`,
    [b.tenant_id, b.entity_type ?? "general", b.entity_id ?? null, b.direction,
     b.text, b.promisor ?? null, b.beneficiary ?? null, b.due_at]
  );
  return NextResponse.json({ promise: rows[0] }, { status: 201 });
}
