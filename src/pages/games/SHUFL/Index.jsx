import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";

export default function Index({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  startingMetWordsToday,
  personalDictionaries,
  updateMetWords,
}) {
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
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
              SHUFL
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <Game
          globalLookupDictionary={globalLookupDictionary}
          globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
          startingMetWordsToday={startingMetWordsToday}
          updateMetWords={updateMetWords}
        />
      </div>
    </main>
  );
}
