import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/theme-today",
        destination: "/creative-direction",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
