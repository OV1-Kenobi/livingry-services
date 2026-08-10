import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 4.5rem)" }}>
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2 max-w-md">
            <div style={{ color: "var(--paper)" }}>
              <Logo />
            </div>
            <p className="serif mt-5" style={{ color: "var(--paper)", fontSize: "1.35rem", lineHeight: 1.3, opacity: 0.92 }}>
              Systems that stop already-earned value from leaking away.
            </p>
            <p className="mt-4" style={{ color: "var(--paper)", opacity: 0.82, fontSize: "1rem" }}>
              An independent practice. Human-controlled. Measurable. Built around the people and systems you already have.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--seal)" }}>Systems</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              {site.systemFamilies.map((s) => (
                <li key={s.slug}>
                  <Link href={`/systems/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--seal)" }}>Industries</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              {site.industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`}>{i.title}</Link>
                </li>
              ))}
            </ul>
            <div className="eyebrow mt-8" style={{ color: "var(--seal)" }}>Company</div>
            <ul className="mt-4 grid gap-2 text-[1rem]" style={{ color: "var(--paper)", opacity: 0.92 }}>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/assessment">17-Point Leak Assessment</Link></li>
              <li><Link href="/about">Why Livingry</Link></li>
              <li><Link href="/proof">Proof</Link></li>
              <li><Link href="/why-livingry">The Livingry Idea</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/agents">For AI Agents</Link></li>
              <li><Link href="/system-review">System Review</Link></li>
              <li><Link href="/hvac/founding-five">Founding Five</Link></li>
            </ul>
          </div>
        </div>

        <hr className="mt-12" style={{ borderColor: "rgba(246,241,228,0.14)" }} />
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[0.9rem]" style={{ color: "var(--paper)", opacity: 0.78 }}>
          <div>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
