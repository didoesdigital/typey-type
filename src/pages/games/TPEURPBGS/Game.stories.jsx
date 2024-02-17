import React from "react";
import Game from "./Game";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/TPEURPBGS game",
  component: Game,
};

const Template = (args) => (
  <div className="p3">
    <Game {...args} />
  </div>
);

export const TPEURPBGSGameStory = Template.bind({});
