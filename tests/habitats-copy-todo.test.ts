import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { habitatsTodos, totalHabitatsTodos } from "../src/lib/habitats-todos";

test("no fabricated Habitat prose — all body slots contain TODO(michael)", () => {
  const habitatsPage = readFileSync("src/app/habitats/page.tsx", "utf8");
  const landReviewPage = readFileSync("src/app/habitats/land-potential-review/page.tsx", "utf8");

  // Count TODO(michael) markers in each file
  const habitatsTodoCount = (habitatsPage.match(/TODO\(michael\)/g) || []).length;
  const landReviewTodoCount = (landReviewPage.match(/TODO\(michael\)/g) || []).length;

  // Registry says 17 for /habitats + 7 for /habitats/land-potential-review = 24 total
  const expectedHabitatsTodos = habitatsTodos
    .filter((t) => t.path === "/habitats")
    .reduce((sum, t) => sum + t.count, 0);
  const expectedLandReviewTodos = habitatsTodos
    .filter((t) => t.path === "/habitats/land-potential-review")
    .reduce((sum, t) => sum + t.count, 0);

  assert.equal(
    habitatsTodoCount,
    expectedHabitatsTodos,
    `Expected ${expectedHabitatsTodos} TODO(michael) markers in habitats/page.tsx, found ${habitatsTodoCount}`,
  );

  assert.equal(
    landReviewTodoCount,
    expectedLandReviewTodos,
    `Expected ${expectedLandReviewTodos} TODO(michael) markers in habitats/land-potential-review/page.tsx, found ${landReviewTodoCount}`,
  );

  // Total: 19 (habitats page) + 11 (land-potential-review) + 2 (land-review form) = 32
  assert.equal(
    totalHabitatsTodos,
    32,
    "Registry should track 32 total TODO markers across Habitat pages",
  );
});

test("Habitats pages contain no AI-fabricated prose about services", () => {
  const habitatsPage = readFileSync("src/app/habitats/page.tsx", "utf8");
  const landReviewPage = readFileSync("src/app/habitats/land-potential-review/page.tsx", "utf8");

  // Forbidden phrases that would indicate fabricated service descriptions
  const forbiddenPhrases = [
    "we help you",
    "our team will",
    "we work with you to",
    "our process includes",
    "we specialize in",
    "our approach is",
    "we believe that",
    "our mission is",
  ];

  forbiddenPhrases.forEach((phrase) => {
    assert.ok(
      !habitatsPage.toLowerCase().includes(phrase),
      `Habitats page should not contain fabricated phrase: "${phrase}"`,
    );
    assert.ok(
      !landReviewPage.toLowerCase().includes(phrase),
      `Land Review page should not contain fabricated phrase: "${phrase}"`,
    );
  });
});

test("Professional boundary banner is present on all Habitat pages", () => {
  const habitatsPage = readFileSync("src/app/habitats/page.tsx", "utf8");
  const landReviewPage = readFileSync("src/app/habitats/land-potential-review/page.tsx", "utf8");
  const landReviewFormPage = readFileSync("src/app/land-review/page.tsx", "utf8");

  const bannerText = "surveying, environmental work, permitting, and construction";

  assert.ok(
    habitatsPage.includes(bannerText),
    "Habitats page must include professional boundary banner",
  );
  assert.ok(
    landReviewPage.includes(bannerText),
    "Land Potential Review page must include professional boundary banner",
  );
  assert.ok(
    landReviewFormPage.includes(bannerText),
    "Land Review form page must include professional boundary banner",
  );
});

test("habitats-todos.ts registry is the single source of truth", () => {
  // Verify the registry structure is correct
  assert.ok(Array.isArray(habitatsTodos), "habitatsTodos should be an array");
  assert.ok(habitatsTodos.length > 0, "habitatsTodos should not be empty");

  habitatsTodos.forEach((entry) => {
    assert.ok(entry.path, "each entry must have a path");
    assert.ok(entry.section, "each entry must have a section");
    assert.ok(typeof entry.count === "number" && entry.count > 0, "each entry must have a positive count");
  });

  // Verify the total is calculated correctly
  const calculatedTotal = habitatsTodos.reduce((sum, entry) => sum + entry.count, 0);
  assert.equal(
    totalHabitatsTodos,
    calculatedTotal,
    "totalHabitatsTodos must match the sum of all entry counts",
  );
});
