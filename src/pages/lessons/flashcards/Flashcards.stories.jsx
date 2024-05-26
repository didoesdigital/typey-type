import React from "react";
import { Route, Switch } from "react-router-dom";

import Flashcards from "./Flashcards";
import { useHydrateAtoms } from "jotai/utils";
import { flashcardsProgressState } from "../../../states/flashcardsProgressState";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";

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

const Template = (args) => {
  useHydrateAtoms([[flashcardsProgressState, flashcardsProgress]])
  return (
    <div className="p3">
      <Switch>
        <Route path={`/`}>
          <div>
            <AppMethodsContext.Provider value={{
              appFetchAndSetupGlobalDict: () => Promise.resolve(true),
            }}>
              <Flashcards
                fetchAndSetupGlobalDict={() => Promise.resolve(true)}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={true}
                personalDictionaries={{}}
                updateGlobalLookupDictionary={() => undefined}
                updatePersonalDictionaries={() => undefined}
                userSettings={{}}
                changeFullscreen={() => undefined}
                lessonpath={
                  process.env.PUBLIC_URL +
                  lessonPath.replace(/flashcards/, "") +
                  "lesson.txt"
                }
                locationpathname={lessonPath}
              />
            </AppMethodsContext.Provider>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export const FlashcardsStory = Template.bind({});
