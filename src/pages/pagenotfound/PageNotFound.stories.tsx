import PageNotFound from "./PageNotFound";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PageNotFound> = {
  title: "Pages/PageNotFound",
  component: PageNotFound,
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const PageNotFoundStory: Story = {};
