import "./globals.css";

import { SanityLive } from "@lib/sanity";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { Geist } from "next/font/google";
import { draftMode } from "next/headers";
import { PropsWithChildren } from "react";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mono",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        {isEnabled ? <VisualEditing /> : <SanityLive />}
      </body>
    </html>
  );
}
