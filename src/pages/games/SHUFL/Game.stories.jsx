import React from "react";
import Game from "./Game";
import metWordsBeginner from "../../../fixtures/metWordsBeginner.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/SHUFL game",
  component: Game,
};

const fauxUpdateMetWords = (metWord) => console.log(metWord);

const Template = (args) => (
  <div className="p3">
    <Game
      globalLookupDictionary={new Map()}
      updateMetWords={fauxUpdateMetWords}
      globalLookupDictionaryLoaded={true}
      startingMetWordsToday={{'the': 2}}
      {...args}
    />
  </div>
);

export const SHUFLGameStory = Template.bind({});
SHUFLGameStory.args = {
  startingMetWordsToday: metWordsBeginner,
};
