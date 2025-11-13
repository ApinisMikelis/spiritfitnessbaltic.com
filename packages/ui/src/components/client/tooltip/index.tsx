"use client";

import { type PropsWithChildren, useEffect, useState } from "react";
import { Button as TooltipButton, TooltipTrigger } from "react-aria-components";

import { cn } from "../../../lib/utils";
import type { Icon } from "../../server";
import { TooltipBase, type TooltipPlacement } from "./tooltip-base";

type Props = PropsWithChildren & {
  isOpen?: boolean;
  title?: string;
  icon?: Icon;
  subTitle?: string;
  className?: string;
  placement?: TooltipPlacement;
  size?: "small" | "large";
  trigger?: "focus";
};

export const Tooltip = ({
  isOpen: isManualOpen,
  children,
  className = "",
  trigger,
  ...rest
}: Props) => {
  const [isOpen, setIsOpen] = useState<undefined | true>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(undefined);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <TooltipTrigger
      trigger={trigger}
      closeDelay={0}
      delay={0}
      isOpen={isManualOpen || isOpen}
    >
      <TooltipButton
        onPress={() => setIsOpen(true)}
        className={cn(
          "cursor-pointer focus-visible:outline-none rounded lg:w-fit",
          className,
        )}
      >
        {children}
      </TooltipButton>
      <TooltipBase {...rest} />
    </TooltipTrigger>
  );
};
