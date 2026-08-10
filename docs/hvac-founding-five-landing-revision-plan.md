# Founding Five Landing Page Revision — File-Level Implementation Plan

Status: Proposed (awaiting founder approval)
Applies to: `src/app/hvac/founding-five/*`, `src/lib/hvac-founding-five/*`, `src/app/api/hvac-founding-five/*`, `sql/migrations/`, `tests/`, `docs/hvac-founding-five-runbook.md`
Deployment: push to `master` → Vercel auto-deploy. No commit/push before plan approval.

## 1. Canonical business terms (fixed; do not change)

- **Founding Five Tier 2 pilot price: $2,500 all-in — ALWAYS visible, not gated** (remove `SHOW_HVAC_PILOT_PRICE` gating).
- Included in $2,500: $199 Revenue Continuity Assessment + $497 Livingry Ops Tenant Integration + $649 bundle / $696 separate value + Missed-Call Recovery + Dropped-Estimate Recovery + Agentic Search Optimization + onboarding/training/integration/setup.
- **Tier 1 value is included, not credited and not added** to the $2,500.
- Cohort: limited to five HVAC/R companies; visibly labeled as the Founding Five Tier 2 Pilot ("Founding Five Cohort Pilot Agreement").
- Next 16 clients: higher, scope-based pricing (no new number published).
- Tier 3 (optional add-on): $1,000/week; first four weeks delivered unpaid; retroactively billable **$4,000 only after a written Recovery Ledger verifies $10,000 of qualifying documented collected recovery within those first four weekly cycles**.
  - **CONFLICT FLAG**: canonical offer doc (`livingry-founding-five-offer-and-funnel.md`) says $5,000 threshold (2x pilot). Founder's explicit current brief says $10,000. Explicit brief wins; confirm before copy ships.
- Client Reactivation: NOT included — first a-la-carte upgrade.
- No outcome guarantees, no risk-reversal claims, no timeline-to-results claims.
- Third-party costs billed separately and disclosed.
- No public-calendar-only CTA; applications are human-reviewed before follow-up.

## 2. Current state being replaced (audit findings)

- Offer section sells a 4-workflow "Strategic Alliance / Revenue Continuity System" incl. $799 AI Opportunity Blueprint, $2,500–$4,500 launch, 2x recovered-fee coverage, conditional fee-waiver guarantee, 12-week guarantee period.
- FAQ contains duplicate contradictory "What do we pay to start?" entries ($799 blueprint vs $799 setup fee + third-party costs).
- Form is a 10-section alliance application whose acknowledgement list references the $799 findings report and $2,500–$4,500 launch; consent version `hv-ff-consent-v1`.
- CTA pair is "Apply for a Founding Five Strategic Alliance" / "Request a Private Workflow Review" (calendar-flavored), `#request-review` anchor.
- Pricing export is gated behind server-only env flag.

## 3. Conventions identified (enforced during implementation)

- Content single source of truth: `src/lib/hvac-founding-five/content.ts`; page.tsx renders it; JSON-LD + directAnswer exported from content.
- Server page + client `HvacAnalytics.tsx` (data-analytics attrs, snake_case events, `assertNoPii`).
- Form: client component, honeypot, client-side validation, consent checkbox; API POST `src/app/api/hvac-founding-five/route.ts` with CSRF origin check + 5/hr/IP rate limit + generic 500.
- 12-state pipeline (`new_request → researching → audit_prepared → audit_sent → fit_call_invited → fit_call_scheduled → qualified → proposal_sent → pilot_won | pilot_lost | disqualified`, plus `nurture` holding); store via `store.ts` (in-memory / Pg), typed DB columns in `sql/migrations/`, consent version + `metadata_json` captured.
- Env (server-only, no-op when unset): DATABASE_URL, BREVO_API_KEY/LIST_ID, N8N_WEBHOOK_URL/TOKEN, RESEND_API_KEY, HVAC_FF_FROM, HVAC_FF_OWNER_TO.
- Tests: tsx node runner in `tests/` (24 files), `npm test`, `npm run typecheck`, Playwright e2e; prohibited-claims scanners asserted in `tests/hvac-founding-five-content.test.ts`.
- Stack: Next.js 16.2.10 (breaking changes — consult `node_modules/next/dist/docs/` before code), React 19, TS5, Tailwind v4, CSS vars (paper/ink/copper/forest/seal), a11y patterns from existing sections.
- No repo contain any secrets; `git grep` for old terms must return zero after implementation.

## 4. File-level scope

### A. Copy core (single source of truth)
1. `src/lib/hvac-founding-five/content.ts` — rewrite copy blocks; add exports: `PILOT_PRICE_LABEL` (visible $2,500), `TIER1_INCLUDED_BLURB`, `NEXT_SIXTEEN_LABEL`, `FOUNDING_FIVE_THRESHOLD_TEXT` ($10,000 / four weekly cycles / $4,000 retroactive only after written Recovery Ledger verifies qualifying collected recovery / no outcome guarantees), `REACTIVATION_UPGRADE_TEXT`, `SCORECARD_INTENTS`, `WHAT_LIVINGRY_DOES_NOT_DO`, consent bump to `hv-ff-consent-v2`; remove guarantee/waiver/$799/2x copy and `gatedPrice`; extend prohibited-pattern lists (`$799`, "guarantee period", "2x", "waiv").
2. `src/app/hvac/founding-five/page.tsx` — hero (H1 "Stop buying more leads before you seal the leaks.", eyebrow "Founding Five Strategic Alliance — Invite-Only HVAC/R Pilot Cohort", primary CTA "Take the 15-Minute Revenue Leak Scorecard" → `#scorecard`, secondary "See the Founding Five Path" → `#ff-path`, trust strip "Calls. Estimates. Search readiness. Human-reviewed where judgment matters."); replace OFFER → "What's included in the $2,500 pilot"; replace GUARANTEE → "How the $10,000 recovery threshold works"; add "What Livingry does not do" section; add REACTIVATION + NEXT-16 sections; keep FIT/FOUNDER/DELIVERABLES with copy alignment; keep map + JSON-LD; update `data-analytics` names (`hvac_scorecard_start` etc.); remove gatedPricing rendering.
3. `src/app/hvac/founding-five/AllianceApplicationForm.tsx` — rebuild as high-signal Scorecard intake: name, company, role (select), metro/service area, trucks/team size (select), FSM/CRM (select), primary leaks (top-2), weekly lead/estimate volume ranges (select), readiness (select), consent v2. PII-minimal: free text only name/company/metro; everything else enumerated. Keep honeypot + client validation; success state = scorecard received, next steps, no acceptance promise.
4. `src/lib/hvac-founding-five/types.ts` — payload + `metadata_json` anatomy for new fields.
5. `src/lib/hvac-founding-five/validation.ts` + `application.ts` + `application-validation.ts` — new schema, consent v2 (reject legacy consent v1/v0), pipeline state mapping unchanged identifiers (display label `scorecard_received` only).
6. `src/app/api/hvac-founding-five/route.ts` — no structural change; validators accept new fields; CSRF/rate-limit/honeypot unchanged; no secret changes.
7. `sql/migrations/0003_hvac_founding_five_scorecard.sql` — typed columns: team_size_range, fsm, primary_leaks, lead_volume_range, readiness, consent_version (default `hv-ff-consent-v2`), matching `0002` style.

### B. Tests
8. `tests/hvac-founding-five-content.test.ts` — visible $2,500 pricing assertion; threshold language ($10,000/$4,000/ledger/no guarantees); Tier 1 included-not-credited; next-16 distinction; reactivation labeled a-la-carte; prohibited-pattern regression (zero `$799`, "guarantee period", "2x", "waiv").
9. `tests/hvac-founding-five-validation.test.ts` — new field rules + consent v2 acceptance / legacy rejection.
10. `tests/hvac-founding-five-positioning.test.ts` — hero lines, CTA pair routing.
11. `tests/alliance-endpoint.test.ts` — scorecard payload round-trip against in-memory store; rejection of legacy `$799`-era fields.
12. `tests/hvac-founding-five-pipeline.test.ts` — metadata mapping under new schema.

### C. Docs + cross-references
13. `docs/hvac-founding-five-runbook.md` — remove `SHOW_HVAC_PILOT_PRICE` note (price now always visible), consent version, payload summary, lifecycle appendix.
14. `src/lib/hvac-funnel/content.ts` — `BLUEPRINT_APPLY_HREF` anchor `#request-review` → `#scorecard` (keep path `/hvac/founding-five`).
15. Leave untouched (separate products per prior founder stance): `src/app/operations/hvac/blueprint/*`, `src/lib/ai-blueprint/content.ts`, `src/lib/revenue-continuity/content.ts`, `src/app/faq/page.tsx` — unless founder expands scope.

## 5. Sequencing
A1–A2 copy → A3 form → A4–A5 lib/types/validation → A6 API → A7 migration → B tests → C docs → `npm test` + `npm run typecheck` → manual local render (`npm run dev`, in-memory store) → presentercheck: `git grep` for `$799|guarantee|2x|waiv` in founding-five scope must be empty → plan approval → commit + push to `master`.

## 6. Out of scope / future integration (documented, not shipped)
GCP workstream items from the brief (Vapi callback, Twilio verification, Pub/Sub burst protection, Vertex AI human-review, Cloud Scheduler concurrency guard, Secret Manager) require: path to downloaded Livingry Ops web app (never provided), GCP project access, Vapi/Twilio credentials. They belong in a separate build-report section; acceptance tests from the brief (mock Vapi event, idempotency) are GCP-scoped and deferred with this phase.