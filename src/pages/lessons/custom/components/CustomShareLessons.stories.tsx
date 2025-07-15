import React from "react";

import CustomShareLessons from "./CustomShareLessons";

export default {
  title: "Lessons/Custom/CustomShareLessons",
  component: CustomShareLessons,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <CustomShareLessons />
  </div>
);

export const CustomShareLessonsStory = Template.bind({});
