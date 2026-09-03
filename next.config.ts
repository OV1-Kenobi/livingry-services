import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Legacy/incorrect nesting of the HVAC pilot funnel. Query values are
        // preserved automatically by the redirect engine.
        source: "/industries/hvac/founding-five",
        destination: "/hvac/founding-five",
        permanent: true,
      },
      {
        // Umbrella expansion: /what-we-build redirects to /operations (the Operations practice).
        // Per spec §4.8, permanent 301 redirect.
        source: "/what-we-build",
        destination: "/operations",
        permanent: true,
      },
      // Decision 28 (2026-08-22) leftover-page treatments:
      {
        // Proof content archived with the Evidence page (founder instruction
        // 2026-09-02): the Evidence page is unpublished until documented
        // client evidence exists, so /proof now lands on the homepage.
        source: "/proof",
        destination: "/",
        permanent: false,
      },
      {
        // Evidence page ARCHIVED per founder instruction 2026-09-02: removed
        // from nav/footer/sitemap and unpublished until real client evidence
        // exists. Temporary redirect so the page can return cleanly later.
        // Page content preserved in git history (commit 76fd865^ era).
        source: "/evidence",
        destination: "/",
        permanent: false,
      },
      {
        // Why-Livingry folds into About.
        source: "/why-livingry",
        destination: "/about",
        permanent: true,
      },
      {
        // Agents folds into How It Works.
        source: "/agents",
        destination: "/how-it-works",
        permanent: true,
      },
      {
        // Land Review form removed from the public build (Decision 5 quarantine);
        // components preserved on branch preserve/wp2-2026-08-23 if ever needed privately.
        source: "/land-review",
        destination: "/",
        permanent: false,
      },
      {
        // Industries hidden from the public build (Decision 28). The specific
        // founding-five redirect above takes precedence (first match wins).
        source: "/industries",
        destination: "/",
        permanent: true,
      },
      {
        source: "/industries/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
