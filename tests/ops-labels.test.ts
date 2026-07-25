import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Production QA copy guards. The public navigation must invite visitors to an
// explicit *demo*, while the authenticated /dashboard must present itself as the
// client's own workspace — never a demo or a prospective-client preview.

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

const HEADER = read("src/components/Header.tsx");
const GATE = read("src/components/DashboardLoginGate.tsx");
const LAYOUT = read("src/app/dashboard/layout.tsx");

test("public nav links to the Explore Demo Dashboard at /ops", () => {
  assert.ok(
    HEADER.includes('{ label: "Explore Demo Dashboard", href: "/ops" }'),
    "Header must expose the exact 'Explore Demo Dashboard' label linked to /ops",
  );
  // The old bare "Dashboard" -> /ops label must be gone.
  assert.ok(
    !HEADER.includes('{ label: "Dashboard", href: "/ops" }'),
    "The old bare 'Dashboard' label must be replaced",
  );
});

test("OTP sign-in gate positions /dashboard as the client workspace", () => {
  assert.ok(GATE.includes("Livingry Ops · Client workspace"), "gate eyebrow reads as client workspace");
  assert.ok(GATE.includes("Sign in to your tailored Ops dashboard"), "gate heading is the tailored-dashboard sign-in");
  const gateText = GATE.replace(/\s+/g, " ");
  assert.ok(
    gateText.includes("Authenticated clients access their configured tools, workflows, approvals, and operational data"),
    "gate explains authenticated access to configured tools/workflows/approvals/data",
  );
});

test("authenticated dashboard never calls itself a demo or prospective preview", () => {
  for (const [name, src] of [["login gate", GATE], ["dashboard layout", LAYOUT]] as const) {
    assert.ok(!/demo/i.test(src), `${name} must not describe itself as a demo`);
    assert.ok(!/prospective/i.test(src), `${name} must not describe itself as a prospective-client preview`);
    assert.ok(!/\bsample\b/i.test(src), `${name} must not call itself a sample dashboard`);
  }
});

test("OTP mechanism is preserved on the sign-in gate", () => {
  assert.ok(GATE.includes("/api/dashboard-auth/send"), "gate still sends the OTP");
  assert.ok(GATE.includes("/api/dashboard-auth/verify"), "gate still verifies the OTP");
  assert.ok(GATE.includes("Send OTP via Nostr"), "gate keeps the Nostr OTP send control");
});
