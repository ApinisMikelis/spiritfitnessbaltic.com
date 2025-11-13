"use client";

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { Typography } from "../../server/typography";
import { Icon, IconClone } from "../../server/icon-clone";
import { Check } from "../../icons";
import { cn } from "../../../lib/utils";

export type CheckboxProps = {
  name: string;
  label?: ReactNode;
  extraLabel?: string;
  number?: number;
  icon?: Icon;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "id">;

export const Checkbox = forwardRef(function Checkbox(
  {
    name,
    label,
    extraLabel,
    number,
    icon,
    disabled = false,
    className = "",
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn("relative rounded flex gap-2 group", className)}
    >
      <input
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        disabled={disabled}
        className={cn(
          "appearance-none rounded border duration-300 size-6 shrink-0",
          {
            "border-neutral-900 hover:border-primary-900": !disabled,
            "border-neutral-200": disabled,

            "group-has-[input:checked]:bg-neutral-900 group-has-[input:checked]:hover:bg-primary-500":
              !disabled,
            "group-has-[input:checked]:bg-neutral-200": disabled,

            "cursor-pointer": !disabled,
            "cursor-not-allowed": disabled,
          },
        )}
        {...props}
      />
      <Check className="text-neutral-000 absolute size-6 inset-0 p-0.5 hidden group-has-[input:checked]:inline-flex pointer-events-none" />
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
