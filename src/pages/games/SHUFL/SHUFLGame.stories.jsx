import React from "react";
import SHUFLGame from "./SHUFLGame";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "SHUFL game",
  component: SHUFLGame,
};

const Template = (args) => (
  <div className="p3">
    <SHUFLGame {...args} />
  </div>
);

export const SHUFLGameStory = Template.bind({});
