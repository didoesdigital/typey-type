import React from "react";
import Game from "./Game";
import { BrowserRouter as Router, Route } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/KAOES game",
  component: Game,
};

const Template = (args) => (
  <Router basename="/typey-type">
    <div className="p3">
      <Route>
        <Game {...args} />
      </Route>
    </div>
  </Router>
);

export const KAOESGameStory = Template.bind({});
