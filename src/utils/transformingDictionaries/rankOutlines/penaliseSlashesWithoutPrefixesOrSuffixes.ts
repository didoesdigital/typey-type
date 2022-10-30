import hasPrefix from "./hasPrefix";
import hasSuffix from "./hasSuffix";
import type { AffixObject } from "../../../types";

const penaliseSlashesWithoutPrefixesOrSuffixes = (
  outline: string,
  translation: string,
  affixes: AffixObject
) => {
  if (!outline.includes("/")) return 0;

  return hasPrefix(outline, translation, affixes.prefixes) ||
    hasSuffix(outline, translation, affixes.suffixes)
    ? 0
    : 2;
};

export default penaliseSlashesWithoutPrefixesOrSuffixes;
