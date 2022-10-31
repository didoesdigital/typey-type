import findSingleLetterWordOutline from "./findSingleLetterWordOutline";
import findFingerspellingOutline from "./findFingerspellingOutline";
import fingerspelledCharacters from "../../constant/fingerspelledCharacters";
import singleLetterWords from "../../constant/singleLetterWords";
import getRankedOutlineFromLookupEntry from "./getRankedOutlineFromLookupEntry";
import { AffixList } from "../affixList";
import { escapeRegExp } from "../utils";
import type { LookupDictWithNamespacedDicts } from "../../types";

type ChooseOutlineForPhraseResult = [string, number];

const chooseOutlineForPhrase = (
  wordOrPhrase: string,
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  chosenStroke: string | undefined,
  strokeLookupAttempts: number,
  precedingChar: string,
  affixList = AffixList.getSharedInstance()
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

  let capitalisationOutline = "KPA";
  let capitalisationTranslation = "{ }{-|}";
  let capitalisationEntry = globalLookupDictionary.get(
    capitalisationTranslation
  );
  if (capitalisationEntry) {
    capitalisationOutline = getRankedOutlineFromLookupEntry(
      capitalisationEntry,
      capitalisationTranslation,
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

  // elsewhere, there is a relevant "FIXME: this is a brute force…"
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
  let strokeForOneCharacterWordPart = fingerspelledCharacters[wordOrPhrase];
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
      chosenStroke = capitalisationOutline + "/" + lowercasedStroke;
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

  // ' => {^'}
  if (!chosenStroke) {
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

  // Orthography rules
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

  if (!chosenStroke) {
    // rexxx => RE/xxx
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
