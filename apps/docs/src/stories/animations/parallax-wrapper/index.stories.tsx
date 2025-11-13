import { ParallaxWrapper } from "@mono/ui";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/ParallaxWrapper",
  component: ParallaxWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "object" },
      description: "Content to be wrapped with parallax effect.",
    },
    speed: {
      control: { type: "number" },
      description: "Speed of the parallax effect (0 to 1).",
      defaultValue: 0.5,
    },
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
      description: "Direction of the parallax effect.",
      defaultValue: "up",
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS classes for additional styling.",
    },
  },
} satisfies Meta<typeof ParallaxWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParallaxWrapperStory: Story = {
  args: {
    children: (
      <div className="size-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-60" />
    ),
    speed: 0.5,
    direction: "up",
  },
  render: (args) => (
    <div className="w-full overflow-x-scroll whitespace-nowrap h-[125dvh] flex items-center justify-start space-x-16 px-16">
      <ParallaxWrapper {...args} speed={1}>
        <div className="size-48 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-60" />
      </ParallaxWrapper>
      <ParallaxWrapper {...args} speed={2}>
        <div className="size-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-60" />
      </ParallaxWrapper>
      <ParallaxWrapper {...args} speed={3}>
        <div className="size-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60" />
      </ParallaxWrapper>
    </div>
  ),
};
