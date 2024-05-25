import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";

import type {
  Experiments,
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
  dictionaryIndex: any;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  [restProps: string]: any;
};

const Dictionaries = ({
  dictionaryIndex,
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  stenohintsonthefly,
  ...dictionaryProps
}: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const {
    setDictionaryIndex,
    updatePersonalDictionaries,
    appFetchAndSetupGlobalDict,
  } = useAppMethods();
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
          <AsyncDictionary />
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
          <DictionariesIndex
            dictionaryIndex={dictionaryIndex}
            setDictionaryIndex={setDictionaryIndex}
            stenohintsonthefly={stenohintsonthefly}
            userSettings={userSettings}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
            {...dictionaryProps}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Dictionaries;
