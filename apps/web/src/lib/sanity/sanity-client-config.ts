import {
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
} from "@mono/environment-config";
import { ClientConfig } from "next-sanity";

import { token } from "./token";

export const sanityClientConfig: ClientConfig = {
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  apiVersion: "v2025-03-04",
  perspective: "published",
  useCdn: true,
  token,
  stega: {
    enabled: false,
    studioUrl: "http://localhost:3333/",
  },
};
