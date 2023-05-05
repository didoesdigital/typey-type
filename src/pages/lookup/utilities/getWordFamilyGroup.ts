import type { LookupDictWithNamespacedDicts } from "../../../types";

const getWordFamilyGroup = (
  trimmedWord: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts
) => {
  const commonFamilyGroupEndings = [
    "ing",
    "ed",
    "ment",
    "'s",
    "ly",
    "ion",
    "s",
    "er",
  ];

  const familyGroup: string[] = [];
  commonFamilyGroupEndings.forEach((ending) => {
    const trimmedWordPlusEnding = trimmedWord + ending;
    if (globalLookupDictionary.get(trimmedWordPlusEnding)) {
      familyGroup.push(trimmedWordPlusEnding);
    }
  });

  return familyGroup;
};

export default getWordFamilyGroup;
