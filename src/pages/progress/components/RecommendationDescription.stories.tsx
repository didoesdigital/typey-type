import RecommendationDescription from "./RecommendationDescription";

export default {
  title: "Progress/RecommendationDescription",
  component: RecommendationDescription,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <RecommendationDescription {...args} />;
};

export const RecommendationDescriptionIdeal = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
RecommendationDescriptionIdeal.args = {
  studyType: "discover",
};
