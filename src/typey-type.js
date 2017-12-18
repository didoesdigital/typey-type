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

function parseLesson(lessonText, path) {
  var lines = lessonText.split("\n");
  var lessonTitle = lines[0];
  var lessonSubtitle = lines[1];
  lines.filter(phrase => phrase !== '');
  var sourceMaterial = [];
  var settings = {ignoredChars: ''};

  for (var i = 2; i < lines.length; i++) {
    var line = lines[i];
    var firstChar = line.charAt(0);

    if (firstChar === "'") {
      var phraseAndStroke = line.split("': ");
      var phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      var stroke = phraseAndStroke[1];
      sourceMaterial.push( {phrase: phrase, stroke: stroke} );
    } else if (line.indexOf("=") !== -1) {
      var optionAndValue = line.split("=");
      var value = optionAndValue[1].replace(/'/g, "");
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
    path: path
  }
}

function isFirstVisit() {
  if (window.localStorage && window.localStorage.getItem('metWords')) {
    return false;
  } else {
    return true;
  }
}

function loadPersonalPreferences() {
  let metWords = {};
  let userSettings = {
    caseSensitive: true,
    retainedWords: false,
    limitNumberOfWords: 15,
    newWords: true,
    repetitions: 3,
    showStrokes: false,
    spacePlacement: 'spaceBeforeOutput',
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
    return [metWords, userSettings];
  }
  return [metWords, userSettings];
}

function writePersonalPreferences(userSettings, metWords) {
  let userSettingsJSON = JSON.stringify(userSettings);
  let metWordsJSON = JSON.stringify(metWords);
  if (window.localStorage) {
    window.localStorage.setItem('userSettings', userSettingsJSON);
    window.localStorage.setItem('metWords', metWordsJSON);
  } else {
    console.log('Unable to write to local storage. Changes to User Settings and Met Words will be lost.');
  }
}

function repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID) {
  let length = presentedMaterial.length;
  let reps = userSettings.repetitions;
  let wordsPerRep = presentedMaterial.length / userSettings.repetitions;

  let wordsRemaining = length - currentPhraseID;
  let repsRemaining = reps - Math.floor(((length - wordsRemaining)/wordsPerRep));

  return repsRemaining;
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

export {
  fetchLessonIndex,
  getLesson,
  isFirstVisit,
  loadPersonalPreferences,
  matchSplitText,
  repetitionsRemaining,
  parseLesson,
  writePersonalPreferences
};
