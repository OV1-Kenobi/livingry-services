import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
	opsRateLimit,
	opsRateTierResponse,
	resolveOpsTenant,
} from "@/lib/ops-gate";

export async function GET(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	if (!auth.tenantId)
		return opsRateTierResponse(
			auth,
			"No workspace provisioned. Run /api/ops/setup first.",
		);
	const tenantId = auth.tenantId;

	const status = req.nextUrl.searchParams.get("status");
	const conditions = ["tenant_id = $1"];
	const values: any[] = [tenantId];
	if (status) {
		values.push(status);
		conditions.push(`status = $${values.length}`);
	}
	const { rows } = await query(
		`select * from tasks where ${conditions.join(" and ")} order by due_at asc`,
		values,
	);
	return NextResponse.json({ tasks: rows });
}

export async function POST(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	const rateLimited = opsRateLimit(req, "standard");
	if (rateLimited) return rateLimited;
	if (!auth.tenantId)
		return opsRateTierResponse(
			auth,
			"No workspace provisioned. Run /api/ops/setup first.",
		);
	const tenantId = auth.tenantId;

	const b = await req.json();
	if (!b.title || !b.due_at) {
		return NextResponse.json(
			{ error: "title, due_at required" },
			{ status: 400 },
		);
	}
	const { rows } = await query(
		`insert into tasks (tenant_id, entity_type, entity_id, title, owner_id, priority, due_at)
     values ($1,$2,$3,$4,$5,coalesce($6,'medium'),$7) returning *`,
		[
			tenantId,
			b.entity_type ?? "general",
			b.entity_id ?? null,
			b.title,
			b.owner_id ?? null,
			b.priority,
			b.due_at,
		],
	);
	return NextResponse.json({ task: rows[0] }, { status: 201 });
}
