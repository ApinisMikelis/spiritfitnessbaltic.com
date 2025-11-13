import type { PropsWithChildren } from "react";
import { Typography } from "../../server/typography";
import { Icon, IconClone } from "../../server/icon-clone";
import { cn } from "../../../lib/utils";

type Props = PropsWithChildren & {
  isActive?: boolean;
  isDisabled?: boolean;
  iconLeft?: Icon;
  iconRight?: Icon;
  onClick: () => void;
  className?: string;
};

export const InteractiveChip = ({
  children,
  isActive = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  onClick,
  className = "",
}: Props) => {
  const iconClassName = "inline-block shrink-0 size-4";

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-1 px-2 flex gap-0-5 rounded-1 duration-300 items-center shrink-0",
        className,
        {
          "bg-neutral-200 text-neutral-500 hover:cursor-not-allowed":
            isDisabled,
          "hover:cursor-pointer": !isDisabled,

          "bg-primary-500 text-neutral-000 hover:bg-primary-900":
            isActive && !isDisabled,
          "bg-primary-100 text-neutral-900 hover:bg-primary-200":
            !isActive && !isDisabled,
        },
      )}
    >
      {iconLeft && (
        <IconClone
          icon={iconLeft}
          className={cn(iconClassName, iconLeft.props.className)}
        />
      )}
      <Typography as="span" appearance="cap-xs">
        {children}
      </Typography>
      {iconRight && (
        <IconClone
          icon={iconRight}
          className={cn(iconClassName, iconRight.props.className)}
        />
      )}
    </button>
  );
};
