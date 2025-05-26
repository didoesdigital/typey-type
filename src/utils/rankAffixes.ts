import penaliseStars from "../utils/transformingDictionaries/rankOutlines/penaliseStars";
import penaliseStretchKeys from "../utils/transformingDictionaries/rankOutlines/penaliseStretchKeys";
import penaliseSlashes from "../utils/transformingDictionaries/rankOutlines/penaliseSlashes";

import type {
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
} from "../types";

const preferredVowelSet = [
  "SKWRA",
  "SKWRE",
  "SKWREU",
  "SKWRO",
  "SKWRU",
  "KWREU",
];
const secondPreferredVowelSet = [
  "STPA",
  "STPE",
  "STPEU",
  "STPO",
  "STPU",
  // no "y" suffix
];
const vowelSuffixTranslations = [
  "{^a}",
  "{^e}",
  "{^i}",
  "{^o}",
  "{^u}",
  "{^y}",
];

function getVowelSuffixPriority(outline: string) {
  if (preferredVowelSet.includes(outline)) return 1;
  if (secondPreferredVowelSet.includes(outline)) return 2;
  return 3;
}

// This function shares a lot of code with rankOutlines but is modified to specifically handle *only* affixes
function rankAffixes(
  arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[],
  affixMisstrokes: StenoDictionary,
  translation: string
) {
  arrayOfStrokesAndTheirSourceDictNames.sort((a, b) => {
    if (a[2] === "user" && b[2] !== "user") return -1;
    if (b[2] === "user" && a[2] !== "user") return 1;

    // For now, there are no affixes in this dictionary. The only Plover
    // formatting in it at the moment is for glue formatting e.g. {&er}, {&2}
    // if (a[1] === "top-10000-project-gutenberg-words.json") return -1;
    // if (b[1] === "top-10000-project-gutenberg-words.json") return 1;

    if (
      affixMisstrokes[a[0]] === translation &&
      !(affixMisstrokes[b[0]] === translation)
    ) {
      return 1; // sort a after b
    }
    if (
      affixMisstrokes[b[0]] === translation &&
      !(affixMisstrokes[a[0]] === translation)
    ) {
      return -1; // sort a before b
    }

    let outlineA = a[0];
    let outlineB = b[0];

    if (vowelSuffixTranslations.includes(translation)) {
      return (
        getVowelSuffixPriority(outlineA) - getVowelSuffixPriority(outlineB)
      );
    }

    let outlineALengthWithAllPenalties = outlineA.length;
    let outlineBLengthWithAllPenalties = outlineB.length;

    outlineALengthWithAllPenalties += penaliseStars(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseStars(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashes(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseSlashes(outlineB, translation);

    if (outlineALengthWithAllPenalties === outlineBLengthWithAllPenalties) {
      outlineALengthWithAllPenalties += penaliseStretchKeys(
        outlineA,
        outlineB,
        translation
      );
      outlineBLengthWithAllPenalties += penaliseStretchKeys(
        outlineB,
        outlineA,
        translation
      );
    }

    return outlineALengthWithAllPenalties - outlineBLengthWithAllPenalties;
  });
  return arrayOfStrokesAndTheirSourceDictNames;
}

export default rankAffixes;
