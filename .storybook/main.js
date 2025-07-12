// NOTE: this file is not eslint checked in CI because create react app linting
// via build with CI=true does not check Storybook eslint rules and Storybook
// build does not perform linting
module.exports = {
  stories: ["../src/stories/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
  ],

  features: {
    interactionsDebugger: true,
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },

  staticDirs: ["../public"],
  docs: {},
};
