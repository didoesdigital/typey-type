import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import combineValidDictionaries from "./combineValidDictionaries";
import type {
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
  PersonalDictionaryNameAndContents,
  DictionaryConfigurationList,
  ReadDictionariesData,
} from "../../types";

const addConfig = (
  dict: LookupDictWithNamespacedDicts,
  config: DictionaryConfigurationList
): LookupDictWithNamespacedDictsAndConfig => {
  dict.configuration = config;
  return dict as LookupDictWithNamespacedDictsAndConfig;
};

const createGlobalLookupDictionary = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  typeyDicts: ReadDictionariesData
): LookupDictWithNamespacedDictsAndConfig => {
  // TODO: one day, this could be the place we check for whether Typey Type dictionaries are enabled and if so combineValidDictionaries with them and add to 'configuration'

  let combinedLookupDictionary: LookupDictWithNamespacedDicts =
    combineValidDictionaries(personalDictionariesNamesAndContents, typeyDicts);

  const typeyDictsConfigEntries = typeyDicts.map(
    (readDictData) => `${SOURCE_NAMESPACES.get("typey")}:${readDictData[1]}`
  );

  let configuration = [
    ...typeyDictsConfigEntries,
    ...personalDictionariesNamesAndContents.map(
      (d) => `${SOURCE_NAMESPACES.get("user")}:${d[0]}`
    ),
  ];

  return addConfig(combinedLookupDictionary, configuration);
};

export default createGlobalLookupDictionary;
