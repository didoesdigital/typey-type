import LATEST_PLOVER_DICT_NAME from "../../constant/latestPloverDictName";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";

import combineValidDictionaries from "./combineValidDictionaries";
import {
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
  PersonalDictionaryNameAndContents,
  DictionaryConfigurationList,
  StenoDictionary,
} from "../../types";

const addConfig = (
  dict: LookupDictWithNamespacedDicts,
  config: DictionaryConfigurationList
): LookupDictWithNamespacedDictsAndConfig => {
  dict.configuration = config;
  return dict as LookupDictWithNamespacedDictsAndConfig;
};

const createAGlobalLookupDictionary = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  dictTypeyType: StenoDictionary,
  ploverDict: any = null
): LookupDictWithNamespacedDictsAndConfig => {
  // TODO: one day, this could be the place we check for whether Typey Type dictionaries or the Plover dictionary are enabled and if so combineValidDictionaries with them and add to 'configuration'

  let combinedLookupDictionary: LookupDictWithNamespacedDicts =
    combineValidDictionaries(
      personalDictionariesNamesAndContents,
      dictTypeyType,
      ploverDict
    );

  // let sortedAndCombinedLookupDictionary = rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary); // has a bug; instead of sorted entire dict, we sort per entry used within chooseOutlineForPhrase function
  let configuration = [
    `${SOURCE_NAMESPACES.get("typey")}:typey-type.json`,
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

export default createAGlobalLookupDictionary;
