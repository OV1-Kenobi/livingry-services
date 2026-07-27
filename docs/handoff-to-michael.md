# Handoff to Michael — Cosmos Umbrella Expansion

**Date:** 2026-07-27  
**Status:** Ready for client authorship and legal review

---

## Copy Slots Requiring Michael's Authorship

All Habitat practice pages use `TODO(michael):` markers to prevent AI fabrication. Below is the complete list of copy slots awaiting your authorship.

### /habitats Page (19 markers)

1. **Hero supporting copy** (line 37)
   - Context: Below "Explore what your land could responsibly become."
   - Guidance: ~30-50 words, sets tone for regenerative development

2-7. **Six design field descriptions** (lines 71, 77, 84, 91, 98, 105)
   - Land and water systems
   - Human patterns (Pattern Language)
   - Climate and envelope
   - Natural construction materials
   - Private home systems
   - Energy and compute systems
   - Guidance: Each ~40-80 words explaining the design field

8. **Material principle body** (line 122)
   - Context: Under "No material ideology."
   - Guidance: ~60-120 words explaining your philosophy on material selection

9-11. **Three service level descriptions** (lines 141, 153, 165)
   - Land Potential Review
   - Habitat Feasibility Study
   - Development Formation
   - Guidance: Each ~50-100 words describing the service offering

12-17. **Six ideal partner types** (lines 187-192)
   - Guidance: Each ~15-30 words describing a type of ideal landowner partner

18-19. **Additional body content** (discovered during implementation)
   - Design fields section intro
   - Material principle elaboration

### /habitats/land-potential-review Page (11 markers)

1. **Page title** (line 35)
   - Context: Hero H1, currently empty string
   - Guidance: Concise title for Land Potential Review service

2. **Page lede** (line 36)
   - Context: Hero supporting text
   - Guidance: ~30-50 words

3-6. **Four "What we explore" sections** (lines 67, 74, 81, 88)
   - Development constraints
   - Site opportunities
   - System requirements
   - Next investigations
   - Guidance: Each ~60-120 words

7. **Deliverables section** (line 103)
   - Context: "What you receive"
   - Guidance: ~80-150 words listing review deliverables

8. **Process section** (line 116)
   - Context: "How it works"
   - Guidance: ~100-200 words describing the review workflow

9-11. **Section heading comments** (lines 57, 97, 110)
   - Internal documentation comments

### /land-review Form Page (2 markers)

1. **Hero subhead** (src/app/land-review/page.tsx line 36)
   - Context: Below "What could your land responsibly become?"
   - Guidance: ~30 words, per spec §6.5

2-3. **Confirmation message** (src/app/land-review/LandReviewForm.tsx lines 140, 143)
   - Heading for successful submission
   - Body copy explaining next steps
   - Guidance: Professional, warm, sets expectations

---

## Legal Review Markers

All `<!-- LEGAL_NEEDS_REVIEW -->` markers requiring pre-deploy legal review:

### /operations Page

**Location:** Platform comparison table (line 185)
**Marker:** `<!-- LEGAL_NEEDS_REVIEW: comparative marketing claim -->`
**Context:** 7-row comparison table contrasting "Generic AI platform" vs. "Livingry Operations"
**Concern:** Comparative marketing claims about competitors
**Recommendation:** Review for substantiation and avoid absolute/unverifiable claims

### Professional Boundary Banners

**Pages:** `/habitats`, `/habitats/land-potential-review`, `/land-review`
**Text (verbatim):**
> Livingry Habitats begins with development strategy, systems design, feasibility, and partner coordination. Licensed architecture, engineering, surveying, environmental work, permitting, and construction are performed or approved by qualified professionals in the project jurisdiction.

**Concern:** Professional licensing disclaimers
**Recommendation:** Verify language accurately describes scope of services and jurisdictional boundaries

### Consent Language

**Page:** `/land-review` (bottom of page)
**Text (verbatim):**
> Submitting this form does not create an architect-client, engineer-client, contractor-client, brokerage, fiduciary, investment-advisory, or capital-placement relationship.

**Concern:** Relationship formation disclaimer
**Recommendation:** Confirm this language is sufficient for your risk profile

---

## Habitats Assets to Source (Optional)

Per spec §8.5, no Habitats visual assets were created. Consider sourcing:

1. **Land/site photos** — Central Texas landscape examples
2. **Design collage** — Pattern Language / permaculture / natural building visual
3. **Habitat hero image** — Regenerative development context (non-stock)

All existing assets (founder-origin-collage, HVAC field images, orchestration diagram) remain unchanged.

---

## Routes Intentionally NOT Created (Per Spec §2.4)

The following Habitats routes were explicitly deferred to future phases:
- `/habitats/feasibility`
- `/habitats/natural-building`
- `/habitats/private-home`
- `/habitats/energy`
- `/habitats/partners`

---

## Final Checklist for Michael

- [ ] Review all 32 TODO(michael) copy slots
- [ ] Author Habitat prose in your voice (no AI fabrication)
- [ ] Review 3 legal markers with counsel
- [ ] Verify professional boundary banner language
- [ ] Verify consent language on /land-review
- [ ] Source Habitats visual assets (optional)
- [ ] Review umbrella homepage positioning
- [ ] Test /land-review form submission end-to-end
- [ ] Deploy to preview environment
- [ ] Final approval for production

---

**Prepared by:** Augment Cosmos  
**Date:** 2026-07-27
