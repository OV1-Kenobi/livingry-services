import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get("tenant_id");
  if (!tenantId) return NextResponse.json({ error: "tenant_id required" }, { status: 400 });
  const { rows } = await query(
    `select o.*, c.name as company_name, ct.name as contact_name
     from opportunities o
     left join companies c on c.id = o.company_id
     left join contacts ct on ct.id = o.primary_contact_id
     where o.tenant_id = $1
     order by o.updated_at desc`,
    [tenantId]
  );
  return NextResponse.json({ opportunities: rows });
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  if (!b.tenant_id) return NextResponse.json({ error: "tenant_id required" }, { status: 400 });
  const { rows } = await query(
    `insert into opportunities
      (tenant_id, company_id, primary_contact_id, stage, service_type,
       value_estimate_cents, next_action, next_action_due_at, owner_id)
     values ($1,$2,$3,coalesce($4,'new'),$5,$6,$7,$8,$9)
     returning *`,
    [b.tenant_id, b.company_id ?? null, b.primary_contact_id ?? null, b.stage,
     b.service_type ?? null, b.value_estimate_cents ?? null, b.next_action ?? null,
     b.next_action_due_at ?? null, b.owner_id ?? null]
  );
  await query(
    `insert into audit_log (tenant_id, actor_type, action, entity_type, entity_id, after_json)
     values ($1,'human','opportunity.created','opportunity',$2,$3)`,
    [b.tenant_id, rows[0].id, JSON.stringify(rows[0])]
  );
  return NextResponse.json({ opportunity: rows[0] }, { status: 201 });
}
