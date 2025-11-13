"use client";

import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import { Button, DialogTrigger, Input } from "react-aria-components";

import { cn } from "../../../lib/utils";
import { ChevronDown, CircleInformation, Warning } from "../../icons";
import { IconClone, Typography } from "../../server";
import { CountryFlag } from "./country-flag";
import {
  getFormattedDisplay,
  getMaxDigits,
  shouldShowError,
} from "./functions";
import { CountryPopover } from "./popover";

type Props = {
  label?: string;
  isError?: boolean;
  helperLabel?: string;
  initialCountry?: CountryCode;
  initialDigits?: string;
  size?: "small" | "medium" | "large";
  onChange?: (country: CountryCode, digits: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const PhoneInput = ({
  label,
  className = "",
  isError,
  helperLabel,
  initialCountry = "US",
  initialDigits = "",
  onChange,
  size = "medium",
  placeholder,
  disabled,
}: Props) => {
  const [localDigits, setLocalDigits] = useState<string>(initialDigits);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryCode>(initialCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");

    const maxDigits = getMaxDigits(selectedCountry);

    if (digitsOnly.length > maxDigits) {
      return;
    }

    setLocalDigits(digitsOnly);
    if (!onChange) {
      return;
    }
    onChange(selectedCountry, digitsOnly);
  };

  let icon = <CircleInformation />;
  const isErrorState = isError || shouldShowError(localDigits, selectedCountry);

  if (isErrorState) {
    icon = <Warning />;
  }

  return (
    <label
      className={cn("flex w-full flex-col gap-2", className)}
      ref={containerRef}
    >
      <Typography appearance="p-reg-sm" className="text-neutral-900">
        {label}
      </Typography>
      <DialogTrigger>
        <div
          className={cn(
            "flex rounded-1 items-center overflow-hidden bg-neutral-000 w-full border",
            {
              "border-neutral-500": !disabled && !isErrorState,
              "border-error-500": isErrorState,
              "border-neutral-100": disabled,
            },
          )}
        >
          <Button
            isDisabled={disabled}
            onPress={() => setIsOpen(true)}
            className={cn(
              "flex gap-1 items-center bg-neutral-000 pl-[16px] pr-[8px] h-full",
              {
                "cursor-pointer": !disabled,
                "cursor-not-allowed": disabled,

                "py-[15px]": size === "large",
                "py-[11px]": size === "medium",
                "py-[6px]": size === "small",
              },
            )}
          >
            <CountryFlag country={selectedCountry} />
            <Typography
              appearance="p-reg-base"
              className="text-neutral-900 pointer-events-none"
            >
              +{getCountryCallingCode(selectedCountry)}
            </Typography>
            <ChevronDown
              className={cn(
                "shrink-0 duration-300 ease-in-out text-neutral-900 pointer-events-none",
                {
                  "rotate-180": isOpen,

                  "size-5": size === "medium" || size === "large",
                  "size-4": size === "small",
                },
              )}
            />
          </Button>
          <hr
            className={cn("w-[1px] bg-neutral-300", {
              "h-[30px]": size === "medium" || size === "large",
              "h-[18px]": size === "small",

              "py-[12px]": size === "large",
              "py-[8px]": size === "medium",
              "py-[6px]": size === "small",
            })}
          />
          <Input
            type="tel"
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => handlePhoneChange(e.target.value)}
            value={getFormattedDisplay(localDigits, selectedCountry)}
            className={cn("bg-neutral-000 w-full pl-[12px] pr-[16px]", {
              "text-neutral-900 placeholder:text-neutral-500":
                !disabled && !isErrorState,
              "text-error-900 placeholder:text-error-500": isErrorState,
              "text-neutral-500 placeholder:text-neutral-300": disabled,

              "text-p-reg-base": size === "medium" || size === "large",
              "text-p-reg-sm": size === "small",

              "py-[15px]": size === "large",
              "py-[11px]": size === "medium",
              "py-[6px]": size === "small",

              "cursor-not-allowed": disabled,
            })}
          />
        </div>
        <CountryPopover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          popoverWidth={containerWidth}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setLocalDigits={setLocalDigits}
        />
      </DialogTrigger>
      {helperLabel && (
        <Typography
          as="span"
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
};
