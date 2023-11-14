import React from "react";
import Game from "./Game";
import userSettings from "../../../stories/fixtures/userSettings";
import globalUserSettings from "../../../stories/fixtures/globalUserSettings";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/TPEURPBGS game",
  component: Game,
};

const Template = (args) => (
  <div className="p3">
    <Game
      globalUserSettings={globalUserSettings}
      userSettings={userSettings}
      {...args}
    />
  </div>
);

export const TPEURPBGSGameStory = Template.bind({});
