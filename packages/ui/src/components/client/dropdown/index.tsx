import { Button, DialogTrigger } from "react-aria-components";
import { DropdownPopover, type DropdownPopoverProps } from "./dropdown-popover";

export const Dropdown = (props: DropdownPopoverProps) => {
  return (
    <DialogTrigger>
      <Button>Settings</Button>
      <DropdownPopover {...props} />
    </DialogTrigger>
  );
};
