import { CursorTrailWrapper } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/CursorTrailWrapper",
  component: CursorTrailWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pointsNumber: {
      control: { type: "number" },
      description: "Number of points in the cursor trail.",
      defaultValue: 40,
    },
    widthFactor: {
      control: { type: "number" },
      description: "Width factor for the cursor trail.",
      defaultValue: 0.3,
    },
    spring: {
      control: { type: "number" },
      description: "Spring constant for the cursor trail animation.",
      defaultValue: 0.4,
    },
    friction: {
      control: { type: "number" },
      description: "Friction coefficient for the cursor trail animation.",
      defaultValue: 0.5,
    },
    className: {
      control: { type: "text" },
      description: "Custom class name for styling.",
      defaultValue: "",
    },
    colorfulTrail: {
      control: { type: "boolean" },
      description: "Whether to use a colorful trail or not.",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof CursorTrailWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CursorTrailWrapperStory: Story = {
  args: {
    pointsNumber: 40,
    widthFactor: 0.3,
    spring: 0.4,
    friction: 0.5,
    className: "",
    colorfulTrail: false,
  },
  render: (args) => (
    <div className="rounded-4 overflow-hidden">
      <CursorTrailWrapper {...args}>
        <div className="border rounded-4 h-100 aspect-video bg-gradient-to-br from-blue-600/50 to-purple-600/50 overflow-hidden shadow-600">
          <Typography
            appearance="heading-3"
            className="w-full h-full flex flex-col justify-center items-center"
          >
            Hover over me
          </Typography>
        </div>
      </CursorTrailWrapper>
    </div>
  ),
};
