import getRankedOutlineFromLookupEntry from "./getRankedOutlineFromLookupEntry";
import type { AffixObject, LookupDictWithNamespacedDicts } from "../../types";

const findSingleLetterWordOutline = (
  wordOrPhrase: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  strokeForOneCharacterWord: string,
  affixList: AffixObject,
  precedingChar: string
) => {
  // try look it up from personal dictionaries:
  // single letter words, natural capitalisation
  if (wordOrPhrase === "a" || wordOrPhrase === "I") {
    const modifiedWordOrPhrase = `${wordOrPhrase}`;
    const lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      strokeForOneCharacterWord = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }
  // single letter word, capitalised for start of sentence
  else if (wordOrPhrase === "A") {
    const letterAEntry = globalLookupDictionary.get("a");
    const capitalisationTranslation = ["", ".", "?", "!"].includes(precedingChar)
      ? "{}{-|}"
      : "{^}{-|}";
    const capitalisationEntry = globalLookupDictionary.get(
      capitalisationTranslation
    );
    if (letterAEntry && capitalisationEntry) {
      const letterAOutline = getRankedOutlineFromLookupEntry(
        letterAEntry,
        "a",
        affixList
      );
      const capitalisationOutline = getRankedOutlineFromLookupEntry(
        capitalisationEntry,
        capitalisationTranslation,
        affixList
      );
      strokeForOneCharacterWord = capitalisationOutline + "/" + letterAOutline;
    }
  }
  // roman numerals
  else if (wordOrPhrase === "X" || wordOrPhrase === "V") {
    const modifiedWordOrPhrase = `${wordOrPhrase}`;
    const lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      strokeForOneCharacterWord = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  return strokeForOneCharacterWord;
};

export default findSingleLetterWordOutline;
