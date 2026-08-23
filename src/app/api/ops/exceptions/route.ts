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
	const { rows } = await query(
		`select * from exceptions where tenant_id = $1 and status != 'resolved' order by severity asc, created_at asc`,
		[auth.tenantId],
	);
	return NextResponse.json({ exceptions: rows });
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
	const b = await req.json();
	if (!b.code) {
		return NextResponse.json({ error: "code required" }, { status: 400 });
	}
	const { rows } = await query(
		`insert into exceptions (tenant_id, code, severity, entity_type, entity_id, owner_id, due_at, details_json)
     values ($1,$2,coalesce($3,'P3'),$4,$5,$6,$7,coalesce($8,'{}'::jsonb)) returning *`,
		[
			auth.tenantId,
			b.code,
			b.severity,
			b.entity_type ?? null,
			b.entity_id ?? null,
			b.owner_id ?? null,
			b.due_at ?? null,
			JSON.stringify(b.details_json ?? {}),
		],
	);
	return NextResponse.json({ exception: rows[0] }, { status: 201 });
}
