"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { consent, finalCta, hero, successState } from "@/lib/hvac-founding-five/content";
import { HVAC_EVENTS, trackClientEvent } from "@/lib/hvac-founding-five/analytics";
import {
  type FieldKey,
  validateSubmission,
} from "@/lib/hvac-founding-five/validation";
import type { SubmissionInput } from "@/lib/hvac-founding-five/types";

type Values = {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  companyWebsite: string;
  role: string;
  workflowProblem: string;
  consent: boolean;
};

const EMPTY: Values = {
  fullName: "",
  companyName: "",
  workEmail: "",
  phone: "",
  companyWebsite: "",
  role: "",
  workflowProblem: "",
  consent: false,
};

const FIELDS: { key: FieldKey; label: string; type?: string; autoComplete?: string; textarea?: boolean }[] = [
  { key: "fullName", label: "Full name", autoComplete: "name" },
  { key: "companyName", label: "Company name", autoComplete: "organization" },
  { key: "workEmail", label: "Work email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "companyWebsite", label: "Company website", type: "text", autoComplete: "url" },
  { key: "role", label: "Role", autoComplete: "organization-title" },
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function FoundingFiveForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [started, setStarted] = useState(false);
  const [meta, setMeta] = useState<Record<string, string>>({});
  const honeypotRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Capture non-sensitive attribution metadata once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const m: Record<string, string> = {
      landing_url: `${url.origin}${url.pathname}`,
      referrer: document.referrer || "",
      first_touch_at: new Date().toISOString(),
    };
    UTM_KEYS.forEach((k) => {
      const v = url.searchParams.get(k);
      if (v) m[k] = v;
    });
    setMeta(m);
  }, []);

  const errorList = useMemo(
    () => FIELDS.map((f) => f.key).concat("workflowProblem", "consent").filter((k) => errors[k as FieldKey]),
    [errors],
  ) as FieldKey[];

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (!started) {
      setStarted(true);
      trackClientEvent(HVAC_EVENTS.formStart);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackClientEvent(HVAC_EVENTS.formSubmit);

    const result = validateSubmission(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      trackClientEvent(HVAC_EVENTS.formError, { fields: Object.keys(result.errors).length });
      // Move focus to the error summary for screen-reader users.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");
    setServerError("");

    const payload: SubmissionInput = {
      ...values,
      honeypot: honeypotRef.current?.value || "",
      formName: "hvac_founding_five_review",
      consentTextVersion: consent.version,
      utmSource: meta.utm_source,
      utmMedium: meta.utm_medium,
      utmCampaign: meta.utm_campaign,
      utmContent: meta.utm_content,
      utmTerm: meta.utm_term,
      referrer: meta.referrer,
      landingUrl: meta.landing_url,
      firstTouchAt: meta.first_touch_at,
    };

    try {
      const res = await fetch("/api/hvac-founding-five", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 422) {
        const b = await res.json().catch(() => ({}));
        setErrors(b.fields || {});
        setStatus("idle");
        trackClientEvent(HVAC_EVENTS.formError, { fields: Object.keys(b.fields || {}).length });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
      trackClientEvent(HVAC_EVENTS.formSuccess);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Unknown error");
      trackClientEvent(HVAC_EVENTS.formFailure);
    }
  }

  if (status === "sent") {
    return (
      <div className="card" role="status" aria-live="polite">
        <div className="eyebrow">Received</div>
        <h2 className="serif mt-3" style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}>
          {successState.heading}
        </h2>
        <p className="mt-4" style={{ color: "var(--ink-2)" }}>{successState.body}</p>
        <p className="mt-6 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
          Questions in the meantime? Email{" "}
          <a
            href="mailto:ov@livingry.services"
            className="link"
            style={{ color: "var(--forest)" }}
            data-analytics="hvac-email"
            onClick={() => trackClientEvent(HVAC_EVENTS.emailClick)}
          >
            ov@livingry.services
          </a>
          .
        </p>
      </div>
    );
  }

  const describedBy = (key: FieldKey) => (errors[key] ? `${key}-error` : undefined);

  return (
    <form onSubmit={onSubmit} className="card ff-form grid gap-5" aria-label="Founding Five private workflow review request" noValidate>
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="ff-error-summary"
          aria-label="There is a problem with your submission"
        >
          <strong>Please fix the following:</strong>
          <ul className="mt-2 grid gap-1">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${k}`} style={{ color: "inherit", textDecoration: "underline" }}>
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {FIELDS.map((f) => (
          <div key={f.key} className={f.key === "workEmail" || f.key === "companyWebsite" ? "" : ""}>
            <label htmlFor={f.key}>{f.label}</label>
            <input
              id={f.key}
              name={f.key}
              type={f.type || "text"}
              autoComplete={f.autoComplete}
              value={values[f.key] as string}
              onChange={(e) => update(f.key as keyof Values, e.target.value as never)}
              aria-invalid={errors[f.key] ? true : undefined}
              aria-describedby={describedBy(f.key)}
            />
            {errors[f.key] && (
              <p id={`${f.key}-error`} className="ff-inline-error">{errors[f.key]}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="workflowProblem">
          Which repeated workflow currently causes the most frustration or lost follow-through?
        </label>
        <textarea
          id="workflowProblem"
          name="workflowProblem"
          rows={5}
          value={values.workflowProblem}
          onChange={(e) => update("workflowProblem", e.target.value)}
          aria-invalid={errors.workflowProblem ? true : undefined}
          aria-describedby={describedBy("workflowProblem")}
        />
        {errors.workflowProblem && (
          <p id="workflowProblem-error" className="ff-inline-error">{errors.workflowProblem}</p>
        )}
      </div>

      {/* Honeypot — hidden from humans, visible to naive bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website_url_hp">Website URL (leave blank)</label>
        <input id="website_url_hp" name="website_url_hp" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="consent" className="ff-consent" style={{ color: "var(--ink-2)" }}>
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy("consent")}
            style={{ width: "auto" }}
          />
          <span>
            {consent.text}{" "}
            <a href="/privacy" className="link" style={{ color: "var(--forest)" }}>
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="ff-inline-error">{errors.consent}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"} data-analytics="hvac-form-submit">
          {status === "submitting" ? "Sending…" : finalCta.cta}
          <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p className="text-[0.9rem]" style={{ color: "var(--copper-2)" }} role="alert">
            {serverError} You can also email{" "}
            <a href="mailto:ov@livingry.services" className="link" style={{ color: "var(--forest)" }}>
              ov@livingry.services
            </a>
            .
          </p>
        )}
      </div>
      <p className="text-[0.85rem]" style={{ color: "var(--ink-3)" }}>{hero.noCalendarNote}</p>
    </form>
  );
}
