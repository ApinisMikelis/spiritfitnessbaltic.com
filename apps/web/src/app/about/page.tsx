import { TransitionLink } from "@components/client";

export default async function AboutPage() {
  return (
    <main className="flex flex-col items-center gap-10 min-h-screen p-24">
      <TransitionLink href="/" transition="fade">
        Go back to home page
      </TransitionLink>
    </main>
  );
}
