import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";

// Cross-platform test runner: the shell glob "tests/*.test.ts" does not expand
// on Windows cmd, so expand it here and forward the files to node --test.
const files = readdirSync("tests")
  .filter((f) => f.endsWith(".test.ts"))
  .sort()
  .map((f) => `tests/${f}`);

try {
  execFileSync(process.execPath, ["--import", "tsx", "--test", ...files], {
    stdio: "inherit",
  });
} catch {
  process.exit(1);
}