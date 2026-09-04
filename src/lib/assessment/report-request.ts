// Validation for voluntary Leak Priority Report requests.
//
// Pure functions only (no React, no DOM, no I/O) so the API route and the
// unit tests share exactly one definition of "acceptable". Mirrors the
// validation posture of the Founding Five scorecard: strict on the email,
// permissive-but-bounded on optional fields, consent mandatory.
//
// Design constraint (category-templated report, founder decision): only the
// visitor's email, optional fields, and top-leak category travel to the
// server. Individual diagnostic answers never leave the browser.

import { BANDS, MAX_SCORE } from "./controls";

export const REPORT_CONSENT_VERSION = "leak-report-v1";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 254;
const MAX_FIELD_LEN = 200;

export interface ReportRequestInput {
  email: unknown;
  name?: unknown;
  phone?: unknown;
  companyWebsite?: unknown;
  consent?: unknown;
  honeypot?: unknown;
  score?: unknown;
  bandId?: unknown;
  bandLabel?: unknown;
  focusCategoryId?: unknown;
  focusCategoryTitle?: unknown;
}

export interface ValidReportRequest {
  email: string;
  name?: string;
  phone?: string;
  companyWebsite?: string;
  score: number;
  bandId: string;
  bandLabel: string;
  focusCategoryId?: string;
  focusCategoryTitle?: string;
}

export type ValidationResult =
  | { ok: true; value: ValidReportRequest }
  | { ok: false; errors: Record<string, string> };

function cleanString(value: unknown, maxLen: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > maxLen) return undefined;
  // Reject embedded newlines: these values travel into a plain-text email.
  if (/[\r\n]/.test(trimmed)) return undefined;
  return trimmed;
}

export function validateReportRequest(input: ReportRequestInput): ValidationResult {
  const errors: Record<string, string> = {};

  const email = cleanString(input.email, MAX_EMAIL_LEN);
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address so we can send your report.";
  }

  if (input.consent !== true) {
    errors.consent = "Please confirm you agree to receive the report by email.";
  }

  const name = cleanString(input.name, MAX_FIELD_LEN);
  if (typeof input.name === "string" && input.name.trim() && !name) {
    errors.name = "That name looks too long or contains unsupported characters.";
  }
  const phone = cleanString(input.phone, MAX_FIELD_LEN);
  if (typeof input.phone === "string" && input.phone.trim() && !phone) {
    errors.phone = "That phone number looks too long or contains unsupported characters.";
  }
  const companyWebsite = cleanString(input.companyWebsite, MAX_FIELD_LEN);
  if (typeof input.companyWebsite === "string" && input.companyWebsite.trim() && !companyWebsite) {
    errors.companyWebsite = "That website value looks too long or contains unsupported characters.";
  }

  const score = typeof input.score === "number" ? input.score : Number(input.score);
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    errors.score = "The result summary is missing or invalid — please reload the result and try again.";
  }

  const band = BANDS.find((b) => b.id === input.bandId);
  if (!band) {
    errors.band = "The result summary is missing or invalid — please reload the result and try again.";
  } else if (Number.isInteger(score) && (score < band.min || score > band.max)) {
    errors.band = "The score and band do not match — please reload the result and try again.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const value: ValidReportRequest = {
    email: email as string,
    score: score as number,
    bandId: band!.id,
    bandLabel: band!.label,
  };
  if (name) value.name = name;
  if (phone) value.phone = phone;
  if (companyWebsite) value.companyWebsite = companyWebsite;
  const focusId = cleanString(input.focusCategoryId, MAX_FIELD_LEN);
  if (focusId) value.focusCategoryId = focusId;
  const focusTitle = cleanString(input.focusCategoryTitle, MAX_FIELD_LEN);
  if (focusTitle) value.focusCategoryTitle = focusTitle;
  return { ok: true, value };
}

/** One line of plain text describing the carried-over result (for the owner alert). */
export function describeReportContext(value: ValidReportRequest): string {
  const focus = value.focusCategoryTitle ? ` Weakest layer: ${value.focusCategoryTitle}.` : "";
  return `Self-assessment score ${value.score} of ${MAX_SCORE} — ${value.bandLabel}.${focus}`;
}
