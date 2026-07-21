import Link from "next/link";
import Image from "next/image";

export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/livingry-logo.jpg"
      alt="Livingry Services logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain", borderRadius: "50%" }}
      priority
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <LogoMark size={compact ? 28 : 34} />
      {!compact && (
        <span className="serif text-[1.05rem] leading-none tracking-tight" style={{ color: "var(--ink)" }}>
          Livingry <span style={{ color: "var(--ink-3)" }}>Services</span>
        </span>
      )}
    </Link>
  );
}
