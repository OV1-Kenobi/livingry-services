// Land Potential Review validation — mirrors HVAC Founding Five validation pattern

import type { LandReviewRequest } from "./types";

// Email validation regex matches HVAC FF pattern
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = keyof LandReviewRequest;

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<FieldKey, string>>;
}

function len(s: unknown): number {
  return String(s ?? "").trim().length;
}

export function normalizeEmail(raw: string): string {
  return String(raw ?? "")
    .trim()
    .toLowerCase();
}

export function validateLandReviewRequest(
  input: Partial<LandReviewRequest>,
): ValidationResult {
  const errors: Partial<Record<FieldKey, string>> = {};

  // Required fields
  if (len(input.name) < 2 || len(input.name) > 100) {
    errors.name = "Enter your full name (2–100 characters).";
  }

  if (!EMAIL_RE.test(normalizeEmail(String(input.email ?? "")))) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.relationshipToProperty) {
    errors.relationshipToProperty = "Select your relationship to the property.";
  }

  if (len(input.propertyLocation) < 5 || len(input.propertyLocation) > 200) {
    errors.propertyLocation =
      "Enter the property location (city/county or address, 5–200 characters).";
  }

  if (!input.siteControlStatus) {
    errors.siteControlStatus = "Select your site control status.";
  }

  const visionLen = len(input.vision);
  if (visionLen < 20 || visionLen > 2000) {
    errors.vision =
      "Describe your vision in 20–2,000 characters so we understand what you want to explore.";
  }

  if (!input.preferredNextStep) {
    errors.preferredNextStep = "Select your preferred next step.";
  }

  // Optional numeric validation
  if (
    input.acreageEstimate !== undefined &&
    input.acreageEstimate !== null &&
    (isNaN(Number(input.acreageEstimate)) || Number(input.acreageEstimate) < 0)
  ) {
    errors.acreageEstimate = "Enter a valid acreage (number, zero or greater).";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function normalizeLandReviewRequest(
  input: LandReviewRequest,
): LandReviewRequest {
  return {
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    relationshipToProperty: input.relationshipToProperty,
    propertyLocation: input.propertyLocation.trim(),
    acreageEstimate: input.acreageEstimate,
    siteControlStatus: input.siteControlStatus,
    vision: input.vision.trim(),
    preferredNextStep: input.preferredNextStep,
    parcelId: input.parcelId?.trim(),
    existingSurveyUrl: input.existingSurveyUrl?.trim(),
    existingImprovements: input.existingImprovements?.trim(),
    intendedTimeline: input.intendedTimeline?.trim(),
    predevelopmentBudgetRange: input.predevelopmentBudgetRange?.trim(),
    referralSource: input.referralSource?.trim(),
    consentRecordedAt: input.consentRecordedAt,
    consentVersion: input.consentVersion,
  };
}
