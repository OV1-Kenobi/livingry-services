"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

// Public navigation per the 2026-08-11 plan §4, amended 2026-09-02 (founder
// instruction): the claims-ladder page is archived until documented client
// proof exists, so its nav item is removed — four due-diligence items that
// answer what is leaking, how it works, what it costs, and who runs it, plus
// the diagnostic action. Promo, product, and client-access links are not in
// global navigation.
const desktopNav = [
  { label: "Revenue Leaks", href: "/revenue-leaks" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services & Pricing", href: "/services-and-pricing" },
  { label: "About", href: "/about" },
];

const mobileNav = [
  ...desktopNav,
  { label: "Insights", href: "/insights" },
  { label: "Frequently Asked Questions", href: "/faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backdropFilter: "saturate(140%) blur(8px)",
        background: "color-mix(in oklab, var(--paper) 82%, transparent)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container flex items-center justify-between gap-6" style={{ paddingBlock: "0.9rem" }}>
        <Logo />
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 min-w-0">
          {desktopNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex shrink-0 items-center gap-4">
          {/* Decision 27 override (2026-08-22): Client Sign In is deliberately
              KEPT in the header to support future Habitats-OS sister-site
              portal wiring, superseding the plan's removal of it. Shown from
              xl up so the nav never overlaps the CTA at lg widths. */}
          <Link href="/dashboard" className="nav-link whitespace-nowrap hidden xl:inline">
            Client Sign In
          </Link>
          <Link href="/assessment" className="btn btn-primary whitespace-nowrap">
            Diagnose My Cash Flow Leaks
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="lg:hidden flex items-center gap-3">
          <Link href="/assessment" className="btn btn-primary" style={{ fontSize: "0.9rem", paddingInline: "0.9rem" }}>
            Diagnose My Leaks
          </Link>
          <button
            className="inline-flex items-center justify-center rounded p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ border: "1px solid var(--rule)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden container" style={{ paddingBottom: "1.25rem", borderTop: "1px solid var(--rule)" }}>
          <div className="grid gap-3 pt-4">
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link block"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}