import { NextResponse } from "next/server";
import { Resend } from "resend";
import { query } from "@/lib/db";
import {
  validateLandReviewRequest,
  normalizeLandReviewRequest,
} from "@/lib/land-review/validation";
import { LAND_REVIEW_EVENTS, recordServerEvent } from "@/lib/land-review/analytics";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import type { LandReviewRequest } from "@/lib/land-review/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.LAND_REVIEW_TO || "ov@livingry.services";
const FROM =
  process.env.LAND_REVIEW_FROM || "Livingry Services <noreply@livingry.services>";

// Best-effort tenant resolution — reuse pattern from system-review
function getTenantId(): string {
  return process.env.DEFAULT_TENANT_ID || "00000000-0000-0000-0000-000000000000";
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true; // Allow if headers missing (curl/test)
  return origin.includes(host);
}

async function sendNotification(
  request: LandReviewRequest,
  recordId: string,
): Promise<{ ok: boolean; note?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[land-review] RESEND_API_KEY not set, skipping email notification");
    return { ok: false, note: "no-api-key" };
  }

  const html = `
<p><strong>New Land Potential Review Request</strong></p>
<p><strong>ID:</strong> ${recordId}</p>
<p><strong>Name:</strong> ${request.name}</p>
<p><strong>Email:</strong> ${request.email}</p>
<p><strong>Relationship:</strong> ${request.relationshipToProperty}</p>
<p><strong>Property Location:</strong> ${request.propertyLocation}</p>
<p><strong>Acreage Estimate:</strong> ${request.acreageEstimate || "Not provided"}</p>
<p><strong>Site Control:</strong> ${request.siteControlStatus}</p>
<p><strong>Vision:</strong></p>
<p style="white-space: pre-wrap; border-left: 3px solid #ccc; padding-left: 12px;">${request.vision}</p>
<p><strong>Preferred Next Step:</strong> ${request.preferredNextStep}</p>
${request.parcelId ? `<p><strong>Parcel ID:</strong> ${request.parcelId}</p>` : ""}
${request.existingSurveyUrl ? `<p><strong>Existing Survey URL:</strong> <a href="${request.existingSurveyUrl}">${request.existingSurveyUrl}</a></p>` : ""}
${request.existingImprovements ? `<p><strong>Existing Improvements:</strong> ${request.existingImprovements}</p>` : ""}
${request.intendedTimeline ? `<p><strong>Intended Timeline:</strong> ${request.intendedTimeline}</p>` : ""}
${request.predevelopmentBudgetRange ? `<p><strong>Predevelopment Budget Range:</strong> ${request.predevelopmentBudgetRange}</p>` : ""}
${request.referralSource ? `<p><strong>Referral Source:</strong> ${request.referralSource}</p>` : ""}
`.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: request.email,
      subject: `Land Potential Review · ${request.propertyLocation}`,
      html,
    });
    if (error) throw new Error(error.message || "Resend error");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      note: err instanceof Error ? err.message : "resend-error",
    };
  }
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const rl = rateLimit(`land-review:${clientKey(req)}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — a filled hidden field means a bot
  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const input: Partial<LandReviewRequest> = {
    name: str(body.name),
    email: str(body.email),
    relationshipToProperty: str(body.relationshipToProperty) as LandReviewRequest["relationshipToProperty"],
    propertyLocation: str(body.propertyLocation),
    acreageEstimate: typeof body.acreageEstimate === "number" ? body.acreageEstimate : undefined,
    siteControlStatus: str(body.siteControlStatus) as LandReviewRequest["siteControlStatus"],
    vision: str(body.vision),
    preferredNextStep: str(body.preferredNextStep) as LandReviewRequest["preferredNextStep"],
    parcelId: str(body.parcelId),
    existingSurveyUrl: str(body.existingSurveyUrl),
    existingImprovements: str(body.existingImprovements),
    intendedTimeline: str(body.intendedTimeline),
    predevelopmentBudgetRange: str(body.predevelopmentBudgetRange),
    referralSource: str(body.referralSource),
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1",
  };

  const validation = validateLandReviewRequest(input);
  if (!validation.ok) {
    recordServerEvent(LAND_REVIEW_EVENTS.formError, {
      fields: Object.keys(validation.errors).length,
    });
    return NextResponse.json(
      { error: "Validation failed", fields: validation.errors },
      { status: 422 },
    );
  }

  const normalized = normalizeLandReviewRequest(input as LandReviewRequest);
  const tenantId = getTenantId();

  try {
    const result = await query<{ id: string }>(
      `insert into land_potential_review_requests
        (tenant_id, name, email, relationship_to_property, property_location,
         acreage_estimate, site_control_status, vision, preferred_next_step,
         parcel_id, existing_survey_url, existing_improvements, intended_timeline,
         predevelopment_budget_range, referral_source,
         consent_recorded_at, consent_version, status)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       returning id`,
      [
        tenantId,
        normalized.name,
        normalized.email,
        normalized.relationshipToProperty,
        normalized.propertyLocation,
        normalized.acreageEstimate || null,
        normalized.siteControlStatus,
        normalized.vision,
        normalized.preferredNextStep,
        normalized.parcelId || null,
        normalized.existingSurveyUrl || null,
        normalized.existingImprovements || null,
        normalized.intendedTimeline || null,
        normalized.predevelopmentBudgetRange || null,
        normalized.referralSource || null,
        normalized.consentRecordedAt,
        normalized.consentVersion,
        "new_land_inquiry",
      ],
    );

    const recordId = result.rows[0]?.id;
    if (!recordId) throw new Error("No ID returned from insert");

    // Send notification and record analytics in parallel
    const [emailResult] = await Promise.all([
      sendNotification(normalized, recordId),
      Promise.resolve(recordServerEvent(LAND_REVIEW_EVENTS.formSuccess, {})),
    ]);

    console.log(
      "[land-review]",
      JSON.stringify({
        id: recordId,
        email: normalized.email,
        propertyLocation: normalized.propertyLocation,
        emailSent: emailResult.ok,
      }),
    );

    return NextResponse.json({ ok: true, id: recordId });
  } catch (err) {
    console.error("[land-review] pipeline error", err instanceof Error ? err.message : err);
    recordServerEvent(LAND_REVIEW_EVENTS.formFailure, {});
    return NextResponse.json(
      { error: "We could not process your request. Please email ov@livingry.services." },
      { status: 500 },
    );
  }
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}
