import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";

import type {
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
} from "../../types";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import { useToggleExperiment } from "../lessons/components/UserSettings/updateGlobalUserSetting";

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
  ...dictionaryProps
}: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const { updatePersonalDictionaries, appFetchAndSetupGlobalDict } =
    useAppMethods();
  const toggleExperiment = useToggleExperiment();
  const match = useRouteMatch({
    path: "/dictionaries",
    strict: true,
    sensitive: true,
  });
  const url = match?.url ?? "";

  return (
    <div>
      <Switch>
        <Route
          path={[
            `${url}/lessons/:category/:subcategory/:dictionaryPath`,
            `${url}/lessons/fundamentals/:dictionaryPath`,
            `${url}/lessons/drills/:dictionaryPath`,
            `${url}/typey-type/:dictionaryPath`,
            `${url}/individual/:dictionaryPath`,
            `${url}/didoesdigital/:dictionaryPath`,
            `${url}/plover/:dictionaryPath`,
          ]}
        >
          <Suspense fallback={<PageLoading />}>
            <AsyncDictionary />
          </Suspense>
        </Route>
        <Route exact={true} path={`${url}/management`}>
          <AsyncDictionaryManagement
            fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            toggleExperiment={toggleExperiment}
            updatePersonalDictionaries={updatePersonalDictionaries}
            {...dictionaryProps}
          />
        </Route>
        <Route exact={true} path={url}>
          <Suspense fallback={<PageLoading />}>
            <DictionariesIndex
              userSettings={userSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              personalDictionaries={personalDictionaries}
              fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
              {...dictionaryProps}
            />
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
};

export default Dictionaries;
