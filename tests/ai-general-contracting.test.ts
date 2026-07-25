import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { site } from "../src/lib/site";
import { homepageFaq } from "../src/lib/faq";

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

test("hero leads with the AI general contracting positioning", () => {
  assert.equal(site.positioning.headline, "Stop earning revenue you keep walking away from.");
  assert.equal(
    site.positioning.subhead,
    "We are the AI general contractor for trade and professional practices.",
  );
  assert.ok(
    homepage.includes("site.positioning.headline"),
    "the h1 renders the shared headline rather than a divergent copy",
  );
  assert.ok(homepage.includes("site.positioning.subhead"), "the hero renders the shared subhead");
});

test("hero offers the System Review as primary and the assessment as secondary CTA", () => {
  const hero = homepage.slice(homepage.indexOf("HERO"), homepage.indexOf("WHAT IS AI GENERAL CONTRACTING"));
  assert.ok(/href="\/system-review"[^>]*btn btn-primary/.test(hero.replace(/\s+/g, " ")) ||
    /btn btn-primary[^>]*>\s*Book a Free System Review/.test(hero.replace(/\s+/g, " ")),
    "hero primary CTA points at /system-review");
  assert.ok(hero.includes('href="/assessment"'), "hero secondary CTA points at /assessment");
  assert.ok(/btn btn-secondary/.test(hero), "the assessment CTA is styled as the secondary action");
});

test("the direct-answer section explains AI general contracting with the GC analogy", () => {
  const flat = homepage.replace(/\s+/g, " ");
  assert.ok(flat.includes("What is AI general contracting?"), "the H2 is phrased as the buyer's question");
  assert.ok(/general contractor does not pour the foundation/.test(flat), "states the GC analogy");
  assert.ok(/full-time job/.test(flat), "names the owner's time pain");
  assert.ok(/AI is one tool you can buy/.test(flat), "names the false belief being corrected");
});

test("the comparison table keeps all five rows and a mobile-safe treatment", () => {
  const rows = homepage.match(/\n    need: /g) ?? [];
  assert.equal(rows.length, 5, "five comparison rows are present");
  assert.ok(homepage.includes('className="gc-table"'), "table uses the gc-table treatment");
  assert.ok(homepage.includes('role="table"'), "explicit role survives the mobile display:block override");
  assert.ok(homepage.includes("data-label="), "cells carry labels for the stacked mobile layout");
  assert.ok(/<caption/.test(homepage), "the table has a caption for screen readers");

  const css = read("src/app/globals.css");
  assert.ok(css.includes(".gc-table"), "gc-table styles exist");
  assert.ok(/@media \(max-width: 759px\)[\s\S]*?\.gc-table td::before/.test(css),
    "a mobile breakpoint stacks the rows with their labels");
});

test("founder band is present and claims no credentials, press, or portrait", () => {
  const flat = homepage.replace(/\s+/g, " ");
  assert.ok(flat.includes("Built by someone who has done the work."), "founder band heading is present");
  assert.ok(/permaculture design, solar, and HVAC/.test(flat), "states the trades background");
  assert.ok(/fire, to a company that closed, to a rebrand/.test(flat), "states the credential-loss origin");
  assert.ok(homepage.includes("founder-origin-collage"), "reuses the existing founder-origin visual");
  assert.ok(/not a documentary portrait/.test(flat), "labels the image as illustration, not a portrait");

  for (const forbidden of [/certified/i, /licensed/i, /award/i, /as featured in/i, /as seen (in|on)/i]) {
    assert.ok(!forbidden.test(flat), `homepage makes no ${forbidden} claim`);
  }
});

test("all seven system families carry a distinct AI general contracting annotation", () => {
  assert.equal(site.systemFamilies.length, 7, "there are seven system families");
  const seen = new Set<string>();
  for (const family of site.systemFamilies) {
    assert.ok(family.aiGc && family.aiGc.length > 80, `${family.title} has a substantive annotation`);
    assert.ok(!seen.has(family.aiGc), `${family.title} annotation is not a duplicate`);
    seen.add(family.aiGc);
  }
  assert.ok(homepage.includes("s.aiGc"), "the homepage renders each family's annotation");
  assert.ok(
    homepage.includes("AI general contracting here"),
    "annotations carry the labelled treatment from the audit",
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

test("homepage FAQPage schema is generated from the visible questions", () => {
  assert.ok(homepage.includes('"@type": "FAQPage"'), "FAQPage schema is emitted");
  assert.ok(
    homepage.includes("mainEntity: homepageFaq.map("),
    "schema is derived from the same array that renders visibly, so the two cannot drift",
  );
  assert.ok(homepage.includes("{homepageFaq.map("), "the questions are also rendered visibly");
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

  for (const status of ["In development", "Planned", "Evidence pending"]) {
    assert.ok(insightsPage.includes(`"${status}"`), `${status} is an available status`);
  }
  assert.ok(
    /Founding Five[\s\S]{0,400}?Evidence pending|Evidence pending[\s\S]{0,400}?Founding Five/.test(insightsPage),
    "the case study is labelled as awaiting verified Founding Five evidence",
  );
});

test("the hub fabricates no articles, dates, authors, or read times", () => {
  const shipped = stripComments(insightsPage);
  assert.ok(!/datePublished|dateModified/.test(shipped), "no publication dates are claimed");
  assert.ok(!/"@type": "(Article|BlogPosting|NewsArticle)"/.test(shipped), "nothing is marked up as a published article");
  assert.ok(!/\bmin read\b|\bread time\b/i.test(shipped), "no invented read times");
  assert.ok(!/\bauthor\b/i.test(shipped), "no invented bylines");
  assert.ok(!/\b20\d\d-\d\d-\d\d\b/.test(shipped), "no hard-coded publication date");
  assert.ok(
    insightsPage.includes("No article pages are live yet"),
    "the hub states plainly that nothing is published yet",
  );
  assert.ok(!/href="\/insights\//.test(insightsPage), "no links to non-existent article URLs");
});

test("the hub carries no newsletter capture, since no email provider is connected", () => {
  assert.ok(!/<form/i.test(insightsPage), "no form element");
  assert.ok(!/type="email"/i.test(insightsPage), "no email input");
  assert.ok(!/subscribe|newsletter/i.test(insightsPage.replace(/no mailing list[\s\S]{0,200}/i, "")),
    "no newsletter signup offer");
  assert.ok(/There is no mailing list to join/.test(insightsPage), "explains why there is no signup");
});

test("the hub carries both conversion CTAs and metadata/schema", () => {
  assert.ok(insightsPage.includes('href: "/system-review"'), "links to the System Review");
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
    "## The seven system families",
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
  for (const heading of [
    "## 2. AI general contracting — the category",
    "## 4. The method — the Livingry Leakproofing Framework",
    "## 5. The founder",
    "## 11. Frequently asked questions",
    "## 12. Evidence status",
    "## 14. Canonical page map",
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
  assert.ok(layout.includes("hasOfferCatalog"), "the seven system families are exposed as services");
  const shipped = stripComments(layout);
  for (const forbidden of ["aggregateRating", "review:", "priceRange", "award", "openingHours"]) {
    assert.ok(!shipped.includes(forbidden), `global schema asserts no ${forbidden}`);
  }
  assert.ok(!shipped.includes('"@type": "FAQPage"'), "page-specific FAQPage schema is not duplicated globally");
});

test("the homepage sets its own canonical, title, and meta description", () => {
  assert.ok(homepage.includes('canonical: "/"'), "homepage declares its canonical URL");
  assert.ok(/AI General Contracting for Trade & Professional Practices/.test(homepage), "title leads with the category");
  const description = homepage.match(/description:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
  const length = description.length;
  assert.ok(length >= 100 && length <= 320, `meta description is ${length} chars (want 100-320)`);
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
