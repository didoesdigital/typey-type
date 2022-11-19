import React from "react";
import Contribute from "./Contribute";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Contribute",
  component: Contribute,
};

const Template = (args) => {
  return <Contribute {...args} />;
};

export const ContributeStory = Template.bind({});
