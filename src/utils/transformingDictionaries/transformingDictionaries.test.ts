import {
  addOutlinesToWordsInCombinedDict,
  generateListOfWordsAndStrokes,
} from './transformingDictionaries';
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import rankOutlines from './rankOutlines/rankOutlines';
import { AffixList } from '../affixList';
import misstrokesJSON from '../../json/misstrokes.json'
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./createStrokeHintForPhrase.fixtures";
import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
  PersonalDictionaryNameAndContents,
  StrokeAndDictionaryAndNamespace,
} from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(personalDictionaries, testTypeyTypeDict, testPloverDict);
let sharedAffixes = AffixList.getSharedInstance();
const precedingChar = '';

describe('create a global lookup dictionary', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it('returns combined lookup Map of words with strokes and their source dictionaries', () => {
    let personalDicts: PersonalDictionaryNameAndContents[] = [["personal.json", {"TAO*EUPT": "Typey Type"}]];
    let typeyDict = {"SKP": "and"};
    let ploverDict = {
      "APBD": "and",
      "SKP": "and",
      "SP": "and",
    }
    let expectedGlobalDict = new Map([
      ['Typey Type', [
        ['TAO*EUPT', 'user:personal.json'],
      ]],
      ['and', [
        ['SKP', 'typey:typey-type.json'],
        ['APBD', 'plover:plover-main-3-jun-2018.json'],
        ['SKP', 'plover:plover-main-3-jun-2018.json'],
        ['SP', 'plover:plover-main-3-jun-2018.json']
      ]],
    ]);
    expect(createAGlobalLookupDictionary(personalDicts, typeyDict, ploverDict)).toEqual(expectedGlobalDict);
  })
});

describe('add outlines for words to combined lookup dict', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it('returns combined dict including misstrokes', () => {
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
    let dictName = "typey:typey-type.json";
    // let misstrokes = new Map(Object.entries({
    //   "O": "to",
    //   "SED": "sed",
    //   "SOUPBSD": "sounds"
    // }));
    let seenSet = new Set();
    let expectedSet = new Set();
    expectedSet.add("TO");
    expectedSet.add("O");
    expectedSet.add("SED");
    expectedSet.add("SAEUD");
    expectedSet.add("SOUPBD/-Z");
    expectedSet.add("SOUPBDZ");
    expectedSet.add("SOUPBSD");
    let expectedResult = new Map([
      ["to", [["TO", "typey:typey-type.json"],["O", "typey:typey-type.json"]]],
      ["said", [["SED", "typey:typey-type.json"], ["SAEUD", "typey:typey-type.json"]]],
      ["sounds", [["SOUPBD/-Z", "typey:typey-type.json"], ["SOUPBDZ", "typey:typey-type.json"], ["SOUPBSD", "typey:typey-type.json"]]]
    ]);
    expect(addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName, seenSet)).toEqual([expectedResult, expectedSet]);
  })
})

describe('choose outline for phrase', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
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

describe('generate dictionary entries', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it('returns array of phrases and strokes for top 100 words', () => {
    let top100Words = ['the', 'of', 'and', 'to', 'in', 'I', 'that', 'was', 'his', 'he', 'it', 'with', 'is', 'for', 'as', 'had', 'you', 'not', 'be', 'her', 'on', 'at', 'by', 'which', 'have', 'or', 'from', 'this', 'him', 'but', 'all', 'she', 'they', 'were', 'my', 'are', 'me', 'one', 'their', 'so', 'an', 'said', 'them', 'we', 'who', 'would', 'been', 'will', 'no', 'when', 'there', 'if', 'more', 'out', 'up', 'into', 'do', 'any', 'your', 'what', 'has', 'man', 'could', 'other', 'than', 'our', 'some', 'very', 'time', 'upon', 'about', 'may', 'its', 'only', 'now', 'like', 'little', 'then', 'can', 'should', 'made', 'did', 'us', 'such', 'a', 'great', 'before', 'must', 'two', 'these', 'see', 'know', 'over', 'much', 'down', 'after', 'first', 'Mr.', 'good', 'men'];

    expect(generateListOfWordsAndStrokes(top100Words, globalLookupDictionary)).toEqual(
      [
        {phrase: "the", stroke: "-T"},
        {phrase: "of", stroke: "-F"},
        {phrase: "and", stroke: "SKP"},
        {phrase: "to", stroke: "TO"},
        {phrase: "in", stroke: "TPH"},
        {phrase: "I", stroke: "EU"},
        {phrase: "that", stroke: "THA"},
        {phrase: "was", stroke: "WAS"},
        {phrase: "his", stroke: "HEUS"},
        {phrase: "he", stroke: "HE"},
        {phrase: "it", stroke: "T"},
        {phrase: "with", stroke: "W"},
        {phrase: "is", stroke: "S"},
        {phrase: "for", stroke: "TPOR"},
        {phrase: "as", stroke: "AZ"},
        {phrase: "had", stroke: "H"},
        {phrase: "you", stroke: "U"},
        {phrase: "not", stroke: "TPHOT"},
        {phrase: "be", stroke: "-B"},
        {phrase: "her", stroke: "HER"},
        {phrase: "on", stroke: "OPB"},
        {phrase: "at", stroke: "AT"},
        {phrase: "by", stroke: "PWEU"},
        {phrase: "which", stroke: "WEU"},
        {phrase: "have", stroke: "SR"},
        {phrase: "or", stroke: "OR"},
        {phrase: "from", stroke: "TPR"},
        {phrase: "this", stroke: "TH"},
        {phrase: "him", stroke: "HEUPL"},
        {phrase: "but", stroke: "PWUT"},
        {phrase: "all", stroke: "AUL"},
        {phrase: "she", stroke: "SHE"},
        {phrase: "they", stroke: "THE"},
        {phrase: "were", stroke: "WR"},
        {phrase: "my", stroke: "PHEU"},
        {phrase: "are", stroke: "R"},
        {phrase: "me", stroke: "PHE"},
        {phrase: "one", stroke: "WUPB"},
        {phrase: "their", stroke: "THAEUR"},
        {phrase: "so", stroke: "SO"},
        {phrase: "an", stroke: "APB"},
        {phrase: "said", stroke: "SED"},
        {phrase: "them", stroke: "THEPL"},
        {phrase: "we", stroke: "WE"},
        {phrase: "who", stroke: "WHO"},
        {phrase: "would", stroke: "WO"},
        {phrase: "been", stroke: "PW-PB"},
        {phrase: "will", stroke: "HR"},
        {phrase: "no", stroke: "TPHO"},
        {phrase: "when", stroke: "WHEPB"},
        {phrase: "there", stroke: "THR"},
        {phrase: "if", stroke: "TP"},
        {phrase: "more", stroke: "PHOR"},
        {phrase: "out", stroke: "OUT"},
        {phrase: "up", stroke: "UP"},
        {phrase: "into", stroke: "TPHAO"},
        {phrase: "do", stroke: "TKO"},
        {phrase: "any", stroke: "TPHEU"},
        {phrase: "your", stroke: "KWROUR"},
        {phrase: "what", stroke: "WHA"},
        {phrase: "has", stroke: "HAS"},
        {phrase: "man", stroke: "PHAPB"},
        {phrase: "could", stroke: "KO"},
        {phrase: "other", stroke: "OER"},
        {phrase: "than", stroke: "THAPB"},
        {phrase: "our", stroke: "OUR"},
        {phrase: "some", stroke: "SOPL"},
        {phrase: "very", stroke: "SRE"},
        {phrase: "time", stroke: "TAOEUPL"},
        {phrase: "upon", stroke: "POPB"},
        {phrase: "about", stroke: "PW"},
        {phrase: "may", stroke: "PHAE"},
        {phrase: "its", stroke: "EUTS"},
        {phrase: "only", stroke: "OEPBL"},
        {phrase: "now", stroke: "TPHOU"},
        {phrase: "like", stroke: "HRAOEUBG"},
        {phrase: "little", stroke: "HREUL"},
        {phrase: "then", stroke: "THEPB"},
        {phrase: "can", stroke: "K"},
        {phrase: "should", stroke: "SHO"},
        {phrase: "made", stroke: "PHAED"},
        {phrase: "did", stroke: "TK"},
        {phrase: "us", stroke: "US"},
        {phrase: "such", stroke: "SUFP"},
        {phrase: "a", stroke: "AEU"},
        {phrase: "great", stroke: "TKPWRAET"},
        {phrase: "before", stroke: "PW-FR"},
        {phrase: "must", stroke: "PHUFT"},
        {phrase: "two", stroke: "TWO"},
        {phrase: "these", stroke: "THEZ"},
        {phrase: "see", stroke: "SAOE"},
        {phrase: "know", stroke: "TPHOE"},
        {phrase: "over", stroke: "OEFR"},
        {phrase: "much", stroke: "PHUFP"},
        {phrase: "down", stroke: "TKOUPB"},
        {phrase: "after", stroke: "AF"},
        {phrase: "first", stroke: "TPEUFRT"},
        {phrase: "Mr.", stroke: "PHR-FPLT"},
        {phrase: "good", stroke: "TKPWAOD"},
        {phrase: "men", stroke: "PHEPB"},
      ]
    );
  });

  it('returns array of phrases and strokes for troublesome words', () => {
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and ', ' and', ' and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let globalLookupDictionaryForMatchingCapitalisationAndPunctuation = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["I", [["EU", "typey:typey-type.json"]]],
      ["{^ ^}", [["S-P", "typey:typey-type.json"]]],
      ["{?}", [["H-F", "typey:typey-type.json"]]],
      ["{,}", [["KW-BG", "typey:typey-type.json"]]],
      ["Tom", [["TOPL", "typey:typey-type.json"]]],
      ["heather", [["H*ET/*ER", "typey:typey-type.json"]]],
      ["Tuesday", [["TAOUZ", "typey:typey-type.json"]]],
      ["first", [["TPEUFRT", "typey:typey-type.json"]]],
      ["3D", [["30*EUD", "typey:typey-type.json"]]],
      ["address", [["A/TKRES", "typey:typey-type.json"]]],
      ["bed", [["PWED", "typey:typey-type.json"]]],
      ["bed,", [["PWED KW-BG", "typey:typey-type.json"]]],
      ["man", [["PHAPB", "typey:typey-type.json"]]],
      ["{!}", [["SKHRAPL", "typey:typey-type.json"]]],
      ["and again", [["STKPWEPBG", "typey:typey-type.json"]]],
      ["and", [["SKP", "typey:typey-type.json"], ["APBD", "plover:plover.json"]]],
      ["again", [["TKPWEPB", "typey:typey-type.json"]]],
      ["media", [["PHO*EUD", "typey:typey-type.json"]]],
      ["query", [["KWAOER/REU", "typey:typey-type.json"]]],
      ["Sinatra", [["STPHAT/RA", "typey:typey-type.json"]]],
      ["{^'}", [["AE", "typey:typey-type.json"]]],
      ["push", [["PURB", "typey:typey-type.json"]]],
      ["origin", [["O*RPBLG", "typey:typey-type.json"]]],
      ["master", [["PHAFRT", "typey:typey-type.json"]]],
      ["diff", [["TKEUF", "typey:typey-type.json"]]],
      ["{--}", [["TK*RB", "typey:typey-type.json"]]],
      ["cached", [["KAERBD", "typey:typey-type.json"]]],
      ["{^>^}", [["A*EPBG", "typey:typey-type.json"]]],
      ["{^<^}", [["AEPBG", "typey:typey-type.json"]]],
      ["{^/^}", [["OEU", "typey:typey-type.json"]]],
      ["title", [["TAOEULT", "typey:typey-type.json"]]],
      ["learn", [["HRERPB", "typey:typey-type.json"]]]
    ]);

    expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionaryForMatchingCapitalisationAndPunctuation)).toEqual(
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
    // expect(generateListOfWordsAndStrokes(wordList, globalLookupDictionaryForMatchingCapitalisationAndPunctuation)).toEqual(
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
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  describe('with duplicate outlines across dictionaries', () => {
    it('returns sorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["TKPWEUT/HUB", "code.json", "typey"],
        ["TKPWEUT/HUB", "typey-type.json", "typey"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "GitHub", sharedAffixes)).toEqual([
        ["TKPWEUT/HUB", "code.json", "typey"],
        ["TKPWEUT/HUB", "typey-type.json", "typey"]
      ]);
    });
  });

  describe('with duplicate outlines across dictionaries', () => {
    it('returns unsorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
        ["TKPWEUT/HUB", "code.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "GitHub", sharedAffixes)).toEqual([
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
        ["TKPWEUT/HUB", "code.json", "typey"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns shortest stroke', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
        ["TKWEUT/HUB", "code.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "GitHub", sharedAffixes)).toEqual([
        ["TKWEUT/HUB", "code.json", "typey"],
        ["TKPWEUT/HUB", "typey-type.json", "typey"]
      ]);
    });
  });

  describe('with different outlines across dictionaries', () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPERSZ", "typey-type.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"]
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPERSZ", "typey-type.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"]
      ]);
    });

    // Note: this test will fail with node v10
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order, with more than 10 elements', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPERSZ", "typey-type.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "exercises", sharedAffixes)).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"]
      ]);
    });

    it('returns sorted list of outlines for "slept", prioritising T endings over D, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["TEFT/SHREPT", "plover.json", "plover"],
        ["TEFT/SHREPD", "plover.json", "plover"],
        ["TEFT/SHREPT", "plover.json", "plover"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "slept", sharedAffixes)).toEqual([
        ["TEFT/SHREPT", "plover.json", "plover"],
        ["TEFT/SHREPT", "plover.json", "plover"],
        ["TEFT/SHREPD", "plover.json", "plover"]
      ]);
    });

    it('returns sorted list of outlines for "intermediate", prioritising T endings over D, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["EUPBT/PHAOED", "plover.json", "plover"],
        ["EUPBT/PHAOET", "plover.json", "plover"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "intermediate", sharedAffixes)).toEqual([
        ["EUPBT/PHAOET", "plover.json", "plover"],
        ["EUPBT/PHAOED", "plover.json", "plover"]
      ]);
    });

    it('returns sorted list of outlines for "credit card", prioritising T endings over D, except when the word ends in "d"', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["KRED/EUT/KART", "plover.json", "plover"],
        ["KRED/EUT/KARD", "plover.json", "plover"]
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "credit card", sharedAffixes)).toEqual([
        ["KRED/EUT/KARD", "plover.json", "plover"],
        ["KRED/EUT/KART", "plover.json", "plover"]
      ]);
    });
  });

  describe('with different outlines including misstrokes across dictionaries', () => {
    it('returns sorted list of outlines for "and", prioritising user, typey, plover namespaces, and by length', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["-PBD", "plover.json", "plover"],
        ["SP", "plover.json", "plover"],
        ["SKP", "plover.json", "plover"],
        ["APBD", "plover.json", "plover"],
        ["APBD", "dict.json", "typey"],
        ["SKP", "dict.json", "typey"],
        ["SKP", "dict.json", "user"],
        ["SK", "briefs.json", "user"],
      ];
      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "and", sharedAffixes)).toEqual([
        ["SK", "briefs.json", "user"],
        ["SKP", "dict.json", "user"],
        ["SKP", "dict.json", "typey"],
        ["APBD", "dict.json", "typey"],
        ["SP", "plover.json", "plover"],
        ["SKP", "plover.json", "plover"],
        ["APBD", "plover.json", "plover"],
        ["-PBD", "plover.json", "plover"],
      ]);
    });
  });

  describe('with different outlines including misstrokes across dictionaries', () => {
    it('returns sorted list of outlines for "cite", prioritising user, typey, plover namespaces, and good strokes over misstrokes of equal length', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["SKRAO*EUT", "plover.json", "plover"],
        ["KRAOEUR", "plover.json", "plover"],
        ["KRAOEUT", "plover.json", "plover"],
        ["SKRAO*EUT", "dict.json", "typey"],
        ["KRAOEUR", "dict.json", "typey"],
        ["KRAOEUT", "dict.json", "typey"],
        ["SAO*EUT", "briefs.json", "user"],
        ["SKRAOEUT", "briefs.json", "user"],
      ];
      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "cite", sharedAffixes)).toEqual([
        ["SAO*EUT", "briefs.json", "user"],
        ["SKRAOEUT", "briefs.json", "user"],
        ["KRAOEUT", "dict.json", "typey"],
        ["SKRAO*EUT", "dict.json", "typey"],
        ["KRAOEUR", "dict.json", "typey"],
        ["KRAOEUT", "plover.json", "plover"],
        ["SKRAO*EUT", "plover.json", "plover"],
        ["KRAOEUR", "plover.json", "plover"],

        // if S… entries were in misstrokes.json
        // ["SAO*EUT", "briefs.json", "user"],
        // ["SKRAOEUT", "briefs.json", "user"],
        // ["KRAOEUT", "dict.json", "typey"],
        // ["SKRAO*EUT", "dict.json", "typey"],
        // ["KRAOEUR", "dict.json", "typey"],
        // ["KRAOEUT", "plover.json", "plover"],
        // ["KRAOEUR", "plover.json", "plover"],
        // ["SKRAO*EUT", "plover.json", "plover"],
      ]);
    });
  });

  describe('with different outlines including misstrokes across dictionaries', () => {
    it('returns sorted list of outlines for "quiz", prioritising good strokes over misstrokes that are shorter', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["KWUZ", "plover.json", "plover"],
        ["KWEUZ", "plover.json", "plover"],
      ];
      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "quiz", sharedAffixes)).toEqual([
        ["KWEUZ", "plover.json", "plover"],
        ["KWUZ", "plover.json", "plover"],
      ]);
    });
  });

  describe('with different outlines including misstrokes across dictionaries', () => {
    it('returns sorted list of outlines for "he", prioritising user, typey, plover namespaces, and good strokes over misstrokes that are shorter', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["E", "magnum.json", "user"],
        ["HE", "plover.json", "plover"],
        ["E", "plover.json", "plover"],
        ["HE", "dict.json", "typey"],
      ];
      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "he", sharedAffixes)).toEqual([
        ["E", "magnum.json", "user"],
        ["HE", "dict.json", "typey"],
        ["HE", "plover.json", "plover"],
        ["E", "plover.json", "plover"],
      ]);
    });
  });

// T-FPB: plover.json
// TEFL: plover.json

  describe('with outlines with and without dashes', () => {
    it('returns sorted list of outlines for "test", including dashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["T-FPB", "plover.json", "plover"],
        ["TEFL", "plover.json", "plover"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "test", sharedAffixes)).toEqual([
        ["TEFL", "plover.json", "plover"],
        ["T-FPB", "plover.json", "plover"]
      ]);
    });
  });

  describe('with outlines with and without stars', () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["T*EFT", "user.json", "user"],
        ["TAEFT", "user.json", "user"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "test", sharedAffixes)).toEqual([
        ["TAEFT", "user.json", "user"],
        ["T*EFT", "user.json", "user"]
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["T*EFT/T*EFT", "user.json", "user"],
        ["TAEFT/TAEFTS", "user.json", "user"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "test", sharedAffixes)).toEqual([
        ["TAEFT/TAEFTS", "user.json", "user"],
        ["T*EFT/T*EFT", "user.json", "user"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["T*EFT/T*EFT", "user.json", "user"],
        ["TAEFTS/TAEFTS", "user.json", "user"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "test", sharedAffixes)).toEqual([
        ["T*EFT/T*EFT", "user.json", "user"],
        ["TAEFTS/TAEFTS", "user.json", "user"],
      ]);
    });
  });

  describe('with outlines with and without slashes', () => {
    it('returns sorted list of outlines for "grasshopper", penalising slashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["TKPWHRFRPBLG", "user.json", "user"],
        ["TKPWHR*FRPBLG", "user.json", "user"],
        ["TKPWRASZ/HOP", "user.json", "user"],
        ["TKPWRASZ/HOP/ER", "user.json", "user"],
        ["TKPWRASZ/HORP", "user.json", "user"],
        ["TKPWRASZ/HOP/*ER", "user.json", "user"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "grasshopper", sharedAffixes)).toEqual([
        ["TKPWHRFRPBLG", "user.json", "user"],
        ["TKPWHR*FRPBLG", "user.json", "user"],
        ["TKPWRASZ/HOP", "user.json", "user"],
        ["TKPWRASZ/HORP", "user.json", "user"],
        ["TKPWRASZ/HOP/ER", "user.json", "user"],
        ["TKPWRASZ/HOP/*ER", "user.json", "user"],
      ]);
    });
  });

  describe('with prefix and suffix strokes', () => {
    it('returns sorted list of outlines for "upstarted", penalising briefs without affix strokes, for default dicts', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["UP/START/-D", "plover.json", "plover"],
        ["UP/STARTD", "plover.json", "plover"],
        ["AUP/START/*D", "plover.json", "plover"],
        ["AUP/START/-D", "plover.json", "plover"],
        ["AUP/STARTD", "plover.json", "plover"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upstarted", sharedAffixes)).toEqual([
        ["AUP/STARTD", "plover.json", "plover"],
        ["UP/STARTD", "plover.json", "plover"],
        ["UP/START/-D", "plover.json", "plover"],
        ["AUP/START/-D", "plover.json", "plover"],
        ["AUP/START/*D", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "upstarted", penalising briefs without personal affix stroke, with personal dicts', () => {
      let sharedAffixes: AffixObject = {
        suffixes: [],
        prefixes: [
          ["UP/", "up" ], // from user dictionary… AffixList chooses the first affix in first inserted dictionary
        ]
      };

      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        ["UP/START/-D", "user.json", "user"],
        ["UP/STARTD", "user.json", "user"],
        ["AUP/START/-D", "user.json", "user"],
        ["AUP/START/*D", "typey.json", "typey"],
        ["AUP/START/-D", "typey.json", "typey"],
        ["AUP/STARTD", "typey.json", "typey"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upstarted", sharedAffixes)).toEqual([
        ["UP/STARTD", "user.json", "user"],
        ["UP/START/-D", "user.json", "user"],
        ["AUP/START/-D", "user.json", "user"],
        ["AUP/STARTD", "typey.json", "typey"],
        ["AUP/START/-D", "typey.json", "typey"],
        ["AUP/START/*D", "typey.json", "typey"],
      ]);
    });
  });

  describe('with gutenberg entries', () => {
    it('returns sorted list of outlines for "get" where the gutenberg entry comes first', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] = [
        // ["TKWET", "misstrokes.json"],
        // ["TPWET", "misstrokes.json"],
        // ["TKPWHET", "misstrokes.json"],
        // ["TKPWETD", "misstrokes.json"],
        ["TKPWET", "top-10000-project-gutenberg-words.json", "typey"],
        ["TKPW-T", "typey-type.json", "typey"],
        // ["TKPWELT", "misstrokes.json"],
        // ["TKPET", "misstrokes.json"],
      ];

      expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upstarted", sharedAffixes)).toEqual([
        ["TKPWET", "top-10000-project-gutenberg-words.json", "typey"],
        ["TKPW-T", "typey-type.json", "typey"],
        // ["TKWET", "misstrokes.json"],
        // ["TPWET", "misstrokes.json"],
        // ["TKPET", "misstrokes.json"],
        // ["TKPWETD", "misstrokes.json"],
        // ["TKPWHET", "misstrokes.json"],
        // ["TKPWELT", "misstrokes.json"],
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upholstery", sharedAffixes)).toEqual([
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

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upholstery", sharedAffixes)).toEqual([
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

