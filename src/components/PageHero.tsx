import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lede,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section paper-grain">
      <div className="container max-w-4xl">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="serif mt-6">{title}</h1>
        <p className="mt-7 serif" style={{ fontSize: "var(--step-2)", lineHeight: 1.4, color: "var(--ink-2)", maxWidth: "48rem" }}>
          {lede}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-9 flex flex-wrap gap-3">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn-primary">
                {primaryCta.label} <span aria-hidden>→</span>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container" style={{ paddingBlock: "1rem", fontSize: "0.82rem", color: "var(--ink-3)" }}>
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden style={{ color: "var(--ink-3)" }}>/</span>}
            {i < items.length - 1 ? (
              <Link href={it.href} className="hover:text-forest" style={{ color: "var(--ink-3)" }}>{it.label}</Link>
            ) : (
              <span style={{ color: "var(--ink-2)" }}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EndCta({
  title = "Find the highest-value leak in your business.",
  primary = { label: "Find My Biggest Leak", href: "/system-review" },
  secondary,
}: {
  title?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section-tight" style={{ background: "var(--paper-2)" }}>
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-2 items-end">
          <h2 className="serif" style={{ fontSize: "var(--step-3)" }}>{title}</h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href={primary.href} className="btn btn-primary">{primary.label} <span aria-hidden>→</span></Link>
            {secondary && <Link href={secondary.href} className="btn btn-ghost">{secondary.label} <span aria-hidden>→</span></Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
