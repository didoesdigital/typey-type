import findSingleLetterWordOutline from "./findSingleLetterWordOutline";
import findFingerspellingOutline from "./findFingerspellingOutline";
import fingerspelledCharacters from "../../constant/fingerspelledCharacters";
import fingerspelledSpacedPunctuation from "../../constant/fingerspelledSpacedPunctuation";
import singleLetterWords from "../../constant/singleLetterWords";
import AFFIXES from "../affixes/affixes";
import { escapeRegExp } from "../utils";
import getRankedOutlineFromLookupEntry from "./getRankedOutlineFromLookupEntry";

import type { LookupDictWithNamespacedDicts } from "../../types";

type ChooseOutlineForPhraseResult = [string, number];

const chooseOutlineForPhrase = (
  wordOrPhrase: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  chosenStroke: string | undefined,
  strokeLookupAttempts: number,
  precedingChar: string,
  affixList = AFFIXES.getSharedAffixes()
): ChooseOutlineForPhraseResult => {
  let suffixes = affixList.suffixes;
  let suffixesLength = suffixes.length;
  let prefixes = affixList.prefixes;
  let prefixesLength = prefixes.length;
  let lookupEntry = globalLookupDictionary.get(wordOrPhrase); // "example": [["KP-PL", "plover.json"],["KP-P", "plover.json"]]
  if (lookupEntry && lookupEntry.length > 0) {
    // Instead of discarding non-Typey entries, let's assume the first entry is Best.
    // This could be achieved removing misstrokes before we get here.
    // for (let i = 0; i < lookupEntry.length; i++) {
    //   if (lookupEntry[i][1] === "typey-type.json") {
    //     chosenStroke = lookupEntry[i][0];
    //   }
    // }
    chosenStroke = getRankedOutlineFromLookupEntry(
      lookupEntry,
      wordOrPhrase,
      affixList
    );
  } else {
    chosenStroke = undefined;
  }

  let spacedCapitalisationOutline = "KPA";
  let spacedCapitalisationTranslation = "{}{-|}";
  let spacedCapitalisationEntry = globalLookupDictionary.get(
    spacedCapitalisationTranslation
  );
  if (spacedCapitalisationEntry) {
    spacedCapitalisationOutline = getRankedOutlineFromLookupEntry(
      spacedCapitalisationEntry,
      spacedCapitalisationTranslation,
      affixList
    );
  }

  let unspacedCapitalisationOutline = "KPA*";
  let unspacedCapitalisationTranslation = "{^}{-|}";
  let unspacedCapitalisationEntry = globalLookupDictionary.get(
    unspacedCapitalisationTranslation
  );
  if (unspacedCapitalisationEntry) {
    unspacedCapitalisationOutline = getRankedOutlineFromLookupEntry(
      unspacedCapitalisationEntry,
      unspacedCapitalisationTranslation,
      affixList
    );
  }

  let uppercaseOutline = "*URP";
  let uppercaseTranslation = "{<}";
  let uppercaseEntry = globalLookupDictionary.get(uppercaseTranslation);
  if (uppercaseEntry) {
    uppercaseOutline = getRankedOutlineFromLookupEntry(
      uppercaseEntry,
      uppercaseTranslation,
      affixList
    );
  }

  let lowercaseOutline = "HRO*ER";
  let lowercaseTranslation = "{>}";
  let lowercaseEntry = globalLookupDictionary.get(lowercaseTranslation);
  if (lowercaseEntry) {
    lowercaseOutline = getRankedOutlineFromLookupEntry(
      lowercaseEntry,
      lowercaseTranslation,
      affixList
    );
  }

  let suppressSpaceOutline = "TK-LS";
  let suppressSpaceTranslation = "{^^}";
  let suppressSpaceEntry = globalLookupDictionary.get(suppressSpaceTranslation);
  if (suppressSpaceEntry) {
    suppressSpaceOutline = getRankedOutlineFromLookupEntry(
      suppressSpaceEntry,
      suppressSpaceTranslation,
      affixList
    );
  }

  let strokeForOneCharacterWord = singleLetterWords[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWord) {
    strokeForOneCharacterWord = findSingleLetterWordOutline(
      wordOrPhrase,
      globalLookupDictionary,
      strokeForOneCharacterWord,
      affixList,
      precedingChar
    );

    return [strokeForOneCharacterWord, strokeLookupAttempts + 1];
  }

  // NOTE: we do this even if a chosenStroke was found so that we can prioritise
  // glued translations e.g. "{&&}" or "{&b}" over non-glue entries e.g. "&" or "b"
  let strokeForOneCharacterWordPart = !precedingChar.match(/[0-9]/)
    ? fingerspelledSpacedPunctuation[wordOrPhrase] ||
      fingerspelledCharacters[wordOrPhrase]
    : fingerspelledCharacters[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWordPart) {
    strokeForOneCharacterWordPart = findFingerspellingOutline(
      wordOrPhrase,
      globalLookupDictionary,
      strokeForOneCharacterWordPart,
      affixList,
      precedingChar
    );

    if (precedingChar === " " && wordOrPhrase === '"') {
      strokeForOneCharacterWordPart = "KW-GS";
    }
    return [strokeForOneCharacterWordPart, strokeLookupAttempts + 1];
  }

  // FIRST => first
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      lookupEntry = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = uppercaseOutline + "/" + uppercasedStroke;
    }
  }

  // TUESDAY => Tuesday
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase
      .toLowerCase()
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    let lookupEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      lookupEntry = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = uppercaseOutline + "/" + uppercasedStroke;
    }
  }

  // apostrophe ess suffix for already capitalised entry
  // To find "KO*EUPBG/AES" for "King's" where "King" already has an entry
  // Must come before capitalisation step to avoid `"KEUPBG/AES": "king's"`
  if (!chosenStroke && wordOrPhrase.endsWith("'s")) {
    let apostropheEssIndex = wordOrPhrase.indexOf("'s");
    let mainWord = wordOrPhrase.slice(0, apostropheEssIndex);

    let i = 0;
    let bestApostropheEssSuffixWithSlash;
    while (i < suffixesLength && !chosenStroke) {
      if (suffixes[i][1] === "'s") {
        bestApostropheEssSuffixWithSlash = suffixes[i][0];
      }
      i++;
    }

    let modifiedWordOrPhrase = mainWord.toLowerCase();
    let originalEntry: any = globalLookupDictionary.get(mainWord);
    let modifiedEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);

    if (
      originalEntry &&
      modifiedEntry &&
      modifiedWordOrPhrase !== mainWord &&
      bestApostropheEssSuffixWithSlash
    ) {
      if (originalEntry) {
        originalEntry = getRankedOutlineFromLookupEntry(
          originalEntry,
          mainWord,
          affixList
        );
      }

      chosenStroke = originalEntry + bestApostropheEssSuffixWithSlash;
    }
  }

  // tom => Tom
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.replace(/(^|\s)\S/g, (l) =>
      l.toUpperCase()
    );
    let lookupEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      lookupEntry = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
    let capitalisedStroke = lookupEntry;

    if (capitalisedStroke) {
      chosenStroke = lowercaseOutline + "/" + capitalisedStroke;
    }
  }

  // Heather => heather
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      lookupEntry = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
    let lowercasedStroke = lookupEntry;

    if (lowercasedStroke) {
      if (precedingChar === " " || precedingChar === "") {
        chosenStroke = spacedCapitalisationOutline + "/" + lowercasedStroke;
      } else {
        chosenStroke = unspacedCapitalisationOutline + "/" + lowercasedStroke;
      }
    }
  }

  // Capitalise AND apostrophe ess suffix
  // To find "HEFPB/AES" for "Heaven's" where "Heaven" has no entry
  // NOTE: don't use .includes("'s") because it may match `'safe'` and others
  if (!chosenStroke && wordOrPhrase.endsWith("'s")) {
    let apostropheEssIndex = wordOrPhrase.indexOf("'s");
    let mainWord = wordOrPhrase.slice(0, apostropheEssIndex);

    let i = 0;
    let bestApostropheEssSuffixWithSlash;
    while (i < suffixesLength && !chosenStroke) {
      if (suffixes[i][1] === "'s") {
        bestApostropheEssSuffixWithSlash = suffixes[i][0];
      }
      i++;
    }

    let modifiedWordOrPhrase = mainWord.toLowerCase();
    let lookupEntry: any = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      lookupEntry = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
    let lowercasedStroke = lookupEntry;

    if (
      lowercasedStroke &&
      modifiedWordOrPhrase !== mainWord &&
      bestApostropheEssSuffixWithSlash
    ) {
      if (precedingChar === " " || precedingChar === "") {
        chosenStroke =
          spacedCapitalisationOutline +
          "/" +
          lowercasedStroke +
          bestApostropheEssSuffixWithSlash;
      } else {
        chosenStroke =
          unspacedCapitalisationOutline +
          "/" +
          lowercasedStroke +
          bestApostropheEssSuffixWithSlash;
      }
    }
  }

  if (wordOrPhrase.includes(",")) {
    // , xxx, => {,}xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(/, (.+),/, "{,}$1{,}");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) {
        chosenStroke = getRankedOutlineFromLookupEntry(
          lookupEntry,
          modifiedWordOrPhrase,
          affixList
        );
      }
    }

    // xxx, => xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(",", "{,}");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) {
        chosenStroke = getRankedOutlineFromLookupEntry(
          lookupEntry,
          modifiedWordOrPhrase,
          affixList
        );
      }
    }
  }

  // xxx => {^}xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {^}xxx
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase;
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => xxx {-|}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + " {-|}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => xxx{-|}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + "{-|}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {^xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {^xxx}
  // e.g. ' => {^'}
  if (!chosenStroke && precedingChar.length > 0 && precedingChar !== " ") {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // 'xxx => {~|'^}xxx
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.replace(/^'(.+)$/, "{~|'^}$1");
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {^~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {^~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  // xxx => {xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) {
      chosenStroke = getRankedOutlineFromLookupEntry(
        lookupEntry,
        modifiedWordOrPhrase,
        affixList
      );
    }
  }

  const suppressSpaceStrokeWithSlash = "/" + suppressSpaceOutline;

  // Orthography rule
  if (!chosenStroke) {
    // bingeing <- binge -> /TK-LS/-G
    if (wordOrPhrase.endsWith("eing")) {
      const ingSuffixEntry = suffixes.find(
        (suffixEntry) => suffixEntry[1] === "ing"
      );
      const ingSuffixOutlineWithSlash = ingSuffixEntry
        ? ingSuffixEntry[0]
        : "/xxx";
      let modifiedWordOrPhrase = wordOrPhrase.replace(/ing$/, "");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) {
        chosenStroke =
          getRankedOutlineFromLookupEntry(
            lookupEntry,
            modifiedWordOrPhrase,
            affixList
          ) +
          suppressSpaceStrokeWithSlash +
          ingSuffixOutlineWithSlash;
      }
    }
  }

  // Prefixes and Suffixes
  // NOTE: this function handles phrases where the entire non-affix part of the string is an exact
  // entry in the global lookup dictionary. If the case doesn't match or there are other
  // modifications or splits to try, it will be handled by recursiveBuildStrokeHint instead.
  if (!chosenStroke && !!wordOrPhrase.match(/[-0-9A-Za-z]$/)) {
    // rexxx => RE/xxx
    // anti-xxx => A*EUPBT/xxx
    let prefixTranslation = "";
    let i = 0;
    while (i < prefixesLength && !chosenStroke) {
      if (wordOrPhrase.startsWith(prefixes[i][1])) {
        prefixTranslation = prefixes[i][1];
        let regex = new RegExp("^" + escapeRegExp(prefixTranslation) + "");
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, "");
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        let hardCodedFixForQuestionMark = !(
          wordOrPhrase.replace(regex, "") === "?"
        );
        if (lookupEntry && hardCodedFixForQuestionMark) {
          chosenStroke =
            prefixes[i][0] +
            getRankedOutlineFromLookupEntry(
              lookupEntry,
              modifiedWordOrPhrase,
              affixList
            );
        }
      }
      i++;
    }

    // xxxing => xxx/-G
    // binging <- bing -> /-G
    let suffixTranslation = "";
    let j = 0;
    while (j < suffixesLength && !chosenStroke) {
      if (wordOrPhrase.endsWith(suffixes[j][1])) {
        suffixTranslation = suffixes[j][1];
        let regex = new RegExp("" + escapeRegExp(suffixTranslation) + "$");
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, "");
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        if (lookupEntry) {
          chosenStroke =
            getRankedOutlineFromLookupEntry(
              lookupEntry,
              modifiedWordOrPhrase,
              affixList
            ) + suffixes[j][0];
        }
      }
      j++;
    }
  }

  // Orthography rule
  // Comes after direct suffix matching to avoid breaking "toed"
  if (!chosenStroke) {
    // impersonateed <- impersonate + ed -> /-D
    if (wordOrPhrase.endsWith("ed")) {
      const edSuffixEntry = suffixes.find(
        (suffixEntry) => suffixEntry[1] === "ed"
      );
      const edSuffixOutlineWithSlash = edSuffixEntry
        ? edSuffixEntry[0]
        : "/xxx";
      let modifiedWordOrPhrase = wordOrPhrase.replace(/d$/, "");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) {
        chosenStroke =
          getRankedOutlineFromLookupEntry(
            lookupEntry,
            modifiedWordOrPhrase,
            affixList
          ) + edSuffixOutlineWithSlash;
      }
    }
  }

  // FIXME: this contains a bug:
  // // Complex orthography rules
  // if (!chosenStroke) {
  //   // xxxings => xxx/-G/-S
  //   let suffixesTranslation = '';
  //   for (let j = 0; j < suffixesLength && !chosenStroke; j++) {
  //     for (let k = 0; k < suffixesLength && !chosenStroke; k++) {
  //       if (wordOrPhrase.endsWith(suffixes[j][1] + suffixes[k][1])) {
  //         suffixesTranslation = suffixes[j][1] + suffixes[k][1];
  //         let regex = new RegExp('' + escapeRegExp(suffixesTranslation) + '$');
  //         let modifiedWordOrPhrase = wordOrPhrase.replace(regex, '');
  //         let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
  //         if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase, affixList) + suffixes[j][0] + suffixes[k][0]; }
  //       }
  //     }
  //   }
  // }

  // Simple orthography rules
  if (!chosenStroke) {
    // seething <- seethe -> /-G
    const ingRegex = new RegExp(".+[bcdfghjklmnpqrstuvwxz]ing$");
    if (ingRegex.test(wordOrPhrase)) {
      const ingSuffixEntry = suffixes.find(
        (suffixEntry) => suffixEntry[1] === "ing"
      );
      const ingSuffixOutlineWithSlash = ingSuffixEntry
        ? ingSuffixEntry[0]
        : "/xxx";
      let modifiedWordOrPhrase = wordOrPhrase.replace(/ing$/, "e");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) {
        chosenStroke =
          getRankedOutlineFromLookupEntry(
            lookupEntry,
            modifiedWordOrPhrase,
            affixList
          ) + ingSuffixOutlineWithSlash;
      }
    }
  }

  // TODO: add better test coverage before uncommenting this
  // // Complex orthography rules
  // if (!chosenStroke) {
  //   // lodgings <- lodge -> /-G/-S
  //   let suffixTranslation = '';
  //   for (let i = 0; i < suffixesLength && !chosenStroke; i++) {
  //     suffixTranslation = suffixes[i][1];
  //     const ingAndSuffixRegex = new RegExp(`.+[bcdfghjklmnpqrstuvwxz]ing${escapeRegExp(suffixTranslation)}$`);
  //     if (ingAndSuffixRegex.test(wordOrPhrase)) {
  //       const ingSuffixEntry = suffixes.find(suffixEntry => suffixEntry[1] === "ing");
  //       const ingSuffixOutlineWithSlash = ingSuffixEntry ? ingSuffixEntry[0] : '/xxx';
  //       const otherSuffixOutlineWithSlash = suffixes[i][0];
  //       const regex = new RegExp(`ing${escapeRegExp(suffixTranslation)}$`);
  //       let modifiedWordOrPhrase = wordOrPhrase.replace(regex, "e");
  //       let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
  //       if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase, affixList) + ingSuffixOutlineWithSlash + otherSuffixOutlineWithSlash; }
  //     }
  //   }
  // }

  if (!chosenStroke) {
    chosenStroke = "xxx";
  }

  strokeLookupAttempts = strokeLookupAttempts + 1;

  return [chosenStroke, strokeLookupAttempts];
};

export default chooseOutlineForPhrase;
