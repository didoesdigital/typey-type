import splitIntoStrokesDictsAndNamespaces from "utils/transformingDictionaries/splitIntoStrokesDictsAndNamespaces";
import misstrokesJSON from "../json/misstrokes.json";
import rankAffixes from "utils/rankAffixes";

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
} from "../types";

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
        const bestPrefixOutline = rankAffixes(
          splitIntoStrokesDictsAndNamespaces(outlinesAndSourceDicts),
          affixMisstrokes,
          phrase
        )[0][0];
        const prefixOutlineWithSlash: PrefixOutlineWithSlash = `${bestPrefixOutline}/`;
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
