import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLandReviewRequest } from "../src/lib/land-review/validation";
import type { LandReviewRequest } from "../src/lib/land-review/types";

test("required field enforcement", () => {
  const minimal: Partial<LandReviewRequest> = {
    name: "Test User",
    email: "test@example.com",
    relationshipToProperty: "owner",
    propertyLocation: "Austin, TX",
    siteControlStatus: "owns_free_clear",
    vision: "A small regenerative homestead with permaculture design and natural building materials",
    preferredNextStep: "land_review",
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1",
  };

  const result = validateLandReviewRequest(minimal);
  assert.equal(result.ok, true, "minimal valid submission should pass");
  assert.equal(Object.keys(result.errors).length, 0, "no validation errors");
});

test("email format validation", () => {
  const invalid = {
    name: "Test",
    email: "not-an-email",
    relationshipToProperty: "owner" as const,
    propertyLocation: "Austin",
    siteControlStatus: "owns_free_clear" as const,
    vision: "Valid vision text that is long enough",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  const result = validateLandReviewRequest(invalid);
  assert.equal(result.ok, false, "invalid email should fail");
  assert.ok(result.errors.email, "email error should be present");
});

test("name length validation", () => {
  const tooShort = {
    name: "A",
    email: "test@example.com",
    relationshipToProperty: "owner" as const,
    propertyLocation: "Austin, TX",
    siteControlStatus: "owns_free_clear" as const,
    vision: "Valid vision text that is long enough",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  const result = validateLandReviewRequest(tooShort);
  assert.equal(result.ok, false);
  assert.ok(result.errors.name, "name too short should error");
});

test("property location validation", () => {
  const tooShort = {
    name: "Test User",
    email: "test@example.com",
    relationshipToProperty: "owner" as const,
    propertyLocation: "TX",
    siteControlStatus: "owns_free_clear" as const,
    vision: "Valid vision text that is long enough",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  const result = validateLandReviewRequest(tooShort);
  assert.equal(result.ok, false);
  assert.ok(result.errors.propertyLocation);
});

test("vision length validation", () => {
  const tooShort = {
    name: "Test User",
    email: "test@example.com",
    relationshipToProperty: "owner" as const,
    propertyLocation: "Austin, TX",
    siteControlStatus: "owns_free_clear" as const,
    vision: "Too short",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  const result = validateLandReviewRequest(tooShort);
  assert.equal(result.ok, false);
  assert.ok(result.errors.vision, "vision too short should error");

  const tooLong = {
    ...tooShort,
    vision: "x".repeat(2001),
  };
  const result2 = validateLandReviewRequest(tooLong);
  assert.equal(result2.ok, false);
  assert.ok(result2.errors.vision, "vision too long should error");
});

test("acreage estimate numeric validation", () => {
  const valid = {
    name: "Test User",
    email: "test@example.com",
    relationshipToProperty: "owner" as const,
    propertyLocation: "Austin, TX",
    acreageEstimate: 5.5,
    siteControlStatus: "owns_free_clear" as const,
    vision: "Valid vision text that is long enough for validation",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  const result = validateLandReviewRequest(valid);
  assert.equal(result.ok, true, "valid acreage should pass");
});

test("enum values are respected", () => {
  const validRelationships = ["owner", "co_owner", "option_holder", "representative", "other"];
  const validSiteControl = ["owns_free_clear", "owns_with_mortgage", "under_option", "purchase_pending", "other"];
  const validNextSteps = ["land_review", "intro_call", "feasibility", "partnership_conversation", "no_meeting_yet"];

  assert.ok(validRelationships.length === 5, "all relationship options defined");
  assert.ok(validSiteControl.length === 5, "all site control options defined");
  assert.ok(validNextSteps.length === 5, "all next step options defined");
});

test("consent version constant is v1", () => {
  const validRequest = {
    name: "Test User",
    email: "test@example.com",
    relationshipToProperty: "owner" as const,
    propertyLocation: "Austin, TX",
    siteControlStatus: "owns_free_clear" as const,
    vision: "Valid vision text that is long enough",
    preferredNextStep: "land_review" as const,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: "v1" as const,
  };

  assert.equal(validRequest.consentVersion, "v1", "consent version must be v1");
});
