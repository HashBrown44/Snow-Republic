import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/**
 * Sanity Studio config. The editing dashboard is embedded in the site at
 * /studio — the owner signs in there to edit all content. Until a project id is
 * set (NEXT_PUBLIC_SANITY_PROJECT_ID), the public site runs on fallback content.
 */
export default defineConfig({
  name: "snow-republic",
  title: "Snow Republic Brewery",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
