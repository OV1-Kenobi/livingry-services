import { CANDIDATE_CATALOG, CATEGORIES, FLOW_EDGES } from "./categories";
import { demoApprovals, demoHealth, demoLedger, demoScenarios } from "./demo-data";
import type { PublicDashboardData } from "./types";

// Assembles the public-safe dashboard payload. This is the ONLY data the
// public "streetfront" demo ever sees: shared categories + flow model +
// vendor-neutral catalog + synthetic Demo Data. It deliberately contains no
// configured vendor tools, credentials, customer data, or private config.
export function getPublicDashboardData(): PublicDashboardData {
  return {
    mode: "public",
    categories: CATEGORIES,
    edges: FLOW_EDGES,
    catalog: CANDIDATE_CATALOG,
    approvals: demoApprovals(),
    ledger: demoLedger(),
    scenarios: demoScenarios(),
    health: demoHealth(),
  };
}

// Real vendor brand names that must NEVER appear in the public payload or the
// public bundle. Used by the isolation tests as a leak tripwire.
export const PRIVATE_VENDOR_NAMES = [
  "Victoria AI",
  "Ela AI",
  "Caliope",
  "AuraMeet",
  "Aurameet",
  "Brevo",
  "aura-app",
  "n8n",
  "versionseven",
] as const;
