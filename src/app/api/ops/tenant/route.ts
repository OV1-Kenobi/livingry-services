import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { resolveOpsTenant } from "@/lib/ops-gate";

// Gated tenant resolution. The tenant comes from the authenticated session
// context (server-bound at login), never from query/body. The response shape
// matches the legacy contract the ops client already consumes.
export async function GET(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	if (!auth.tenantId) {
		if (auth.persistenceUnavailable) {
			return NextResponse.json(
				{ error: "Persistence unavailable" },
				{ status: 503 },
			);
		}
		return NextResponse.json(
			{ error: "No tenant found. Run /api/ops/setup first." },
			{ status: 404 },
		);
	}
	const { rows } = await query(
		`select id, name, slug from tenants where id = $1 limit 1`,
		[auth.tenantId],
	);
	if (rows.length === 0) {
		return NextResponse.json(
			{ error: "No tenant found. Run /api/ops/setup first." },
			{ status: 404 },
		);
	}
	return NextResponse.json({ tenant: rows[0] });
}
