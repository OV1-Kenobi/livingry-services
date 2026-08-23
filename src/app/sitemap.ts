import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedArticles } from "@/lib/insights";
import { revenueLeaks } from "@/lib/revenue-leaks/content";

// Sitemap per the 2026-08-11 plan: the public surface is the four revenue
// leaks, the method, evidence, services & pricing, the diagnostics, and the
// content hub. Practice pages, product pages, the demo, the dashboard path,
// and the Founding Five funnel are not advertised to crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.primaryDomain.replace(/\/$/, "");
  const now = new Date();
  const staticRoutes = [
    "/",
    "/revenue-leaks",
    "/how-it-works",
    "/evidence",
    "/services-and-pricing",
    "/assessment",
    "/leak-assessment",
    "/about",
    "/insights",
    "/faq",
    "/privacy",
    "/terms",
  ];
  const leakRoutes = revenueLeaks.map((l) => `/revenue-leaks/${l.slug}`);
  const articleRoutes = publishedArticles.map((a) => a.path);

  const all = [...staticRoutes, ...leakRoutes, ...articleRoutes];

  const conversionRoutes = new Set(["/assessment", "/leak-assessment"]);
  const priorityFor = (path: string) => {
    if (path === "/") return 1;
    if (conversionRoutes.has(path)) return 0.9;
    if (path === "/services-and-pricing") return 0.85;
    if (path.startsWith("/revenue-leaks/")) return 0.8;
    if (path.startsWith("/insights/")) return 0.8;
    if (path === "/revenue-leaks" || path === "/how-it-works" || path === "/evidence" || path === "/about") return 0.7;
    return 0.6;
  };

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));
}