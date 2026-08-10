import { permanentRedirect } from "next/navigation";
import { HVAC_ROUTE } from "@/lib/hvac-founding-five/content";

// The AI Opportunity Blueprint module is superseded by the Founding Five
// Tier 2 Pilot. The route stays live for inbound links and permanently
// redirects to the canonical Founding Five flow; the superseded commercial
// model must not remain in public copy. The analytics event namespace
// (BLUEPRINT_EVENTS) lives on in src/lib/ai-blueprint/content.ts.
export default function BlueprintRedirectPage() {
  permanentRedirect(HVAC_ROUTE);
}