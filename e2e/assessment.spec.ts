import { test, expect, type Page } from "@playwright/test";

// Browser QA for the public 17-point assessment: a low-score path, a high-score
// path, a blocked incomplete attempt, reset, and CTA carry-over into the
// existing /leak-assessment lead path — at desktop and mobile.

const OUT = "e2e/screenshots";
const TOTAL = 17;

const VIEWPORTS = [
  { name: "desktop-1280x900", width: 1280, height: 900 },
  { name: "mobile-375x812", width: 375, height: 812 },
];

/**
 * Answers each control with `pick(id)`; a negative return leaves it unanswered.
 * The radio itself is visually replaced by its label card, so this clicks the
 * label the way a visitor does. Centring first keeps the target clear of the
 * sticky progress bar.
 */
async function answerAll(page: Page, pick: (id: number) => number) {
  for (let id = 1; id <= TOTAL; id++) {
    const value = pick(id);
    if (value < 0) continue;
    const label = page.locator(`label[for="control-${id}-${value}"]`);
    await label.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await label.click();
    await expect(page.locator(`#control-${id}-${value}`)).toBeChecked();
  }
}

/** Clicks after centring, so the sticky progress bar cannot intercept the hit. */
async function clickCentered(locator: ReturnType<Page["locator"]>) {
  await locator.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await locator.click();
}

async function assertNoHorizontalOverflow(page: Page) {
  const { scrollW, clientW } = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  expect(scrollW, `horizontal overflow: ${scrollW} > ${clientW}`).toBeLessThanOrEqual(clientW + 1);
}

for (const vp of VIEWPORTS) {
  test.describe(`assessment @ ${vp.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    test("loads directly with all 17 controls and no result", async ({ page }) => {
      const response = await page.goto("/assessment", { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle("17-Point Operational Leak Assessment | Livingry Services");
      await expect(page.locator("fieldset.asm-control")).toHaveCount(TOTAL);
      await expect(page.locator("section.asm-category")).toHaveCount(7);
      await expect(page.locator("#result")).toHaveCount(0);
      await expect(page.getByText("0 of 17 answered")).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await page.screenshot({ path: `${OUT}/assessment-empty-${vp.name}.png`, fullPage: true });
    });

    test("an incomplete attempt raises an alert instead of a result", async ({ page }) => {
      await page.goto("/assessment", { waitUntil: "networkidle" });
      await answerAll(page, (id) => (id === 9 ? -1 : 2)); // leave control 9 unanswered
      await expect(page.getByText("16 of 17 answered")).toBeVisible();

      await clickCentered(page.getByRole("button", { name: /Show my result/ }));

      // Scoped to the form: Next renders its own role="alert" route announcer.
      const alert = page.locator(".asm-gaps");
      await expect(alert).toBeVisible();
      await expect(alert).toContainText("1 control still");
      await expect(page.locator("#result")).toHaveCount(0);
      await expect(page.locator('#control-9[data-missing="true"]')).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await page.screenshot({ path: `${OUT}/assessment-incomplete-${vp.name}.png`, fullPage: true });
    });

    test("a low-score path reports Exposed with all three critical zeros", async ({ page }) => {
      await page.goto("/assessment", { waitUntil: "networkidle" });
      await answerAll(page, () => 0);
      await expect(page.getByText("17 of 17 answered")).toBeVisible();

      await clickCentered(page.getByRole("button", { name: "Show my result" }));
      const result = page.locator("#result");
      await expect(result).toBeVisible();
      await expect(result.locator(".asm-result-title")).toHaveText("Exposed");
      await expect(result.locator(".asm-result-score")).toContainText("0");
      await expect(result.getByText("A high total does not erase a zero here")).toBeVisible();
      await expect(result.locator(".asm-critical-list li")).toHaveCount(3);
      await expect(result.locator(".asm-lowest-controls li")).toHaveCount(3);
      await expect(result.locator("table.asm-table tbody tr")).toHaveCount(7);
      await expect(result.getByText("directional", { exact: false })).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await page.screenshot({ path: `${OUT}/assessment-low-${vp.name}.png`, fullPage: true });
    });

    test("a high-score path reports Sealed with no critical warning", async ({ page }) => {
      await page.goto("/assessment", { waitUntil: "networkidle" });
      await answerAll(page, () => 3);
      await clickCentered(page.getByRole("button", { name: "Show my result" }));

      const result = page.locator("#result");
      await expect(result.locator(".asm-result-title")).toHaveText("Sealed");
      await expect(result.locator(".asm-result-score")).toContainText("51");
      await expect(result.locator(".asm-critical")).toHaveCount(0);
      await expect(result.locator(".asm-lowest-controls li")).toHaveCount(3);

      await assertNoHorizontalOverflow(page);
      await page.screenshot({ path: `${OUT}/assessment-high-${vp.name}.png`, fullPage: true });
    });

    test("start over clears every answer and hides the result", async ({ page }) => {
      await page.goto("/assessment", { waitUntil: "networkidle" });
      await answerAll(page, () => 1);
      await clickCentered(page.getByRole("button", { name: "Show my result" }));
      await expect(page.locator("#result")).toBeVisible();

      await clickCentered(page.locator(".asm-cta").getByRole("button", { name: "Start over" }));

      await expect(page.locator("#result")).toHaveCount(0);
      await expect(page.getByText("0 of 17 answered")).toBeVisible();
      await expect(page.locator("input.asm-radio:checked")).toHaveCount(0);
      await expect(page.locator(".asm-gaps")).toHaveCount(0);
    });

    test("the CTA carries score, band, and weakest layer into the lead form", async ({ page }) => {
      await page.goto("/assessment", { waitUntil: "networkidle" });
      // Everything sealed except the escalation layer (controls 13 and 14).
      await answerAll(page, (id) => (id === 13 || id === 14 ? 0 : 3));
      await clickCentered(page.getByRole("button", { name: "Show my result" }));

      await clickCentered(page.getByRole("link", { name: /Book the 15-minute Leak Triage/ }));
      await page.waitForURL(/\/leak-assessment/);

      const url = new URL(page.url());
      expect(url.pathname).toBe("/leak-assessment");
      expect(url.searchParams.get("src")).toBe("assessment");
      expect(url.searchParams.get("score")).toBe("45");
      expect(url.searchParams.get("band")).toBe("sealed");
      expect(url.searchParams.get("focus")).toBe("escalation-followthrough");

      const carryover = page.locator(".asm-carryover");
      await expect(carryover).toBeVisible();
      await expect(carryover).toContainText("45 / 51");
      await expect(carryover).toContainText("Escalation and follow-through");
      await expect(page.locator("#leak")).toHaveValue(/Self-assessment score 45 of 51 — Sealed\./);

      await assertNoHorizontalOverflow(page);
      await page.screenshot({ path: `${OUT}/assessment-cta-${vp.name}.png`, fullPage: true });
    });
  });
}

test("a tampered triage link is ignored rather than displayed", async ({ page }) => {
  await page.goto("/leak-assessment?src=assessment&score=51&band=exposed", {
    waitUntil: "networkidle",
  });
  await expect(page.locator(".asm-carryover")).toHaveCount(0);
});

test("the assessment is reachable from the header and the footer", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator('footer a[href="/assessment"]')).toHaveCount(1);
  await expect(page.locator('header a[href="/assessment"]')).toHaveCount(1);
});
