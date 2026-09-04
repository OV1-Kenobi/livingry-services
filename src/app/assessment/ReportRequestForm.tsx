"use client";

import { useState } from "react";
import type { AssessmentResult } from "@/lib/assessment/scoring";

// Voluntary post-result opt-in for the written Leak Priority Report.
//
// Shown ONLY after the visitor sees their diagnostic score and results —
// never as a gate before them. Email is required (it is how the report is
// sent); name, phone, and company website are optional. Consent is explicit.
// Mirrors the funnel protections of the Founding Five scorecard (honeypot,
// server-side validation, no PII in logs).

interface ReportRequestFormProps {
  result: AssessmentResult;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; email: string }
  | { kind: "error"; message: string; fields?: Record<string, string> };

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--rule)",
  borderRadius: "6px",
  padding: "0.7rem 0.9rem",
  fontSize: "1rem",
  width: "100%",
  background: "var(--paper)",
  color: "var(--ink)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.35rem",
  fontSize: "0.95rem",
  color: "var(--ink)",
};

const hintStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "var(--ink-3)",
  marginTop: "0.25rem",
};

export function ReportRequestForm({ result }: ReportRequestFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/leak-report-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          companyWebsite,
          consent,
          honeypot,
          score: result.score,
          bandId: result.band?.id,
          bandLabel: result.band?.label,
          focusCategoryId: result.lowestCategory?.id,
          focusCategoryTitle: result.lowestCategory?.title,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const message =
          typeof data.error === "string" && data.error
            ? data.error
            : "Something went wrong sending your request. Please try again.";
        setStatus({
          kind: "error",
          message,
          fields: typeof data.fields === "object" && data.fields !== null ? data.fields : undefined,
        });
        return;
      }
      setStatus({ kind: "done", email: email.trim() });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error sending your request. Please check your connection and try again.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="card mt-8" role="status">
        <div className="rule-label">Report requested</div>
        <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>
          Your Leak Priority Report is on its way to {status.email}.
        </h3>
        <p className="mt-3" style={{ color: "var(--ink-2)" }}>
          It covers your likely priority leak, why it ranked first, the inputs and assumptions
          behind it, and one immediate check you can run today — plus a personal interpretation
          from Michael.
        </p>
      </div>
    );
  }

  const fieldError = (key: string) =>
    status.kind === "error" && status.fields?.[key] ? (
      <p className="mt-1 text-[0.85rem]" role="alert" style={{ color: "#b23b3b" }}>
        {status.fields[key]}
      </p>
    ) : null;

  return (
    <div className="card mt-8" id="leak-priority-report">
      <div className="rule-label">Written report — voluntary</div>
      <h3 className="serif mt-2" style={{ fontSize: "var(--step-1)" }}>
        Get Your Leak Priority Report
      </h3>
      <p className="mt-3" style={{ color: "var(--ink-2)" }}>
        Your diagnostic results are shown above. If you want a written copy — your likely
        priority leak, why it ranks first, the inputs and assumptions behind it, and one
        immediate check you can run today — leave your email and we will send it to you.
      </p>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate={false}>
        <div>
          <label htmlFor="lpr-email" style={labelStyle}>
            Email address (required)
          </label>
          <input
            id="lpr-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@company.com"
          />
          <p style={hintStyle}>We need your email to send the report. Nothing else is required.</p>
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="lpr-name" style={labelStyle}>
            Name (optional)
          </label>
          <input
            id="lpr-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Your name"
          />
          <p style={hintStyle}>Helps us personalize the report. Not required.</p>
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="lpr-phone" style={labelStyle}>
            Phone number (optional)
          </label>
          <input
            id="lpr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
            placeholder="(555) 123-4567"
          />
          <p style={hintStyle}>Only if you want a call about the results. Not required.</p>
          {fieldError("phone")}
        </div>

        <div>
          <label htmlFor="lpr-website" style={labelStyle}>
            Business website URL (optional)
          </label>
          <input
            id="lpr-website"
            name="website"
            type="text"
            autoComplete="url"
            inputMode="url"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            style={inputStyle}
            placeholder="company.com"
          />
          <p style={hintStyle}>
            Helps us look at your public-facing presence before a Leak Assessment call. Not required.
          </p>
          {fieldError("companyWebsite")}
        </div>

        {/* Honeypot — invisible to humans; a filled value means a bot. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="lpr-company">
            Company
            <input
              id="lpr-company"
              name="company"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="flex items-start gap-3" style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
              required
            />
            <span style={{ color: "var(--ink-2)", fontSize: "0.92rem" }}>
              I agree to receive the Leak Priority Report by email. I understand Livingry Services
              will not send me anything else without my consent.
            </span>
          </label>
          {fieldError("consent")}
        </div>

        <div>
          <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Sending…" : "Send Me My Report"}
            <span aria-hidden>→</span>
          </button>
          {status.kind === "error" && !status.fields && (
            <p className="mt-3 text-[0.9rem]" role="alert" style={{ color: "#b23b3b" }}>
              {status.message}
            </p>
          )}
        </div>

        <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
          <strong style={{ color: "var(--ink-2)" }}>What happens with your answers:</strong> Your
          diagnostic answers stay in your browser. They are not transmitted to us. The only
          information sent is your email address, any optional fields you choose to provide, your
          overall score and band, and your top-leak category (the category that scored lowest). We use
          this to send you the
          Leak Priority Report and nothing else.
        </p>
      </form>
    </div>
  );
}
