import { AffixList } from './affixList';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const FINGERSPELLED_LETTERS = {
  "a": "A*",
  "b": "PW*",
  "c": "KR*",
  "d": "TK*",
  "e": "*E",
  "f": "TP*",
  "g": "TKPW*",
  "h": "H*",
  "i": "*EU",
  "j": "SKWR*",
  "k": "K*",
  "l": "HR*",
  "m": "PH*",
  "n": "TPH*",
  "o": "O*",
  "p": "P*",
  "q": "KW*",
  "r": "R*",
  "s": "S*",
  "t": "T*",
  "u": "*U",
  "v": "SR*",
  "w": "W*",
  "x": "KP*",
  "y": "KWR*",
  "z": "STKPW*",
  "A": "A*P",
  "B": "PW*P",
  "C": "KR*P",
  "D": "TK*P",
  "E": "*EP",
  "F": "TP*P",
  "G": "TKPW*P",
  "H": "H*P",
  "I": "*EUP",
  "J": "SKWR*P",
  "K": "K*P",
  "L": "HR*P",
  "M": "PH*P",
  "N": "TPH*P",
  "O": "O*P",
  "P": "P*P",
  "Q": "KW*P",
  "R": "R*P",
  "S": "S*P",
  "T": "T*P",
  "U": "*UP",
  "V": "SR*P",
  "W": "W*P",
  "X": "KP*P",
  "Y": "KWR*P",
  "Z": "STKPW*P",
  "@": "SKWRAT",
  "(": "PREPB",
  ")": "PR*EPB",
  "“": "KW-GS/KW-GS",
  "”": "KR-GS/KR-GS",
  ",": "KW-BG",
  "?": "H-F",
  "!": "SKHRAPL",
  "–": "EPB/TKA*RB",
  "—": "EPL/TKA*RB",
  "`": "KH-FG",
  "^": "KR-RT",
  "~": "T*LD",
  "<": "PWRABG",
  ">": "PWRA*BG",
  "=": "KW-L",
  "|": "PAO*EUP",
  "_": "RUPBD",
  "-": "H-PB",
  ":": "KHR-PB",
  ";": "SKHR-PB",
  "/": "OEU",
  ".": "P-P",
  "]": "PWR*BGT",
  "[": "PWR-BGT",
  "{": "TPR-BGT",
  "}": "TPR*BGT",
  "$": "TK-PL",
  "*": "STA*R",
  "&": "SKP*",
  "#": "HAERB",
  "%": "P*ERS",
  "+": "PHR*US",
  "\\": "SPWHRAERB",
  "\"": "KR-GS",
  // "\"": "KWR-GS",
  // "{^\"}": "KR-GS",
  // "{\"^}": "KW-GS",
  // "{^~|\"}": "KR-GS",
  // "{~|\"^}": "KW-GS",
  " ": "S-P",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "0": "0",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9"
}
// TODO: don't hardcode this
// Maybe show numbers as letters?
  // "1": "#S",
  // "2": "#T-",
  // "3": "#P-",
  // "4": "#H",
  // "5": "#A",
  // "0": "#O",
  // "6": "#F",
  // "7": "#-P",
  // "8": "#L",
  // "9": "#-T"

const SINGLE_LETTER_WORDS = {
  "a": "AEU",
  "A": "KPA/AEU",
  "I": "EU",
  "X": "10R",
  "V": "5R"
}

const punctuationSplittingRegex = /([!"“”#$%&'‘’()*,.:;<=>?@[\\\]^`{|}~—–-])/; // includes en and em dashes, curly quotes
// const punctuationSplittingWholeMatchRegex = /^[!"“”#$%&'‘’()*,./:;<=>?@[\\\]^`{|}~—–-]?$/; // includes en and em dashes, curly quotes
const strokeLookupAttemptsLimit = 12;

function getRankedOutlineFromLookupEntry(lookupEntry, translation) {
  rankOutlines(lookupEntry, translation, AffixList.getSharedInstance());
  return lookupEntry[0][0];
}

function chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar) {
  let suffixes = AffixList.getSharedInstance().suffixes;
  let suffixesLength = suffixes.length;
  let prefixes = AffixList.getSharedInstance().prefixes;
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
    chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, wordOrPhrase);
  }
  else { chosenStroke = undefined; }

  // elsewhere, there is a relevant "FIXME: this is a brute force…"
  let strokeForOneCharacterWord = SINGLE_LETTER_WORDS[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWord) {
    return [strokeForOneCharacterWord, strokeLookupAttempts + 1];
  }

  let strokeForOneCharacterWordPart = FINGERSPELLED_LETTERS[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWordPart) {
    if (precedingChar === ' ' && wordOrPhrase === '"') {
      strokeForOneCharacterWordPart = 'KW-GS';
    }
    return [strokeForOneCharacterWordPart, strokeLookupAttempts + 1];
  }

  // FIRST => first
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // TUESDAY => Tuesday
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let uppercasedStroke = lookupEntry;

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // tom => Tom
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.replace(/(^|\s)\S/g, l => l.toUpperCase());
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let capitalisedStroke = lookupEntry;

    if (capitalisedStroke) {
      chosenStroke = 'HRO*ER/' + capitalisedStroke;
    }
  }

  // Heather => heather
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.toLowerCase();
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { lookupEntry = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    let lowercasedStroke = lookupEntry;

    if (lowercasedStroke) {
      chosenStroke = 'KPA/' + lowercasedStroke;
    }
  }

  if (wordOrPhrase.includes(",")) {
    // , xxx, => {,}xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(/, (.+),/, "{,}$1{,}");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    }

    // xxx, => xxx{,}
    if (!chosenStroke) {
      let modifiedWordOrPhrase = wordOrPhrase.replace(',', '{,}');
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
    }
  }

  // xxx => {^}xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^}xxx
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^}" + wordOrPhrase;
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => xxx{^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + "{^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => xxx {-|}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + " {-|}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => xxx{-|}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase + "{-|}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // ' => {^'}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // 'xxx => {~|'^}xxx
  if (!chosenStroke) {
    let modifiedWordOrPhrase = wordOrPhrase.replace(/^'(.+)$/,"{~|'^}$1");
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {^~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{^~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {~|xxx^}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "^}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {~|xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{~|" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }

  // xxx => {xxx}
  if (!chosenStroke) {
    let modifiedWordOrPhrase = "{" + wordOrPhrase + "}";
    let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
    if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
  }


  const suppressSpaceStrokeWithSlash = "/TK-LS";

  // Orthography rules
  if (!chosenStroke) {
    // bingeing <- binge -> /TK-LS/-G
    if (wordOrPhrase.endsWith("eing")) {
      const ingSuffixEntry = suffixes.find(suffixEntry => suffixEntry[1] === "ing");
      const ingSuffixOutlineWithSlash = ingSuffixEntry ? ingSuffixEntry[0] : '/xxx';
      let modifiedWordOrPhrase = wordOrPhrase.replace(/ing$/, "");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + suppressSpaceStrokeWithSlash + ingSuffixOutlineWithSlash; }
    }
  }

  if (!chosenStroke) {
    // rexxx => RE/xxx
    let prefixTranslation = '';
    let i = 0;
    while (i < prefixesLength && !chosenStroke) {
      if (wordOrPhrase.startsWith(prefixes[i][1])) {
        prefixTranslation = prefixes[i][1];
        let regex = new RegExp('^' + escapeRegExp(prefixTranslation) + '');
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, '');
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        let hardCodedFixForQuestionMark = !(wordOrPhrase.replace(regex, '') === "?");
        if (lookupEntry && hardCodedFixForQuestionMark) { chosenStroke = prefixes[i][0] + getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase); }
      }
      i++;
    }

    // xxxing => xxx/-G
    // binging <- bing -> /-G
    let suffixTranslation = '';
    let j = 0;
    while (j < suffixesLength && !chosenStroke) {
      if (wordOrPhrase.endsWith(suffixes[j][1])) {
        suffixTranslation = suffixes[j][1];
        let regex = new RegExp('' + escapeRegExp(suffixTranslation) + '$');
        let modifiedWordOrPhrase = wordOrPhrase.replace(regex, '');
        let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
        if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + suffixes[j][0]; }
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
  //         if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + suffixes[j][0] + suffixes[k][0]; }
  //       }
  //     }
  //   }
  // }

  // Simple orthography rules
  if (!chosenStroke) {
    // seething <- seethe -> /-G
    const ingRegex = new RegExp(".+[bcdfghjklmnpqrstuvwxz]ing$");
    if (ingRegex.test(wordOrPhrase)) {
      const ingSuffixEntry = suffixes.find(suffixEntry => suffixEntry[1] === "ing");
      const ingSuffixOutlineWithSlash = ingSuffixEntry ? ingSuffixEntry[0] : '/xxx';
      let modifiedWordOrPhrase = wordOrPhrase.replace(/ing$/, "e");
      let lookupEntry = globalLookupDictionary.get(modifiedWordOrPhrase);
      if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + ingSuffixOutlineWithSlash; }
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
  //       if (lookupEntry) { chosenStroke = getRankedOutlineFromLookupEntry(lookupEntry, modifiedWordOrPhrase) + ingSuffixOutlineWithSlash + otherSuffixOutlineWithSlash; }
  //     }
  //   }
  // }

  if (!chosenStroke) {
    chosenStroke = "xxx";
  }

  strokeLookupAttempts = strokeLookupAttempts + 1;

  return [chosenStroke, strokeLookupAttempts];
}

function tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts, affixes) {
  let compoundWordFirstWord = compoundWordParts[0];
  let compoundWordSecondWord = compoundWordParts[1];
  let prefixes = affixes.prefixes;

  const matchingPrefixWithHyphenEntry = prefixes.find(prefixEntry => prefixEntry[1] === compoundWordFirstWord + "-");
  if (matchingPrefixWithHyphenEntry) {
    stroke = matchingPrefixWithHyphenEntry[0]; // self-
    strokes = strokes === "" ? stroke : strokes + " " + stroke;
    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordSecondWord, globalLookupDictionary, stroke, strokeLookupAttempts);
    if (stroke && stroke.length > 0 && stroke !== "xxx") {
      strokes = strokes + stroke;
      stroke = "xxx";
    }
    else if (stroke === "xxx") {
      stroke = createFingerspellingStroke(compoundWordSecondWord);
      strokes = strokes + stroke;
      stroke = "xxx";
    }
  }
  else {
    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordFirstWord, globalLookupDictionary, stroke, strokeLookupAttempts); // "store" => ["STOR", 3]

    if (stroke && stroke.length > 0 && stroke !== "xxx") {
      strokes = strokes === "" ? stroke + " H-PB" : strokes + " " + stroke + " H-PB";
      [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(compoundWordSecondWord, globalLookupDictionary, stroke, strokeLookupAttempts); // "room"

      if (stroke && stroke.length > 0) {
        strokes = strokes + " " + stroke;
        stroke = "xxx";
      }
    }
    else if (stroke === "xxx") {
      stroke = createFingerspellingStroke(compoundWordFirstWord);
      strokes = strokes === "" ? stroke + " H-PB" : strokes + " " + stroke + " H-PB";
      stroke = createFingerspellingStroke(compoundWordSecondWord);
      strokes = strokes + " " + stroke;
      stroke = "xxx";
    }
  }

  return [strokes, stroke, strokeLookupAttempts];
}

function createFingerspellingStroke(inputText) {
  return [...inputText].map(char => {
    let fingerspelledStroke = '';
    fingerspelledStroke = FINGERSPELLED_LETTERS[char];
    if (!fingerspelledStroke) {
      fingerspelledStroke = "xxx";
    }
    return fingerspelledStroke;
  }).join('/');
}

function createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary) {
  let stroke = "";
  let strokes = "";
  let strokeLookupAttempts = 0;
  let precedingChar = '';
  let overLimit = false;
  [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordOrPhraseMaterial, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar); // given "off went the man!" return "xxx"

  if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
    return strokes = stroke;
  }

  let listOfWords = wordOrPhraseMaterial.split(" ").filter(nonEmptyItem => nonEmptyItem);
  let listOfWordsLength = listOfWords.length;

  // Arbitrary limit to prevent making Typey Type slow from excess look ups
  if (listOfWordsLength > strokeLookupAttemptsLimit) {
    listOfWords.length = strokeLookupAttemptsLimit;
    listOfWordsLength = strokeLookupAttemptsLimit;
    overLimit = true;
  }

  for (let i = 0; i < listOfWordsLength; i++) {
    let wordToLookUp = listOfWords[i];
    // 1. Try exact match
    precedingChar = i === 0 ? '' : ' ';

    [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(wordToLookUp, globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);

    if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
      strokes = strokes === "" ? stroke : strokes + " " + stroke;
      stroke = "xxx";
    }
    // 2. Try punctuation matching
    else {
      let compoundWordParts = wordToLookUp.split("-");
      if (wordToLookUp.match(punctuationSplittingRegex) !== null) { // "man!"
        // 2.1 compound words
        // if there is exactly 1 hyphen in the middle of a word, it's probably a compound word e.g. "store-room"
        if (compoundWordParts && compoundWordParts.length === 2 && compoundWordParts[0] !== "" && compoundWordParts[1] !== "") {
          [strokes, stroke, strokeLookupAttempts] = tryMatchingCompoundWords(compoundWordParts, globalLookupDictionary, strokes, stroke, strokeLookupAttempts, AffixList.getSharedInstance()); // "store-room"
          stroke = "xxx";
        }
        // 2.2 any punctuation, noting preceding char
        else {
          let listOfPunctuationSeparatedWords = wordToLookUp.split(punctuationSplittingRegex).filter(nonEmptyItem => nonEmptyItem);
          let len = listOfPunctuationSeparatedWords.length;

          // Arbitrary limit to prevent making Typey Type slow from excess look ups
          if (len > strokeLookupAttemptsLimit) {
            listOfPunctuationSeparatedWords.length = strokeLookupAttemptsLimit;
            len = strokeLookupAttemptsLimit;
          }

          for (let j = 0; j < len; j++) {

            // If it's the first char of a word and it's punctuation, pretend the preceding character was a space so that we recommend the right opening or closing punctuation
            if (j === 0) { precedingChar = ' '; } else { precedingChar = ''; }

            [stroke, strokeLookupAttempts] = chooseOutlineForPhrase(listOfPunctuationSeparatedWords[j], globalLookupDictionary, stroke, strokeLookupAttempts, precedingChar);
            if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
              stroke = "xxx";
            }
            else {
              // 2.3 resort to fingerspelling
              stroke = createFingerspellingStroke(listOfPunctuationSeparatedWords[j]);
              strokes = strokes === "" ? stroke : strokes + " " + stroke;
            }
          }
        }
      }
      // 3. Resort to fingerspelling
      else {
        stroke = createFingerspellingStroke(wordToLookUp);
        strokes = strokes === "" ? stroke : strokes + " " + stroke;
      }
    }
  }
  precedingChar = '';

  // FIXME: this is a brute force approach that will have unintended consequences and fail to catch scenarios it should e.g. if you use personal dictionaries without H-F this will be confusing
  if (strokes.startsWith("KR-GS KPA/")) {
    strokes = strokes.replace("KR-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.startsWith("KW-GS KPA/")) {
    strokes = strokes.replace("KW-GS KPA/", "KW-GS KPA*/");
  }
  if (strokes.endsWith("KWEZ")) {
    strokes = strokes.replace("KWEZ", "H-F");
  }
  if (strokes.includes(" PR-D")) {
    strokes = strokes.replace(" PR-D", " TP-PL");
  }
  if (strokes.endsWith(" P-P")) {
    strokes = strokes.replace(" P-P", " TP-PL");
  }

  if (overLimit) { strokes = strokes + " xxx"; }

  return strokes;
}

function generateListOfWordsAndStrokes(wordList, globalLookupDictionary) {
  // wordList = [ 'bed,', 'man!', "'sinatra'", 'and again', 'media query', 'push origin master', 'diff --cached', 'diff -- cached' ]
  let sourceAndPresentedMaterial = [];

  for (let i = 0; i < wordList.length; i++) {
    // if (wordOrPhraseMaterial === "and! and") { debugger; }
    let wordOrPhraseMaterial = wordList[i];

    let strokes = createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary);

    sourceAndPresentedMaterial.push({phrase: wordOrPhraseMaterial, stroke: strokes});
  }

  return sourceAndPresentedMaterial;
}

function chooseTEndingOverDEnding(outlineALastLetter, outlineBLastLetter, translation) {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  }
  else if (outlineALastLetter === "D" && translation[translation.length - 1] === "d") {
    return -1;
  }
  else if (outlineALastLetter === "D" && translation[translation.length - 1] !== "d") {
    return 1;
  }
  else if (outlineALastLetter === "T" && translation[translation.length - 1] === "d") {
    return 1;
  }
  else if (outlineALastLetter === "T" && translation[translation.length - 1] !== "d") {
    return -1;
  }
  else {
    return 0;
  }
}

function chooseSEndingOverZEnding(outlineALastLetter, outlineBLastLetter) {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  }
  else if (outlineALastLetter === "Z") {
    return 1;
  }
  else if (outlineALastLetter === "S") {
    return -1;
  }
  else {
    return 0;
  }
}

function penaliseStars(outline, translation) {
  let penaltyForStars = 0;
  let numberOfStars = outline.match(/\*/g);

  if (numberOfStars !== null) { penaltyForStars += numberOfStars.length; }

  return penaltyForStars;
}

function penaliseSlashes(outline, translation) {
  let penaltyForSlashes = 0;
  let numberOfSlashes = outline.match(/\//g);

  if (numberOfSlashes !== null) { penaltyForSlashes += numberOfSlashes.length * 2; }

  return penaltyForSlashes;
}

function hasPrefix (outline, translation, prefixes) {
  return prefixes.some(([prefixOutline, prefixTranslation]) => outline.startsWith(prefixOutline) && translation.startsWith(prefixTranslation));
}

function hasSuffix (outline, translation, suffixes) {
  return suffixes.some(([suffixOutline, suffixTranslation]) => outline.startsWith(suffixOutline) && translation.startsWith(suffixTranslation));
}

function penaliseSlashesWithoutPrefixesOrSuffixes(outline, translation, affixes) {
  let suffixes = affixes.suffixes;
  let prefixes = affixes.prefixes;
  let penaltyForSlashesWithoutPrefixesOrSuffixes = 0;
  let numberOfSlashes = outline.match(/\//g);

  if (numberOfSlashes !== null) {
    if (hasPrefix(outline, translation, prefixes)) {
      return 0;
    }
    else if (hasSuffix(outline, translation, suffixes)) {
      return 0;
    }
    else {
      penaltyForSlashesWithoutPrefixesOrSuffixes = 2;
    }
  }

  return penaltyForSlashesWithoutPrefixesOrSuffixes;
}

function rankOutlines(arrayOfStrokesAndTheirSourceDictNames, translation, affixes = {suffixes: [], prefixes: []}) {
  arrayOfStrokesAndTheirSourceDictNames.sort((a, b) => {
    // Note: If compareFunction(a, b) returns less than 0, leave a and b unchanged.
    if (a[1] === "top-10000-project-gutenberg-words.json") { return -1; }

    // Note: If compareFunction(a, b) returns greater than 0, sort b before a.
    if (b[1] === "top-10000-project-gutenberg-words.json") { return 1; }

    let outlineA = a[0];
    let outlineB = b[0];
    let outlineALengthWithAllPenalties = outlineA.length;
    let outlineBLengthWithAllPenalties = outlineB.length;

    outlineALengthWithAllPenalties += penaliseStars(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseStars(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashes(outlineA, translation);
    outlineBLengthWithAllPenalties += penaliseSlashes(outlineB, translation);

    outlineALengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(outlineA, translation, affixes);
    outlineBLengthWithAllPenalties += penaliseSlashesWithoutPrefixesOrSuffixes(outlineB, translation, affixes);

    if (outlineALengthWithAllPenalties === outlineBLengthWithAllPenalties) {
      let outlineALastLetter = outlineA[outlineA.length - 1];
      let outlineBLastLetter = outlineB[outlineB.length - 1];

      if ("SZ".indexOf(outlineALastLetter) !== -1 && "SZ".indexOf(outlineBLastLetter) !== -1)
      {
        return chooseSEndingOverZEnding(outlineALastLetter, outlineBLastLetter);
      }

      if ("TD".indexOf(outlineALastLetter) !== -1 && "TD".indexOf(outlineBLastLetter) !== -1)
      {
        return chooseTEndingOverDEnding(outlineALastLetter, outlineBLastLetter, translation);
      }
    }

    return outlineALengthWithAllPenalties - outlineBLengthWithAllPenalties;
  });
  return arrayOfStrokesAndTheirSourceDictNames;
}

function rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary) {
  // This code causes the browser to hang
  // for (let [translation, outlinesAndSourceDicts] of combinedLookupDictionary) {
  //   let rankedOutlinesAndSourceDicts = rankOutlines(outlinesAndSourceDicts, translation);
  //   combinedLookupDictionary.set(translation, rankedOutlinesAndSourceDicts);
  // }
  return combinedLookupDictionary;
}

function addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, outlinesWeHaveSeen) {
  let misstrokesMap = new Map(Object.entries(misstrokes));

  for (let [outline, translation] of Object.entries(dictContent)) {
    let seen = outlinesWeHaveSeen.has(outline);
    if (!seen) {
      let misstroke = misstrokesMap.get(outline);
      if (!misstroke || (misstroke !== translation)) {
        // current = [[PWAZ: dict.json], [PWA*Z: typey.json]];
        let current = combinedLookupDictionary.get(translation);
        if (current) {
          current.push([outline, dictName]);
          combinedLookupDictionary.set(translation, current);
        }
        else {
          combinedLookupDictionary.set(translation, [[outline, dictName]]);
        }
        outlinesWeHaveSeen.add(outline);
      }
    }
  }
  return [combinedLookupDictionary, outlinesWeHaveSeen];
}

function combineValidDictionaries(personalDictionariesNamesAndContents, typeyDictAndMisstrokes, ploverDict = null) {
  let combinedLookupDictionary = new Map();
  let numberOfPersonalDictionaries = personalDictionariesNamesAndContents.length;
  let outlinesWeHaveSeen = new Set();
  let [dictTypeyType, misstrokes] = typeyDictAndMisstrokes;
  // eslint-disable-next-line
  let _;

  // 1. Add Typey Type entries
  [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(dictTypeyType, combinedLookupDictionary, "typey-type.json", {}, new Set());

  // 2. Add personal dictionaries entries
  for (let i = 0; i < numberOfPersonalDictionaries; i++) {
    let dictName = personalDictionariesNamesAndContents[i][0];
    let dictContent = personalDictionariesNamesAndContents[i][1];
    [combinedLookupDictionary, outlinesWeHaveSeen] = addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes, outlinesWeHaveSeen);
  }

  // 3. Add Plover dictionary entries
  if (!!ploverDict) {
    [combinedLookupDictionary, _] = addOutlinesToWordsInCombinedDict(ploverDict, combinedLookupDictionary,  "plover-main-3-jun-2018.json", misstrokes, new Set());
  }

  outlinesWeHaveSeen = new Set();

  return combinedLookupDictionary;
}

function createAGlobalLookupDictionary(personalDictionariesNamesAndContents, typeyDictAndMisstrokes, ploverDict = null) {
  // TODO: one day, this could be the place we check for whether Typey Type dictionaries or the Plover dictionary are enabled and if so combineValidDictionaries with them and add to 'configuration'

  let combinedLookupDictionary = combineValidDictionaries(personalDictionariesNamesAndContents, typeyDictAndMisstrokes, ploverDict);
  // let sortedAndCombinedLookupDictionary = rankAllOutlinesInCombinedLookupDictionary(combinedLookupDictionary); // has a bug; instead of sorted entire dict, we sort per entry used within chooseOutlineForPhrase function
  let sortedAndCombinedLookupDictionary = combinedLookupDictionary;
  let configuration = ['typey-type.json', ...personalDictionariesNamesAndContents.map(d => d[0])];
  if (!!ploverDict) { configuration.push('plover-main-3-jun-2018.json'); }
  sortedAndCombinedLookupDictionary['configuration'] = configuration;

  return sortedAndCombinedLookupDictionary;
}

function getListOfValidDictionariesAddedAndInConfig(dictNamesFromAddedConfig, namesOfValidAddedDictionaries) {
  let listOfValidDictionariesAddedAndInConfig = [];
  const numberOfDictionariesInAddedConfig = dictNamesFromAddedConfig.length;

  for (let i = 0; i < numberOfDictionariesInAddedConfig; i++) {
    if (namesOfValidAddedDictionaries.indexOf(dictNamesFromAddedConfig[i]) > -1) {
      listOfValidDictionariesAddedAndInConfig.push(dictNamesFromAddedConfig[i]);
    }
  }

  return listOfValidDictionariesAddedAndInConfig;
}

export {
  addOutlinesToWordsInCombinedDict,
  chooseOutlineForPhrase,
  combineValidDictionaries,
  createStrokeHintForPhrase,
  createAGlobalLookupDictionary,
  generateListOfWordsAndStrokes,
  getListOfValidDictionariesAddedAndInConfig,
  rankAllOutlinesInCombinedLookupDictionary,
  rankOutlines
};
