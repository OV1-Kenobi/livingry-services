import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get("tenant_id");
  if (!tenantId) return NextResponse.json({ error: "tenant_id required" }, { status: 400 });
  const { rows } = await query(
    `select * from exceptions where tenant_id = $1 and status != 'resolved' order by severity asc, created_at asc`,
    [tenantId]
  );
  return NextResponse.json({ exceptions: rows });
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  if (!b.tenant_id || !b.code) {
    return NextResponse.json({ error: "tenant_id, code required" }, { status: 400 });
  }
  const { rows } = await query(
    `insert into exceptions (tenant_id, code, severity, entity_type, entity_id, owner_id, due_at, details_json)
     values ($1,$2,coalesce($3,'P3'),$4,$5,$6,$7,coalesce($8,'{}'::jsonb)) returning *`,
    [b.tenant_id, b.code, b.severity, b.entity_type ?? null, b.entity_id ?? null,
     b.owner_id ?? null, b.due_at ?? null, JSON.stringify(b.details_json ?? {})]
  );
  return NextResponse.json({ exception: rows[0] }, { status: 201 });
}
