# Site Architecture Audit — Baseline (Phase 0)

**Date:** 2026-07-27
**Purpose:** Pre-umbrella expansion baseline audit per §1.2 of umbrella spec

## 1. Dependency Versions

- **Next.js:** 16.2.10
- **React:** 19.2.4
- **TypeScript:** 5
- **Node runtime:** Specified in all API routes
- **Lockfile:** `package-lock.json` (npm)
- **Next.js docs path:** `node_modules/next/dist/docs/` (to be checked after install)

### Key Dependencies

```json
{
  "next": "16.2.10",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "pg": "8.13.1",
  "resend": "^6.17.2",
  "nostr-tools": "2.24.0",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4"
}
```

## 2. Existing Route Tree

### App Directory Routes (`src/app/`)

**Pages (page.tsx):**
- `/` (homepage)
- `/about`
- `/agents`
- `/assessment`
- `/dashboard`
- `/dashboard/events`
- `/dashboard/exceptions`
- `/dashboard/identity`
- `/dashboard/integrations`
- `/dashboard/ops-center`
- `/explore-demo`
- `/faq`
- `/how-it-works`
- `/hvac/founding-five`
- `/industries`
- `/industries/[slug]` (hvac, roofing, professional-practices)
- `/insights`
- `/insights/ai-for-hvac-companies`
- `/ops`
- `/privacy`
- `/proof`
- `/system-review`
- `/systems/[slug]` (7 system families)
- `/terms`
- `/what-we-build` ← **Will redirect to /operations**
- `/why-livingry`

**API Routes (route.ts):**
- `/api/dashboard-auth/relays`
- `/api/dashboard-auth/send`
- `/api/dashboard-auth/session`
- `/api/dashboard-auth/verify`
- `/api/hvac-founding-five` (POST)
- `/api/ops/config` (GET/POST)
- `/api/ops/dashboard` (GET)
- `/api/ops/exceptions`, `/api/ops/exceptions/[id]`
- `/api/ops/integrations`, `/api/ops/integrations/[id]`
- `/api/ops/opportunities`
- `/api/ops/promises`, `/api/ops/promises/[id]`
- `/api/ops/setup`
- `/api/ops/tasks`, `/api/ops/tasks/[id]`
- `/api/ops/tenant`
- `/api/system-review` (POST)

**Generated Routes:**
- `/robots.txt`
- `/sitemap.xml`

## 3. Sitemap vs Actual Routes

Sitemap currently includes 26 static routes. All routes in sitemap resolve to actual pages. No orphaned sitemap entries detected.

## 4. Existing Redirects

**In `next.config.ts`:**
```typescript
{
  source: "/industries/hvac/founding-five",
  destination: "/hvac/founding-five",
  permanent: true
}
```

**Action required:** Add `/what-we-build` → `/operations` redirect (permanent 301)

## 5. Navigation Structure

### Header.tsx Navigation
- "What We Build" → `/what-we-build` (dropdown with 7 system families)
- "Industries" → `/industries` (dropdown: HVAC, HVAC Founding Five, Roofing, Professional Practices)
- "How It Works" → `/how-it-works` (dropdown: Framework, 17-Point Assessment)
- "Explore Demo Dashboard" → `/ops`
- "Why Livingry" → `/about`
- "Proof" → `/proof`
- "Insights" → `/insights`
- "FAQ" → `/faq`
- CTA: "Find My Biggest Leak" → `/system-review`
- "Client Sign In" → `/dashboard`

### Footer.tsx Structure
- Seven system families (linked)
- Three industries (linked)
- Company links: How It Works, Assessment, Why Livingry, Proof, The Livingry Idea, Insights, FAQ, For AI Agents, System Review
- Legal: Privacy, Terms, Email contact

## 6. Reusable Components Inventory

- `Header.tsx` (client component with dropdown nav)
- `Footer.tsx` (server component)
- `Logo.tsx`
- `PageHero.tsx`, `Breadcrumbs`, `EndCta` (PageHero module)
- `JsonLd.tsx` (structured data)
- `BreadcrumbLd.tsx`
- `IllustrativeImage.tsx`
- `Reveal.tsx`
- Diagrams: `OrchestrationGraphic`, `ProcessFlowDiagram`, `RevenueLeakDiagram`
- Ops Dashboard: `OpsDashboard`, `ApprovalQueue`, `CategoryDetail`, `LifecycleFlow`, `ProofLedger`, `ScenarioPanel`

## 7. Content Source Model

**Single source of truth:** `src/lib/site.ts`
- System families (7)
- Industries (3: HVAC, Roofing, Professional Practices)
- Method steps (5: Find, Trace, Seal, Verify, Keep)
- Positioning copy (headline, subhead, definition)
- Contact info, booking URL

**Extended content:** `src/lib/system-content.ts`, `src/lib/industry-content.ts`, `src/lib/faq.ts`

## 8. Schema Generation

- **JsonLd component:** `src/components/JsonLd.tsx`
- **Pattern:** Inline `<JsonLd data={...}>` per page
- **Schema types in use:** Organization, Service, FAQPage, Article, BreadcrumbList
- **Global Organization schema:** Defined in `src/app/layout.tsx`
- **Page-specific schemas:** Homepage (FAQPage), Systems (Service + FAQPage), Industries, Insights articles (Article + FAQPage)

## 9. Sitemap, Robots, llms.txt

- **Sitemap:** `src/app/sitemap.ts` (generates dynamic sitemap from static routes + insights articles)
- **Robots:** `src/app/robots.ts` (permits all crawlers, references sitemap)
- **llms.txt:** `public/llms.txt` (AI-readable summary)
- **llms-full.txt:** `public/llms-full.txt` (detailed AI context)

## 10. API Routes Patterns

### Validation Pattern
- Isomorphic validation functions (client + server share same logic)
- Example: `src/lib/hvac-founding-five/validation.ts`
- Field-level error messages
- Email regex, phone normalization, URL normalization

### Persistence Pattern
- Interface-based stores (`InMemoryRequestStore`, `PgRequestStore`)
- Database: Neon Postgres via `DATABASE_URL` env var
- Fallback: In-memory store for staging
- Example: `src/lib/hvac-founding-five/store.ts`

### Rate Limiting
- In-memory, per-key rate limiting
- Default: 5 requests per hour per key
- Example: `src/lib/hvac-founding-five/rate-limit.ts`

### Analytics Events
- Server-side event recording
- PII rejection
- Example: `src/lib/hvac-founding-five/analytics.ts`

## 11. Environment Variables

**Required:**
- `DATABASE_URL` (Neon Postgres connection string)
- `RESEND_API_KEY` (email sending via Resend)

**HVAC-specific:**
- `HVAC_OWNER_ID` (default owner for HVAC requests)
- `HVAC_OWNER_EMAIL` (notification recipient)
- `SHOW_HVAC_PILOT_PRICE` (feature flag for pricing display)

**System Review:**
- `SYSTEM_REVIEW_TO` (default: ov@livingry.services)
- `SYSTEM_REVIEW_FROM` (default: Livingry Services <noreply@livingry.services>)
- `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_TOKEN` (optional)

## 12. Testing Infrastructure

### Unit Tests
- **Runner:** `node --import tsx --test tests/*.test.ts`
- **Total:** 19 test files, 188 tests
- **Coverage:** AI general contracting content, assessment scoring, HVAC pipeline, ops config, ops flow model, insights article, visual system routes

### E2E Tests
- **Framework:** Playwright
- **Runner:** `npx playwright test`
- **Files:** 4 E2E specs (`ai-general-contracting.spec.ts`, `assessment.spec.ts`, `ops-flow.spec.ts`, `visual-qa.spec.ts`)

## 13. Deployment

- **Platform:** Vercel
- **Trigger:** Auto-deploy from `master` branch
- **Production URL:** https://livingry-services.vercel.app
- **Deployment config:** Vercel integration (Neon Postgres, auto environment variables)

## 14. Pre-Existing Test Results

**Build:** ✅ SUCCESS (npm run build)
- Compiled successfully in 5.0s
- TypeScript completed in 8.0s
- 47 routes generated

**Unit Tests:** ✅ ALL PASS (npm test)
- 188 tests pass
- 0 failures
- Duration: 2263ms

**E2E Tests:** Not run in baseline (requires explicit execution)

## 15. Constraints (Must NOT violate)

Per §1.4 of spec:
- ❌ Do not change `src/lib/site.ts` system families, industries, or method steps
- ❌ Do not touch `src/app/hvac/founding-five/` except as specified
- ❌ Do not modify `sql/schema.sql` except by adding new migrations
- ❌ Do not delete the existing redirect in `next.config.ts`
- ❌ Do not introduce new dependencies without explicit comment
- ❌ Do not change package name (`livingry`)
- ❌ Do not change default branch (`master`)
- ✅ App Router, server components by default; `"use client"` explicit per-component
- ✅ No auth library (bespoke OTP for dashboard)

## 16. Build Output Analysis

**Route Statistics:**
- Static routes (○): 36
- SSG routes (●): 10 (industries/[slug], systems/[slug])
- Dynamic routes (ƒ): 21 (API routes)
- Total: 67 route entries

**Build Hash:** Will be captured in baseline.md after initial build

---

**Next Steps:** Proceed to Phase 1 (Homepage rebuild) after baseline.md is complete.

