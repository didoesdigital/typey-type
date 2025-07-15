import React from "react";
import Game from "./Game";
import metWordsBeginner from "../../../fixtures/metWordsBeginner.json";

export default {
  title: "Games/SHUFL game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'metWord' implicitly has an 'any' type.
const fauxUpdateMetWords = (metWord) => console.log(metWord);

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <Game
      globalLookupDictionary={new Map()}
      updateMetWords={fauxUpdateMetWords}
      globalLookupDictionaryLoaded={true}
      startingMetWordsToday={{ "the": 2 }}
      {...args}
    />
  </div>
);

export const SHUFLGameStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
SHUFLGameStory.args = {
  startingMetWordsToday: metWordsBeginner,
};
