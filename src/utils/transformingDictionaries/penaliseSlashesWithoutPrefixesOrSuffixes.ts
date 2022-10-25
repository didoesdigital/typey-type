import hasPrefix from "./hasPrefix";
import hasSuffix from "./hasSuffix";
import type { AffixObject } from "../../types";

const penaliseSlashesWithoutPrefixesOrSuffixes = (
  outline: string,
  translation: string,
  affixes: AffixObject
) => {
  let penaltyForSlashesWithoutPrefixesOrSuffixes = 0;

  if (outline.includes("/")) {
    if (hasPrefix(outline, translation, affixes.prefixes)) {
      return 0;
    } else if (hasSuffix(outline, translation, affixes.suffixes)) {
      return 0;
    } else {
      penaltyForSlashesWithoutPrefixesOrSuffixes = 2;
    }
  }

  return penaltyForSlashesWithoutPrefixesOrSuffixes;
};

export default penaliseSlashesWithoutPrefixesOrSuffixes;
