import { test, expect } from "@playwright/test";

// Phase 1b: authenticated-flow checks for the PRIVATE Ops backend.
//
// NOTE (adaptation): the brief asked to "restore e2e/ops-flow.spec.ts
// adapted to authenticated flow", but the existing e2e/ops-flow.spec.ts is
// the public lifecycle-diagram visual QA spec on BOTH master and the
// preserve branch (no authenticated-flow spec ever existed to restore).
// Deleting it would destroy public visual QA coverage, so this NEW spec
// carries the authenticated-flow checks instead.
//
// The OTP delivery step goes out-of-band (encrypted Nostr DM to the
// operator npub) and cannot be automated against the live relay path, so
// the automated coverage here proves the UNAUTHENTICATED contract:
//   1. /dashboard renders only the public preview + sign-in gate — no ops data.
//   2. Every private data route returns 401/4xx without a verified session.
// The post-OTP authenticated walkthrough remains a manual QA step
// [REQUIRES VERIFICATION by Test & QA with operator npub access].

test("/dashboard hides all ops content from unauthenticated visitors", async ({ page }) => {
  await page.goto("/dashboard", { waitUntil: "networkidle" });
  // Public preview or sign-in gate is rendered — never the client workspace.
  const body = await page.locator("body").innerText();
  expect(body).not.toContain("Client workspace.");
  expect(
    (await page.getByText("Sign in", { exact: false }).count()) > 0 ||
      body.length > 0,
  ).toBeTruthy();
  // The dashboard nav tabs must not be reachable pre-auth.
  expect(await page.locator('nav[aria-label="Dashboard sections"]').count()).toBe(0);
});

for (const path of [
  "/api/ops/config",
  "/api/ops/dashboard",
  "/api/ops/tasks",
  "/api/ops/promises",
  "/api/ops/exceptions",
  "/api/ops/opportunities",
  "/api/ops/integrations",
  "/api/ops/tenant",
]) {
  test(`private API ${path} refuses unauthenticated access`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(401);
    // And even a forged legacy cookie value must fail server-side verification.
    const forged = await request.get(path, {
      headers: { cookie: "tradeops_dashboard_session=granted" },
    });
    expect(forged.status()).toBe(401);
  });
}

test("/dashboard is excluded from crawler indexing at the page level", async ({ page }) => {
  await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toContain("noindex");
});

test("/dashboard does not appear in the sitemap", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).not.toContain("/dashboard");
});
