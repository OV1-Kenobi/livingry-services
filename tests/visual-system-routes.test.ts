import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Guards for the six-asset visual system and the demo/dashboard quarantine
// (founder Decisions 5/26). These are source-level structural checks — they
// lock requirements that have no runtime harness so a regression is caught in
// CI rather than in visual QA.

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");
const has = (rel: string) => existsSync(resolve(process.cwd(), rel));

test("founding-five legacy path redirects to the canonical route, permanently", () => {
  const config = read("next.config.ts").replace(/\s+/g, " ");
  assert.ok(config.includes("async redirects()"), "next.config must define redirects()");
  assert.ok(
    config.includes('source: "/industries/hvac/founding-five"'),
    "redirect source is the legacy nested path",
  );
  assert.ok(
    config.includes('destination: "/hvac/founding-five"'),
    "redirect destination is the canonical path",
  );
  assert.ok(config.includes("permanent: true"), "the redirect is a permanent (308) redirect");
});

test("/explore-demo and /dashboard stay quarantined out of the public build", () => {
  assert.ok(!has("src/app/explore-demo/page.tsx"), "explore-demo route must not exist");
  assert.ok(!has("src/app/dashboard/layout.tsx"), "dashboard layout must not exist");
  assert.ok(!has("src/app/dashboard/page.tsx"), "dashboard page must not exist");
});

test("revenue-leak diagram shows the three leak points with no fabricated figures", () => {
  const src = read("src/components/diagrams/RevenueLeakDiagram.tsx");
  for (const name of ["Missed call", "Dormant estimate", "Neglected follow-up"]) {
    assert.ok(src.includes(name), `diagram names the "${name}" channel`);
  }
  assert.ok(src.includes("Sealed"), "diagram shows the sealed-workflow state");
  assert.ok(!/\$\s*\d/.test(src), "diagram invents no dollar figures");
});

test("orchestration graphic centers the Ops layer over seven categories", () => {
  const src = read("src/components/diagrams/OrchestrationGraphic.tsx");
  assert.ok(/from ["']@\/lib\/site["']/.test(src), "graphic derives categories from site data");
  assert.ok(/ops.?layer/i.test(src) || /eighth/i.test(src), "graphic names the Ops/eighth layer");
});

test("process-flow diagram is driven by the shared site.method steps", () => {
  const src = read("src/components/diagrams/ProcessFlowDiagram.tsx");
  assert.ok(/from ["']@\/lib\/site["']/.test(src), "flow diagram derives steps from site data");
  assert.ok(/site\.method/.test(src), "flow diagram iterates site.method");
});

test("illustrative image serves optimized formats via <picture> with a png fallback", () => {
  const src = read("src/components/IllustrativeImage.tsx");
  assert.ok(src.includes("<picture"), "uses a <picture> element");
  assert.ok(src.includes(".avif"), "offers an AVIF source");
  assert.ok(src.includes(".webp"), "offers a WebP source");
  assert.ok(src.includes(".png"), "keeps a PNG fallback");
});

test("both illustrative assets are present in every optimized format", () => {
  for (const base of ["founder-origin-collage", "hvac-field-context"]) {
    for (const ext of ["avif", "webp", "png"]) {
      assert.ok(has(`public/assets/${base}.${ext}`), `public/assets/${base}.${ext} exists`);
    }
  }
});

test("HVAC field-context visual labels itself illustrative and non-identifiable", () => {
  const src = read("src/components/HvacFieldContext.tsx").replace(/\s+/g, " ");
  assert.ok(/illustrative/i.test(src), "declares the image is illustrative");
  assert.ok(/fictional|non-identifiable/i.test(src), "declares the technician is fictional");
  assert.ok(/not a real customer|not a real client|not a .*case study/i.test(src), "denies it is a real case study");
});
