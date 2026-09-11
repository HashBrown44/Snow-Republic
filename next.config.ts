import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — the parent folder has its own lockfile, which
  // otherwise makes Turbopack's root inference ambiguous.
  turbopack: {
    root: path.join(__dirname),
  },
  // next/image optimization: serve modern formats (AVIF, then WebP fallback)
  // and allow photos served from Sanity's CDN to be optimized.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
