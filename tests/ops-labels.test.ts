import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Public navigation guards per founder Decisions 10 and 27 (2026-08-22) and
// the dashboard/Ops quarantine (Decisions 5/26). The header must carry only
// the approved labels; the quarantined client surfaces must not exist in the
// public build at all.

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

test("quarantined client surfaces are absent from the public build", () => {
  for (const gone of [
    "src/app/dashboard/layout.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/ops/page.tsx",
    "src/app/explore-demo/page.tsx",
    "src/app/system-review/page.tsx",
    "src/app/api/ops/config/route.ts",
    "src/app/api/dashboard-auth/send/route.ts",
  ]) {
    assert.ok(!has(gone), `${gone} must stay quarantined out of the public build`);
  }
});
