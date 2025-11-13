import type { PropsWithChildren } from "react";

import { Typography, type TypographyVariant } from "../typography";
import { cn } from "../../../lib/utils";

export type NotificationBadgeColor =
  | "red"
  | "green"
  | "yellow"
  | "outline"
  | "dark";

type Props = PropsWithChildren & {
  size?: "large" | "small";
  color?: NotificationBadgeColor;
  className?: string;
};

export const NotificationBadge = ({
  children,
  size = "large",
  color = "red",
  className = "",
}: Props) => {
  let textAppearance: TypographyVariant = "cap-base";

  if (size === "small") {
    textAppearance = "cap-xxs";
  }

  return (
    <div
      className={cn(
        "rounded-250 text-center shrink-0 flex items-center justify-center",
        {
          "size-[16px]":
            (!children && size === "large") || (size === "small" && !!children),
          "size-[8px]": !children && size === "small",
          "size-[24px]": size === "large" && !!children,

          "bg-error-500 text-neutral-900": color === "red",
          "bg-success-500 text-neutral-900": color === "green",
          "bg-warning-500 text-neutral-900": color === "yellow",
          "bg-neutral-000 text-neutral-900 border border-neutral-900":
            color === "outline",
          "bg-neutral-900 text-neutral-000 border border-neutral-000":
            color === "dark",
        },
        className,
      )}
    >
      <Typography appearance={textAppearance}>{children}</Typography>
    </div>
  );
};
