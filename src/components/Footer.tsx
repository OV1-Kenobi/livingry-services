import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { canonicalPositioningLine } from "@/lib/revenue-leaks/content";

// Footer per the 2026-08-11 plan §13: Start Here, Explore, Trust, Legal.
// No client access, app login, public demo, vendor list, or experimental
// project links. Trust items resolve to the sections that actually explain
// each concept.
export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 4.5rem)" }}>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 max-w-md">
            <div style={{ color: "var(--paper)" }}>
              <Logo />
            </div>
            <p className="serif mt-5" style={{ color: "var(--paper)", fontSize: "1.2rem", lineHeight: 1.35, opacity: 0.92 }}>
              {canonicalPositioningLine}
            </p>
            <p className="mt-4" style={{ color: "var(--paper)", opacity: 0.82, fontSize: "1rem" }}>
              An independent practice focused on Revenue Clarity &amp; Capture for established HVAC/R
              companies. Not lead generation, not a customer relationship management system, and not
              autonomous customer service — people stay accountable for consequential decisions.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--seal)" }}>Start Here</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              <li><Link href="/assessment">Diagnose My Cash Flow Leaks</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/services-and-pricing">Services &amp; Pricing</Link></li>
              <li><Link href={site.booking.url}>Book My Leak Assessment</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--seal)" }}>Explore</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              <li><Link href="/revenue-leaks">Revenue Leaks</Link></li>
              <li><Link href="/evidence">Evidence</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--seal)" }}>Trust</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              <li><Link href="/#human-approval">Human Approval</Link></li>
              <li><Link href="/#winwinwin">Win/Win/Win</Link></li>
              <li><Link href="/about#ownership-and-handoff">Ownership and Handoff</Link></li>
              <li><Link href="/how-it-works#data-continuity">Data Continuity</Link></li>
              <li><a href={`mailto:${site.contact.email}`}>Contact</a></li>
            </ul>
          </div>
        </div>

        <hr className="mt-12" style={{ borderColor: "rgba(246,241,228,0.14)" }} />
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[0.9rem]" style={{ color: "var(--paper)", opacity: 0.78 }}>
          <div>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}