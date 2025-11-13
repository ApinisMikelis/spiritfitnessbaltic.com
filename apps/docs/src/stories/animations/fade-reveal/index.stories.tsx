import { FadeReveal } from "@mono/ui";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/FadeReveal",
  component: FadeReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right", "none"],
      description: "Direction of the fade reveal animation",
    },
    duration: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: "Duration of the animation in seconds",
      defaultValue: 0.5,
    },
    delay: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "Delay before the animation starts in seconds",
      defaultValue: 0,
    },
    distance: {
      control: { type: "number", min: 0, max: 200, step: 1 },
      description:
        "Distance to move the element during the animation (only applies if direction is not 'none')",
      defaultValue: 50,
    },
    once: {
      control: { type: "boolean" },
      description:
        "Whether the animation should only run once when the element comes into view",
      defaultValue: true,
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS classes to apply to the FadeReveal component",
      defaultValue: "",
    },
    blur: {
      control: { type: "boolean" },
      description:
        "Whether to apply a blur effect during the fade reveal animation",
      defaultValue: false,
    },
    blurAmount: {
      control: { type: "number", min: 0, max: 50, step: 1 },
      description: "Amount of blur to apply (in pixels) if blur is enabled",
      defaultValue: 10,
    },
    threshold: {
      control: { type: "number", min: 0, max: 1, step: 0.01 },
      description:
        "Intersection observer threshold for triggering the animation (default is 0.5)",
      defaultValue: 0.5,
    },
  },
} satisfies Meta<typeof FadeReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeRevealStory: Story = {
  args: {
    direction: "up",
    delay: 0.1,
    blur: false,
    blurAmount: 10,
    once: true,
    className: "",
    duration: 0.5,
    threshold: 0.5,
  },
  render: () => (
    <div className="grid md:grid-cols-2 gap-20 justify-center">
      <FadeReveal direction="up" delay={0.1}>
        <div className="h-50 aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">Fade up</h3>
        </div>
      </FadeReveal>

      <FadeReveal direction="down" delay={0.2} blur={true}>
        <div className="h-50 aspect-video bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">Fade Down + Blur</h3>
        </div>
      </FadeReveal>

      <FadeReveal direction="right" delay={0.4} blur={true} blurAmount={5}>
        <div className="h-50 aspect-video bg-gradient-to-br from-orange-600 to-orange-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">Fade Right + Light Blur</h3>
        </div>
      </FadeReveal>

      <FadeReveal direction="left" delay={0.3} blur={true} blurAmount={15}>
        <div className="h-50 aspect-video bg-gradient-to-br from-pink-600 to-red-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">Fade Left + Heavy Blur</h3>
        </div>
      </FadeReveal>

      <FadeReveal direction="right" delay={0.4} blur={true} blurAmount={5}>
        <div className="h-50 aspect-video bg-gradient-to-br from-gray-600 to-purple-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">
            Pure Blur Fade (No Movement)
          </h3>
        </div>
      </FadeReveal>

      <FadeReveal direction="right" delay={0.4} blur={true} blurAmount={5}>
        <div className="h-50 aspect-video bg-gradient-to-br from-indigo-600 to-gray-600 rounded-lg flex items-center justify-center pointer-events-none">
          <h3 className="text-xl font-bold mb-2">Long Distance + Slow Blur</h3>
        </div>
      </FadeReveal>
    </div>
  ),
};
