import React from "react";

import CustomShareLessons from "./CustomShareLessons";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Custom/CustomShareLessons",
  component: CustomShareLessons,
};

const Template = (args) => (
  <div className="p3">
    <CustomShareLessons />
  </div>
);

export const CustomShareLessonsStory = Template.bind({});
