import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { presentationTool } from "sanity/presentation";
import {
  NODE_ENV,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_ORIGIN,
  SANITY_STUDIO_PROJECT_ID,
} from "@mono/environment-config";

const isProduction = NODE_ENV === "production";

export default defineConfig({
  name: "default",
  title: "mono",

  basePath: "/studio",
  projectId: SANITY_STUDIO_PROJECT_ID || "",
  dataset: SANITY_STUDIO_DATASET || "",

  plugins: [
    structureTool(),
    ...(!isProduction ? [visionTool()] : []),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_ORIGIN,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
  ],

  schema: { types: schemaTypes },
});
