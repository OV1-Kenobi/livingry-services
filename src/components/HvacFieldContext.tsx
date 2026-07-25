import { IllustrativeImage } from "@/components/IllustrativeImage";

// HVAC field-context visual with at most two restrained workflow overlays.
// The image is illustrative field context showing a fictional, non-identifiable
// technician — never a real client, customer, or case study.
export function HvacFieldContext({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`diagram ${className ?? ""}`}>
      <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--rule)" }}>
        <IllustrativeImage
          base="hvac-field-context"
          height={844}
          priority={priority}
          sizes="(min-width: 1024px) 1000px, 100vw"
          alt="Illustrative field context: a fictional, non-identifiable HVAC technician kneeling with a tablet beside a condenser unit, a service van in the background. Illustration of typical field work, not a real customer or case study."
        />
        {/* Two restrained workflow overlays — where value leaks in the field. */}
        <figcaption
          aria-hidden="true"
          style={{
            position: "absolute", left: "4%", top: "8%", margin: 0,
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(15,21,18,0.82)", color: "var(--paper)",
            fontSize: "0.72rem", letterSpacing: "0.04em",
            padding: "0.3rem 0.6rem", borderRadius: "999px",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--copper)" }} />
          Missed call while on the job
        </figcaption>
        <figcaption
          aria-hidden="true"
          style={{
            position: "absolute", right: "4%", bottom: "9%", margin: 0,
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(15,21,18,0.82)", color: "var(--paper)",
            fontSize: "0.72rem", letterSpacing: "0.04em",
            padding: "0.3rem 0.6rem", borderRadius: "999px",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--seal)" }} />
          Estimate left to go cold
        </figcaption>
      </div>
      <figcaption>
        Illustrative field context — a fictional technician, not a real customer or case study.
        The overlays mark two common points where an HVAC company loses already-earned demand.
      </figcaption>
    </figure>
  );
}
