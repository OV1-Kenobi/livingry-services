import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as bp from "../src/lib/ai-blueprint/content";
import { findProhibitedClaims } from "../src/lib/hvac-founding-five/content";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const pageSource = readFileSync(
  resolve(root, "src/app/operations/hvac/blueprint/page.tsx"),
  "utf8",
);

test("route and event names are namespaced", () => {
  assert.equal(bp.BLUEPRINT_ROUTE, "/operations/hvac/blueprint");
  const events = Object.values(bp.BLUEPRINT_EVENTS);
  assert.equal(new Set(events).size, events.length);
  for (const e of events) assert.match(e, /^hvac_blueprint_/);
});

test("the legacy Blueprint route now redirects permanently to the Founding Five flow", () => {
  assert.match(pageSource, /permanentRedirect\(/);
  assert.match(pageSource, /hvac-founding-five\/content/);
  assert.doesNotMatch(pageSource, /\$799|findings call|2x|12-week|four-week gate/);
});

test("no superseded commercial model appears in the route source", () => {
  assert.deepEqual(findProhibitedClaims(pageSource), []);
});