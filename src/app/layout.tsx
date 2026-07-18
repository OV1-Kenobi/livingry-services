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
  authors: [{ name: site.parent }],
  keywords: [
    "AI implementation",
    "revenue recovery",
    "customer continuity",
    "AI Growth Systems",
    "HVAC AI",
    "roofing AI",
    "agent discovery",
    "AI SEO",
    "AI life-support systems",
    "livingry",
    "OpenAgents",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.primaryDomain}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.primaryDomain,
    parentOrganization: { "@type": "Organization", name: site.parent, url: "https://openagents.com" },
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
    sameAs: [site.social.github].filter(Boolean),
    knowsAbout: [
      "AI implementation",
      "AI Growth Systems",
      "Revenue recovery",
      "Customer continuity",
      "Agent discovery",
      "AI SEO",
      "HVAC operations",
      "Roofing operations",
      "Professional services intake",
      "Buckminster Fuller livingry",
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
