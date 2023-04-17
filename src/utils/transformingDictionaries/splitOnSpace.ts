import getPhraseSplitLimit from "./getPhraseSplitLimit";
import recursiveBuildStrokeHint from "./recursiveBuildStrokeHint";
import type { SplitterFunction } from "./recursiveBuildStrokeHint";

const splitOnSpace: SplitterFunction = (
  wordOrPhraseMaterial,
  globalLookupDictionary,
  affixList,
  depth,
  _precedingChar
) => {
  const phraseBits = wordOrPhraseMaterial
    .split(/ /)
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
        // NOTE: we always use " " as preceding char because we don't capture the split space in / /
        " "
      );
    })
    .join("/");
};

export default splitOnSpace;
