import splitIntoStrokesDictsAndNamespaces from "./transformingDictionaries/splitIntoStrokesDictsAndNamespaces";
import type { LookupDictWithNamespacedDictsAndConfig, Outline } from "../types";

const createListOfStrokes = (
  phrase: Outline,
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig
) => {
  const gotPhraseFromGlobalLookupDict = globalLookupDictionary.get(phrase);

  return splitIntoStrokesDictsAndNamespaces(
    // eslint-disable-next-line no-extra-boolean-cast
    !!gotPhraseFromGlobalLookupDict ? gotPhraseFromGlobalLookupDict : []
  );
};

export default createListOfStrokes;
