import {
  createWordListFromMetWords,
  parseCustomMaterial,
  matchSplitText,
  loadPersonalPreferences,
  processDictionary,
  strokeAccuracy,
  splitBriefsIntoStrokes,
  trimAndSumUniqMetWords,
  swapKeyValueInDictionary,
  writePersonalPreferences,
  mapBriefToAmericanStenoKeys,
  repetitionsRemaining
} from './typey-type';
import Zipper from './zipper';

describe('sum uniq met words', () => {
  it('returns met words without duplicate entries with different spacing', () => {
    let metWords = {"the": 1, " the": 3, "the ": 2, "steno": 1};
    expect(trimAndSumUniqMetWords(metWords)).toEqual(
      {"the": 6, "steno": 1}
    );
  });
});

describe('create sorted word list from met words', () => {
  it('returns sorted word list', () => {
    let metWords = {"the": 1, "machine": 3, "test": 2, "steno": 3};
    expect(createWordListFromMetWords(metWords)).toEqual(
      ["machine", "steno", "test", "the"]
    );
  });

  it('returns empty word list for empty metWords', () => {
    let metWords = {};
    expect(createWordListFromMetWords(metWords)).toEqual(
      []
    );
  });
});

describe('split briefs into strokes', () => {
  it('returns single stroke as array of that stroke', () => {
    let currentStroke = "SAEUPL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["SAEUPL"]
    );
  });

  it('returns multi-stroke word as array of strokes', () => {
    let currentStroke = "A/WAEU";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["A","WAEU"]
    );
  });

  it('returns phrase with spaces as array of strokes', () => {
    let currentStroke = "-T WUPB";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["-T","WUPB"]
    );
  });

  it('returns phrase with spaces and slashes as array of strokes', () => {
    let currentStroke = "T/SEF or T/SEFL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["T","SEF","or","T","SEFL"]
    );
  });
});

describe('map stroke to keys', () => {
  it('show no keys for empty brief', () => {
    let brief = "";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });

  it('shows left-hand T for "it"', () => {
    let brief = "T";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: true,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });


  it('shows right-hand -T for "the"', () => {
    let brief = "-T";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: true,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });

  it('show star key for brief with star "eyes"', () => {
    let brief = "AO*EUS";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: true,
      leftO: true,
      star: true,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: true,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for dash only brief "welcome"', () => {
    let brief = "HR-BG";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: true,
      leftR: true,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: true,
      rightL: false,
      rightG: true,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for left-side only brief "consider"', () => {
    let brief = "KR";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: true,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: true,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for right-side only brief "be"', () => {
    let brief = "-B";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: true,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show 5 keys for "same" brief', () => {
    let brief = "SAEUPL";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: true,
      leftSLower: true,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: true,
      leftO: false,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: true,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show 1 key for "M" brief', () => {
    let brief = "PH*P";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: true,
      leftW: false,
      leftH: true,
      leftR: false,
      leftA: false,
      leftO: false,
      star: true,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing numbers and letters for 70s', () => {
    let brief = "0EU7S";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: true,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: true,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing numbers for 90', () => {
    let brief = "0EU9";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: true,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: true,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing duplicated numbers like 11', () => {
    let brief = "1-D";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: true,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: true,
      rightZ: false
    });
  });
});

describe('stroke accuracy for current phrase', () => {
  describe('should return false for real failed meetings', () => {
    it('you wrote cut instead of cat and Plover backtracked to " c"', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote cut instead of cat and Plover backtracked to " "', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote cut instead of cat and Plover backtracked to ""', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ",
        "",
        " ",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote sign, ss, and ss for sciences', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " ss", " s", " ss", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" sign", " ss", " ss"]});
    });

    it('you wrote "verticax", "verticaw" for vertical', () => {
      let currentPhraseAttempts = [" ", " v", " ve", " ver", " vert", " verti", " vertic", " vertica", " verticax", " verticaw", " vertical"];
      let targetStrokeCount = 2;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" verticax", " verticaw"]});
    });

//     it("you wrote were instead of we're", () => {
//       let currentPhraseAttempts = [
//       " ",
//         " w",
//         " we",
//         " wer",
//         " were",
//         " wer",
//         " we",
//         " w",
//         " ",
//         " w",
//         " we",
//         " we'",
//         " we'r",
//         " we're"
//       ];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });

//     it("you wrote we're instead of were", () => {
//       let currentPhraseAttempts = [" ", " w", " we", " we'", " we'r", " we're", " we'r", " we'", " we", " w", " ", " w", " we", " wer", " were"];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });
  });

  describe('should return true for real successful meetings', () => {
    it('should return true for real successful meetings', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: true, attempts: [" sign"]});
    });
  });
});

describe('parseCustomMaterial', () => {
  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{phrase: 'The', stroke: '-T'}],
    settings: { ignoredChars: '' },
    title: 'Custom',
    subtitle: '',
    newPresentedMaterial: new Zipper([{phrase: 'The', stroke: '-T'}]),
    path: '/lessons/custom'
  }
  describe('has no content', () => {
    it('should return empty source material', () => {
      let customMaterial = "";
      expect(parseCustomMaterial(customMaterial)).toEqual(emptyCustomLesson);
    });
  });
  describe('has no tabs', () => {
    it('should return empty source material', () => {
      let customMaterial = "test TEFT";
      expect(parseCustomMaterial(customMaterial)).toEqual(emptyCustomLesson);
    });
  });
  describe('has a line with no tabs', () => {
    it('should return a lesson without that line', () => {
      let customMaterial = `testWithSpace TEFT
testWithTab	TEFT
`;
      expect(parseCustomMaterial(customMaterial)).toEqual({
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      });
    });
  });
  describe('has a line with multiple tabs', () => {
    it('should return a lesson with the first stroke provided', () => {
      let customMaterial = `testWithTab	TEFT	TEFTD`;
      expect(parseCustomMaterial(customMaterial)).toEqual({
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      });
    });
  });
});

describe('loadPersonalPreferences', () => {
  describe('without localStorage', () => {
    it('should return previously met words and user settings', () => {
      let metWords = {};
      let flashcardsMetWords = {
        "the": {
          "phrase": "the",
          "stroke": "-T",
          "rung": 0
        }
      }
      let flashcardsProgress = {}
      let lessonsProgress = {};
      let userSettings = {
        blurMaterial: false,
        caseSensitive: false,
        simpleTypography: true,
        retainedWords: true,
        limitNumberOfWords: 45,
        newWords: true,
        repetitions: 3,
        showScoresWhileTyping: true,
        showStrokes: true,
        showStrokesAsDiagrams: false,
        stenoLayout: 'stenoLayoutAmericanSteno',
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        speakMaterial: false,
        sortOrder: 'sortOff',
        seenWords: true,
        study: 'discover'
      };
      expect(loadPersonalPreferences()).toEqual([metWords, userSettings, flashcardsMetWords, flashcardsProgress, lessonsProgress]);
    });
  });
});

// describe('writePersonalPreferences', () => {
//   describe('without localStorage', () => {
//     it('should log error', () => {
//       let metWords = { "hi": 0, "hey": 1 };
//       let userSettings = {
//         caseSensitive: true,
//         retainedWords: true,
//         limitNumberOfWords: 0,
//         newWords: true,
//         repetitions: 1,
//         showStrokes: true,
//         hideStrokesOnLastRepetition: false,
//         spacePlacement: 'spaceBeforeOutput',
//         sortOrder: 'sortRandom',
//         seenWords: true,
//         study: discover
//       };
//     });
//   });
// });

describe('processDictionary', () => {
  describe('without dictionary commands', () => {
    it('should return as it was', () => {
      let dictionary = { "design": "STKAOEUPB" };
      expect(processDictionary(dictionary)).toEqual({ "design": "STKAOEUPB" });
    });
  });
  describe('with dictionary commands', () => {
    it('should return with command characters stripped', () => {
      let dictionary = { "{^ ^}": "S-P" };
      expect(processDictionary(dictionary)).toEqual({ " ": "S-P" });
    });
  });
});

describe('swapKeyValueInDictionary', () => {
  it('should log error', () => {
    let dictionary = { "hi": "HEU", "HAEU": "hey" };
    expect(swapKeyValueInDictionary(dictionary)).toEqual({ "HEU": "hi", "hey": "HAEU" });
  });
});

describe('repetitionsRemaining', () => {
  describe('for 4 reps and 3 words', () => {
    const userSettings = {
      repetitions: 4
    };
    const presentedMaterial = [
      {phrase: 'apple', stroke: 'A*EPL'},           // 0 => 4    // 12 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 1 => 4    // 11 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 2 => 4    // 10 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 3 => 3    // 9 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 4 => 3    // 8 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 5 => 3    // 7 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 6 => 2    // 6 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 7 => 2    // 5 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 8 => 2    // 4 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 9 => 1    // 3 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 10 => 1   // 2 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'}       // 11 => 1   // 1 word remaining
    ]
    let currentPhraseID = 0;

    it('on first word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 0;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(4);
    });
    it('on third word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 2;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(4);
    });
    it('on fourth word, returns full reps minus 1', () => {
      currentPhraseID = 3;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(3);
    });
    it('on sixth word, returns full reps minus 1', () => {
      currentPhraseID = 5;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(3);
    });
    it('on seventh word, returns full reps minus 1', () => {
      currentPhraseID = 6;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(2);
    });
    it('on ninth word, returns full reps minus 1', () => {
      currentPhraseID = 8;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(2);
    });
    it('on tenth word, returns full reps minus 3', () => {
      currentPhraseID = 9;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
    it('on twelfth word, returns full reps minus 3', () => {
      currentPhraseID = 11;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
    it('on words higher than lesson length, returns 0 reps remaining', () => {
      currentPhraseID = 12;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(0);
    });

  });

  describe('for 1 rep and 3 words', () => {
    const userSettings = {
      repetitions: 1
    };
    const presentedMaterial = [
      {phrase: 'apple', stroke: 'A*EPL'},
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},
      {phrase: 'coffee', stroke: 'KOF/TPAOE'}
    ]
    let currentPhraseID = 0;

    it('on first word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 0;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
  });
});

describe('matchSplitText', () => {
  describe('case insensitive, ignore spacing', () => {
    let settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: false,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "And";
      const expected = ["and", "", "And", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for stroked multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "aswell  as";
      const expected = ["as well as", "", "aswell  as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing', () => {
      let settings = {ignoredChars: '^'};
      const expectedText = "over-the-^";
      const actualText = "over-the-";
      const expected = ["over-the-", "", "over-the-", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, no spacing', () => {
    const settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing', () => {
      const expectedText = "And";
      const actualText = "and";
      const expected = ["", "And", "", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "aswellAs";
      const expected = ["as well ", "as", "aswell", "As"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space before', () => {
    const settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceBefore',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, space before', () => {
      const expectedText = " and";
      const actualText = " ant";
      const expected = [" an", "d", " an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, space before', () => {
      const expectedText = " and";
      const actualText = " an";
      const expected = [" an", "d", " an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, space before', () => {
      const expectedText = " and";
      const actualText = " the";
      const expected = [" ", "and", " ", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, space before', () => {
      const expectedText = " and";
      const actualText = " and";
      const expected = [" and", "", " and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, space before', () => {
      const expectedText = " And";
      const actualText = " and";
      const expected = [" ", "And", " ", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked multi-word text, space before', () => {
      const expectedText = " as well as";
      const actualText = " as well as";
      const expected = [" as well as", "", " as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, space before', () => {
      const expectedText = " as well as";
      const actualText = "as well as";
      const expected = ["", " as well as", "", "as well as"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing', () => {
      let settings = {ignoredChars: '^'};
      const expectedText = " over-the-^";
      const actualText = " over-the-";
      const expected = [" over-the-", "", " over-the-", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space before, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceBefore',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space before', () => {
      const expectedText = " ^and";
      const actualText = " ant";
      const expected = [" ^an", "t", " an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, an ignored char, space before', () => {
      const expectedText = " and";
      const actualText = " ^an the";
      const expected = [" ", "and", " ", "^an the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space before', () => {
      const expectedText = " and^";
      const actualText = " an^";
      const expected = [" an", "d^", " an", "^"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, an ignored char, space before', () => {
      const expectedText = " -and";
      const actualText = " and";
      const expected = [" -and", "", " and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space before', () => {
      const expectedText = " -And";
      const actualText = " and";
      const expected = [" -", "And", " ", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space before', () => {
      const expectedText = " as^well^as";
      const actualText = " aswell as";
      const expected = [" as^well^", "as", " aswell", " as"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space after, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      simpleTypography: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceAfter',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space after', () => {
      const expectedText = "^and ";
      const actualText = "ant ";
      const expected = ["^an", "d ", "an", "t "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, an ignored char, space after', () => {
      const expectedText = "and ";
      const actualText = "and";
      const expected = ["and", " ", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space after', () => {
      const expectedText = "and^ ";
      const actualText = "and";
      const expected = ["and", "^ ", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, space after', () => {
      const expectedText = "and ";
      const actualText = "and ";
      const expected = ["and ", "", "and ", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space after', () => {
      const expectedText = "And ";
      const actualText = "and ";
      const expected = ["", "And ", "", "and "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space after', () => {
      const expectedText = "as^well^as ";
      const actualText = "aswell as ";
      const expected = ["as^well^", "as ", "aswell", " as "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for prefix with ignored chars, ignore spacing', () => {
      let settings = {ignoredChars: '^'};
      const expectedText = "over-the-^ ";
      const actualText = "over-the- ";
      const expected = ["over-the- ", "", "over-the- ", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space off, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      hideStrokesOnLastRepetition: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off', () => {
      const expectedText = " as^well^as";
      const actualText = " as  we ll as";
      const expected = [" as^well^as", "", " as  we ll as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off', () => {
      const expectedText = " as^well^as";
      const actualText = " as  we";
      const expected = [" as^we", "ll^as", " as  we", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    // it('splits typed text into matching and not matching text for typed text that matches but needs a trailing space, ignored caret, no added spaces to material', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and";
    //   const expected = ["and", "^ ", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with a trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and ";
    //   const expected = ["and^ ", "", "and ", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with no trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^";
    //   const actualText = "and";
    //   const expected = ["and^", "", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space off', () => {
    //   const expectedText = "and^ the";
    //   const actualText = "and the";
    //   const expected = ["and^ the", "", "and the", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });
  });
  // return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
});
