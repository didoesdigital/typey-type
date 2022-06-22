import React from "react";
import Game from "./Game";
import metWordsBeginner from "../../../fixtures/metWordsBeginner.json";
import { BrowserRouter as Router, Route } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/SHUFL game",
  component: Game,
};

const fauxUpdateMetWords = (metWord) => console.log(metWord);

const Template = (args) => (
  <Router basename="/typey-type">
    <div className="p3">
      <Route>
        <Game globalLookupDictionary={new Map()} updateMetWords={fauxUpdateMetWords} {...args} />
      </Route>
    </div>
  </Router>
);

export const SHUFLGameStory = Template.bind({});
SHUFLGameStory.args = {
  startingMetWordsToday: metWordsBeginner,
};
