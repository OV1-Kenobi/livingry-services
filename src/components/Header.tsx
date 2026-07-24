"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const nav = [
  {
    label: "What We Build",
    href: "/what-we-build",
    children: [
      { label: "Response Systems", href: "/systems/response-systems" },
      { label: "Recovery Systems", href: "/systems/recovery-systems" },
      { label: "Customer Continuity", href: "/systems/customer-continuity" },
      { label: "Discovery & Trust", href: "/systems/discovery-and-trust" },
      { label: "Knowledge Systems", href: "/systems/knowledge-systems" },
      { label: "Workflow Systems", href: "/systems/workflow-systems" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "HVAC Companies", href: "/industries/hvac" },
      { label: "HVAC · Founding Five Pilot", href: "/hvac/founding-five" },
      { label: "Roofing Companies", href: "/industries/roofing" },
      { label: "Professional Practices", href: "/industries/professional-practices" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Explore Demo Dashboard", href: "/ops" },
  { label: "Why Livingry", href: "/about" },
  { label: "Proof", href: "/proof" },
  { label: "FAQ", href: "/faq" },
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
      <div className="container flex items-center justify-between" style={{ paddingBlock: "0.9rem" }}>
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <div key={item.href} className="relative group">
              <Link href={item.href} className="nav-link">{item.label}</Link>
              {item.children && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                  style={{ minWidth: "16rem" }}
                >
                  <div
                    className="rounded-md p-2"
                    style={{ background: "var(--white)", border: "1px solid var(--rule)", boxShadow: "0 6px 24px rgba(15,21,18,0.06)" }}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-3 py-2 rounded text-[0.9rem]"
                        style={{ color: "var(--ink-2)" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/dashboard" className="nav-link">Client Sign In</Link>
          <Link href="/system-review" className="btn btn-primary">
            Find My Biggest Leak
            <span aria-hidden>→</span>
          </Link>
        </div>
        <button
          className="lg:hidden inline-flex items-center justify-center rounded p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          style={{ border: "1px solid var(--rule)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden container" style={{ paddingBottom: "1.25rem", borderTop: "1px solid var(--rule)" }}>
          <div className="grid gap-3 pt-4">
            {nav.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="nav-link block" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-1 grid gap-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="text-[0.9rem] py-1"
                        style={{ color: "var(--ink-3)" }}
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/dashboard" className="nav-link block mt-2" onClick={() => setOpen(false)}>Client Sign In</Link>
            <Link href="/system-review" className="btn btn-primary mt-2 w-fit" onClick={() => setOpen(false)}>
              Find My Biggest Leak <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
