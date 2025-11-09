import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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

const LazyDictionary = lazy(() => import("./Dictionary"));

const LazyDictionaryManagement = lazy(() => import("./DictionaryManagement"));

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
                <LazyDictionary />
              </Suspense>
            }
          />
        ))}
        <Route
          path={"management"}
          element={
            <Suspense fallback={<PageLoading pastDelay={true} />}>
              <LazyDictionaryManagement
                fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
                globalLookupDictionary={globalLookupDictionary}
                toggleExperiment={toggleExperiment}
                updatePersonalDictionaries={updatePersonalDictionaries}
              />
            </Suspense>
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
