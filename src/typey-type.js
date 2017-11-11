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

  if (!userSettings.caseInsensitive) {
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

function parseLesson(lessonText) {
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
      settings[SETTINGS_NAME_MAP[optionAndValue[0]]] = value;
    }
  }

  // Flip this because lesson shows case_sensitive and I want caseInsensitive
  settings.caseInsensitive = !settings.caseInsensitive;

  return { sourceMaterial: sourceMaterial, presentedMaterial: sourceMaterial, settings: settings, title: lessonTitle, subtitle: lessonSubtitle }
}

export {matchSplitText, parseLesson};
