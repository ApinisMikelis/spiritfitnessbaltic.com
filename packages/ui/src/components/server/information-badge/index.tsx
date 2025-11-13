import type { PropsWithChildren } from "react";

import { Typography, type TypographyVariant } from "../typography";
import { IconClone, type Icon } from "../icon-clone";
import { cn } from "../../../lib/utils";

export type InformationBadgeColor = "green" | "yellow" | "red" | "neutral";

type Props = PropsWithChildren & {
  iconLeft?: Icon;
  iconRight?: Icon;
  size?: "large" | "small";
  color?: InformationBadgeColor;
  className?: string;
};

export const InformationBadge = ({
  children,
  iconLeft,
  iconRight,
  size = "large",
  color = "green",
  className = "",
}: Props) => {
  let textAppearance: TypographyVariant = "cap-xs";
  const iconClassName = cn("inline-block shrink-0", {
    "size-3": size === "small",
    "size-4": size === "large",
  });

  if (size === "small") {
    textAppearance = "cap-xxs";
  }

  return (
    <div
      className={cn(
        "flex gap-0-5 rounded-250 text-center w-fit",
        {
          "py-1 px-2": size === "large",
          "px-2 py-[1px]": size === "small",

          "bg-success-100 text-success-900": color === "green",
          "bg-warning-100 text-warning-900": color === "yellow",
          "bg-error-100 text-error-900": color === "red",
          "bg-info-100 text-info-900": color === "neutral",
        },
        className,
      )}
    >
      {iconLeft && (
        <IconClone
          icon={iconLeft}
          className={cn(iconClassName, iconLeft.props.className)}
        />
      )}
      <Typography appearance={textAppearance}>{children}</Typography>
      {iconRight && (
        <IconClone
          icon={iconRight}
          className={cn(iconClassName, iconLeft?.props.className)}
        />
      )}
    </div>
  );
};
