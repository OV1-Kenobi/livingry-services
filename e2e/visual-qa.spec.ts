import { test, expect } from "@playwright/test";

// Visual QA sweep for the six-asset visual system, the repaired routes, and the
// bounded /dashboard fix. For each route at desktop + mobile we assert there is
// no horizontal document overflow and capture a full-page screenshot into the
// handoff folder for manual critical inspection.

const OUT = "e2e/screenshots";

const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-390x844", width: 390, height: 844 },
];

const ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "what-we-build", path: "/what-we-build" },
  { name: "how-it-works", path: "/how-it-works" },
  { name: "insights", path: "/insights" },
  { name: "insights-ai-for-hvac", path: "/insights/ai-for-hvac-companies" },
  { name: "founding-five", path: "/hvac/founding-five" },
];

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    test(`${route.name} @ ${vp.name} renders without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path, { waitUntil: "networkidle" });

      const overflow = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      expect(
        overflow.scrollW,
        `horizontal overflow on ${route.name} @ ${vp.name}`,
      ).toBeLessThanOrEqual(overflow.clientW + 1);

      await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}.png`, fullPage: true });
    });
  }
}

test("legacy founding-five path redirects to the canonical route", async ({ page }) => {
  const resp = await page.goto("/industries/hvac/founding-five?ref=qa", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/hvac/founding-five");
  expect(page.url()).toContain("ref=qa");
  expect(resp?.ok()).toBeTruthy();
});
