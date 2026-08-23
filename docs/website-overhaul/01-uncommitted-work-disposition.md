# 01 — Uncommitted Work Disposition

Website Overhaul · Phase 0 Audit
**Date:** 2026-08-12
**Repo:** `livingry-services`
**Author:** Orchestrator, synthesizing Repository-Steward findings
**Status:** READ-ONLY assessment. Nothing deleted, reverted, stashed, or committed. Preservation rules: (a) no destructive action before founder approval of this disposition; (b) preservation via branch/patch/archive precedes any revert or deletion; (c) intertwined good/bad work is isolated, not wholesale-reverted.

---

## 1. Working-tree summary

- **Staged:** none.
- **Unstaged modified:** 16 files.
- **Untracked:** 5 paths, 14 files.
- **Nature of the change set:** One coordinated work package — the "Ops Product Proof + Founding Five Funnel Revamp" WP1/WP2 output (per `planning/2026-08-11-ops-proof-funnel-revamp/implementation-plan.md`): Founding Five rollover copy (aligned with the 2026-08-10 offer decision) + a new product-first surface (`/product/livingry-ops`, walkthroughs, proof components, nav/sitemap promotion, tests, proof register).
- **Conflict:** The WP2 portion (product pages, nav labels, sitemap, tests) promotes "Livingry Ops" and "Live Demo" in global navigation and leads the funnel with the product — directly contradicting the canonical `livingry-services-navigation-and-sales-copy-refinement-plan` (2026-08-11) and the founder's stated dissatisfaction with product-first, demo-first drift. The WP1 portion (Founding Five rollover to DIY/DWY/DFY + founding rates) is consistent with the 2026-08-10 offer decision and should be retained.

---

## 2. Disposition key

| KEEP AS IS | Retain without change |
|---|---|
| KEEP, BUT REVISE | Retain; adjust during Phase 1–3 |
| EXTRACT FOR LATER | Preserve machinery/copy outside the public surface for reuse |
| REVERT / DISCARD | Remove from the working tree when approved (with preservation first) |
| REQUIRES FOUNDER DECISION | Decision impacts multiple items or commercial content |

---

## 3. Unstaged modified files

### 3.1 Retain (Foundation Five rollover + build hygiene)

| File | Change summary | Why it aligns | Canonical source | Dependency / regression risk | Recommended action | Revertible automatically? |
|---|---|---|---|---|---|---|
| `next.config.ts` | Turbopack root pin (build-environment fix) | Strategy-neutral; unblocks local builds | n/a (build hygiene) | None | KEEP AS IS | Cad—no; keep |
| `src/lib/hvac-founding-five/content.ts` | Commercial rollover: Tier 2 Pilot ($2,500 all-in) → Strategic Alliance founding rates (DIY $649 / DWY $2,500 / DFY $1,250 start with 10X back-billing); four-workflow offering; removes Tier 3/$10,000 mechanics; tightened prohibited-pattern scanner | Implements the founder-approved 2026-08-10 offer decision; removes superseded public pricing | Founder-Offer-Decision 2026-08-10 (D1–D15); required-decisions D13–D15 | Consumed by /hvac/founding-five + tests | KEEP AS IS | N/A (keep) |
| `src/app/hvac/founding-five/page.tsx` | Alliance labels, four-workflow sections, founding-rates references | Consumes rollover content per 2026-08-10 decision | Same | Coupled to content + tests | KEEP AS IS | N/A |
| `src/lib/hvac-funnel/content.ts` | Same rollover for the /industries/hvac funnel; four workflows; add-on options | Per 2026-08-10 decision | Same | Flag: "Agentic Search Optimization" remains in deliverables list though mechanism block replaced it — resolve in Phase 1 copy pass | KEEP, BUT REVISE (minor consistency fix in Phase 1) | Revertible but would resurrect superseded pilot terms — only via approved rollback |
| `src/app/industries/hvac/page.tsx` | Anchor ids + "Founding rates" labels | Per rollover | Same | Coupled to content + tests | KEEP AS IS | N/A |
| `src/lib/revenue-continuity/content.ts` | Terms block rewritten to DIY/DWY/DFY + founding rate; 10X-vs-baseline; add-ons; Bitcoin terms; week-4 assessment | Per 2026-08-10 decision | Same | Shared module (imported by founding-five and funnel surfaces) — change in one place affects multiple pages; handle in one Phase 1 change set | KEEP, BUT REVISE | Revertible in principle; would restore superseded pricing content |
| `src/lib/hvac-founding-five/scorecard.ts` | Pilot→alliance/engagement field copy | Per rollover | Same | Form behavior unchanged | KEEP AS IS | N/A |
| `tests/hvac-founding-five-content.test.ts`, `tests/hvac-funnel-content.test.ts`, `tests/hvac-operations-content.test.ts`, `tests/revenue-continuity-content.test.ts` | Assert Alliance naming, four workflows, founding rates, 10X, absence of tier3/$3,500 | Tests lock the approved commercial rollover | 2026-08-10 decision | Must be updated in the SAME commit as any content change (styled copy + assertions travel together) | KEEP AS IS | N/A |
| `src/lib/hvac-operations/content.ts` (foundingFive block) | "Earn the alliance" + founding rates + 10X DFY back-billing tied to Recovery Ledger/bank records | Per rollover | Same | Residual superseded copy at committed line 35 ("a fixed-price pilot behind a shared proof ledger") — same-file cleanup in Phase 1 | KEEP, BUT REVISE (line 35 cleanup) | N/A |

### 3.2 Contradict the canonical plan (disposition = REVERT / DISCARD from public tree)

| File | Change summary | Why it conflicts | Canonical source | Dependency / regression risk | Recommended action | Revertible automatically? | Preservation method |
|---|---|---|---|---|---|---|---|
| `src/components/Footer.tsx` | Adds "Livingry Ops" → /product/livingry-ops and "Live Demo" → /explore-demo to Company column | Global nav must NOT contain Livingry Ops, Live Demo | Plan §4 "Remove from global navigation"; master prompt naming rules | Coupled to untracked product bundle + ops-labels tests | REVERT / DISCARD the two added links; add "Services & Pricing" link in Phase 1 | Yes (target-state nav, not last commit — see F note) | Branch `wc/wp2-nav-footer` before reverting |
| `src/components/Header.tsx` | Replaces "Explore Demo Dashboard" → /ops with "Livingry Ops" + "Live Demo" | Same | Same | Note: the pre-change state also contained a demo label rejected by the canonical plan, plus the pre-existing "Client Sign In" → /dashboard link (also prohibited) | REVERT to TARGET nav (Revenue Leaks / How It Works / Evidence / Services & Pricing / About + Diagnose CTA; remove Client Sign In) — founder confirms label set in 02 W-6 | Partial (restore last commit, then Phase 1 edits) | Branch before reverting |
| `src/app/sitemap.ts` | Adds product + walkthrough routes (0.8 priority) | Product pages must not be publicly promoted | Plan naming + no-product-tour rule; robots/sitemap hygiene | Coupled to product pages | REVERT / DISCARD the product rows + priority branch | Yes | Branch |
| `tests/ops-labels.test.ts` | Now asserts "Livingry Ops"/"Live Demo" header+footer labels; asserts old demo label gone | Tests lock prohibited nav labels | Same | Will fail if header/footer revert — must be rewritten to assert the target nav; OTP-gate section reusable | REVERT / DISCARD + rewrite for target nav | Yes | Branch |

---

## 4. Untracked paths

| Path | Contents summary | Why it conflicts | Canonical source | Recommended action | Preservation method |
|---|---|---|---|---|---|
| `src/app/product/livingry-ops/` (3 pages) | Product page + 2 guided walkthroughs; hero "THE PRODUCT — REVENUE CLARITY & CAPTURE"; CTAs "Open the live demo" + Founding Five apply | Product-first funnel; demo-first CTAs; "Livingry Ops" before the visitor understands the field problem; conflicts with no public demo, no product tour | Plan §4 nav rules; master prompt hero rules ("Do not put Livingry Ops, Founding Five, booking, dashboards, or a product tour in the hero"); decision-log D2/D3 | REVERT / DISCARD from public surface — primary; EXTRACT FOR LATER — the claim-discipline copy patterns (evidence labels, boundary lines, demo disclosures, roadmap states) | Branch `preserve/wp2-product-proof` (full bundle, tested state) |
| `src/lib/product/livingry-ops/` (content.ts, walkthroughs.ts) | Single-source content modules for the product pages (SEO, demo, KPI, roadmap, boundaries) | Same as above | Same | REVERT / DISCARD (coupled to pages); EXTRACT copy patterns if reusable on Evidence/Demo surfaces later | Same branch |
| `src/components/proof/` (7 components) | Claim-discipline UI: DemoDisclosure, EvidenceLabel, RoadmapStateBadge, ScreenshotFrame, KPIExplanation, ApprovalBoundaryCard, WorkflowStepper — no user-facing copy, no strategy conflict | None (strategy-neutral machinery) | Plan "Evidence" hierarchy (Evidence not Results; demo data labeled); master prompt evidence rules | EXTRACT FOR LATER — directly reusable for the canonical Evidence surface, Leak Assessment, or any later controlled demo | Branch `preserve/wp2-proof-components` (or same branch) |
| `tests/product-livingry-ops-content.test.ts` | 22 tests locking the WP2 bundle (routes, nav labels, sitemap, demo labels, KPI rules, banned terms incl. superseded prices) | Tests die with the bundle; they hard-assert prohibited nav/promotion | Same as bundle | REVERT / DISCARD with the bundle; EXTRACT scanner patterns (superseded-term scan, claim rule scan) for reuse on Evidence/claims tests | Same branch |
| `docs/product-proof-register.md` | Draft claims register ("product exists, running, publicly demoed"; DEMONSTRATED/VALIDATING/ROADMAP statuses; OF-12 retention open item) | Internal only (not a route); its subject matter (public product proof) conflicts with the canonical plan | Plan "No live demo / no product-first"; master prompt no-public-demo rule | EXTRACT FOR LATER (internal, harmless) — future evidence-register template; REQUIRES FOUNDER DECISION on whether to keep the WP2 line open at all | Keep in place (docs/) until founder decides; no move needed |

---

## 5. REQUIRES FOUNDER DECISION — cross-cutting

| # | Decision | Options (safe) | Holding position | Escalation |
|---|---|---|---|---|
| W-1 | Whole WP2 bundle disposition: full revert-and-extract (recommended) vs. park-on-branch vs. keep-and-continue-WP2 | Revert-and-extract to `preserve/wp2-*` branches; park bundle in branch without touching master; continue WP2 (not recommended — conflicts with canonical plan) | Working tree unchanged; no commits | 02, D-block items |
| W-2 | Header/Footer target nav label set (exact labels + CTA), incl. removal of Client Sign In and demo links | Per plan §4 (desktop center: Revenue Leaks / How It Works / Evidence / Services & Pricing / About; right: Diagnose My Cash Flow Leaks; mobile: Diagnose My Leaks + menu with Insights, FAQ) | Nav unchanged | 02, W-6 |
| W-3 | `/ops` vs `/explore-demo` duplicate demo routes | Keep one hidden/controlled, redirect the other; or remove both from public builds (recommended) | Both remain; Playwright readiness URL `/ops` depends on choice | 02, W-7 |
| W-4 | `/dashboard` + `/api/ops/*` handling: server-gate + tenant-scope (hardening) vs. quarantine/strip from public build vs. keep behind client-gate as-is (NOT recommended — security-blocked) | Hardening or quarantine | No public deploy until resolved | 02, W-8; security §6 |
| W-5 | `docs/product-proof-register.md` keep as future template vs. archive | Keep in docs/; it drives nothing public | Unchanged | 01 §4 |

---

## 6. Lineage and hygiene items requiring founder confirmation (from reconnaissance, not part of this working tree)

- `livingry-ops-master` (reference-only) and the third stale copy under `sales docs\Overskill Build competition\Current codebase\` — divergence risk; disposition (leave read-only / archive / delete) is a founder call (reconnaissance C3).
- Dead `$799`/fee-waiver strings in `src/lib/ai-blueprint/content.ts` (page 308-redirects today) — safe cleanup once approved (C2).
- Stale sitemap priority comments; duplicate robots disallow; `/what-we-build` stale live-sitemap entry; missing `.env.example` (C3/G12).

---

## 7. Preservation actions taken (READ-ONLY — none executed)

No branches, patches, archives, or commits were created in Phase 0. The preservation plan is:

1. On Phase 1 approval, create branch `preserve/wp2-product-proof` from the current working tree state (captures the untracked WP2 bundle + nav/sitemap/test modifications as one recoverable unit).
2. Then revert the approved REVERT/DISCARD items on `master`; implement target-state header/footer/tests.
3. No deletion without the branch existing; no commit without founder approval of the change set (per production-change-policy).