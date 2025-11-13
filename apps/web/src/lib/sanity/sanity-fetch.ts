import { draftMode } from "next/headers";

import { sanityFetchLive } from "./sanity-live";
import { token } from "./token";

export type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
};

export async function sanityFetch<QueryResponse>(options: SanityFetchOptions) {
  let isDraftMode: boolean;

  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch {
    isDraftMode = false;
  }

  const response = await sanityFetchLive({
    ...options,
    ...(isDraftMode && {
      perspective: "drafts",
      stega: true,
      useCdn: false,
      token,
    }),
  });

  return { ...response, data: response.data as QueryResponse };
}
