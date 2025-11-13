import { type ElementType, forwardRef, ReactNode } from "react";

import { IconClone } from "../../server/icon-clone";
import type {
  IconCloneType,
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "../../../types";
import { Typography, type TypographyVariant } from "../../server/typography";
import { cn } from "../../../lib/utils";

export type TooltipLinkProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      size?: "small" | "medium" | "large";
      iconLeft?: IconCloneType;
      iconRight?: IconCloneType;
      className?: string;
    }
  >;

type Props = <C extends ElementType = "a">(
  props: TooltipLinkProps<C>,
  ref?: PolymorphicRef<C>,
) => ReactNode;

// @ts-expect-error TooltipLink
export const TooltipLink: Props = forwardRef(function TooltipLink<
  C extends ElementType = "a",
>(
  {
    as,
    size = "medium",
    iconLeft,
    iconRight,
    children,
    className = "",
    ...rest
  }: TooltipLinkProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || "a";

  const iconClassName = cn("inline-block shrink-0", {
    "size-3": size === "small",
    "size-4": size === "medium",
    "size-5": size === "large",
  });

  let textAppearance: TypographyVariant;

  switch (size) {
    case "small":
      textAppearance = "p-reg-sm";
      break;
    case "medium":
      textAppearance = "p-reg-base";
      break;
    default:
      textAppearance = "p-reg-md";
      break;
  }

  return (
    <Component
      ref={ref}
      {...rest}
      className={cn(
        "flex items-center duration-300 w-fit group relative",
        "text-neutral-900 hover:text-neutral-500",

        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-px",
        "after:transition-all after:duration-300 after:border-dashed after:border-neutral-900 after:border",
        "hover:after:border-neutral-500",
        {
          "gap-0.5": size === "small",
          "gap-1": size === "medium",
          "gap-1.5": size === "large",
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
      <Typography
        as="span"
        appearance={textAppearance}
        className="w-full text-center"
      >
        {children}
      </Typography>
      {iconRight && (
        <IconClone
          icon={iconRight}
          className={cn(iconClassName, iconRight.props.className)}
        />
      )}
    </Component>
  );
});
