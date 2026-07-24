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
    ];
  },
};

export default nextConfig;
