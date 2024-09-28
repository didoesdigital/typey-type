import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";

import type {
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
} from "../../../types";
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";

type Props = {
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  metWords: MetWords;
  personalDictionaries?: ImportedPersonalDictionaries;
  userSettings: any;
};

export default function Index({
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  metWords,
  userSettings,
}: Props) {
  const { appFetchAndSetupGlobalDict, updateMultipleMetWords } =
    useAppMethods();
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
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
              KPOES
            </h2>
          </header>
        </div>
      </Subheader>
      <Game
        fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
        metWords={metWords}
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
        personalDictionaries={personalDictionaries}
        userSettings={userSettings}
        updateMultipleMetWords={updateMultipleMetWords}
      />
    </main>
  );
}
