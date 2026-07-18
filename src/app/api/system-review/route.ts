import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.SYSTEM_REVIEW_TO || "ov@openagents.com";
const FROM = process.env.SYSTEM_REVIEW_FROM || "Livingry Services <noreply@livingry.services>";

function esc(v: unknown) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Basic honeypot / validation
  const email = String(payload.email || "").trim();
  const name = String(payload.name || "").trim();
  const leak = String(payload.leak || "").trim();
  if (!email || !name || !leak) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();

  const rows = Object.entries(payload)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5A6560;font:600 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#0F1512;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("");

  const html = `
  <div style="background:#F6F1E4;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0F1512">
    <div style="max-width:640px;margin:0 auto;background:#FDFBF3;border:1px solid #E4E1D6;border-radius:6px;padding:28px">
      <div style="font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:#8A4E28">Livingry Services · System Review</div>
      <h1 style="font-family:Georgia,serif;font-size:24px;line-height:1.15;margin:12px 0 4px">New System Review request</h1>
      <div style="color:#5A6560;font-size:13px">${esc(receivedAt)}</div>
      <table style="margin-top:20px;border-collapse:collapse;width:100%">${rows}</table>
    </div>
  </div>`.trim();

  const text = Object.entries(payload)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fallback: log to server output so submissions are still captured during preview.
    console.warn("[system-review] RESEND_API_KEY not set; logging submission.");
    console.log("[system-review]", JSON.stringify({ receivedAt, ...payload }, null, 2));
    return NextResponse.json({ ok: true, delivered: false, note: "Logged (no mailer configured)." });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `System Review · ${payload.company || name}`,
      html,
      text,
    });
    if (error) throw new Error(error.message || "Resend error");
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[system-review] send failed", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
