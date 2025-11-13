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

export type RadioProps = {
  name: string;
  label?: ReactNode;
  extraLabel?: string;
  number?: number;
  icon?: Icon;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "id">;

export const Radio = forwardRef(function Radio(
  {
    name,
    label,
    extraLabel,
    number,
    icon,
    disabled = false,
    className = "",
    ...props
  }: RadioProps,
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
          type="radio"
          disabled={disabled}
          className={cn(
            "appearance-none rounded-full border-2 duration-300 size-6 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
            {
              "border-neutral-900 hover:border-primary-500 checked:border-neutral-900 checked:hover:border-primary-500 checked:border-[5px] cursor-pointer":
                !disabled,
              "border-neutral-200 checked:border-[5px] cursor-not-allowed":
                disabled,
            },
          )}
          {...props}
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
