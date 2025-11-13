import clsx from "clsx";
import type { CSSProperties, ElementType, PropsWithChildren } from "react";
import { forwardRef } from "react";

type DisplayVariant = "display-1" | "display-2";

type HeadingVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6";

type BodyVariant =
  | "p-reg-lg"
  | "p-reg-md"
  | "p-reg-base"
  | "p-reg-sm"
  | "p-reg-xs";

type BodyBoldVariant =
  | "p-bld-lg"
  | "p-bld-md"
  | "p-bld-base"
  | "p-bld-sm"
  | "p-bld-xs";

type CaptionVariant = "cap-md" | "cap-base" | "cap-sm" | "cap-xs" | "cap-xxs";

export type TypographyVariant =
  | DisplayVariant
  | HeadingVariant
  | BodyVariant
  | BodyBoldVariant
  | CaptionVariant;

type TypographyProps = PropsWithChildren & {
  appearance?: TypographyVariant;
  className?: string;
  as?: ElementType;
  id?: string;
  style?: CSSProperties;
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      id,
      style,
      children,
      className = "",
      as: Component = "p",
      appearance = "p-reg-base",
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        id={id}
        style={style}
        className={clsx(
          {
            "text-size-text-26 font-semibold leading-size-text-26":
              appearance === "display-1",
            "text-size-text-20 font-semibold leading-size-text-20":
              appearance === "display-2",

            "text-size-text-14 font-semibold leading-size-text-14":
              appearance === "heading-1",
            "text-size-text-12 font-semibold leading-size-text-12":
              appearance === "heading-2",
            "text-size-text-10 font-semibold leading-size-text-10":
              appearance === "heading-3",
            "text-size-text-8 font-semibold leading-size-text-8":
              appearance === "heading-4",
            "text-size-text-6 font-semibold leading-size-text-6":
              appearance === "heading-5",
            "text-size-text-5 font-semibold leading-size-text-5":
              appearance === "heading-6",

            "text-size-text-6 leading-size-text-8": appearance === "p-reg-lg",
            "text-size-text-5 leading-size-text-7": appearance === "p-reg-md",
            "text-size-text-4 leading-size-text-6": appearance === "p-reg-base",
            "text-size-text-3-5 leading-size-text-4-5":
              appearance === "p-reg-sm",
            "text-size-text-3 leading-size-text-4": appearance === "p-reg-xs",

            "text-size-text-6 font-bold leading-size-text-8":
              appearance === "p-bld-lg",
            "text-size-text-5 font-bold leading-size-text-7":
              appearance === "p-bld-md",
            "text-size-text-4 font-bold leading-size-text-6":
              appearance === "p-bld-base",
            "text-size-text-3-5 font-bold leading-size-text-4-5":
              appearance === "p-bld-sm",
            "text-size-text-3 font-bold leading-size-text-4":
              appearance === "p-bld-xs",

            "text-size-text-5 leading-size-text-6 font-medium":
              appearance === "cap-md",
            "text-size-text-4 leading-size-text-5 font-medium":
              appearance === "cap-base",
            "text-size-text-3-5 leading-size-text-4-5 font-medium":
              appearance === "cap-sm",
            "text-size-text-3 leading-size-text-4 font-medium":
              appearance === "cap-xs",
            "text-size-text-2-5 leading-size-text-3-5 font-medium":
              appearance === "cap-xxs",
          },
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";
