"use client";

import { type PropsWithChildren, useId, useState } from "react";
import { Typography } from "../../server/typography";
import { ChevronDown } from "../../icons";
import { cn } from "../../../lib/utils";

type Props = PropsWithChildren & {
  title: string;
  subTitle?: string;
  isOpen?: boolean;
  className?: string;
};

export const Accordion = ({
  title,
  subTitle,
  children,
  isOpen: isDefaultOpen = false,
  className = "",
}: Props) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="flex w-full items-center justify-between text-left py-8 px-2 cursor-pointer border-t border-neutral-200"
      >
        <div className="flex flex-col gap-1 w-full">
          <Typography appearance="p-bld-md" className="text-neutral-900">
            {title}
          </Typography>
          <Typography appearance="p-reg-sm" className="text-neutral-900">
            {subTitle}
          </Typography>
        </div>
        <ChevronDown
          className={cn("size-8 shrink-0 duration-300 text-neutral-900", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <div className="border-b border-neutral-200">
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "overflow-hidden grid transition-all duration-300 ease-in-out",
            {
              "grid-rows-1fr visible pb-8": isOpen,
              "grid-rows-0fr invisible": !isOpen,
            },
          )}
        >
          <div className="min-h-0 overflow-hidden px-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
