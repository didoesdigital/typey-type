import {
  addOutlinesToWordsInCombinedDict,
  chooseOutlineForPhrase,
  createStrokeHintForPhrase,
  generateListOfWordsAndStrokes,
  rankOutlines
} from './transformingDictionaries';

let globalLookupDictionary = new Map([
  ["{^^}", [["TK-LS", "typey-type.json"]]],
  ["example", [["KP-PL", "typey-type.json"]]],
  ["{^}™", [["TR*PL", "typey-type.json"], ["SPWO*L/TRAEUD/PHARBG", "typey-type.json"]]],
  ["™", [["PHOEPBLG/T*/PH*", "emoji.json"]]],
  ["<{^}", [["PWRABG", "typey-type.json"]]],
  ["<", [["HR*PB", "typey-type.json"]]],
  ["#{^}", [["HAERB", "typey-type.json"]]],
  // ["${^}", [["TK-PL", "typey-type.json"]]],
  ["$", [["TPHRORB", "typey-type.json"]]],
  ["--{^}", [["H-PBZ", "typey-type.json"]]],
  ["-{^}", [["H-PBS", "typey-type.json"]]],
  ["-", [["H*B", "typey-type.json"]]],
  ["{^-^}", [["H-PB", "typey-type.json"]]],
  ["<a href=\"{^}", [["A/HREF", "plover.json"]]],
  ["Object.{^}", [["O*B/P-P", "react.json"]]],
  ["\\{{^}", [["TPR-BGT", "typey-type.json"]]],
  ["flash[:{^}", [["TPHRARB/PWR-BGT", "ruby.json"]]],
  ["{>}http://{^}", [["HAOEPT", "typey-type.json"]]],
  ["{&%}", [["P*ERS", "typey-type.json"]]],
  ["{^}{#F1}{^}", [["1-BGS", "typey-type.json"]]],
  ["{^}:{^}", [["KHR-PB", "typey-type.json"]]],
  ["{^}^{^}", [["KR-RT", "typey-type.json"]]],
  ["{^}({^}", [["P*PB", "typey-type.json"]]],
  ["{~|‘^}", [["TP-P/TP-P", "typey-type.json"]]],
  ["{^~|’}", [["TP-L/TP-L", "typey-type.json"]]],
  ["{~|“^}", [["KW-GS/KW-GS", "typey-type.json"]]],
  ["{^~|”}", [["KR-GS/KR-GS", "typey-type.json"]]],
  ["a", [["AEU", "typey-type.json"]]],
  ["I", [["EU", "typey-type.json"]]],
  ["{^ ^}", [["S-P", "typey-type.json"]]],
  ["{?}", [["H-F", "typey-type.json"]]],
  ["?", [["KWEZ", "typey-type.json"]]],
  ["{,}", [["KW-BG", "typey-type.json"]]],
  ["{.}", [["TP-PL", "typey-type.json"]]],
  [".", [["PR-D", "typey-type.json"]]],
  ["Tom", [["TOPL", "typey-type.json"]]],
  ["heather", [["H*ET/*ER", "typey-type.json"]]],
  ["Tuesday", [["TAOUZ", "typey-type.json"]]],
  ["first", [["TPEUFRT", "typey-type.json"]]],
  ["3D", [["30*EUD", "typey-type.json"]]],
  ["address", [["A/TKRES", "typey-type.json"]]],
  ["bed", [["PWED", "typey-type.json"]]],
  ["bed,", [["PWED KW-BG", "typey-type.json"]]],
  ["man", [["PHAPB", "typey-type.json"]]],
  ["{!}", [["SKHRAPL", "typey-type.json"]]],
  ["and again", [["STKPWEPBG", "typey-type.json"]]],
  ["and", [["SKP", "typey-type.json"], ["APBD", "plover.json"]]],
  ["again", [["TKPWEPB", "typey-type.json"]]],
  ["media", [["PHO*EUD", "typey-type.json"]]],
  ["query", [["KWAOER/REU", "typey-type.json"]]],
  ["Sinatra", [["STPHAT/RA", "typey-type.json"]]],
  ["{^'}", [["AE", "typey-type.json"]]],
  ["push", [["PURB", "typey-type.json"]]],
  ["origin", [["O*RPBLG", "typey-type.json"]]],
  ["master", [["PHAFRT", "typey-type.json"]]],
  ["diff", [["TKEUF", "typey-type.json"]]],
  ["{--}", [["TK*RB", "typey-type.json"]]],
  ["cached", [["KAERBD", "typey-type.json"]]],
  ["{^>^}", [["A*EPBG", "typey-type.json"]]],
  ["{^<^}", [["AEPBG", "typey-type.json"]]],
  ["{^/^}", [["OEU", "typey-type.json"]]],
  ["title", [["TAOEULT", "typey-type.json"]]],
  ["learn", [["HRERPB", "typey-type.json"]]],
  ["oh{,}", [["OERBGS", "typey-type.json"]]],
  ["{,}like{,}", [["HRAO*EUBG", "typey-type.json"]]],
  ["lent", [["HREPBT", "typey-type.json"]]],
  ["scroll", [["SKROL", "typey-type.json"]]],
  ["farmer", [["TPAR/PHER", "typey-type.json"]]],
  ["{^~|\"}", [["KR-GS", "typey-type.json"]]],
  ["{~|\"^}", [["KW-GS", "typey-type.json"]]],
  ["it", [["T", "typey-type.json"]]],
  ["be", [["-B", "typey-type.json"]]],
  ["{be^}", [["BE", "typey-type.json"]]],
  ["{quasi-^}", [["KWAS/KWREU", "typey-type.json"]]],
  ["quasi", [["KWA/SEU", "typey-type.json"]]],
  ["experimental", [["SPAOERL", "typey-type.json"]]],
  ["{gly-^}", [["TKPWHRAOEU", "typey-type.json"]]],
  ["oxide", [["KPAOEUD", "typey-type.json"]]],
  ["{^ectomy}", [["EBGT/PHEU", "typey-type.json"]]],
  ["said", [["SAEUD", "typey-type.json"]]],
  ["computer", [["KPAOUR", "typey-type.json"]]],
  ["cat", [["KAT", "typey-type.json"]]],
  ["kettle", [["KET/*L", "typey-type.json"]]],
  ["can", [["K", "typey-type.json"]]],
  ["can't", [["K-PBT", "typey-type.json"]]],
  ["houses", [["HO*UFS", "typey-type.json"]]],
  ["her", [["HER", "typey-type.json"]]],
  ["long", [["HROPBG", "typey-type.json"]]],
  ["narrate", [["TPHAR/AEUT", "typey-type.json"]]],
  ["seethe", [["SAO*ET", "typey-type.json"]]],
  ["you", [["U", "typey-type.json"]]],
  ["store", [["STOR", "typey-type.json"]]],
  ["room", [["RAOPL", "typey-type.json"]]],
  ["{^room}", [["RAO*PL", "typey-type.json"]]],
  ["outside", [["OUDZ", "typey-type.json"]]],
  ["hit", [["HEUT", "typey-type.json"]]],
  ["miss", [["PHEUS", "typey-type.json"]]],
  ["hit-and-miss", [["H-PLS", "typey-type.json"]]],
  // ["buffet", [["PWUF/ET", "typey-type.json"]]],
  ["wandering", [["WAPBGD", "typey-type.json"],["WAPB/TKER/-G", "typey-type.json"]]], // currently pre-sorted to best stroke first
  ["lodge", [["HROPBLG", "typey-type.json"]]]
]);

describe('add outlines for words to combined lookup dict', () => {
  it('returns combined dict without misstrokes', () => {
    let dictContent = {
      "TO": "to",
      "O": "to",
      "SED": "said",
      "SAEUD": "said",
      "SOUPBD/-Z": "sounds",
      "SOUPBDZ": "sounds",
      "SOUPBSD": "sounds"
    };
    let combinedLookupDictionary = new Map();
    let dictName = "typey-type.json";
    let misstrokes = {
      "O": "to",
      "SED": "sed",
      "SOUPBSD": "sounds"
    };
    let expectedResult = new Map([
      ["to", [["TO", "typey-type.json"]]],
      ["said", [["SED", "typey-type.json"], ["SAEUD", "typey-type.json"]]],
      ["sounds", [["SOUPBD/-Z", "typey-type.json"], ["SOUPBDZ", "typey-type.json"]]]
    ]);
    expect(addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, misstrokes)).toEqual(expectedResult);
  })
})


describe('create stroke hint for phrase', () => {
  describe('returns string showing all the space or slash separated strokes to write a whole phrase', () => {
    it('showing "KPA/AEU KPA/TPAR/PHER" for "A Farmer"', () => {
      let wordOrPhraseMaterial = "A Farmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU KPA/TPAR/PHER");
    });

    it('showing "*EU/TP*P/A*/R*/PH*/*E/R*" for "iFarmer"', () => {
      let wordOrPhraseMaterial = "iFarmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("*EU/TP*P/A*/R*/PH*/*E/R*");
    });

    it('show full word hints for a phrase containing a word with an apostrophe', () => {
      let wordOrPhraseMaterial = "it can't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T K-PBT");
    });

    it('show full word hints for a phrase containing a word with an apostrophe and capitalisation', () => {
      let wordOrPhraseMaterial = "it Can't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T KPA/K-PBT");
    });

    it('show full word hints for a phrase of 12 words', () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU");
    });

    it('show hints for first 12 words of longer phrase', () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a a a";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU xxx");
    });

    it('with only punctuation dash', () => {
      let wordOrPhraseMaterial = '-';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H-PB");
    });

    it('with only punctuation at symbol', () => {
      let wordOrPhraseMaterial = '@';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWRAT");
    });

    it('with preceding double quotes and capital letter', () => {
      let wordOrPhraseMaterial = '"It';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS KPA*/T");
    });

    it('with preceding exclamation mark and unknown word', () => {
      let wordOrPhraseMaterial = '!foo';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL TP*/O*/O*");
    });

    it('with and unknown word and trailing exclamation mark', () => {
      let wordOrPhraseMaterial = 'foo!';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP*/O*/O* SKHRAPL");
    });

    it('with preceding double quotes and capital letter', () => {
      let wordOrPhraseMaterial = 'houses?" It';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F KR-GS KPA/T");
    });

    it('with trailing question mark', () => {
      let wordOrPhraseMaterial = 'houses?';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F");
    });

    it('with word that is a prefix and a word as a word with trailing punctuation', () => {
      let wordOrPhraseMaterial = 'be?';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F");
    });

    it('with word that is a prefix and a word as a word with multiple trailing punctuation', () => {
      let wordOrPhraseMaterial = "be?'";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F AE");
    });

    it('with word that is a prefix and a word as a prefix to a word', () => {
      let wordOrPhraseMaterial = "bekettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PWE/KET/*L");
    });

    it('with prefix that is also a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "quasi-experimental";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU/SPAOERL");
    });

    // TODO
    xit('with prefix that is also a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = 'and said: "You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKP SAEUD STPH-FPLT KW-GS KPA*/U");
    });

    // TODO
    xit('with prefix that is also a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "quasi-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with prefix that is not a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "gly-oxide";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KPAOEUD");
    });

    // TODO
    xit('with prefix that is not a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "gly-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with hyphenated compound word and suffix', () => {
      let wordOrPhraseMaterial = "computer-ectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPAOUR H-PB EBGT/PHEU");
    });

    it('with unhyphenated compound word and suffix', () => {
      let wordOrPhraseMaterial = "computerectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPAOUR/EBGT/PHEU");
    });

    it('with hyphenated compound word and existing words', () => {
      let wordOrPhraseMaterial = 'store-room';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STOR H-PB RAOPL");
    });

    it('with only a suffix', () => {
      let wordOrPhraseMaterial = "ectomy";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("EBGT/PHEU");
    });

    it('with hyphenated phrase', () => {
      let wordOrPhraseMaterial = 'a hit-and-miss';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS");
    });

    it('with hyphenated gibberish', () => {
      let wordOrPhraseMaterial = 'aaaa-aaaa';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("A*/A*/A*/A* H-PB A*/A*/A*/A*");
    });

    it('with hyphenated letters with some fingerspelling strokes', () => {
      let wordOrPhraseMaterial = 'c-ç';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KR* H-PB xxx");
    });

    it('with hyphenated letters without fingerspelling strokes', () => {
      let wordOrPhraseMaterial = 'ç-ç';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("xxx H-PB xxx");
    });

    it('with full stop, closing double quote, and capitalised word', () => {
      let wordOrPhraseMaterial = '." Outside';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("P-P KR-GS KPA/OUDZ");
    });

    // TODO:
    xit('with hyphenated phrase and trailing full stop', () => {
      let wordOrPhraseMaterial = 'a hit-and-miss.';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS TP-PL");
    });

    it('with preceding double quote', () => {
      let wordOrPhraseMaterial = '"you';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS U");
    });

    it('with word, full stop, space, double quote, and capital letter', () => {
      let wordOrPhraseMaterial = 'cat. "You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT P-P KW-GS KPA/U"); // ideally it would be KAT TP-PL KW-GS U
    });

    it('with word, full stop, double quote, space, and capital letter', () => {
      let wordOrPhraseMaterial = 'cat." You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT P-P KR-GS KPA/U"); // ideally it would be KAT TP-PL KR-GS U
    });

    it('with trailing full stop', () => {
      let wordOrPhraseMaterial = 'her.';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HER TP-PL");
    });
  });
});

describe('choose outline for phrase', () => {
  describe('returns array of chosen outline and number of lookup attempts', () => {
    it('simple example returns 1 attempt for KP-PL', () => {
      let wordOrPhrase = "example";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KP-PL", 1 ]);
    });

    it('P*ERS for {&%} percent', () => {
      let wordOrPhrase = "%";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "P*ERS", 1 ]);
    });

    // it('1-BGS for {^}{#F1}{^}', () => {
    //   let wordOrPhrase = "#F1";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "1-BGS", 1 ]);
    // });

    it('single closing curly quote ’ should match TP-L/TP-L', () => {
      let wordOrPhrase = "’";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TP-L/TP-L", 1 ]);
    });

    it('{^}:{^} with "KHR-PB" for colon with suppressed spaces like clock time', () => {
      let wordOrPhrase = ":";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KHR-PB", 1 ]);
    });

    it('{^}^{^} with "KR-RT" for caret with suppressed spaces', () => {
      let wordOrPhrase = "^";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "KR-RT", 1 ]);
    });

    it('{^}({^} with "PREPB" for opening parenthesis', () => {
      let wordOrPhrase = "(";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PREPB", 1 ]);
    });

    // THIS is what it ought to do with the strokes above but we're brute forcing single-letter
    // … lookups to use a fixed dictionary
    // it('{^}({^} with "P*PB" for opening parenthesis', () => {
    //   let wordOrPhrase = "(";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "P*PB", 1 ]);
    // });

    // it('for trademark symbol', () => {
    //   let wordOrPhrase = "™";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TR*PL", 1 ]);
    // });

    // it('for dollar with space, not suppressed should match "$"', () => {
    //   let wordOrPhrase = "$";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHRORB", 1 ]);
    // });

    it('for dollar with suppressed trailing space should match ${^}', () => {
      let wordOrPhrase = "$";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TK-PL", 1 ]);
    });

    it('for hash with suppressed trailing space', () => {
      let wordOrPhrase = "#";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HAERB", 1 ]);
    });

    it('for left angle bracket with suppressed space', () => {
      let wordOrPhrase = "<";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWRABG", 1 ]);
    });

    // describe('for left angle bracket with space, not suppressed', () => {
    //   let wordOrPhrase = "< ";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HR*PB", 1 ]);
    // });

    it('with OERBGS for oh,', () => {
      let wordOrPhrase = "oh,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "OERBGS", 1 ]);
    });

    it('with HRAO*EUBG for , like,', () => {
      let wordOrPhrase = ", like,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HRAO*EUBG", 1 ]);
    });

    it('with a hyphenated phrase', () => {
      let wordOrPhrase = "hit-and-miss";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "H-PLS", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "relent";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "RE/HREPBT", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "autoscroll";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "A*UT/SKROL", 1 ]);
    });

    it('with long', () => {
      let wordOrPhrase = "long";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBG", 1 ]);
    });

    it('with longing', () => {
      let wordOrPhrase = "longing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBG/-G", 1 ]);
    });

    // it('with multiple suffixes', () => {
    //   let wordOrPhrase = "buffetings";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "PWUF/ET/-G/-S", 1 ]);
    // });

    it('with WAPBGD/-S for wanderings', () => {
      let wordOrPhrase = "wanderings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "WAPBGD/-S", 1 ]);
    });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "seething";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "SAO*ET/-G", 1 ]);
    // });

    // it('with fingerspelling for a mistyped orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "seetheing";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "S*/*E/*E/T*/H*/*E/*EU/TPH*/TKPW*", 1 ]);
    // });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "narrating";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "TPHAR/AEUT/-G", 1 ]);
    // });

    // it('with orthography rule to replace e with ing', () => {
    //   let wordOrPhrase = "lodging";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G", 1 ]);
    // });

    // it('with orthography rule to replace e with ing and append an s', () => {
    //   let wordOrPhrase = "lodgings";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HROPBLG/-G/-S", 1 ]);
    // });
  });
});

describe('generate dictionary entries', () => {
  it('returns array of phrases and strokes for words', () => {
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and ', ' and', ' and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let globalLookupDictionary = new Map([
      ["a", [["AEU", "typey-type.json"]]],
      ["I", [["EU", "typey-type.json"]]],
      ["{^ ^}", [["S-P", "typey-type.json"]]],
      ["{?}", [["H-F", "typey-type.json"]]],
      ["{,}", [["KW-BG", "typey-type.json"]]],
      ["Tom", [["TOPL", "typey-type.json"]]],
      ["heather", [["H*ET/*ER", "typey-type.json"]]],
      ["Tuesday", [["TAOUZ", "typey-type.json"]]],
      ["first", [["TPEUFRT", "typey-type.json"]]],
      ["3D", [["30*EUD", "typey-type.json"]]],
      ["address", [["A/TKRES", "typey-type.json"]]],
      ["bed", [["PWED", "typey-type.json"]]],
      ["bed,", [["PWED KW-BG", "typey-type.json"]]],
      ["man", [["PHAPB", "typey-type.json"]]],
      ["{!}", [["SKHRAPL", "typey-type.json"]]],
      ["and again", [["STKPWEPBG", "typey-type.json"]]],
      ["and", [["SKP", "typey-type.json"], ["APBD", "plover.json"]]],
      ["again", [["TKPWEPB", "typey-type.json"]]],
      ["media", [["PHO*EUD", "typey-type.json"]]],
      ["query", [["KWAOER/REU", "typey-type.json"]]],
      ["Sinatra", [["STPHAT/RA", "typey-type.json"]]],
      ["{^'}", [["AE", "typey-type.json"]]],
      ["push", [["PURB", "typey-type.json"]]],
      ["origin", [["O*RPBLG", "typey-type.json"]]],
      ["master", [["PHAFRT", "typey-type.json"]]],
      ["diff", [["TKEUF", "typey-type.json"]]],
      ["{--}", [["TK*RB", "typey-type.json"]]],
      ["cached", [["KAERBD", "typey-type.json"]]],
      ["{^>^}", [["A*EPBG", "typey-type.json"]]],
      ["{^<^}", [["AEPBG", "typey-type.json"]]],
      ["{^/^}", [["OEU", "typey-type.json"]]],
      ["title", [["TAOEULT", "typey-type.json"]]],
      ["learn", [["HRERPB", "typey-type.json"]]]
    ]);

    expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionary)).toEqual(
      [
        {phrase: "a", stroke: "AEU"},
        {phrase: "A", stroke: "KPA/AEU"},
        {phrase: "i", stroke: "*EU"},
        {phrase: "I", stroke: "EU"},
        {phrase: " ", stroke: "S-P"},
        {phrase: "?", stroke: "H-F"},
        {phrase: "address", stroke: "A/TKRES"},
        {phrase: "tom", stroke: "HRO*ER/TOPL"},
        {phrase: "Heather", stroke: "KPA/H*ET/*ER"},
        {phrase: "TUESDAY", stroke: "*URP/TAOUZ"},
        {phrase: "FIRST", stroke: "*URP/TPEUFRT"},
        {phrase: "3D", stroke: "30*EUD"},
        {phrase: "bed,", stroke: "PWED KW-BG"}, // has exact entry in this test file
        {phrase: "man,", stroke: "PHAPB KW-BG"}, // does not have exact entry
        {phrase: "man!", stroke: "PHAPB SKHRAPL"},
        {phrase: "man?", stroke: "PHAPB H-F"},
        {phrase: "'bed'", stroke: "AE PWED AE"},
        {phrase: "'address'", stroke: "AE A/TKRES AE"},
        {phrase: "'Sinatra'", stroke: "AE STPHAT/RA AE"},
        {phrase: "'sinatra'", stroke: "AE HRO*ER/STPHAT/RA AE"},
        {phrase: "'confuzzled'", stroke: "AE KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK* AE"},
        {phrase: "and! and", stroke: "SKP SKHRAPL SKP"},
        {phrase: "andx and", stroke: "A*/TPH*/TK*/KP* SKP"},
        {phrase: "andx andx and", stroke: "A*/TPH*/TK*/KP* A*/TPH*/TK*/KP* SKP"}, // ideally this would include a space between fingerspelled words
        {phrase: "and ", stroke: "SKP"},
        {phrase: " and", stroke: "SKP"},
        {phrase: " and ", stroke: "SKP"},
        {phrase: "and again", stroke: "STKPWEPBG"},
        {phrase: "and man!", stroke: "SKP PHAPB SKHRAPL"},
        {phrase: "and man?", stroke: "SKP PHAPB H-F"},
        {phrase: "and again!", stroke: "SKP TKPWEPB SKHRAPL"}, // ideally this would produce "STKPWEPBG SKHRAPL"
        {phrase: "!", stroke: "SKHRAPL"},
        {phrase: "!!", stroke: "SKHRAPL SKHRAPL"},
        {phrase: "!man", stroke: "SKHRAPL PHAPB"}, // ideally this would produce "SKHRAPL TK-LS PHAPB"
        {phrase: "! man", stroke: "SKHRAPL PHAPB"},
        {phrase: "media query", stroke: "PHO*EUD KWAOER/REU"},
        {phrase: "push origin master", stroke: "PURB O*RPBLG PHAFRT"},
        {phrase: "diff -- cached", stroke: "TKEUF TK*RB KAERBD"},
        {phrase: "bed, man, and address", stroke: "PWED KW-BG PHAPB KW-BG SKP A/TKRES"},
        // {phrase: "ef eff ge", stroke: "*EF *E/TP*/TP* TKPW*/*E"},
        // {phrase: "ef eff eff ge", stroke: "*EF *E/TP*/TP*/S-P/*E/TP*/TP* TKPW*/*E"},
        // {phrase: "diff --cached", stroke: "TKEUF TK*RB TK-LS KAERBD"},
        // {phrase: "<title>Learn!</title>", stroke: "AEPBG/TAOEULT/A*EPBG/KPA*/HRERPB/SKHRAPL/AEPBG/OEU/TAOEULT/A*EPBG"}
      ]
    // expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionary)).toEqual(
    //   [
    //     {phrase: " ", stroke: "S-P", lookups: 1},
    //     {phrase: "?", stroke: "H-F", lookups: 1},
    //     {phrase: "address", stroke: "A/TKRES", lookups: 1},
    //     {phrase: "tom", stroke: "HRO*ER/TOPL", lookups: 1},
    //     {phrase: "Heather", stroke: "KPA/H*ET/*ER", lookups: 1},
    //     {phrase: "TUESDAY", stroke: "*URP/TAOUZ", lookups: 1},
    //     {phrase: "FIRST", stroke: "*URP/TPEUFRT", lookups: 1},
    //     {phrase: "bed,", stroke: "PWED KW-BG", lookups: 1}, // has exact entry in this test file
    //     {phrase: "man,", stroke: "PHAPB KW-BG", lookups: 3}, // does not have exact entry
    //     {phrase: "man!", stroke: "PHAPB SKHRAPL", lookups: 3},
    //     {phrase: "man?", stroke: "PHAPB H-F", lookups: 3},
    //     {phrase: "'bed'", stroke: "AE PWED AE", lookups: 4},
    //     {phrase: "'address'", stroke: "AE A/TKRES AE", lookups: 4},
    //     {phrase: "'Sinatra'", stroke: "AE STPHAT/RA AE", lookups: 4},
    //     {phrase: "'sinatra'", stroke: "AE HRO*ER/STPHAT/RA AE", lookups: 4},
    //     {phrase: "'confuzzled'", stroke: "AE xxx AE", lookups: 4},
    //     {phrase: "and! and", stroke: "SKP SKHRAPL SKP", lookups: 5},
    //     {phrase: "andx and", stroke: "xxx SKP", lookups: 3},
    //     {phrase: "andx andx and", stroke: "xxx xxx SKP", lookups: 4},
    //     {phrase: "and ", stroke: "SKP", lookups: 2},
    //     {phrase: " and", stroke: "SKP", lookups: 2},
    //     {phrase: " and ", stroke: "SKP", lookups: 2},
    //     {phrase: "and again", stroke: "STKPWEPBG", lookups: 1},
    //     {phrase: "and man!", stroke: "SKP PHAPB SKHRAPL", lookups: 4},
    //     {phrase: "and man?", stroke: "SKP PHAPB H-F", lookups: 4},
    //     {phrase: "and again!", stroke: "SKP TKPWEPB SKHRAPL", lookups: 4}, // ideally this would produce "STKPWEPBG SKHRAPL"
    //     {phrase: "!", stroke: "SKHRAPL", lookups: 1},
    //     {phrase: "!!", stroke: "SKHRAPL SKHRAPL", lookups: 3},
    //     {phrase: "!man", stroke: "SKHRAPL PHAPB", lookups: 3}, // ideally this would produce "SKHRAPL TK-LS PHAPB"
    //     {phrase: "! man", stroke: "SKHRAPL PHAPB", lookups: 3},
    //     {phrase: "media query", stroke: "PHO*EUD KWAOER/REU", lookups: 3},
    //     {phrase: "push origin master", stroke: "PURB O*RPBLG PHAFRT", lookups: 4},
    //     {phrase: "diff -- cached", stroke: "TKEUF TK*RB KAERBD", lookups: 4},
    //     // {phrase: "diff --cached", stroke: "TKEUF TK*RB TK-LS KAERBD"},
    //     // {phrase: "<title>Learn!</title>", stroke: "AEPBG/TAOEULT/A*EPBG/KPA*/HRERPB/SKHRAPL/AEPBG/OEU/TAOEULT/A*EPBG"}
    //   ]
    );
  });
});

describe('rank outlines', () => {
  describe('with duplicate outlines across dictionaries', () => {
    it('returns sorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKPWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ]);
    });
  });

  describe('with duplicate outlines across dictionaries', () => {
    it('returns unsorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKPWEUT/HUB", "code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKPWEUT/HUB", "code.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns shortest stroke', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWEUT/HUB", "typey-type.json"],
        ["TKWEUT/HUB", "code.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "GitHub")).toEqual([
        ["TKWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order, with more than 10 elements', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "exercises")).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "slept", prioritising T endings over D, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["SHREPT", "plover.json"],
        ["SHREPD", "plover.json"],
        ["SHREPT", "plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "slept")).toEqual([
        ["SHREPT", "plover.json"],
        ["SHREPT", "plover.json"],
        ["SHREPD", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "intermediate", prioritising T endings over D, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["EUPBT/PHAOED", "plover.json"],
        ["EUPBT/PHAOET", "plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "intermediate")).toEqual([
        ["EUPBT/PHAOET", "plover.json"],
        ["EUPBT/PHAOED", "plover.json"]
      ]);
    });

    it('returns sorted list of outlines for "credit card", prioritising T endings over D, except when the word ends in "d"', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KRED/EUT/KART", "plover.json"],
        ["KRED/EUT/KARD", "plover.json"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "credit card")).toEqual([
        ["KRED/EUT/KARD", "plover.json"],
        ["KRED/EUT/KART", "plover.json"]
      ]);
    });
  });
// T-FPB: plover.json
// TEFL: plover.json

  describe('with outlines with and without dashes', () => {
    it('returns sorted list of outlines for "test", including dashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T-FPB", "plover.json"],
        ["TEFL", "plover.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TEFL", "plover.json"],
        ["T-FPB", "plover.json"]
      ]);
    });
  });

  describe('with outlines with and without stars', () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT", "user.json"],
        ["TAEFT", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TAEFT", "user.json"],
        ["T*EFT", "user.json"]
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFT/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["TAEFT/TAEFTS", "user.json"],
        ["T*EFT/T*EFT", "user.json"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "test")).toEqual([
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ]);
    });
  });

  describe('with outlines with and without slashes', () => {
    it('returns sorted list of outlines for "grasshopper", penalising slashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["TKPWHRFRPBLG", "user.json"],
        ["TKPWHR*FRPBLG", "user.json"],
        ["TKPWRASZ/HOP", "user.json"],
        ["TKPWRASZ/HOP/ER", "user.json"],
        ["TKPWRASZ/HORP", "user.json"],
        ["TKPWRASZ/HOP/*ER", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "grasshopper")).toEqual([
        ["TKPWHRFRPBLG", "user.json"],
        ["TKPWHR*FRPBLG", "user.json"],
        ["TKPWRASZ/HOP", "user.json"],
        ["TKPWRASZ/HORP", "user.json"],
        ["TKPWRASZ/HOP/ER", "user.json"],
        ["TKPWRASZ/HOP/*ER", "user.json"],
      ]);
    });
  });

  describe('with prefix and suffix strokes', () => {
    it('returns sorted list of outlines for "upstarted", penalising briefs without affix strokes', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["UP/START/-D", "user.json"],
        ["UP/STARTD", "user.json"],
        ["AUP/START/*D", "user.json"],
        ["AUP/START/-D", "user.json"],
        ["AUP/STARTD", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upstarted")).toEqual([
        ["AUP/STARTD", "user.json"],
        ["UP/STARTD", "user.json"],
        ["AUP/START/-D", "user.json"],
        ["UP/START/-D", "user.json"],
        ["AUP/START/*D", "user.json"],
      ]);
    });
  });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "upholstery", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["AUP/HOELS/TREU", "condensed-strokes.json"],
  //     ];

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery")).toEqual([
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOELS/TREU", "typey-type.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //     ]);
  //   });
  // });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "satisfaction", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["SAEFBGS", "dict.json"],
  //       ["SA*EF", "user.json"],
  //       ["SEF/SAEBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEBGS", "typey-type.json"],
  //     ];

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, "upholstery")).toEqual([
  //       ["SA*EF", "user.json"],
  //       ["SAEBGS", "typey-type.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEFBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SEF/SAEBGS", "dict.json"]
  //     ]);
  //   });
  // });
});

