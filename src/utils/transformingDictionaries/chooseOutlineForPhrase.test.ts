import AFFIXES from "../affixes/affixes";
import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import {
  testGlobalLookupDictionary as globalLookupDictionary,
  testAffixes,
} from "./transformingDictionaries.fixtures";

import type { LookupDictWithNamespacedDicts } from "../../types";

const precedingChar = "";

describe("choose outline for phrase", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  beforeEach(() => {
    AFFIXES.setSharedAffixes(testAffixes);
  });

  afterEach(() => {
    AFFIXES.setSharedAffixes({ prefixes: [], suffixes: [] });
  });

  describe("returns array of chosen outline and number of lookup attempts", () => {
    it("simple example returns 1 attempt for KP-PL", () => {
      const wordOrPhrase = "example";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["KP-PL", 1]);
    });

    it("P*ERS for {&%} percent", () => {
      const wordOrPhrase = "%";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["P*ERS", 1]);
    });

    // it('1-BGS for {^}{#F1}{^}', () => {
    //   let wordOrPhrase = "#F1";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "1-BGS", 1 ]);
    // });

    it("single closing curly quote ’ should match TP-L/TP-L", () => {
      const wordOrPhrase = "’";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TP-L/TP-L", 1]);
    });

    it('{^}:{^} with "KHR-PB" for colon with suppressed spaces like clock time', () => {
      const wordOrPhrase = ":";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          "3"
        )
      ).toEqual(["KHR-PB", 1]);
    });

    it(': with "STPH-FPLT" for colon with un-suppressed spaces like said:', () => {
      const wordOrPhrase = ":";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          "d"
        )
      ).toEqual(["STPH-FPLT", 1]);
    });

    it('{^}^{^} with "KR-RT" for caret with suppressed spaces', () => {
      const wordOrPhrase = "^";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["KR-RT", 1]);
    });

    it('{^}({^} with "PREPB" for opening parenthesis', () => {
      const wordOrPhrase = "(";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PREPB", 1]);
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

    // eslint-disable-next-line no-template-curly-in-string
    it("for dollar with suppressed trailing space should match ${^}", () => {
      const wordOrPhrase = "$";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TK-PL", 1]);
    });

    it("for hash with suppressed trailing space", () => {
      const wordOrPhrase = "#";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HAERB", 1]);
    });

    it("for left angle bracket with suppressed space", () => {
      const wordOrPhrase = "<";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PWRABG", 1]);
    });

    // describe('for left angle bracket with space, not suppressed', () => {
    //   let wordOrPhrase = "< ";
    //   let chosenStroke = "";
    //   let strokeLookupAttempts = 0;

    //   expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts)).toEqual( [ "HR*PB", 1 ]);
    // });

    it("with OERBGS for oh,", () => {
      const wordOrPhrase = "oh,";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["OERBGS", 1]);
    });

    it("with HRAO*EUBG for , like,", () => {
      const wordOrPhrase = ", like,";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HRAO*EUBG", 1]);
    });

    it("with a hyphenated phrase", () => {
      const wordOrPhrase = "hit-and-miss";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["H-PLS", 1]);
    });

    it("with a prefix", () => {
      const wordOrPhrase = "relent";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["RE/HREPBT", 1]);
    });

    it("with a prefix", () => {
      const wordOrPhrase = "autoscroll";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["O*EUT/SKROL", 1]);
    });

    it("with long", () => {
      const wordOrPhrase = "long";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HROPBG", 1]);
    });

    it("with longing", () => {
      const wordOrPhrase = "longing";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HROPBG/-G", 1]);
    });

    it.skip("with multiple suffixes", () => {
      const wordOrPhrase = "cuffings";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["KUF/-G/-S", 1]);
    });

    it.skip("with multi-syllable word with multiple suffixes", () => {
      const wordOrPhrase = "buffetings";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PWUF/ET/-G/-S", 1]);
    });

    it("with WAPBGD/-S for wanderings", () => {
      const wordOrPhrase = "wanderings";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["WAPBGD/-S", 1]);
    });

    it('shows the outline for the word "as"', () => {
      const wordOrPhrase = "as";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryForAs: LookupDictWithNamespacedDicts = new Map([
        [
          "as",
          [
            ["TEFT/A/AZ", "typey:typey-type.json"],
            ["TEFT/AS", "typey:typey-type.json"],
            ["TEFT/ASZ", "typey:typey-type.json"],
            ["TEFT/AZ", "typey:typey-type.json"],
          ],
        ],
      ]);

      // maybe it would be nice to prioritise AZ over AS here…
      // not of prioritising S over Z endings…
      // instead reserving AS for {^s}{a^} per old dict:
      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryForAs,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TEFT/AS", 1]);
    });

    it('shows the outline for the word "rest"', () => {
      const wordOrPhrase = "rest";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryForRest: LookupDictWithNamespacedDicts =
        new Map([
          [
            "rest",
            [
              ["REFT", "typey:typey-type.json"],
              ["R*ES", "typey:typey-type.json"],
            ],
          ],
          ["REST", [["R*EFT", "typey:typey-type.json"]]],
        ]);

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryForRest,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["REFT", 1]);
    });

    it('shows the outline for the word "into"', () => {
      const wordOrPhrase = "into";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryForInto: LookupDictWithNamespacedDicts =
        new Map([
          [
            "into",
            [
              ["TEFT/TPHAO", "typey:typey-type.json"],
              ["TEFT/SPWAO", "typey:typey-type.json"],
              ["TEFT/EUPB/TO", "typey:typey-type.json"],
              ["TEFT/TPHAO*", "typey:typey-type.json"],
              ["TEFT/TPHRAO", "typey:typey-type.json"],
            ],
          ],
        ]);

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryForInto,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TEFT/TPHAO", 1]);
    });

    it('shows the outline for the word "get"', () => {
      const wordOrPhrase = "get";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryForGet: LookupDictWithNamespacedDicts = new Map(
        [
          [
            "get",
            [
              ["TKPW-T", "typey:typey-type.json"],
              ["TKPWET", "typey:top-10000-project-gutenberg-words.json"],
            ],
          ],
        ]
      );

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryForGet,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TKPWET", 1]);
    });

    it('shows the outline for the word "a"', () => {
      const wordOrPhrase = "a";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["AEU", 1]);
    });

    it('shows the outline for the word "A"', () => {
      const wordOrPhrase = "A";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["KPA/AEU", 1]);
    });

    it('shows the outline for the word "i"', () => {
      const wordOrPhrase = "i";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["*EU", 1]);
    });

    it('shows the outline for the word "I"', () => {
      const wordOrPhrase = "I";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["EU", 1]);
    });

    it('shows the outline for the word "trust"', () => {
      const wordOrPhrase = "trust";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryForSituation: LookupDictWithNamespacedDicts =
        new Map([
          [
            "trust",
            [
              ["TRUFT", "typey:typey-type.json"],
              ["TRUFT", "typey:top-10000-project-gutenberg-words.json"],
              ["TR*US", "plover:plover.json"],
              ["TRUF", "plover:plover.json"],
            ],
          ],
          ["Trust", [["TR*UFT", "plover:plover.json"]]],
        ]);

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryForSituation,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TRUFT", 1]);
    });

    it("shows actual suffix stroke for maiden", () => {
      const wordOrPhrase = "maiden";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PHAEUD/*EPB", 1]);
    });

    it("returns number strokes", () => {
      const wordOrPhrase = "0";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["#O", 1]);
    });
  });

  // FIXME: these probably shouldn't be so unstable
  describe("dictionaries in different orders", () => {
    it("returns outline for lovers, preferring O", () => {
      const wordOrPhrase = "lovers";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryWithHROFRSfirst: LookupDictWithNamespacedDicts =
        new Map([
          [
            "lovers",
            [
              ["HROFRS", "typey:typey-type.json"],
              ["HRUFRS", "typey:typey-type.json"],
            ],
          ],
        ]);

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryWithHROFRSfirst,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HROFRS", 1]);
    });

    it("returns outline for lovers, preferring U", () => {
      const wordOrPhrase = "lovers";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      const globalLookupDictionaryWithHRUFRSfirst: LookupDictWithNamespacedDicts =
        new Map([
          [
            "lovers",
            [
              ["HRUFRS", "typey:typey-type.json"],
              ["HROFRS", "typey:typey-type.json"],
            ],
          ],
        ]);

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionaryWithHRUFRSfirst,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HRUFRS", 1]);
    });
  });

  describe("dictionaries in different orders", () => {
    it("chooses an outline for a word or phrase", () => {
      const wordOrPhrase = "FIRST";
      const globalLookupDictionary: LookupDictWithNamespacedDicts = new Map([
        ["first", [["TPEUFRT", "typey:typey-type.json"]]],
        // ["{<}", [["*URP", "typey:typey-type.json"]]],
      ]);
      const chosenStroke = undefined;
      const strokeLookupAttempts = 0;
      const precedingChar = "";
      const affixList = AFFIXES.getSharedAffixes();

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar,
          affixList
        )
      ).toEqual(["*URP/TPEUFRT", 1]);
    });
  });

  describe("returns outline string with standard affixes", () => {
    it.skip('showing "TRAFL/HREUPBG" for "travelling" given "/HREUPBG": "ling"', () => {
      const wordOrPhrase = "travelling";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      // let globalLookupDictionary = new Map([
      //   ["{^ling}", [["HREUPBG", "typey-type.json"]]],
      //   ["travel", [["TRAFL", "typey-type.json"]]],
      // ]);
      // let affixes = {
      //   suffixes: [
      //     ["/HREUPBG", "ling"],
      //   ]
      // };

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TRAFL/HREUPBG", 1]);
    });
  });

  describe("returns outlines for words with apostrophes", () => {
    it('showing "OP/TOPL/TREUFT/AES" for "optometrist\'s"', () => {
      const wordOrPhrase = "optometrist's";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["OP/TOPL/TREUFT/AES", 1]);
    });
  });

  describe("returns outline string with custom affixes", () => {
    it.skip('showing "TRAFL/*LG" for "travelling" given "/*LG": "ling"', () => {
      const wordOrPhrase = "travelling";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;
      // let globalLookupDictionary = new Map([
      //   ["{^ling}", [["*LG", "dict-en-AU-vocab.json"]]],
      //   ["travel", [["TRAFL", "typey-type.json"]]],
      // ]);
      // let affixes = {
      //   suffixes: [
      //     ["/*LG", "ling"],
      //   ]
      // };

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TRAFL/*LG", 1]);
    });
  });

  describe("returns outline string with words using orthography rules", () => {
    // it('showing outline for "nellies"', () => {
    //   let wordOrPhraseMaterial = "nellies";
    //   expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TPHEL/KWREU/-S");
    // });

    it('with orthography rule to replace "e" with "ing"', () => {
      const wordOrPhrase = "narrating";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["TPHAR/AEUT/-G", 1]);
    });

    it('with orthography rule to find stroke after replacing "e" with "ing"', () => {
      const wordOrPhrase = "seething";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["SAO*ET/-G", 1]);
    });

    it('with a mistyped orthography rule to find stroke by appending "ing" to word otherwise ending in "e"', () => {
      const wordOrPhrase = "seetheing";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["SAO*ET/TK-LS/-G", 1]);
    });

    it('with orthography rule to replace "e" with "ing" where "eing" ending is also a word', () => {
      const wordOrPhrase = "binging";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PWEUPBG/-G", 1]);
    });

    it('with orthography rule to append "eing" where replacing "e" with "ing" is also a word', () => {
      const wordOrPhrase = "bingeing";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["PWEUPB/-PBLG/TK-LS/-G", 1]);
    });

    it('with orthography rule to replace "e" with "ing"', () => {
      const wordOrPhrase = "lodging";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HROPBLG/-G", 1]);
    });

    it.skip('with orthography rule to replace "e" with "ing" and append an "s" using multiple suffixes', () => {
      const wordOrPhrase = "lodgings";
      const chosenStroke = "";
      const strokeLookupAttempts = 0;

      expect(
        chooseOutlineForPhrase(
          wordOrPhrase,
          globalLookupDictionary,
          chosenStroke,
          strokeLookupAttempts,
          precedingChar
        )
      ).toEqual(["HROPBLG/-G/-S", 1]);
    });
  });
});
