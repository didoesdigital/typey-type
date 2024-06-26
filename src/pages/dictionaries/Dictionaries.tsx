import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";

import type {
  Experiments,
  GlobalUserSettings,
  LookupDictWithNamespacedDictsAndConfig,
} from "../../types";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";

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
  dictionaryIndex: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  globalUserSettings: GlobalUserSettings;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  [restProps: string]: any;
};

const Dictionaries = ({
  dictionaryIndex,
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  globalUserSettings,
  stenohintsonthefly,
  ...dictionaryProps
}: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const {
    setDictionaryIndex,
    toggleExperiment,
    updatePersonalDictionaries,
    appFetchAndSetupGlobalDict,
  } = useAppMethods();
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
          <AsyncDictionary />
        </Route>
        <Route exact={true} path={`${url}/management`}>
          <AsyncDictionaryManagement
            fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalUserSettings={globalUserSettings}
            toggleExperiment={toggleExperiment}
            updatePersonalDictionaries={updatePersonalDictionaries}
            {...dictionaryProps}
          />
        </Route>
        <Route exact={true} path={url}>
          <DictionariesIndex
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            stenohintsonthefly={stenohintsonthefly}
            userSettings={userSettings}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={globalUserSettings}
            fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
            {...dictionaryProps}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Dictionaries;
