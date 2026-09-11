import type { MetadataRoute } from "next";
import { SITE_URL, IS_INDEXABLE, absolute } from "@/lib/seo";

/**
 * Env-driven robots.txt — this IS the "swap staging for production on deploy"
 * step: it's generated at build time from the deploy's env vars.
 *
 * - Staging / preview / not-yet-launched (IS_INDEXABLE=false): block everything.
 * - Production (NEXT_PUBLIC_SEO_INDEXABLE=true on the real domain): allow crawl,
 *   disallow the /studio CMS admin, allow OAI-SearchBot, disallow GPTBot, and
 *   point crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio/", "/studio"] },
      // OpenAI's search crawler (powers ChatGPT search results): allowed.
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/studio/"] },
      // OpenAI's model-training crawler: disallowed.
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: SITE_URL,
  };
}
