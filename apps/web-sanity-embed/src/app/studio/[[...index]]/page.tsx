import dynamicLoad from "next/dynamic";

// Ensures the Studio route is statically generated
export const dynamic = "force-static";

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata } from "next-sanity/studio";
export { viewport } from "next-sanity/studio";

const Studio = dynamicLoad(() => import("./lazy-studio"));

export default function StudioPage() {
  return <Studio />;
}
