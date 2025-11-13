"use client";

import { type ElementType, forwardRef, type ReactNode } from "react";

import { IconClone } from "../../server/icon-clone";
import type {
  IconCloneType,
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "../../../types";
import { Spinner } from "../../icons";
import { Typography, type TypographyVariant } from "../../server/typography";
import { cn } from "../../../lib/utils";

export type AnchorProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      loading?: boolean;
      variant?: "primary" | "secondary";
      size?: "small" | "medium" | "large";
      iconLeft?: IconCloneType;
      iconRight?: IconCloneType;
      className?: string;
    }
  >;

export type AnchorComponent = <C extends ElementType = "a">(
  props: AnchorProps<C>,
  ref?: PolymorphicRef<C>,
) => ReactNode;

// @ts-expect-error Anchor
export const Anchor: AnchorComponent = forwardRef(function Anchor<
  C extends ElementType = "a",
>(
  {
    as,
    variant = "primary",
    size = "medium",
    iconLeft,
    iconRight,
    children,
    className = "",
    ...rest
  }: AnchorProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || "a";
  const { disabled, loading: isLoading = false, ...restProps } = rest;

  const iconNotProvided = !iconLeft && !iconRight;
  const isDisabled = disabled || isLoading;

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

  const LoadingSpinner = ({ className = "" }: { className?: string }) => (
    <Spinner
      className={cn(
        "inline-block shrink-0 text-neutral-300 duration-300 animate-spin",
        iconClassName,
        className,
      )}
    />
  );

  return (
    <Component
      ref={ref}
      {...restProps}
      className={cn(
        "flex items-center duration-300 w-fit group",
        {
          "gap-0.5": size === "small",
          "gap-1": size === "medium",
          "gap-1.5": size === "large",

          "text-primary-500 hover:text-neutral-900":
            variant === "primary" && !isDisabled,
          "text-neutral-900 hover:text-primary-500":
            variant === "secondary" && !isDisabled,

          "text-neutral-300 cursor-not-allowed": isDisabled,
        },
        className,
      )}
    >
      {iconNotProvided && isLoading && <LoadingSpinner />}
      {iconLeft &&
        (isLoading ? (
          <LoadingSpinner className={iconLeft.props.className} />
        ) : (
          <IconClone
            icon={iconLeft}
            className={cn(iconClassName, iconLeft.props.className)}
          />
        ))}
      <Typography
        as="span"
        appearance={textAppearance}
        className={cn("w-full text-center", {
          "underline group-hover:no-underline": !isDisabled,
          "no-underline": isDisabled,
        })}
      >
        {children}
      </Typography>
      {iconRight &&
        (isLoading ? (
          <LoadingSpinner className={iconRight.props.className} />
        ) : (
          <IconClone
            icon={iconRight}
            className={cn(iconClassName, iconRight.props.className)}
          />
        ))}
    </Component>
  );
});
