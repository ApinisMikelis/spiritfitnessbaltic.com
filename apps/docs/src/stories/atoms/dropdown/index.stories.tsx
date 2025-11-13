import { Dropdown } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    offset: {
      control: { type: "number" },
      description: "Offset from the reference element",
    },
    selectionMode: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Selection mode for the dropdown",
    },
    options: {
      control: { type: "object" },
      description: "Options to display in the dropdown",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownStory: Story = {
  args: {
    offset: 8,
    selectionMode: "single",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
      { value: "option6", label: "Option 6" },
      { value: "option7", label: "Option 7" },
      { value: "option8", label: "Option 8" },
      { value: "option9", label: "Option 9" },
      { value: "option10", label: "Option 10" },
    ],
  },
};
