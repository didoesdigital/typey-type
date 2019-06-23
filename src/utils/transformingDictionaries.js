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
  "\"": "KWR-GS",
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

const punctuationSplittingRegex = /[!"“”#$%&'‘’()*,.:;<=>?@[\\\]^`{|}~—–-]/; // includes en and em dashes, curly quotes
const punctuationSplittingWholeMatchRegex = /^[!"“”#$%&'‘’()*,./:;<=>?@[\\\]^`{|}~—–-]?$/; // includes en and em dashes, curly quotes
const strokeLookupAttemptsLimit = 12;

function chooseStrokesForPhrase (wordOrPhrase, sourceWordsAndStrokes, chosenStroke, strokeLookupAttempts) {
  chosenStroke = sourceWordsAndStrokes[wordOrPhrase];

  let strokeForOneCharacterWord = FINGERSPELLED_LETTERS[wordOrPhrase];
  if (wordOrPhrase.length === 1 && strokeForOneCharacterWord) {
    return [strokeForOneCharacterWord, strokeLookupAttempts];
  }

  // FIRST => first
  if (!chosenStroke) {
    let uppercasedStroke = sourceWordsAndStrokes[wordOrPhrase.toLowerCase()];

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // TUESDAY => Tuesday
  if (!chosenStroke) {
    let uppercasedStroke = sourceWordsAndStrokes[wordOrPhrase.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())];

    if (wordOrPhrase.toUpperCase() === wordOrPhrase && uppercasedStroke) {
      chosenStroke = '*URP/' + uppercasedStroke;
    }
  }

  // tom => Tom
  if (!chosenStroke) {
    let capitalisedStroke = sourceWordsAndStrokes[wordOrPhrase.replace(/(^|\s)\S/g, l => l.toUpperCase())];

    if (capitalisedStroke) {
      chosenStroke = 'HRO*ER/' + capitalisedStroke;
    }
  }

  // Heather => heather
  if (!chosenStroke) {
    let lowercaseStroke = sourceWordsAndStrokes[wordOrPhrase.toLowerCase()];
    if (lowercaseStroke) {
      chosenStroke = 'KPA/' + lowercaseStroke;
    }
  }

  if (!chosenStroke) {
    chosenStroke = "xxx";
  }

  strokeLookupAttempts = strokeLookupAttempts + 1;

  return [chosenStroke, strokeLookupAttempts];
}

function generateDictionaryEntries(wordList, sourceWordsAndStrokes = {"the": "-T"}) {
  let sourceAndPresentedMaterial = [];
  // wordList = [ 'bed,', 'man!', "'sinatra'", 'and again', 'media query', 'push origin master', 'diff --cached', 'diff -- cached' ]
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

  for (let i = 0; i < wordList.length; i++) {
    let wordOrPhraseMaterial = wordList[i];
    let remainingWordOrPhrase = wordList[i];
    let strokes = "";
    let stroke = "";
    let strokeLookupAttempts = 0;
    // if (wordOrPhraseMaterial === "and! and") { debugger; }
    // if (remainingWordOrPhrase === "and! and") { debugger; }

    function tryMatchingWordsWithPunctuation(remainingWordOrPhrase, sourceWordsAndStrokes, strokes, stroke, strokeLookupAttempts) {
      // let [newremainingWordOrPhrase, newstrokes, newstroke] = [remainingWordOrPhrase, strokes, stroke];
        if (remainingWordOrPhrase.match(punctuationSplittingWholeMatchRegex)) { // exactly matches punctuation e.g. "!", "?", "'"
          [stroke, strokeLookupAttempts] = chooseStrokesForPhrase(remainingWordOrPhrase, sourceWordsAndStrokes, stroke, strokeLookupAttempts);
          strokes = strokes === "" ? stroke : strokes + " " + stroke;
          stroke = "xxx";

          remainingWordOrPhrase = ''; // prevents infinite loop
        }
        else {
          let matchingPunctuation = remainingWordOrPhrase.match(punctuationSplittingRegex)[0].charAt(0); // given "man?" => ["?", index: 3, input: "man?", groups: undefined] => "?" => "?"
          let index = remainingWordOrPhrase.indexOf(matchingPunctuation);
          let firstWord = '';

          if (index === 0) { // starts with ! e.g. !foo
            firstWord = remainingWordOrPhrase.slice(0, 1); // "!"
            remainingWordOrPhrase = remainingWordOrPhrase.slice(index + 1, remainingWordOrPhrase.length); // "foo"
          }
          else { // contains ! e.g. foo!
            firstWord = remainingWordOrPhrase.slice(0, index); // "foo"
            remainingWordOrPhrase = remainingWordOrPhrase.slice(index, remainingWordOrPhrase.length); // "!"
          }

          [stroke, strokeLookupAttempts] = chooseStrokesForPhrase(firstWord, sourceWordsAndStrokes, stroke, strokeLookupAttempts); // stroke = chooseStrokesForPhrase("man", sourceWordsAndStrokes, "", 0)

          strokes = strokes === "" ? stroke : strokes + " " + stroke;
          stroke = "xxx";
        }

      if (strokeLookupAttempts > strokeLookupAttemptsLimit) { return ['', strokes, stroke]; }

      return [remainingWordOrPhrase, strokes, stroke, strokeLookupAttempts];
    }

    [stroke, strokeLookupAttempts] = chooseStrokesForPhrase(wordOrPhraseMaterial, sourceWordsAndStrokes, stroke, strokeLookupAttempts); // given "off went the man!" return "xxx"

    // First check for exact matching stroke:
    if (stroke && stroke.length > 0 && !stroke === "xxx") {
      strokes = stroke;
    }

    while (remainingWordOrPhrase && remainingWordOrPhrase.length > 0) {
      // Arbitrary limit to prevent making Typey Type slow from excess look ups and
      // avoid possible infinite loops
      if (strokeLookupAttempts > strokeLookupAttemptsLimit) {
        remainingWordOrPhrase = '';
        strokes = strokes + ' xxx';
        stroke = 'xxx';
      } else {

        // Check for whitespace on remaining words
        if (remainingWordOrPhrase.startsWith(" ") || remainingWordOrPhrase.endsWith(" ")) {
          remainingWordOrPhrase = remainingWordOrPhrase.trim();
        }

        // If we've found a matching stroke for the last remaining word, add the stroke to the hint and remove the word
        if (stroke && stroke.length > 0 && !(stroke === "xxx")) {
          strokes = strokes === "" ? stroke : strokes + " " + stroke;
          remainingWordOrPhrase = '';
          stroke = "xxx";
        }

        // Break up phrase on whitespace
        else if (stroke === "xxx" && remainingWordOrPhrase.includes(" ")) { // "off went the man!"
          let firstWord = remainingWordOrPhrase.slice(0, remainingWordOrPhrase.indexOf(" ")); // "off"
          remainingWordOrPhrase = remainingWordOrPhrase.slice(remainingWordOrPhrase.indexOf(" ") + 1, remainingWordOrPhrase.length); // "went the man!"

          [stroke, strokeLookupAttempts] = chooseStrokesForPhrase(firstWord, sourceWordsAndStrokes, stroke, strokeLookupAttempts); // "off"

          // if whitespace broken phrase does not exactly match and there is punctuation, try split on that
          if (stroke === "xxx" && (firstWord.match(punctuationSplittingRegex) !== null)) { // "man!"
            let tmpRemainingWordOrPhrase = '';
            [tmpRemainingWordOrPhrase, strokes, stroke, strokeLookupAttempts] = tryMatchingWordsWithPunctuation(firstWord, sourceWordsAndStrokes, strokes, stroke, strokeLookupAttempts); // "and!"

            remainingWordOrPhrase = tmpRemainingWordOrPhrase + " " + remainingWordOrPhrase; // This will cause its own bugs by re-introducing spaces where they don't belong in phrases
            stroke = "xxx";
          }
          else {
            strokes = strokes === "" ? stroke : strokes + " " + stroke;
            stroke = "xxx";
          }
        }

        // Break up phrase on punctuation
        else if (stroke === "xxx" && (remainingWordOrPhrase.match(punctuationSplittingRegex) !== null)) { // "man!"
          [remainingWordOrPhrase, strokes, stroke, strokeLookupAttempts] = tryMatchingWordsWithPunctuation(remainingWordOrPhrase, sourceWordsAndStrokes, strokes, stroke, strokeLookupAttempts);
        }
        else {
          if (remainingWordOrPhrase && remainingWordOrPhrase.length > 0) {
            [stroke, strokeLookupAttempts] = chooseStrokesForPhrase(remainingWordOrPhrase, sourceWordsAndStrokes, stroke, strokeLookupAttempts); // stroke = chooseStrokesForPhrase("man", sourceWordsAndStrokes, "", 0)

            // if all else fails, try fingerspelling
            if (stroke === "xxx") {
              stroke = [...remainingWordOrPhrase].map(char => {
                let fingerspelledStroke = '';
                fingerspelledStroke = FINGERSPELLED_LETTERS[char];
                if (!fingerspelledStroke) {
                  fingerspelledStroke = "xxx";
                }
                return fingerspelledStroke;
              }).join('/');
            }

            remainingWordOrPhrase = '';

            strokes = strokes === "" ? stroke : strokes + " " + stroke;
          }
          remainingWordOrPhrase = '';
        }
      }
    }

    sourceAndPresentedMaterial.push({phrase: wordOrPhraseMaterial, stroke: strokes });
  }

  return sourceAndPresentedMaterial;
}

export {
  generateDictionaryEntries,
};
