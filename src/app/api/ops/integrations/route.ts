import { type NextRequest, NextResponse } from "next/server";
import { encryptSecret, maskSecret } from "@/lib/crypto";
import { query } from "@/lib/db";
import {
	opsRateLimit,
	opsRateTierResponse,
	resolveOpsTenant,
} from "@/lib/ops-gate";

// GET: list all integration connections for the session tenant, grouped by the
// 7 tool categories. Never returns decrypted credentials — only a masked
// preview and configured/not_configured status, so this is safe to render
// directly in the setup UI. The tenant is the server-bound session tenant;
// any client-supplied tenant_id on the query string is ignored.
export async function GET(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	if (!auth.tenantId)
		return opsRateTierResponse(
			auth,
			"No workspace provisioned. Run /api/ops/setup first.",
		);
	const tenantId = auth.tenantId;

	const { rows } = await query(
		`select id, category, provider, display_name, status, billing_status,
            monthly_cost_cents, trial_length_days, signup_url, notes,
            config_json,
            (credentials_encrypted is not null) as has_credentials,
            last_success_at, last_error_at, last_error_message,
            created_at, updated_at
     from integration_connections
     where tenant_id = $1
     order by category, provider`,
		[tenantId],
	);

	const categories = [
		"booking_scheduling",
		"operations_admin",
		"content_creation",
		"sales_call_intelligence",
		"marketing_crm",
		"sales_outreach",
		"orchestration",
	];

	const grouped = categories.map((category) => ({
		category,
		connections: rows.filter((r: any) => r.category === category),
	}));

	return NextResponse.json({ categories: grouped });
}

// POST: create a new integration connection (e.g. a client adds a
// vendor-specific adapter not in the default 7). Credentials, if supplied,
// are encrypted before storage — plaintext never touches the database.
// Rate-limited as a credential write.
export async function POST(req: NextRequest) {
	const auth = await resolveOpsTenant(req);
	if (!auth.ok) return auth.response;
	const rateLimited = opsRateLimit(req, "credentialWrite");
	if (rateLimited) return rateLimited;
	if (!auth.tenantId)
		return opsRateTierResponse(
			auth,
			"No workspace provisioned. Run /api/ops/setup first.",
		);
	const tenantId = auth.tenantId;

	const body = await req.json();
	const {
		category,
		provider,
		display_name,
		monthly_cost_cents,
		trial_length_days,
		signup_url,
		notes,
		config_json,
		api_key,
	} = body;

	if (!category || !provider || !display_name) {
		return NextResponse.json(
			{ error: "category, provider, and display_name are required" },
			{ status: 400 },
		);
	}

	let credEncrypted: string | null = null;
	let credIv: string | null = null;
	let credTag: string | null = null;
	if (api_key) {
		const enc = encryptSecret(api_key);
		credEncrypted = enc.ciphertext;
		credIv = enc.iv;
		credTag = enc.tag;
	}

	const { rows } = await query(
		`insert into integration_connections
      (tenant_id, category, provider, display_name, monthly_cost_cents,
       trial_length_days, signup_url, notes, config_json,
       credentials_encrypted, credentials_iv, credentials_tag,
       status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     returning id, category, provider, display_name, status`,
		[
			tenantId,
			category,
			provider,
			display_name,
			monthly_cost_cents ?? null,
			trial_length_days ?? null,
			signup_url ?? null,
			notes ?? null,
			config_json ?? {},
			credEncrypted,
			credIv,
			credTag,
			credEncrypted ? "configured" : "not_configured",
		],
	);

	return NextResponse.json({ connection: rows[0] }, { status: 201 });
}
