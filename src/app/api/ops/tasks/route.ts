import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get("tenant_id");
  const status = req.nextUrl.searchParams.get("status");
  if (!tenantId) return NextResponse.json({ error: "tenant_id required" }, { status: 400 });
  const conditions = ["tenant_id = $1"];
  const values: any[] = [tenantId];
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  const { rows } = await query(
    `select * from tasks where ${conditions.join(" and ")} order by due_at asc`,
    values
  );
  return NextResponse.json({ tasks: rows });
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  if (!b.tenant_id || !b.title || !b.due_at) {
    return NextResponse.json({ error: "tenant_id, title, due_at required" }, { status: 400 });
  }
  const { rows } = await query(
    `insert into tasks (tenant_id, entity_type, entity_id, title, owner_id, priority, due_at)
     values ($1,$2,$3,$4,$5,coalesce($6,'medium'),$7) returning *`,
    [b.tenant_id, b.entity_type ?? "general", b.entity_id ?? null, b.title,
     b.owner_id ?? null, b.priority, b.due_at]
  );
  return NextResponse.json({ task: rows[0] }, { status: 201 });
}
