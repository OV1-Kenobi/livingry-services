"use client";

import Link from "next/link";
import { OpsDashboard } from "@/components/ops/OpsDashboard";

// Shown to unauthenticated visitors on /dashboard once the bounded session
// check resolves — so they land on a useful public preview instead of being
// stuck on "Checking session…". No client credentials, customer records, or
// private configuration appear here; the embedded dashboard runs in public mode.
export function DashboardPublicPreview({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper-2)" }}>
        <div className="container" style={{ paddingBlock: "1.4rem" }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div style={{ maxWidth: "44rem" }}>
              <div className="eyebrow">Livingry Ops · Public preview</div>
              <h1 className="mt-2" style={{ fontSize: "var(--step-2)", lineHeight: 1.15 }}>
                This is a public preview of the Ops dashboard
              </h1>
              <p className="mt-2" style={{ color: "var(--ink-2)", maxWidth: "40rem" }}>
                You are viewing generic categories and illustrative demo data — no client
                credentials, customer records, or private configuration are shown here. Sign in
                to reach your own workspace, or explore the interactive demo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={onSignIn}>
                Sign in
              </button>
              <Link className="btn btn-secondary" href="/explore-demo">
                Explore demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      <OpsDashboard mode="public" />
    </div>
  );
}
