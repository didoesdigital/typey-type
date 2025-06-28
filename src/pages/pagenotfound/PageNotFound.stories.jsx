import React from "react";
import PageNotFound from "./PageNotFound";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/PageNotFound",
  component: PageNotFound,
};

const testLocation = {
  pathname: "404 story",
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <PageNotFound location={testLocation} {...args} />;
};

export const PageNotFoundStory = Template.bind({});
