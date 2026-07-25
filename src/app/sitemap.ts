import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.primaryDomain.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = [
    "/",
    "/what-we-build",
    "/industries",
    "/how-it-works",
    "/assessment",
    "/why-livingry",
    "/about",
    "/proof",
    "/insights",
    "/faq",
    "/agents",
    "/system-review",
    "/hvac/founding-five",
    "/ops",
    "/explore-demo",
    "/privacy",
    "/terms",
  ];
  const systemRoutes = site.systemFamilies.map((s) => `/systems/${s.slug}`);
  const industryRoutes = site.industries.map((i) => `/industries/${i.slug}`);

  const all = [...staticRoutes, ...systemRoutes, ...industryRoutes];

  // The two conversion routes rank alongside the service and industry pages:
  // they are the pages a search or answer engine should surface for an owner who
  // has already decided to act.
  const conversionRoutes = new Set(["/system-review", "/assessment"]);
  const priorityFor = (path: string) => {
    if (path === "/") return 1;
    if (conversionRoutes.has(path)) return 0.9;
    if (path.startsWith("/industries/") || path.startsWith("/systems/")) return 0.8;
    if (path === "/insights" || path === "/faq" || path === "/how-it-works") return 0.7;
    return 0.6;
  };

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));
}
