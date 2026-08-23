import type { Metadata } from "next";
import { OpsDashboard } from "@/components/ops/OpsDashboard";

export const metadata: Metadata = { title: "Ops Dashboard — Livingry TradeOps", robots: { index: false, follow: false } };

// Authenticated client control panel. Rendered inside the OTP-gated dashboard
// layout, this is the SAME shared shell as the public /ops demo — but in
// private mode it loads the client's curated tool configuration from the
// session-gated /api/ops/config route instead of synthetic Demo Data.
export default function DashboardOverviewPage() {
  return <OpsDashboard mode="private" />;
}
