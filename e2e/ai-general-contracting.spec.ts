import { test, expect } from "@playwright/test";

// Browser checks for the AI general contracting positioning and the Insights
// hub. The node:test specs assert the source is correct; these assert the
// rendered page behaves — the comparison table stays readable at 375px, the FAQ
// schema matches what a visitor can actually see, and both surfaces are usable
// by keyboard.

const OUT = "e2e/screenshots";
const MOBILE = { width: 375, height: 812 };
const DESKTOP = { width: 1440, height: 900 };

test.describe("homepage — AI general contracting", () => {
  test("hero states the positioning and offers both conversion paths", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator("h1")).toHaveText(
      "Stop earning revenue you keep walking away from.",
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByText("We are the AI general contractor for trade and professional practices."),
    ).toBeVisible();

    const hero = page.locator("section").first();
    await expect(hero.getByRole("link", { name: /System Review/i }).first()).toHaveAttribute(
      "href",
      "/system-review",
    );
    await expect(hero.getByRole("link", { name: /Assessment/i }).first()).toHaveAttribute(
      "href",
      "/assessment",
    );
  });

  test("all seven system families render a distinct AI general contracting note", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const notes = page.getByText("AI general contracting here");
    await expect(notes).toHaveCount(7);
  });

  test("the FAQ schema describes exactly the questions a visitor can see", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqLd = blocks
      .map((b) => JSON.parse(b))
      .find((d) => d["@type"] === "FAQPage");
    expect(faqLd, "the homepage emits FAQPage schema").toBeTruthy();
    expect(faqLd.mainEntity).toHaveLength(6);

    for (const entry of faqLd.mainEntity) {
      expect(entry["@type"]).toBe("Question");
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      // Marking up an answer no visitor can read is the failure mode this guards.
      await expect(page.getByText(entry.name, { exact: false }).first()).toBeVisible();
    }
  });

  test("the comparison table stacks with its labels at 375px", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/", { waitUntil: "networkidle" });

    const table = page.locator("table.gc-table");
    await expect(table).toHaveAttribute("role", "table");
    await expect(table.locator("tbody tr")).toHaveCount(5);

    // Below the breakpoint the header row is hidden, so each cell must carry its
    // own label or the column meaning is lost.
    const head = table.locator("thead");
    await expect(head).not.toBeInViewport();
    const labelled = await table.locator("tbody td[data-label]").count();
    expect(labelled).toBeGreaterThanOrEqual(10);

    const box = await table.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(MOBILE.width);

    await page.screenshot({ path: `${OUT}/home-gc-table-mobile-375x812.png`, fullPage: true });
  });

  test("the founder band claims no credentials, press, or portrait", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByText("Built by someone who has done the work.")).toBeVisible();

    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const forbidden of ["as featured in", "as seen in", "trusted by", "testimonial"]) {
      expect(body, `homepage makes no "${forbidden}" claim`).not.toContain(forbidden);
    }
  });
});

test.describe("insights hub", () => {
  test("lists the seven pillars, and links only to the one that is written", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/insights", { waitUntil: "networkidle" });

    await expect(page.locator("h1")).toHaveCount(1);
    const headings = page.locator("main li h3, main li h2");
    await expect(headings).toHaveCount(7);

    await expect(page.getByText("One guide is published so far", { exact: false })).toBeVisible();

    // Six pillars are unwritten, so the hub may link to exactly one article —
    // the featured card and the roadmap row both point at the same route.
    const articleLinks = page.locator('main a[href^="/insights/"]');
    const hrefs = new Set(await articleLinks.evaluateAll((els) => els.map((e) => e.getAttribute("href"))));
    expect([...hrefs]).toEqual(["/insights/ai-for-hvac-companies"]);

    const resp = await page.goto("/insights/ai-for-hvac-companies", { waitUntil: "networkidle" });
    expect(resp?.ok(), "the article the hub links to actually resolves").toBeTruthy();

    await page.goBack({ waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    // The status pills are uppercased in CSS, so compare case-insensitively.
    expect(body).toMatch(/published/i);
    expect(body).toMatch(/evidence pending/i);
    expect(body).toMatch(/in development/i);
    expect(body).toMatch(/planned/i);
    expect(body).not.toMatch(/\bmin read\b|\bread time\b/i);
    expect(body).not.toMatch(/\b20\d\d-\d\d-\d\d\b/);
  });

  test("offers no newsletter capture and says why", async ({ page }) => {
    await page.goto("/insights", { waitUntil: "networkidle" });
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator('main input[type="email"]')).toHaveCount(0);
    await expect(page.getByText("There is no mailing list to join", { exact: false })).toBeVisible();
  });

  test("carries both conversion CTAs and valid CollectionPage schema", async ({ page }) => {
    await page.goto("/insights", { waitUntil: "networkidle" });

    await expect(page.locator('main a[href="/system-review"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/assessment"]').first()).toBeVisible();

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const docs = blocks.map((b) => JSON.parse(b));
    const collection = docs.find((d) => d["@type"] === "CollectionPage");
    expect(collection, "the hub emits CollectionPage schema").toBeTruthy();
    expect(collection.mainEntity["@type"]).toBe("ItemList");
    expect(collection.mainEntity.itemListElement).toHaveLength(7);
    expect(docs.some((d) => d["@type"] === "BreadcrumbList")).toBeTruthy();
  });

  test("is reachable by keyboard from the header navigation", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/", { waitUntil: "networkidle" });

    const link = page.locator('header a[href="/insights"]').first();
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await page.waitForURL("**/insights");
    await expect(page.locator("h1")).toBeVisible();

    await page.setViewportSize(MOBILE);
    await page.screenshot({ path: `${OUT}/insights-mobile-375x812.png`, fullPage: true });
  });
});

test("llms files and robots are served as public plain text", async ({ page }) => {
  for (const path of ["/llms.txt", "/llms-full.txt", "/robots.txt"]) {
    const resp = await page.request.get(path);
    expect(resp.ok(), `${path} is publicly served`).toBeTruthy();
    const text = await resp.text();
    expect(text.length, `${path} has content`).toBeGreaterThan(200);
  }

  const robots = await (await page.request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
  // A site-wide block on the default agent would silently delist every page.
  expect(robots).not.toMatch(/User-Agent: \*\s*\nDisallow: \/\s*$/im);

  const sitemap = await (await page.request.get("/sitemap.xml")).text();
  for (const route of ["/insights", "/assessment", "/system-review"]) {
    expect(sitemap, `sitemap lists ${route}`).toContain(`${route}<`);
  }
});
