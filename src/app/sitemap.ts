import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedArticles } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.primaryDomain.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = [
    "/",
    "/what-we-build",
    "/operations",
    "/operations/hvac",
    "/operations/hvac/blueprint",
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
    "/operations/hvac",
    "/hvac/founding-five",
    "/ops",
    "/explore-demo",
    "/privacy",
    "/terms",
  ];
  const systemRoutes = site.systemFamilies.map((s) => `/systems/${s.slug}`);
  const industryRoutes = site.industries.map((i) => `/industries/${i.slug}`);
  const articleRoutes = publishedArticles.map((a) => a.path);

  const all = [...staticRoutes, ...systemRoutes, ...industryRoutes, ...articleRoutes];

  // Conversion routes and practice pages rank high for search/answer engines.
  // Per umbrella expansion: /operations and /habitats are practice entry points,
  // /land-review is the Habitats conversion funnel.
  const conversionRoutes = new Set(["/system-review", "/assessment", "/operations/hvac"]);
  const practicePages = new Set(["/operations", "/habitats"]);
  const priorityFor = (path: string) => {
    if (path === "/") return 1;
    if (path === "/land-review") return 0.95;
    if (conversionRoutes.has(path) || practicePages.has(path)) return 0.9;
    if (path === "/habitats/land-potential-review") return 0.85;
    if (path.startsWith("/industries/") || path.startsWith("/systems/")) return 0.8;
    if (path.startsWith("/insights/")) return 0.8;
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
