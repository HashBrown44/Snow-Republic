import type { MetadataRoute } from "next";
import { ROUTES, absolute } from "@/lib/seo";

/**
 * Generated from the canonical route list in lib/seo.ts. Only indexable URLs
 * are included — /studio (CMS admin), assets and error pages are excluded.
 * Referenced from robots.ts via its `sitemap` field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absolute(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
