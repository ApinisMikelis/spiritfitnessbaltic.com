import { TypewriterText } from "@mono/ui";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/TypewriterText",
  component: TypewriterText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
      description: "The text to be typed out by the typewriter effect.",
    },
    speed: {
      control: { type: "number" },
      description: "Speed of typing in milliseconds.",
      defaultValue: 50,
    },
    delay: {
      control: { type: "number" },
      description: "Initial delay before typing starts in milliseconds.",
      defaultValue: 0,
    },
    showCursor: {
      control: { type: "boolean" },
      description: "Whether to show the blinking cursor.",
      defaultValue: true,
    },
    onComplete: {
      action: "onComplete",
      description: "Callback function that is called when typing is completed.",
    },
  },
} satisfies Meta<typeof TypewriterText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypewriterTextStory: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    speed: 50,
    delay: 0,
    showCursor: false,
    className: "text-[orange]",
    onComplete: () => {
      console.log("Typing completed!");
    },
  },
};
