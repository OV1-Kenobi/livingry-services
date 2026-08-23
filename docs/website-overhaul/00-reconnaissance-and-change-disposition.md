# 00 — Reconnaissance and Change Disposition

Website Overhaul · Phase 0 Audit
**Date:** 2026-08-12
**Repo:** `livingry-services` (deployed site)
**Author:** Orchestrator, synthesizing Repository-Steward, Plan, and Security-Agent findings
**Status:** READ-ONLY audit. No site changes made. Awaiting founder approval per Phase 0 stop rule.

---

## 1. Purpose and authority

This document answers four questions before any edit:

1. What is the current state of the site, repository, and working tree?
2. Which routes, components, and copy need to be kept, revised, merged, redirected, hidden, or removed under the canonical website plan?
3. What public-surface security risk exists if the site is deployed as-is?
4. What is the safe implementation sequence?

Authority (source-of-truth order applied throughout):

1. Explicit founder instructions in the Orchestrator Master Prompt (2026-08-12 task)
2. `livingry-services-navigation-and-sales-copy-refinement-plan-revenue-clarity-capt.md` (2026-08-11) — canonical for navigation, sales copy, funnel structure, pricing visibility, terminology, page priorities
3. Current founder decisions in active Livingry Services project materials (decision-log D1–D5 2026-08-11; Founder-Offer-Decision 2026-08-10; required-decisions D1–D15)
4. `Canonical-Operating-Swipe-File` (context/canonical-operating-swipe-file.md)
5. `Current-Tool-Stack-and-Launch-Operating-Plan` (context/current-tool-stack-and-launch-plan.md)
6. `editorial-profile.md`
7. Livingry Hook & Story Swipe File — HVAC Revenue Continuity
8. Michael Ovsen — Canonical Attractive Character Profile
9. Existing repository copy, live-site language, old plans, agent output, uncommitted work

Where findings conflict, the conflict is recorded here and in `02-founder-decisions-required.md`. No material contradiction was silently reconciled.

---

## 2. Repository state

- **Branch:** `master`, tracks `origin/master`. No staged changes.
- **Remote branches:** `origin/main`, `origin/master`, `origin/feat/assessment-17-point-production`, `origin/feat/hvac-first-repositioning`, `origin/feat/hvac-founding-five`, `origin/feat/hvac-operations-landing-page`, `origin/feat/visual-system-dashboard-routes`, `origin/ops-center-live-crud`, `origin/proof-origin-page`.
- **Recent commits (top of history):**
  - `04adaf7` 2026-08-10 — wire Livingry Company OS integration (pre-flight, team routing, sales voice, production gate, teacher debrief)
  - `07baa05` 2026-08-09 — Founding Five pilot rollover: scorecard intake, drop superseded commercial model
  - `2f67659` 2026-08-03 — Upgrade /industries/hvac into Revenue Continuity conversion funnel
  - earlier: a11y/focus management (12078d8), positioning batches B/C (a6acc24, 39d39da), security batch A (64474af), blueprint page + alliance application (8765f3f, a687a8d, b93979b), HVAC-first repositioning (65d36ae, 27d0c9b), founder story (443e0bb)
- **Working tree:** 16 unstaged modified files + 5 untracked paths (14 files). Full per-file disposition in `01-uncommitted-work-disposition.md`.
- **Duplicated lineages on disk (reference-only):**
  - `Documents/Livingry Services/livingry-ops-master/` — older snapshot, NOT deployed (legacy $799 Blueprint funnel, consent v1)
  - `Documents/Livingry Services/sales docs/Overskill Build competition/Current codebase/livingry-services-master/` — stale third copy (consent v1, no git/node_modules)
  - Confirmed live site = this repo (`livingry-services`) via consent version + scorecard version matching live pages (verified 2026-08-11 reconnaissance).
  - `livingry-ops.overskill.app` is an OverSkill SPA shell, NOT the codebase.

---

## 3. Stack, scripts, hosting, and environment

- **Framework:** Next.js 16.2.10 (App Router) + React 19.2.4 + TypeScript + Tailwind CSS v4 + clsx. Postgres driver `pg`, `resend` (email), `nostr-tools` + `ws` (OTP delivery), Playwright + node:test/tsx tests.
- **Scripts:** `dev`, `build`, `start`, `typecheck` (`tsc --noEmit`), `test` (`node scripts/run-tests.mjs`).
- **Tests:** `tests/*.test.ts` (content/claims/isolation suites, ~23 files); `e2e/*.spec.ts` (Playwright, local production build on port 3100; readiness URL is `/ops` — see duplicate-demo-route item below).
- **Redirects (committed in `next.config.ts`):** `/industries/hvac/founding-five` → `/hvac/founding-five`; `/what-we-build` → `/operations`. Working tree adds a Turbopack root pin (build-environment fix — strategy-neutral).
- **Hosting:** no `vercel.json`/`netlify.toml` in repo; deploy pattern documented in `docs/rollback-runbook.md` = push to `master` → Vercel. **No deployment activity is authorized in this task.**
- **Environment:** no `.env*` files in the repo (`.env*` gitignored). Referenced env var names: `DATABASE_URL`, `RESEND_API_KEY`, `BREVO_API_KEY`, `BREVO_LIST_ID`, `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_TOKEN`, `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_TOKEN`, `SETUP_SECRET`, `CREDENTIALS_ENC_KEY`, `DEFAULT_TENANT_*`, `DASHBOARD_OTP_NPROFILE`, `LAND_REVIEW_TO/FROM`, `SYSTEM_REVIEW_TO/FROM`, `HVAC_FF_FROM`, `HVAC_FF_OWNER_TO`. Fallbacks are public (e.g., `ov@livingry.services`), not secrets.
- **Documentation gap:** `src/lib/crypto.ts` and `src/lib/db.ts` reference a `.env.example` that does not exist. Add one (names + placeholders only) during implementation.

---

## 4. Current route inventory and disposition

Canonical statuses: **KEEP / REVISE / MERGE / REDIRECT / HIDE / REMOVE**. "HIDE" = keep the route functional but out of global navigation and out of sitemap/robots decisions; "REMOVE" = delete route + redirect to the noted destination.

### 4.1 Corporate and marketing pages

| Route | Current purpose | Primary CTA today | Canonical status | Final conversion role | Copy risk | Redirect need |
|---|---|---|---|---|---|---|
| `/` | Umbrella homepage; leak-narrative H1 with Ops/Habitats selector; Founding Five pilot pill and previews | "Seal the Client Container" → /operations/hvac; founding-five scorecard | **REVISE (rebuild)** | Canonical hero (Revenue Clarity & Capture eyebrow, "Before you buy more leads…" headline, Diagnose CTA), refrigerant analogy, four leak cards, Find/Trace/Seal/Verify, human-control section, services preview, final action | HIGH: hero conflicts with canonical hero; Founding Five pilot pricing remnants; product-first previews | None |
| `/about` | Founder narrative page | Links to Proof ("Read the origin story") | **REVISE** | Founder experience + limitations, canonical positioning line, Win/Win/Win | MEDIUM: ownership claims ("You hold the primary credentials and keys") need founder verification | None |
| `/why-livingry` | Brand-rationale page | — | **REVISE or MERGE** into About | Trust/positioning support | MEDIUM: former brand-rationale label | Candidate: merge into About (founder choice) |
| `/proof` | "Proof outlives institutions" founder-origin page | — | **MERGE/REDIRECT → Evidence** | Evidence page (evidence hierarchy, demo-data labeling) | MEDIUM: proof-branding not in canonical nav; page content may be repurposed | Redirect `/proof` → `/evidence` or repurpose in place (founder choice) |
| `/how-it-works` | Method page | — | **REVISE** | Find/Trace/Seal/Verify + human control + Revenue & Data Continuity explanation | MEDIUM: needs canonical method language | None |
| `/faq` | FAQ page (4 questions) | — | **REVISE** | FAQ (mobile menu item) | LOW–MEDIUM: "free System Review" framing vs scorecard first; stale pricing Q&A possible | None |
| `/insights` | Index of insights | case-study teaser ("only once a Founding Five client has verified evidence") | **REVISE** | Insights (mobile menu item) | LOW | None |
| `/insights/ai-for-hvac-companies` | "17 questions to ask every HVAC AI vendor" field guide | — | **KEEP AS IS** | Supporting education | LOW (vendor questions = analysis, not vendor list) | None |
| `/privacy` | Privacy policy | — | **REVISE** | Legal | MEDIUM: policy under-describes actual collection (System Review + Founding Five + Land Review) — see security §6 | None |
| `/terms` | Terms | — | **REVISE** | Legal | LOW | None |
| `/agents` | "AI agents" positioning page | — | **REVISE or REMOVE** | None required by canonical plan | MEDIUM: agent-first framing; not in canonical nav | If removed: redirect to /how-it-works (founder choice) |

### 4.2 Funnel and offer pages

| Route | Current purpose | Primary CTA today | Canonical status | Final conversion role | Copy risk | Redirect need |
|---|---|---|---|---|---|---|
| `/industries/hvac` | HVAC conversion funnel (working tree = Strategic Alliance founding rates) | Scorecard / alliance application | **REVISE** | Revenue Leaks primary reference page (or leak-specific pattern) | HIGH: superseded-term history, Tier/Pilot remnants in committed copy; funnel rebuild target | Keep slug or move to `/revenue-leaks` (founder choice) |
| `/industries` + `/industries/[slug]` | Industry index + professional-practices/roofing pages | — | **REVISE/REMOVE from nav** | None required | LOW | Industries removed from nav; pages may stay hidden/redirected (founder choice) |
| `/hvac/founding-five` | Founding Five page + Revenue Leak Scorecard form + alliance pipeline | Scorecard → `/api/hvac-founding-five` | **REVISE—KEEP, BUT REVISED** | Founding Five NOT in nav; keep as contextual/limited surface only if founder approves Founding Five motion; otherwise REMOVE | HIGH: Founding Five nav-removal decision; scorecard = strongest intake machinery on site (do not discard) | Not in nav; existing redirect preserved |
| `/assessment` | 17-point self-scored diagnostic (no backend) | → System Review (query-param context) | **KEEP, BUT REVISE** | Primary diagnostic: results with causes, owner check, live-validation note, "Validate This Leak With Michael", "Compare Services Pricing" | MEDIUM: results/scoring language must stay directional; no invented scoring/opportunity logic | None |
| `/system-review` | System Review form (Resend + Sheets webhook) | submit form | **REVISE** | Secondary capture (or remove if replaced by diagnostic path) | MEDIUM: unguarded endpoint (see security S-016) | Founder choice |
| `/land-review`, `/habitats/land-potential-review`, `/habitats` | Habitats / Land Potential Review funnel (Postgres + Resend) | submit form | **REMOVE/HIDE (not in canonical site)** | None required | MEDIUM: privacy/log hygiene; unrelated to HVAC core journey | REMOVE or HIDE per founder choice |
| `/operations`, `/operations/hvac`, `/operations/hvac/blueprint` | Operations pages; blueprint redirects to founding-five flow (committed redirect is `/operations/hvac/founding-five` → `/hvac/founding-five`; `/what-we-build` → `/operations`) | "Seal the Client Container" family | **REVISE/MERGE → How It Works / Services** | How-It-Works + Services & Pricing structure | MEDIUM: "operations" naming not in canonical nav; blueprint remnants | Per Phase 1/2 plan |

### 4.3 Product, demo, and dashboard surfaces (prohibited surfaces under canonical plan)

| Route | Current purpose | Gated? | Canonical status | Disposition notes | Redirect need |
|---|---|---|---|---|---|
| `/product/livingry-ops` + 2 walkthrough routes | Product-first Livingry Ops page + walkthroughs (uncommitted WP2 work) | No | **REMOVE from public nav; disposition pending (see 01)** | Product-first drift; demo-first CTA; conflicts with "no product tour, no demo in hero, Livingry Ops contextual-only" | None publicly (never linked) |
| `/ops` | Public demo dashboard (OpsDashboard public mode, labeled demo data) | Public by design | **HIDE/REMOVE pending founder choice** | Duplicate of `/explore-demo`; both render public mode; Playwright readiness URL depends on `/ops` | If removed, redirect to `/explore-demo` or remove readiness URL |
| `/explore-demo` | Public demo dashboard (labeled synthetic data) | Public by design | **HIDE/REMOVE pending founder choice** | "Live demo" forbidden publicly; demo assets must stay controlled and clearly labeled if retained | Founder: hide (noindex + no nav) vs remove |
| `/dashboard` (+ ops-center, exceptions, identity, integrations, events) | Client workspace; OTP gate UI + public preview | UI gate only; underlying API unauthenticated (security S-019) | **HIDE/REMOVE; NO client sign-in allowed** | Remove "Client Sign In" from header; gate server-side or quarantine routes; keep code for client delivery but never public-nav | Remove from nav; robots already disallows |
| `/api/dashboard-auth/*`, `/api/ops/*` | OTP auth relay + Ops CRUD API | Config route gated; rest unauthenticated | **HARDEN before any public deploy** | See security §6 (S-004…S-013) | n/a |
| `/api/hvac-founding-five` | Scorecard pipeline (rate-limited, same-origin, exemplary) | Yes | **KEEP (best-practice reference)** | Fine to retain if scorecard retained | n/a |
| `/api/system-review`, `/api/land-review` | Form intake + email/webhook | No (S-016/S-017) | **HARDEN or decommission** | Rate-limit, same-origin, escaping, log hygiene | n/a |

### 4.4 Systems and content families

| Route | Current purpose | Canonical status |
|---|---|---|
| `/systems/[slug]` (8 families: response, recovery, customer-continuity, discovery-and-trust, knowledge, workflow, tradeops, review-and-referral) | Category content pages | **REVISE/MERGE** — reuse content behind Revenue Leaks / How It Works / Services as appropriate; not direct nav items |

### 4.5 Missing routes required by the canonical plan (to create, Phase 1–3)

- `Services & Pricing` page (nav + footer; DIY/DWY/DFY standard scope, prices, payment terms, responsibility boundaries, add-ons, self-hosting custom-quoted, DFY standard + Founding Five side-by-side with conservative trigger language)
- `Revenue Leaks` hub + four leak-specific pages (Missed Calls / Slow Response; Dropped Estimates; Dead Client Lists; Lost Referrals/Reviews/Testimonials) with diagnostic questions
- `Evidence` page (evidence hierarchy; founder experience; demo data labeled; no "Results")
- Diagnostic introduction + results presentation (directional; causes; owner check; live validation; CTAs)
- `Leak Assessment` booking page (expectation strip; no-obligation) — high-intent path
- `Human Approval` / `Win/Win/Win` / `Ownership and Handoff` / `Data Continuity` trust pages/sections per footer plan (Privacy and Security Approach only once supportable)

---

## 5. Shared components, layouts, and design system

- **Global:** `src/app/layout.tsx` (fonts Fraunces/Inter, metadata), `globals.css` (design tokens `--ink/--paper/--forest/--copper/--seal`, `.serif .mono .eyebrow .btn-* .card .pill .num .rule-label .section .container .paper-grain`, section styles), `robots.ts`, `sitemap.ts`.
- **Layout components:** `Header.tsx` (nav: currently includes Client Sign In → /dashboard, product/demo links in working tree), `Footer.tsx` (Company column includes product/demo links in working tree; Proof link; no Services & Pricing link yet), `PageHero`, `Breadcrumbs`, `EndCta`, `JsonLd`, `Reveal`, `HvacFieldContext`, diagram components.
- **Funnel components:** `DashboardLoginGate` (OTP), `DashboardPublicPreview`, `OpsDashboard` + `useOpsDashboard`, `ProofLedger`, `RevenueLeakScorecard`.
- **Content architecture:** copy lives in `src/lib/<area>/content.ts` typed modules; pages render; tests assert strings/prohibited patterns. This pattern is strong and should be preserved for the rebuild.
- **See `01-uncommitted-work-disposition.md` for `src/components/proof/` (7 components) — claim-discipline machinery worth extracting for the Evidence surface.**

---

## 6. Public-surface security scan (Security-Agent, read-only, 2026-08-12)

Verdict: **BLOCKED for public deployment as-is** (10 High findings; no founder risk acceptance on file).

### Clean results (state plainly)
- No hardcoded secrets, keys, connection strings, or private keys anywhere in committed source.
- No SQL injection observed (all parameterized queries, allowlisted dynamic columns).
- Public demo (`/ops`, `/explore-demo`) uses synthetic data only, vendor-neutral, with in-UI demo-data labels; enforced by tests.
- Founding Five pipeline is exemplary: same-origin, rate-limited, honeypot, redacted logs, timeouts.
- robots.txt disallows `/api/` and `/dashboard`; dashboard pages are noindex (advisory only).
- No PCI/SOC2/ISO/GDPR claims; privacy page affirmatively disclaims HIPAA coverage.
- `.env`-gated provider adapters fail closed when env vars are absent.

### High findings (must fix before any public deploy)
| ID | Finding |
|---|---|
| S-004…S-010 | `/api/ops/tenant | dashboard | tasks | exceptions | promises | opportunities | integrations` — unauthenticated CRUD; tenant id client-supplied; unscoped `[id]` updates; tenant enumeration via `/api/ops/tenant`; integrations DELETE destroys rows |
| S-016 | `/api/system-review` — no same-origin check, no rate limit, no server honeypot; unlimited POSTs trigger Sheets webhook + Resend email + PII-in-logs |
| S-019 | `/dashboard/*` UI gate is cosmetic — data is reachable via the unauthenticated ops API; "Client workspace" advertised from public header |

### Medium findings
- S-003 DB TLS `rejectUnauthorized: false`; S-011 OTP send unrate-limited (DM flood); S-012 OTP from `Math.random()`; S-013 static session cookie `"granted"`; S-017 land-review weak origin check + unescaped email interpolation + PII logs; S-022 privacy policy under-describes collection (System Review, Founding Five, Land Review all collect).

### Low/info
- S-014 setup secret non-constant-time compare but fail-closed; S-023 "you hold the keys" copy vs `CREDENTIALS_ENC_KEY` in Livingry env; S-024 "no lock-in / exportable" copy vs no export mechanism in code; S-002 missing `.env.example`; S-020/S-025/S-026 demo isolation, robots/sitemap positives; duplicate robots entries and stale sitemap priority comments.

### Security disposition for the overhaul (recommended, Phase 1–4)
1. Quarantine or gate every `/api/ops/*` route behind the existing session check (mirror `/api/ops/config/route.ts`) and scope `[id]` queries to tenant — or strip DB-write routes from the public deploy.
2. Remove "Client Sign In" from header; decide dashboard/demo route disposition (02 W-6/W-7).
3. Fix `/api/system-review` (same-origin + rate limit + log hygiene) or decommission the form.
4. Fix `/api/land-review` origin check + escaping + logs; then decide its disposition.
5. Correct privacy-policy collection description before go-live; keep "you hold the keys"/exportable copy only with founder verification of the mechanism (S-023/S-024).
6. Add `.env.example` (names + placeholders); review DB TLS posture.
7. Re-run security review after any route/copy disposition decisions and before any public deploy.

---

## 7. Prohibited surfaces found in the current site (drive Phase 1 removals)

- **Client sign-in:** "Client Sign In" → `/dashboard` in Header (desktop + mobile) — must be removed from public chrome.
- **Public dashboards:** `/dashboard/*` (client workspace with live CRUD claims), `/ops` + `/explore-demo` (public demos).
- **Live demo references:** Header/Footer "Live Demo" (working tree), `DashboardPublicPreview`, product-page CTAs, sitemap rows.
- **Product-first funnel:** `/product/livingry-ops` + walkthroughs (working tree WP2), `src/lib/product/*`.
- **Experimental/legacy:** Habitats/Land Review surfaces, blueprint remnants, third codebase copy, `ov@openagents.com` stale string in legacy alliance route (ops-master only).
- **Founding Five in nav:** not in current header, but homepage pills/CTAs; must be removed from global navigation and kept contextual-only (if the motion survives).
- **Vendor lists:** none found (positive). Insights 17-vendor-questions article is analysis, not a list — acceptable.
- **Content "Proof" brand:** `/proof` page + Proof/Proof Ledger references — repurpose under Evidence.

---

## 8. Highest-risk contradictions found (Phase 0)

1. **Live funnel shows superseded commercial terms** (Tier 2 Pilot $2,500 all-in, $199/$497/$649/$696 ladder remnants in committed copy; homepage Founding Five pilot pills) while the working tree implements the 2026-08-10 offer rollover. Live site is NOT the copy source; the working tree baseline is newest (decision-log D2/D3).
2. **Uncommitted WP2 bundle (product pages + nav + sitemap + tests) conflicts with the canonical plan**: promotes "Livingry Ops" and "Live Demo" to top-level nav and leads the funnel with the product — exactly the drift the founder rejected. The bundle is coherent and tested; it must be treated as ONE disposition decision (full details in 01).
3. **Public dashboard/demo exposure is security-blocking** (S-004…S-010, S-016, S-019): the current codebase cannot go public as-is, and the canonical plan forbids these surfaces anyway.
4. **DWY delivery target conflict:** Orchestrator Master Prompt states "14-week delivery target"; every founder-approved pricing document (Offer Decision Part A7, required-decisions D13, swipe file, plan) states **1–4 weeks**. Flagged to founder (02, D-2); 1–4 weeks is the consistent founder-approved value.
5. **"Revenue Clarity & Capture" (plan) vs "Revenue Clarity Capture" (master prompt)** and **"Services & Pricing" (plan) vs "Services Pricing" (master prompt)** wording variants — cosmetic; adopt the plan's forms, founder confirmation requested (02, D-9, D-10).
6. **Naming drift in source docs:** "Revenue Continuity" is used as the public category in several context files; the canonical plan sets public frame = "Revenue Clarity & Capture", secondary category = "Revenue & Data Continuity". Existing docs are being updated (see 09); internal shorthand "Revenue Continuity" remains acceptable internally.

---

## 9. Recommended implementation sequence (pending approval)

**Phase 1 — Global corrections:** business/product naming; add Services & Pricing to nav + footer; remove prohibited global-nav links (Industries, Livingry Ops, Live Demo, Proof, brand-rationale labels, Client Sign In, Book a Leak Assessment nav link, Founding Five); expand acronyms on first use; remove stale/contradictory/hidden-pricing copy; refrigerant analogy; remove unsupported product/dashboard/login/client-result/automation claims; canonical positioning line where appropriate.

**Phase 2 — Homepage and trust pages:** canonical hero; refrigerant analogy section; four leak cards + diagnostic questions; Find/Trace/Seal/Verify; human-control section ("The work can move faster without removing accountability."); Evidence page; About revision (founder experience + limitations); Win/Win/Win explanation.

**Phase 3 — Funnel continuity:** four leak-specific pages; diagnostic introduction + results templates; Leak Assessment page; Services & Pricing page (visible prices: DIY $649, DWY $2,500 with payment terms, DFY standard + Founding Five reference with conservative trigger language and published-limitation until the founder resolves the 10X mechanics); follow-up copy artifacts only (no automatic sending); Livingry Ops contextual and controlled.

**Phase 4 — QA + release preparation:** Test-QA full checklist (build/lint/type/tests, routes/redirects, nav, CTAs, forms, mobile, keyboard, headings, contrast, links, metadata, pricing consistency, stale copy, claim integrity); Security re-review; Devops release checklist only; Teacher handoff.

Sequencing caveats:
- Phase 1 copy changes are public-behavior changes → each change set requires founder approval (production-change-policy; Founder Deployment Authorization at release).
- The security High cluster is a launch blocker independent of copy work; remedial gates belong in Phase 1/4.
- `docs/rollback-runbook.md` preserves the rollback pattern (git revert + redeploy); a dedicated rollback path for the overhaul will be documented in Phase 1.

---

## 10. Preservation baseline (what must survive any change)

- `src/lib/hvac-founding-five/` scorecard + pipeline machinery (strongest intake; exemplary security; keep unless founder removes the motion)
- `src/components/proof/*` claim-discipline components (extract to Evidence surface)
- Content-module architecture pattern (`src/lib/*/content.ts` + tests)
- `tests/ops-public-isolation.test.ts`, claim scanners, and superseded-term scanners (extend, don't delete)
- Design system (tokens, fonts, section styles)
- All disposal of work (WP2 bundle, demo routes, dashboard) routes through `01-uncommitted-work-disposition.md` disposition + founder approval; preservation via branch/patch before any revert or deletion