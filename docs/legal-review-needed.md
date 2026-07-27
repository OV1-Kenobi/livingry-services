# Legal Review Needed — Umbrella Expansion

**Date:** 2026-07-27  
**Review Type:** Pre-deployment legal review  
**Reviewer:** TBD (Michael's counsel)

---

## Overview

This document inventories all inline `<!-- LEGAL_NEEDS_REVIEW -->` markers added during the Cosmos Umbrella Expansion, plus critical legal text that should be reviewed before production deployment.

---

## 1. Comparative Marketing Claims

**File:** `src/app/operations/page.tsx`  
**Line:** ~185  
**Marker:** `<!-- LEGAL_NEEDS_REVIEW: comparative marketing claim -->`

**Context:**  
Platform comparison table contrasting "Generic AI platform" with "Livingry Operations" across 7 dimensions:
- Starts with available agents vs. operational leak
- Broad generic workflows vs. industry-specific policy packs
- Measures tasks vs. operational outcomes
- Platform-controlled memory vs. governed portable context
- Encourages broad autonomy vs. assigns bounded authority
- Depends on one ecosystem vs. coordinates replaceable specialist tools
- Self-service configuration vs. expert-led implementation

**Legal Question:**  
Are these comparative claims substantiated? Do they risk triggering comparative advertising scrutiny or competitor challenges?

**Recommendation:**  
- Verify all claims are defensible
- Consider softening language ("typically" / "often" vs. absolute statements)
- Ensure no specific competitors are named or identifiable

---

## 2. Professional Boundary Disclaimer (Habitats Practice)

**Files:**
- `src/app/habitats/page.tsx` (line ~44)
- `src/app/habitats/land-potential-review/page.tsx` (line ~44)
- `src/app/land-review/page.tsx` (line ~56)

**Text (verbatim):**
> Livingry Habitats begins with development strategy, systems design, feasibility, and partner coordination. Licensed architecture, engineering, surveying, environmental work, permitting, and construction are performed or approved by qualified professionals in the project jurisdiction.

**Legal Questions:**
1. Does this language adequately disclaim professional licensing responsibilities?
2. Is "the project jurisdiction" sufficiently clear?
3. Are there any state-specific (Texas) requirements for construction/design disclaimers?
4. Does the banner need to be more prominent or carry specific formatting?

**Recommendation:**  
Review with Texas-licensed architect or construction attorney to confirm adequacy for Central Texas market.

---

## 3. Relationship Formation Disclaimer

**File:** `src/app/land-review/page.tsx`  
**Line:** ~69

**Text (verbatim):**
> Submitting this form does not create an architect-client, engineer-client, contractor-client, brokerage, fiduciary, investment-advisory, or capital-placement relationship.

**Legal Questions:**
1. Is this list exhaustive for the Habitats practice?
2. Should it explicitly mention "no legal advice" or other professional services?
3. Does submitting the form create ANY relationship that should be disclosed?
4. Is placement (below the form, small text) legally sufficient?

**Recommendation:**  
Verify this disclaimer is enforceable and comprehensive for your intended service scope.

---

## 4. Data Collection & Privacy (Land Review Form)

**File:** `src/app/api/land-review/route.ts`  
**Database Table:** `land_potential_review_requests`

**Data Collected:**
- Name, email, property location
- Vision (free-text up to 2000 chars)
- Acreage estimate
- Site control status
- Optional: parcel ID, survey URL, existing improvements, timeline, budget range, referral source

**Legal Questions:**
1. Does current privacy policy cover this data collection?
2. Are there Texas-specific privacy requirements for collecting property information?
3. Is consent language adequate? (Currently: form submission implies consent)
4. Data retention: How long should records be kept?

**Recommendation:**  
Confirm privacy policy accurately describes Land Review data collection and use.

---

## 5. Email Communications

**Implemented:**
- Resend email notifications to `LAND_REVIEW_TO` (default: ov@livingry.services)
- No automated applicant acknowledgment (unlike HVAC Founding Five)

**Legal Questions:**
1. Should applicants receive confirmation email with terms restated?
2. Are there CAN-SPAM or other email compliance requirements?
3. Should emails include unsubscribe mechanism?

**Recommendation:**  
Consider adding applicant confirmation email with terms and next-step expectations.

---

## 6. Rate Limiting & Bot Protection

**Implemented:**
- 5 requests per hour per IP (in-memory, per-instance)
- Honeypot field for bot detection

**Legal Question:**  
Is rate limiting mechanism discriminatory or does it create access barriers requiring disclosure?

**Recommendation:**  
Document rate limit policy in terms of service or privacy policy.

---

## 7. Consent Version Tracking

**Implemented:**  
`consent_version: "v1"` stored in database for all Land Review submissions.

**Legal Question:**  
When consent language changes, is version tracking mechanism sufficient for demonstrating which terms user agreed to?

**Recommendation:**  
Store full consent text per version in separate table for audit trail.

---

## Summary of Action Items

1. **High Priority:**
   - [ ] Review comparative marketing table with counsel
   - [ ] Verify professional boundary disclaimer language
   - [ ] Verify relationship formation disclaimer language
   - [ ] Confirm privacy policy covers Land Review data collection

2. **Medium Priority:**
   - [ ] Consider applicant confirmation email
   - [ ] Review email compliance requirements
   - [ ] Document rate limiting policy

3. **Low Priority:**
   - [ ] Consider full consent text versioning
   - [ ] Review accessibility of disclaimers

---

## Notes

- All markers are inline as HTML comments: `<!-- LEGAL_NEEDS_REVIEW -->`
- No legal text was AI-fabricated; all professional disclaimers copied from spec
- This inventory should be reviewed BEFORE production deployment
- Code is deployment-ready from engineering perspective; legal review is blocking

---

**Prepared by:** Augment Cosmos  
**Date:** 2026-07-27  
**Status:** Pending legal review
