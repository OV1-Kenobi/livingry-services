"use client";

import { useState } from "react";

type Industry = "hvac" | "roofing" | "legal" | "medical" | "other";

export function ReviewForm() {
  const [industry, setIndustry] = useState<Industry>("hvac");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/system-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card">
        <div className="eyebrow">Received</div>
        <h2 className="serif mt-3" style={{ fontSize: "var(--step-2)" }}>Thank you.</h2>
        <p className="mt-4" style={{ color: "var(--ink-2)" }}>
          Your System Review request is in. We reply within one business day with either a scheduling link or a straight answer that we are not the right fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5" aria-label="System Review request">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company">Company or practice</label>
          <input id="company" name="company" required />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" placeholder="https://" />
        </div>
      </div>

      <div>
        <label htmlFor="industry">Which best describes you</label>
        <select id="industry" name="industry" value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>
          <option value="hvac">HVAC / plumbing / electrical / home services</option>
          <option value="roofing">Roofing / exterior restoration</option>
          <option value="legal">Legal / professional services</option>
          <option value="medical">Medical / healthcare practice</option>
          <option value="other">Another established service business</option>
        </select>
      </div>

      {industry === "hvac" || industry === "roofing" ? (
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="crm">CRM / field-service tool</label>
            <input id="crm" name="crm" placeholder="e.g. ServiceTitan, Housecall Pro, JobNimbus" />
          </div>
          <div>
            <label htmlFor="area">Service area</label>
            <input id="area" name="area" placeholder="e.g. Central Florida" />
          </div>
        </div>
      ) : null}

      {industry === "legal" ? (
        <div className="grid gap-5">
          <div>
            <label htmlFor="practiceArea">Practice area</label>
            <input id="practiceArea" name="practiceArea" placeholder="e.g. Family, Personal injury, Estate" />
          </div>
          <div>
            <label htmlFor="intake">Current intake process</label>
            <input id="intake" name="intake" placeholder="Briefly: how a new prospective client reaches you" />
          </div>
        </div>
      ) : null}

      {industry === "medical" ? (
        <div className="grid gap-5">
          <div>
            <label htmlFor="practiceType">Practice type</label>
            <input id="practiceType" name="practiceType" placeholder="e.g. Concierge primary care, Dental, Specialty" />
          </div>
          <div>
            <label htmlFor="privacy">Privacy and data-governance requirements</label>
            <input id="privacy" name="privacy" placeholder="Briefly: HIPAA, state, or internal constraints" />
          </div>
        </div>
      ) : null}

      <div>
        <label htmlFor="leak">
          What feels like it is leaking today?
        </label>
        <textarea id="leak" name="leak" rows={5} required placeholder="Missed calls, cold estimates, quiet past customers, unclear website, disorganized intake, staff using AI without oversight — anything the team keeps talking about." />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="team">Team size</label>
          <input id="team" name="team" placeholder="e.g. 12 people, 4 techs" />
        </div>
        <div>
          <label htmlFor="referral">How did you hear about us?</label>
          <input id="referral" name="referral" placeholder="Optional" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-[0.9rem]" style={{ color: "var(--ink-2)" }}>
        <input id="consent" name="consent" type="checkbox" required style={{ width: "auto", marginTop: "0.25rem" }} />
        <span>I understand this is a request for a business conversation. Livingry Services does not provide legal, medical, or financial advice.</span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send my System Review request"}
          <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p className="text-[0.9rem]" style={{ color: "var(--copper-2)" }}>
            Something went wrong: {errorMsg}. You can also email us at ov@openagents.com.
          </p>
        )}
      </div>
    </form>
  );
}
