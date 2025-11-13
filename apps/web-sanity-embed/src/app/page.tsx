import { TransitionLink } from "@components/client";
import { sanityFetch } from "@lib/sanity";
import { Search } from "@mono/ui";
import { Button } from "@mono/ui/client";
import { Typography } from "@mono/ui/server";
import { defineQuery } from "next-sanity";

export default async function HomePage() {
  const data = await sanityFetch({
    query: defineQuery(`
      *[_type == "author" && !(_id in path("drafts.**"))] {
        name,
        "path": slug.current,
      }
    `),
  });

  return (
    <main className="flex flex-col items-center gap-10 min-h-screen p-24">
      <TransitionLink href="/about" transition="fade">
        Go to About Page
      </TransitionLink>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Typography>Example Typography</Typography>
      <Button iconLeft={<Search />} iconRight={<Search />}>
        Example button
      </Button>
    </main>
  );
}
