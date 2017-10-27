function matchSplitText(expected, actualText, settings={spacePlacement: 'Before Output', caseSensitive: false, requireSpaces: false, noticeSpaces: false, ignoredChars: ''}) {
  if (settings.requireSpaces === true && settings.spacePlacement === 'Before Output') {
    expected = ' '+expected;
  } else if (settings.requireSpaces === true && settings.spacePlacement === 'After Output') {
    expected = expected+' ';
  }
  let expectedChars = expected.split('');
  let actualTextChars = actualText.split('');
  let charactersMatch;
  let expectedIndex = 0;
  let actualTextIndex = 0;

  if (settings.caseSensitive === true) {
    charactersMatch = function (char1, char2) {
      return char1 === char2;
    }
  } else {
    charactersMatch = function (char1, char2) {
      return char1.toUpperCase() === char2.toUpperCase();
    }
  }

  for (; actualTextIndex < actualTextChars.length && expectedIndex < expectedChars.length; expectedIndex++, actualTextIndex++) {
    while(settings.ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
      expectedIndex++;
      if (expectedIndex >= expectedChars.length) {
        break;
      };
    }
    while(settings.noticeSpaces === false && actualTextChars[actualTextIndex] === ' ') {
      actualTextIndex++
      if (actualTextIndex >= actualTextChars.length) {
        break;
      }
    }
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
  case_sensitive: 'caseSensitive',
  require_spaces: 'requireSpaces',
  notice_spaces: 'noticeSpaces',
  ignore_characters: 'ignoredChars',
  warning_message: 'customMessage',
  locales: 'locales'
}

function parseLesson(lessonText) {
  var lines = lessonText.split("\n").filter(phrase => phrase !== '');
  var sourceMaterial = [];
  var settings = {caseSensitive: false, requireSpaces: false, noticeSpaces: false, ignoredChars: '', spacePlacement: 'Before Output'};
  var lessonTitle = lines[0];
  var lessonSubtitle = lines[1];

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

  return { sourceMaterial: sourceMaterial, presentedMaterial: sourceMaterial, settings: settings, title: lessonTitle, subtitle: lessonSubtitle }
}

export {matchSplitText, parseLesson};
