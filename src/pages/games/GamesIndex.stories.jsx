import React from "react";
import GamesIndex from "./GamesIndex";

export default {
  title: "Games/Games index",
  component: GamesIndex,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <GamesIndex {...args} />;
};

export const GamesIndexStory = Template.bind({});
