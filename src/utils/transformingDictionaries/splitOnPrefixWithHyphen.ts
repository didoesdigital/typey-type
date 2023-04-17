import fingerspelledCharacters from "../../constant/fingerspelledCharacters";
import findFingerspellingOutline from "./findFingerspellingOutline";
import getPhraseSplitLimit from "./getPhraseSplitLimit";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import type { SplitterFunction } from "./recursiveBuildStrokeHint";
import type { AffixItem } from "../../types";

const getMatchingPrefixWithHyphen = (
  wordOrPhraseMaterial: string,
  prefixes: AffixItem[]
) => {
  let i = 0;
  let prefixFound = false;
  while (i < prefixes.length && !prefixFound) {
    const prefixEntry = prefixes[i];
    const prefix = prefixEntry[1];

    if (prefix.endsWith("-") && wordOrPhraseMaterial.startsWith(prefix)) {
      prefixFound = true;
      return prefixEntry;
    }

    i++;
  }

  return null;
};

const splitOnPrefixWithHyphen: SplitterFunction = (
  wordOrPhraseMaterial,
  globalLookupDictionary,
  affixList,
  depth,
  _precedingChar
) => {
  const prefixEntry = getMatchingPrefixWithHyphen(
    wordOrPhraseMaterial,
    affixList.prefixes
  );
  if (prefixEntry === null) {
    return null;
  }

  const [prefixOutline, prefixTranslation] = prefixEntry;
  if (prefixTranslation.length === wordOrPhraseMaterial.length) {
    return null;
  }

  const prefixAndRest = [
    prefixTranslation,
    wordOrPhraseMaterial.slice(prefixTranslation.length),
  ];

  return prefixAndRest
    .slice(0, getPhraseSplitLimit(depth))
    .map((wordBit, i) => {
      // NOTE: This works because subsequent letters are likely to be fingerspelled (therefore glued and stick to this fingerspelled letter) or suffixes that suppress spaces so no erroneous spaces are introduced
      if (wordBit.length === 1) {
        const fingerspelled = findFingerspellingOutline(
          wordBit,
          globalLookupDictionary,
          fingerspelledCharacters[wordBit],
          affixList
        );
        if (fingerspelled) return fingerspelled;
      }

      if (i === 0) {
        return prefixOutline.replace(/\/$/, "");
      }

      return recursiveBuildStrokeHint(
        wordBit,
        globalLookupDictionary,
        affixList,
        depth++,
        i === 0 ? "" : prefixAndRest[i - 1].slice(-1) // TODO: Probably breaks emoji
      );
    })
    .join("/");
};

export default splitOnPrefixWithHyphen;
