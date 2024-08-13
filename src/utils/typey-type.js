import Zipper from './zipper';
import Stroke from './stroke';
import * as stroke from './stroke';
import { isPeak } from './utils';
import trimAndSumUniqMetWords from './trimAndSumUniqMetWords';

function createWordListFromMetWords (metWords) {
  let munged = trimAndSumUniqMetWords(metWords);
  let metWordsEntries = Object.entries(munged).sort(function (a, b) {
    return b[1] - a[1]
  });

  // remove prefix and suffix entries because they're annoying to write
  // while practicing regular words
  metWordsEntries = metWordsEntries.filter(item => {
    let containsCaret = item[0].indexOf('^') !== -1;
    let isJustACaretCharacter = item[0] === '^';
    let isJustACaretCharacterWithSpaceBefore = item[0] === ' ^';
    let isJustACaretCharacterWithSpaceAfter = item[0] === '^ ';
    return !containsCaret || isJustACaretCharacter || isJustACaretCharacterWithSpaceBefore || isJustACaretCharacterWithSpaceAfter;
  });
  return metWordsEntries.map(entry => entry[0].trim());
}





function mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout = "stenoLayoutAmericanSteno") {

  const QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP = {
    '1': stroke.HASH,
    '2': stroke.HASH,
    '3': stroke.HASH,
    '4': stroke.HASH,
    '5': stroke.HASH,
    '6': stroke.HASH,
    '7': stroke.HASH,
    '8': stroke.HASH,
    '9': stroke.HASH,
    '0': stroke.HASH,
    'q': stroke.S,
    'a': stroke.S,
    'w': stroke.T,
    's': stroke.K,
    'e': stroke.P,
    'd': stroke.W,
    'r': stroke.H,
    'f': stroke.R,
    'c': stroke.A,
    'v': stroke.O,
    't': stroke.STAR,
    'g': stroke.STAR,
    'y': stroke.STAR,
    'h': stroke.STAR,
    'n': stroke.E,
    'm': stroke.U,
    'u': stroke.F,
    'j': stroke.RR,
    'i': stroke.RP,
    'k': stroke.B,
    'o': stroke.L,
    'l': stroke.G,
    'p': stroke.RT,
    ';': stroke.RS,
    '[': stroke.D,
    "'": stroke.Z
  };

  let stenoStroke = new Stroke();
  let splitQWERTY = [...qwertyString];
  for (let i = 0; i < splitQWERTY.length; i++) {
    let character = qwertyString[i];
    if (QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]) {
      stenoStroke = stenoStroke.set(QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]);
    }
  }

  // debugger;
  return stenoStroke;
}

/**
 * @param {import('../types').Attempt[]} currentPhraseAttempts
 * @param {number} targetStrokeCount
 * @param {string} unmatchedActual
 * @param {boolean=} batchUpdate
 * @returns {{strokeAccuracy: boolean, attempts: import('../types').Attempt[]}}
 */
function strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual, batchUpdate) {
  let strokeAccuracy = true;
  let attempts = [];

  for (let i = 0; i < currentPhraseAttempts.length - 1; i++) {
    let isAPeak = false;
    if (currentPhraseAttempts[i-1] !== undefined && currentPhraseAttempts[i+1] !== undefined) {
      if (isPeak(currentPhraseAttempts[i].text.length, currentPhraseAttempts[i-1].text.length, currentPhraseAttempts[i+1].text.length)) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].text.length === currentPhraseAttempts[i-1].text.length || currentPhraseAttempts[i].text.length === currentPhraseAttempts[i+1].text.length) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i+1] !== undefined) {
      if (currentPhraseAttempts[i].text.length > currentPhraseAttempts[i+1].text.length) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].text.length === currentPhraseAttempts[i+1].text.length) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i-1] !== undefined) {
      if (currentPhraseAttempts[i].text.length > currentPhraseAttempts[i-1].text.length) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].text.length === currentPhraseAttempts[i-1].text.length) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    }

    if (isAPeak) {
      attempts.push(currentPhraseAttempts[i]);
    }
  }

  if (attempts.length >= targetStrokeCount) {
    // console.log("More attempts than expected strokes");
    return {strokeAccuracy: false, attempts: attempts};
  }

  if (!batchUpdate) {
    // If it's the final stroke, fail any unmatched characters immediately
    // (unless you're undoing a stroke and typed text is getting shorter)
    let nextAttempt = attempts.length + 1;
    let isFinalStroke = nextAttempt >= targetStrokeCount;
    let hasUnmatchedChars = unmatchedActual.length > 0;
    let failedSingleStrokeBrief = currentPhraseAttempts.length === 1 && targetStrokeCount === 1;
    let isTypedTextLongerThanPrevious = currentPhraseAttempts.length > 1 && currentPhraseAttempts[currentPhraseAttempts.length - 1].text.length > currentPhraseAttempts[currentPhraseAttempts.length - 2].text.length;
    if (isFinalStroke && hasUnmatchedChars && (failedSingleStrokeBrief || isTypedTextLongerThanPrevious)) {
      attempts.push(currentPhraseAttempts[currentPhraseAttempts.length - 1]);
      return { strokeAccuracy: false, attempts: attempts };
    }
  }

  return {strokeAccuracy: strokeAccuracy, attempts: attempts};
}

function matchSplitText(expected, actualText, settings={ignoredChars: ''}, userSettings={}) {
  if (userSettings.spacePlacement === 'spaceBeforeOutput') {
    expected = ' '+expected;
  } else if (userSettings.spacePlacement === 'spaceAfterOutput') {
    expected = expected+' ';
  }
  let expectedChars = expected.split('');
  let actualTextChars = actualText.split('');
  let charactersMatch;
  let expectedIndex = 0;
  let actualTextIndex = 0;
  let ignoredChars = settings.ignoredChars.slice(0);

  if (userSettings.caseSensitive) {
    charactersMatch = function (char1, char2) {
      return char1 === char2;
    }
  } else {
    charactersMatch = function (char1, char2) {
      return char1.toUpperCase() === char2.toUpperCase();
    }
  }

  if (userSettings.spacePlacement === 'spaceOff') {
    ignoredChars += " ";
  }

  for (; actualTextIndex < actualTextChars.length && expectedIndex < expectedChars.length; expectedIndex++, actualTextIndex++) {

    // Is material char an ignored char?
    while(ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
      expectedIndex++;
      if (expectedIndex >= expectedChars.length) {
        break;
      };
    }

    // Is typed char an ignored space?
    while(userSettings.spacePlacement === 'spaceOff' && actualTextChars[actualTextIndex] === ' ') {
      actualTextIndex++
      if (actualTextIndex >= actualTextChars.length) {
        break;
      }
    }

    // If typed char is undefined, break
    if (!actualTextChars[actualTextIndex]) {
      break;
    }

    // If material char is undefined, break
    if (!expectedChars[expectedIndex]) {
      break;
    }

    // Do material and typed chars match?
    if (!charactersMatch(actualTextChars[actualTextIndex], expectedChars[expectedIndex])) {
      break;
    }
  }

  // Alternative approach to matching trailing ignored character ^ does not work on ignored spaces setting when there are many ignored characters in the middle of the word
  // if (expectedChars.length > actualTextChars.length) {
  //   // Is material char an ignored char?
  //   while(ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
  //     expectedIndex++;
  //     if (expectedIndex >= expectedChars.length) {
  //       break;
  //     };
  //   }
  // }

  let matchedExpected = expectedChars.slice(0,expectedIndex).join('');
  let unmatchedExpected = expectedChars.slice(expectedIndex).join('');
  let matchedActual = actualTextChars.slice(0,actualTextIndex).join('');
  let unmatchedActual = actualTextChars.slice(actualTextIndex).join('');

  return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
}

const SETTINGS_NAME_MAP = {
  ignore_characters: 'ignoredChars',
  warning_message: 'customMessage',
  locales: 'locales'
}

function parseCustomMaterial(lessonTextAndStrokes) {
  let validationState = 'unvalidated';
  let validationMessages = [];

  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{phrase: '', stroke: ''}],
    settings: { ignoredChars: '' },
    title: 'Custom',
    subtitle: '',
    newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
  if (lessonTextAndStrokes.length === 0) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 word');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  if (!lessonTextAndStrokes.includes("	")) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 “Tab” character');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let lessonTitle = 'Custom';
  let lessonSubtitle = '';

  let lines = lessonTextAndStrokes.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  lines = lines.filter(phrase => phrase.includes("	"));
  lines = lines.filter(phrase => !phrase.startsWith("	"));
  if (lines.length === 0) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 word and 1 “Tab” character');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let phraseAndStroke = line.split("	");
    let phrase = phraseAndStroke[0];
    let stroke = phraseAndStroke[1];
    sourceMaterial.push( {phrase: phrase, stroke: stroke} );
  }

  validationState = 'success';

  return [{
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  },
    validationState,
    validationMessages
  ]
}

function parseWordList(userInputWordList) {
  let wordList = [];
  if (userInputWordList.length === 0) {
    return wordList;
  }
  let lines = userInputWordList.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  if (lines.length === 0) {
    return wordList;
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    wordList.push( line );
  }

  return wordList;
}

function parseLesson(lessonText, path) {
  let lines = lessonText.split("\n");
  let lessonTitle = lines[0];
  let lessonSubtitle = lines[1];
  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    let firstChar = line.charAt(0);

    // If it starts with a single quote, it's lesson material:
    if (firstChar === "'") {
      let phraseAndStroke = line.split("': ");
      let phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      let stroke = phraseAndStroke[1];
      sourceMaterial.push( {phrase: phrase, stroke: stroke} );
    }
    // If it doesn't start with a single quote and does include equals, it's a setting:
    else if (line.indexOf("=") !== -1) {
      // Example: `warning_message=Hint: use exact spacing setting`
      // Example: `warning_message=Hint: use exact spacing setting and don’t type ^`
      // Example: `warning_message=Hint: use TK-LS between strokes`
      // Example: `ignore_characters='^'`
      const [settingName, settingValue] = line.split("=");
      if (settingName in SETTINGS_NAME_MAP) {
        settings[SETTINGS_NAME_MAP[settingName]] =
          settingName === "ignore_characters" ? settingValue.replace(/'/g, "") : settingValue;
      }
    }
  }

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper([sourceMaterial]),
    path: path
  }
}

function lookUpDictionaryInIndex(path, dictionaryIndex = []) {
  let dictionaryMetadata = dictionaryIndex.find(metadataEntry => process.env.PUBLIC_URL + metadataEntry.path === path.replace(/\/$/,'.json'));

  if (typeof dictionaryMetadata === "undefined") {
    dictionaryMetadata = {
      author: "Typey Type",
      title: 'Missing dictionary details',
      subtitle: "",
      category: "Typey Type",
      subcategory: "",
      tagline: "Loading dictionary details…",
      link: "/typey-type/support#typey-type-dictionary",
      path: "/dictionaries/typey-type/top-10.json",
    }
  }


  // let dictionaryMetadata = {
  //   author: "Typey Type",
  //   title: "Dictionary",
  //   subtitle: "",
  //   category: "Typey Type",
  //   subcategory: "",
  //   tagline: "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
  //   link: "/typey-type/support#typey-type-dictionary",
  //   path: "/dictionaries/typey-type/typey-type.json"
  // }
  // let dictionaryIndex = [
  //   {
  //     "author": "Typey Type",
  //     "title": "Dictionary",
  //     "subtitle": "",
  //     "category": "Typey Type",
  //     "subcategory": "",
  //     "tagline": "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
  //     "link": "/typey-type/support#typey-type-dictionary",
  //     "path": "/dictionaries/typey-type/typey-type.json"
  //   }
  // ];

  // let len = dictionaryIndex.length;
  // for (let i = 0; i < len; i++) {
  //   if (i.path === path) {
  //   }
  // }

  return dictionaryMetadata;
}

// function processDictionary(swappedDictionaryFile, stenoLayout) {
//   let processedDictionary = {};
//   let charsToRemove = [
//     [/({\^)(.*)(\^})/, '$2'], // Replace "{^ ^}" with " "
//     [/({\^})(.*)/, '$2'], // Replace "{^}™" with "™"
//     [/(.*)(\^})/, '$1'], // Replace "words{^}" with "words"
//     [/(^})(.*)({$)/, '$2'], // Replace "}words{" leftover from prev regex with "words"
//     [/({)(.)(})/, '$2'], // Replace "{;}" with ";"
//     [/({&)([0-9])(})/, '$2'], // Replace "{&1}" with "1"
//   ];
//   let charsToRemoveFromPunctuation = [
//     [/({\^)(.*)(})/, '$2'], // Replace "{^x}" with "x"
//     [/^\\(.*)({|})$/, '$2'], // Replace "\}" with "}" or "\{" with "{"
//     [/^({)?~\|(.*)$/, '$2'], // Replace "~|’" with "’" or "{~|‘" with "‘"
//     ['{-|}', ''], // Remove string "{-|}"
//   ];
//   // let punctuationUnescapedString = "[!"#$%&'()*,./:;<=>?@[\]^`{|}~]-";
//   let punctuationRegex = /[!"#$%&'()*,./:;<=>?@[\\\]^`{|}~-]/;

//   for (let property in swappedDictionaryFile) {
//     let value = swappedDictionaryFile[property];

//     for (let i = 0; i < charsToRemove.length; i++) {
//       property = property.replace(charsToRemove[i][0], charsToRemove[i][1]);

//       if (property.match(punctuationRegex) && !property.match(/[A-Za-z0-9 ]/)) {
//         // console.log("BEFORE: " + property);
//         for (let i = 0; i < charsToRemoveFromPunctuation.length; i++) {
//           property = property.replace(charsToRemoveFromPunctuation[i][0], charsToRemoveFromPunctuation[i][1]);
//         }
//         // console.log("AFTER: " + property);
//       }
//     }
//     // TODO: generalise these hard coded fixes
//     if (property === "{}" && value === "WUZ/WUZ") {
//       processedDictionary[property] = "TPR-BGT/TK-LS/TPR*BGT";
//     } else if (property.match(/^[0-9]$/)) {
//       // don't use `0RBGS` for 0
//     } else if (property === "'" && (value === "TP-L" || value === "TP-P")) {
//       // don't override AE with TP-L
//     } else if (property === "," && value === "W-B") {
//       value = "KW-BG"; // hack for preferring spaced comma brief
//       processedDictionary[property] = value;
//     } else {
//       processedDictionary[property] = value;
//     }
//   }

//   // TODO: don't hard code these, it probably breaks steno layouts other than Ward Stone Ireland
//   processedDictionary['0'] = "#O";
//   processedDictionary['1'] = "#S";
//   processedDictionary['2'] = "#T-";
//   processedDictionary['3'] = "#P-";
//   processedDictionary['4'] = "#H";
//   processedDictionary['5'] = "#A";
//   processedDictionary['6'] = "#F";
//   processedDictionary['7'] = "#-P";
//   processedDictionary['8'] = "#L";
//   processedDictionary['9'] = "#-T";

//   if (stenoLayout === "stenoLayoutAmericanSteno") {
//     // TODO: don't hard code these; it probably breaks steno layouts other than Ward Stone Ireland
//     processedDictionary["a"] = "A*";
//     processedDictionary["b"] = "PW*";
//     processedDictionary["c"] = "KR*";
//     processedDictionary["d"] = "TK*";
//     processedDictionary["e"] = "*E";
//     processedDictionary["f"] = "TP*";
//     processedDictionary["g"] = "TKPW*";
//     processedDictionary["h"] = "H*";
//     processedDictionary["i"] = "*EU";
//     processedDictionary["j"] = "SKWR*";
//     processedDictionary["k"] = "K*";
//     processedDictionary["l"] = "HR*";
//     processedDictionary["m"] = "PH*";
//     processedDictionary["n"] = "TPH*";
//     processedDictionary["o"] = "O*";
//     processedDictionary["p"] = "P*";
//     processedDictionary["q"] = "KW*";
//     processedDictionary["r"] = "R*";
//     processedDictionary["s"] = "S*";
//     processedDictionary["t"] = "T*";
//     processedDictionary["u"] = "*U";
//     processedDictionary["v"] = "SR*";
//     processedDictionary["w"] = "W*";
//     processedDictionary["x"] = "KP*";
//     processedDictionary["y"] = "KWR*";
//     processedDictionary["z"] = "STKPW*";
//     processedDictionary["A"] = "A*P";
//     processedDictionary["B"] = "PW*P";
//     processedDictionary["C"] = "KR*P";
//     processedDictionary["D"] = "TK*P";
//     processedDictionary["E"] = "*EP";
//     processedDictionary["F"] = "TP*P";
//     processedDictionary["G"] = "TKPW*P";
//     processedDictionary["H"] = "H*P";
//     processedDictionary["I"] = "*EUP";
//     processedDictionary["J"] = "SKWR*P";
//     processedDictionary["K"] = "K*P";
//     processedDictionary["L"] = "HR*P";
//     processedDictionary["M"] = "PH*P";
//     processedDictionary["N"] = "TPH*P";
//     processedDictionary["O"] = "O*P";
//     processedDictionary["P"] = "P*P";
//     processedDictionary["Q"] = "KW*P";
//     processedDictionary["R"] = "R*P";
//     processedDictionary["S"] = "S*P";
//     processedDictionary["T"] = "T*P";
//     processedDictionary["U"] = "*UP";
//     processedDictionary["V"] = "SR*P";
//     processedDictionary["W"] = "W*P";
//     processedDictionary["X"] = "KP*P";
//     processedDictionary["Y"] = "KWR*P";
//     processedDictionary["Z"] = "STKPW*P";
//     // TODO: don't hard code these; it probably breaks steno layouts other than Ward Stone Ireland
//     processedDictionary["?"] = "H-F";
//   }
//   return processedDictionary;
// }

// function isFirstVisit() {
//   // metWords should at least contain `{'.':0}` so it should be length 7 or greater
//   if (window.localStorage && window.localStorage.getItem('metWords') && window.localStorage.getItem('metWords').length>=7) {
//     return false;
//   } else {
//     return true;
//   }
// }

const migratePersonalDictionariesV0ToV1 = function (personalDictionaries, dirtyFlag) {
  if (!personalDictionaries.v) {
    personalDictionaries = {v:'1',dicts:personalDictionaries};
    dirtyFlag = true;
  }

  return [personalDictionaries, dirtyFlag];
}

// const migratePersonalDictionariesV1ToV2 = function (personalDictionaries, dirtyFlag) {
//   if (personalDictionaries.v && personalDictionaries.v === '1') {
//     let opts = {};
//     let dictsWithMetadata = personalDictionaries.dicts.map(dict => [dict[0],dict[1],opts]);
//     personalDictionaries = {v:'2',dicts:dictsWithMetadata};
//     dirtyFlag = true;
//   }

//   return [personalDictionaries, dirtyFlag];
// }

const runAllPersonalDictionariesMigrations = function (personalDictionaries, dirtyFlag) {
  let error = null;
  try {
    [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV0ToV1(personalDictionaries, dirtyFlag);
    // [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV1ToV2(personalDictionaries, dirtyFlag);
  }
  catch (exception) {
    personalDictionaries = null;
    dirtyFlag = false;
    error = "Personal dictionaries found in local storage are either missing a version number or are not in valid version 0 format for migrating to version 1.";
  }
  return [personalDictionaries, dirtyFlag, error];
}

function migratePersonalDictionariesV(personalDictionaries) {
  let dirtyFlag = false;
  let error = null;

  [personalDictionaries, dirtyFlag, error] = runAllPersonalDictionariesMigrations(personalDictionaries, dirtyFlag, error);

  if (personalDictionaries !== null && dirtyFlag && error === null) {
    writePersonalPreferences('personalDictionaries', personalDictionaries);
  }

  return [personalDictionaries, error];
}

function loadPersonalDictionariesFromLocalStorage() {
  try {
    if (window.localStorage) {
      let versionedDictionaries = null;
      if (window.localStorage.getItem('personalDictionaries')) {
        versionedDictionaries = JSON.parse(window.localStorage.getItem('personalDictionaries'));
      }
      if (versionedDictionaries === null) {
        return null;
      }

      let errorMessage = null;
      [versionedDictionaries, errorMessage] = migratePersonalDictionariesV(versionedDictionaries);
      if (errorMessage) {
        console.error(errorMessage);
        return null;
      }

      let areDictsSomewhatValid = versionedDictionaries !== null && versionedDictionaries.v && versionedDictionaries.v === '1' && versionedDictionaries.dicts && versionedDictionaries.dicts[0] && versionedDictionaries.dicts[0][1];
      if (areDictsSomewhatValid) {
        return versionedDictionaries['dicts'];
      }
      else {
        console.error("Dictionaries found in local storage are not valid. ");
        return null;
      }
    }
  }
  catch(error) {
    console.error('Unable to read local storage. ', error);
  }
  return null;
}

function loadPersonalPreferences() {
  let metWords = {};
  let lessonsProgress = {};
  try {
    if (window.localStorage) {
      if (window.localStorage.getItem('metWords')) {
        metWords = JSON.parse(window.localStorage.getItem('metWords'));
      }
      if (window.localStorage.getItem('lessonsProgress')) {
        lessonsProgress = Object.assign(lessonsProgress, JSON.parse(window.localStorage.getItem('lessonsProgress')));
      }
      return [metWords, lessonsProgress];
    }
  }
  catch(error) {
    console.log('Unable to read local storage.', error);
  }
  return [metWords, lessonsProgress];
}

function writePersonalPreferences(itemToStore, JSONToStore) {
  const localStorageErrorMessage = "Local storage is unavailable. Changes to personal preferences and progress will be lost.";
  try {
    if (!window.localStorage) {
      console.warn('Unable to write to local storage. Progress data will be lost.');
      return {
        name: "NoLocalStorage",
        message: localStorageErrorMessage,
      }
    }
  }
  catch(error) {
    console.warn(localStorageErrorMessage);
    console.error(error);
    return {
      name: "NoLocalStorage",
      message: localStorageErrorMessage,
    }
  }

  let stringToStore = JSON.stringify(JSONToStore);

  try {
    window.localStorage.setItem(itemToStore, stringToStore);
  }
  catch(error) {
    try {
      window.localStorage.removeItem('typey-KPOES-words');
      window.localStorage.removeItem('personalDictionaries');
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log('Unable to write to local storage. It may be full. Any personal dictionaries imported have been removed.', error);
      return {
        name: "AddToStorageFailed",
        message: "Unable to set item in local storage. It may be full. Any personal dictionaries imported have been removed.",
        error: error
      }
    }
    catch {
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log('Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.', error);
      return {
        name: "WriteToStorageFailed",
        message: "Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.",
        error: error
      }
    }
  }
}

/**
 * Real target count, used for display etc.
 * @param {{stroke: string}} currentOutline
 * @return {number}
 */
function getTargetStrokeCount(currentOutline) {
  // console.log(currentOutline.stroke.split(/[/ ]/).length);
  return currentOutline.stroke.split(/[/ ]/).length || 1;
}

/**
 * Target count, used for calculating misstrokes
 * @param {{stroke: string}} currentOutline
 * @return {number}
 */
function getTargetObservableStrokeCount(currentOutline) {
  const nonObservableStrokes = ["KPA", "KPA*", "TK-LS"];
  const nonObservableStrokeCount = currentOutline.stroke.split(/[/ ]/)
    .filter(stroke => nonObservableStrokes.includes(stroke))
    .length;
  return getTargetStrokeCount(currentOutline) - nonObservableStrokeCount;
}

function repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID) {
  let lessonLength = presentedMaterial.length;
  if (currentPhraseID > lessonLength) { return 0; }
  let reps = userSettings.repetitions;
  let wordsPerRep = lessonLength/ userSettings.repetitions;
  let wordsRemaining = lessonLength - currentPhraseID;
  return reps - Math.floor(((lessonLength - wordsRemaining)/wordsPerRep));
}

function shouldShowStroke(showStrokesInLesson, showStrokes, repetitionsRemaining, hideStrokesOnLastRepetition) {
  if (showStrokesInLesson) {
    // console.log("You clicked the hint linked");
    return true;
  } else if (showStrokes && repetitionsRemaining > 1) {
    // console.log("show strokes and more than 1 rep left");
    return true;
  } else if (showStrokes && repetitionsRemaining <= 1 && !(hideStrokesOnLastRepetition) ) {
    // console.log("show strokes and <=1 rep and not hide briefs on lest rep");
    return true;
  }
    // console.log("show stroke");
  return false;
}

function updateCapitalisationStrokesInNextItem(nextItem, lastWord) {
  if (nextItem.stroke.startsWith("KPA/") || nextItem.stroke.startsWith("HRO*ER/") || nextItem.stroke.startsWith("*URP/")) {
    if (lastWord.endsWith(".") || lastWord.endsWith("!") || lastWord.endsWith("?") || lastWord.endsWith("…") || lastWord.endsWith('!"') || lastWord.endsWith('?"') || lastWord.endsWith('."')) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KPA\/|\*URP\/|HRO\*ER\/)/,'');
    }
  }

  if (nextItem.stroke.startsWith("KW-GS KPA") || nextItem.stroke.startsWith("KR-GS KPA")) {
    if (lastWord.endsWith(".") || lastWord.endsWith("!") || lastWord.endsWith("?") || lastWord.endsWith("…") || lastWord.endsWith('!"') || lastWord.endsWith('?"') || lastWord.endsWith('."')) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KR-GS KPA\/)/,'KR-GS ');
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KW-GS KPA\/)/,'KW-GS ');
    }

    if (lastWord.match(/[A-Za-z]$/) || lastWord.endsWith(":")) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KR-GS KPA\/)/,'KR-GS KPA*/');
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KW-GS KPA\/)/,'KW-GS KPA*/');
    }
  }

  return nextItem;
}

export {
  createWordListFromMetWords,
  loadPersonalPreferences,
  loadPersonalDictionariesFromLocalStorage,
  lookUpDictionaryInIndex,
  matchSplitText,
  mapQWERTYKeysToStenoStroke,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  parseCustomMaterial,
  parseLesson,
  parseWordList,
  repetitionsRemaining,
  runAllPersonalDictionariesMigrations,
  shouldShowStroke,
  strokeAccuracy,
  getTargetStrokeCount,
  getTargetObservableStrokeCount,
  updateCapitalisationStrokesInNextItem,
  writePersonalPreferences
};
