import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";

import type {
  Experiments,
  GlobalUserSettings,
  LookupDictWithNamespacedDictsAndConfig,
  UserSettings,
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
  dictionaryIndex: any;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  globalUserSettings: GlobalUserSettings;
  setDictionaryIndex: () => void;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  toggleExperiment: any;
  updatePersonalDictionaries: any;
  userSettings: UserSettings;
  [restProps: string]: any;
};

const Dictionaries = ({
  dictionaryIndex,
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  globalUserSettings,
  setDictionaryIndex,
  stenohintsonthefly,
  toggleExperiment,
  updatePersonalDictionaries,
  userSettings,
  fetchAndSetupGlobalDict,
  ...dictionaryProps
}: Props) => {
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
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
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
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            {...dictionaryProps}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Dictionaries;
