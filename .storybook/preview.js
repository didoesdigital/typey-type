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
};

export const decorators = [
  (Story) => {
    return (
      <Router basename="/typey-type">
        <Route>
          <Story />
        </Route>
      </Router>
    );
  },
];
