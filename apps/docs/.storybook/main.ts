import type { StorybookConfig } from "@storybook/nextjs";
import { createRequire } from "module";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
};

export default config;
