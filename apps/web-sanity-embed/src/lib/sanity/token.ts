import "server-only";

import { SANITY_READ_TOKEN } from "@mono/environment-config";
import { experimental_taintUniqueValue } from "react";

export const token = SANITY_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

experimental_taintUniqueValue(
  "Do not pass the sanity API read token to the client.",
  process,
  token,
);
