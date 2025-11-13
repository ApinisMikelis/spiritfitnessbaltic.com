import type { PropsWithChildren } from "react";
import {
  ListBox,
  ListBoxItem,
  Popover,
  type SelectionMode,
} from "react-aria-components";
import { cn } from "../../../../lib/utils";

export type DropdownPlacement = "top" | "bottom";

export type DropdownOptions = (PropsWithChildren & {
  value: string;
  label?: string;
})[];

export type DropdownPopoverProps = {
  options: DropdownOptions;
  offset?: number;
  className?: string;
  selectionMode?: SelectionMode;
};

export const DropdownPopover = ({
  options,
  offset,
  className = "",
  selectionMode = "single",
}: DropdownPopoverProps) => {
  return (
    <Popover
      offset={offset}
      containerPadding={0}
      className={cn(
        "flex-col gap-1 bg-neutral-000 border border-neutral-200 rounded-1 p-1 flex popover min-w-68.5 overflow-y-auto",
        className,
      )}
    >
      <ListBox
        items={options}
        className="flex flex-col gap-1"
        selectionMode={selectionMode}
      >
        {(item) => (
          <ListBoxItem
            id={item.value}
            textValue={item?.label}
            className={({ isSelected, isHovered, isFocused }) =>
              cn(
                "rounded focus:outline-none cursor-pointer duration-300 transition-[background-color] py-3.5 px-4",
                "text-size-text-4 leading-size-text-5 font-medium",
                {
                  "bg-neutral-100 text-primary-900": isSelected,
                  "bg-neutral-000 text-neutral-900": !isSelected,

                  "bg-neutral-200": isHovered || isFocused,
                },
              )
            }
          >
            {item.label}
          </ListBoxItem>
        )}
      </ListBox>
    </Popover>
  );
};
