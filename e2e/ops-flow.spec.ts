import { test, expect, type Page } from "@playwright/test";

// The public lifecycle diagram must be geometrically sound at every breakpoint:
// no overlapping cards/rails, no horizontal page overflow, every stage label
// visible, and category cards clickable. Screenshots are captured for manual
// critical inspection and their paths reported in the handoff.

const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "laptop-1024x768", width: 1024, height: 768 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "mobile-390x844", width: 390, height: 844 },
];

const STAGE_LABELS = ["Attract", "Intake", "Coordinate", "Execute", "Retain"];

type Box = { label: string; x: number; y: number; w: number; h: number };

async function flowBoxes(page: Page): Promise<Box[]> {
  return page.$$eval(".lf-root .lf-node, .lf-root .lf-rail", (els) =>
    els.map((el, i) => {
      const r = el.getBoundingClientRect();
      const text = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40);
      return { label: `${i}:${text}`, x: r.x, y: r.y, w: r.width, h: r.height };
    }),
  );
}

function overlapArea(a: Box, b: Box): number {
  const ox = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const oy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return ox * oy;
}

for (const vp of VIEWPORTS) {
  test(`ops lifecycle diagram is sound at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/ops", { waitUntil: "networkidle" });
    await page.locator(".lf-root").waitFor({ state: "visible" });

    // 1. No horizontal document overflow.
    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollW, `horizontal overflow at ${vp.name}`).toBeLessThanOrEqual(overflow.clientW + 1);

    // 2. No overlapping flow cards/rails (allow >2px^2 slop for sub-pixel edges).
    const boxes = await flowBoxes(page);
    expect(boxes.length).toBeGreaterThanOrEqual(9); // 2 rails + 7 systems + recovery
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const area = overlapArea(boxes[i], boxes[j]);
        expect(area, `overlap: ${boxes[i].label} <> ${boxes[j].label} at ${vp.name}`).toBeLessThanOrEqual(2);
      }
    }

    // 3. Every lifecycle stage label is visible.
    for (const label of STAGE_LABELS) {
      await expect(
        page.locator(".lf-lifecycle").getByText(label, { exact: true }).first(),
        `stage label "${label}" visible at ${vp.name}`,
      ).toBeVisible();
    }

    // 4. Control plane (top) is above the audit rail (bottom).
    const control = await page.locator('[data-role="control-plane"]').boundingBox();
    const audit = await page.locator('[data-role="audit-rail"]').boundingBox();
    expect(control && audit && control.y < audit.y, "control plane above audit rail").toBeTruthy();

    // 5. Clicking a category card opens its detail (card becomes pressed).
    const responseNode = page.locator(".lf-node", { hasText: "Response Systems" });
    await responseNode.click();
    await expect(responseNode).toHaveAttribute("aria-pressed", "true");

    await page.screenshot({ path: `e2e/screenshots/ops-flow-${vp.name}.png`, fullPage: true });
  });
}
