import { CursorAnimation } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/CursorAnimation",
  component: CursorAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    config: {
      control: { type: "object" },
      description: "Configuration object for the cursor animation.",
      defaultValue: {
        starAnimationDuration: 1500,
        minTimeBetweenStars: 250,
        minDistanceBetweenStars: 75,
        glowDuration: 75,
        maxGlowPointSpacing: 10,
        colors: [
          "#BB0C70",
          "#B2D9FF",
          "#23C288",
          "#FFE600",
          "#FF7B43",
          "#FFFFFF",
        ],
      },
    },
  },
} satisfies Meta<typeof CursorAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CursorAnimationStory: Story = {
  args: {
    config: {
      starAnimationDuration: 1500,
      minTimeBetweenStars: 250,
      minDistanceBetweenStars: 75,
      glowDuration: 75,
      maxGlowPointSpacing: 10,
      colors: [
        "#BB0C70",
        "#B2D9FF",
        "#23C288",
        "#FFE600",
        "#FF7B43",
        "#FFFFFF",
      ],
      animations: ["fall-1", "fall-2", "fall-3"],
      paths: [
        "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
        "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z",
        "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
      ],
    },
  },
  render: (args) => (
    <div className="border rounded-4 h-100 aspect-video bg-gradient-to-br from-blue-600/50 to-purple-600/50 overflow-hidden shadow-600">
      <CursorAnimation {...args}>
        <Typography
          appearance="heading-3"
          className="w-full h-full flex flex-col justify-center items-center"
        >
          Hover over me
        </Typography>
      </CursorAnimation>
    </div>
  ),
};
