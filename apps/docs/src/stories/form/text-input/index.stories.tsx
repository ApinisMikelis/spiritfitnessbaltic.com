import { TextInput } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Form/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the input element.",
    },
    label: {
      control: "text",
      description: "Label for the input field.",
    },
    helperLabel: {
      control: "text",
      description: "Helper text displayed below the input field.",
    },
    type: {
      control: "select",
      options: ["text", "email", "password"],
      description: "Type of the input field.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the input field.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the input container.",
    },
    inputClassName: {
      control: "text",
      description: "Additional CSS classes for the input element.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field when true.",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInputStory: Story = {
  args: {
    id: "text-input",
    label: "Text Input Label",
    placeholder: "Enter text here",
    helperLabel: "Helper text for the input field",
    type: "text",
    size: "medium",
    className: "",
    inputClassName: "",
    disabled: false,
  },
};
