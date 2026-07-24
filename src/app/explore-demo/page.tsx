import type { Metadata } from "next";
import { OpsDashboard } from "@/components/ops/OpsDashboard";

export const metadata: Metadata = {
  title: "Explore the Demo Dashboard | Livingry",
  description:
    "Explore the Livingry Ops orchestration dashboard: an interactive, safe demo of how response, recovery, continuity, discovery, knowledge, workflow, and TradeOps systems are coordinated with human approval and an activity ledger.",
};

// Canonical public "streetfront" demo route. Unauthenticated. Renders the
// SHARED dashboard in public mode: generic categories, a vendor-neutral
// catalog, and synthetic Demo Data only. No credentials, customer data,
// private config, or external actions are ever involved here.
export default function ExploreDemoPage() {
  return (
    <>
      <h1 className="sr-only">Livingry Ops — explore the demo dashboard</h1>
      <OpsDashboard mode="public" />
    </>
  );
}
