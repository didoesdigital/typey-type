import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../src/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Getting Started", ["Overview"], "Pages", ["Home"], "Progress", "Lessons", ["Custom", "Flashcards", "Speed chart", "Metronome"], "Games", ["Games index", "KAOES game", "SHUFL game", "TPEUBGSZ game", "KHAERT game", "Completed"], "Material"]
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <Router basename="/typey-type">
        <Route>
          <div id="js-app" className="app">
            <Story />
          </div>
        </Route>
      </Router>
    );
  },
];
