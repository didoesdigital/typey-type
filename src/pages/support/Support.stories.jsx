import React from "react";
import Support from "./Support";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Support (About)",
  component: Support,
};

const Template = (args) => {
  return <Support {...args} />;
};

export const SupportStory = Template.bind({});
