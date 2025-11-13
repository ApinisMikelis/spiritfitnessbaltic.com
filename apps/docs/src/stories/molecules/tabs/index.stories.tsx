import { Tabs } from "@mono/ui/client";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: {
      control: { type: "text" },
    },
    tabs: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
  args: {
    onChange: () => {},
    ariaLabel: "Tabs",
    tabs: [
      {
        id: "tab1",
        label: "Tab One",
        number: 1,
        isDisabled: false,
      },
      {
        id: "tab2",
        label: "Tab Two",
      },
      {
        id: "tab3",
        label: "Tab Three",
      },
      {
        id: "tab4",
        label: "Tab Four",
        isDisabled: true,
      },
    ],
  },
};
