import { AnimatedCurve } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/AnimatedCurve",
  component: AnimatedCurve,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    startThreshold: {
      control: { type: "text" },
      description:
        "Threshold for the start of the animation. Can be 'start end', 'end start', or 'center'.",
      defaultValue: "start end",
    },
    endThreshold: {
      control: { type: "text" },
      description:
        "Threshold for the end of the animation. Can be 'start end', 'end start', or 'center'.",
      defaultValue: "end start",
    },
    animationStart: {
      control: { type: "number" },
      description:
        "The starting point of the animation as a percentage of the scroll progress (0 to 1).",
      defaultValue: 0.55,
    },
    animationEnd: {
      control: { type: "number" },
      description:
        "The ending point of the animation as a percentage of the scroll progress (0 to 1).",
      defaultValue: 0.8,
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for styling.",
      defaultValue: "",
    },
  },
} satisfies Meta<typeof AnimatedCurve>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimatedCurveStory: Story = {
  args: {
    startThreshold: "start end",
    endThreshold: "end start",
    animationStart: 0.55,
    animationEnd: 0.8,
  },
  render: (args) => (
    <div className="text-neutral-900 border rounded-4 h-270 w-200 bg-gradient-to-br from-blue-600/50 to-purple-600/50 overflow-hidden shadow-600">
      <div className="p-8 text-center">
        <Typography appearance="heading-1" className="mb-8">
          Scroll Down
        </Typography>
      </div>
      <AnimatedCurve {...args}>
        <div className=" h-full">
          <div className="text-center px-8 relative z-10">
            <Typography appearance="heading-2" className="mb-4">
              First Curve
            </Typography>
            <Typography>Animation: 55% → 80%</Typography>
            <Typography className="mt-4">
              This curve finishes early so you can see the complete animation
            </Typography>
          </div>
        </div>
      </AnimatedCurve>
      <div className="py-26" />
      <AnimatedCurve {...args}>
        <div className=" h-full">
          <div className="text-center px-8 relative z-10">
            <Typography appearance="heading-2">Second Curve</Typography>
            <Typography>Animation: 30% → 40%</Typography>
            <Typography>Quick animation in the middle of the scroll</Typography>
          </div>
        </div>
      </AnimatedCurve>
    </div>
  ),
};
