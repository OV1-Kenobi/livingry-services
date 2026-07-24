"use client";

import { useEffect } from "react";
import { HVAC_EVENTS, trackClientEvent } from "@/lib/hvac-founding-five/analytics";

// Fires the page-view event on mount and delegates click tracking for CTAs and
// proof/email links via data-analytics attributes, so the page itself stays a
// server component. No PII is ever included in the payloads.
export function HvacAnalytics() {
  useEffect(() => {
    trackClientEvent(HVAC_EVENTS.pageView);
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-analytics]");
      if (!el) return;
      const kind = el.getAttribute("data-analytics");
      if (kind === "hvac-primary-cta") trackClientEvent(HVAC_EVENTS.primaryCtaClick);
      else if (kind === "hvac-proof-matters") trackClientEvent(HVAC_EVENTS.proofMattersClick);
      else if (kind === "hvac-email") trackClientEvent(HVAC_EVENTS.emailClick);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
