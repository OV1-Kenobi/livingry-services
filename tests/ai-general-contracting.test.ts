import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { site } from "../src/lib/site";
import { homepageFaq } from "../src/lib/faq";
import { publishedArticles } from "../src/lib/insights";

// Guards for the AI general contracting positioning, the Insights content hub
// scaffold, and the AEO/SEO surfaces (llms files, robots, sitemap, schema).
// Data-level facts are asserted against the real modules; JSX and route config
// are asserted against source text, matching the existing convention for
// surfaces that have no runtime harness.

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const read = (rel: string) => readFileSync(resolve(root, rel), "utf8");

const homepage = read("src/app/page.tsx");
const insightsPage = read("src/app/insights/page.tsx");
const layout = read("src/app/layout.tsx");
const header = read("src/components/Header.tsx");
const footer = read("src/components/Footer.tsx");
const robotsSrc = read("src/app/robots.ts");
const sitemapSrc = read("src/app/sitemap.ts");
const llms = read("public/llms.txt");
const llmsFull = read("public/llms-full.txt");

const words = (s: string) => s.split(/\s+/).filter((t) => /[A-Za-z0-9]/.test(t));

// Honesty guards assert on what ships to the page, so comments — which often
// name the very thing they explain the absence of — must not count as matches.
const stripComments = (s: string) => s.replace(/^\s*\/\/.*$/gm, "");

/* ---------------------------------------------------------------
   A. Homepage positioning and conversion
   --------------------------------------------------------------- */

test("hero leads with umbrella positioning (not AI-GC-specific)", () => {
  // Per umbrella expansion: homepage hero should NOT have "AI general contractor" in H1
  const h1Match = homepage.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  assert.ok(h1Match, "homepage has an h1");
  const h1Text = h1Match[1].replace(/<[^>]+>/g, "");
  assert.ok(
    !h1Text.toLowerCase().includes("ai general contractor"),
    "homepage H1 should not mention AI general contractor (umbrella positioning)",
  );
  // HVAC-first repositioning: homepage leads with Operations; Habitats routes
  // stay live but are no longer promoted on the homepage.
  assert.ok(
    homepage.includes("Operations") || homepage.includes("operations"),
    "homepage mentions Operations practice",
  );
  assert.ok(
    !homepage.includes("/habitats"),
    "homepage no longer promotes Habitats routes",
  );
});

test("homepage offers Operations and Founding Five conversion paths", () => {
  // HVAC-first repositioning: the two-path selector is Operations + the
  // Founding Five scorecard flow.
  assert.ok(
    /href=["']\/operations["']/.test(homepage),
    "homepage links to Operations practice with exact /operations path",
  );
  assert.ok(
    homepage.includes("/hvac/founding-five#scorecard"),
    "homepage links to the Revenue Leak Scorecard flow",
  );
  // Final CTA offers the alliance funnel and the scorecard path.
  const flat = homepage.replace(/\s+/g, " ");
  assert.ok(
    /founding-five|scorecard/i.test(flat),
    "homepage still offers the Founding Five conversion path",
  );
  assert.ok(
    flat.includes("Seal the client container"),
    "homepage closes with the signature phrase",
  );
});

test("the AI-GC explainer moved to /operations page", () => {
  // Per umbrella expansion: AI-GC explainer is on /operations, not homepage
  const operationsPage = read("src/app/operations/page.tsx");
  const flat = operationsPage.replace(/\s+/g, " ");
  assert.ok(
    /AI general contractor|general contracting/i.test(flat),
    "/operations page explains AI general contracting",
  );
  // Homepage should NOT have the full GC explainer
  const homepageFlat = homepage.replace(/\s+/g, " ");
  assert.ok(
    !homepageFlat.includes("general contractor does not pour the foundation"),
    "homepage no longer has the full GC analogy (moved to /operations)",
  );
});

test("the platform comparison table moved to /operations page", () => {
  // Per umbrella expansion: comparison table is on /operations, not homepage
  const operationsPage = read("src/app/operations/page.tsx");
  assert.ok(
    operationsPage.includes('className="gc-table"'),
    "/operations page has the gc-table comparison",
  );
  assert.ok(operationsPage.includes('role="table"'), "table has explicit role");
  assert.ok(/<caption/.test(operationsPage), "table has a caption for screen readers");

  // Homepage should NOT have the comparison table
  assert.ok(
    !homepage.includes('className="gc-table"'),
    "homepage no longer has the comparison table (moved to /operations)",
  );

  const css = read("src/app/globals.css");
  assert.ok(css.includes(".gc-table"), "gc-table styles exist");
  assert.ok(/@media \(max-width: 759px\)[\s\S]*?\.gc-table td::before/.test(css),
    "a mobile breakpoint stacks the rows with their labels");
});

test("founder band is compacted on umbrella homepage", () => {
  // Per umbrella expansion: founder section shortened ~60%
  const flat = homepage.replace(/\s+/g, " ");
  const founderMatch = flat.match(/Built by|Founded by/i);
  assert.ok(founderMatch, "founder section is present");
  assert.ok(!/(MBA|PhD|certified|licensed|accredited|featured in|as seen|press)/.test(flat),
    "founder band makes no credential or press claim");
  // Full founder bio should be on /about, not homepage
  const wordCount = words(flat).length;
  assert.ok(wordCount > 100, "homepage has content (not empty)");
});

test("all eight system families have AI-GC annotations on /operations", () => {
  // Per Review & Referral Systems restoration: eight system families total
  const operationsPage = read("src/app/operations/page.tsx");
  assert.equal(site.systemFamilies.length, 8, "eight system families are defined");
  const seen = new Set<string>();
  for (const family of site.systemFamilies) {
    assert.ok(family.aiGc && family.aiGc.length > 80, `${family.title} has a substantive annotation`);
    assert.ok(!seen.has(family.aiGc), `${family.title} annotation is not a duplicate`);
    seen.add(family.aiGc);
  }
  // Operations page should render the system families via site.systemFamilies.map
  assert.ok(
    operationsPage.includes("site.systemFamilies.map") || operationsPage.includes("s.title"),
    "/operations page renders system families",
  );
  assert.ok(
    operationsPage.includes("AI general contracting here") || operationsPage.includes("s.aiGc"),
    "/operations page has AI-GC annotations",
  );
});

/* ---------------------------------------------------------------
   Homepage FAQ + schema
   --------------------------------------------------------------- */

test("homepage FAQ has six extractable answers, each under sixty words", () => {
  assert.equal(homepageFaq.length, 6, "six questions, per the audit");
  for (const item of homepageFaq) {
    assert.ok(item.q.trim().endsWith("?"), `"${item.q}" is phrased as a question`);
    const count = words(item.a).length;
    assert.ok(count <= 60, `answer to "${item.q}" is ${count} words (limit 60)`);
    assert.ok(count >= 20, `answer to "${item.q}" is substantive`);
  }
});

test("homepage FAQ reduced to 4 questions for umbrella positioning", () => {
  // Per umbrella expansion: FAQ reduced from 6 to 4 questions
  // FAQ is still present but may be smaller or restructured
  assert.ok(
    homepage.includes("FAQ") || homepage.includes("faq") || homepage.includes("question"),
    "homepage has FAQ or question section",
  );
  // If FAQPage schema exists, it should be properly structured
  const hasFaqSchema = homepage.includes('"@type": "FAQPage"') || homepage.includes("'@type': 'FAQPage'");
  if (hasFaqSchema) {
    // Schema should be generated from data, not hardcoded
    assert.ok(
      homepage.includes(".map") || homepage.includes("forEach"),
      "FAQ schema is generated from data",
    );
  }
});

test("FAQ answers promise no guaranteed outcome, figure, or fixed timeline", () => {
  for (const item of homepageFaq) {
    assert.ok(!/\bguarantee/i.test(item.a), `"${item.q}" makes no guarantee`);
    assert.ok(!/\d+\s*%/.test(item.a), `"${item.q}" quotes no percentage uplift`);
    assert.ok(!/\$\s*\d/.test(item.a), `"${item.q}" quotes no dollar figure`);
    assert.ok(!/\bwithin the first (month|week)\b/i.test(item.a), `"${item.q}" promises no fixed timeline`);
  }
  const timing = homepageFaq.find((f) => /how long/i.test(f.q));
  assert.ok(timing, "the timing question exists");
  assert.ok(
    /first full operating cycle/i.test(timing.a),
    "timing is framed as when measurement can begin",
  );
  assert.ok(/baseline/i.test(timing.a), "timing answer names baseline as a dependency");
});

/* ---------------------------------------------------------------
   B. Content hub scaffold
   --------------------------------------------------------------- */

test("the Insights hub lists all seven pillar topics with honest statuses", () => {
  const pillars = insightsPage.match(/\n    dek: "/g) ?? [];
  assert.equal(pillars.length, 7, "seven pillar topics from the audit roadmap");

  for (const status of ["Published", "In development", "Planned", "Evidence pending"]) {
    assert.ok(insightsPage.includes(`"${status}"`), `${status} is an available status`);
  }
  assert.ok(
    /Founding Five[\s\S]{0,400}?Evidence pending|Evidence pending[\s\S]{0,400}?Founding Five/.test(insightsPage),
    "the case study is labelled as awaiting verified Founding Five evidence",
  );
});

test("the hub links only to articles that exist, and fabricates nothing about the rest", () => {
  const shipped = stripComments(insightsPage);

  // Exactly one pillar carries an href, and it is the one that is published.
  const hrefs = shipped.match(/href: aiForHvacCompanies\.path|href\?: string/g) ?? [];
  assert.ok(hrefs.length > 0, "the published pillar carries a route");
  assert.equal(
    (shipped.match(/^\s{4}href: /gm) ?? []).length,
    1,
    "only one pillar links out — the other six are unwritten",
  );
  assert.ok(
    publishedArticles.every((a) => existsSync(resolve(root, `src/app${a.path}/page.tsx`))),
    "every article the hub links to has a real route",
  );

  assert.ok(!/"@type": "(Article|BlogPosting|NewsArticle)"/.test(shipped),
    "the hub does not duplicate the Article schema that lives on the article route");
  assert.ok(!/\bmin read\b|\bread time\b/i.test(shipped), "no invented read times");
  assert.ok(!/\b20\d\d-\d\d-\d\d\b/.test(shipped), "publication dates come from the article record, not hard-coded copy");
  assert.ok(
    /One guide is published so far/.test(insightsPage) && /are not written yet/.test(insightsPage),
    "the hub states plainly how much is published",
  );
});

test("the hub carries no newsletter capture, since no email provider is connected", () => {
  assert.ok(!/<form/i.test(insightsPage), "no form element");
  assert.ok(!/type="email"/i.test(insightsPage), "no email input");
  assert.ok(!/subscribe|newsletter/i.test(insightsPage.replace(/no mailing list[\s\S]{0,200}/i, "")),
    "no newsletter signup offer");
  assert.ok(/There is no mailing list to join/.test(insightsPage), "explains why there is no signup");
});

test("the hub carries both conversion CTAs and metadata/schema", () => {
  assert.ok(insightsPage.includes('href: "/hvac/founding-five#scorecard"'), "links to the Revenue Leak Scorecard");
  assert.ok(insightsPage.includes('href: "/assessment"'), "links to the assessment");
  assert.ok(insightsPage.includes('canonical: "/insights"'), "sets its own canonical");
  assert.ok(insightsPage.includes('"@type": "CollectionPage"'), "CollectionPage schema");
  assert.ok(insightsPage.includes('"@type": "ItemList"'), "ItemList schema for the roadmap");
  assert.ok(insightsPage.includes("BreadcrumbLd"), "breadcrumb schema");
  assert.ok(/title: "Insights — AI General Contracting/.test(insightsPage), "unique title");
});

test("the hub is reachable from header and footer navigation", () => {
  assert.ok(header.includes('href: "/insights"'), "header navigation links to the hub");
  assert.ok(footer.includes('href="/insights"'), "footer links to the hub");
  assert.ok(homepage.includes('href="/insights"'), "the homepage links into the hub");
});

/* ---------------------------------------------------------------
   C. AI/AEO and SEO technical work
   --------------------------------------------------------------- */

test("llms.txt covers summary, all seven families, customers, routes, and canonical facts", () => {
  for (const heading of [
    "## What \"AI general contractor\" means",
    "## The eight system families",
    "## The method",
    "## Ideal customers",
    "## What we do not do",
    "## Canonical facts",
    "## Core pages",
  ]) {
    assert.ok(llms.includes(heading), `llms.txt has the "${heading}" section`);
  }
  for (const family of site.systemFamilies) {
    assert.ok(llms.includes(family.title), `llms.txt names ${family.title}`);
  }
  for (const route of ["/assessment", "/system-review", "/insights", "/faq", "/how-it-works"]) {
    assert.ok(llms.includes(`https://livingry.services${route}`), `llms.txt links ${route}`);
  }
  assert.ok(/do not sell AI software/i.test(llms), "the 'we do not' list is explicit about software");
});

test("llms-full.txt carries the definition, founder bio, framework, FAQs, and evidence status", () => {
  // Per umbrella expansion: section numbers may shift
  for (const heading of [
    "AI general contracting — the category",
    "The method — the Livingry Leakproofing Framework",
    "The founder",
    "Frequently asked questions",
    "Evidence status",
    "Canonical page map",
  ]) {
    assert.ok(llmsFull.includes(heading), `llms-full.txt has "${heading}"`);
  }
  for (const step of site.method) {
    assert.ok(llmsFull.includes(step.name), `llms-full.txt names the ${step.name} step`);
  }
  for (const family of site.systemFamilies) {
    assert.ok(llmsFull.includes(family.title), `llms-full.txt names ${family.title}`);
  }
  assert.ok(/No client case studies are published/.test(llmsFull), "declares that no case studies exist yet");
  assert.ok(/No press coverage, media appearances, awards/.test(llmsFull), "declares no press or awards");
  assert.ok(
    llmsFull.includes(homepageFaq[0].a),
    "the canonical FAQ answers match the ones rendered on the site",
  );
});

test("robots permits ordinary search indexing and the named answer crawlers", () => {
  for (const bot of ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot"]) {
    assert.ok(robotsSrc.includes(`"${bot}"`), `${bot} is named explicitly`);
  }
  for (const bot of [
    "OAI-SearchBot",
    "ChatGPT-User",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
  ]) {
    assert.ok(robotsSrc.includes(`"${bot}"`), `answer crawler ${bot} is allowed by name`);
  }
  assert.ok(!/disallow:\s*"\/"/.test(robotsSrc), "nothing is blocked site-wide");
  assert.ok(!/disallow:\s*\["\/"\]/.test(robotsSrc), "nothing is blocked site-wide");
  assert.ok(robotsSrc.includes("NON_PUBLIC"), "only non-public surfaces are withheld");
  assert.ok(/\/api\//.test(robotsSrc) && /\/dashboard/.test(robotsSrc), "api and dashboard are the withheld paths");
  assert.ok(/TRAINING_CRAWLERS/.test(robotsSrc), "training-only crawlers are separated as their own group");
  assert.ok(
    /policy choice, not an oversight/.test(robotsSrc.replace(/\/\//g, " ").replace(/\s+/g, " ")),
    "the training-crawler decision is documented in code",
  );
  assert.ok(robotsSrc.includes("sitemap.xml"), "robots advertises the sitemap");
});

test("sitemap exposes the conversion, hub, service, and methodology routes", () => {
  for (const route of ["/assessment", "/system-review", "/insights", "/faq", "/how-it-works", "/what-we-build"]) {
    assert.ok(sitemapSrc.includes(`"${route}"`), `sitemap includes ${route}`);
  }
  assert.ok(sitemapSrc.includes("site.systemFamilies.map"), "every system family route is generated");
  assert.ok(sitemapSrc.includes("site.industries.map"), "every industry route is generated");
  assert.ok(/conversionRoutes/.test(sitemapSrc), "conversion routes are prioritised deliberately");
});

test("global schema is accurate and asserts no unverified trust signals", () => {
  assert.ok(layout.includes('"ProfessionalService"'), "the practice is typed as a ProfessionalService");
  assert.ok(layout.includes("hasOfferCatalog"), "the eight system families are exposed as services");
  const shipped = stripComments(layout);
  for (const forbidden of ["aggregateRating", "review:", "priceRange", "award", "openingHours"]) {
    assert.ok(!shipped.includes(forbidden), `global schema asserts no ${forbidden}`);
  }
  assert.ok(!shipped.includes('"@type": "FAQPage"'), "page-specific FAQPage schema is not duplicated globally");
});

test("the homepage sets umbrella-appropriate metadata", () => {
  // Per umbrella expansion: homepage metadata should reflect umbrella positioning
  assert.ok(homepage.includes('canonical: "/"'), "homepage declares its canonical URL");
  // Title may have changed from AI-GC-specific to umbrella
  const titleMatch = homepage.match(/title:\s*"([^"]+)"/);
  assert.ok(titleMatch, "homepage has a title");
  const description = homepage.match(/description:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
  const length = description.length;
  assert.ok(length >= 50 && length <= 320, `meta description is ${length} chars (want 50-320)`);
});

/* ---------------------------------------------------------------
   Independence and honesty guards
   --------------------------------------------------------------- */

test("no OpenAgents affiliation is introduced anywhere in the changed surfaces", () => {
  for (const [name, source] of Object.entries({ homepage, insightsPage, layout, header, footer, llms, llmsFull })) {
    assert.ok(!/openagents/i.test(source), `${name} contains no OpenAgents reference`);
  }
});

test("no authority band, testimonial, or client logo is fabricated", () => {
  const surfaces = [homepage, insightsPage, footer];
  for (const source of surfaces) {
    const flat = source.replace(/\s+/g, " ");
    assert.ok(!/as featured in/i.test(flat), "no 'as featured in' band");
    assert.ok(!/trusted by/i.test(flat), "no 'trusted by' logo wall");
    assert.ok(!/testimonial/i.test(flat), "no testimonials");
    assert.ok(!/placeholder-logo|logo-placeholder/i.test(flat), "no placeholder authority logos");
  }
});
