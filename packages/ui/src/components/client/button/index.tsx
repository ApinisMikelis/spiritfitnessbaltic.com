"use client";

import { type ElementType, forwardRef, ReactNode } from "react";
import { Typography, TypographyVariant } from "../../server/typography";
import {
  IconCloneType,
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "../../../types";
import { Spinner } from "../../icons";
import { IconClone } from "../../server/icon-clone";
import { cn } from "../../../lib/utils";

export type ButtonProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      typographyVariant?: TypographyVariant;
      loading?: boolean;
      disabledAppearance?: boolean;
      variant?: "primary" | "secondary";
      size?: "small" | "medium" | "large";
      iconLeft?: IconCloneType;
      iconRight?: IconCloneType;
      className?: string;
    }
  >;

type ButtonComponent = <C extends ElementType = "button">(
  props: ButtonProps<C>,
  ref?: PolymorphicRef<C>,
) => ReactNode;

// @ts-expect-error Button
export const Button: ButtonComponent = forwardRef(function Button<
  C extends ElementType = "button",
>(
  {
    as,
    variant = "primary",
    size = "medium",
    loading: isLoading = false,
    disabledAppearance = false,
    typographyVariant,
    iconLeft,
    iconRight,
    children,
    className = "",
    ...rest
  }: ButtonProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || "button";
  const { disabled: isDisabled } = rest;
  const disabled = isDisabled || disabledAppearance || isLoading;

  const iconNotProvided = !iconLeft && !iconRight;
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
      className={cn(
        "flex items-center justify-center text-center duration-300 w-fit rounded-1 ease-in-out",
        className,
        {
          "gap-1 px-[16px] py-[6px]": size === "small",
          "gap-1.5 px-[24px] py-[12px]": size === "medium",
          "gap-2 px-[32px] py-[14px]": size === "large",

          "cursor-pointer": !disabled,
          "cursor-not-allowed": disabled,

          "bg-primary-500 text-neutral-000 hover:bg-primary-900":
            variant === "primary" && !disabled,
          "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-000":
            variant === "secondary" && !disabled,

          "bg-neutral-200 text-neutral-500": variant === "primary" && disabled,
          "border border-neutral-300 text-neutral-300":
            variant === "secondary" && disabled,
        },
      )}
      {...rest}
      ref={ref}
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
      {children && (
        <Typography
          as="span"
          appearance={typographyVariant || textAppearance}
          className="text-center"
        >
          {children}
        </Typography>
      )}
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
