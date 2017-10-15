function matchSplitText(material, typedText, matchSettings={caseSensitive: true, requireSpaces: false, noticeSpaces: false, ignoredChars: ''}) {
  let materialChars = material.split('');
  let typedTextChars = typedText.split('');
  let charactersMatch;
  let i = 0;

  if (matchSettings.caseSensitive === true) {
    charactersMatch = function (char1, char2) {
      return char1 === char2;
    }
  } else {
    charactersMatch = function (char1, char2) {
      return char1.toUpperCase() === char2.toUpperCase();
    }
  }

  for (; i < typedTextChars.length && i < materialChars.length; i++) {
    if (!charactersMatch(typedTextChars[i], materialChars[i])) {
      break;
    }
  }

  let matched = materialChars.slice(0,i).join('');
  let unmatched = materialChars.slice(i).join('');
  return [matched, unmatched];
}

function parseLesson(lessonText) {
  var lines = lessonText.split("\n").filter(phrase => phrase !== '');
  var phrases = [];
  var settings = [];
  var lessonTitle = lines[0];
  var lessonSubtitle = lines[1];

  for (var i = 2; i < lines.length; i++) {
    var line = lines[i];
    var firstChar = line.charAt(0);

    if (firstChar == "'") {
      var phraseAndHint = line.split("\': ");
      var phrase = phraseAndHint[0].substring(1, phraseAndHint[0].length);
      var hint = phraseAndHint[1];
      phrases.push( [ phrase, hint ] );
    } else if (line.indexOf("=") != -1) {
      var optionAndValue = line.split("=");
      settings.push( [optionAndValue[0], optionAndValue[1]] );
    }
  }

  return { sourceMaterial: phrases.map(pair => pair[0]), settings: settings, title: lessonTitle, subtitle: lessonSubtitle }
}

export {matchSplitText, parseLesson};
