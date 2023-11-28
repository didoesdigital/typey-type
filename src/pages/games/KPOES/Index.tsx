import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";

import type {
  FetchAndSetupGlobalDict,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
} from "../../../types";

type Props = {
  fetchAndSetupGlobalDict: FetchAndSetupGlobalDict;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  metWords: MetWords;
  globalUserSettings: any;
  userSettings: any;
  updateMultipleMetWords: (newMetWords: string[]) => void;
};

export default function Index({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  metWords,
  globalUserSettings,
  userSettings,
  updateMultipleMetWords,
}: Props) {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    fetchAndSetupGlobalDict(false, null).catch((error) => {
      console.error(error);
    });
  }, [fetchAndSetupGlobalDict]);

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
        metWords={metWords}
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
        globalUserSettings={globalUserSettings}
        userSettings={userSettings}
        updateMultipleMetWords={updateMultipleMetWords}
      />
    </main>
  );
}
