import { RotatingText } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/RotatingText",
  component: RotatingText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    textList: {
      control: { type: "object" },
      description: "List of texts to rotate through.",
      defaultValue: ["vision", "ambition", "ideas", "best"],
    },
    baseText: {
      control: { type: "text" },
      description: "Base text to display when no rotation is happening.",
      defaultValue: "future",
    },
    speed: {
      control: { type: "number" },
      description: "Speed of the rotation in milliseconds.",
      defaultValue: 1500,
    },
  },
} satisfies Meta<typeof RotatingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RotatingTextStory: Story = {
  args: {
    textList: ["vision", "ambition", "ideas", "best"],
    baseText: "future",
    speed: 1500,
  },
  render: (args) => (
    <>
      <Typography appearance="heading-2" className="relative z-20">
        Building brands
      </Typography>
      <Typography appearance="heading-2" className="relative z-10">
        that bring out
      </Typography>
      <Typography appearance="heading-2" className="flex">
        your&nbsp;
        <RotatingText baseText="future" speed={2000} {...args} />
      </Typography>
    </>
  ),
};
