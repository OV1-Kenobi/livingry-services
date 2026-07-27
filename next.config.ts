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
    ];
  },
};

export default nextConfig;
