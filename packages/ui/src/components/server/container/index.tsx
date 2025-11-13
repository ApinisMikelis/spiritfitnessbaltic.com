import { type ElementType, forwardRef, ReactNode } from "react";

import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "../../../types";
import { cn } from "../../../lib/utils";

export type ContainerProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      size?: "sm" | "md";
      className?: string;
    }
  >;

export type ContainerComponentProps = <C extends ElementType = "div">(
  props: ContainerProps<C>,
  ref?: PolymorphicRef<C>,
) => ReactNode;

// @ts-expect-error Container
export const Container: ContainerComponentProps = forwardRef(function Container<
  C extends ElementType = "div",
>(
  { as, size = "md", children, className = "", ...rest }: ContainerProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component
      ref={ref}
      {...rest}
      className={cn(
        "mx-auto w-full px-4 md:px-8 lg:px-16",
        {
          "max-w-[728px]": size === "sm",
          "max-w-[1352px]": size === "md",
        },
        className,
      )}
    >
      {children}
    </Component>
  );
});
