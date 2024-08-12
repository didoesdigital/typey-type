import {
  createWordListFromMetWords,
  parseCustomMaterial,
  matchSplitText,
  lookUpDictionaryInIndex,
  mapQWERTYKeysToStenoStroke,
  strokeAccuracy,
  // writePersonalPreferences,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  repetitionsRemaining,
  runAllPersonalDictionariesMigrations,
  updateCapitalisationStrokesInNextItem
} from './typey-type';
import Zipper from './zipper';

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

describe('stroke accuracy for current phrase', () => {
  describe('should return false for real failed meetings', () => {
    it('you wrote cut instead of cat and Plover backtracked to " c"', () => {
      let currentPhraseAttempts = [
        {text: " ",    time: 1,},
        {text: " c",   time: 2,},
        {text: " cu",  time: 3,},
        {text: " cut", time: 4,},
        {text: " cu",  time: 5,},
        {text: " c",   time: 6,},
        {text: " ca",  time: 7,},
        {text: " cat", time: 8,},
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: " cut", time: 4}]});
    });

    it('you wrote cut instead of cat and Plover backtracked to " "', () => {
      let currentPhraseAttempts = [
        {text: " ",    time: 1,},
        {text: " c",   time: 2,},
        {text: " cu",  time: 3,},
        {text: " cut", time: 4,},
        {text: " cu",  time: 5,},
        {text: " c",   time: 6,},
        {text: " ",    time: 7,},
        {text: " c",   time: 8,},
        {text: " ca",  time: 9,},
        {text: " cat", time: 10,},
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: " cut", time: 4}]});
    });

    it('you wrote cut instead of cat and Plover backtracked to ""', () => {
      let currentPhraseAttempts = [
        {text: " ",     time: 1,},
        {text: " c",    time: 2,},
        {text: " cu",   time: 3,},
        {text: " cut",  time: 4,},
        {text: " cu",   time: 5,},
        {text: " c",    time: 6,},
        {text: " ",     time: 7,},
        {text: "",      time: 8,},
        {text: " ",     time: 9,},
        {text: " c",    time: 10,},
        {text: " ca",   time: 11,},
        {text: " cat",  time: 12,},
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: " cut", time: 4}]});
    });

    it('you wrote sign, ss, and ss for sciences', () => {
      let currentPhraseAttempts = [
        {text: " ",         time: 1,},
        {text: " s",        time: 2,},
        {text: " si",       time: 3,},
        {text: " sig",      time: 4,},
        {text: " sign",     time: 5,},
        {text: " sig",      time: 6,},
        {text: " si",       time: 7,},
        {text: " s",        time: 8,},
        {text: " ss",       time: 9,},
        {text: " s",        time: 10,},
        {text: " ss",       time: 11,},
        {text: " s",        time: 12,},
        {text: " sc",       time: 13,},
        {text: " sci",      time: 14,},
        {text: " scie",     time: 15,},
        {text: " scien",    time: 16,},
        {text: " scienc",   time: 17,},
        {text: " science",  time: 18,},
        {text: " sciences", time: 19,},
      ];
      let targetStrokeCount = 3;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [
        {text: " sign", time: 5},
        {text: " ss",   time: 9},
        {text: " ss",   time: 11},
      ]});
    });

    it('you wrote "verticax", "verticaw" for vertical', () => {
      let currentPhraseAttempts = [
        {text: " ",         time: 1},
        {text: " v",        time: 2},
        {text: " ve",       time: 3},
        {text: " ver",      time: 4},
        {text: " vert",     time: 5},
        {text: " verti",    time: 6},
        {text: " vertic",   time: 7},
        {text: " vertica",  time: 8},
        {text: " verticax", time: 9},
        {text: " verticaw", time: 10},
        {text: " vertical", time: 11},
      ];
      let targetStrokeCount = 2;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [
        {text: " verticax", time: 9},
        {text: " verticaw", time: 10},
      ]});
    });

    it("you wrote were instead of we're", () => {
      let currentPhraseAttempts = [
        {text: " ",    time: 1},
        {text: " w",   time: 2},
        {text: " we",  time: 3},
        {text: " wer", time: 4},
        // " wer",
        // " were",
        // " wer",
        // " we",
        // " w",
        // " ",
        // " w",
        // " we",
        // " we'",
        // " we'r",
        // " we're"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "r";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: " wer", time: 4}]});
    });

    it("you wrote x when trying to write courageous in 1 stroke, giving you a misstroke AND recording x in attempts for feedback", () => {
      let currentPhraseAttempts = [
        {text: "x", time: 1}
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "x";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: "x", time: 1}]});
    });

    it("you wrote cor when trying to write courageous in 1 stroke", () => {
      let currentPhraseAttempts = [
        {text: " ", time: 1},
        {text: " c", time: 2},
        {text: " co", time: 3},
        {text: " cor", time: 4},
        // " cor",
        // " co",
        // " c",
        // " ",
        // " c",
        // " co",
        // " cou",
        // " cour",
        // " coura",
        // " courag",
        // " courage",
        // " courageo",
        // " courageou",
        // " courageous"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "r";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [{text: " cor", time: 4}]});
    });

//     it("you wrote we're instead of were", () => {
//       let currentPhraseAttempts = [" ", " w", " we", " we'", " we'r", " we're", " we'r", " we'", " we", " w", " ", " w", " we", " wer", " were"];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });
    it("should detect attempts with overrun", () => {
      let currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " y", time: 2 },
        { text: " yo", time: 3 },
        { text: " you", time: 4 },
        { text: " your", time: 5 },
        { text: " yours", time: 6 },
        { text: " your", time: 7 },
        { text: " you", time: 8 }
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " yours", time: 6 }]
      });
    });
  });

  describe('should return true for real successful meetings', () => {
    it('you wrote sign and sciences for sciences with 3 stroke target', () => {
      let currentPhraseAttempts = [
        {text: " ",         time: 1},
        {text: " s",        time: 2},
        {text: " si",       time: 3},
        {text: " sig",      time: 4},
        {text: " sign",     time: 5},
        {text: " sig",      time: 6},
        {text: " si",       time: 7},
        {text: " s",        time: 8},
        {text: " sc",       time: 9},
        {text: " sci",      time: 10},
        {text: " scie",     time: 11},
        {text: " scien",    time: 12},
        {text: " scienc",   time: 13},
        {text: " science",  time: 14},
        {text: " sciences", time: 15},
    ];
      let targetStrokeCount = 3;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: true, attempts: [{text: " sign", time: 5}]});
    });

    it("you wrote sigh then sig when trying to write silent in 2 strokes", () => {
      let currentPhraseAttempts = [
        {text: " ",     time: 1},
        {text: " s",    time: 2},
        {text: " si",   time: 3},
        {text: " sig",  time: 4},
        {text: " sigh", time: 5},
        {text: " sig",  time: 5},
      ];
      let targetStrokeCount = 2;
      let unmatchedActual = "g";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: true, attempts: [{text: " sigh", time: 5}]});
    });
  });
});

describe('lookUpDictionaryInIndex', () => {
  let dictionaryIndex = [
    {
      "author": "Typey Type",
      "title": "Dictionary",
      "subtitle": "",
      "category": "Typey Type",
      "subcategory": "",
      "tagline": "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
      "link": "/typey-type/support#typey-type-dictionary",
      "path": "/dictionaries/typey-type/typey-type.json"
    },
    {
      "author": "Plover",
      "title": "Main Aug 16, 2017",
      "subtitle": "",
      "category": "Plover",
      "subcategory": "",
      "tagline": "Plover’s main dictionary from 16 August 2017",
      "link": "https://github.com/openstenoproject/plover/blob/5ae5bb98a6776daf5e3aee75cc5b24720e872c7c/plover/assets/main.json",
      "path": "/dictionaries/plover/main-16-aug-2017.json"
    },
    {
      "author": "Di Does Digital",
      "title": "Navigation",
      "subtitle": "",
      "category": "Di Does Digital",
      "subcategory": "",
      "tagline": "Di Does Digital’s Mac navigation dictionary lets you switch tabs, windows, and apps, as well as navigate and edit text efficiently. You can move your cursor by letter, word, or line, select while doing so, and also backspace or forward delete by character, word, or line.",
      "link": "https://github.com/dimonster/plover-dictionaries#navigation-dictionary",
      "path": "/dictionaries/didoesdigital/navigation.json"
    },
    {
      "author": "Typey Type",
      "title": "One-syllable words with simple keys",
      "subtitle": "",
      "category": "Fundamentals",
      "subcategory": "",
      "path": "/lessons/fundamentals/one-syllable-words-with-simple-keys/one-syllable-words-with-simple-keys.json"
    }
  ];

  describe('is in index', () => {
    it('should return dictionary metadata', () => {
      let path = "/dictionaries/plover/main-16-aug-2017/"
      expect(lookUpDictionaryInIndex(path, dictionaryIndex)).toEqual({
        author: "Plover",
        title: "Main Aug 16, 2017",
        subtitle: "",
        category: "Plover",
        subcategory: "",
        tagline: "Plover’s main dictionary from 16 August 2017",
        link: "https://github.com/openstenoproject/plover/blob/5ae5bb98a6776daf5e3aee75cc5b24720e872c7c/plover/assets/main.json",
        path: "/dictionaries/plover/main-16-aug-2017.json"
      });
    });
  });

  describe('is not in index', () => {
    it('should return dummy metadata', () => {
      let path = "/dictionaries/bad-path/bad-dict/";
      expect(lookUpDictionaryInIndex(path, dictionaryIndex)).toEqual({
        author: "Typey Type",
        title: 'Missing dictionary details',
        subtitle: "",
        category: "Typey Type",
        subcategory: "",
        tagline: "Loading dictionary details…",
        link: "/typey-type/support#typey-type-dictionary",
        path: "/dictionaries/typey-type/top-10.json"
      });
    });
  });
  describe('has a line with no tabs', () => {
    it('should return a lesson without that line', () => {
      let customMaterial = `testWithSpace TEFT
testWithTab	TEFT
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      }, "success", []]);
    });
  });
  describe('has a line with multiple tabs', () => {
    it('should return a lesson with the first stroke provided', () => {
      let customMaterial = `testWithTab	TEFT	TEFTD`;
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      }, "success", []]);
    });
  });
});

describe('parseCustomMaterial', () => {
  describe('has no content', () => {
    it('should return empty source material', () => {
      let customMaterial = "";
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
        path: '/lessons/custom'
      }, "fail", ["Your material needs at least 1 word"]]);
    });
  });
  describe('has no tabs', () => {
    it('should return empty source material', () => {
      let customMaterial = "test TEFT";
      expect(parseCustomMaterial(customMaterial)).toEqual([{
          sourceMaterial: [],
          presentedMaterial: [{phrase: '', stroke: ''}],
          settings: { ignoredChars: '' },
          title: 'Custom',
          subtitle: '',
              newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
                  path: '/lessons/custom'
        }, "fail", ["Your material needs at least 1 “Tab” character"]]);
    });
  });
  describe('has a tab but no word', () => {
    it('should return empty source material', () => {
      let customMaterial = "	TEFT";
      expect(parseCustomMaterial(customMaterial)).toEqual([{
          sourceMaterial: [],
          presentedMaterial: [{phrase: '', stroke: ''}],
          settings: { ignoredChars: '' },
          title: 'Custom',
          subtitle: '',
              newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
                  path: '/lessons/custom'
        }, "fail", ["Your material needs at least 1 word and 1 “Tab” character"]]);
    });
  });
  describe('has a line with no tabs', () => {
    it('should return a lesson without that line', () => {
      let customMaterial = `testWithSpace TEFT
testWithTab	TEFT
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      }, "success", []]);
    });
  });
  describe('has only lines with no tabs or no words', () => {
    it('should return empty lesson with fail message', () => {
      let customMaterial = `	TEFT
testWithNoTab
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
        path: '/lessons/custom'
      }, "fail", ["Your material needs at least 1 word and 1 “Tab” character"]]);
    });
  });
  describe('has a line with multiple tabs', () => {
    it('should return a lesson with the first stroke provided', () => {
      let customMaterial = `testWithTab	TEFT	TEFTD`;
      expect(parseCustomMaterial(customMaterial)).toEqual([{
        sourceMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        presentedMaterial: [{phrase: 'testWithTab', stroke: 'TEFT'}],
        settings: { ignoredChars: '' },
        title: 'Custom',
        subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: 'testWithTab', stroke: 'TEFT'}]),
        path: '/lessons/custom'
      }, "success", []]);
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
        // startFromWord: 1,
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

describe('mapQWERTYKeysToStenoStroke', () => {
  describe('American stroke with star', () => {
    it('should return as it was', () => {
      let qwertyString = 'dfchp';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'WRA*T';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with center vowels', () => {
    it('should return as it was', () => {
      let qwertyString = 'dc;';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'WAS';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with one right-side key that appears on both sides, without vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'dfj';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'WR-R';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with multiple right-side keys that appears on both sides, without vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'rop;';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'H-LTS';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with F and no vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'rfu';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'HR-F';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with F, P, and no vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'rfui';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = 'HR-FP';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American right-side stroke without vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'p';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = '-T';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American right-side stroke with one right-side key that appears on both sides, without vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'uj';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      // let stenoBriefClickedString = 'F-R';
      let stenoBrief = '-FR';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American right-side stroke with multiple right-side keys that appear on both sides, without vowels or star', () => {
    it('should return as it was', () => {
      let qwertyString = 'uiop';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      // let stenoBriefClickedString = 'F-PL-T';
      let stenoBrief = '-FPLT';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American right-side stroke with vowels', () => {
    it('should return as it was', () => {
      let qwertyString = 'nuj';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      // let stenoBriefClickedString = 'EF-R';
      let stenoBrief = 'EFR';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American right-side stroke with star', () => {
    it('should return as it was', () => {
      let qwertyString = 'hnuj[';
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = '*EFRD';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
  });

  describe('American number bar stroke', () => {
    it('should return as it was', () => {
      let qwertyString = "3'";
      let stenoLayout = 'stenoLayoutAmericanSteno';

      let stenoBrief = '#-Z';
      expect(mapQWERTYKeysToStenoStroke(qwertyString, stenoLayout).toString()).toEqual(stenoBrief);
    });
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
      startFromWord: 1,
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

    it("splits a word with excess chars", () => {
      const expectedText = "French";
      const actualText = "Frenches";
      const expected = ["French", "", "French", "es"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = "There";
      const actualText = "There are";
      const expected = ["There", "", "There", " are"];
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
      startFromWord: 1,
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
      startFromWord: 1,
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

    it("splits a word with excess chars", () => {
      const expectedText = " French";
      const actualText = " Frenches";
      const expected = [" French", "", " French", "es"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = " There";
      const actualText = " There are";
      const expected = [" There", "", " There", " are"];
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
      startFromWord: 1,
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
      startFromWord: 1,
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

    it("splits a word with excess chars", () => {
      const expectedText = "French ";
      const actualText = "Frenches ";
      const expected = ["French", " ", "French", "es "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it("splits multiple words", () => {
      const expectedText = "There ";
      const actualText = "There are ";
      const expected = ["There ", "", "There ", "are "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space off, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      startFromWord: 1,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      showStrokesAsDiagrams: false,
      showStrokesAsList: false,
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

describe('update capitalisation strokes in next item', () => {
  describe('where previous word ends in a letter', () => {
    let lastWord = "cat";

    // ` cat "A`
    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"A', stroke: 'KW-GS KPA/AEU'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"A',
          stroke: "KW-GS KPA*/AEU"
        })
      });
    });
  });

  // ` cat. "A`
  describe('where previous word ends in full stop', () => {
    let lastWord = "cat.";

    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"A', stroke: 'KW-GS KPA/AEU'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU"
        })
      });
    });
  });

  // ` request. When`
  describe('where previous word ends in full stop', () => {
    let lastWord = "request.";

    describe('where next item has quotes', () => {
      let nextItem = {phrase: 'When', stroke: 'KPA/WHEPB'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: 'When',
          stroke: "WHEPB"
        })
      });
    });
  });

  // ` cat… "A`
  describe('where previous word ends in an ellipsis', () => {
    let lastWord = "cat…";

    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"A', stroke: 'KW-GS KPA/AEU'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU"
        })
      });
    });
  });

  // ` everything." "Be`
  describe('where previous word ends in an ellipsis', () => {
    let lastWord = 'everything."';

    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"Be', stroke: 'KW-GS KPA/-B'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"Be',
          stroke: "KW-GS -B"
        })
      });
    });
  });

  // ` "Be everything."`
  describe('where previous word ends in an ellipsis', () => {
    let lastWord = '"Be';

    describe('where next item has quotes', () => {
      let nextItem = {phrase: 'everything."', stroke: 'EFG TP-PL KR-GS'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: 'everything."',
          stroke: "EFG TP-PL KR-GS"
        })
      });
    });
  });

  // ` said: "Be`
  describe('where previous word ends in a colon', () => {
    let lastWord = "said:";

    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"Be', stroke: 'KR-GS KPA/-B'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"Be',
          stroke: "KR-GS KPA*/-B"
        })
      });
    });
  });

  // ` cat… "A`
  describe('where previous word ends in an ellipsis', () => {
    let lastWord = "cat…";

    describe('where next item has quotes', () => {
      let nextItem = {phrase: '"A', stroke: 'KW-GS KPA/AEU'};
      it('removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke', () => {
        expect(updateCapitalisationStrokesInNextItem(nextItem, lastWord)).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU"
        })
      });
    });
  });
});

describe('migratePersonalDictionariesV', () => {
  let startingV0Dictionaries = [["personal.json",{"TAO*EUPT": "Typey Type"}]];
  let startingV1Dictionaries = {"v":"1","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"}]]};
  let migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);

  describe('runAllPersonalDictionariesMigrations', () => {
    let dirtyFlag = false;

    describe('where local storage had v0 format', () => {
      it('returns true dirty flag', () => {
        expect(runAllPersonalDictionariesMigrations(startingV0Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          true,
          null
        ])
      });
    });

    describe('where local storage had v1 format', () => {
      it('returns false dirty flag', () => {
        expect(runAllPersonalDictionariesMigrations(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          false,
          null
        ])
      });
    });
  });

  describe('v0 to v1', () => {
    let dirtyFlag = false;

    describe('where local storage had v0 format', () => {
      it('returns dictionary migrated to v1 and true dirty flag', () => {
        expect(migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          true
        ])
      });
    });

    describe('where local storage had v1 format', () => {
      it('returns same v1 dictionary and false dirty flag', () => {
        expect(migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          false
        ])
      });
    });
  });
});

// describe('migratePersonalDictionariesV', () => {
//   let startingV0Dictionaries = [["personal.json",{"TAO*EUPT": "Typey Type"}]];
//   let startingV1Dictionaries = {"v":"1","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"}]]};
//   let startingV2Dictionaries = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
//   let migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);
//   let migratedV2DictionariesWithExistingV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
//   let migratedV2DictionariesWithEmptyV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{}]]};

//   describe('runAllPersonalDictionariesMigrations', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns true dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns true dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       it('returns false dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });

//   describe('v0 to v1', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns dictionary migrated to v1 and dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns existing v1 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           false
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       it('returns existing v2 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });

//   describe('v1 to v2', () => {
//     describe('where local storage had v1 format', () => {
//       let dirtyFlag = false;
//       it('returns dictionary migrated to v2 and true dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v0 format and has just been migrated to v1', () => {
//       let dirtyFlag = true;
//       it('returns dictionary migrated to v2 and true dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       let dirtyFlag = false;
//       it('returns existing v2 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });
// });
