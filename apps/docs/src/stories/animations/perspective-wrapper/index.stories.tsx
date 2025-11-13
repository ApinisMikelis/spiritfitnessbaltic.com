import { PerspectiveWrapper } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/PerspectiveWrapper",
  component: PerspectiveWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Custom CSS classes to apply to the wrapper",
    },
    intensity: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description:
        "Intensity of the perspective effect, higher values increase the effect",
    },
    perspective: {
      control: { type: "number", min: 100, max: 5000, step: 10 },
      description:
        "Perspective value in pixels, determines how far the object appears from the viewer",
    },
    scale: {
      control: { type: "number", min: 0.1, max: 3, step: 0.1 },
      description:
        "Scale factor applied to the content within the perspective wrapper",
    },
  },
} satisfies Meta<typeof PerspectiveWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerspectiveWrapperStory: Story = {
  args: {
    className: "h-100 aspect-video",
    perspective: 1000,
    intensity: 20,
    scale: 1.1,
  },
  render: (args) => (
    <PerspectiveWrapper
      className="h-100 aspect-video"
      perspective={1000}
      intensity={20}
      scale={1.1}
      {...args}
    >
      <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center pointer-events-none">
        <Typography appearance="heading-4">Hover me</Typography>
      </div>
    </PerspectiveWrapper>
  ),
};
