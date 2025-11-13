import { Button } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

const meta = {
  title: "Atoms/Button",
  component: Button,
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
    disabledAppearance: {
      control: { type: "boolean" },
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "medium",
    loading: false,
    disabledAppearance: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "medium",
    loading: false,
    disabledAppearance: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    variant: "primary",
    size: "medium",
    loading: true,
    disabledAppearance: false,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    size: "medium",
    loading: false,
    disabledAppearance: true,
  },
};
