import { ParticleSystem } from "@mono/ui";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Animations/ParticleSystem",
  component: ParticleSystem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    particleCount: {
      control: { type: "number", min: 1, max: 200, step: 1 },
      description: "Number of particles to generate",
    },
    colors: {
      control: { type: "object", items: { type: "color" } },
      description: "Array of colors for the particles",
    },
    trigger: {
      control: { type: "select" },
      options: ["click", "continuous"],
      description: "Trigger type for particle generation",
    },
    effect: {
      control: { type: "select" },
      options: ["explosion", "spiral", "fireworks"],
      description: "Particle effect type",
    },
    intensity: {
      control: { type: "number", min: 0.1, max: 3, step: 0.1 },
      description: "Intensity of the particle effect",
    },
    size: {
      control: { type: "object", items: { type: "number" } },
      description:
        "Size range of the particles in pixels, e.g., [minSize, maxSize]",
    },
    speed: {
      control: { type: "object", items: { type: "number" } },
      description: "Speed range of the particles, e.g., [minSpeed, maxSpeed]",
    },
    gravity: {
      control: { type: "number", min: 0, max: 1, step: 0.01 },
      description:
        "Gravity effect on the particles (0 for no gravity, higher values for stronger gravity)",
    },
    className: {
      control: { type: "text" },
      description:
        "Custom CSS classes to apply to the particle system container",
    },
  },
} satisfies Meta<typeof ParticleSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParticleSystemStory: Story = {
  args: {
    children: (
      <div className="size-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-60" />
    ),
    particleCount: 50,
    colors: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
    trigger: "click",
    effect: "explosion",
    intensity: 1,
    size: [2, 6],
    speed: [1, 5],
    gravity: 0.1,
    className: "",
  },
  render: () => (
    <div className="grid gap-8">
      <ParticleSystem
        effect="explosion"
        trigger="click"
        className="h-100 aspect-video"
      >
        <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Explosion</h3>
            <p className="text-sm opacity-80">Click multiple times!</p>
          </div>
        </div>
      </ParticleSystem>

      <ParticleSystem
        effect="spiral"
        trigger="click"
        className="h-100 aspect-video"
        intensity={1.5}
      >
        <div className="h-full bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Spiral</h3>
            <p className="text-sm opacity-80">Click for spiral!</p>
          </div>
        </div>
      </ParticleSystem>

      <ParticleSystem
        effect="fireworks"
        trigger="click"
        className="h-100 aspect-video"
      >
        <div className="h-full bg-gradient-to-br from-pink-600 to-red-600 rounded-lg flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Fireworks</h3>
            <p className="text-sm opacity-80">Single click fireworks!</p>
          </div>
        </div>
      </ParticleSystem>
    </div>
  ),
};
