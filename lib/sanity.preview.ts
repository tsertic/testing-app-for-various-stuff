import { definePreview } from "next-sanity/preview";
import { PROJECTID, DATASET } from "./sanity.client";

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`);
}

if (!PROJECTID || !DATASET) {
  throw new Error(
    "Missing projectid or dataset.check your sanity.json or .env"
  );
}

export const usePreview = definePreview({
  projectId: PROJECTID,
  dataset: DATASET,
  onPublicAccessOnly,
});
