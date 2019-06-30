import {
  generateListOfWordsAndStrokes,
  rankOutlines
} from './transformingDictionaries';

describe('generate dictionary entries', () => {
  it('returns array of phrases and strokes for words', () => {
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and ', ' and', ' and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let sourceWordsAndStrokes = {
      "a": "AEU",
      "I": "EU",
      " ": "S-P",
      "?": "H-F",
      ",": "KW-BG",
      "Tom": "TOPL",
      "heather": "H*ET/*ER",
      "Tuesday": "TAOUZ",
      "first": "TPEUFRT",
      "3D": "30*EUD",
      "address": "A/TKRES",
      "bed": "PWED",
      "bed,": "PWED KW-BG",
      "man": "PHAPB",
      "!": "SKHRAPL",
      "and again": "STKPWEPBG",
      "and": "SKP",
      "again": "TKPWEPB",
      "media": "PHO*EUD",
      "query": "KWAOER/REU",
      "Sinatra": "STPHAT/RA",
      "'": "AE",
      "push": "PURB",
      "origin": "O*RPBLG",
      "master": "PHAFRT",
      "diff": "TKEUF",
      "--": "TK*RB",
      "cached": "KAERBD",
      ">": "A*EPBG",
      "<": "AEPBG",
      "/": "OEU",
      "title": "TAOEULT",
      "learn": "HRERPB"
    };

    expect(generateListOfWordsAndStrokes(wordList, sourceWordsAndStrokes)).toEqual(
      [
        {phrase: "a", stroke: "A*"},
        {phrase: "A", stroke: "A*P"},
        {phrase: "i", stroke: "*EU"},
        {phrase: "I", stroke: "*EUP"},
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
        {phrase: "'confuzzled'", stroke: "AE xxx AE"},
        {phrase: "and! and", stroke: "SKP SKHRAPL SKP"},
        {phrase: "andx and", stroke: "xxx SKP"},
        {phrase: "andx andx and", stroke: "xxx xxx SKP"},
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
    // expect(generateListOfWordsAndStrokes(wordList, sourceWordsAndStrokes)).toEqual(
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
        ["TKWEUT/HUB", "code.json"],
        ["TKPWEUT/HUB", "typey-type.json"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["KPER/SAOEUZ/-Z", "plover.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPERSZ", "typey-type.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
        ["KPERSZ", "typey-type.json"],
        ["KPERZ/-T", "briefs.json"],
        ["KPERZ/-S", "briefs.json"],
        ["KPERZ/-Z", "briefs.json"],
        ["ERBGS/SAOEUSZ", "plover.json"],
        ["KPER/SAOEUZ/-Z", "plover.json"]
      ]);
    });
  });

  describe('with outlines with and without stars', () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT", "user.json"],
        ["TAEFT", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
        ["TAEFT", "user.json"],
        ["T*EFT", "user.json"]
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFT/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
        ["TAEFT/TAEFTS", "user.json"],
        ["T*EFT/T*EFT", "user.json"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames = [
        ["T*EFT/T*EFT", "user.json"],
        ["TAEFTS/TAEFTS", "user.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames)).toEqual([
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

