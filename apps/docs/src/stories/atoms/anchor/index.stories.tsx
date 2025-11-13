import { Anchor } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

const meta = {
  title: "Atoms/Anchor",
  component: Anchor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    loading: {
      control: { type: "boolean" },
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Anchor",
    variant: "primary",
    size: "medium",
    loading: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Anchor",
    variant: "secondary",
    size: "medium",
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Anchor",
    variant: "primary",
    size: "medium",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Anchor",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: true,
  },
};
