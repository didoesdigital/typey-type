import React from "react";
import Break from "./Break";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Break",
  component: Break,
};

const Template = (args) => {
  return <Break {...args} />;
};

export const BreakStory = Template.bind({});
