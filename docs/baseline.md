# Baseline Metrics — Pre-Umbrella Expansion

**Date:** 2026-07-27  
**Commit SHA:** `0a5aeb350f12f07dc8a113137ecc000748703b7c`  
**Branch:** `master`

## 1. Build Output (Before Changes)

```
▲ Next.js 16.2.10 (Turbopack)
✓ Compiled successfully in 5.0s
✓ Running TypeScript ... Finished TypeScript in 8.0s
✓ Generating static pages (47/47) in 920ms

Route Statistics:
- Static routes (○): 36
- SSG routes (●): 10
- Dynamic API routes (ƒ): 21
- Total: 67 route entries
```

**Build result:** ✅ SUCCESS (no errors, no warnings)

## 2. Test Results (Before Changes)

### Unit Tests
```
Command: npm test
Result: ✅ ALL PASS
Total: 188 tests
Failures: 0
Duration: 2263ms
```

### E2E Tests
```
Command: npx playwright test
Status: Not executed in baseline (manual verification only)
```

## 3. Current Funnel Metrics

**Active funnels:**
- `/hvac/founding-five` → Active HVAC pilot funnel
- `/system-review` → Primary leak assessment CTA
- `/assessment` → 17-point self-assessment

**Dashboard:**
- `/ops` → Public demo (Explore Demo Dashboard)
- `/dashboard` → OTP-gated client workspace

## 4. Conceptual Visuals Status

**Existing illustrative images:**
1. Founder collage (about/proof sections) — ✅ Present
2. HVAC field context — ✅ Present (labelled illustrative/non-identifiable)

**Diagrams (SVG/code-based):**
- OrchestrationGraphic — ✅ Present
- ProcessFlowDiagram — ✅ Present
- RevenueLeakDiagram — ✅ Present

**Assets requiring status badges after umbrella expansion:**
- Habitats design field illustrations — ⏳ Pending (Phase 4)
- Habitats land photo examples — ⏳ Pending (Phase 4)
- Operations platform comparison visual — ⏳ Optional (Phase 3)

## 5. Content Baseline

### Homepage Sections (Current)
1. Hero: "Stop earning revenue you keep walking away from"
2. Direct answer: AI general contracting explanation
3. What we do: 7 system families with GC annotations
4. The method: 5-step framework (Find, Trace, Seal, Verify, Keep)
5. Founder block: Origin story with illustrative collage
6. Industries: 3 industry cards (HVAC active, Roofing next, Professional Practices future)
7. FAQ: 6 questions
8. Proof posture block
9. CTA: "Find My Biggest Leak"

### System Families (7)
1. Response Systems
2. Recovery Systems
3. Customer Continuity
4. Discovery & Trust Systems
5. Knowledge Systems
6. Workflow Systems
7. TradeOps Layer

### Industries (3)
1. HVAC Companies (active)
2. Roofing Companies (next)
3. Professional Practices (future)

## 6. Lighthouse Scores (Target Baseline)

**Note:** Lighthouse scores to be measured on production URLs:
- `/` (homepage)
- `/hvac/founding-five`
- `/system-review`

**Target metrics:**
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

*Scores will be captured during Phase 7 acceptance testing.*

## 7. Key Files to Monitor

**Core content:**
- `src/lib/site.ts` — System families, industries, method (DO NOT CHANGE existing entries)
- `src/lib/faq.ts` — Homepage FAQ (will shrink from 6 to 4)
- `src/lib/system-content.ts` — System detail pages
- `src/lib/industry-content.ts` — Industry detail pages

**Navigation:**
- `src/components/Header.tsx` — Will update `/what-we-build` → `/operations`
- `src/components/Footer.tsx` — Will add new practice links

**Public AI context:**
- `public/llms.txt` — Will add umbrella section
- `public/llms-full.txt` — Will add Operations vs Habitats distinction

**Routes to preserve exactly as-is:**
- `src/app/hvac/founding-five/*` — Active funnel, no changes
- `src/app/system-review/*` — Active CTA target, no changes
- `src/app/ops/*` — Demo dashboard, no changes

## 8. Database Schema Baseline

**Existing tables (from migrations):**
- `sql/schema.sql` — Core schema
- `sql/migrations/0001_ops_config.sql` — Ops dashboard config
- `sql/migrations/0002_hvac_founding_five.sql` — HVAC pilot requests table

**New migration to add:**
- `sql/migrations/0003_land_potential_review.sql` — Land review requests (Phase 5)

## 9. Bundle Size Baseline

*Bundle sizes will be captured after first successful build and compared post-implementation.*

**Key metrics to track:**
- Homepage bundle size
- Total static asset size
- Number of chunks

## 10. Pre-Existing Issues

**Known baseline state:**
- ✅ All 188 unit tests passing
- ✅ Build succeeds with no errors
- ⚠️ 3 high severity npm audit vulnerabilities (pre-existing, not addressed in this pass)
- ✅ No TypeScript errors
- ✅ All routes resolve successfully

---

**Status:** Baseline audit complete. Ready to proceed with Phase 1 (Homepage rebuild).

