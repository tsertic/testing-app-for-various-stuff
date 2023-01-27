import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";

export default defineConfig({
  basePath: "/studio",
  name: "LEARNING_studio",
  title: "learning sanity studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    : "",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  theme: myTheme,
});
