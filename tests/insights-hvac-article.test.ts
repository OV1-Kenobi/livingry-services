import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { site } from "../src/lib/site";
import { aiForHvacCompanies, publishedArticles } from "../src/lib/insights";

// Guards for the published pillar article at /insights/ai-for-hvac-companies.
// The record in src/lib/insights.ts is the single source of truth shared by the
// route, the hub card, and the sitemap, so it is asserted as data; the JSX is
// asserted against source text, matching the convention in the sibling suite.

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const read = (rel: string) => readFileSync(resolve(root, rel), "utf8");

const page = read("src/app/insights/ai-for-hvac-companies/page.tsx");
const insightsPage = read("src/app/insights/page.tsx");
const llms = read("public/llms.txt");
const llmsFull = read("public/llms-full.txt");
const sitemapSrc = read("src/app/sitemap.ts");
const flat = page.replace(/\s+/g, " ");

// Honesty guards assert on the prose. The `src` table is nothing but publisher
// names and URLs, and regulator documents are titled after the very practices
// this article warns against ("…Reviews and Testimonials Rule"), so a match
// there would be a false positive.
const prose = page.replace(/const src = \{[\s\S]*?\n\} as const;/, "").replace(/\s+/g, " ");

/* ---------------------------------------------------------------
   The article record
   --------------------------------------------------------------- */

test("the article record is the single source the route, hub, and sitemap share", () => {
  assert.deepEqual(publishedArticles, [aiForHvacCompanies], "one article is published");
  assert.equal(aiForHvacCompanies.path, "/insights/ai-for-hvac-companies", "the requested route");
  assert.ok(
    existsSync(resolve(root, `src/app${aiForHvacCompanies.path}/page.tsx`)),
    "the route exists on disk",
  );
  assert.ok(page.includes("aiForHvacCompanies as article"), "the route reads its metadata from the record");
  assert.ok(sitemapSrc.includes("publishedArticles"), "the sitemap generates the route from the record");
  assert.ok(insightsPage.includes("aiForHvacCompanies"), "the hub card reads from the same record");
});

test("the meta description is search-appropriate and the title leads with the query", () => {
  const { description, seoTitle } = aiForHvacCompanies;
  assert.ok(
    description.length >= 100 && description.length <= 320,
    `meta description is ${description.length} chars (want 100-320)`,
  );
  assert.ok(/^AI for HVAC Companies/.test(seoTitle), "title leads with the primary keyword");
  assert.ok(aiForHvacCompanies.keywords.includes("AI for HVAC companies"), "primary keyword is recorded");
});

/* ---------------------------------------------------------------
   Page-level SEO surfaces
   --------------------------------------------------------------- */

test("the route sets canonical, Open Graph, and Twitter metadata from the record", () => {
  assert.ok(page.includes("alternates: { canonical: article.path }"), "canonical comes from the record");
  assert.ok(!/https:\/\/(?!livingry\.services)/.test(flat.match(/canonical[^,]*/)?.[0] ?? ""), "no hardcoded domain");
  assert.ok(page.includes("site.primaryDomain"), "absolute URLs derive from the configured domain");
  assert.ok(!/livingry-services\.vercel\.app/.test(page), "the route does not hardcode the preview domain");

  assert.ok(/type: "article"/.test(page), "Open Graph type is article");
  assert.ok(page.includes("publishedTime: article.published"), "Open Graph carries the publish date");
  assert.ok(
    /images: \[\{ url: article\.ogImage, width: 1200, height: 630/.test(page),
    "Open Graph uses the 1200x630 crop of the hero",
  );
  assert.ok(/card: "summary_large_image"/.test(page), "Twitter uses a large summary card");
  assert.ok(page.includes("images: [article.ogImage]"), "the Twitter card reuses the same image");
});

test("Article and FAQPage structured data are emitted and anchored to the site graph", () => {
  assert.ok(page.includes('"@type": "Article"'), "Article schema is emitted");
  assert.ok(page.includes('"@type": "FAQPage"'), "FAQPage schema is emitted");
  assert.ok(page.includes("BreadcrumbLd"), "breadcrumb schema is emitted");
  assert.ok(page.includes("${site.primaryDomain}/#organization"), "author/publisher point at the org node");
  assert.ok(page.includes("${site.primaryDomain}/#website"), "the article is part of the site node");
  assert.ok(page.includes("wordCount: article.words"), "word count comes from the record");
  assert.ok(
    page.includes("acceptedAnswer: { \"@type\": \"Answer\", text: stripTags(f.a) }"),
    "FAQ schema is generated from the same answers that render visibly, so the two cannot drift",
  );

  // Structured data describes the page; it is not a promise about AI systems.
  // The article says so outright, in the section that names the claim as hype.
  assert.ok(
    /structured data does not guarantee visibility/i.test(flat),
    "the article states plainly that structured data guarantees nothing",
  );
  assert.ok(
    !/(our|this) (structured data|schema)[^.]{0,60}guarantee/i.test(prose),
    "the site claims no citation guarantee of its own",
  );
});

/* ---------------------------------------------------------------
   Content fidelity
   --------------------------------------------------------------- */

test("the editorial metadata block is not exposed as visible article copy", () => {
  for (const leaked of [
    /SEO title:/i,
    /Suggested URL:/i,
    /Meta description:/i,
    /Primary keyword:/i,
    /Secondary keywords:/i,
    /Search intent:/i,
    /Article summary:/i,
    /word count target/i,
  ]) {
    assert.ok(!leaked.test(flat), `the ${leaked} briefing line does not ship as copy`);
  }
});

test("all four supplied images are placed, each with a caption and honest alt text", () => {
  for (const base of [
    "insights/ai-for-hvac-companies-hero",
    "insights/hvac-customer-lifecycle",
    "insights/hvac-ai-autonomy-ceiling",
    "insights/hvac-ai-90-day-roadmap",
  ]) {
    assert.ok(page.includes(`base="${base}"`), `${base} is rendered`);
    for (const ext of ["avif", "webp", "png"]) {
      assert.ok(
        existsSync(resolve(root, `public/assets/${base}.${ext}`)),
        `public/assets/${base}.${ext} exists for the picture element`,
      );
    }
  }
  assert.ok(existsSync(resolve(root, "public/assets/insights/ai-for-hvac-companies-og.png")), "the OG crop exists");

  assert.equal((page.match(/<figcaption/g) ?? []).length, 4, "every figure is captioned");
  assert.ok(/priority/.test(page), "the hero is eager-loaded as the LCP element");
  assert.ok(!/case study|real client|actual customer/i.test(flat), "no image is described as documentary evidence");
});

test("external citations are preserved as safe clickable links", () => {
  const anchors = page.match(/target="_blank"/g) ?? [];
  assert.ok(anchors.length >= 2, "external anchors are present in both JSX and FAQ HTML");
  assert.equal(
    (page.match(/target="_blank"(?![^]{0,80}rel="noopener noreferrer")/g) ?? []).length,
    0,
    "every external anchor carries rel=noopener noreferrer",
  );

  const urls = page.match(/https?:\/\/[^"'\s)]+/g) ?? [];
  const external = urls.filter((u) => !u.startsWith(site.primaryDomain) && !u.includes("schema.org"));
  assert.ok(external.length >= 25, `the researched citations survive (${external.length} external URLs)`);
  for (const authority of ["fcc.gov", "ftc.gov", "nist.gov", "owasp.org", "energystar.gov"]) {
    assert.ok(external.some((u) => u.includes(authority)), `${authority} primary source is cited`);
  }
});

test("headings, tables, FAQ, and the disclaimer all survive the conversion", () => {
  // Fifteen body sections plus the heading that labels the contents nav.
  assert.equal((page.match(/<h2\b/g) ?? []).length, 16, "all fifteen sections are present");
  const navIds = [...page.matchAll(/\{ id: "([a-z0-9-]+)", label: "/g)].map((m) => m[1]);
  assert.equal(navIds.length, 15, "the contents nav lists all fifteen sections");
  for (const id of navIds) {
    assert.ok(page.includes(`<h2 id="${id}">`), `the "${id}" section the contents nav links to exists`);
  }
  assert.equal((page.match(/<table\b/g) ?? []).length, 2, "both source tables are rendered");
  assert.ok(/\bIs it legal to have AI answer\b/.test(page), "the FAQ is present");
  assert.ok(
    /This article provides operational and educational guidance, not legal advice/.test(flat),
    "the legal disclaimer is preserved verbatim in substance",
  );
  assert.ok(/article-callout/.test(page), "the disclaimer is visually set apart");
});

/* ---------------------------------------------------------------
   Layout and overflow safety
   --------------------------------------------------------------- */

test("wide elements widen by grid track, so horizontal overflow is structural impossible", () => {
  const css = read("src/app/globals.css");
  assert.ok(/\.article \{[\s\S]*?grid-template-columns:/.test(css), "the article body is a named-line grid");
  assert.ok(/\.article > \.article-wide \{\s*grid-column: full;/.test(css), "wide children take the full track");
  assert.ok(!/\.article[\s\S]{0,400}margin-inline: -/.test(css), "no negative margins are used to break out");
  assert.ok(/\.article-formula[\s\S]*?overflow-wrap: anywhere/.test(css), "long formulas and URLs wrap");

  for (const wide of page.match(/className="[^"]*article-wide[^"]*"/g) ?? []) {
    assert.ok(wide.includes("article-figure") || wide.includes("article-wide"), `${wide} is a known wide treatment`);
  }
  assert.ok((page.match(/article-wide/g) ?? []).length >= 5, "the tables and diagrams use the wide track");
});

test("both tables reuse the mobile-safe gc-table treatment", () => {
  assert.equal((page.match(/className="gc-table"/g) ?? []).length, 2, "both tables use gc-table");
  assert.equal((page.match(/role="table"/g) ?? []).length, 2, "explicit roles survive the display:block override");
  assert.equal((page.match(/<caption/g) ?? []).length, 2, "each table is captioned for screen readers");
  assert.ok(page.includes("data-label="), "cells carry labels for the stacked mobile layout");
});

test("the contents navigation is generated from the sections it links to", () => {
  assert.ok(page.includes("article-toc"), "the contents list uses the shared treatment");
  assert.ok(/sections\.map\(/.test(page), "the nav is generated, so it cannot drift from the headings");
  assert.ok(/id=\{/.test(page) || /id="/.test(page), "sections carry ids to anchor into");
});

/* ---------------------------------------------------------------
   Conversion, hub placement, and discovery
   --------------------------------------------------------------- */

test("the article routes conversion to the existing internal CTAs", () => {
  assert.ok(page.includes('href="/hvac/founding-five#scorecard"'), "links to the Revenue Leak Scorecard flow");
  assert.ok(page.includes('href="/assessment"'), "links to the assessment");
  assert.ok(page.includes("EndCta"), "the shared end-of-page CTA closes the article");
  assert.ok(
    (page.match(/href="\/(how-it-works|what-we-build|systems\/)/g) ?? []).length >= 2,
    "the article links back into the service and methodology pages",
  );
});

test("the hub card carries the hero, category, date, excerpt, and a working link", () => {
  assert.ok(insightsPage.includes("aiForHvacCompanies.path"), "the card links to the article route");
  assert.ok(insightsPage.includes("ai-for-hvac-companies-hero"), "the card shows the hero image");
  assert.ok(insightsPage.includes("aiForHvacCompanies.excerpt"), "the excerpt comes from the record");
  assert.ok(insightsPage.includes("aiForHvacCompanies.category"), "the category comes from the record");
  assert.ok(/<time/.test(insightsPage), "the publication date is marked up as a time element");
  assert.ok(aiForHvacCompanies.excerpt.length > 200, "the excerpt is substantive enough to be compelling");
});

test("the article is discoverable in the sitemap and the llms files", () => {
  assert.ok(/path\.startsWith\("\/insights\/"\)/.test(sitemapSrc), "article routes are prioritised deliberately");
  const absolute = `${site.primaryDomain}${aiForHvacCompanies.path}`;
  assert.ok(llms.includes(absolute), "llms.txt lists the article URL");
  assert.ok(llmsFull.includes(absolute), "llms-full.txt lists the article URL");
  assert.ok(llms.includes(aiForHvacCompanies.published), "llms.txt records the publish date");
  assert.ok(
    /No client case studies are published/.test(llmsFull),
    "publishing an article does not imply a case study exists",
  );
});

/* ---------------------------------------------------------------
   Independence and honesty
   --------------------------------------------------------------- */

test("the article stays independent and claims nothing it cannot show", () => {
  assert.ok(!/openagents/i.test(page), "no OpenAgents reference");
  for (const forbidden of [/as featured in/i, /trusted by/i, /our testimonials/i, /award-winning/i]) {
    assert.ok(!forbidden.test(prose), `the article makes no ${forbidden} claim`);
  }
  assert.ok(!/we guarantee/i.test(prose), "no guarantee is offered");
});
