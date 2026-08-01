"use client";

import { useEffect } from "react";
import { HVAC_EVENTS, trackClientEvent } from "@/lib/hvac-founding-five/analytics";

// Fires the page-view event on mount and delegates click tracking for CTAs and
// proof/email links via data-analytics attributes, so the page itself stays a
// server component. No PII is ever included in the payloads.
export function HvacAnalytics() {
  useEffect(() => {
    trackClientEvent(HVAC_EVENTS.pageView);

    // Observe the alliance terms section for first-time visibility.
    let termsViewed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || termsViewed) continue;
          if (entry.target.getAttribute("data-analytics-view") === "alliance-terms") {
            termsViewed = true;
            trackClientEvent("hvac_alliance_terms_view");
          }
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll("[data-analytics-view]")
      .forEach((el) => observer.observe(el));

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-analytics]");
      if (!el) return;
      const kind = el.getAttribute("data-analytics");
      if (kind === "hvac-primary-cta") trackClientEvent(HVAC_EVENTS.primaryCtaClick);
      else if (kind === "hvac-proof-matters") trackClientEvent(HVAC_EVENTS.proofMattersClick);
      else if (kind === "hvac-email") trackClientEvent(HVAC_EVENTS.emailClick);
      else if (kind === "hvac-alliance-apply") trackClientEvent("hvac_alliance_apply_click");
      else if (kind === "hvac-fit-call") trackClientEvent(HVAC_EVENTS.fitCallBooked);
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
