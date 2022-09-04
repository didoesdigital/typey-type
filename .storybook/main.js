module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: "@storybook/react",
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
    builder: "webpack5",
  },
};

