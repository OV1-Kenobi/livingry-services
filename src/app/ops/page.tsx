import type { Metadata } from "next";
import { OpsDashboard } from "@/components/ops/OpsDashboard";

export const metadata: Metadata = {
  title: "Ops Dashboard — Live Demo | Livingry",
  description:
    "Explore the Livingry Ops orchestration dashboard: an interactive, safe demo of how response, recovery, continuity, discovery, knowledge, workflow, and TradeOps systems are coordinated with human approval and a proof ledger.",
};

// Public "streetfront" demo. Unauthenticated. Renders the SHARED dashboard in
// public mode: generic categories, a vendor-neutral catalog, and synthetic
// Demo Data only. No credentials, customer data, private config, or external
// actions are ever involved here.
export default function OpsDemoPage() {
  return <OpsDashboard mode="public" />;
}
