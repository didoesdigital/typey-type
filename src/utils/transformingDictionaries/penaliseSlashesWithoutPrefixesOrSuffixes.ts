import hasPrefix from "./hasPrefix";
import hasSuffix from "./hasSuffix";
import type { AffixObject } from "../../types";

const penaliseSlashesWithoutPrefixesOrSuffixes = (
  outline: string,
  translation: string,
  affixes: AffixObject
) => {
  const suffixes = affixes.suffixes;
  const prefixes = affixes.prefixes;
  let penaltyForSlashesWithoutPrefixesOrSuffixes = 0;
  const hasSlashes = outline.includes("/");

  if (hasSlashes) {
    if (hasPrefix(outline, translation, prefixes)) {
      return 0;
    } else if (hasSuffix(outline, translation, suffixes)) {
      return 0;
    } else {
      penaltyForSlashesWithoutPrefixesOrSuffixes = 2;
    }
  }

  return penaltyForSlashesWithoutPrefixesOrSuffixes;
};

export default penaliseSlashesWithoutPrefixesOrSuffixes;
