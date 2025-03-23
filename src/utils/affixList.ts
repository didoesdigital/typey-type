import splitIntoStrokesDictsAndNamespaces from "utils/transformingDictionaries/splitIntoStrokesDictsAndNamespaces";
import type {
  LookupDictWithNamespacedDicts,
  AffixObject,
  PrefixEntry,
  PrefixOutlineWithSlash,
  PrefixTextWithNoTPRBGTS,
  SuffixEntry,
  SuffixOutlineWithLeadingSlash,
  SuffixTextWithNoTPRBGTS,
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
} from "../types";
import penaliseStars from "utils/transformingDictionaries/rankOutlines/penaliseStars";
import penaliseStretchKeys from "utils/transformingDictionaries/rankOutlines/penaliseStretchKeys";
import misstrokesJSON from "../json/misstrokes.json";
import penaliseSlashes from "utils/transformingDictionaries/rankOutlines/penaliseSlashes";

let SHARED_INSTANCE: AffixObject = { suffixes: [], prefixes: [] };

const prefixRegex = /^\{([A-Za-z0-9.=<>\\:'"#-])+\^\}$/;
const suffixRegex = /^\{\^([A-Za-z0-9.=<>\\:'"#-])+\}$/;

const isAffix = (translation: string) => {
  return translation.match(suffixRegex) || translation.match(prefixRegex);
};

const misstrokes = misstrokesJSON as StenoDictionary;
const affixMisstrokes = Object.fromEntries(
  Object.entries(misstrokes).filter((dictEntry) => isAffix(dictEntry[1]))
);

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
  // affixes: AffixObject = { suffixes: [], prefixes: [] }
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

export class AffixList {
  suffixes: SuffixEntry[];
  prefixes: PrefixEntry[];

  static getSharedInstance() {
    return SHARED_INSTANCE;
  }

  static setSharedInstance(inst: any) {
    SHARED_INSTANCE = inst;
  }

  constructor(dict: LookupDictWithNamespacedDicts) {
    const suffixes = [];
    const prefixes = [];
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(suffixRegex)) {
        const bestSuffixOutline = rankAffixes(
          splitIntoStrokesDictsAndNamespaces(outlinesAndSourceDicts),
          affixMisstrokes,
          phrase
        )[0][0];
        const suffixOutlineWithLeadingSlash: SuffixOutlineWithLeadingSlash = `/${bestSuffixOutline}`;
        const suffixTextWithNoTPRBGTS: SuffixTextWithNoTPRBGTS = phrase
          .replace("{^", "")
          .replace("}", "");
        const suffixEntry: SuffixEntry = [
          suffixOutlineWithLeadingSlash,
          suffixTextWithNoTPRBGTS,
        ];
        suffixes.push(suffixEntry);
      }

      if (phrase.match(prefixRegex)) {
        const prefixOutlineWithSlash: PrefixOutlineWithSlash = `${outlinesAndSourceDicts[0][0]}/`;
        const prefixTextWithNoTPRBGTS: PrefixTextWithNoTPRBGTS = phrase
          .replace("{", "")
          .replace("^}", "");
        const prefixEntry: PrefixEntry = [
          prefixOutlineWithSlash,
          prefixTextWithNoTPRBGTS,
        ];
        prefixes.push(prefixEntry);
      }
    }

    // Sort by translation length so that longer affixes are selected first
    suffixes.sort((a, b) => b[1].length - a[1].length);
    prefixes.sort((a, b) => b[1].length - a[1].length);

    this.suffixes = suffixes;
    this.prefixes = prefixes;
  }
}
