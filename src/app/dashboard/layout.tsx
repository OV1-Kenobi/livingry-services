"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardLoginGate } from "@/components/DashboardLoginGate";

const tabs = [
  { label: "Leak Overview", href: "/dashboard" },
  { label: "Ops Center", href: "/dashboard/ops-center" },
  { label: "Exception Desk", href: "/dashboard/exceptions" },
  { label: "Credential Registry", href: "/dashboard/identity" },
  { label: "Integrations", href: "/dashboard/integrations" },
  { label: "Event Log", href: "/dashboard/events" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard-auth/session")
      .then((r) => r.json())
      .then((d) => setGranted(Boolean(d.granted)))
      .catch(() => setGranted(false))
      .finally(() => setChecked(true));
  }, []);

  async function logout() {
    await fetch("/api/dashboard-auth/session", { method: "DELETE" }).catch(() => {});
    setGranted(false);
  }

  if (!checked) {
    return (<div className="section"><div className="container"><p style={{ color: "var(--ink-3)" }}>Checking session…</p></div></div>);
  }
  if (!granted) return <DashboardLoginGate onUnlocked={() => setGranted(true)} />;

  return (
    <div>
      <div className="container" style={{ paddingBlock: "0.5rem", fontSize: "0.78rem", color: "var(--ink-3)", borderBottom: "1px solid var(--rule)" }}>
        <strong style={{ color: "var(--copper)" }}>Demo mode.</strong> This is a sample
        dashboard using placeholder data so prospective clients can preview what a
        tailored TradeOps backend looks like. Real client dashboards are custom-built
        and owned by that client, on their own data.
      </div>
      <section className="section-tight paper-grain" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="container">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="eyebrow">Livingry TradeOps · Internal</div>
              <h1 className="serif mt-4" style={{ fontSize: "var(--step-3)" }}>Operator Dashboard</h1>
              <p className="mt-3" style={{ color: "var(--ink-2)", maxWidth: "42rem" }}>One view built around leaks, not generic activity — plus the Nostr-backed credential and audit layer underneath every automated action.</p>
            </div>
            <button className="btn btn-ghost" onClick={logout}>Sign out</button>
          </div>
          <nav className="mt-7 flex flex-wrap gap-2" aria-label="Dashboard sections">
            {tabs.map((t) => (<Link key={t.href} href={t.href} className="btn btn-secondary" style={{ paddingBlock: "0.5rem", paddingInline: "1rem", fontSize: "0.85rem" }}>{t.label}</Link>))}
          </nav>
        </div>
      </section>
      <div className="section"><div className="container">{children}</div></div>
    </div>
  );
}
