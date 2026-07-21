import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { encryptSecret, maskSecret } from "@/lib/crypto";

// GET: list all integration connections for the tenant, grouped by the
// 7 tool categories. Never returns decrypted credentials — only a masked
// preview and configured/not_configured status, so this is safe to render
// directly in the setup UI.
export async function GET(req: NextRequest) {
  const tenantId = req.nextUrl.searchParams.get("tenant_id");
  if (!tenantId) {
    return NextResponse.json({ error: "tenant_id is required" }, { status: 400 });
  }

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
    [tenantId]
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
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    tenant_id,
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

  if (!tenant_id || !category || !provider || !display_name) {
    return NextResponse.json(
      { error: "tenant_id, category, provider, and display_name are required" },
      { status: 400 }
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
      tenant_id,
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
    ]
  );

  return NextResponse.json({ connection: rows[0] }, { status: 201 });
}
