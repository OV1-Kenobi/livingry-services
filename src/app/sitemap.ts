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
    "/why-livingry",
    "/about",
    "/insights",
    "/faq",
    "/agents",
    "/system-review",
    "/privacy",
    "/terms",
  ];
  const systemRoutes = site.systemFamilies.map((s) => `/systems/${s.slug}`);
  const industryRoutes = site.industries.map((i) => `/industries/${i.slug}`);

  const all = [...staticRoutes, ...systemRoutes, ...industryRoutes];

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/industries/") || path.startsWith("/systems/") ? 0.8 : 0.6,
  }));
}
