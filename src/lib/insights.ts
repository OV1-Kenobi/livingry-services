// Published Insights articles. The hub and the article route read the same
// record so the card, the canonical URL, the sitemap entry, and the Article
// schema cannot drift apart. Only genuinely published guides belong here — the
// unpublished roadmap lives on the hub with its honest status.
export type PublishedArticle = {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  published: string;
  words: number;
  heroImage: string;
  ogImage: string;
  heroAlt: string;
  keywords: readonly string[];
};

export const aiForHvacCompanies: PublishedArticle = {
  slug: "ai-for-hvac-companies",
  path: "/insights/ai-for-hvac-companies",
  title: "AI for HVAC Companies: A Practical Field Guide",
  seoTitle: "AI for HVAC Companies: A Practical Field Guide",
  description:
    "Learn where AI helps HVAC companies, where it creates risk, how to evaluate tools, and how to prove one controlled workflow in 90 days.",
  excerpt:
    "AI can recover missed inquiries, cut response time, prepare follow-up, and make operational exceptions visible. It should not diagnose equipment, promise prices, screen customers for good reviews, or contact anyone without enforceable consent. This guide shows owners how to find a measurable leak, set the autonomy ceiling, interrogate vendors, and run a controlled 90-day pilot.",
  category: "HVAC",
  published: "2026-07-25",
  words: 4679,
  heroImage: "/assets/insights/ai-for-hvac-companies-hero.png",
  ogImage: "/assets/insights/ai-for-hvac-companies-og.png",
  heroAlt:
    "Editorial illustration of an HVAC owner, technician, and office coordinator connected by a single AI-assisted customer workflow running from inquiry through scheduling, field work, invoicing, and follow-up.",
  keywords: [
    "AI for HVAC companies",
    "HVAC AI",
    "AI tools for HVAC",
    "HVAC automation",
    "AI receptionist for HVAC",
    "HVAC business software",
    "HVAC workflow automation",
    "HVAC call answering",
    "HVAC operations",
  ],
};

export const publishedArticles: PublishedArticle[] = [aiForHvacCompanies];
