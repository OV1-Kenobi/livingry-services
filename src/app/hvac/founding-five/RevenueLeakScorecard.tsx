"use client";

import { useState, useRef, useEffect } from "react";
import { SCORECARD_VERSION, scorecardIntro, scorecardSubmit, scorecardConfirmation, type ScorecardField } from "@/lib/hvac-founding-five/scorecard";
import { consent as consentCopy } from "@/lib/hvac-founding-five/content";
import { trackClientEvent, HVAC_EVENTS } from "@/lib/hvac-founding-five/analytics";

// The Founding Five Scorecard — the single intake for the Founding Five
// Strategic Alliance. Submissions go straight to the Founding Five pipeline
// (/api/hvac-founding-five → 12-state store, owner alert, applicant ack).
// There is no public calendar: every scorecard is human-reviewed before any
// fit conversation is offered.

type Values = Record<string, string | string[]>;

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
  field: ScorecardField;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  switch (field.kind) {
    case "text":
    case "email":
    case "tel":
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
  }
}

export function RevenueLeakScorecard() {
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted && confirmationRef.current) {
      confirmationRef.current.focus();
    }
  }, [submitted]);

  const missing = (() => {
    const out: string[] = [];
    for (const section of scorecardIntro.sections) {
      for (const field of section.fields) {
        if (!field.required) continue;
        const v = values[field.id];
        if (field.kind === "rank") {
          if (!Array.isArray(v) || v.length < field.pick) out.push(field.label);
        } else if (typeof v !== "string" || v.trim() === "") {
          out.push(field.label);
        }
      }
    }
    return out;
  })();

  function set(id: string) {
    return (v: string | string[]) => setValues((prev) => ({ ...prev, [id]: v }));
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
    trackClientEvent(HVAC_EVENTS.formSubmit);

    try {
      const res = await fetch("/api/hvac-founding-five", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          consent,
          consentTextVersion: consentCopy.version,
          honeypot, // bots fill hidden fields; humans submit this empty
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      if (res.status === 422) {
        const first = data.fields ? Object.values(data.fields)[0] : null;
        setError(first ? `Please review your answers: ${first}.` : "Please review your answers and try again.");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "We could not submit your scorecard. Please try again or email ov@livingry.services.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error — your scorecard was not submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status">
        <h3 ref={confirmationRef} tabIndex={-1} className="serif" style={{ fontSize: "1.5rem" }}>{scorecardConfirmation.heading}</h3>
        <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{scorecardConfirmation.body}</p>
        <p className="mt-4" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{scorecardConfirmation.nextStep}</p>
        <p className="mt-6" style={{ color: "var(--ink-3)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
          {scorecardConfirmation.whileYouWait}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="card" style={{ background: "var(--paper-2)", borderLeft: "3px solid var(--copper)" }}>
        <p style={{ color: "var(--ink)", lineHeight: 1.7 }}>{scorecardIntro.leadIn}</p>
        <p className="mt-3" style={{ color: "var(--ink-2)", lineHeight: 1.7 }}>{scorecardIntro.reviewNote}</p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {scorecardIntro.timeNote}
        </p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.8125rem", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--ink-2)" }}>Privacy:</strong> {scorecardIntro.privacyNote}
        </p>
      </div>

      {scorecardIntro.sections.map((section) => (
        <section key={section.n} className="mt-10" aria-labelledby={`sc-s${section.n}`}>
          <div className="rule-label" style={{ color: "var(--copper)" }}>
            {String(section.n).padStart(2, "0")} · {section.title}
          </div>
          <h3 id={`sc-s${section.n}`} className="serif mt-3" style={{ fontSize: "1.25rem", lineHeight: 1.4 }}>
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
          <span>{scorecardSubmit.consentText}</span>
        </label>

        {error && (
          <p role="alert" className="mt-4" style={{ color: "var(--seal)", fontSize: "0.9375rem" }}>
            {error}
          </p>
        )}

        <p className="mt-6">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting…" : scorecardSubmit.button} <span aria-hidden>→</span>
          </button>
        </p>
        <p className="mt-3" style={{ color: "var(--ink-3)", fontSize: "0.8125rem", lineHeight: 1.6 }}>
          {scorecardSubmit.microcopy}
        </p>
        <p className="mt-2" style={{ color: "var(--ink-3)", fontSize: "0.75rem" }}>
          Scorecard version {SCORECARD_VERSION} · Consent version {consentCopy.version}
        </p>
      </div>
    </form>
  );
}