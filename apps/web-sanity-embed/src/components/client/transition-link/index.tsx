"use client";

import { Anchor } from "@mono/ui/client";
import NextLink, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren &
  Omit<LinkProps, "as"> & {
    transitionDuration?: number;
    transition?: "fade" | "morph" | "slide" | "scale";
    className?: string;
  };

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const TransitionLink = ({
  children,
  href,
  transitionDuration = 500,
  transition = "fade",
  className = "",
  ...rest
}: Props) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");

    body?.classList.add(`${transition}-transition`);
    await sleep(transitionDuration);

    router.push(href as string);

    await sleep(transitionDuration);
    body?.classList.remove(`${transition}-transition`);
  };

  return (
    <Anchor
      onClick={handleTransition}
      className={className}
      as={NextLink}
      href={href}
      {...rest}
    >
      {children}
    </Anchor>
  );
};
