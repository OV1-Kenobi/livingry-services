# HVAC Founding Five — Internal Templates

Founder-facing scripts for working a Founding Five request through the lifecycle. Internal only — these are **not** public pages. Keep every claim consistent with the public copy in `src/lib/hvac-founding-five/content.ts`: one bounded workflow, human-controlled AI, measured before-and-after, no guaranteed revenue, no implied current HVAC licensure.

---

## 1. Private micro-audit script

**When:** state `researching` → `audit_prepared`. Triggered by a new request; due 48h after submission.

**Goal:** research **one externally observable** workflow for the applicant's company and record a short, company-specific observation. Do not use anything the applicant has not made publicly observable or explicitly shared.

Structure (keep to one page):

1. **What I observed.** The single externally visible workflow you tested (e.g. after-hours call handling, web-form acknowledgement, review cadence). State exactly what you did and when.
2. **Where it appears to leak.** The specific handoff or missing next-action — tie it to one of the six named leaks in the public copy.
3. **A neutral hypothesis.** "It looks like X may be happening. I could be wrong — that's what a short conversation would confirm."
4. **The bounded correction.** One sentence on the smallest useful workflow change, framed as human-controlled with AI assisting where useful.
5. **What confirming it would take.** Offer a short Pilot Fit Call — no calendar link; reply to schedule privately.

Tone: observational, not accusatory. Never claim revenue impact you cannot measure yet.

---

## 2. Pilot Fit Call script

**When:** state `fit_call_invited` → `fit_call_scheduled` → `qualified` or `disqualified`.

**Purpose:** confirm or correct the micro-audit hypothesis and check fit against the public "This is likely a fit / not a fit" lists.

Open (2 min):
- Restate the observed workflow and the hypothesis in one sentence. Ask: "How close is that to what actually happens inside the operation?"

Diagnose (15–20 min):
- Walk the real current-state path: customer action → system response → who owns it → what's recorded → required next action → where it fails → consequence.
- Identify the responsible internal decision-maker (required — no pilot without one).
- Confirm recurring volume is high enough to observe the workflow.

Fit check (5 min) — disqualify kindly if any of these are true:
- Wants free AI advice or a generic chatbot demo.
- Wants guaranteed revenue.
- Nobody will own the pilot internally.
- Won't provide baseline info or relevant access.
- Wants a full CRM replacement or unrelated custom software.
- Work would require Livingry to perform licensed HVAC services.

Close:
- If a fit: describe the before/after mapping step and that a one-page proposal follows workflow confirmation. Set the next action + owner + due date.
- If not: say so directly, and (optionally) move to `nurture` with a clear reason.

---

## 3. Warm-intro / outreach copy

**When:** proactively sourcing founding partners, or following a referral. Route replies into the same private-review flow — never send a calendar link.

**Referral intro (to a warm connection):**

> I'm selecting five established US HVAC companies for a founder-led pilot: we take one workflow that keeps slipping — a missed after-hours call, an estimate that never gets followed up, a review that never gets asked for — redesign it with human-controlled AI, and measure the before and after. It's paid and bounded, not a big "AI transformation." If [Company] has one workflow like that, I'd research it privately first and send them a short observation before anyone gets on a call. Worth an intro?

**Direct outreach (cold, to an operator):**

> Quick, specific note: I looked at how [one observable thing] works at [Company] and noticed [neutral observation]. I run a small founder-led pilot for five US HVAC companies — one bounded workflow, redesigned and measured, human stays in control of anything a customer reads as a promise. No pitch deck and no calendar link; if it's useful, I'll send a short private write-up of what I saw and you decide whether it's worth a conversation. Want me to send it?

Guardrails for all outreach: no "AI workforce/employee", no "revolutionize/10x", no "guaranteed revenue", no "no risk", no "free strategy call", no Florida-only framing. These are enforced against the public page by `findProhibitedClaims()` — keep outreach to the same bar.
