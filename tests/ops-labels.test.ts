import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Public navigation guards per founder Decisions 10 and 27 (2026-08-22) and
// the dashboard/Ops quarantine (Decisions 5/26), amended by the Phase 1b
// recovery (founder direction 2026-08-23): the private authenticated Ops
// backend is restored but must stay absent from the PUBLIC surface — never
// linked from public chrome, excluded from the sitemap, noindex, and
// auth-gated at the server.

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");
const has = (rel: string) => existsSync(resolve(process.cwd(), rel));

const HEADER = read("src/components/Header.tsx");
const FOOTER = read("src/components/Footer.tsx");

test("header carries exactly the approved desktop nav set", () => {
  for (const label of ["Revenue Leaks", "How It Works", "Evidence", "Services & Pricing", "About"]) {
    assert.ok(HEADER.includes(`label: "${label}"`), `desktop nav must include "${label}"`);
  }
  assert.ok(HEADER.includes("Diagnose My Cash Flow Leaks"), "desktop CTA is present");
  // Mobile adds Insights and FAQ on top of the desktop five.
  assert.ok(HEADER.includes('label: "Insights"'), "mobile menu includes Insights");
  assert.ok(HEADER.includes("Frequently Asked Questions"), "mobile menu includes FAQ");
});

test("forbidden labels appear in no menu (Decision 10)", () => {
  const forbidden = [
    "Industries",
    "Livingry Ops",
    "Live Demo",
    "Explore Demo Dashboard",
    "Proof",
    "Book a Leak Assessment",
    "Founding Five",
  ];
  for (const source of [HEADER, FOOTER]) {
    for (const label of forbidden) {
      assert.ok(!source.includes(label), `"${label}" must not appear in any menu`);
    }
  }
});

test("Client Sign In stays in the header (Decision 27 override)", () => {
  assert.ok(HEADER.includes("Client Sign In"), "Decision 27 keeps Client Sign In in the header");
});

test("mobile CTA reads Diagnose My Leaks", () => {
  assert.ok(HEADER.includes("Diagnose My Leaks"), "mobile button label is Diagnose My Leaks");
});

// Phase 1b semantics: the private authenticated Ops backend is RESTORED
// (founder direction 2026-08-23), so the guard no longer asserts file
// absence for /dashboard and its API. Instead it asserts
// ABSENCE-FROM-THE-PUBLIC-SURFACE: never linked from public chrome,
// excluded from the sitemap, disallowed for crawlers, noindex at the
// layout, and auth-gated server-side. Genuinely removed public demo pages
// stay asserted absent.

test("genuinely removed public demo surfaces stay absent", () => {
  for (const gone of [
    "src/app/ops/page.tsx",
    "src/app/explore-demo/page.tsx",
    "src/app/system-review/page.tsx",
  ]) {
    assert.ok(!has(gone), `${gone} must remain removed from the public build`);
  }
});

test("restored private dashboard is absent from the public surface", () => {
  // Strip line comments so prose (e.g. decision references) is not mistaken
  // for live links.
  const code = (rel: string) => read(rel).replace(/\/\/.*$/gm, "").replace(/\{\/\*[\s\S]*?\*\//g, "");
  const HEADER_CODE = code("src/components/Header.tsx");
  const FOOTER_CODE = code("src/components/Footer.tsx");
  // The restored files exist…
  for (const restored of [
    "src/app/dashboard/layout.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/api/ops/config/route.ts",
    "src/app/api/dashboard-auth/send/route.ts",
  ]) {
    assert.ok(has(restored), `${restored} should be present (private authenticated surface)`);
  }
  // …but are advertised nowhere in the public chrome. The ONE permitted
  // reference is the Decision-27 "Client Sign In" header link, which points
  // visitors at the auth gate (never exposes dashboard content or tabs).
  const headerDashRefs = HEADER_CODE.split("/dashboard").length - 1;
  assert.ok(headerDashRefs === 1, `Header must reference /dashboard only via Client Sign In (found ${headerDashRefs})`);
  assert.ok(HEADER_CODE.includes("Client Sign In"), "the single /dashboard link is the Client Sign In entry");
  assert.ok(!FOOTER_CODE.includes("/dashboard"), "Footer must not link the private dashboard");
  assert.ok(!HEADER_CODE.includes("Habitats-OS"), "Habitats-OS link stays in the private dashboard, not public nav");
  assert.ok(!FOOTER_CODE.includes("Habitats-OS"), "Habitats-OS link stays out of the public footer");
  // …are excluded from crawler discovery.
  const sitemap = read("src/app/sitemap.ts");
  assert.ok(!sitemap.includes('"/dashboard'), "Sitemap must not list the private dashboard");
  const robots = read("src/app/robots.ts");
  assert.ok(robots.includes("/dashboard"), "robots.ts must disallow /dashboard");
  // …and carry noindex at the dashboard layout (inherited by every page).
  const layout = read("src/app/dashboard/layout.tsx");
  assert.ok(layout.includes("index: false"), "dashboard layout must set robots noindex");
});

test("the private dashboard is auth-gated server-side, not just client-hidden", () => {
  // Strip comments so prose about the removed legacy value is not mistaken
  // for code still using it.
  const code = (rel: string) => read(rel).replace(/\/\/.*$/gm, "");
  const sessionRoute = code("src/app/api/dashboard-auth/session/route.ts");
  assert.ok(sessionRoute.includes("verifySession"), "session probe verifies the signed token server-side");
  assert.ok(!sessionRoute.includes('"granted"'), 'no static "granted" value in the session probe');
  const gate = read("src/components/ops/OpsDashboard.tsx");
  assert.ok(gate.includes("/leak-assessment"), "OpsDashboard links point at the live leak-assessment route");
  assert.ok(!gate.includes("/system-review"), "OpsDashboard must not reference the removed /system-review");
});
