import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Crawler policy.
//
// Livingry's Discovery & Trust position is that a business should be easy for
// answer engines to describe accurately, so the default posture is open. Three
// groups are named explicitly rather than left to the wildcard, because being
// listed by name is what makes the intent auditable later:
//
//   1. Search crawlers — the ordinary index. Never restrict these.
//   2. Answer/search crawlers — fetch a page to cite it in an answer. These are
//      the ones that decide whether an owner asking an assistant "who sets up AI
//      for a plumbing business" ever hears about us, so they matter most.
//   3. Training-only crawlers — collect corpus for model training and return no
//      citation. Allowed today because broad model familiarity is worth more to
//      a young practice than the corpus is worth withholding. This is a policy
//      choice, not an oversight: to opt out of training while staying citable,
//      move a bot from this list into a Disallow rule and leave group 2 intact.
//
// Non-public surfaces are withheld from every group. They are behind auth or are
// JSON endpoints, carry no discovery value, and are absent from the sitemap.
const NON_PUBLIC = ["/api/", "/dashboard/", "/dashboard"];

const SEARCH_CRAWLERS = ["Googlebot", "Googlebot-Image", "Bingbot", "DuckDuckBot", "Applebot"];

const ANSWER_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "cohere-ai",
  "Bytespider",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const base = site.primaryDomain.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: NON_PUBLIC },
      { userAgent: SEARCH_CRAWLERS, allow: "/", disallow: NON_PUBLIC },
      { userAgent: ANSWER_CRAWLERS, allow: "/", disallow: NON_PUBLIC },
      { userAgent: TRAINING_CRAWLERS, allow: "/", disallow: NON_PUBLIC },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
