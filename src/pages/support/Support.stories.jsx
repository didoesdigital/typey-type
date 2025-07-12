import React from "react";
import Support from "./Support";

export default {
  title: "Pages/Support (About)",
  component: Support,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <Support {...args} />;
};

export const SupportStory = Template.bind({});
