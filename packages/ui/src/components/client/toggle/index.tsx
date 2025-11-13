"use client";

import {
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";

import { Typography } from "../../server/typography";
import { type Icon, IconClone } from "../../server/icon-clone";
import { cn } from "../../../lib/utils";

export type ToggleProps = {
  name: string;
  label?: ReactNode;
  extraLabel?: string;
  number?: number;
  icon?: Icon;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "id">;

export const Toggle = forwardRef(function Toggle(
  {
    name,
    label,
    extraLabel,
    number,
    icon,
    disabled = false,
    className = "",
    ...props
  }: ToggleProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn("relative rounded flex gap-2 group", className)}
    >
      <div className="relative">
        <input
          id={id}
          ref={ref}
          name={name}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "appearance-none rounded-full border duration-300 w-[44px] h-[24px] shrink-0",
            {
              "border-neutral-200": !disabled,
              "border-neutral-900 hover:border-primary-500": !disabled,
              "border-neutral-200 group-has-[input:checked]:bg-neutral-200":
                disabled,

              "group-has-[input:checked]:bg-neutral-900 group-has-[input:checked]:border-neutral-900":
                !disabled,
              "group-has-[input:checked]:hover:bg-primary-500 group-has-[input:checked]:hover:border-primary-500":
                !disabled,
              "group-has-[input:checked]:bg-neutral-000 group-has-[input:checked]:border-neutral-200":
                disabled,

              "cursor-pointer": !disabled,
              "cursor-not-allowed": disabled,
            },
          )}
          {...props}
        />
        <div
          className={cn(
            "absolute top-0.75 left-0.75 size-[18px] rounded-full duration-300 pointer-events-none shadow-sm",
            "group-has-[input:checked]:translate-x-5",
            {
              "group-has-[input:not(:checked)]:bg-neutral-900": !disabled,
              "group-has-[input:not(:checked)]:group-hover:bg-primary-500":
                !disabled,
              "group-has-[input:checked]:bg-neutral-000": !disabled,
              "bg-neutral-000 group-has-[input:checked]:bg-neutral-000":
                disabled,
            },
          )}
        />
      </div>
      {(label || number || extraLabel) && (
        <div className="flex flex-col pt-1 w-full">
          <div className="flex gap-2 w-full">
            <Typography
              as="span"
              appearance="cap-base"
              className={cn("w-full", {
                "text-neutral-900 group-hover:text-primary-900": !disabled,
                "text-neutral-500": disabled,
              })}
            >
              {label}
            </Typography>
            <div className="flex gap-2">
              <Typography
                as="span"
                appearance="p-reg-xs"
                className="text-neutral-500"
              >
                {number}
              </Typography>
              {icon && (
                <IconClone
                  icon={icon}
                  className="size-[14px] text-neutral-500 shrink-0"
                />
              )}
            </div>
          </div>
          <Typography
            as="span"
            appearance="p-reg-xs"
            className="text-neutral-500"
          >
            {extraLabel}
          </Typography>
        </div>
      )}
    </label>
  );
});
