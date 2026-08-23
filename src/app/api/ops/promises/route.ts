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
		`select * from promises where tenant_id = $1 order by due_at asc`,
		[auth.tenantId],
	);
	return NextResponse.json({ promises: rows });
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
	if (!b.text || !b.due_at || !b.direction) {
		return NextResponse.json(
			{ error: "text, due_at, direction required" },
			{ status: 400 },
		);
	}
	const { rows } = await query(
		`insert into promises
      (tenant_id, entity_type, entity_id, direction, text, promisor, beneficiary, due_at, original_due_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$8) returning *`,
		[
			auth.tenantId,
			b.entity_type ?? "general",
			b.entity_id ?? null,
			b.direction,
			b.text,
			b.promisor ?? null,
			b.beneficiary ?? null,
			b.due_at,
		],
	);
	return NextResponse.json({ promise: rows[0] }, { status: 201 });
}
