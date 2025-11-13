import { InteractiveChip } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Molecules/InteractiveChip",
  component: InteractiveChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isActive: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    iconLeft: {
      control: { type: "object" },
    },
    iconRight: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof InteractiveChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractiveChipStory: Story = {
  args: {
    isActive: false,
    isDisabled: false,
    onClick: () => {},
    children: "Interactive Chip",
  },
};
