import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

// Phase 1b hardening guards (ported from the livingry-ops Stage-3
// remediation). Every /api/ops route must verify the session server-side
// via the shared gate; mutating routes must apply the rate-limit tier;
// every per-record [id] handler must scope its query with `tenant_id`.
// The one exception is /api/ops/setup, which is gated by a constant-time
// SETUP_SECRET comparison instead of a user session.

function collectRoutes(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectRoutes(full));
    else if (entry === "route.ts") out.push(full);
  }
  return out;
}

const OPS_DIR = resolve(process.cwd(), "src/app/api/ops");
const routes = collectRoutes(OPS_DIR);

test("every /api/ops route file was found", () => {
  assert.ok(routes.length >= 13, `expected >=13 route files, found ${routes.length}`);
});

// Strip line comments so prose mentioning a legacy pattern is not mistaken
// for code still using it.
const codeOf = (src: string) => src.replace(/\/\/.*$/gm, "");

test("session-gated routes all use the server-side ops gate", () => {
  for (const file of routes) {
    const rel = file.slice(process.cwd().length + 1);
    if (rel.includes("setup")) continue; // SETUP_SECRET-gated, tested separately
    const src = codeOf(readFileSync(file, "utf8"));
    // The config route verifies the session via next/headers cookies +
    // verifySession (the livingry-ops Stage-3 pattern for that surface);
    // every data route goes through resolveOpsTenant.
    const gated =
      src.includes("resolveOpsTenant") || (rel.includes("config") && src.includes("verifySession"));
    assert.ok(
      gated,
      `${rel} must authenticate through resolveOpsTenant/verifySession (server-side session verification)`,
    );
    // The legacy forgeable static value must not exist anywhere in the family.
    assert.ok(!/"granted"/.test(src), `${rel} must not reference a static "granted" cookie value`);
  }
});

test("per-record [id] handlers are tenant-scoped", () => {
  const idRoutes = routes.filter((f) => f.replace(/\\/g, "/").includes("/[id]/"));
  assert.ok(idRoutes.length >= 4, "expected tasks/promises/exceptions/integrations [id] routes");
  for (const file of idRoutes) {
    const rel = file.slice(process.cwd().length + 1);
    const src = readFileSync(file, "utf8");
    assert.ok(
      /tenant_id\s*=\s*\$\{?/.test(src) || src.includes("and tenant_id"),
      `${rel} must scope its record lookup/mutation by tenant_id`,
    );
  }
});

test("mutating routes apply the ops rate limiter", () => {
  for (const file of routes) {
    const rel = file.slice(process.cwd().length + 1);
    if (rel.includes("setup")) continue;
    const src = readFileSync(file, "utf8");
    const hasPost = /export async function POST/.test(src);
    const hasDelete = /export async function DELETE/.test(src);
    if (!hasPost && !hasDelete) continue;
    // Credential-touching integrations writes use the tighter credentialWrite tier.
    const expectedTier = rel.includes("integrations") ? "credentialWrite" : "standard";
    assert.ok(
      src.includes(`opsRateLimit(req, "${expectedTier}")`),
      `${rel} mutating handler must call opsRateLimit(req, "${expectedTier}")`,
    );
  }
});

test("setup secret comparison is constant-time", () => {
  const src = readFileSync(resolve(OPS_DIR, "setup/route.ts"), "utf8");
  assert.ok(src.includes("timingSafeEqual"), "SETUP_SECRET compared with timingSafeEqual");
  assert.ok(!/secret !== process\.env\.SETUP_SECRET/.test(src), "no plain !== secret comparison");
});

test("OTP generation uses CSPRNG and send is rate-limited per IP", () => {
  const otpCode = codeOf(readFileSync(resolve(process.cwd(), "src/lib/otp-store.ts"), "utf8"));
  assert.ok(!otpCode.includes("Math.random"), "OTP codes must never come from Math.random");
  assert.ok(otpCode.includes("randomInt"), "OTP codes come from crypto.randomInt");
  const send = readFileSync(
    resolve(process.cwd(), "src/app/api/dashboard-auth/send/route.ts"),
    "utf8",
  );
  assert.ok(send.includes("send-otp:"), "send route applies an IP-keyed OTP send limit");
  assert.ok(send.includes("429"), "send route returns 429 when over the limit");
});
