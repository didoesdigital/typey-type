import { AffixList } from "../affixList";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";

import type { LookupDictWithNamespacedDicts } from "../../types";

const createStrokeHintForPhrase = (
  wordOrPhraseMaterial: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  affixList = AffixList.getSharedInstance()
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
