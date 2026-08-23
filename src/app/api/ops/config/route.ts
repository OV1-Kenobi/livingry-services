import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/nostr-config";
import { ConfigService, PgConfigRepo } from "@/lib/ops-dashboard/config-store";
import type { CandidateTool, CategoryId } from "@/lib/ops-dashboard/types";
import { opsRateLimit } from "@/lib/ops-gate";
import { verifySession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Persisted, tenant-scoped tool configuration for the authenticated client
// control panel (private mode). Gated by the server-verified session cookie
// (HMAC-signed random token with expiry — no static value exists) as the rest
// of the dashboard: without a valid session every method returns 401, so real
// vendor config never reaches the public demo or an unauthenticated caller.
// The tenant is ALWAYS resolved server-side — the request body/query can never
// supply a tenant id, so cross-tenant access is impossible.

async function resolveService(): Promise<
	{ ok: true; service: ConfigService } | { ok: false; response: NextResponse }
> {
	const cookieStore = await cookies();
	if (!verifySession(cookieStore.get(SESSION_COOKIE)?.value)) {
		return {
			ok: false,
			response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
		};
	}
	let tenantId: string | null;
	try {
		tenantId = await new PgConfigRepo(query).resolveTenantId();
	} catch {
		return {
			ok: false,
			response: NextResponse.json(
				{ error: "Persistence unavailable" },
				{ status: 503 },
			),
		};
	}
	if (!tenantId) {
		return {
			ok: false,
			response: NextResponse.json(
				{ error: "No workspace provisioned. Run /api/ops/setup first." },
				{ status: 503 },
			),
		};
	}
	return {
		ok: true,
		service: new ConfigService(new PgConfigRepo(query), tenantId),
	};
}

export async function GET() {
	const resolved = await resolveService();
	if (!resolved.ok) return resolved.response;
	try {
		const tools = await resolved.service.list();
		return NextResponse.json({ tools });
	} catch (e) {
		return NextResponse.json(
			{
				error: e instanceof Error ? e.message : "Failed to load configuration",
			},
			{ status: 500 },
		);
	}
}

type PostBody = {
	op?: "add" | "replace" | "setEnabled" | "remove";
	provider?: string;
	candidate?: CandidateTool;
	categoryId?: CategoryId;
	enabled?: boolean;
};

export async function POST(req: NextRequest) {
	const rateLimited = opsRateLimit(req, "standard");
	if (rateLimited) return rateLimited;
	const resolved = await resolveService();
	if (!resolved.ok) return resolved.response;
	const { service } = resolved;

	let body: PostBody;
	try {
		body = (await req.json()) as PostBody;
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	try {
		let tools;
		switch (body.op) {
			case "setEnabled":
				if (!body.provider || typeof body.enabled !== "boolean") {
					return NextResponse.json(
						{ error: "provider and enabled are required" },
						{ status: 400 },
					);
				}
				tools = await service.setEnabled(body.provider, body.enabled);
				break;
			case "replace":
				if (!body.provider || !body.candidate) {
					return NextResponse.json(
						{ error: "provider and candidate are required" },
						{ status: 400 },
					);
				}
				tools = await service.replace(body.provider, body.candidate);
				break;
			case "add":
				if (!body.categoryId || !body.candidate) {
					return NextResponse.json(
						{ error: "categoryId and candidate are required" },
						{ status: 400 },
					);
				}
				tools = await service.add(body.categoryId, body.candidate);
				break;
			case "remove":
				if (!body.provider) {
					return NextResponse.json(
						{ error: "provider is required" },
						{ status: 400 },
					);
				}
				tools = await service.remove(body.provider);
				break;
			default:
				return NextResponse.json({ error: "Unknown op" }, { status: 400 });
		}
		return NextResponse.json({ tools });
	} catch (e) {
		return NextResponse.json(
			{
				error:
					e instanceof Error ? e.message : "Failed to update configuration",
			},
			{ status: 500 },
		);
	}
}
