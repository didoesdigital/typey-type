import affixRexes from "./affixRegexes";
import rankAffixes from "../rankAffixes";
import splitIntoStrokesDictsAndNamespaces from "../transformingDictionaries/splitIntoStrokesDictsAndNamespaces";

import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
  PrefixEntry,
  PrefixOutlineWithSlash,
  PrefixTextWithNoTPRBGTS,
  StenoDictionary,
  SuffixEntry,
  SuffixOutlineWithLeadingSlash,
  SuffixTextWithNoTPRBGTS,
} from "../../types";

/**
 * Creates an AffixObject of the best prefixes and suffixes found in the given
 * lookup dictionary.
 *
 * @remarks
 * This function iterates through the provided `lookupDict`, identifying
 * translations that match prefix or suffix regular expressions. For each
 * matching translation, it selects the best outline using `rankAffixes`,
 * formats the outline and translation into `AffixItem`s, and collects them into
 * prefix and suffix arrays. The resulting arrays contain 1 entry per affix
 * translation and are sorted by the length of the affix translation,
 * prioritising longer affixes. The benefit of 1 entry per affix translation is
 * a smaller file size covering the majority of use cases. A limitation of 1
 * entry per affix translation is that generated lessons using the custom lesson
 * generator with the starts with a prefix/ends with a suffix rules will only
 * match of phrases starting/ending with the best affix.
 *
 * @param lookupDict - The dictionary containing phrases mapped to outlines
 * and source dictionaries.
 * @param affixMisstrokes - An affix misstrokes steno dictionary used to
 * down-rank affix outlines using misstrokes.
 * @returns An object containing sorted arrays of prefix and suffix entries.
 */
const getAffixesFromLookupDict = (
  lookupDict: LookupDictWithNamespacedDicts,
  affixMisstrokes: StenoDictionary
): AffixObject => {
  const suffixes = [];
  const prefixes = [];
  for (const [phrase, outlinesAndSourceDicts] of lookupDict) {
    if (phrase.match(affixRexes.suffixRegex)) {
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

    if (phrase.match(affixRexes.prefixRegex)) {
      const bestPrefixOutline = rankAffixes(
        splitIntoStrokesDictsAndNamespaces(outlinesAndSourceDicts),
        affixMisstrokes,
        phrase
      )[0][0];
      const prefixOutlineWithSlash: PrefixOutlineWithSlash = `${bestPrefixOutline}/`;
      const prefixTextWithNoTPRBGTS: PrefixTextWithNoTPRBGTS = phrase
        .replace("{", "")
        .replace("^}", "")
        .replace("{-|}", ""); // for `{Mc^}{-|}`
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

  return {
    prefixes,
    suffixes,
  };
};

export default getAffixesFromLookupDict;
