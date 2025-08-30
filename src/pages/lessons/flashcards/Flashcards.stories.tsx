import React from "react";
import Flashcards from "./Flashcards";
import { useHydrateAtoms } from "jotai/utils";
import { flashcardsProgressState } from "../../../states/flashcardsProgressState";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";

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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  useHydrateAtoms([[flashcardsProgressState, flashcardsProgress]]);
  return (
    <div className="p3">
      <AppMethodsContext.Provider
        // @ts-expect-error TS(2740) FIXME: Type '{ appFetchAndSetupGlobalDict: () => Promise<... Remove this comment to see the full error message
        value={{
          appFetchAndSetupGlobalDict: () => Promise.resolve(true),
        }}
      >
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
            import.meta.env.VITE_PUBLIC_URL +
            lessonPath.replace(/flashcards/, "") +
            "lesson.txt"
          }
          locationpathname={lessonPath}
        />
      </AppMethodsContext.Provider>
    </div>
  );
};

export const FlashcardsStory = Template.bind({});
