import { BrowserRouter as Router, Route } from "react-router-dom";
import type { Preview } from "@storybook/react";

import "../src/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Getting Started",
          ["Overview"],
          "Pages",
          ["Home"],
          "Progress",
          "Lessons",
          ["Custom", "Flashcards", "Speed chart", "Metronome"],
          "Games",
          [
            "Games index",
            "KAOES game",
            "SHUFL game",
            "TPEUBGSZ game",
            "KHAERT game",
            "Completed",
          ],
          "Material",
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <Router basename="/typey-type">
        <Route>
          <div id="js-app" className="app">
            <Story />
          </div>
        </Route>
      </Router>
    ),
  ],
};

export default preview;
