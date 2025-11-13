import { TooltipLink } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/TooltipLink",
  component: TooltipLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the tooltip link",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for styling",
    },
  },
} satisfies Meta<typeof TooltipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TooltipLinkMedium: Story = {
  args: {
    size: "medium",
    children: "Tooltip Link",
  },
};

export const TooltipLinkSmall: Story = {
  args: {
    size: "small",
    children: "Tooltip Link Small",
  },
};
export const TooltipLinkLarge: Story = {
  args: {
    size: "large",
    children: "Tooltip Link Large",
  },
};
