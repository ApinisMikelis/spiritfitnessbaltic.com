import {
  Tabs as ReactAriaTabs,
  TabList,
  Tab,
  Key,
} from "react-aria-components";
import { IconCloneType } from "../../../types";
import { IconClone } from "../../server/icon-clone";
import { Typography } from "../../server/typography";
import { cn } from "../../../lib/utils";

type Props = {
  tabs: {
    id: string;
    label: string;
    number?: number;
    isDisabled?: boolean;
    iconLeft?: IconCloneType;
  }[];
  ariaLabel: string;
  onChange: (id: Key) => void;
  className?: string;
};

export const Tabs = ({ tabs, ariaLabel, onChange, className = "" }: Props) => {
  return (
    <ReactAriaTabs
      className={cn("w-full", className)}
      onSelectionChange={onChange}
    >
      <TabList aria-label={ariaLabel} className="flex w-full">
        {tabs.map(({ id, isDisabled, iconLeft, label, number }, index) => {
          return (
            <Tab
              key={index}
              id={id}
              isDisabled={isDisabled}
              className={({ isSelected, isHovered, isFocused }) =>
                cn(
                  "flex gap-2 p-3 border-b-2 duration-300 ease-in-out flex-grow justify-center",
                  {
                    "border-b-neutral-200 text-neutral-900":
                      !isSelected && !isHovered && !isFocused && !isDisabled,
                    "border-b-neutral-500 text-neutral-900":
                      !isDisabled && (isHovered || isFocused),
                    "border-b-primary-500 text-neutral-900":
                      !isDisabled && isSelected,
                    "border-b-neutral-200 text-neutral-300 cursor-not-allowed":
                      isDisabled,
                    "cursor-pointer": !isDisabled,
                  },
                )
              }
            >
              {iconLeft && (
                <IconClone
                  icon={iconLeft}
                  className={cn(
                    "size-5 shrink-0 inline-block",
                    iconLeft.props.className,
                  )}
                />
              )}
              <Typography appearance="cap-base">{label}</Typography>
              <Typography
                appearance="cap-base"
                className={cn({ "text-neutral-300": isDisabled })}
              >
                {number}
              </Typography>
            </Tab>
          );
        })}
      </TabList>
    </ReactAriaTabs>
  );
};
