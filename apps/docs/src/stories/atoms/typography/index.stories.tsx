import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    children: "Typography",
    appearance: "heading-1",
  },
};

export const Heading2: Story = {
  args: {
    children: "Typography",
    appearance: "heading-2",
  },
};

export const Heading3: Story = {
  args: {
    children: "Typography",
    appearance: "heading-3",
  },
};

export const Heading4: Story = {
  args: {
    children: "Typography",
    appearance: "heading-4",
  },
};

export const Heading5: Story = {
  args: {
    children: "Typography",
    appearance: "heading-5",
  },
};

export const Heading6: Story = {
  args: {
    children: "Typography",
    appearance: "heading-6",
  },
};

export const BodyLg: Story = {
  args: {
    children: "Typography",
    appearance: "p-reg-lg",
  },
};

export const BodyMd: Story = {
  args: {
    children: "Typography",
    appearance: "p-reg-md",
  },
};

export const BodyBase: Story = {
  args: {
    children: "Typography",
    appearance: "p-reg-base",
  },
};

export const BodySm: Story = {
  args: {
    children: "Typography",
    appearance: "p-reg-sm",
  },
};

export const BodyXs: Story = {
  args: {
    children: "Typography",
    appearance: "p-reg-xs",
  },
};

export const BodyBldLg: Story = {
  args: {
    children: "Typography",
    appearance: "p-bld-lg",
  },
};

export const BodyBldMd: Story = {
  args: {
    children: "Typography",
    appearance: "p-bld-md",
  },
};

export const BodyBldBase: Story = {
  args: {
    children: "Typography",
    appearance: "p-bld-base",
  },
};

export const BodyBldSm: Story = {
  args: {
    children: "Typography",
    appearance: "p-bld-sm",
  },
};

export const BodyBldXs: Story = {
  args: {
    children: "Typography",
    appearance: "p-bld-xs",
  },
};

export const CaptionMd: Story = {
  args: {
    children: "Typography",
    appearance: "cap-md",
  },
};

export const CaptionBase: Story = {
  args: {
    children: "Typography",
    appearance: "cap-base",
  },
};

export const CaptionSm: Story = {
  args: {
    children: "Typography",
    appearance: "cap-sm",
  },
};

export const CaptionXs: Story = {
  args: {
    children: "Typography",
    appearance: "cap-xs",
  },
};

export const CaptionXXS: Story = {
  args: {
    children: "Typography",
    appearance: "cap-xxs",
  },
};

export const Display1: Story = {
  args: {
    children: "Typography",
    appearance: "display-1",
  },
};

export const Display2: Story = {
  args: {
    children: "Typography",
    appearance: "display-2",
  },
};
