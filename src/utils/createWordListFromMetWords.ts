import trimAndSumUniqMetWords from "./trimAndSumUniqMetWords";

import type { MetWords } from "types";

function createWordListFromMetWords(metWords: MetWords) {
  const munged = trimAndSumUniqMetWords(metWords);
  let metWordsEntries = Object.entries(munged).sort(function (a, b) {
    return b[1] - a[1];
  });

  // remove prefix and suffix entries because they're annoying to write
  // while practicing regular words
  metWordsEntries = metWordsEntries.filter((item) => {
    const containsCaret = item[0].indexOf("^") !== -1;
    const isJustACaretCharacter = item[0] === "^";
    const isJustACaretCharacterWithSpaceBefore = item[0] === " ^";
    const isJustACaretCharacterWithSpaceAfter = item[0] === "^ ";
    return (
      !containsCaret ||
      isJustACaretCharacter ||
      isJustACaretCharacterWithSpaceBefore ||
      isJustACaretCharacterWithSpaceAfter
    );
  });
  return metWordsEntries.map((entry) => entry[0].trim());
}

export { createWordListFromMetWords };
