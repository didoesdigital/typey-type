import type {
  LookupDictWithNamespacedDicts,
  AffixObject,
  PrefixEntry,
  PrefixOutlineWithSlash,
  PrefixTextWithNoTPRBGTS,
  SuffixEntry,
  SuffixOutlineWithLeadingSlash,
  SuffixTextWithNoTPRBGTS,
} from "../types";

let SHARED_INSTANCE: AffixObject = { suffixes: [], prefixes: [] };

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
    const prefixRegex = /^\{([A-Za-z0-9.=<>\\:'"#-])+\^\}$/;
    const suffixRegex = /^\{\^([A-Za-z0-9.=<>\\:'"#-])+\}$/;
    for (const [phrase, outlinesAndSourceDicts] of dict) {
      if (phrase.match(suffixRegex)) {
        const suffixOutlineWithLeadingSlash: SuffixOutlineWithLeadingSlash = `/${outlinesAndSourceDicts[0][0]}`;
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

    this.suffixes = suffixes;
    this.prefixes = prefixes;
  }
}
