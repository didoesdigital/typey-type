import AFFIXES from "../affixes/affixes";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";

import type { LookupDictWithNamespacedDicts } from "../../types";

const createStrokeHintForPhrase = (
  wordOrPhraseMaterial: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList = AFFIXES.getSharedAffixes()
) => {
  return (
    recursiveBuildStrokeHint(
      wordOrPhraseMaterial,
      globalLookupDictionary,
      affixList,
      0,
      ""
    ) || "xxx"
  );
};

export default createStrokeHintForPhrase;
