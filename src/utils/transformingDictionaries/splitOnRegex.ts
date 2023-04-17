import getPhraseSplitLimit from "./getPhraseSplitLimit";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import type { SplitterFunction } from "./recursiveBuildStrokeHint";

const splitOnRegex = (regexWithCaptureGroups: RegExp) => {
  const splitOn: SplitterFunction = (
    wordOrPhraseMaterial,
    globalLookupDictionary,
    affixList,
    depth,
    precedingChar
  ) => {
    const phraseBits = wordOrPhraseMaterial
      .split(regexWithCaptureGroups)
      .filter((nonEmptyItem) => nonEmptyItem);

    if (phraseBits.length < 2) {
      return null;
    }

    return phraseBits
      .slice(0, getPhraseSplitLimit(depth))
      .map((phraseBit, i) => {
        return recursiveBuildStrokeHint(
          phraseBit,
          globalLookupDictionary,
          affixList,
          depth++,
          i === 0 ? precedingChar || " " : phraseBits[i - 1].slice(-1) // TODO: Probably breaks emoji
        );
      })
      .join("/");
  };

  return splitOn;
};

export default splitOnRegex;
