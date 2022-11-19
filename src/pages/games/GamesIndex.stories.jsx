import React from "react";
import GamesIndex from "./GamesIndex";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/Games index",
  component: GamesIndex,
};

const Template = (args) => {
  return <GamesIndex {...args} />;
};

export const GamesIndexStory = Template.bind({});
