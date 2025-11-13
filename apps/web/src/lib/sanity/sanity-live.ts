import { defineLive } from "next-sanity/live";
import { client } from "./sanity-client";
import { token } from "./token";

export const { sanityFetch: sanityFetchLive, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
