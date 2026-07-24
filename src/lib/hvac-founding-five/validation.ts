// Pure, isomorphic validation + normalization for the Founding Five form.
// Shared by the client form and the server endpoint so the two never drift.

import { consent as consentCopy } from "./content";
import type { NormalizedSubmission, SubmissionInput } from "./types";

export type FieldKey =
  | "fullName"
  | "companyName"
  | "workEmail"
  | "phone"
  | "companyWebsite"
  | "role"
  | "workflowProblem"
  | "consent";

export type ValidationResult = {
  ok: boolean;
  errors: Partial<Record<FieldKey, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return String(raw ?? "").trim().toLowerCase();
}

// Permit common U.S. formatting variants; keep a leading + for country code.
export function normalizePhone(raw: string): string {
  const s = String(raw ?? "").trim();
  const hasPlus = s.startsWith("+");
  const digits = s.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

export function isValidPhone(raw: string): boolean {
  const digits = normalizePhone(raw).replace(/^\+/, "");
  // 10 digits (US) or 11 with leading country code.
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

// Normalize a URL, allowing omission of the scheme.
export function normalizeUrl(raw: string): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    return u.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function extractDomain(rawUrlOrEmail: string): string {
  const s = String(rawUrlOrEmail ?? "").trim().toLowerCase();
  if (!s) return "";
  if (s.includes("@") && !s.includes("/")) {
    return s.split("@")[1] ?? "";
  }
  const url = normalizeUrl(s);
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function len(v: unknown): number {
  return String(v ?? "").trim().length;
}

export function validateSubmission(input: Partial<SubmissionInput>): ValidationResult {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (len(input.fullName) < 2 || len(input.fullName) > 100) {
    errors.fullName = "Enter your full name (2–100 characters).";
  }
  if (len(input.companyName) < 2 || len(input.companyName) > 150) {
    errors.companyName = "Enter your company name (2–150 characters).";
  }
  if (!EMAIL_RE.test(normalizeEmail(String(input.workEmail ?? "")))) {
    errors.workEmail = "Enter a valid work email address.";
  }
  if (!isValidPhone(String(input.phone ?? ""))) {
    errors.phone = "Enter a valid U.S. phone number.";
  }
  if (!input.companyWebsite || !normalizeUrl(String(input.companyWebsite))) {
    errors.companyWebsite = "Enter your company website (a domain is fine).";
  }
  if (len(input.role) < 2 || len(input.role) > 100) {
    errors.role = "Enter your role (2–100 characters).";
  }
  const problemLen = len(input.workflowProblem);
  if (problemLen < 20 || problemLen > 2000) {
    errors.workflowProblem =
      "Describe the workflow in 20–2,000 characters so we can research it.";
  }
  if (!input.consent) {
    errors.consent = "Please confirm we may contact you about this request.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

// Produce the normalized, server-trusted record. Assumes validation passed.
export function normalizeSubmission(input: SubmissionInput): NormalizedSubmission {
  const emailNormalized = normalizeEmail(input.workEmail);
  const companyWebsite = normalizeUrl(input.companyWebsite);
  // Prefer the website domain; fall back to the email domain.
  const companyDomain =
    extractDomain(input.companyWebsite) || extractDomain(input.workEmail);

  // Only non-sensitive attribution metadata is retained here.
  const metadata: Record<string, string> = {};
  const meta: [string, string | undefined][] = [
    ["form_name", input.formName || "hvac_founding_five_review"],
    ["utm_source", input.utmSource],
    ["utm_medium", input.utmMedium],
    ["utm_campaign", input.utmCampaign],
    ["utm_content", input.utmContent],
    ["utm_term", input.utmTerm],
    ["referrer", input.referrer],
    ["landing_url", input.landingUrl],
    ["first_touch_at", input.firstTouchAt],
    ["analytics_session_id", input.analyticsSessionId],
  ];
  for (const [k, v] of meta) {
    if (v && String(v).trim()) metadata[k] = String(v).trim();
  }

  return {
    fullName: input.fullName.trim(),
    companyName: input.companyName.trim(),
    workEmail: input.workEmail.trim(),
    emailNormalized,
    phone: normalizePhone(input.phone),
    companyWebsite,
    companyDomain,
    role: input.role.trim(),
    workflowProblem: input.workflowProblem.trim(),
    consent: Boolean(input.consent),
    consentTextVersion: input.consentTextVersion || consentCopy.version,
    dedupeKey: `${emailNormalized}::${companyDomain}`,
    metadata,
  };
}
