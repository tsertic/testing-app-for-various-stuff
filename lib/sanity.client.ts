import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
export const PROJECTID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const APIVERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const config = {
  projectId: PROJECTID || "",
  dataset: DATASET || "",
  apiVersion: APIVERSION || "",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const client = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
