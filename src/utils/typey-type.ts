import type { PersonalDictionaryNameAndContents } from "types";

export type LocalStoragePersonalDictionariesV0 =
  PersonalDictionaryNameAndContents[];

export type LocalStoragePersonalDictionariesV1 = {
  v: string;
  dicts: PersonalDictionaryNameAndContents[];
};

type LocalStoragePersonalDictionariesUnknownVersion =
  | LocalStoragePersonalDictionariesV0
  | LocalStoragePersonalDictionariesV1;

function isV1(
  data: LocalStoragePersonalDictionariesV0 | LocalStoragePersonalDictionariesV1
): data is LocalStoragePersonalDictionariesV1 {
  return "v" in data;
}

const migratePersonalDictionariesV0ToV1 = function (
  localStoragePersonalDictionaries: LocalStoragePersonalDictionariesUnknownVersion,
  dirtyFlag: boolean
): [LocalStoragePersonalDictionariesV1, boolean] {
  if (isV1(localStoragePersonalDictionaries)) {
    return [localStoragePersonalDictionaries, dirtyFlag];
  } else {
    return [
      {
        v: "1",
        dicts: localStoragePersonalDictionaries,
      },
      true,
    ];
  }
};

// const migratePersonalDictionariesV1ToV2 = function (personalDictionaries, dirtyFlag) {
//   if (personalDictionaries.v && personalDictionaries.v === '1') {
//     let opts = {};
//     let dictsWithMetadata = personalDictionaries.dicts.map(dict => [dict[0],dict[1],opts]);
//     personalDictionaries = {v:'2',dicts:dictsWithMetadata};
//     dirtyFlag = true;
//   }

//   return [personalDictionaries, dirtyFlag];
// }

const runAllPersonalDictionariesMigrations = function (
  personalDictionaries: LocalStoragePersonalDictionariesUnknownVersion,
  dirtyFlag: boolean
): [LocalStoragePersonalDictionariesV1 | null, boolean, string | null] {
  const error = null;
  try {
    [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV0ToV1(
      personalDictionaries,
      dirtyFlag
    );
    // [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV1ToV2(personalDictionaries, dirtyFlag);
  } catch (exception) {
    return [
      null,
      false,
      "Personal dictionaries found in local storage are either missing a version number or are not in valid version 0 format for migrating to version 1.",
    ];
  }
  return [personalDictionaries, dirtyFlag, error];
};

function migratePersonalDictionariesV(
  personalDictionaries: LocalStoragePersonalDictionariesUnknownVersion
): [LocalStoragePersonalDictionariesV1 | null, string | null] {
  let dirtyFlag = false;
  let error: string | null = null;
  let maybePersonalDictionaries: null | LocalStoragePersonalDictionariesUnknownVersion =
    personalDictionaries;

  [maybePersonalDictionaries, dirtyFlag, error] =
    runAllPersonalDictionariesMigrations(maybePersonalDictionaries, dirtyFlag);

  if (maybePersonalDictionaries !== null && dirtyFlag && error === null) {
    writePersonalPreferences("personalDictionaries", maybePersonalDictionaries);
  }

  return [maybePersonalDictionaries, error];
}

function loadPersonalDictionariesFromLocalStorage() {
  try {
    if (window.localStorage) {
      let versionedDictionaries = null;
      if (window.localStorage.getItem("personalDictionaries")) {
        versionedDictionaries = JSON.parse(
          window.localStorage.getItem("personalDictionaries") ?? "null"
        );
      }
      if (versionedDictionaries === null) {
        return null;
      }

      let errorMessage = null;
      [versionedDictionaries, errorMessage] = migratePersonalDictionariesV(
        versionedDictionaries
      );
      if (errorMessage) {
        console.error(errorMessage);
        return null;
      }

      const areDictsSomewhatValid =
        versionedDictionaries !== null &&
        versionedDictionaries.v &&
        versionedDictionaries.v === "1" &&
        versionedDictionaries.dicts &&
        versionedDictionaries.dicts[0] &&
        versionedDictionaries.dicts[0][1];
      if (areDictsSomewhatValid) {
        return versionedDictionaries?.["dicts"] ?? null;
      } else {
        console.error("Dictionaries found in local storage are not valid. ");
        return null;
      }
    }
  } catch (error) {
    console.error("Unable to read local storage. ", error);
  }
  return null;
}

function writePersonalPreferences(itemToStore: string, JSONToStore: any) {
  const localStorageErrorMessage =
    "Local storage is unavailable. Changes to personal preferences and progress will be lost.";
  try {
    if (!window.localStorage) {
      console.warn(
        "Unable to write to local storage. Progress data will be lost."
      );
      return {
        name: "NoLocalStorage",
        message: localStorageErrorMessage,
      };
    }
  } catch (error) {
    console.warn(localStorageErrorMessage);
    console.error(error);
    return {
      name: "NoLocalStorage",
      message: localStorageErrorMessage,
    };
  }

  const stringToStore = JSON.stringify(JSONToStore);

  try {
    window.localStorage.setItem(itemToStore, stringToStore);
  } catch (error) {
    try {
      window.localStorage.removeItem("typey-KPOES-words");
      window.localStorage.removeItem("personalDictionaries");
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log(
        "Unable to write to local storage. It may be full. Any personal dictionaries imported have been removed.",
        error
      );
      return {
        name: "AddToStorageFailed",
        message:
          "Unable to set item in local storage. It may be full. Any personal dictionaries imported have been removed.",
        error: error,
      };
    } catch {
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log(
        "Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.",
        error
      );
      return {
        name: "WriteToStorageFailed",
        message:
          "Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.",
        error: error,
      };
    }
  }
}

export {
  loadPersonalDictionariesFromLocalStorage,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  runAllPersonalDictionariesMigrations,
  writePersonalPreferences,
};
