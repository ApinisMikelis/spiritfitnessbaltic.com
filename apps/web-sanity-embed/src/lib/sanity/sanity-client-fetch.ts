import { client } from "./sanity-client";
import { type SanityFetchOptions } from "./sanity-fetch";
import { token } from "./token";

export async function sanityFetchClient<QueryResponse>(
  options: SanityFetchOptions,
) {
  let isDraftMode: boolean;

  try {
    isDraftMode = document.cookie.includes("isDraftMode=true");
  } catch {
    isDraftMode = false;
  }

  const response = await client.fetch(options.query, options.params, {
    ...(isDraftMode && {
      token,
      perspective: "drafts",
      stega: true,
      useCdn: false,
    }),
  });

  return { data: response as QueryResponse };
}
