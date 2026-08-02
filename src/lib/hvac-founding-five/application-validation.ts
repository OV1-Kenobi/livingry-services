// Server-side validation + normalization for the Strategic Alliance
// application. Mirrors the client model (application.ts) so the API can
// enforce the same contract regardless of what the browser sends.

import {
  APPLICATION_VERSION,
  applicationSections,
  applicationSubmit,
  type ApplicationField,
} from "./application";

export type AllianceApplicationInput = {
  values: Record<string, unknown>;
  consent: boolean;
  formVersion: string;
  consentVersion: string;
};

export type NormalizedApplication = {
  applicationId: string;
  submittedAt: string;
  formVersion: string;
  consentVersion: string;
  fields: Record<string, string>;
  // convenience PII columns for the Sheet's leading cells
  fullName: string;
  workEmail: string;
  mobile: string;
  company: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 4000;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 50).filter((x): x is string => typeof x === "string").map((x) => x.trim().slice(0, 500));
}

function validateField(field: ApplicationField, v: unknown): string | null {
  if (!field.required) return null;
  switch (field.kind) {
    case "text":
    case "tel":
    case "url":
    case "textarea":
      return asString(v) ? null : `${field.label} is required`;
    case "email":
      return EMAIL_RE.test(asString(v)) ? null : `${field.label} must be a valid email`;
    case "select":
      return field.options.includes(asString(v)) ? null : `${field.label} is required`;
    case "multi": {
      const multiVals = asStringArray(v);
      if (multiVals.length === 0) return `${field.label} is required`;
      const invalid = multiVals.find((val) => !field.options.includes(val));
      return invalid ? `${field.label} contains invalid selection` : null;
    }
    case "rank": {
      const rankVals = asStringArray(v);
      if (rankVals.length < field.pick) return `${field.label} requires ${field.pick} selections`;
      const uniqueVals = [...new Set(rankVals)];
      if (uniqueVals.length !== rankVals.length) return `${field.label} must have unique selections`;
      const invalid = uniqueVals.find((val) => !field.options.includes(val));
      return invalid ? `${field.label} contains invalid selection` : null;
    }
    case "checkboxes": {
      const checkVals = asStringArray(v);
      const unique = [...new Set(checkVals)];
      const expectedSet = new Set(field.options);
      const submittedSet = new Set(unique);

      // Check for invalid values first
      const hasInvalid = unique.some((val) => !expectedSet.has(val));
      if (hasInvalid) {
        return `${field.label} must exactly match expected options`;
      }

      // Then check completeness
      if (checkVals.length < field.options.length) {
        return `All ${field.label.toLowerCase()} must be acknowledged`;
      }

      // Finally verify exact match
      if (unique.length !== field.options.length ||
          ![...expectedSet].every((opt) => submittedSet.has(opt))) {
        return `${field.label} must exactly match expected options`;
      }
      return null;
    }
    case "grid": {
      const g = (v && typeof v === "object" && !Array.isArray(v) ? v : {}) as Record<string, unknown>;
      const missingRow = field.rows.find((r) => !r.options.includes(asString(g[r.id])));
      return missingRow ? `${missingRow.label} is required` : null;
    }
  }
}

export function validateApplication(input: AllianceApplicationInput):
  | { ok: true; normalized: NormalizedApplication }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const fields: Record<string, string> = {};

  for (const section of applicationSections) {
    for (const field of section.fields) {
      const raw = input.values?.[field.id];
      const err = validateField(field, raw);
      if (err) {
        errors[field.id] = err;
        continue;
      }
      // Normalize to sheet-ready strings.
      if (field.kind === "multi" || field.kind === "checkboxes" || field.kind === "rank") {
        fields[field.id] = asStringArray(raw).join("; ");
      } else if (field.kind === "grid") {
        const g = (raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {}) as Record<string, unknown>;
        fields[field.id] = field.rows
          .map((r) => `${r.label}: ${asString(g[r.id]) || "—"}`)
          .join(" | ");
      } else {
        fields[field.id] = asString(raw);
      }
    }
  }

  if (input.consent !== true) {
    errors.consent = "Contact consent is required";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const submittedAt = new Date().toISOString();
  const applicationId = `LSA-${submittedAt.slice(0, 10).replace(/-/g, "")}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  return {
    ok: true,
    normalized: {
      applicationId,
      submittedAt,
      formVersion: input.formVersion || APPLICATION_VERSION,
      consentVersion: input.consentVersion || applicationSubmit.consentVersion,
      fields,
      fullName: fields.full_name ?? "",
      workEmail: fields.work_email ?? "",
      mobile: fields.mobile ?? "",
      company: fields.company ?? "",
    },
  };
}

// Column order must match the Applications tab header exactly.
export const SHEET_HEADER = [
  "Application ID", "Submission Timestamp", "Full Name", "Role", "Work Email", "Mobile",
  "Company", "Website", "U.S.-Based", "HQ / Markets Served", "Work Types", "Work Types Other",
  "Scale Band", "Visible Leaks (Top 2)", "Leaks Comment", "Systems of Record", "Systems Other",
  "Inbound Volume", "Open Estimates", "Past-Customer History", "Jobs & Paid Invoices",
  "Capacity 60-90d", "Ops Owner 1bd", "Status Hygiene", "Capacity Note",
  "Commitments Acknowledged", "90-Day Outcome", "Consent Version", "Form Version",
  "Score: U.S. Fit", "Score: Leadership", "Score: Volume", "Score: Records", "Score: Capacity",
  "Score: Four-Workflow Fit", "Score: Commercial", "Score: Collaboration", "Total Score",
  "Review Outcome", "Decline Reason / Remediation", "Capacity Slot", "Reviewer Notes",
] as const;

export function toSheetRow(app: NormalizedApplication): string[] {
  const f = app.fields;
  return [
    app.applicationId, app.submittedAt, f.full_name, f.role, f.work_email, f.mobile,
    f.company, f.website, f.us_based, f.markets, f.work_types, f.work_types_other ?? "",
    f.scale, f.visible_leaks, f.leaks_comment ?? "", f.systems, f.systems_other ?? "",
    // record-readiness grid is stored as a combined string; split back to the
    // four readiness columns by row label for reviewer convenience.
    ...((): string[] => {
      const grid = f.record_readiness ?? "";
      const pick = (label: string) => {
        const m = grid.match(new RegExp(`${label}: ([^|]+)`));
        return m ? m[1].trim() : "";
      };
      return [
        pick("Inbound calls/leads"),
        pick("Open estimates"),
        pick("Past-customer history"),
        pick("Completed jobs and paid invoices"),
      ];
    })(),
    f.capacity, f.ops_owner, f.status_hygiene, f.capacity_note ?? "",
    f.commitments, f.ninety_day_outcome, app.consentVersion, app.formVersion,
    // scoring + review columns start blank for the human reviewer.
    "", "", "", "", "", "", "", "", "", "", "", "", "",
  ];
}
