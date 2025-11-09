import Home from "./Home";

export default {
  title: "Pages/Home",
  component: Home,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <Home {...args} />;
};

export const HomeStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'parameters' does not exist on type '(arg... Remove this comment to see the full error message
HomeStory.parameters = {
  chromatic: { viewports: [320, 1200] },
};
