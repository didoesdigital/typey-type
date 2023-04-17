import {
  addOutlinesToWordsInCombinedDict,
  generateListOfWordsAndStrokes,
} from "./transformingDictionaries";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";
import type { LookupDictWithNamespacedDicts } from "../../types";

const globalLookupDictionary = createAGlobalLookupDictionary(
  personalDictionaries,
  testTypeyTypeDict,
  testPloverDict
);

describe("add outlines for words to combined lookup dict", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns combined dict including misstrokes", () => {
    let dictContent = {
      "TO": "to",
      "O": "to",
      "SED": "said",
      "SAEUD": "said",
      "SOUPBD/-Z": "sounds",
      "SOUPBDZ": "sounds",
      "SOUPBSD": "sounds",
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
      [
        "to",
        [
          ["TO", "typey:typey-type.json"],
          ["O", "typey:typey-type.json"],
        ],
      ],
      [
        "said",
        [
          ["SED", "typey:typey-type.json"],
          ["SAEUD", "typey:typey-type.json"],
        ],
      ],
      [
        "sounds",
        [
          ["SOUPBD/-Z", "typey:typey-type.json"],
          ["SOUPBDZ", "typey:typey-type.json"],
          ["SOUPBSD", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      addOutlinesToWordsInCombinedDict(
        dictContent,
        combinedLookupDictionary,
        dictName,
        seenSet
      )
    ).toEqual([expectedResult, expectedSet]);
  });
});

describe("generate dictionary entries", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns array of phrases and strokes for top 100 words", () => {
    // prettier-ignore
    let top100Words = ['the', 'of', 'and', 'to', 'in', 'I', 'that', 'was', 'his', 'he', 'it', 'with', 'is', 'for', 'as', 'had', 'you', 'not', 'be', 'her', 'on', 'at', 'by', 'which', 'have', 'or', 'from', 'this', 'him', 'but', 'all', 'she', 'they', 'were', 'my', 'are', 'me', 'one', 'their', 'so', 'an', 'said', 'them', 'we', 'who', 'would', 'been', 'will', 'no', 'when', 'there', 'if', 'more', 'out', 'up', 'into', 'do', 'any', 'your', 'what', 'has', 'man', 'could', 'other', 'than', 'our', 'some', 'very', 'time', 'upon', 'about', 'may', 'its', 'only', 'now', 'like', 'little', 'then', 'can', 'should', 'made', 'did', 'us', 'such', 'a', 'great', 'before', 'must', 'two', 'these', 'see', 'know', 'over', 'much', 'down', 'after', 'first', 'Mr.', 'good', 'men'];

    expect(
      generateListOfWordsAndStrokes(top100Words, globalLookupDictionary)
    ).toEqual([
      { phrase: "the", stroke: "-T" },
      { phrase: "of", stroke: "-F" },
      { phrase: "and", stroke: "SKP" },
      { phrase: "to", stroke: "TO" },
      { phrase: "in", stroke: "TPH" },
      { phrase: "I", stroke: "EU" },
      { phrase: "that", stroke: "THA" },
      { phrase: "was", stroke: "WAS" },
      { phrase: "his", stroke: "HEUS" },
      { phrase: "he", stroke: "HE" },
      { phrase: "it", stroke: "T" },
      { phrase: "with", stroke: "W" },
      { phrase: "is", stroke: "S" },
      { phrase: "for", stroke: "TPOR" },
      { phrase: "as", stroke: "AZ" },
      { phrase: "had", stroke: "H" },
      { phrase: "you", stroke: "U" },
      { phrase: "not", stroke: "TPHOT" },
      { phrase: "be", stroke: "-B" },
      { phrase: "her", stroke: "HER" },
      { phrase: "on", stroke: "OPB" },
      { phrase: "at", stroke: "AT" },
      { phrase: "by", stroke: "PWEU" },
      { phrase: "which", stroke: "WEU" },
      { phrase: "have", stroke: "SR" },
      { phrase: "or", stroke: "OR" },
      { phrase: "from", stroke: "TPR" },
      { phrase: "this", stroke: "TH" },
      { phrase: "him", stroke: "HEUPL" },
      { phrase: "but", stroke: "PWUT" },
      { phrase: "all", stroke: "AUL" },
      { phrase: "she", stroke: "SHE" },
      { phrase: "they", stroke: "THE" },
      { phrase: "were", stroke: "WR" },
      { phrase: "my", stroke: "PHEU" },
      { phrase: "are", stroke: "R" },
      { phrase: "me", stroke: "PHE" },
      { phrase: "one", stroke: "WUPB" },
      { phrase: "their", stroke: "THAEUR" },
      { phrase: "so", stroke: "SO" },
      { phrase: "an", stroke: "APB" },
      { phrase: "said", stroke: "SED" },
      { phrase: "them", stroke: "THEPL" },
      { phrase: "we", stroke: "WE" },
      { phrase: "who", stroke: "WHO" },
      { phrase: "would", stroke: "WO" },
      { phrase: "been", stroke: "PW-PB" },
      { phrase: "will", stroke: "HR" },
      { phrase: "no", stroke: "TPHO" },
      { phrase: "when", stroke: "WHEPB" },
      { phrase: "there", stroke: "THR" },
      { phrase: "if", stroke: "TP" },
      { phrase: "more", stroke: "PHOR" },
      { phrase: "out", stroke: "OUT" },
      { phrase: "up", stroke: "UP" },
      { phrase: "into", stroke: "TPHAO" },
      { phrase: "do", stroke: "TKO" },
      { phrase: "any", stroke: "TPHEU" },
      { phrase: "your", stroke: "KWROUR" },
      { phrase: "what", stroke: "WHA" },
      { phrase: "has", stroke: "HAS" },
      { phrase: "man", stroke: "PHAPB" },
      { phrase: "could", stroke: "KO" },
      { phrase: "other", stroke: "OER" },
      { phrase: "than", stroke: "THAPB" },
      { phrase: "our", stroke: "OUR" },
      { phrase: "some", stroke: "SOPL" },
      { phrase: "very", stroke: "SRE" },
      { phrase: "time", stroke: "TAOEUPL" },
      { phrase: "upon", stroke: "POPB" },
      { phrase: "about", stroke: "PW" },
      { phrase: "may", stroke: "PHAE" },
      { phrase: "its", stroke: "EUTS" },
      { phrase: "only", stroke: "OEPBL" },
      { phrase: "now", stroke: "TPHOU" },
      { phrase: "like", stroke: "HRAOEUBG" },
      { phrase: "little", stroke: "HREUL" },
      { phrase: "then", stroke: "THEPB" },
      { phrase: "can", stroke: "K" },
      { phrase: "should", stroke: "SHO" },
      { phrase: "made", stroke: "PHAED" },
      { phrase: "did", stroke: "TK" },
      { phrase: "us", stroke: "US" },
      { phrase: "such", stroke: "SUFP" },
      { phrase: "a", stroke: "AEU" },
      { phrase: "great", stroke: "TKPWRAET" },
      { phrase: "before", stroke: "PW-FR" },
      { phrase: "must", stroke: "PHUFT" },
      { phrase: "two", stroke: "TWO" },
      { phrase: "these", stroke: "THEZ" },
      { phrase: "see", stroke: "SAOE" },
      { phrase: "know", stroke: "TPHOE" },
      { phrase: "over", stroke: "OEFR" },
      { phrase: "much", stroke: "PHUFP" },
      { phrase: "down", stroke: "TKOUPB" },
      { phrase: "after", stroke: "AF" },
      { phrase: "first", stroke: "TPEUFRT" },
      { phrase: "Mr.", stroke: "PHR-FPLT" },
      { phrase: "good", stroke: "TKPWAOD" },
      { phrase: "men", stroke: "PHEPB" },
    ]);
  });

  it("returns array of phrases and strokes for troublesome words", () => {
    // prettier-ignore
    let wordList = ['a', 'A', 'i', 'I', ' ', '?', 'address', 'tom', 'Heather', 'TUESDAY', 'FIRST', '3D', 'bed,', 'man,', 'man!', 'man?', "'bed'", "'address'", "'Sinatra'", "'sinatra'", "'confuzzled'", 'and! and', 'andx and', 'andx andx and', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff -- cached', 'bed, man, and address' ];
    // let wordList = [' ', '?', 'tom', 'Heather', 'TUESDAY', 'FIRST', 'bed,', 'man!', 'man?', "'sinatra'", 'and ', 'and again', 'and man!', 'and man?', 'and again!', '!', '!!', '!man', '! man', 'media query', 'push origin master', 'diff --cached', 'diff -- cached', '<title>Learn!</title>' ];

    let globalLookupDictionaryForMatchingCapitalisationAndPunctuation: LookupDictWithNamespacedDicts =
      new Map([
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
        // FIXME: space or slash stroke separators
        // ["bed,", [["PWED KW-BG", "typey:typey-type.json"]]],
        ["bed,", [["PWED/KW-BG", "typey:typey-type.json"]]],
        ["man", [["PHAPB", "typey:typey-type.json"]]],
        ["{!}", [["SKHRAPL", "typey:typey-type.json"]]],
        ["and again", [["STKPWEPBG", "typey:typey-type.json"]]],
        [
          "and",
          [
            ["SKP", "typey:typey-type.json"],
            ["APBD", "plover:plover.json"],
          ],
        ],
        ["again", [["TKPWEPB", "typey:typey-type.json"]]],
        ["media", [["PHO*EUD", "typey:typey-type.json"]]],
        ["query", [["KWAOER/REU", "typey:typey-type.json"]]],
        ["Sinatra", [["STPHAT/RA", "typey:typey-type.json"]]],
        // ["{^'}", [["AE", "typey:typey-type.json"]]],
        // ["{'^}", [["A*E", "typey:typey-type.json"]]],
        ["{^~|'}", [["AE", "typey:typey-type.json"]]],
        ["{~|'^}", [["A*E", "typey:typey-type.json"]]],
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
        ["learn", [["HRERPB", "typey:typey-type.json"]]],
      ]);

    expect(
      generateListOfWordsAndStrokes(
        wordList,
        globalLookupDictionaryForMatchingCapitalisationAndPunctuation
      )
    ).toEqual(
      [
        { phrase: "a", stroke: "AEU" },
        { phrase: "A", stroke: "KPA/AEU" },
        { phrase: "i", stroke: "*EU" },
        { phrase: "I", stroke: "EU" },
        { phrase: " ", stroke: "S-P" },
        { phrase: "?", stroke: "H-F" },
        { phrase: "address", stroke: "A/TKRES" },
        { phrase: "tom", stroke: "HRO*ER/TOPL" },
        { phrase: "Heather", stroke: "KPA/H*ET/*ER" },
        { phrase: "TUESDAY", stroke: "*URP/TAOUZ" },
        { phrase: "FIRST", stroke: "*URP/TPEUFRT" },
        { phrase: "3D", stroke: "30*EUD" },
        // FIXME: space or slash stroke separators
        // { phrase: "bed,", stroke: "PWED KW-BG" }, // has exact entry in this test file
        // { phrase: "man,", stroke: "PHAPB KW-BG" }, // does not have exact entry
        { phrase: "bed,", stroke: "PWED/KW-BG" }, // has exact entry in this test file
        { phrase: "man,", stroke: "PHAPB/KW-BG" }, // does not have exact entry
        { phrase: "man!", stroke: "PHAPB SKHRAPL" },
        { phrase: "man?", stroke: "PHAPB H-F" },
        { phrase: "'bed'", stroke: "AE PWED AE" },
        { phrase: "'address'", stroke: "AE A/TKRES AE" },
        { phrase: "'Sinatra'", stroke: "AE STPHAT/RA AE" },
        { phrase: "'sinatra'", stroke: "AE HRO*ER/STPHAT/RA AE" },
        {
          phrase: "'confuzzled'",
          stroke: "AE KAUPB/TP*/*U/STKPW*/STKPW*/HR*/-D AE",
        },
        { phrase: "and! and", stroke: "SKP SKHRAPL SKP" },
        { phrase: "andx and", stroke: "A*/TPH*/TK*/KP* SKP" },
        {
          phrase: "andx andx and",
          stroke: "A*/TPH*/TK*/KP* A*/TPH*/TK*/KP* SKP",
        }, // ideally this would include a space between fingerspelled words
        { phrase: "and again", stroke: "STKPWEPBG" },
        { phrase: "and man!", stroke: "SKP PHAPB SKHRAPL" },
        { phrase: "and man?", stroke: "SKP PHAPB H-F" },
        { phrase: "and again!", stroke: "SKP TKPWEPB SKHRAPL" }, // ideally this would produce "STKPWEPBG SKHRAPL"
        { phrase: "!", stroke: "SKHRAPL" },
        { phrase: "!!", stroke: "SKHRAPL SKHRAPL" },
        { phrase: "!man", stroke: "SKHRAPL PHAPB" }, // ideally this would produce "SKHRAPL TK-LS PHAPB"
        { phrase: "! man", stroke: "SKHRAPL PHAPB" },
        { phrase: "media query", stroke: "PHO*EUD KWAOER/REU" },
        { phrase: "push origin master", stroke: "PURB O*RPBLG PHAFRT" },
        { phrase: "diff -- cached", stroke: "TKEUF TK*RB KAERBD" },
        {
          phrase: "bed, man, and address",
          stroke: "PWED KW-BG PHAPB KW-BG SKP A/TKRES",
        },
        // {phrase: "ef eff ge", stroke: "*EF *E/TP*/TP* TKPW*/*E"},
        // {phrase: "ef eff eff ge", stroke: "*EF *E/TP*/TP*/S-P/*E/TP*/TP* TKPW*/*E"},
        // {phrase: "diff --cached", stroke: "TKEUF TK*RB TK-LS KAERBD"},
        // {phrase: "<title>Learn!</title>", stroke: "AEPBG/TAOEULT/A*EPBG/KPA*/HRERPB/SKHRAPL/AEPBG/OEU/TAOEULT/A*EPBG"}
      ]
        // FIXME: space or slash stroke separators: this should be removed after restoring space separator behaviour
        .map(({ phrase, stroke }) => ({
          phrase: phrase,
          stroke: stroke.replace(/ /g, "/"),
        }))
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
