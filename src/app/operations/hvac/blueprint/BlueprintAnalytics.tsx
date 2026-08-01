"use client";

import { useEffect } from "react";
import { BLUEPRINT_EVENTS } from "@/lib/ai-blueprint/content";
import { trackClientEvent } from "@/lib/hvac-founding-five/analytics";

// Fires the Blueprint page-view event on mount, tracks CTA clicks via
// data-analytics attributes, and observes the report/scope section for
// first-time visibility. No PII is ever included in payloads.
export function BlueprintAnalytics() {
  useEffect(() => {
    trackClientEvent(BLUEPRINT_EVENTS.pageView);

    let scopeViewed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || scopeViewed) continue;
          if (entry.target.getAttribute("data-analytics-view") === "blueprint-scope") {
            scopeViewed = true;
            trackClientEvent(BLUEPRINT_EVENTS.scopeView);
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
      if (kind === "hvac-blueprint-cta") trackClientEvent(BLUEPRINT_EVENTS.primaryCtaClick);
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
