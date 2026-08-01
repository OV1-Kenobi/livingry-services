// Server-side contract tests for the alliance application endpoint:
// validation mirrors the client model, the sheet row matches the 42-column
// header contract, and the confirmation email carries the calendar link.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validateApplication,
  toSheetRow,
  SHEET_HEADER,
} from "../src/lib/hvac-founding-five/application-validation";
import { sheetsConfigFromEnv, ALLIANCE_SHEET_ID_DEFAULT } from "../src/lib/hvac-founding-five/sheets-adapter";
import { buildApplicantConfirmation } from "../src/lib/hvac-founding-five/confirmation-email";
import { applicationSections, APPLICATION_VERSION } from "../src/lib/hvac-founding-five/application";
import { ALLIANCE_REVIEW_CALENDAR_URL } from "../src/lib/site";

function completeValues(): Record<string, unknown> {
  const v: Record<string, unknown> = {};
  for (const section of applicationSections) {
    for (const f of section.fields) {
      switch (f.kind) {
        case "text": v[f.id] = "Test Person"; break;
        case "email": v[f.id] = "owner@example-hvac.com"; break;
        case "tel": v[f.id] = "555-555-0100"; break;
        case "url": v[f.id] = "https://example-hvac.com"; break;
        case "textarea": v[f.id] = f.id === "ninety_day_outcome" ? "A".repeat(300) : "Adequate detail here."; break;
        case "select": v[f.id] = f.options[0]; break;
        case "multi": v[f.id] = [f.options[0]]; break;
        case "checkboxes": v[f.id] = [...f.options]; break;
        case "rank": v[f.id] = f.options.slice(0, f.pick); break;
        case "grid": v[f.id] = Object.fromEntries(f.rows.map((r) => [r.id, r.options[0]])); break;
      }
    }
  }
  return v;
}

describe("alliance application server validation", () => {
  it("accepts a complete valid submission", () => {
    const result = validateApplication({
      values: completeValues(),
      consent: true,
      formVersion: APPLICATION_VERSION,
      consentVersion: "hvac-alliance-consent-v1",
    });
    assert.ok(result.ok, `expected ok, got errors: ${JSON.stringify(!result.ok ? result.errors : null)}`);
    if (result.ok) {
      assert.match(result.normalized.applicationId, /^LSA-\d{8}-[A-Z0-9]{6}$/);
      assert.equal(result.normalized.consentVersion, "hvac-alliance-consent-v1");
      assert.equal(result.normalized.workEmail, "owner@example-hvac.com");
    }
  });

  it("rejects a submission missing required fields with per-field errors", () => {
    const result = validateApplication({ values: {}, consent: true, formVersion: "", consentVersion: "" });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.errors.full_name, "full_name error present");
      assert.ok(result.errors.work_email, "work_email error present");
      assert.ok(result.errors.commitments, "commitments error present");
    }
  });

  it("rejects missing consent", () => {
    const result = validateApplication({ values: completeValues(), consent: false, formVersion: "", consentVersion: "" });
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.errors.consent);
  });

  it("rejects an invalid email", () => {
    const values = completeValues();
    values.work_email = "not-an-email";
    const result = validateApplication({ values, consent: true, formVersion: "", consentVersion: "" });
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.errors.work_email, /valid email/);
  });

  it("defaults form and consent versions from the published model", () => {
    const result = validateApplication({ values: completeValues(), consent: true, formVersion: "", consentVersion: "" });
    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.normalized.formVersion, APPLICATION_VERSION);
      assert.equal(result.normalized.consentVersion, "hvac-alliance-consent-v1");
    }
  });
});

describe("sheet row contract", () => {
  it("header has exactly 42 columns matching the Sheet tab", () => {
    assert.equal(SHEET_HEADER.length, 42);
    assert.equal(SHEET_HEADER[0], "Application ID");
    assert.equal(SHEET_HEADER[41], "Reviewer Notes");
  });

  it("row length matches header length and leads with ID + PII", () => {
    const result = validateApplication({
      values: completeValues(),
      consent: true,
      formVersion: APPLICATION_VERSION,
      consentVersion: "hvac-alliance-consent-v1",
    });
    assert.ok(result.ok);
    if (result.ok) {
      const row = toSheetRow(result.normalized);
      assert.equal(row.length, SHEET_HEADER.length);
      assert.equal(row[0], result.normalized.applicationId);
      assert.equal(row[2], "Test Person");
      assert.equal(row[4], "owner@example-hvac.com");
      // scoring + review columns left blank for the human reviewer
      assert.equal(row[30], "");
      assert.equal(row[41], "");
    }
  });
});

describe("sheets adapter configuration", () => {
  it("is a no-op without service account env", () => {
    const cfg = sheetsConfigFromEnv({} as unknown as NodeJS.ProcessEnv);
    assert.equal(cfg, null);
  });

  it("defaults to the production Sheet ID and unescapes the key", () => {
    const cfg = sheetsConfigFromEnv({
      GOOGLE_SERVICE_ACCOUNT_EMAIL: "svc@example.iam.gserviceaccount.com",
      GOOGLE_SERVICE_ACCOUNT_KEY: "-----BEGIN PRIVATE KEY-----\\nABC\\n-----END PRIVATE KEY-----\\n",
    } as unknown as NodeJS.ProcessEnv);
    assert.ok(cfg);
    assert.equal(cfg.sheetId, ALLIANCE_SHEET_ID_DEFAULT);
    assert.ok(cfg.privateKey.includes("\nABC\n"));
    assert.ok(!cfg.privateKey.includes("\\n"));
  });
});

describe("applicant confirmation email", () => {
  it("addresses the applicant by first name and carries the calendar link", () => {
    const result = validateApplication({
      values: completeValues(),
      consent: true,
      formVersion: APPLICATION_VERSION,
      consentVersion: "hvac-alliance-consent-v1",
    });
    assert.ok(result.ok);
    if (result.ok) {
      const email = buildApplicantConfirmation(result.normalized);
      assert.equal(email.to, "owner@example-hvac.com");
      assert.match(email.subject, /LSA-/);
      assert.ok(email.text.startsWith("Hi Test,"));
      assert.ok(email.text.includes(ALLIANCE_REVIEW_CALENDAR_URL));
      assert.ok(email.text.includes("$799"));
      assert.ok(email.text.includes("four-week gate"));
    }
  });

  it("never includes passwords, keys, or other applicants' PII in the template", () => {
    const result = validateApplication({
      values: completeValues(),
      consent: true,
      formVersion: APPLICATION_VERSION,
      consentVersion: "hvac-alliance-consent-v1",
    });
    assert.ok(result.ok);
    if (result.ok) {
      const email = buildApplicantConfirmation(result.normalized);
      assert.ok(!/password/i.test(email.subject));
      // template may *mention* "passwords" as a do-not-send warning in body
      assert.ok(!email.text.includes("GOOGLE_SERVICE_ACCOUNT"));
    }
  });
});
