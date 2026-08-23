# 02 — Founder Decisions Required

Website Overhaul · Phase 0 Audit
**Date:** 2026-08-12
**Author:** Chief-Of-Staff register, consolidated by Orchestrator
**Rule applied:** Only genuinely unresolved decisions that materially affect truthfulness, pricing, legal exposure, privacy/security claims, ownership language, diagnostic behavior, funnel behavior, or production behavior are listed. Questions already answered in the canonical plan are NOT repeated here.

---

## 1. Blocker decisions

| ID | Decision needed | Why it matters | Affected page/feature | Safe options | Safe temporary treatment | Can work continue without it? |
|---|---|---|---|---|---|---|
| B-1 | Disposition of the uncommitted WP2 bundle (product pages, proof components, nav/sitemap/test changes) — revert-and-extract (recommended) vs. park-on-branch vs. continue | The bundle promotes "Livingry Ops" + "Live Demo" in global nav and leads the funnel with the product — the exact drift the founder rejected. Its tests lock the prohibited labels. | Header, Footer, sitemap, `/product/livingry-ops` + walkthroughs, `src/components/proof/*`, 2 test files, `docs/product-proof-register.md` | (a) Revert + extract to `preserve/wp2-*` branches (recommended); (b) park bundle on a branch, untouched master; (c) keep + continue (not recommended) | Working tree untouched; no commits; bundle preserved on disk | YES — all Phase 1 planning and every other change set can proceed; this decision gates only the first Phase 1 commit |
| B-2 | Official diagnostic name | Public CTA descriptor is approved ("17-point self-assessment") but the name is not; a wrong name lands in metadata, results pages, and paid copy | `/assessment`, results, homepage CTA, meta/JSON-LD | Working name "HVAC Cash Flow Leak Diagnostic" (plan §3) or any founder-approved name; no name change after go-live without redirect/rename work | Use working name + "17-point self-assessment" descriptor; results copy is name-neutral | YES — until Phase 3 diagnostic copy finalization |
| B-3 | Final public wording for the DFY 10X performance-trigger mechanics (baseline period, attribution, extension limits, retroactive billing, exclusivity, repricing) | Publishing invented mechanics is a legal/commercial risk; hiding prices is prohibited by the canonical plan; the current week-4 mechanics are documented but flagged publish-ready-limited | Services & Pricing page DFY section; homepage services preview; leak pages | (a) Publish base prices + conservative trigger language + explicit "details finalized at proposal" line (recommended); (b) founder resolves all mechanics now (plan §18.6) | Show transparent standard reference pricing ($2,500 start / $2,500 final / $1,000 per week) and current Founding Five ($1,250 / $1,250 / $500 per week) with conservative wording; no invented terms | YES — until Phase 3 DFY copy; DIY/DWY sections are fully resolved and publishable |
| B-4 | Founding Five application sequencing + remaining commercial details (fee-waiver conditions, reprice trigger, extension-cycle caps, exclusivity mechanics) | Founding Five is removed from global navigation but may remain a contextual motion; its copy must match founder-approved terms only | Founding Five references on homepage, `hvac/founding-five`, Services & Pricing | (a) Remove Founding Five from public surfaces except Services & Pricing reference pricing (recommended per plan); (b) keep contextual application page (scorecard machinery) | Keep scorecard/pipeline code; remove Founding Five from nav/homepage CTAs; quote "selective, founding-rate" language only | YES |
| B-5 | Security remediation approach for the unauthenticated Ops API cluster + dashboard exposure (S-004…S-010, S-016, S-019): harden vs. quarantine vs. accept-risk | Site is BLOCKED for public deployment as-is; the canonical plan also forbids public dashboards/sign-in; PII/log/privacy issues are public-facing | `/api/ops/*`, `/api/system-review`, `/api/land-review`, `/dashboard/*`, privacy page | (a) Server-gate ops routes + tenant-scope + rate limits (recommended for retained features); (b) quarantine dashboard/ops from public build (recommended if surfaces are cut); (c) founder-written risk acceptance (not recommended) | No deployment; public copy work is unaffected | YES — blocks only deployment and Phase 4 go-live |
| B-6 | Ownership / no-lock-in wording ("you hold the keys", "own your infrastructure", "exportable") — legal review (O4/F1/F2) + mechanism verification (S-023/S-024) | Copy promises more than code demonstrates today (CREDENTIALS_ENC_KEY in Livingry env; no export mechanism) | About, Proof→Evidence, services pages, legal pages | (a) Tighten copy to verified delivery scope until mechanism ships (recommended); (b) founder confirms mechanism scope now | Retain current conservative wording; do not add new ownership promises; mark requires-verification in copy matrix | YES |

---

## 2. Important — not blocking

| ID | Decision needed | Why it matters | Affected | Safe options | Temporary treatment | Can work continue without it? |
|---|---|---|---|---|---|---|
| I-1 | Diagnostic scoring / opportunity-range logic (plan §18.5) | Results must be directional; inventing scores or opportunity logic is prohibited; the site currently has none | Diagnostic results presentation | (a) Causes + reasoning + owner checks without numeric scores (recommended); (b) founder-specified scoring model | Results show: likely priority, why ranked first, handoff break, inputs/assumptions, immediate owner check, live-validation list — no invented numbers | YES |
| I-2 | Verified completion time for the 17-point assessment (plan §18.4) | Timing claim appears in copy/meta; unverified timing is a claim risk | Diagnostic intro/microcopy | Publish "about N minutes" only after founder verification; or omit timing | Omit timing; use "17-point self-assessment" descriptor only | YES |
| I-3 | Final primary-action language and test order (plan §18.2) | CTA is approved working language; final form pending founder | Homepage hero, all primary CTAs | Keep "Diagnose My Cash Flow Leaks" (plan/microcopy-approved); A/B order later | Use approved working language | YES |
| I-4 | Privacy, retention, and security commitments (plan §18.9; S-022) | Privacy page under-describes actual collection (System Review, Founding Five, Land Review, OTP DMs, logs); unsupported claims prohibited | Privacy page, Terms, Evidence/trust pages | (a) Correct policy to actual behavior now (recommended); (b) reduce collection surface to match policy | Keep policy factual; add no new claims | YES (must resolve before go-live) |
| I-5 | `/ops` vs `/explore-demo` duplicate demo routes (W-3) | Both render public demo; Playwright readiness URL depends on `/ops`; canonical plan forbids public live demos | `/ops`, `/explore-demo`, e2e config, sitemap | (a) Remove both from public build (recommended); (b) keep one hidden/noindex for founder-only controlled demos | Keep as-is during Phase 1 (both noindex-able); do not link them | YES |
| I-6 | `/dashboard` + "Client Sign In" handling (W-4) | Client sign-in is prohibited publicly; header link must go regardless; underlying API unauthenticated | Header, dashboard routes, ops API | (a) Remove link now; gate/quarantine API (recommended); (b) defer removal to B-5 decision | Remove "Client Sign In" from header in first Phase 1 change set; API untouched | YES |
| I-7 | Disposition of non-core surfaces: Industries, Proof, Why-Livingry, Agents, Habitats/Land Review, System Review | They are out of the canonical nav; each needs keep-hidden/redirect/remove/merge to avoid orphan or broken-internal-link states | All listed routes + redirects + sitemap | Per plan: merge Proof→Evidence; industries hidden or redirected; why-livingry→About; agents→how-it-works; habitats removed/hidden; system-review kept only if hardened | Phase 1 removes nav/sitemap visibility; redirect plan in Phase 1 change set (04 artifact) | YES |

---

## 3. Optional refinements (no work blocked)

| ID | Item | Temporary treatment |
|---|---|---|
| O-1 | "Revenue Clarity & Capture" (canonical plan) vs "Revenue Clarity Capture" (master prompt) ampersand variant | Adopt plan form "Revenue Clarity & Capture"; change is one-line copy pass |
| O-2 | "Services & Pricing" (plan) vs "Services Pricing" (master prompt) | Adopt plan form "Services & Pricing" |
| O-3 | DWY delivery target: "14-week" (master prompt) vs "1–4 weeks" (ALL founder-approved pricing docs: Offer Decision A7, required-decisions D13, swipe file, plan §7) | Use 1–4 weeks; note discrepancy in change log; no invented target |
| O-4 | Tone item: "Seal the client container" vs canonical leak-narrative lines (reconnaissance C4) | Keep both available; canonical lines take precedence on hero/support copy |
| O-5 | Diagnostic placement of the existing /assessment→/system-review handoff vs. new "Validate This Leak With Michael" leak-assessment path | Phase 3 design follows the canonical path (diagnose → results → validate with Michael → compare pricing) |

---

## 4. Already answered by the canonical plan (do NOT re-ask)

- Primary CTA + microcopy (Diagnose My Cash Flow Leaks / 17-point self-assessment)
- Navigation structure (desktop + mobile) and removals
- Pricing visibility requirement and DIY/DWY terms and payment structure
- Evidence (not Results) naming and hierarchy
- Refrigerant analogy language and claim guardrails
- Human-control headline and Win/Win/Win definition
- No public dashboards, sign-in, demos, vendor lists, product tours
- Leak Assessment page framing and expectation strip