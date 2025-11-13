import { createClient } from "next-sanity";

import { sanityClientConfig } from "./sanity-client-config";

export const client = createClient(sanityClientConfig);
