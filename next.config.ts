import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — the parent folder has its own lockfile, which
  // otherwise makes Turbopack's root inference ambiguous.
  turbopack: {
    root: path.join(__dirname),
  },
  // Allow next/image to optimize photos served from Sanity's CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
