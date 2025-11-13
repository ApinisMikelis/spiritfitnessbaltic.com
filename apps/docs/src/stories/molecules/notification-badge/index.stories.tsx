import { NotificationBadge } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Molecules/NotificationBadge",
  component: NotificationBadge,
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
      options: ["red", "green", "yellow", "outline", "dark"],
    },
  },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationBadgeStory: Story = {
  args: {
    size: "large",
    color: "red",
    children: "1",
  },
};
