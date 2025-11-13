"use client";

import { type PropsWithChildren } from "react";
import { IconClone } from "../../server/icon-clone";
import { Typography } from "../../server/typography";
import {
  CircleCheck,
  CircleError,
  CircleInformation,
  CircleWarning,
  Close,
} from "../../icons";
import { cn } from "../../../lib/utils";

export type AlertProps = PropsWithChildren & {
  title?: string;
  color?: "success" | "info" | "warning" | "error";
  isInline?: boolean;
  onClose?: () => void;
  hideIcon?: boolean;
  hideClose?: boolean;
};

export const Alert = ({
  title,
  children,
  color = "success",
  isInline = false,
  onClose,
  hideIcon = false,
  hideClose = true,
}: AlertProps) => {
  let icon;

  switch (color) {
    case "info":
      icon = <CircleInformation />;
      break;
    case "warning":
      icon = <CircleWarning />;
      break;
    case "success":
      icon = <CircleCheck />;
      break;
    default:
      icon = <CircleError />;
      break;
  }

  return (
    <div
      className={cn("flex gap-3 w-full items-start rounded overflow-hidden", {
        "bg-success-100 border-success-200": color === "success" && !isInline,
        "bg-info-100 border-info-200": color === "info" && !isInline,
        "bg-warning-100 border-warning-200": color === "warning" && !isInline,
        "bg-error-100 border-error-200": color === "error" && !isInline,
        "p-3 border": !isInline,
      })}
    >
      {!hideIcon && (
        <IconClone
          icon={icon}
          className={cn("size-4 shrink-0 self-start", {
            "text-success-500": color === "success",
            "text-info-500": color === "info",
            "text-warning-500": color === "warning",
            "text-error-500": color === "error",
          })}
        />
      )}
      <div className="flex flex-col gap-1 w-full">
        {title && (
          <Typography
            appearance="cap-sm"
            className={cn("w-full", {
              "text-success-900": color === "success",
              "text-info-900": color === "info",
              "text-warning-900": color === "warning",
              "text-error-900": color === "error",
            })}
          >
            {title}
          </Typography>
        )}
        {children}
      </div>
      {!hideClose && (
        <button onClick={onClose} className="flex items-start size-fit">
          <Close
            className={cn("size-4 shrink-0", {
              "text-success-900": color === "success",
              "text-info-900": color === "info",
              "text-warning-900": color === "warning",
              "text-error-900": color === "error",
            })}
          />
        </button>
      )}
    </div>
  );
};
