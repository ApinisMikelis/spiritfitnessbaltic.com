import { InformationBadge } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Molecules/InformationBadge",
  component: InformationBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["large", "small"],
    },
    color: {
      control: { type: "select" },
      options: ["green", "yellow", "red", "neutral"],
    },
    iconLeft: {
      control: { type: "object" },
    },
    iconRight: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof InformationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InformationBadgeStory: Story = {
  args: {
    size: "large",
    color: "green",
    children: "Information Badge",
  },
};
