import React from "react";
import { Route, Switch } from "react-router-dom";

import Flashcards from "./Flashcards";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Flashcards",
  component: Flashcards,
};

// Fixtures:
const flashcardsProgress = {
  "/lessons/drills/top-200-words-spoken-on-tv/flashcards": {
    lastSeen: 1656926111097,
  },
};
const lessonPath = "/lessons/drills/top-200-words-spoken-on-tv/flashcards";
const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
]);

const Template = (args) => (
  <div className="p3">
    <Switch>
      <Route path={`/`}>
        <div>
          <Flashcards
            fetchAndSetupGlobalDict={() => Promise.resolve(true)}
            flashcardsMetWords={{}}
            flashcardsProgress={flashcardsProgress}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={true}
            personalDictionaries={{}}
            updateFlashcardsMetWords={() => undefined}
            updateFlashcardsProgress={() => flashcardsProgress}
            updateGlobalLookupDictionary={() => undefined}
            updatePersonalDictionaries={() => undefined}
            userSettings={{}}
            fullscreen={false}
            changeFullscreen={() => undefined}
            lessonpath={
              process.env.PUBLIC_URL +
              lessonPath.replace(/flashcards/, "") +
              "lesson.txt"
            }
            locationpathname={lessonPath}
          />
        </div>
      </Route>
    </Switch>
  </div>
);

export const FlashcardsStory = Template.bind({});
