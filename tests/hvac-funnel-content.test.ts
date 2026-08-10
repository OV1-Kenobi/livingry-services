import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as content from "../src/lib/hvac-funnel/content";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";
import {
  BLUEPRINT_APPLY_HREF,
  HVAC_FUNNEL_ROUTE,
  hero,
  founderStory,
  fourLeaks,
  humanControl,
  offer,
  deliverables,
  riskReversal,
  foundingFive,
  qualification,
  howItWorks,
  proofArchitecture,
  faq,
  finalCta,
  estimateRecoveryPositioning,
  agenticSearchPositioning,
  applicationFields,
  buildHvacFunnelServiceLd,
  buildHvacFunnelFaqLd,
  buildHvacFunnelBreadcrumbLd,
} from "../src/lib/hvac-funnel/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const pageSource = readFileSync(
  resolve(root, "src/app/industries/hvac/page.tsx"),
  "utf8",
);

// Recursively collect every string value exported by the content module.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collectStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collectStrings(x, out));
}

const copyStrings: string[] = [];
for (const value of Object.values(content)) {
  collectStrings(value, copyStrings);
}
const copyBlob = copyStrings.join("\n");

// Marketing-claim blob: visitor-facing positive copy only, excluding the
// guardrail/rule lists that name banned things (e.g. "No fake countdown
// timers", "Unverified ROI claims", "Wants guaranteed revenue..."). Those
// are disqualifiers, not claims — scanning them raw would flag the very
// phrases we are forbidding, mirroring how the shared content tests exclude
// guardrail exports. We collect everything EXCEPT the named rule arrays and
// disclaimer notes that explicitly negate a banned thing.
const GUARDRAIL_PHRASES = new Set([
  ...foundingFive.rules,
  ...foundingFive.neverUse,
  ...proofArchitecture.notAllowed,
  ...estimateRecoveryPositioning.importantRestrictions,
  foundingFive.applicationOpenNote,
  "Wants guaranteed revenue without participation",
  "Wants unsupervised systems making consequential commitments",
]);
const claimStrings = copyStrings.filter((s) => !s.endsWith("?") && !GUARDRAIL_PHRASES.has(s));
// Negated honest-copy phrases (e.g. "Livingry does not guarantee revenue...")
// name the banned thing while disclaiming it; strip them before positive-claim
// scanning, mirroring the shared founding-five content test.
const negatedCopy = [riskReversal.body, ...faq.map((f) => f.a)];
let claimBlob = claimStrings.join("\n");
for (const s of negatedCopy) claimBlob = claimBlob.split(s).join("");

// --- Acceptance criteria from the ticket ------------------------------------

test("route is the canonical /industries/hvac", () => {
  assert.equal(HVAC_FUNNEL_ROUTE, "/industries/hvac");
});

test("the page uses the Hook -> Story -> Mechanism -> Offer sequence", () => {
  // The page must render the four sections in order: hero, founder story,
  // four leaks, then offer. We assert by the heading ids in source order.
  const heroIdx = pageSource.indexOf('id="hvac-hero-heading"');
  const founderIdx = pageSource.indexOf('id="hvac-founder-heading"');
  const leaksIdx = pageSource.indexOf('id="hvac-leaks-heading"');
  const offerIdx = pageSource.indexOf('id="hvac-offer-heading"');
  assert.ok(heroIdx > -1 && founderIdx > -1 && leaksIdx > -1 && offerIdx > -1);
  assert.ok(heroIdx < founderIdx, "hero before founder story");
  assert.ok(founderIdx < leaksIdx, "founder story before four leaks");
  assert.ok(leaksIdx < offerIdx, "four leaks before offer");
});

test("the H1 is the exact ticket headline", () => {
  assert.equal(hero.headline, "You may not need more leads. You may need fewer leaks.");
  // The page renders the headline via the content constant, so the verbatim
  // string lives in the content module and is referenced by JSX in the page.
  assert.ok(pageSource.includes("hero.headline"), "H1 headline is rendered from the content constant");
});

test("Michael's founder story appears immediately after the hero", () => {
  // After the hero section closes, the next section is the founder story.
  const heroSectionEnd = pageSource.indexOf('id="hvac-hero-heading"');
  const founderSectionStart = pageSource.indexOf('id="hvac-founder-heading"');
  assert.ok(heroSectionEnd > -1 && founderSectionStart > -1);
  // No other top-level section heading appears between them.
  const between = pageSource.slice(heroSectionEnd, founderSectionStart);
  assert.doesNotMatch(between, /<h2[^>]*id="(hvac-leaks|hvac-control|hvac-offer|hvac-deliverables)/);
});

test("the three foundations plus the first upgrade are the mechanism above the offer", () => {
  assert.equal(fourLeaks.leaks.length, 4);
  const names = fourLeaks.leaks.map((l) => l.name);
  assert.deepEqual(names, [
    "Missed-Call Recovery",
    "Dropped-Estimate Recovery",
    "Agentic Search Optimization",
    "Client Reactivation — the first upgrade",
  ]);
  assert.match(fourLeaks.framing, /one Revenue Continuity System/i);
  assert.match(fourLeaks.categoryLine, /not lead generation/i);
  // The leaks section appears before the offer section.
  assert.ok(
    pageSource.indexOf('id="hvac-leaks-heading"') < pageSource.indexOf('id="hvac-offer-heading"'),
  );
});

test("the Founding Five pilot is presented at the always-visible $2,500 all-in price", () => {
  assert.equal(offer.price, "$2,500 all-in");
  assert.match(offer.offerName, /Founding Five Tier 2 Pilot/);
  assert.match(offer.offerDescription, /all-in pilot for five HVAC\/R companies/);
  // The page renders price and offer name via the content constants.
  assert.ok(pageSource.includes("offer.price"), "$2,500 price is rendered from the content constant");
  assert.ok(pageSource.includes("offer.offerName"), "offer name is rendered from the content constant");
});

test("pilot deliverables include both pilot foundations by their operating names", () => {
  const names = deliverables.items.map((i) => i.name);
  assert.ok(names.includes("Dropped-Estimate Recovery"));
  assert.ok(names.includes("Agentic Search Optimization"));
  assert.equal(
    deliverables.newDeliverables.estimateRecoveryScan.name,
    "Dropped-Estimate Recovery (pilot foundation)",
  );
  assert.equal(
    deliverables.newDeliverables.agenticSearchAudit.name,
    "Agentic Search Optimization (pilot foundation)",
  );
});

test("Dropped-Estimate Recovery is an included pilot foundation, not a shipped tool", () => {
  assert.match(estimateRecoveryPositioning.heading, /after the pilot/);
  assert.match(estimateRecoveryPositioning.prePositioningLine, /first a-la-carte upgrade/);
  assert.match(estimateRecoveryPositioning.approvedPositioning, /a la carte/);
  // The copy must NOT claim it is already shipped or integrated with named CRMs.
  const erBlob = [
    estimateRecoveryPositioning.prePositioningLine,
    estimateRecoveryPositioning.approvedPositioning,
    deliverables.newDeliverables.estimateRecoveryScan.definition,
    deliverables.newDeliverables.estimateRecoveryScan.positioningRule,
  ].join("\n");
  assert.doesNotMatch(erBlob, /already shipped/i);
  assert.doesNotMatch(erBlob, /is integrated with ServiceTitan/i);
  // The FAQ must say reactivation is a-la-carte, not an included pilot workflow.
  const erFaq = faq.find((f) => /Is Client Reactivation included/i.test(f.q));
  assert.ok(erFaq);
  assert.match(erFaq.a, /first a-la-carte upgrade/i);
});

test("no outcome guarantee is claimed; the Recovery Ledger is the only measure", () => {
  assert.match(riskReversal.heading, /Outcome guarantees\? No/);
  assert.match(riskReversal.body, /does not guarantee revenue/i);
  assert.match(riskReversal.body, /Recovery Ledger/);
  assert.match(riskReversal.body, /\$1,000\/week/);
  assert.match(riskReversal.body, /\$10,000/);
  assert.match(riskReversal.ruleNote, /not a promise/);
  // The claim blob excludes guardrail rule lists and the qualification
  // weak-fit disqualifier ("Wants guaranteed revenue without participation"),
  // which names the concern being declined rather than making a claim.
  assert.doesNotMatch(claimBlob, /guarantee[d]? revenue/i);
  assert.doesNotMatch(claimBlob, /\bROI\b/i);
});

test("the page retains human-approval and existing-stack compatibility language", () => {
  assert.match(humanControl.humanControlLine, /human approval/i);
  assert.match(humanControl.rooftopLine, /human from the loop/i);
  assert.match(humanControl.ideas.join(" "), /existing CRM/i);
  // The page renders the rooftop line via the content constant.
  assert.ok(pageSource.includes("humanControl.rooftopLine"), "rooftop line is rendered from the content constant");
  // Trust strip preserves human-approval language.
  assert.ok(hero.trustStrip.some((t) => /human approval/i.test(t)));
});

test("unsupported timeline claims are removed", () => {
  // The ticket explicitly bans "typically measurable in the first month" and
  // "visible by month three" style claims. Claim copy must not include them.
  assert.doesNotMatch(claimBlob, /first full month/i);
  assert.doesNotMatch(claimBlob, /visible by month three/i);
  assert.doesNotMatch(claimBlob, /measurable in the first month/i);
  assert.doesNotMatch(claimBlob, /typically measurable/i);
});

test("no fabricated proof, false urgency, or unsupported results claims appear", () => {
  // The claim blob excludes guardrail rule lists (which name the banned
  // things, e.g. "No fake countdown timers", "Unverified ROI claims") and
  // the qualification weak-fit disqualifiers.
  assert.deepEqual(findProhibitedClaims(claimBlob), []);
  // No fake countdown timers or evergreen urgency in the positive copy.
  assert.doesNotMatch(claimBlob, /countdown timer/i);
  assert.doesNotMatch(claimBlob, /evergreen urgency/i);
  // Founding Five scarcity is application-open, not fake "only X left".
  assert.match(foundingFive.applicationOpenNote, /exactly five HVAC\/R companies/);
  assert.match(foundingFive.applicationOpenNote, /no countdown timers/);
  assert.match(foundingFive.applicationOpenNote, /manually maintained/);
  // Proof architecture forbids fabricated testimonials / composite case studies.
  assert.ok(proofArchitecture.notAllowed.includes("Fabricated testimonials"));
  assert.ok(proofArchitecture.notAllowed.includes("Composite case studies presented as real"));
});

test("all primary CTAs route into the Founding Five scorecard flow", () => {
  assert.equal(BLUEPRINT_APPLY_HREF, "/hvac/founding-five#scorecard");
  // Every primary CTA on the page points to the scorecard flow via the shared
  // BLUEPRINT_APPLY_HREF constant. Count the Link occurrences referencing it
  // (excluding the import line).
  const usages = pageSource.split("href={BLUEPRINT_APPLY_HREF}").length - 1;
  assert.ok(usages >= 3, `expected at least 3 primary CTAs, found ${usages}`);
  // The hero primary CTA, the offer primary CTA, and the final CTA all use it.
  assert.ok(
    pageSource.includes("href={BLUEPRINT_APPLY_HREF}"),
    "primary CTAs use the shared scorecard href constant",
  );
  // The hero secondary CTA scrolls to the Founding Five path section (anchor link).
  assert.ok(pageSource.includes('href="#pilot-path"'));
});

test("how it works is the 5-step scorecard-to-ledger path in the exact order", () => {
  assert.equal(howItWorks.steps.length, 5);
  const names = howItWorks.steps.map((s) => s.name);
  assert.deepEqual(names, [
    "Scorecard",
    "Human review and fit call",
    "Assessment + Tenant Integration",
    "Three-foundation launch",
    "Ledger and weekly review",
  ]);
});

test("qualification covers strong fit and weak fit", () => {
  assert.ok(qualification.strongFit.length >= 7);
  assert.ok(qualification.weakFit.length >= 5);
  assert.match(qualification.headline, /established operation/i);
  assert.match(qualification.strongFit.join(" "), /U\.S\.-based HVAC\/R/);
  assert.match(qualification.strongFit.join(" "), /3–12 trucks/);
  assert.match(qualification.weakFit.join(" "), /guaranteed revenue without participation/i);
});

test("FAQ retains the required questions and the pilot-specific additions", () => {
  const qs = faq.map((f) => f.q);
  assert.ok(qs.some((q) => /switch CRMs/i.test(q)));
  assert.ok(qs.some((q) => /AI answering service/i.test(q)));
  assert.ok(qs.some((q) => /all-in price/i.test(q)));
  assert.ok(qs.some((q) => /Client Reactivation included/i.test(q)));
  assert.ok(qs.some((q) => /\$10,000 recovery threshold/i.test(q)));
  assert.ok(qs.some((q) => /Livingry is not a fit/i.test(q)));
});

test("final CTA headline and primary CTA match the scorecard funnel", () => {
  assert.equal(finalCta.headline, "Find the leak before you buy more traffic.");
  assert.match(finalCta.primaryCta, /Take the 15-Minute Revenue Leak Scorecard/);
  assert.match(finalCta.microcopy, /Scorecard-based/);
  assert.match(finalCta.microcopy, /does not obligate either party/i);
});

test("founder proof boundary: 30% is Michael's estimate, not audited revenue", () => {
  const joined = founderStory.body.join(" ");
  assert.match(joined, /less than 30%/);
  assert.match(joined, /not as an audited revenue figure/i);
  assert.match(joined, /not as a client result/i);
  assert.match(joined, /not as an HVAC industry benchmark/i);
  assert.match(founderStory.boundaryNote, /not client case studies/i);
  assert.match(founderStory.boundaryNote, /unrealized productive capacity/i);
});

test("agentic-search foundation is framed as included, not a rankings promise", () => {
  assert.match(agenticSearchPositioning.importantRule, /included pilot foundation/i);
  assert.match(agenticSearchPositioning.importantRule, /not a promise of rankings/i);
  assert.match(agenticSearchPositioning.agenticSearchLine, /answer engines/i);
  assert.ok(agenticSearchPositioning.focusAreas.length >= 6);
});

test("scorecard application fields match the live intake form", () => {
  const joined = applicationFields.join(" ");
  assert.ok(applicationFields.includes("Company name"));
  assert.ok(applicationFields.includes("Active field vehicles/teams"));
  assert.ok(applicationFields.includes("Current FSM / CRM"));
  assert.match(joined, /Top two leaks/i);
  assert.match(joined, /Record readiness/);
});

test("structured data is accurate and uses safe schema types", () => {
  const serviceLd = buildHvacFunnelServiceLd();
  assert.equal(serviceLd["@type"], "Service");
  assert.equal(serviceLd.areaServed.name, "United States");
  assert.match(serviceLd.audience.audienceType, /HVAC/i);
  assert.equal(serviceLd.offers.price, "2500");
  assert.equal(serviceLd.offers.priceCurrency, "USD");

  const faqLd = buildHvacFunnelFaqLd();
  assert.equal(faqLd["@type"], "FAQPage");
  assert.equal(faqLd.mainEntity.length, faq.length);

  const crumbs = buildHvacFunnelBreadcrumbLd();
  assert.equal(crumbs["@type"], "BreadcrumbList");
  const last = crumbs.itemListElement[crumbs.itemListElement.length - 1];
  assert.match(String(last.item), /\/industries\/hvac$/);
});

test("the page is a server component (no 'use client')", () => {
  assert.doesNotMatch(pageSource, /^["']use client["']/m);
  assert.ok(pageSource.includes('id="hvac-hero-heading"'), "hero heading is rendered");
});

test("no trademark clutter or fabricated case-study names in the funnel copy", () => {
  assert.doesNotMatch(copyBlob, /™/);
  // Reuse the fabrication guardrails from the shared content module.
  const { findFabrications } = require("../src/lib/hvac-founding-five/content");
  assert.deepEqual(findFabrications(copyBlob), []);
});
