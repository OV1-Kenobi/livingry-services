import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operator Dashboard — Livingry TradeOps",
  robots: { index: false, follow: false },
};

const tabs = [
  { label: "Leak Overview", href: "/dashboard" },
  { label: "Exception Desk", href: "/dashboard/exceptions" },
  { label: "Credential Registry", href: "/dashboard/identity" },
  { label: "Event Log", href: "/dashboard/events" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <section className="section-tight paper-grain" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="container">
          <div className="eyebrow">Livingry TradeOps · Internal</div>
          <h1 className="serif mt-4" style={{ fontSize: "var(--step-3)" }}>Operator Dashboard</h1>
          <p className="mt-3" style={{ color: "var(--ink-2)", maxWidth: "42rem" }}>
            One view built around leaks, not generic activity — plus the Nostr-backed
            credential and audit layer underneath every automated action.
          </p>
          <nav className="mt-7 flex flex-wrap gap-2" aria-label="Dashboard sections">
            {tabs.map((t) => (
              <Link key={t.href} href={t.href} className="btn btn-secondary" style={{ paddingBlock: "0.5rem", paddingInline: "1rem", fontSize: "0.85rem" }}>
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div className="section">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
