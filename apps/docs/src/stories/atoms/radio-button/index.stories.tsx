import { Radio } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Name of the radio",
    },
    label: {
      control: { type: "text" },
      description: "Label for the radio",
    },
    extraLabel: {
      control: { type: "text" },
      description: "Additional label for the radio",
    },
    number: {
      control: { type: "number" },
      description: "Number associated with the radio",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioStory: Story = {
  args: {
    name: "radio",
    label: "Radio Label",
    extraLabel: "Extra Label",
    number: 0,
  },
};
