"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardLoginGate } from "@/components/DashboardLoginGate";
import { DashboardPublicPreview } from "@/components/DashboardPublicPreview";

// Bound the session check so an unreachable/slow auth API never leaves the
// unauthenticated visitor stuck on "Checking session…".
const SESSION_CHECK_TIMEOUT_MS = 6000;

const tabs = [
  { label: "Ops Dashboard", href: "/dashboard" },
  { label: "Ops Center", href: "/dashboard/ops-center" },
  { label: "Exception Desk", href: "/dashboard/exceptions" },
  { label: "Credential Registry", href: "/dashboard/identity" },
  { label: "Integrations", href: "/dashboard/integrations" },
  { label: "Event Log", href: "/dashboard/events" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [granted, setGranted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SESSION_CHECK_TIMEOUT_MS);
    fetch("/api/dashboard-auth/session", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setGranted(Boolean(d.granted)))
      .catch(() => setGranted(false))
      .finally(() => {
        clearTimeout(timer);
        setChecked(true);
      });
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  async function logout() {
    await fetch("/api/dashboard-auth/session", { method: "DELETE" }).catch(() => {});
    setGranted(false);
    setShowSignIn(false);
  }

  if (!checked) {
    return (
      <div className="section">
        <div className="container">
          <p style={{ color: "var(--ink-3)" }}>Checking session…</p>
        </div>
      </div>
    );
  }

  if (!granted) {
    if (showSignIn) {
      return <DashboardLoginGate onUnlocked={() => setGranted(true)} />;
    }
    return <DashboardPublicPreview onSignIn={() => setShowSignIn(true)} />;
  }

  return (
    <div>
      <div className="container" style={{ paddingBlock: "0.5rem", fontSize: "0.78rem", color: "var(--ink-3)", borderBottom: "1px solid var(--rule)" }}>
        <strong style={{ color: "var(--copper)" }}>Client workspace.</strong> Your configured
        tools, workflows, approvals, and operational data. Tool configuration you change here
        is saved to your workspace and persists across sessions and devices.
      </div>
      <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper-2)" }}>
        <div className="container" style={{ paddingBlock: "0.9rem" }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="eyebrow">Livingry Ops · Client workspace</div>
            <button className="btn btn-ghost" style={{ paddingBlock: "0.4rem" }} onClick={logout}>Sign out</button>
          </div>
          <nav className="mt-3 flex flex-wrap gap-2" aria-label="Dashboard sections">
            {tabs.map((t) => (<Link key={t.href} href={t.href} className="btn btn-secondary" style={{ paddingBlock: "0.45rem", paddingInline: "0.9rem", fontSize: "0.82rem" }}>{t.label}</Link>))}
          </nav>
        </div>
      </section>
      <div className="section"><div className="container">{children}</div></div>
    </div>
  );
}
