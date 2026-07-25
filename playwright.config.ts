import { defineConfig } from "@playwright/test";

// E2E geometry + screenshot checks for the public Ops lifecycle diagram.
// Runs against a production build (`next start`) so the assertions reflect what
// ships. Node:test unit specs live in tests/; Playwright specs live in e2e/.
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: false,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "off" },
  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://127.0.0.1:3100/ops",
    timeout: 120_000,
    reuseExistingServer: false,
  },
});
