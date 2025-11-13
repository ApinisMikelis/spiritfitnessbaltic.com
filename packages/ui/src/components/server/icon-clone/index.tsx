import { cn } from "../../../lib/utils";
import { cloneElement, type HTMLAttributes, type ReactElement } from "react";

export type Icon = ReactElement<HTMLAttributes<SVGSVGElement>>;

type Props = {
  className?: string;
  icon: Icon;
};

export const IconClone = ({ icon, className = "" }: Props) => {
  return cloneElement(icon, {
    title: "",
    className: cn("flex shrink-0", className),
  });
};
