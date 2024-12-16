import LATEST_PLOVER_DICT_NAME from "../../constant/latestPloverDictName";
import LATEST_TYPEY_TYPE_DICT_NAME from "../../constant/latestTypeyTypeDictName";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";

import combineValidDictionaries from "./combineValidDictionaries";
import {
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
  PersonalDictionaryNameAndContents,
  DictionaryConfigurationList,
  ReadDictionariesData,
  StenoDictionary,
} from "../../types";

const addConfig = (
  dict: LookupDictWithNamespacedDicts,
  config: DictionaryConfigurationList
): LookupDictWithNamespacedDictsAndConfig => {
  dict.configuration = config;
  return dict as LookupDictWithNamespacedDictsAndConfig;
};

// Note: This is the new preferred method to create a global lookup dictionary
export const createGlobalLookupDictionary = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  typeyDicts: ReadDictionariesData,
  ploverDict: any = null
): LookupDictWithNamespacedDictsAndConfig => {
  // TODO: one day, this could be the place we check for whether Typey Type dictionaries or the Plover dictionary are enabled and if so combineValidDictionaries with them and add to 'configuration'

  let combinedLookupDictionary: LookupDictWithNamespacedDicts =
    combineValidDictionaries(
      personalDictionariesNamesAndContents,
      typeyDicts,
      ploverDict
    );

  const typeyDictsConfigEntries = typeyDicts.map(
    (readDictData) => `${SOURCE_NAMESPACES.get("typey")}:${readDictData[1]}`
  );

  // let sortedAndCombinedLookupDictionary = rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary); // has a bug; instead of sorted entire dict, we sort per entry used within chooseOutlineForPhrase function
  let configuration = [
    ...typeyDictsConfigEntries,
    ...personalDictionariesNamesAndContents.map(
      (d) => `${SOURCE_NAMESPACES.get("user")}:${d[0]}`
    ),
  ];

  if (!!ploverDict) {
    configuration.push(
      `${SOURCE_NAMESPACES.get("plover")}:${LATEST_PLOVER_DICT_NAME}`
    );
  }

  return addConfig(combinedLookupDictionary, configuration);
};

/**
 * @deprecated This function is deprecated. Use `createGlobalLookupDictionary`
 * without "A" instead.
 *
 * This deprecated function only exists so we don't have to change the
 * structure of a hundred existing tests.
 */
const createAGlobalLookupDictionary = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  typeyDicts: StenoDictionary,
  ploverDict: any = null
): LookupDictWithNamespacedDictsAndConfig => {
  return createGlobalLookupDictionary(
    personalDictionariesNamesAndContents,
    [[typeyDicts, LATEST_TYPEY_TYPE_DICT_NAME]],
    ploverDict
  );
};

export default createAGlobalLookupDictionary;
