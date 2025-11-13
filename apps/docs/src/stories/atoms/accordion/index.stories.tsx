import { Accordion } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Title of the accordion",
    },
    subTitle: {
      control: { type: "text" },
      description: "Subtitle of the accordion",
    },
    isOpen: {
      control: { type: "boolean" },
      description: "Initial open state of the accordion",
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS classes for the accordion",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionStory: Story = {
  args: {
    isOpen: true,
    title: "Accordion Title",
    subTitle: "Accordion Subtitle",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};
