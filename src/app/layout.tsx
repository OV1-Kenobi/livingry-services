import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.primaryDomain),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.shortDescription,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
    url: site.primaryDomain,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
  keywords: [
    "revenue clarity and capture",
    "revenue leak diagnostic",
    "HVAC cash flow leaks",
    "missed calls HVAC",
    "estimate follow-up",
    "past customer reactivation",
    "HVAC referral automation",
    "HVAC/R operations",
    "human-controlled AI",
    "revenue and data continuity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ProfessionalService is a LocalBusiness subtype and is accurate here: a real
  // independent practice at a real address. No aggregateRating, review, price,
  // opening hours, or award is asserted — none of those are verified facts, and
  // inventing them is exactly the failure mode this markup is meant to avoid.
  const orgLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.primaryDomain}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.primaryDomain,
    email: site.contact.email,
    slogan: site.tagline,
    description: site.shortDescription,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: { "@type": "Country", name: "United States" },
    sameAs: [site.social.github].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Standard service choices",
      itemListElement: [
        {
          "@type": "Offer",
          price: "649",
          priceCurrency: "USD",
          itemOffered: {
            "@type": "Service",
            name: "Do It Yourself (DIY)",
            description:
              "Assessment, curation plan, company-branded Livingry Ops web app, agentic-search plan, Lead Readiness and Local Demand Intelligence package, and setup guidance. The client's team implements.",
            url: `${site.primaryDomain}/services-and-pricing`,
          },
        },
        {
          "@type": "Offer",
          price: "2500",
          priceCurrency: "USD",
          itemOffered: {
            "@type": "Service",
            name: "Done With You (DWY)",
            description:
              "Everything in DIY, two standard leak systems, a trained Company Operating System Agent on the client's own infrastructure, implementation coordination, live owner exit-testing, and post-delivery support.",
            url: `${site.primaryDomain}/services-and-pricing`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Done For You (DFY)",
            description:
              "Active management of approved systems after the Done With You baseline is established, with published reference pricing and performance-triggered billing mechanics.",
            url: `${site.primaryDomain}/services-and-pricing`,
          },
        },
      ],
    },
    knowsAbout: [
      "Revenue & Data Continuity",
      "Revenue Clarity & Capture",
      "Missed calls and slow response",
      "Estimate follow-up",
      "Past-customer reactivation",
      "Referrals, reviews, and testimonials",
      "Human-controlled AI systems",
      "HVAC/R operations",
      "Win/Win/Win service philosophy",
    ],
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.primaryDomain}/#website`,
    url: site.primaryDomain,
    name: site.name,
    publisher: { "@id": `${site.primaryDomain}/#organization` },
    inLanguage: "en-US",
  };

  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgLd} />
        <JsonLd data={websiteLd} />
      </body>
    </html>
  );
}
