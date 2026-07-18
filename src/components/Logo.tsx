import Link from "next/link";

/**
 * Placeholder v1 logo: LS monogram inside a rounded container.
 * Uses currentColor so it inherits from context (dark/light).
 * Designed to work at 24px favicon size and up to 200px.
 */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9" stroke="currentColor" strokeWidth="1.5" />
      {/* L */}
      <path d="M11 10.5 V26 H19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* S — as a continuous curve */}
      <path
        d="M29 13.5c-1.5-1.6-3.6-2.2-5.5-1.6-2.2.7-3.4 2.9-2.6 4.9.7 1.7 2.5 2.3 4.4 2.8 1.9.5 3.9 1 4.6 2.7.8 2-.5 4.3-2.9 4.9-2 .5-4.1-.2-5.5-1.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <span className="text-forest" style={{ color: "var(--forest)" }}>
        <LogoMark size={30} />
      </span>
      {!compact && (
        <span className="serif text-[1.05rem] leading-none tracking-tight" style={{ color: "var(--ink)" }}>
          Livingry <span style={{ color: "var(--ink-3)" }}>Services</span>
        </span>
      )}
    </Link>
  );
}
