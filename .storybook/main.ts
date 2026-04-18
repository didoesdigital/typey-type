import type { StorybookConfig } from "@storybook/react-vite";

// NOTE: this file is not eslint checked in CI because create react app linting
// via build with CI=true does not check Storybook eslint rules and Storybook
// build does not perform linting

const config: StorybookConfig = {
  stories: ["../src/stories/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  // https://storybook.js.org/docs/8/configure/environment-variables#using-storybook-configuration
  env: (config) => ({
    ...config,
    // EXAMPLE_VAR: 'An environment variable configured in Storybook',
    VITE_PUBLIC_URL: ".",
  }),

  staticDirs: ["../public"],
  docs: {},

  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      build: {
        cssMinify: "esbuild",
      },
    });
  },
};

export default config;
