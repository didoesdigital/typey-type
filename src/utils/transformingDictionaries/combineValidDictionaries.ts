import LATEST_PLOVER_DICT_NAME from "../../constant/latestPloverDictName";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import { addOutlinesToWordsInCombinedDict } from "./transformingDictionaries";
import {
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../types";

const combineValidDictionaries = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  dictTypeyType: StenoDictionary,
  ploverDict: any = null
) => {
  let combinedLookupDictionary = new Map();
  let numberOfPersonalDictionaries =
    personalDictionariesNamesAndContents.length;
  let outlinesWeHaveSeen = new Set();
  // eslint-disable-next-line
  let _;

  // 1. Add personal dictionaries entries
  for (let i = 0; i < numberOfPersonalDictionaries; i++) {
    let dictName = personalDictionariesNamesAndContents[i][0];
    let dictContent = personalDictionariesNamesAndContents[i][1];
    [combinedLookupDictionary, outlinesWeHaveSeen] =
      addOutlinesToWordsInCombinedDict(
        dictContent,
        combinedLookupDictionary,
        `${SOURCE_NAMESPACES.get("user")}:${dictName}`,
        outlinesWeHaveSeen
      );
  }

  // 2. Add Typey Type entries
  [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(
    dictTypeyType,
    combinedLookupDictionary,
    `${SOURCE_NAMESPACES.get("typey")}:typey-type.json`,
    new Set()
  );

  // 3. Add Plover dictionary entries
  if (!!ploverDict) {
    // eslint-disable-next-line
    [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(
      ploverDict,
      combinedLookupDictionary,
      `${SOURCE_NAMESPACES.get("plover")}:${LATEST_PLOVER_DICT_NAME}`,
      new Set()
    );
  }

  outlinesWeHaveSeen = new Set();

  return combinedLookupDictionary;
};

export default combineValidDictionaries;
