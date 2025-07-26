import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import { useToggleExperiment } from "../lessons/components/UserSettings/updateGlobalUserSetting";
import DictionaryNotFound from "pages/dictionaries/DictionaryNotFound";

import type {
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
} from "../../types";

const AsyncDictionary = Loadable({
  loader: () => import("./Dictionary"),
  loading: PageLoading,
  delay: 300,
});

const AsyncDictionaryManagement = Loadable({
  loader: () => import("./DictionaryManagement"),
  loading: PageLoading,
  delay: 300,
});

type Props = {
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries?: ImportedPersonalDictionaries;
  [restProps: string]: any;
};

const Dictionaries = ({
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  personalDictionaries,
}: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const { updatePersonalDictionaries, appFetchAndSetupGlobalDict } =
    useAppMethods();
  const toggleExperiment = useToggleExperiment();

  return (
    <div>
      <Routes>
        {[
          "lessons/:category/:subcategory/:dictionaryPath",
          "lessons/fundamentals/:dictionaryPath",
          "lessons/drills/:dictionaryPath",
          "typey-type/:dictionaryPath",
          "individual/:dictionaryPath",
          "didoesdigital/:dictionaryPath",
          "plover/:dictionaryPath",
        ].map((path) => (
          <Route
            key={"Dictionaries"}
            path={path}
            element={
              <Suspense fallback={<PageLoading pastDelay={true} />}>
                <AsyncDictionary />
              </Suspense>
            }
          />
        ))}
        <Route
          path={"management"}
          element={
            <AsyncDictionaryManagement
              fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              toggleExperiment={toggleExperiment}
              updatePersonalDictionaries={updatePersonalDictionaries}
            />
          }
        />
        <Route
          path={"/"}
          element={
            <Suspense fallback={<PageLoading pastDelay={true} />}>
              <DictionariesIndex
                userSettings={userSettings}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                personalDictionaries={personalDictionaries}
                fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
              />
            </Suspense>
          }
        />
        <Route path={"*"} element={<DictionaryNotFound />} />
      </Routes>
    </div>
  );
};

export default Dictionaries;
