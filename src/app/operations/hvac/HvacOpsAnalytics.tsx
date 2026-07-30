"use client";

import { useEffect } from "react";
import { HVAC_OPS_EVENTS, type HvacOpsEvent } from "@/lib/hvac-operations/content";
import { trackClientEvent } from "@/lib/hvac-founding-five/analytics";

// Fires the page-view event on mount, observes the leak-map and TradeOps
// sections for first-time visibility, and delegates click tracking for CTAs
// via data-analytics attributes — so the page itself stays a server component.
// No PII is ever included in payloads (enforced by trackClientEvent).
export function HvacOpsAnalytics() {
  useEffect(() => {
    trackClientEvent(HVAC_OPS_EVENTS.pageView);

    const viewed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-analytics-view");
          if (!id || viewed.has(id)) continue;
          viewed.add(id);
          if (id === "leak-map") {
            trackClientEvent(HVAC_OPS_EVENTS.leakMapView);
          } else if (id === "tradeops") {
            trackClientEvent(HVAC_OPS_EVENTS.tradeopsView);
          }
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll("[data-analytics-view]")
      .forEach((el) => observer.observe(el));

    const clickEvents: Record<string, HvacOpsEvent> = {
      "hvac-ops-hero-primary": HVAC_OPS_EVENTS.heroPrimaryCtaClick,
      "hvac-ops-hero-secondary": HVAC_OPS_EVENTS.heroSecondaryCtaClick,
      "hvac-ops-intake": HVAC_OPS_EVENTS.intakeClick,
      "hvac-ops-fit-call": HVAC_OPS_EVENTS.fitConversationClick,
    };
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-analytics]");
      if (!el) return;
      const kind = el.getAttribute("data-analytics");
      const event = kind ? clickEvents[kind] : undefined;
      if (event) {
        trackClientEvent(event);
      }
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
