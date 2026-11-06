import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/experiences", permanent: true },
      { source: "/work/:slug", destination: "/experiences", permanent: true },
    ];
  },
};

export default nextConfig;
