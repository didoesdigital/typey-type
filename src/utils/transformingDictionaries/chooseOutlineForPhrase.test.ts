import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import { AffixList } from '../affixList';
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import type {
  LookupDictWithNamespacedDicts,
} from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(personalDictionaries, testTypeyTypeDict, testPloverDict);
const precedingChar = '';

describe('choose outline for phrase', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  describe('returns array of chosen outline and number of lookup attempts', () => {
    it('simple example returns 1 attempt for KP-PL', () => {
      let wordOrPhrase = "example";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "KP-PL", 1 ]);
    });

    it('P*ERS for {&%} percent', () => {
      let wordOrPhrase = "%";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "P*ERS", 1 ]);
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

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TP-L/TP-L", 1 ]);
    });

    it('{^}:{^} with "KHR-PB" for colon with suppressed spaces like clock time', () => {
      let wordOrPhrase = ":";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "KHR-PB", 1 ]);
    });

    it('{^}^{^} with "KR-RT" for caret with suppressed spaces', () => {
      let wordOrPhrase = "^";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "KR-RT", 1 ]);
    });

    it('{^}({^} with "PREPB" for opening parenthesis', () => {
      let wordOrPhrase = "(";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PREPB", 1 ]);
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
    it('for dollar with suppressed trailing space should match ${^}', () => {
      let wordOrPhrase = "$";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TK-PL", 1 ]);
    });

    it('for hash with suppressed trailing space', () => {
      let wordOrPhrase = "#";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HAERB", 1 ]);
    });

    it('for left angle bracket with suppressed space', () => {
      let wordOrPhrase = "<";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PWRABG", 1 ]);
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

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "OERBGS", 1 ]);
    });

    it('with HRAO*EUBG for , like,', () => {
      let wordOrPhrase = ", like,";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HRAO*EUBG", 1 ]);
    });

    it('with a hyphenated phrase', () => {
      let wordOrPhrase = "hit-and-miss";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "H-PLS", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "relent";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "RE/HREPBT", 1 ]);
    });

    it('with a prefix', () => {
      let wordOrPhrase = "autoscroll";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "A*UT/SKROL", 1 ]);
    });

    it('with long', () => {
      let wordOrPhrase = "long";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HROPBG", 1 ]);
    });

    it('with longing', () => {
      let wordOrPhrase = "longing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HROPBG/-G", 1 ]);
    });

    xit('with multiple suffixes', () => {
      let wordOrPhrase = "cuffings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "KUF/-G/-S", 1 ]);
    });

    xit('with multi-syllable word with multiple suffixes', () => {
      let wordOrPhrase = "buffetings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PWUF/ET/-G/-S", 1 ]);
    });

    it('with WAPBGD/-S for wanderings', () => {
      let wordOrPhrase = "wanderings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "WAPBGD/-S", 1 ]);
    });

    it('shows the outline for the word "as"', () => {
      let wordOrPhrase = "as";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForAs: LookupDictWithNamespacedDicts = new Map([
        ["as", [
          ["TEFT/A/AZ", "typey:typey-type.json"],
          ["TEFT/AS", "typey:typey-type.json"],
          ["TEFT/ASZ", "typey:typey-type.json"],
          ["TEFT/AZ", "typey:typey-type.json"],
        ]],
      ]);

      // maybe it would be nice to prioritise AZ over AS here…
      // not of prioritising S over Z endings…
      // instead reserving AS for {^s}{a^} per old dict:
      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForAs, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TEFT/AS", 1 ]);
    });

    it('shows the outline for the word "rest"', () => {
      let wordOrPhrase = "rest";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForRest: LookupDictWithNamespacedDicts = new Map([
        ["rest", [
          ["REFT", "typey:typey-type.json"],
          ["R*ES", "typey:typey-type.json"],
        ]],
        ["REST", [
          ["R*EFT", "typey:typey-type.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForRest, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "REFT", 1 ]);
    });

    it('shows the outline for the word "into"', () => {
      let wordOrPhrase = "into";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForInto: LookupDictWithNamespacedDicts = new Map([
        ["into", [
          ["TEFT/TPHAO", "typey:typey-type.json"],
          ["TEFT/SPWAO", "typey:typey-type.json"],
          ["TEFT/EUPB/TO", "typey:typey-type.json"],
          ["TEFT/TPHAO*", "typey:typey-type.json"],
          ["TEFT/TPHRAO", "typey:typey-type.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForInto, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TEFT/TPHAO", 1 ]);
    });

    it('shows the outline for the word "get"', () => {
      let wordOrPhrase = "get";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForGet: LookupDictWithNamespacedDicts = new Map([
        ["get", [
          ["TKPW-T", "typey:typey-type.json"],
          ["TKPWET", "typey:top-10000-project-gutenberg-words.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForGet, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TKPWET", 1 ]);
    });

    it('shows the outline for the word "a"', () => {
      let wordOrPhrase = "a";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "AEU", 1 ]);
    });

    it('shows the outline for the word "A"', () => {
      let wordOrPhrase = "A";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "KPA/AEU", 1 ]);
    });

    it('shows the outline for the word "i"', () => {
      let wordOrPhrase = "i";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "*EU", 1 ]);
    });

    it('shows the outline for the word "I"', () => {
      let wordOrPhrase = "I";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "EU", 1 ]);
    });

    it('shows the outline for the word "trust"', () => {
      let wordOrPhrase = "trust";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryForSituation: LookupDictWithNamespacedDicts = new Map([
        ["trust", [
          ["TRUFT", "typey:typey-type.json"],
          ["TRUFT", "typey:top-10000-project-gutenberg-words.json"],
          ["TR*US", "plover:plover.json"],
          ["TRUF", "plover:plover.json"],
        ]],
        ["Trust", [
          ["TR*UFT", "plover:plover.json"],
        ]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryForSituation, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TRUFT", 1 ]);
    });


    // TODO:
    // This one currently shows "PHAEUD/EPB" instead of "PHAEUD/*EPB" because "PHAEUD/*EPB" is
    // penalised 3 times: once for being "longer", once for having a star, once for having a slash,
    // while "PHAEUD/EPB" is penalised only for having a slash without being a suffix.
    xit('shows actual suffix stroke for maiden', () => {
      let wordOrPhrase = "maiden";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PHAEUD/*EPB", 1 ]);
    });

    // TODO: decide on showing numbers or letters with #
    xit('returns number strokes', () => {
      let wordOrPhrase = "0";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "#O", 1 ]);
    });
  });

  // FIXME: these probably shouldn't be so unstable
  describe('dictionaries in different orders', () => {
    it('returns outline for lovers, preferring O', () => {
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHROFRSfirst: LookupDictWithNamespacedDicts = new Map([
        ["lovers", [["HROFRS", "typey:typey-type.json"], ["HRUFRS", "typey:typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHROFRSfirst, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HROFRS", 1 ]);
    });

    it('returns outline for lovers, preferring U', () => {
      let wordOrPhrase = "lovers";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;
      let globalLookupDictionaryWithHRUFRSfirst: LookupDictWithNamespacedDicts = new Map([
        ["lovers", [["HRUFRS", "typey:typey-type.json"], ["HROFRS", "typey:typey-type.json"]]],
      ]);

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionaryWithHRUFRSfirst, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HRUFRS", 1 ]);
    });
  });
});
