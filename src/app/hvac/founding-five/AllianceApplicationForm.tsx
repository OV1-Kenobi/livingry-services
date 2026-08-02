"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ALLIANCE_REVIEW_CALENDAR_URL } from "@/lib/site";
import {
  APPLICATION_VERSION,
  applicationIntro,
  applicationSections,
  applicationSubmit,
  applicationConfirmation,
  type ApplicationField,
} from "@/lib/hvac-founding-five/application";
import { trackClientEvent } from "@/lib/hvac-founding-five/analytics";

// Renders the Strategic Alliance application directly from the content model
// (src/lib/hvac-founding-five/application.ts). Submissions are validated
// client-side; the intake endpoint wires to the Google Sheet when the Gmail/
// Calendar connector is connected. Until then the confirmation still grants
// the review-calendar link and instructs the applicant to expect follow-up.

type Values = Record<string, string | string[] | Record<string, string>>;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.875rem",
  border: "1px solid var(--rule)",
  borderRadius: "2px",
  background: "var(--paper)",
  color: "var(--ink)",
  fontSize: "1rem",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  marginBottom: "0.375rem",
};

function Field({ field, value, onChange }: {
  field: ApplicationField;
  value: string | string[] | Record<string, string> | undefined;
  onChange: (v: string | string[] | Record<string, string>) => void;
}) {
  switch (field.kind) {
    case "text":
    case "email":
    case "tel":
    case "url":
      return (
        <div>
          <label style={labelStyle} htmlFor={field.id}>
            {field.label}{field.required ? " *" : ""}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.kind === "text" ? "text" : field.kind}
            required={field.required}
            style={inputStyle}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "textarea":
      return (
        <div>
          <label style={labelStyle} htmlFor={field.id}>
            {field.label}{field.required ? " *" : ""}
          </label>
          <textarea
            id={field.id}
            name={field.id}
            required={field.required}
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "select":
      return (
        <div>
          <label style={labelStyle} htmlFor={field.id}>
            {field.label}{field.required ? " *" : ""}
          </label>
          <select
            id={field.id}
            name={field.id}
            required={field.required}
            style={inputStyle}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select…</option>
            {field.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      );
    case "multi": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <fieldset>
          <legend style={{ ...labelStyle, textTransform: "none", letterSpacing: 0, fontSize: "0.9375rem", color: "var(--ink)" }}>
            {field.label}{field.required ? " *" : ""}
          </legend>
          <div className="grid gap-2">
            {field.options.map((o) => (
              <label key={o} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9375rem", color: "var(--ink-2)" }}>
                <input
                  type="checkbox"
                  name={field.id}
                  value={o}
                  checked={selected.includes(o)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selected, o]
                      : selected.filter((x) => x !== o);
                    onChange(next);
                  }}
                  style={{ marginTop: "0.2rem" }}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    case "rank": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <fieldset>
          <legend style={{ ...labelStyle, textTransform: "none", letterSpacing: 0, fontSize: "0.9375rem", color: "var(--ink)" }}>
            {field.label} — pick {field.pick}{field.required ? " *" : ""}
          </legend>
          <div className="grid gap-2">
            {field.options.map((o) => {
              const rankIdx = selected.indexOf(o);
              const atCap = selected.length >= field.pick && rankIdx === -1;
              return (
                <label key={o} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9375rem", color: atCap ? "var(--ink-3)" : "var(--ink-2)" }}>
                  <input
                    type="checkbox"
                    name={field.id}
                    value={o}
                    checked={rankIdx !== -1}
                    disabled={atCap}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...selected, o].slice(0, field.pick)
                        : selected.filter((x) => x !== o);
                      onChange(next);
                    }}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <span>
                    {rankIdx !== -1 && (
                      <strong style={{ color: "var(--copper)", marginRight: "0.375rem" }}>#{rankIdx + 1}</strong>
                    )}
                    {o}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }
    case "grid": {
      const grid = (value && !Array.isArray(value) && typeof value === "object" ? value : {}) as Record<string, string>;
      return (
        <fieldset>
          <legend style={{ ...labelStyle, textTransform: "none", letterSpacing: 0, fontSize: "0.9375rem", color: "var(--ink)" }}>
            {field.label}{field.required ? " *" : ""}
          </legend>
          <div className="grid gap-5">
            {field.rows.map((row) => (
              <div key={row.id}>
                <div style={{ fontSize: "0.875rem", color: "var(--ink)", marginBottom: "0.375rem" }}>{row.label}</div>
                <div className="grid gap-1.5">
                  {row.options.map((o) => (
                    <label key={o} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.875rem", color: "var(--ink-2)" }}>
                      <input
                        type="radio"
                        name={`${field.id}.${row.id}`}
                        value={o}
                        checked={grid[row.id] === o}
                        onChange={() => onChange({ ...grid, [row.id]: o })}
                        style={{ marginTop: "0.2rem" }}
                      />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      );
    }
    case "checkboxes": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <fieldset>
          <legend style={{ ...labelStyle, textTransform: "none", letterSpacing: 0, fontSize: "0.9375rem", color: "var(--ink)" }}>
            {field.label} — all required to proceed *
          </legend>
          <div className="grid gap-3">
            {field.options.map((o) => (
              <label key={o} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9375rem", color: "var(--ink-2)", lineHeight: 1.6 }}>
                <input
                  type="checkbox"
                  name={field.id}
                  value={o}
                  checked={selected.includes(o)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selected, o]
                      : selected.filter((x) => x !== o);
                    onChange(next);
                  }}
                  style={{ marginTop: "0.25rem", flexShrink: 0 }}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
  }
}

export function AllianceApplicationForm() {
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [pendingReview, setPendingReview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted && confirmationRef.current) {
      confirmationRef.current.focus();
    }
  }, [submitted]);

  const missing = useMemo(() => {
    const out: string[] = [];
    for (const section of applicationSections) {
      for (const field of section.fields) {
        if (!field.required) continue;
        const v = values[field.id];
        if (field.kind === "multi" || field.kind === "checkboxes") {
          if (!Array.isArray(v) || v.length === 0) out.push(field.label);
          if (field.kind === "checkboxes" && Array.isArray(v) && v.length < field.options.length) {
            if (!out.includes(field.label)) out.push(field.label);
          }
        } else if (field.kind === "rank") {
          if (!Array.isArray(v) || v.length < field.pick) out.push(field.label);
        } else if (field.kind === "grid") {
          const g = (v ?? {}) as Record<string, string>;
          if (field.rows.some((r) => !g[r.id])) out.push(field.label);
        } else if (typeof v !== "string" || v.trim() === "") {
          out.push(field.label);
        }
      }
    }
    return out;
  }, [values]);

  function set(id: string) {
    return (v: string | string[] | Record<string, string>) =>
      setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (missing.length > 0) {
      setError(`Please complete: ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? ` and ${missing.length - 3} more` : ""}.`);
      return;
    }
    if (!consent) {
      setError("Please confirm the contact consent to submit.");
      return;
    }
    setError(null);
    setSubmitting(true);
    trackClientEvent("hvac_alliance_apply_click");

    try {
      const res = await fetch("/api/hvac-alliance-application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          values,
          consent,
          formVersion: APPLICATION_VERSION,
          consentVersion: applicationSubmit.consentVersion,
          honeypot, // bots fill hidden fields; humans submit this empty
        }),
      });

      if (res.status === 422) {
        const data = (await res.json()) as { fields?: Record<string, string> };
        const first = data.fields ? Object.values(data.fields)[0] : null;
        setError(first ? `Please review your answers: ${first}.` : "Please review your answers and try again.");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "We could not submit your application. Please try again or email ov@openagents.com.");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { applicationId?: string; note?: string };
      setApplicationId(data.applicationId ?? null);
      if (data.note === "received_pending_review") {
        setPendingReview(true);
      }
      setSubmitted(true);
    } catch {
      setError("Network error — your application was not submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    if (pendingReview) {
      return (
        <div role="status">
          <h3 ref={confirmationRef} tabIndex={-1} className="serif" style={{ fontSize: "1.5rem" }}>Application Received</h3>
          {applicationId && (
            <p className="mt-3 eyebrow" style={{ color: "var(--forest)" }}>
              Application ID: {applicationId}
            </p>
          )}
          <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>
            We received your application. Our team will confirm it manually and reply by email.
          </p>
          <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>
            If your application meets the fit criteria, you'll receive instructions for scheduling your Strategic Alliance Review. Please check your email within the next business day.
          </p>
        </div>
      );
    }

    return (
      <div role="status">
        <h3 ref={confirmationRef} tabIndex={-1} className="serif" style={{ fontSize: "1.5rem" }}>{applicationConfirmation.heading}</h3>
        {applicationId && (
          <p className="mt-3 eyebrow" style={{ color: "var(--forest)" }}>
            Application ID: {applicationId}
          </p>
        )}
        <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{applicationConfirmation.body}</p>
        <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{applicationConfirmation.nextStep}</p>
        {applicationId && (
          <div className="mt-8 card" style={{ borderLeft: "3px solid var(--forest)", background: "var(--paper-2)" }}>
            <div className="rule-label" style={{ color: "var(--forest)" }}>Schedule your review</div>
            <p className="mt-3" style={{ color: "var(--ink)", lineHeight: 1.7 }}>
              Qualified applicants book their Strategic Alliance Review directly. If you believe your application
              meets the fit criteria, you may schedule now — your slot is confirmed once the review is accepted.
            </p>
            <p className="mt-4">
              <a
                href={ALLIANCE_REVIEW_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-analytics="hvac-fit-call"
              >
                Book Your Strategic Alliance Review <span aria-hidden>→</span>
              </a>
            </p>
          </div>
        )}
        <p className="mt-6" style={{ color: "var(--ink-3)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
          {applicationConfirmation.whileYouWait}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="card" style={{ background: "var(--paper-2)", borderLeft: "3px solid var(--copper)" }}>
        <p style={{ color: "var(--ink)", lineHeight: 1.7 }}>{applicationIntro.leadIn}</p>
        <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{applicationIntro.termsNote}</p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {applicationIntro.timeNote} {applicationIntro.nextStep}
        </p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.8125rem", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--ink-2)" }}>Privacy:</strong> {applicationIntro.privacyNote}
        </p>
      </div>

      {applicationSections.map((section) => (
        <section key={section.n} className="mt-10" aria-labelledby={`app-s${section.n}`}>
          <div className="rule-label" style={{ color: "var(--copper)" }}>
            {String(section.n).padStart(2, "0")} · {section.title}
          </div>
          <h3 id={`app-s${section.n}`} className="serif mt-3" style={{ fontSize: "1.25rem", lineHeight: 1.4 }}>
            {section.question}
          </h3>
          {section.helper && (
            <p className="mt-2" style={{ color: "var(--ink-3)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {section.helper}
            </p>
          )}
          <div className="mt-5 grid gap-5">
            {section.fields.map((field) => (
              <Field key={field.id} field={field} value={values[field.id]} onChange={set(field.id)} />
            ))}
          </div>
        </section>
      ))}

      <input
        type="text"
        name="company_website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      <div className="mt-10" style={{ borderTop: "1px solid var(--ink)", paddingTop: "1.5rem" }}>
        <label style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9375rem", color: "var(--ink-2)", lineHeight: 1.6 }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ marginTop: "0.25rem", flexShrink: 0 }}
          />
          <span>{applicationSubmit.consentText}</span>
        </label>

        {error && (
          <p role="alert" className="mt-4" style={{ color: "var(--seal)", fontSize: "0.9375rem" }}>
            {error}
          </p>
        )}

        <p className="mt-6">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting…" : applicationSubmit.button} <span aria-hidden>→</span>
          </button>
        </p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.8125rem", lineHeight: 1.6 }}>
          {applicationSubmit.microcopy}
        </p>
        <p className="mt-2" style={{ color: "var(--ink-3)", fontSize: "0.75rem" }}>
          Form version {APPLICATION_VERSION} · Consent version {applicationSubmit.consentVersion}
        </p>
      </div>
    </form>
  );
}
