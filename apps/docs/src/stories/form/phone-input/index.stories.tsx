import { PhoneInput } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Form/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the phone input field",
    },
    isError: {
      control: "boolean",
      description: "Indicates if there is an error with the input",
    },
    helperLabel: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    initialCountry: {
      control: "select",
      options: ["US", "CA", "GB", "AU"],
      description: "Initial country code for the phone input",
    },
    initialDigits: {
      control: "text",
      description: "Initial digits in the phone input field",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the phone input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field when true",
    },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneInputStory: Story = {
  args: {
    label: "Phone Number",
    helperLabel: "Enter your phone number",
    initialCountry: "US",
    initialDigits: "",
    size: "medium",
    placeholder: "123-456-7890",
    disabled: false,
    onChange: (country: any, digits: any) => {
      console.log(`Selected country: ${country}, Digits: ${digits}`);
    },
  },
};
