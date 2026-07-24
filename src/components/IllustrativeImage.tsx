import type { CSSProperties } from "react";

// Renders an optimized <picture> (AVIF → WebP → PNG fallback) for the two
// pre-optimized editorial assets in /public/assets. Alt text is required and
// must describe the image as illustrative — never as a real customer, case
// study, or documentary portrait. Width/height are set to reserve layout space
// and prevent shift; the intrinsic assets are 1600px wide.
export function IllustrativeImage({
  base,
  alt,
  width = 1600,
  height,
  className,
  style,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
}: {
  base: "founder-origin-collage" | "hvac-field-context";
  alt: string;
  width?: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
}) {
  const src = `/assets/${base}`;
  return (
    <picture>
      <source srcSet={`${src}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`${src}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${src}.png`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={{ display: "block", width: "100%", height: "auto", ...style }}
      />
    </picture>
  );
}
