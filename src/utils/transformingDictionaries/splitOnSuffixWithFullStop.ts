import getPhraseSplitLimit from "./getPhraseSplitLimit";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import type { SplitterFunction } from "./recursiveBuildStrokeHint";
import type { AffixItem } from "../../types";

const getMatchingSuffixWithFullStop = (
  wordOrPhraseMaterial: string,
  suffixes: AffixItem[]
) => {
  let i = 0;
  let suffixFound = false;
  while (i < suffixes.length && !suffixFound) {
    const suffixEntry = suffixes[i];
    const suffix = suffixEntry[1];

    if (suffix.startsWith(".") && wordOrPhraseMaterial.endsWith(suffix)) {
      suffixFound = true;
      return suffixEntry;
    }

    i++;
  }

  return null;
};

const splitOnSuffixWithFullStop: SplitterFunction = (
  wordOrPhraseMaterial,
  globalLookupDictionary,
  affixList,
  depth,
  _precedingChar
) => {
  const suffixEntry = getMatchingSuffixWithFullStop(
    wordOrPhraseMaterial,
    affixList.suffixes
  );
  if (suffixEntry === null) {
    return null;
  }

  const [suffixOutline, suffixTranslation] = suffixEntry;
  if (suffixTranslation.length === wordOrPhraseMaterial.length) {
    return null;
  }

  const suffixAndRest = [
    wordOrPhraseMaterial.slice(0, -suffixTranslation.length),
    suffixTranslation,
  ];

  return suffixAndRest
    .slice(0, getPhraseSplitLimit(depth))
    .map((wordBit, i) => {
      if (i === suffixAndRest.length - 1) {
        return suffixOutline.replace(/^\//, "");
      }

      return recursiveBuildStrokeHint(
        wordBit,
        globalLookupDictionary,
        affixList,
        depth++,
        i === 0 ? "" : suffixAndRest[i - 1].slice(-1) // TODO: Probably breaks emoji
      );
    })
    .join("/");
};

export default splitOnSuffixWithFullStop;
