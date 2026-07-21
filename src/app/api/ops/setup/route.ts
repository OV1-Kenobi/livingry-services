import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getPool, query } from "@/lib/db";

// One-time (idempotent) setup route: applies schema.sql, ensures a default
// tenant exists, and seeds the 7 tool-category integration_connections
// rows. Protected by SETUP_SECRET so it can't be triggered by randoms.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-setup-secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const schemaPath = path.join(process.cwd(), "sql", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query(schemaSql);
  } finally {
    client.release();
  }

  const tenantSlug = process.env.DEFAULT_TENANT_SLUG || "livingry-dogfood";
  const tenantName = process.env.DEFAULT_TENANT_NAME || "Livingry Services";

  const existing = await query(
    "select id from tenants where slug = $1",
    [tenantSlug]
  );

  let tenantId: string;
  if (existing.rows.length > 0) {
    tenantId = (existing.rows[0] as any).id;
  } else {
    const inserted = await query(
      `insert into tenants (name, slug) values ($1, $2) returning id`,
      [tenantName, tenantSlug]
    );
    tenantId = (inserted.rows[0] as any).id;
  }

  const seedRows: Array<[string, string, string, number, number | null, string | null, string]> = [
    ["booking_scheduling", "victoria_ai", "Victoria AI", 12000, 30, "https://www.versionseven.ai/pricing", "Booking & scheduling. $10 first month, $120/mo thereafter. Needed for marketing/sales/intake — activate first."],
    ["operations_admin", "ela_ai", "Ela AI", 14900, 14, "https://ela.ai", "Operations, admin fulfillment automation. $149/mo, 2-week free trial. Optional adapter per TradeOps System Boundary — not a system of record. Delay until first paying client."],
    ["content_creation", "caliope_ai", "Caliope AI", 29000, 30, null, "Content creation to attract/build trust. $290/mo for 10 seats billed annually, 30-day free trial. Delay until first paying client."],
    ["sales_call_intelligence", "aurameet", "Aurameet.live AI", 999, null, "https://app.aura-app.ai", "Analyzes sales calls in real time. $9.99/mo. Low cost — candidate for early activation once discovery calls begin."],
    ["marketing_crm", "brevo", "Brevo", 808, null, "https://www.brevo.com/pricing", "Email/SMS/WhatsApp marketing + CRM. $8.08/mo. Core to intake gateway confirmations — activate first alongside Victoria AI."],
    ["sales_outreach", "aura_app_ai", "Aura-app.ai", 9700, 14, "https://app.aura-app.ai", "AI Sales Performance Platform. $97/mo + 20% commission, 2-week free trial. Delay until pipeline exists."],
    ["orchestration", "n8n", "n8n", 6000, 14, "https://n8n.io/pricing", "AI agent/workflow orchestration core for the entire TradeOps layer. $24-60/mo, 2-week free trial. Activate as soon as dogfood workflows are ready to wire."],
  ];

  for (const [category, provider, displayName, cost, trialDays, signupUrl, notes] of seedRows) {
    await query(
      `insert into integration_connections
        (tenant_id, category, provider, display_name, monthly_cost_cents, trial_length_days, signup_url, notes)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       on conflict (tenant_id, provider) do update set
         display_name = excluded.display_name,
         monthly_cost_cents = excluded.monthly_cost_cents,
         trial_length_days = excluded.trial_length_days,
         signup_url = excluded.signup_url,
         notes = excluded.notes,
         updated_at = now()`,
      [tenantId, category, provider, displayName, cost, trialDays, signupUrl, notes]
    );
  }

  return NextResponse.json({ ok: true, tenant_id: tenantId, seeded: seedRows.length });
}
