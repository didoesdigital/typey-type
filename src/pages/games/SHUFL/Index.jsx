import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";

export default function Index({
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  startingMetWordsToday,
}) {
  const {
    appFetchAndSetupGlobalDict,
    updateMetWords
  } = useAppMethods();
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
  }, []);

  useEffect(() => {
    appFetchAndSetupGlobalDict(false, null).catch((error) => {
      console.error(error);
    });
  }, [appFetchAndSetupGlobalDict]);

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
