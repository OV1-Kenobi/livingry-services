// Land Potential Review types — Habitat practice funnel
// Parallels src/lib/hvac-founding-five/types.ts for consistency

export type LandReviewRelationship =
  | "owner"
  | "co_owner"
  | "option_holder"
  | "representative"
  | "other";

export type LandReviewSiteControl =
  | "owns_free_clear"
  | "owns_with_mortgage"
  | "under_option"
  | "purchase_pending"
  | "other";

export type LandReviewNextStep =
  | "land_review"
  | "intro_call"
  | "feasibility"
  | "partnership_conversation"
  | "no_meeting_yet";

export type LandReviewStatus =
  | "new_land_inquiry"
  | "awaiting_initial_review"
  | "not_currently_aligned"
  | "intro_conversation_scheduled"
  | "information_requested"
  | "land_review_proposed"
  | "land_review_active"
  | "land_review_delivered"
  | "feasibility_proposed"
  | "feasibility_active"
  | "development_candidate"
  | "closed";

export interface LandReviewRequest {
  name: string;
  email: string;
  relationshipToProperty: LandReviewRelationship;
  propertyLocation: string;
  acreageEstimate?: number;
  siteControlStatus: LandReviewSiteControl;
  vision: string;
  preferredNextStep: LandReviewNextStep;
  parcelId?: string;
  existingSurveyUrl?: string;
  existingImprovements?: string;
  intendedTimeline?: string;
  predevelopmentBudgetRange?: string;
  referralSource?: string;
  consentRecordedAt: string;
  consentVersion: "v1";
}

export interface LandReviewRecord {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  relationshipToProperty: LandReviewRelationship;
  propertyLocation: string;
  acreageEstimate?: number;
  siteControlStatus: LandReviewSiteControl;
  vision: string;
  preferredNextStep: LandReviewNextStep;
  parcelId?: string;
  existingSurveyUrl?: string;
  existingImprovements?: string;
  intendedTimeline?: string;
  predevelopmentBudgetRange?: string;
  referralSource?: string;
  consentRecordedAt: string;
  consentVersion: string;
  status: LandReviewStatus;
  ownerId?: string;
  nextAction?: string;
  nextActionDueAt?: string;
  source?: string;
  campaign?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}
