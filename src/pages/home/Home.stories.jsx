import React from "react";
import Home from "./Home";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Home",
  component: Home,
};

const Template = (args) => {
  return <Home {...args} />;
};

export const HomeStory = Template.bind({});
HomeStory.parameters = {
  chromatic: { viewports: [320, 1200] },
};
