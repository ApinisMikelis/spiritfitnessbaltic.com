"use client";

import { OverlayArrow, Tooltip } from "react-aria-components";

import { cn } from "../../../../lib/utils";
import { IconCloneType } from "../../../../types";
import { TooltipTipBottom } from "../../../icons";
import { IconClone, Typography } from "../../../server";

export type TooltipPlacement =
  | "bottom"
  | "bottom left"
  | "bottom right"
  | "top"
  | "top left"
  | "top right";

type Props = {
  title?: string;
  subTitle?: string;
  icon?: IconCloneType;
  size?: "small" | "large";
  placement?: TooltipPlacement;
};

export const TooltipBase = ({
  title,
  icon,
  subTitle,
  size = "small",
  placement = "top",
}: Props) => {
  return (
    <Tooltip
      offset={9}
      placement={placement}
      className={cn(
        "rounded bg-info-100 border border-info-500 flex flex-col gap-1 p-3 tooltip !z-30",
        {
          "w-[156px]": size === "small",
          "w-[272px]": size === "large",
        },
      )}
    >
      {(title || icon) && (
        <div className="flex gap-1 items-center">
          <Typography appearance="cap-xs" className="w-full text-info-900">
            {title}
          </Typography>
          {icon && (
            <IconClone icon={icon} className="size-3 shrink-0 text-info-500" />
          )}
        </div>
      )}
      {subTitle && (
        <Typography appearance="p-reg-xs" className="text-info-900">
          {subTitle}
        </Typography>
      )}
      <OverlayArrow className="group">
        <TooltipTipBottom
          className={cn(
            "text-info-100 w-[20px] h-[9px] relative top-[-1px] z-10",
            "group-data-[placement='bottom']:rotate-180 group-data-[placement='bottom']:top-[1px]",
            "group-data-[placement='left']:rotate-270 group-data-[placement='left']:right-[6px]",
            "group-data-[placement='right']:rotate-90 group-data-[placement='right']:left-[6px]",
          )}
        />
      </OverlayArrow>
    </Tooltip>
  );
};
