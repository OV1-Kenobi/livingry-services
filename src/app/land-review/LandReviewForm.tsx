"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { validateLandReviewRequest } from "@/lib/land-review/validation";
import { LAND_REVIEW_EVENTS, trackClientEvent } from "@/lib/land-review/analytics";
import type { LandReviewRequest } from "@/lib/land-review/types";

type FieldKey = keyof LandReviewRequest;

type Values = Omit<LandReviewRequest, "consentRecordedAt" | "consentVersion">;

const EMPTY: Values = {
  name: "",
  email: "",
  relationshipToProperty: "owner",
  propertyLocation: "",
  acreageEstimate: undefined,
  siteControlStatus: "owns_free_clear",
  vision: "",
  preferredNextStep: "land_review",
  parcelId: "",
  existingSurveyUrl: "",
  existingImprovements: "",
  intendedTimeline: "",
  predevelopmentBudgetRange: "",
  referralSource: "",
};

const RELATIONSHIP_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "co_owner", label: "Co-owner" },
  { value: "option_holder", label: "Option holder" },
  { value: "representative", label: "Representative for owner" },
  { value: "other", label: "Other" },
];

const SITE_CONTROL_OPTIONS = [
  { value: "owns_free_clear", label: "Owns free and clear" },
  { value: "owns_with_mortgage", label: "Owns with mortgage" },
  { value: "under_option", label: "Under option" },
  { value: "purchase_pending", label: "Purchase pending" },
  { value: "other", label: "Other" },
];

const NEXT_STEP_OPTIONS = [
  { value: "land_review", label: "Schedule a Land Potential Review" },
  { value: "intro_call", label: "Introductory conversation first" },
  { value: "feasibility", label: "Interested in full Habitat Feasibility Study" },
  { value: "partnership_conversation", label: "Interested in partnership conversation" },
  { value: "no_meeting_yet", label: "Just exploring \u2014 no meeting yet" },
];

export function LandReviewForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [started, setStarted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorList = useMemo(() => {
    return Object.keys(errors) as FieldKey[];
  }, [errors]);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (!started) {
      setStarted(true);
      trackClientEvent(LAND_REVIEW_EVENTS.formStart);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackClientEvent(LAND_REVIEW_EVENTS.formSubmit);

    const payload: LandReviewRequest = {
      ...values,
      consentRecordedAt: new Date().toISOString(),
      consentVersion: "v1",
    };

    const result = validateLandReviewRequest(payload);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      trackClientEvent(LAND_REVIEW_EVENTS.formError, {
        fields: Object.keys(result.errors).length,
      });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerError("");

    const submitPayload = {
      ...payload,
      honeypot: honeypotRef.current?.value || "",
    };

    try {
      const res = await fetch("/api/land-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitPayload),
      });

      if (res.status === 422) {
        const b = await res.json().catch(() => ({}));
        setErrors(b.fields || {});
        setStatus("idle");
        trackClientEvent(LAND_REVIEW_EVENTS.formError, {
          fields: Object.keys(b.fields || {}).length,
        });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || `Request failed (${res.status})`);
      }

      setStatus("sent");
      trackClientEvent(LAND_REVIEW_EVENTS.formSuccess);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card" role="status" aria-live="polite">
        <div className="eyebrow">Received</div>
        <h2 className="serif mt-3" style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}>
          {/* TODO(michael): write confirmation heading */}
        </h2>
        <p className="mt-4" style={{ color: "var(--ink-2)" }}>
          {/* TODO(michael): write confirmation body copy */}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6" noValidate>
      {/* Honeypot field - hidden from real users */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />

      {/* Error summary for accessibility */}
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          className="card"
          style={{ borderLeft: "3px solid var(--copper)" }}
        >
          <p style={{ color: "var(--copper-2)" }}>
            <strong>Please fix the following errors:</strong>
          </p>
          <ul className="mt-2 grid gap-1" style={{ color: "var(--copper-2)" }}>
            {errorList.map((k) => (
              <li key={k}>{errors[k]}</li>
            ))}
          </ul>
        </div>
      )}

      {serverError && (
        <div className="card" role="alert" style={{ borderLeft: "3px solid var(--copper)" }}>
          <p style={{ color: "var(--copper-2)" }}>{serverError}</p>
        </div>
      )}

      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your name <span aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
            required
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="input"
            required
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="relationshipToProperty" className="block text-sm font-medium mb-1">
            Your relationship to the property <span aria-label="required">*</span>
          </label>
          <select
            id="relationshipToProperty"
            value={values.relationshipToProperty}
            onChange={(e) => update("relationshipToProperty", e.target.value as Values["relationshipToProperty"])}
            className="input"
            required
          >
            {RELATIONSHIP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.relationshipToProperty && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.relationshipToProperty}</p>}
        </div>

        <div>
          <label htmlFor="propertyLocation" className="block text-sm font-medium mb-1">
            Property location <span aria-label="required">*</span>
          </label>
          <input
            id="propertyLocation"
            type="text"
            value={values.propertyLocation}
            onChange={(e) => update("propertyLocation", e.target.value)}
            className="input"
            required
            placeholder="City/county or address"
          />
          {errors.propertyLocation && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.propertyLocation}</p>}
        </div>

        <div>
          <label htmlFor="acreageEstimate" className="block text-sm font-medium mb-1">
            Acreage estimate (optional)
          </label>
          <input
            id="acreageEstimate"
            type="number"
            step="0.1"
            min="0"
            value={values.acreageEstimate || ""}
            onChange={(e) => update("acreageEstimate", e.target.value ? Number(e.target.value) : undefined)}
            className="input"
          />
          {errors.acreageEstimate && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.acreageEstimate}</p>}
        </div>

        <div>
          <label htmlFor="siteControlStatus" className="block text-sm font-medium mb-1">
            Site control status <span aria-label="required">*</span>
          </label>
          <select
            id="siteControlStatus"
            value={values.siteControlStatus}
            onChange={(e) => update("siteControlStatus", e.target.value as Values["siteControlStatus"])}
            className="input"
            required
          >
            {SITE_CONTROL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.siteControlStatus && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.siteControlStatus}</p>}
        </div>

        <div>
          <label htmlFor="vision" className="block text-sm font-medium mb-1">
            Describe your vision for the property <span aria-label="required">*</span>
          </label>
          <textarea
            id="vision"
            value={values.vision}
            onChange={(e) => update("vision", e.target.value)}
            className="input"
            rows={6}
            required
            placeholder="What are you exploring? What do you want this land to become?"
          />
          {errors.vision && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.vision}</p>}
        </div>

        <div>
          <label htmlFor="preferredNextStep" className="block text-sm font-medium mb-1">
            Preferred next step <span aria-label="required">*</span>
          </label>
          <select
            id="preferredNextStep"
            value={values.preferredNextStep}
            onChange={(e) => update("preferredNextStep", e.target.value as Values["preferredNextStep"])}
            className="input"
            required
          >
            {NEXT_STEP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.preferredNextStep && <p className="mt-1 text-sm" style={{ color: "var(--copper-2)" }}>{errors.preferredNextStep}</p>}
        </div>

        <details className="card" style={{ background: "var(--paper-2)" }}>
          <summary className="cursor-pointer font-medium">Optional additional information</summary>
          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="parcelId" className="block text-sm font-medium mb-1">
                Parcel ID or APN
              </label>
              <input
                id="parcelId"
                type="text"
                value={values.parcelId}
                onChange={(e) => update("parcelId", e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="existingSurveyUrl" className="block text-sm font-medium mb-1">
                Link to existing survey (if available)
              </label>
              <input
                id="existingSurveyUrl"
                type="url"
                value={values.existingSurveyUrl}
                onChange={(e) => update("existingSurveyUrl", e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="existingImprovements" className="block text-sm font-medium mb-1">
                Existing improvements or structures
              </label>
              <textarea
                id="existingImprovements"
                value={values.existingImprovements}
                onChange={(e) => update("existingImprovements", e.target.value)}
                className="input"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="intendedTimeline" className="block text-sm font-medium mb-1">
                Intended timeline
              </label>
              <input
                id="intendedTimeline"
                type="text"
                value={values.intendedTimeline}
                onChange={(e) => update("intendedTimeline", e.target.value)}
                className="input"
                placeholder="e.g., '2-3 years', 'no rush'"
              />
            </div>

            <div>
              <label htmlFor="predevelopmentBudgetRange" className="block text-sm font-medium mb-1">
                Predevelopment budget range (rough estimate)
              </label>
              <input
                id="predevelopmentBudgetRange"
                type="text"
                value={values.predevelopmentBudgetRange}
                onChange={(e) => update("predevelopmentBudgetRange", e.target.value)}
                className="input"
                placeholder="e.g., '<$50k', '$50k-$150k'"
              />
            </div>

            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium mb-1">
                How did you hear about Livingry Habitats?
              </label>
              <input
                id="referralSource"
                type="text"
                value={values.referralSource}
                onChange={(e) => update("referralSource", e.target.value)}
                className="input"
              />
            </div>
          </div>
        </details>
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit Land Potential Review Request"}
        </button>
      </div>
    </form>
  );
}
