import React from "react";
import Game from "./Game";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/TPEURPBGS game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <Game {...args} />
  </div>
);

export const TPEURPBGSGameStory = Template.bind({});
