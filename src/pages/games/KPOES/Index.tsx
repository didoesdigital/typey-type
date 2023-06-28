import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";

import type {
  LookupDictWithNamespacedDicts,
  // MetWords,
  // PersonalDictionaryNameAndContents,
} from "../../../types";

type Props = {
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries: any; // PersonalDictionaryNameAndContents[];
  // startingMetWordsToday: MetWords;
  // updateMetWords: any;
  globalUserSettings: any;
  userSettings: any;
};

export default function Index({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  globalUserSettings,
  userSettings,
}: // startingMetWordsToday,
// updateMetWords,
Props) {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    const shouldUsePersonalDictionaries =
      personalDictionaries &&
      Object.entries(personalDictionaries).length > 0 &&
      !!personalDictionaries.dictionariesNamesAndContents;

    fetchAndSetupGlobalDict(
      false,
      shouldUsePersonalDictionaries ? personalDictionaries : null
    ).catch((error) => {
      console.error(error);
    });
  }, [fetchAndSetupGlobalDict, personalDictionaries]);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              KPOES
            </h2>
          </header>
        </div>
      </Subheader>
      <Game
        fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
        personalDictionaries={personalDictionaries}
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
        globalUserSettings={globalUserSettings}
        userSettings={userSettings}
        // startingMetWordsToday={startingMetWordsToday}
        // updateMetWords={updateMetWords}
      />
    </main>
  );
}
