# Rollback Runbook — Cosmos Umbrella Expansion

**Date:** 2026-07-27  
**Purpose:** Procedure to safely revert the umbrella expansion if needed

---

## Quick Rollback (Recommended)

### Single Git Revert

```bash
# Get the merge commit SHA from the PR
MERGE_SHA="<insert-merge-commit-sha-here>"

# Revert the entire umbrella expansion
git revert $MERGE_SHA

# Push to trigger redeployment
git push origin master
```

**Effect:**  
- Vercel auto-deploys the previous commit
- Homepage reverts to AI-GC-specific positioning
- `/operations`, `/habitats`, `/land-review` become 404s
- Database table `land_potential_review_requests` remains (harmless orphan)

**Recovery Time:** ~2 minutes (Vercel build time)

---

## Database Rollback (Optional)

The migration `sql/migrations/0003_land_potential_review.sql` is purely additive.  
The orphan table is harmless and can be left indefinitely.

### To Explicitly Drop the Table

```sql
-- Connect to production database
-- CAUTION: This deletes all Land Review submissions

DROP TABLE IF EXISTS land_potential_review_requests;
```

**When to Use:**  
- Only if table is consuming significant storage (unlikely)
- Or if preparing for a different data model

**Data Loss:** All Land Review form submissions will be permanently deleted.

---

## Feature Flag Rollback (Not Implemented)

The spec mentioned a feature flag (`LIVINGRY_UMBRELLA_ENABLED`) but this was not implemented because:
1. The spec called for clean separation (umbrella vs. pre-umbrella)
2. Feature flags add complexity without clear benefit
3. Git revert is faster and cleaner for full rollback

### If Feature Flag is Needed in Future

Add to Vercel environment variables:
```
LIVINGRY_UMBRELLA_ENABLED=false
```

Then modify `src/app/page.tsx`:
```typescript
const isUmbrellaEnabled = process.env.LIVINGRY_UMBRELLA_ENABLED !== 'false';

export default function Home() {
  if (!isUmbrellaEnabled) {
    // Render pre-umbrella homepage
    return <PreUmbrellaHomepage />;
  }
  // Current umbrella homepage
  return <UmbrellaHomepage />;
}
```

---

## Partial Rollback Scenarios

### Scenario 1: Disable Land Review Form Only

**File:** `src/app/land-review/page.tsx`

Change the page to display maintenance message:

```typescript
export default function LandReviewPage() {
  return (
    <div className="container section">
      <h1>Land Potential Review — Temporarily Unavailable</h1>
      <p>We are currently updating this service. Please check back soon or email ov@livingry.services.</p>
    </div>
  );
}
```

**Effect:**  
- Form becomes unavailable
- Other Habitat pages remain live
- No database changes needed

---

### Scenario 2: Revert to AI-GC-Only Homepage

**File:** `src/app/page.tsx`

Replace with content from commit before umbrella expansion.

**Effect:**  
- Homepage shows AI-GC positioning again
- `/operations` and `/habitats` remain accessible
- Users can still navigate to practices via header

---

### Scenario 3: Hide Habitats from Navigation

**File:** `src/components/Header.tsx`

Remove Habitats link:

```typescript
const nav = [
  {
    label: "Operations",
    href: "/operations",
    // ... system families submenu
  },
  // Remove or comment out Habitats section
  // {
  //   label: "Habitats",
  //   href: "/habitats",
  // },
  // ...
];
```

**Effect:**  
- Habitats pages exist but are not discoverable from navigation
- Direct URLs still work
- Useful for soft launch or testing

---

## Analytics Rollback

**No action needed.**  
Analytics events are immutable logs:
- `land_review_started`
- `land_review_submitted`
- `land_review_validation_failed`

These events will simply stop firing if the code is reverted. Historical data remains intact.

---

## DNS / URL Rollback

**No DNS changes were made.**  
All new routes are under existing domain:
- `livingry.services/operations`
- `livingry.services/habitats`
- `livingry.services/land-review`

No rollback needed.

---

## Email Notification Rollback

**No action needed.**  
Land Review emails use Resend API with standard configuration.  
If code is reverted, emails simply stop sending.

Existing `LAND_REVIEW_TO` and `LAND_REVIEW_FROM` env vars are harmless if unused.

---

## Sitemap Rollback

Sitemap is generated from code (`src/app/sitemap.ts`).  
Git revert automatically removes umbrella routes from sitemap.

**No manual sitemap editing needed.**

---

## Search Engine Rollback

After reverting:
1. Sitemap updates automatically
2. Search engines will re-crawl and drop 404 pages
3. `llms.txt` reverts to pre-umbrella content

**Timeline:** 1-7 days for major search engines to notice changes.

---

## Risk Assessment

**Low Risk:** Git revert is safe because:
- Migration is additive (no DROP, no ALTER)
- No data loss on code revert
- Vercel handles deployment rollback automatically
- Database table can be left as orphan indefinitely

**Medium Risk:** Partial rollbacks (feature flags, manual edits)
- Introduces complexity
- Potential for inconsistent state
- Requires testing

**Recommendation:** Use full git revert for clean rollback.

---

## Checklist: Before Rollback

- [ ] Identify reason for rollback (bug, business decision, etc.)
- [ ] Notify stakeholders (Michael, users if necessary)
- [ ] Document reason in rollback commit message
- [ ] Verify preview deployment after revert
- [ ] Test critical paths: homepage, /hvac/founding-five, /system-review
- [ ] Monitor analytics for any unexpected behavior

---

## Checklist: After Rollback

- [ ] Verify homepage shows pre-umbrella content
- [ ] Verify `/operations` returns 404
- [ ] Verify `/habitats` returns 404
- [ ] Verify `/land-review` returns 404
- [ ] Verify `/hvac/founding-five` still works
- [ ] Verify sitemap no longer lists umbrella routes
- [ ] Monitor error logs for 404 attempts
- [ ] Communicate rollback completion to stakeholders

---

## Support Contacts

**Technical Issues:**  
Michael (ov@livingry.services)

**Database Access:**  
Vercel Postgres via Vercel dashboard

**Deployment:**  
Vercel auto-deploys on push to master

---

**Prepared by:** Augment Cosmos  
**Date:** 2026-07-27  
**Status:** Ready for use if needed
