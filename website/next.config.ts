import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel supports standard build with Image Optimization
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
