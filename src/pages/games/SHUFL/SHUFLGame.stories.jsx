import React from "react";
import SHUFLGame from "./SHUFLGame";
import metWordsBeginner from "../../../fixtures/metWordsBeginner.json";
import { BrowserRouter as Router, Route } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "SHUFL game",
  component: SHUFLGame,
};

const Template = (args) => (
  <Router basename="/typey-type">
    <div className="p3">
      <Route>
        <SHUFLGame {...args} />
      </Route>
    </div>
  </Router>
);

export const SHUFLGameStory = Template.bind({});
SHUFLGameStory.args = {
  metWords: metWordsBeginner,
};

export const SHUFLGameEmptyState = Template.bind({});
SHUFLGameEmptyState.args = {
  metWords: {},
};
