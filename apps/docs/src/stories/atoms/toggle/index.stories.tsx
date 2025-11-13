import { Toggle } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Name of the toggle",
    },
    label: {
      control: { type: "text" },
      description: "Label for the toggle",
    },
    extraLabel: {
      control: { type: "text" },
      description: "Additional label for the toggle",
    },
    number: {
      control: { type: "number" },
      description: "Number associated with the toggle",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleStory: Story = {
  args: {
    name: "toggle",
    label: "Toggle Label",
    extraLabel: "Extra Label",
    number: 0,
  },
};
