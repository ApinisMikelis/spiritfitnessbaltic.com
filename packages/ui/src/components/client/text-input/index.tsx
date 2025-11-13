"use client";

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useId,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "../../../lib/utils";
import type { IconCloneType } from "../../../types";
import { CircleInformation, Warning } from "../../icons";
import { IconClone, Typography } from "../../server";

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  id?: string;
  name?: string;
  label?: string;
  helperLabel?: string;
  size?: "small" | "medium" | "large";
  value?: string;
  className?: string;
  inputClassName?: string;
  iconLeft?: IconCloneType;
};

export const TextInput = forwardRef(function Input(
  {
    id: initialId,
    label,
    helperLabel,
    type = "text",
    size = "medium",
    iconLeft,
    className = "",
    inputClassName = "",
    disabled = false,
    ...props
  }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const uniqueId = useId();
  const id = initialId || uniqueId;
  const errorId = useId();

  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  let icon = <CircleInformation />;
  const isErrorState =
    props["aria-invalid"] === true || props["aria-errormessage"];

  if (isErrorState) {
    icon = <Warning />;
  }

  return (
    <label
      id={id}
      className={cn("flex flex-col w-full", className, {
        "gap-2": size === "large" || size === "medium",
        "gap-1": size === "small",
      })}
    >
      {label && (
        <Typography
          as="span"
          appearance="p-reg-sm"
          className="text-neutral-900"
        >
          {label}
        </Typography>
      )}
      <div className="relative group">
        {iconLeft && (
          <IconClone
            icon={iconLeft}
            className={cn(
              iconLeft.props.className,
              "absolute z-10 pointer-events-none left-4 text-neutral-900",
              {
                "size-5 top-[calc(50%-10px)]":
                  size === "large" || size === "medium",
                "size-4 top-[calc(50%-8px)]": size === "small",
              },
            )}
          />
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          disabled={disabled}
          aria-disabled={disabled}
          aria-describedby={errorId}
          className={cn(
            "w-full border rounded-1 duration-300",
            inputClassName,
            {
              "text-p-reg-sm": size === "small",
              "text-p-reg-base": size === "medium" || size === "large",

              "px-[16px]": !iconLeft,
              "pl-[44px] pr-[16px]": iconLeft,

              "py-[15px]": size === "large",
              "py-[11px]": size === "medium",
              "py-[6px]": size === "small",

              "border-neutral-500 hover:border-primary-500 bg-neutral-000 text-neutral-900 placeholder:text-neutral-500":
                !isErrorState && !disabled,

              "border-error-500 bg-error-100 text-error-900":
                isErrorState && !disabled,
              "border-neutral-100 bg-neutral-100 text-neutral-500 cursor-not-allowed":
                disabled,
            },
          )}
          {...props}
        />
      </div>
      {helperLabel && (
        <Typography
          id={id}
          as="label"
          appearance="p-reg-xs"
          className={cn("flex gap-1 items-start", {
            "text-info-900": !isErrorState && !disabled,
            "text-error-900": isErrorState && !disabled,
            "text-neutral-900": disabled,
          })}
        >
          <IconClone
            icon={icon}
            className={cn("shrink-0 size-3 mt-[2px]", {
              "text-error-500": isErrorState && !disabled,
              "text-info-900": !isErrorState && !disabled,
              "text-neutral-900": disabled,
            })}
          />
          {helperLabel}
        </Typography>
      )}
    </label>
  );
});
