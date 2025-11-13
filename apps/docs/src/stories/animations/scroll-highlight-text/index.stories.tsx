import { ScrollHighlightText } from "@mono/ui";
import { Typography } from "@mono/ui/server";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/ScrollHighlightText",
  component: ScrollHighlightText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    startOffset: {
      control: { type: "number" },
      description: "Start offset for the highlight effect, between 0 and 1.",
      defaultValue: 0.8,
    },
    endOffset: {
      control: { type: "number" },
      description: "End offset for the highlight effect, between 0 and 1.",
      defaultValue: 0.2,
    },
    minThreshold: {
      control: { type: "number" },
      description:
        "Minimum threshold for the highlight effect to be applied, between 0 and 1.",
      defaultValue: 0.3,
    },
    maxThreshold: {
      control: { type: "number" },
      description:
        "Maximum threshold for the highlight effect to be applied, between 0 and 1.",
      defaultValue: 0.7,
    },
    textAppearance: {
      control: { type: "select" },
      options: [
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
      ],
      description:
        "Typography appearance for the highlighted text, defaults to 'heading-1'.",
      defaultValue: "heading-1",
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS class for additional styling.",
      defaultValue: "",
    },
  },
} satisfies Meta<typeof ScrollHighlightText>;

export default meta;
type Story = StoryObj<typeof ScrollHighlightText>;

export const Default: Story = {
  args: {
    textAppearance: "heading-1",
    minThreshold: 0.3,
    maxThreshold: 0.7,
  },
  render: (args) => (
    <div className="min-h-[300vh]">
      <div className="h-screen flex items-center justify-center">
        <Typography appearance="heading-1" className="text-neutral-900">
          Scroll down to see the effect
        </Typography>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <ScrollHighlightText {...args}>
          This is a long text that will be revealed line by line as you scroll
          down the page. The overlay should perfectly match the underlying text.
        </ScrollHighlightText>
      </div>

      <div className="h-screen flex items-center justify-center">
        <Typography
          appearance="heading-1"
          className="text-neutral-500 text-center"
        >
          The text above should reveal smoothly line by line with perfect
          alignment between the overlay and the base text.
        </Typography>
      </div>
    </div>
  ),
};
