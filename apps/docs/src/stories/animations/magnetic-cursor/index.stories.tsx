import { MagneticCursor } from "@mono/ui";
import { Button } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/MagneticCursor",
  component: MagneticCursor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    strength: {
      control: { type: "number" },
      description: "Strength of the magnetic effect (0 to 1).",
      defaultValue: 0.3,
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS classes for additional styling.",
    },
  },
} satisfies Meta<typeof MagneticCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MagneticCursorStory: Story = {
  args: {
    children: <Button size="large">Example button</Button>,
    strength: 0.5,
  },
};
