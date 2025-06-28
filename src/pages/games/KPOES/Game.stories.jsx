import React from "react";
import Game from "./Game";
import userSettings from "../../../stories/fixtures/userSettings";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/KPOES game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
