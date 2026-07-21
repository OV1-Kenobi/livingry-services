import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { encryptSecret, decryptSecret, maskSecret } from "@/lib/crypto";

// GET one connection with a masked credential preview (never the raw secret).
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await query(
    `select id, tenant_id, category, provider, display_name, status,
            billing_status, monthly_cost_cents, trial_length_days,
            signup_url, notes, config_json,
            credentials_encrypted, credentials_iv, credentials_tag,
            last_success_at, last_error_at, last_error_message,
            created_at, updated_at
     from integration_connections where id = $1`,
    [id]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const row: any = rows[0];
  let masked: string | null = null;
  if (row.credentials_encrypted && row.credentials_iv && row.credentials_tag) {
    try {
      const plaintext = decryptSecret({
        ciphertext: row.credentials_encrypted,
        iv: row.credentials_iv,
        tag: row.credentials_tag,
      });
      masked = maskSecret(plaintext);
    } catch {
      masked = "••••••••(unreadable — rotate key)";
    }
  }
  delete row.credentials_encrypted;
  delete row.credentials_iv;
  delete row.credentials_tag;
  return NextResponse.json({ connection: { ...row, credential_preview: masked } });
}

// PATCH: update config, notes, billing_status (e.g. move from
// 'delay_trial' to 'trial_active' once the first paying client signs),
// or rotate the encrypted credential.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const {
    display_name,
    billing_status,
    monthly_cost_cents,
    trial_length_days,
    signup_url,
    notes,
    config_json,
    status,
    api_key,
  } = body;

  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const push = (col: string, val: any) => {
    sets.push(`${col} = $${idx}`);
    values.push(val);
    idx++;
  };

  if (display_name !== undefined) push("display_name", display_name);
  if (billing_status !== undefined) push("billing_status", billing_status);
  if (monthly_cost_cents !== undefined) push("monthly_cost_cents", monthly_cost_cents);
  if (trial_length_days !== undefined) push("trial_length_days", trial_length_days);
  if (signup_url !== undefined) push("signup_url", signup_url);
  if (notes !== undefined) push("notes", notes);
  if (config_json !== undefined) push("config_json", config_json);
  if (status !== undefined) push("status", status);

  if (api_key) {
    const enc = encryptSecret(api_key);
    push("credentials_encrypted", enc.ciphertext);
    push("credentials_iv", enc.iv);
    push("credentials_tag", enc.tag);
    push("status", "configured");
  }

  if (sets.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  push("updated_at", new Date());
  values.push(id);

  const { rows } = await query(
    `update integration_connections set ${sets.join(", ")} where id = $${idx} returning id, category, provider, display_name, status, billing_status`,
    values
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ connection: rows[0] });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await query(`delete from integration_connections where id = $1`, [id]);
  return NextResponse.json({ ok: true });
}
