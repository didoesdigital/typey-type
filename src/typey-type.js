function matchSplitText(material, typedText) {
  let materialChars = material.split('');
  let typedTextChars = typedText.split('');
  let i = 0;
  for (; i < typedTextChars.length; i++) {
    if (typedTextChars[i] !== materialChars[i]) {
      break;
    }
  };
  let matched = materialChars.slice(0,i).join('');
  let unmatched = materialChars.slice(i).join('');
  return [matched, unmatched];
}

function parseLesson(lessonText) {
  console.log("Parsing!");
  var phrasesAndHints = lessonText.split("\n").filter(phrase => phrase !== '');
    var phrases = [];
    var settings = [];
    for (var i = 2; i < phrasesAndHints.length; i++) {
      var line = phrasesAndHints[i];
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
  return { phrases: phrases, settings: settings }
}

export {matchSplitText, parseLesson};
