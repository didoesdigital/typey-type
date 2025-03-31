import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  personalDictionaries,
  testTypeyTypeExtras,
} from "./transformingDictionaries.fixtures";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";

import type { LookupDictWithNamespacedDicts } from "../../types";

const testTypeyTypeFull = { ...testTypeyTypeDict, ...testTypeyTypeExtras };

const globalLookupDictionary = createGlobalLookupDictionary(
  personalDictionaries,
  [[testTypeyTypeFull, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
);

const precedingChar = "";

describe("choose outline for phrase", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  describe("returns array of chosen outline and number of lookup attempts", () => {
    it("simple example returns 1 attempt for KP-PL", () => {
      let wordOrPhrase = "example";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "%";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "’";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = ":";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = ":";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "^";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "(";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "$";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "#";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "<";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "oh,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = ", like,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "hit-and-miss";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "relent";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "autoscroll";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "long";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "longing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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

    xit("with multiple suffixes", () => {
      let wordOrPhrase = "cuffings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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

    xit("with multi-syllable word with multiple suffixes", () => {
      let wordOrPhrase = "buffetings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "wanderings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "as";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForAs: LookupDictWithNamespacedDicts = new Map([
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
      let wordOrPhrase = "rest";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForRest: LookupDictWithNamespacedDicts =
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
      let wordOrPhrase = "into";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForInto: LookupDictWithNamespacedDicts =
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
      let wordOrPhrase = "get";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForGet: LookupDictWithNamespacedDicts = new Map(
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
      let wordOrPhrase = "a";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "A";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "i";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "I";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "trust";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForSituation: LookupDictWithNamespacedDicts =
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
      let wordOrPhrase = "maiden";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "0";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHROFRSfirst: LookupDictWithNamespacedDicts =
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
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHRUFRSfirst: LookupDictWithNamespacedDicts =
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
      const affixList = AffixList.getSharedInstance();

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
    xit('showing "TRAFL/HREUPBG" for "travelling" given "/HREUPBG": "ling"', () => {
      let wordOrPhrase = "travelling";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
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
      let wordOrPhrase = "optometrist's";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
    xit('showing "TRAFL/*LG" for "travelling" given "/*LG": "ling"', () => {
      let wordOrPhrase = "travelling";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
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
      let wordOrPhrase = "narrating";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "seething";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "seetheing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "binging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "bingeing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
      let wordOrPhrase = "lodging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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

    xit('with orthography rule to replace "e" with "ing" and append an "s" using multiple suffixes', () => {
      let wordOrPhrase = "lodgings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

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
