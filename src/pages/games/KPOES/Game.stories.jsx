import React from "react";
import Game from "./Game";
import userSettings from "../../../stories/fixtures/userSettings";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/KPOES game",
  component: Game,
};

const Template = (args) => (
  <div className="p3">
    <Game
      fetchAndSetupGlobalDict={() => Promise.resolve(true)}
      globalLookupDictionary={new Map()}
      globalLookupDictionaryLoaded={true}
      metWords={{}}
      userSettings={userSettings}
      updateMultipleMetWords={() => {}}
      {...args}
    />
  </div>
);

export const KPOESGameStory = Template.bind({});
