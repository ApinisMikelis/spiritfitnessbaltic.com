import { Tooltip } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
    icon: {
      control: { type: "object" },
    },
    subTitle: {
      control: { type: "text" },
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom",
        "bottom left",
        "bottom right",
        "top",
        "top left",
        "top right",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    trigger: {
      control: { type: "select" },
      options: ["focus", "hover"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TooltipStory: Story = {
  args: {
    isOpen: true,
    title: "Tooltip",
    subTitle: "Tooltip sub title",
    children: "Tooltip",
    placement: "top",
    size: "small",
    trigger: "focus",
  },
};
