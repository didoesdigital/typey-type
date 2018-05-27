import Zipper from './zipper';
import { isPeak } from './utils.js';

function strokeAccuracy(currentPhraseAttempts, targetStrokeCount) {
  let strokeAccuracy = true;
  let attempts = [];

  for (let i = 0; i < currentPhraseAttempts.length - 1; i++) {
    if (currentPhraseAttempts[i-1] !== undefined && currentPhraseAttempts[i+1] !== undefined) {
      if (isPeak(currentPhraseAttempts[i].length, currentPhraseAttempts[i-1].length, currentPhraseAttempts[i+1].length)) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i-1].length || currentPhraseAttempts[i].length === currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i+1] !== undefined) {
      if (currentPhraseAttempts[i].length > currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i-1] !== undefined) {
      if (currentPhraseAttempts[i].length > currentPhraseAttempts[i-1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i-1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    }
  }

  if (attempts.length >= targetStrokeCount) {
    // console.log("More attempts than expected strokes");
    return {strokeAccuracy: false, attempts: attempts};
  }

  // console.log("Fewer attempts than expected strokes");
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
  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{phrase: 'The', stroke: '-T'}],
    settings: { ignoredChars: '' },
    title: 'Custom',
    subtitle: '',
    newPresentedMaterial: new Zipper([{phrase: 'The', stroke: '-T'}]),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
  if (lessonTextAndStrokes.length === 0 || !lessonTextAndStrokes.includes("	")) {
    return emptyCustomLesson;
  }
  let lessonTitle = 'Custom';
  let lessonSubtitle = '';
  let lines = lessonTextAndStrokes.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  lines = lines.filter(phrase => phrase.includes("	"));
  if (lines.length === 0) {
    return emptyCustomLesson;
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

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
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

function generateDictionaryEntries(wordList, sourceWordsAndStrokes = {"the": "-T"}) {
  let dictionary = [];

  for (let i = 0; i < wordList.length; i++) {
    let entry = wordList[i];
    let stroke = sourceWordsAndStrokes[entry];
    if (!stroke) { stroke = sourceWordsAndStrokes[entry.toLowerCase()]; }
    if (!stroke) { stroke = "xxx"; }
    dictionary.push({phrase: entry, stroke: stroke});
  }

  return dictionary;
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

    if (firstChar === "'") {
      let phraseAndStroke = line.split("': ");
      let phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      let stroke = phraseAndStroke[1];
      sourceMaterial.push( {phrase: phrase, stroke: stroke} );
    } else if (line.indexOf("=") !== -1) {
      let optionAndValue = line.split("=");
      let value = optionAndValue[1].replace(/'/g, "");
      if (value === "true") { value = true; } else if (value === "false") { value = false; }
      if (optionAndValue[0] in SETTINGS_NAME_MAP) {
        settings[SETTINGS_NAME_MAP[optionAndValue[0]]] = value;
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

function swapKeyValueInDictionary(sourceDictionaryFile) {
  let sourceWordsAndStrokes = {};
  for (let stroke in sourceDictionaryFile) {
    let word = sourceDictionaryFile[stroke];
    sourceWordsAndStrokes[word] = stroke;
  }
  return sourceWordsAndStrokes;
}

function processDictionary(swappedDictionaryFile) {
  let processedDictionary = {};
  let charsToRemove = [
    [/({\^)(.*)(\^})/, '$2'], // Replace "{^ ^}" with " "
    [/({\^})(.*)/, '$2'], // Replace "{^}™" with "™"
    [/(.*)(\^})/, '$1'], // Replace "words{^}" with "words"
    [/(^})(.*)({$)/, '$2'], // Replace "}words{" leftover from prev regex with "words"
    [/({)(.)(})/, '$2'], // Replace "{;}" with ";"
    [/({&)([0-9])(})/, '$2'], // Replace "{&1}" with "1"
  ];
  for (let property in swappedDictionaryFile) {
    let value = swappedDictionaryFile[property];
    for (let i = 0; i < charsToRemove.length; i++) {
      property = property.replace(charsToRemove[i][0], charsToRemove[i][1]);
    }
    processedDictionary[property] = value;
  }
  return processedDictionary;
}

// function isFirstVisit() {
//   // metWords should at least contain `{'.':0}` so it should be length 7 or greater
//   if (window.localStorage && window.localStorage.getItem('metWords') && window.localStorage.getItem('metWords').length>=7) {
//     return false;
//   } else {
//     return true;
//   }
// }

function loadPersonalPreferences() {
  let metWords = {};
  let flashcardsProgress = {};
  let flashcardsMetWords = {
    "the": {
      phrase: "the",
      stroke: "-T",
      currentStatus: 0,
    },
  };
  let userSettings = {
    caseSensitive: false,
    retainedWords: true,
    limitNumberOfWords: 45,
    newWords: true,
    repetitions: 3,
    showStrokes: true,
    hideStrokesOnLastRepetition: true,
    spacePlacement: 'spaceOff',
    sortOrder: 'sortOff',
    seenWords: true,
    study: 'discover'
  };
  if (window.localStorage) {
    if (window.localStorage.getItem('metWords')) {
      metWords = JSON.parse(window.localStorage.getItem('metWords'));
    }
    if (window.localStorage.getItem('userSettings')) {
      userSettings = Object.assign(userSettings, JSON.parse(window.localStorage.getItem('userSettings')));
    }
    if (window.localStorage.getItem('flashcardsMetWords')) {
      flashcardsMetWords = Object.assign(flashcardsMetWords, JSON.parse(window.localStorage.getItem('flashcardsMetWords')));
    }
    if (window.localStorage.getItem('flashcardsProgress')) {
      flashcardsProgress = Object.assign(flashcardsProgress, JSON.parse(window.localStorage.getItem('flashcardsProgress')));
    }
    return [metWords, userSettings, flashcardsMetWords, flashcardsProgress];
  }
  return [metWords, userSettings, flashcardsMetWords, flashcardsProgress];
}

function writePersonalPreferences(itemToStore, JSONToStore) {
  let stringToStore = JSON.stringify(JSONToStore);
  if (window.localStorage) {
    window.localStorage.setItem(itemToStore, stringToStore);
  } else {
    console.log('Unable to write to local storage. Changes to User Settings and Met Words will be lost.');
  }
}

function targetStrokeCount(currentOutline) {
  // console.log(currentOutline.stroke.split(/[/ ]/).length);
  return currentOutline.stroke.split(/[/ ]/).length || 1;
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

function getLesson(lessonFile) {
  return fetch(lessonFile, {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.text();
  }, function(error) {
    console.log(error);
  });
}

function fetchLessonIndex() {
  return fetch(process.env.PUBLIC_URL + '/lessons/lessonIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  }).catch(function(e) {
    console.log('Unable to load lesson index', e)
  });
}

function fetchDictionaries() {
  return fetch(process.env.PUBLIC_URL + '/dictionaries/dict.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  }).catch(function(e) {
    console.log('Unable to load lesson index', e)
  });
}

export {
  fetchLessonIndex,
  fetchDictionaries,
  generateDictionaryEntries,
  getLesson,
  loadPersonalPreferences,
  matchSplitText,
  parseCustomMaterial,
  parseLesson,
  parseWordList,
  processDictionary,
  swapKeyValueInDictionary,
  repetitionsRemaining,
  shouldShowStroke,
  strokeAccuracy,
  targetStrokeCount,
  writePersonalPreferences
};
