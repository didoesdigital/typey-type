import React from "react";
import RecommendationDescription from "./RecommendationDescription";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/RecommendationDescription",
  component: RecommendationDescription,
};

const Template = (args) => {
  return <RecommendationDescription {...args} />;
};

export const RecommendationDescriptionIdeal = Template.bind({});
RecommendationDescriptionIdeal.args = {
  studyType: "discover",
};
