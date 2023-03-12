import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import DictionariesIndex from "./DictionariesIndex";
import PageLoading from "../../components/PageLoading";

import type {
  Experiments,
  GlobalUserSettings,
  LookupDictWithNamespacedDicts,
  PersonalDictionaryNameAndContents,
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
  match: any;
  dictionaryIndex: any;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  globalLookupDictionaryLoaded: boolean;
  globalUserSettings: GlobalUserSettings;
  personalDictionaries: PersonalDictionaryNameAndContents[];
  setAnnouncementMessage: () => void;
  setAnnouncementMessageString: (announcement: string) => void;
  setDictionaryIndex: () => void;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  toggleExperiment: any;
  updateGlobalLookupDictionary: any;
  updatePersonalDictionaries: any;
  userSettings: UserSettings;
  [restProps: string]: any;
};

const Dictionaries = ({
  match,
  dictionaryIndex,
  globalLookupDictionaryLoaded,
  globalLookupDictionary,
  globalUserSettings,
  personalDictionaries,
  setAnnouncementMessage,
  setAnnouncementMessageString,
  setDictionaryIndex,
  stenohintsonthefly,
  toggleExperiment,
  updateGlobalLookupDictionary,
  updatePersonalDictionaries,
  userSettings,
  fetchAndSetupGlobalDict,
  ...dictionaryProps
}: Props) => {
  return (
    <div>
      <Switch>
        <Route
          path={`${match.url}/lessons/:category/:subcategory/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/lessons/fundamentals/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/lessons/drills/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/typey-type/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/individual/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/didoesdigital/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.url}/plover/:dictionaryPath`}
          render={(props) => (
            <AsyncDictionary
              setAnnouncementMessage={setAnnouncementMessage}
              setAnnouncementMessageString={setAnnouncementMessageString}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={`${match.url}/management`}
          render={(props) => (
            <AsyncDictionaryManagement
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalUserSettings={globalUserSettings}
              setAnnouncementMessageString={setAnnouncementMessageString}
              toggleExperiment={toggleExperiment}
              updatePersonalDictionaries={updatePersonalDictionaries}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path={match.url}
          render={(props) => (
            <DictionariesIndex
              dictionaryIndex={dictionaryIndex}
              setAnnouncementMessage={setAnnouncementMessage}
              setDictionaryIndex={setDictionaryIndex}
              stenohintsonthefly={stenohintsonthefly}
              userSettings={userSettings}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              globalUserSettings={globalUserSettings}
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              personalDictionaries={personalDictionaries}
              updateGlobalLookupDictionary={updateGlobalLookupDictionary}
              updatePersonalDictionaries={updatePersonalDictionaries}
              {...dictionaryProps}
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default Dictionaries;
