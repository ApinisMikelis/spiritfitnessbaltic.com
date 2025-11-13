import { Checkbox } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Name of the checkbox",
    },
    label: {
      control: { type: "text" },
      description: "Label for the checkbox",
    },
    extraLabel: {
      control: { type: "text" },
      description: "Additional label for the checkbox",
    },
    number: {
      control: { type: "number" },
      description: "Number associated with the checkbox",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxStory: Story = {
  args: {
    name: "checkbox",
    label: "Checkbox Label",
    extraLabel: "Extra Label",
    number: 0,
  },
};
