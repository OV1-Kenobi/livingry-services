import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.SYSTEM_REVIEW_TO || "ov@livingry.services";
const FROM =
  process.env.SYSTEM_REVIEW_FROM ||
  "Livingry Services <noreply@livingry.services>";
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || "";
const SHEETS_WEBHOOK_TOKEN = process.env.SHEETS_WEBHOOK_TOKEN || "";

function esc(v: unknown) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Assigns a follow-up campaign tag based on submission content.
 * The tag is written into the sheet + email so a downstream sequencer
 * (Mailerlite, Loops, Customer.io, or a custom sender) can pick the right cadence.
 */
function assignCampaign(payload: Record<string, unknown>) {
  const industry = String(payload.industry || "").toLowerCase();
  const leak = String(payload.leak || "").toLowerCase();

  const industryCampaign: Record<string, string> = {
    hvac: "hvac-active",
    roofing: "roofing-founding-partner",
    legal: "legal-governed-pilot",
    medical: "medical-governed-pilot",
    other: "other-vertical-inquiry",
  };

  // Detect probable system fit from the free-text leak description.
  const signals: string[] = [];
  if (/miss(ed|ing)? call|voicemail|didn.?t answer|ring/i.test(leak))
    signals.push("response-systems");
  if (/estimate|proposal|inspection|quote|bid|follow.?up|cold/i.test(leak))
    signals.push("recovery-systems");
  if (/repeat|maintenance|seasonal|referral|forgot(ten)? customer/i.test(leak))
    signals.push("customer-continuity");
  if (/website|SEO|AI search|chatgpt|perplexity|discovery|trust/i.test(leak))
    signals.push("discovery-and-trust");
  if (/knowledge|training|onboard|SOP|tribal|documentation/i.test(leak))
    signals.push("knowledge-systems");
  if (/handoff|workflow|duplicate|ownership|dispatch|scheduling/i.test(leak))
    signals.push("workflow-systems");

  return {
    industryCampaign: industryCampaign[industry] || "other-vertical-inquiry",
    likelySystems: signals.length ? signals.join(",") : "unclassified",
  };
}

async function postToSheets(row: Record<string, unknown>) {
  if (!SHEETS_WEBHOOK_URL) return { attempted: false, ok: false, note: "no-webhook-configured" };
  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SHEETS_WEBHOOK_TOKEN
          ? { "X-Webhook-Token": SHEETS_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify(row),
      // Apps Script can be slow — 10s is generous.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return { attempted: true, ok: false, note: `sheets-http-${res.status}` };
    }
    return { attempted: true, ok: true };
  } catch (err) {
    return {
      attempted: true,
      ok: false,
      note: err instanceof Error ? err.message : "sheets-error",
    };
  }
}

async function sendEmail(payload: Record<string, unknown>, receivedAt: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { attempted: false, ok: false, note: "no-resend-configured" };

  const rows = Object.entries(payload)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5A6560;font:600 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">${esc(
          k,
        )}</td><td style="padding:6px 0;color:#0F1512;font:400 14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:pre-wrap">${esc(
          v,
        )}</td></tr>`,
    )
    .join("");

  const html = `
  <div style="background:#F6F1E4;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0F1512">
    <div style="max-width:640px;margin:0 auto;background:#FDFBF3;border:1px solid #E4E1D6;border-radius:6px;padding:28px">
      <div style="font:500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.14em;text-transform:uppercase;color:#8A4E28">Livingry Services · Leak Assessment intake</div>
      <h1 style="font-family:Georgia,serif;font-size:24px;line-height:1.15;margin:12px 0 4px">New Leak Assessment request</h1>
      <div style="color:#5A6560;font-size:13px">${esc(receivedAt)}</div>
      <table style="margin-top:20px;border-collapse:collapse;width:100%">${rows}</table>
    </div>
  </div>`.trim();

  const text = Object.entries(payload)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const email = String(payload.email || "");
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined,
      subject: `Leak Assessment · ${payload.company || payload.name || "New request"}`,
      html,
      text,
    });
    if (error) throw new Error(error.message || "Resend error");
    return { attempted: true, ok: true };
  } catch (err) {
    return {
      attempted: true,
      ok: false,
      note: err instanceof Error ? err.message : "resend-error",
    };
  }
}

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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
  const { industryCampaign, likelySystems } = assignCampaign(payload);

  // Everything we want to keep for the follow-up campaign lives in this row.
  const row = {
    receivedAt,
    // Contact
    name,
    email,
    company: payload.company || "",
    website: payload.website || "",
    // Vertical
    industry: payload.industry || "",
    // Vertical-conditional
    crm: payload.crm || "",
    area: payload.area || "",
    practiceArea: payload.practiceArea || "",
    intake: payload.intake || "",
    practiceType: payload.practiceType || "",
    privacy: payload.privacy || "",
    // Core narrative
    leak,
    team: payload.team || "",
    referral: payload.referral || "",
    consent: payload.consent ? "yes" : "no",
    // Routing metadata
    industryCampaign,
    likelySystems,
    // Attribution
    submittedFromUrl: payload.submittedFromUrl || "",
    submittedFromPath: payload.submittedFromPath || "",
    referrer: payload.referrer || "",
    utm_source: payload.utm_source || "",
    utm_medium: payload.utm_medium || "",
    utm_campaign: payload.utm_campaign || "",
    utm_term: payload.utm_term || "",
    utm_content: payload.utm_content || "",
    // Env
    userAgent: payload.userAgent || "",
    language: payload.language || "",
  };

  // Fire sheets + email in parallel. Each is best-effort — a failure of one
  // must not block the response, because the other channel still captures the data.
  const [sheetsResult, emailResult] = await Promise.all([
    postToSheets(row),
    sendEmail(row, receivedAt),
  ]);

  // Structured log so submissions are always recoverable from Vercel function output.
  console.log(
    "[system-review]",
    JSON.stringify({
      receivedAt,
      email: row.email,
      company: row.company,
      industryCampaign,
      likelySystems,
      sheets: sheetsResult,
      emailChannel: emailResult,
    }),
  );

  return NextResponse.json({
    ok: true,
    sheets: sheetsResult.ok,
    email: emailResult.ok,
    industryCampaign,
    likelySystems,
  });
}
