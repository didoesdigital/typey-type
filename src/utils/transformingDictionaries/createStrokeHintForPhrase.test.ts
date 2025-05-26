import misstrokesJSON from "../../json/misstrokes.json";
import createStrokeHintForPhrase from "./createStrokeHintForPhrase";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import {
  testGlobalLookupDictionary as globalLookupDictionary,
  testAffixes,
} from "./transformingDictionaries.fixtures";
import AFFIXES from "../affixes/affixes";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import getAffixMisstrokesFromMisstrokes from "../affixes/getAffixMisstrokesFromMisstrokes";
import getAffixesFromLookupDict from "../affixes/getAffixesFromLookupDict";

import type {
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../types";

const misstrokes = misstrokesJSON as StenoDictionary;

describe("create stroke hint for phrase", () => {
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

  describe("returns string showing all the space or slash separated strokes to write a whole phrase", () => {
    it('showing slash separated words with capitalisation strokes for "A Farmer"', () => {
      // Note: we used to do space-separated strokes for separate words but that caused dictionary issues so now it's all slashes all the time
      // it('showing "KPA/AEU KPA/TPAR/PHER" for "A Farmer"', () => {
      let wordOrPhraseMaterial = "A Farmer";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU KPA/TPAR/PHER");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/AEU/KPA/TPAR/PHER");
    });

    it('showing sensible slash separated strokes for "iFarmer"', () => {
      let wordOrPhraseMaterial = "iFarmer";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("*EU/KPA*/TPAR/PHER");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWR*EU/KPA*/TPAR/PHER");
    });

    it("showing hint word starting with apostrophe using dictionary formatting symbols", () => {
      let wordOrPhraseMaterial = "'twas";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TWA*S");
    });

    it("show full word hints for a phrase ending with apostrophe and ess when the exact condensed stroke entry exists", () => {
      let wordOrPhraseMaterial = "gentlemen's";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SKWR*EPL/AES");
    });

    it("show full word hints for a phrase ending with apostrophe and ess when there is no condensed stroke entry", () => {
      let wordOrPhraseMaterial = "optometrist's";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("OP/TOPL/TREUFT/AES");
    });

    it("show full word hints for a phrase containing two words ending with apostrophe and ess when there are no condensed stroke entries", () => {
      let wordOrPhraseMaterial = "podiatrist's optometrist's";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("POED/TREUFT/AES OP/TOPL/TREUFT/AES");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("POED/TREUFT/AES/OP/TOPL/TREUFT/AES");
    });

    it("show full word hints for a phrase containing a capitalised word with an apostrophe", () => {
      let wordOrPhraseMaterial = "Isn't";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/S-PBT");
    });

    it("show full word hints for a phrase containing a word with an apostrophe", () => {
      let wordOrPhraseMaterial = "it can't";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T K-PBT");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("T/K-PBT");
    });

    it("show full word hints for a phrase containing a word with an apostrophe and capitalisation", () => {
      let wordOrPhraseMaterial = "it Can't";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("T KPA/K-PBT");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("T/KPA/K-PBT");
    });

    it("show full word hints for a phrase of 12 words", () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU");
    });

    it("show hints for first 12 words of longer phrase before stopping at stroke limit", () => {
      let wordOrPhraseMaterial = "a a a a a a a a a a a a a a";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU AEU xxx");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/xxx");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU xxx");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU/AEU");
    });

    it("show hints for first 12 words of longer phrase with different splits before stopping at stroke limit", () => {
      let wordOrPhraseMaterial =
        "one—two,3 4-5\"6'7:eight;nine.ten®eleven?twelve!thirteen+fourteen";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("WUPB/EPL/TKA*RB/TWO/KW-BG/#P/#H/H-PB/#A/KR-GS/#F/AE/#-P/ xxx");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("WUPB/EPL/TKA*RB/TWO/KW-BG/#P/#H/H-PB/R5/KR-GS/#F/AE/#-P/ xxx");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("WUPB/EPL/TKA*RB/TWO/KW-BG/#P/#H/H-PB/R5/KR-GS/#F/AE/#-P");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("WUPB/EPL/TKA*RB/TWO/KW-BG/#P-/#H/H-PB/R5/KR-GS/#F/AE/#-P/KHR-PB/*E");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual(
        "WUPB/EPL/TKA*RB/TWO/KW-BG/#P-/#H/H-PB/#A/KR-GS/#F/AE/#-P/KHR-PB/*E/*EU/TKPW*/H*/T*/STPH*FPLT/TPH*"
      );
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("WUPB/EPL/TKA*RB/TWO/KW-BG/#P-/#H/H-PB/#A/KR-GS/#F/AE/#-P/KHR-PB/AOE/KWR*EU/TKPW*/H*/T*/STPH*FPLT/TPH*");
    });

    it("with only punctuation dash", () => {
      let wordOrPhraseMaterial = "-";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("H-PB");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H*B");
    });

    it("with only punctuation at symbol", () => {
      let wordOrPhraseMaterial = "@";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SKWRAT");
    });

    it("with preceding double quotes and capital letter", () => {
      let wordOrPhraseMaterial = '"It';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS KPA*/T");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KW-GS/KPA*/T");
    });

    it("with preceding double quotes, capital letter, and exclamation", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = '"Poetry!';
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "POEURT": "poetry",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        )
      ).toEqual("KW-GS/KPA*/POEURT/SKHRAPL");
    });

    it("with brief for word and comma, as well as preceding double quotes", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = '"Ah,';
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AERBGS": "ah,",
                "HA*E": "ah",
                "KW-BG": "{,}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        )
      ).toEqual("KW-GS/KPA*/AERBGS");
    });

    it("with brief for word and comma", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "Ah,";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AERBGS": "ah,",
                "HA*E": "ah",
                "KW-BG": "{,}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        )
      ).toEqual("KPA/AERBGS");
    });

    it("with preceding exclamation mark and unknown word", () => {
      let wordOrPhraseMaterial = "!foo";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL TP*/O*/O*");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL/TP*/O*/O*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("SKHRAPL/TP*/KWRO/KWRO");
      ).toEqual("SKHRAPL/TP*/SKWRAO");
    });

    it("with and unknown word and trailing exclamation mark", () => {
      let wordOrPhraseMaterial = "foo!";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP*/O*/O* SKHRAPL");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP*/O*/O*/SKHRAPL");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("TP*/KWRO/KWRO/SKHRAPL");
      ).toEqual("TP*/SKWRAO/SKHRAPL");
    });

    it("with preceding double quotes and capital letter", () => {
      let wordOrPhraseMaterial = 'houses?" It';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F KR-GS KPA/T");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HO*UFS/H-F/KR-GS/KPA/T");
    });

    it("with trailing question mark", () => {
      let wordOrPhraseMaterial = "houses?";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HO*UFS H-F");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HO*UFS/H-F");
    });

    it("with word that is a prefix and a word as a word with trailing punctuation", () => {
      let wordOrPhraseMaterial = "be?";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("-B/H-F");
    });

    it("with word that is a prefix and a word as a word with multiple trailing punctuation", () => {
      let wordOrPhraseMaterial = "be?'";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("-B H-F AE");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("-B/H-F/AE");
    });

    it("with word that is a prefix and a word as a prefix to a word", () => {
      let wordOrPhraseMaterial = "bekettle";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PWE/KET/*L");
    });

    it("with prefix that is also a word that has trailing hyphen and a word", () => {
      let wordOrPhraseMaterial = "quasi-experimental";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KWAS/KWREU/SPAOERL");
    });

    it("with prefix that includes a hyphen and a word", () => {
      let wordOrPhraseMaterial = "re-cover";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("R*E/KOFR");
    });

    it("with prefix that includes a hyphen and a gibberish word", () => {
      let wordOrPhraseMaterial = "self-dckx";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SEF/TK*/KR*/K*/KP*");
    });

    it("with prefix that is also a word that has trailing hyphen and a fake word", () => {
      let wordOrPhraseMaterial = "quasi-confuzzled";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("KWAS/KWREU/KAUPB/TP*/*U/STKPW*/STKPW*/HR*/-D");
      ).toEqual("KWAS/KWREU/KAUPB/TP*/*U/STKPW*/STKPW*/*LD");
    });

    it("with prefix that is not a word that has trailing hyphen and a word", () => {
      let wordOrPhraseMaterial = "gly-oxide";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TKPWHRAOEU/KPAOEUD");
    });

    it("with prefix that is not a word that has trailing hyphen and a fake word", () => {
      let wordOrPhraseMaterial = "gly-confuzzled";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("TKPWHRAOEU/KAUPB/TP*/*U/STKPW*/STKPW*/HR*/-D");
      ).toEqual("TKPWHRAOEU/KAUPB/TP*/*U/STKPW*/STKPW*/*LD");
    });

    it("with hyphenated compound word and suffix", () => {
      let wordOrPhraseMaterial = "computer-ectomy";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPAOUR H-PB EBGT/PHEU");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPAOUR/H-PB/EBGT/PHEU");
    });

    it("with unhyphenated compound word and suffix", () => {
      let wordOrPhraseMaterial = "computerectomy";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPAOUR/EBGT/PHEU");
    });

    it("with hyphenated compound word and existing words", () => {
      let wordOrPhraseMaterial = "store-room";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STOR H-PB RAOPL");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("STOR/H-PB/RAOPL");
    });

    // NOTE: We no longer support treating a suffix as a word like this unless it comes with dictionary formatting like {^ectomy}
    // it('with only a suffix', () => {
    //   let wordOrPhraseMaterial = "ectomy";
    //   expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("EBGT/PHEU");
    // });
    it("with only a suffix, not showing a suffix outline but instead treating it as a word", () => {
      let wordOrPhraseMaterial = "ectomy";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("EBGT/SKWRO/PHEU");
    });

    it("with mid^ prefix without a hyphen", () => {
      let wordOrPhraseMaterial = "mid^";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PHEUD");
    });

    it("with mid-^ prefix with hyphen", () => {
      const midDashPrefixPersonalDictionaries: PersonalDictionaryNameAndContents[] =
        [];
      const midDashPrefixGlobalLookupDictionary = createGlobalLookupDictionary(
        midDashPrefixPersonalDictionaries,
        [[{ "PHEUD/H-PB": "{mid-^}" }, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
      );
      const wordOrPhraseMaterial = "mid-^";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          midDashPrefixGlobalLookupDictionary
        )
      ).toEqual("PHEUD/H-PB");
    });

    it("with hyphenated phrase", () => {
      let wordOrPhraseMaterial = "a hit-and-miss";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEU/H-PLS");
    });

    xit("with repeated, hyphenated gibberish", () => {
      let wordOrPhraseMaterial = "aaaa-aaaa";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("A*/A*/A*/A* H-PB A*/A*/A*/A*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("A*/A*/A*/A*/H-PB/A*/A*/A*/A*");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU/AEU/A/AEU/H-PB/AEU/AEU/A/AEU");
    });

    it("with random, hyphenated gibberish", () => {
      let wordOrPhraseMaterial = "dckx-dckx";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TK*/KR*/K*/KP*/H-PB/TK*/KR*/K*/KP*");
    });

    describe("with hyphenated letters with some fingerspelling strokes", () => {
      it("shows fingerspelling stroke and xxx", () => {
        let wordOrPhraseMaterial = "c-ç";
        // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KR* H-PB xxx");
        expect(
          createStrokeHintForPhrase(
            wordOrPhraseMaterial,
            globalLookupDictionary
          )
        ).toEqual("KR*/H-PB/xxx");
      });
    });

    describe("with hyphenated letters without fingerspelling strokes", () => {
      it("shows xxx for all single letters with no strokes", () => {
        let wordOrPhraseMaterial = "ç-ç";
        // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("xxx H-PB xxx");
        expect(
          createStrokeHintForPhrase(
            wordOrPhraseMaterial,
            globalLookupDictionary
          )
        ).toEqual("xxx/H-PB/xxx");
      });
    });

    // TODO
    xit("with a colon, space, opening quote, and capitalised word", () => {
      let wordOrPhraseMaterial = 'and said: "You';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKP SAEUD STPH-FPLT KW-GS KPA*/U");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SKP/SAEUD/STPH-FPLT/KW-GS/KPA*/U");
    });

    it("with full stop, closing double quote, and capitalised word", () => {
      let wordOrPhraseMaterial = '." Outside';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("P-P KR-GS KPA/OUDZ");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP-PL KR-GS KPA/OUDZ");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TP-PL/KR-GS/KPA/OUDZ");
    });

    // TODO:
    xit("with hyphenated phrase and trailing full stop", () => {
      let wordOrPhraseMaterial = "a hit-and-miss.";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU H-PLS TP-PL");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEU/H-PLS/TP-PL");
    });

    it("with preceding double quote", () => {
      let wordOrPhraseMaterial = '"you';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS U");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KW-GS/U");
    });

    it("with word, full stop, space, opening double quote, and capital letter", () => {
      let wordOrPhraseMaterial = 'cat. "You';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT TP-PL KW-GS KPA/U"); // ideally it would be KAT TP-PL KW-GS U
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT/TP-PL/KW-GS/KPA/U");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KAT/TP-PL/KW-GS/KPA*/U");
    });

    it("with word, full stop, closing double quote, space, and capital letter", () => {
      let wordOrPhraseMaterial = 'cat." You';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KAT P-P KR-GS KPA/U"); // ideally it would be KAT TP-PL KR-GS U
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KAT/TP-PL/KR-GS/KPA/U");
    });

    it("with trailing full stop", () => {
      let wordOrPhraseMaterial = "her.";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HER TP-PL");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HER/TP-PL");
    });

    it('with "cross-petition"', () => {
      let wordOrPhraseMaterial = "In your cross-petition";

      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/TPH/KWROUR/KR-PGS");
    });

    xit('with "cross-petition" and a comma', () => {
      let wordOrPhraseMaterial = "In your cross-petition, you";

      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS KW-BG U");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/TPH/KWROUR/KR-PGS/KW-BG/U");
    });
  });

  describe("returns hints with words using orthography rules", () => {
    it("with orthography rule to append suffix key D as d to ed words", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "impersonated";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "EUPL": "{im^}",
              "EUPL/PERS/TPHAEUT": "impersonate",
              "-D": "{^ed}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("EUPL/PERS/TPHAEUT/-D");
    });

    it("with suffix rule to append -D as ed to add ed to existing words without trying to use orthography rules that fail", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "toed";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "TO": "to",
              "TO*E": "toe",
              "-D": "{^ed}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("TO/-D"); // "TO*E/-D" produces "toeed" not "toed"
    });
  });

  describe("returns fingerspelling results for single letters except for single-letter words", () => {
    it("first third lowercase alphabet", () => {
      let wordOrPhraseMaterial = "a b c d e f g h i";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU PW* KR* TK* *E TP* TKPW* H* *EU");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEU/PW*/KR*/TK*/*E/TP*/TKPW*/H*/*EU");
    });

    it("second third lowercase alphabet", () => {
      let wordOrPhraseMaterial = "j k l m n o p q r";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR* K* HR* PH* TPH* O* P* KW* R*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SKWR*/K*/HR*/PH*/TPH*/O*/P*/KW*/R*");
    });

    it("final third lowercase alphabet", () => {
      let wordOrPhraseMaterial = "s t u v w x y z";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S* T* *U SR* W* KP* KWR* STKPW*");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("S*/T*/*U/SR*/W*/KP*/KWR*/STKPW*");
    });

    it("first third uppercase alphabet", () => {
      let wordOrPhraseMaterial = "A B C D E F G H I";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU PW*P KR*P TK*P *EP TP*P TKPW*P H*P EU");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/AEU/PW*P/KR*P/TK*P/*EP/TP*P/TKPW*P/H*P/EU");
    });

    it("second third uppercase alphabet", () => {
      let wordOrPhraseMaterial = "J K L M N O P Q R";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR*P K*P HR*P PH*P TPH*P O*P P*P KW*P R*P");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("SKWR*P/K*P/HR*P/PH*P/TPH*P/O*P/P*P/KW*P/R*P");
    });

    it("final third uppercase alphabet", () => {
      let wordOrPhraseMaterial = "S T U V W X Y Z";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S*P T*P *UP 5R W*P 10R KWR*P STKPW*P");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("S*P/T*P/*UP/5R/W*P/10R/KWR*P/STKPW*P");
    });
  });

  describe("returns string showing text with spaced punctuation", () => {
    it("common punctuation", () => {
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL HAERB TPHRORB P*ERS SKP* KW-BG TP-PL KHR-PB SKHR-PB KW-L H-F SKWRAT");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL/HAERB/TPHRORB/P*ERS/SKP*/KW-BG/TP-PL/KHR-PB/SKHR-PB/KW-L/H-F/SKWRAT");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL/HAERB/TPHRORB/P*ERS/SKP*/KW-BG/TP-PL/KHR-PB/STPH*FPLT/KW-L/H-F/SKWRAT");
      let wordOrPhraseMaterial = "! # $ % & , . : ; = ? @";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual(
        "SKHRAPL/HAERB/TPHRORB/P*ERS/SKP*/KW-BG/TP-PL/STPH-FPLT/STPH*FPLT/KW-L/H-F/SKWRAT"
      );
    });

    it("other punctuation", () => {
      let wordOrPhraseMaterial = "* ^ ` | ~ — – - ©";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STA*R KR-RT KH-FG PAO*EUP T*LD EPL/TKA*RB EPB/TKA*RB H*B KPR-T");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual(
        "STA*R/KR-RT/KH-FG/PAO*EUP/T*LD/EPL/TKA*RB/EPB/TKA*RB/H*B/KPR-T"
      );
    });

    it("brackets", () => {
      let wordOrPhraseMaterial = "( ) [ ] { }";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PREPB PR*EPB PWR-BGT PWR*BGT TPR-BGT TPR*BGT");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PREPB/PR*EPB/PWR-BGT/PWR*BGT/TPR-BGT/TPR*BGT");
    });
  });

  describe("returns string containing top-level domain", () => {
    it('shows outline for "{^.com}"', () => {
      let wordOrPhraseMaterial = "{^.com}";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KROPL");
    });

    xit('shows fingerspelled outline for non-affixy ".com"', () => {
      let wordOrPhraseMaterial = ".com";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TP-PL/KR*/O*/PH*");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP-PL/KAU/PH*");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP-PL/TK-LS/KAU/PH*");
    });

    it('shows outline for "didoesdigital.com"', () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "didoesdigital.com";
      const customGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "KROPL": "{^.com}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      AFFIXES.setSharedAffixes({
        prefixes: [],
        suffixes: [["/KROPL", ".com"]],
      });

      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          customGlobalLookupDictionary,
          AFFIXES.getSharedAffixes()
        )
      ).toEqual("TK*/*EU/TK*/O*/*E/S*/TK*/*EU/TKPW*/*EU/T*/A*/HR*/KROPL");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/*EU/TK*/O*/*E/S*/TK*/*EU/TKPW*/*EU/T*/A*/HR* KROPL");
    });
  });

  describe("returns outlines for capitalised word with trailing full stop", () => {
    it('shows outline for "Mass."', () => {
      let wordOrPhraseMaterial = "Mass.";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/PHAS TP-PL");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/PHAS/TP-PL");
    });
  });

  describe("returns outline for string containing formal titles", () => {
    it('shows outline for "Dr."', () => {
      let wordOrPhraseMaterial = "Dr.";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TKR-FPLT");
    });

    it('shows outline for "Dr. Chant"', () => {
      let wordOrPhraseMaterial = "Dr. Chant";
      // Note: It would be amazing if it didn't choose KPA/ here but that seems really hard
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKR-FPLT KPA/KHAPBT");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TKR-FPLT/KPA/KHAPBT");
    });

    it('shows outline for "Mx."', () => {
      let wordOrPhraseMaterial = "Mx.";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PH-BGS");
    });

    it('shows outline for "Mx. Eldridge"', () => {
      let wordOrPhraseMaterial = "Mx. Eldridge";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PH-BGS EL/TKREUPBLG");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PH-BGS/EL/TKREUPBLG");
    });

    it('shows outline for "Mr. and Mrs."', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs.";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PHRARPLS");
    });

    xit('shows outline for "Mr. and Mrs. Long"', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs. Long";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHRARPLS KPA/HROPBG");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("PHRARPLS/KPA/HROPBG");
    });
  });

  describe("returns string showing text with numbers", () => {
    it("zero to five with dashes", () => {
      // let wordOrPhraseMaterial = "0.1.2.3.4.5.6.7.8.9.10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O P-P #S P-P #T- P-P #P- P-P #H P-P #A P-P #F P-P #-P P-P #L P-P #-T 1/0");
      let wordOrPhraseMaterial = "-0-1-2-3-4-5";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H*B #O H-PB #S H-PB #T- H-PB #P- H-PB #H H-PB #A");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("H*B/#O/H-PB/#S/H-PB/#T-/H-PB/#P-/H-PB/#H/H-PB/#A");
    });

    it("five to ten with dashes", () => {
      // let wordOrPhraseMaterial = "0.1.2.3.4.5.6.7.8.9.10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O P-P #S P-P #T- P-P #P- P-P #H P-P #A P-P #F P-P #-P P-P #L P-P #-T 1/0");
      let wordOrPhraseMaterial = "-5-6-7-8-9-10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H*B #A H-PB #F H-PB #-P H-PB #L H-PB #-T H-PB 1/0");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("H*B/#A/H-PB/#F/H-PB/#-P/H-PB/#L/H-PB/#-T/H-PB/1/0");
    });

    it("zero to ten with spaces", () => {
      // let wordOrPhraseMaterial = "0 1 2 3 4 5 6 7 8 9 10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O #S #T- #P- #H #A #F #-P #L #-T 1/0");
      let wordOrPhraseMaterial = "0 0 1 2 3 4 5 6 7 8 9 10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O 0EU #S #T #P #H R5 #F #-P #L #-T 1/0");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("0EU/0EU/#S/#T/#P/#H/R5/#F/#-P/#L/#-T/1/0");
    });

    it("returns strings with numbers containing zeroes and commas", () => {
      let wordOrPhraseMaterial = "100 900 1000 1,000 10000 10,000";
      // FIXME: should probably show #SZ #TZ #TPHOUZ #SO/W-B/THUZ 10/THUZ #SO/W-B/THUZ
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1/0/0 9/0/0 1/0/0/0 1 KW-BG 0/0/0 1/0/0/0/0 1/0 KW-BG 0/0/0");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-Z -9Z 1/THOUZ TPHOUZ 1-Z/HUPB/HUPB #SO/W-B/THUZ");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("1-Z/-9Z/1/THOUZ/TPHOUZ/1-Z/HUPB/HUPB/#SO/W-B/THUZ");
      ).toEqual("1-Z/-9Z/1/THOUZ/TPHOUZ/1/0/THO*EUPB/#SO/W-B/THUZ");
    });

    it("returns string with double numbers", () => {
      let wordOrPhraseMaterial = "22 33";
      // FIXME: should probably show #T-D or 2-D and #P-D
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("2-D 3-D");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("2-D/3-D");
    });

    it("returns string with currency", () => {
      let wordOrPhraseMaterial = "$100 $900";
      // FIXME: should probably show #SDZ #-TDZ
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-DZ TK-PL -9Z");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-DZ TPHRORB -9Z");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("1-DZ/TPHRORB/-9Z");
    });

    it("returns string with clock time", () => {
      let wordOrPhraseMaterial = "1:00 9:00 10:00 19:00 20:00";
      // FIXME: should probably show #SK or #SBG, #KT or #BGT, #SKO or #SOBG, #SKT or #SBGT, and #TKO or #TOBG
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1 KHR-PB 0/0 9 KHR-PB 0/0 1/0 KHR-PB 0/0 1/9 KHR-PB 0/0 2/0 KHR-PB 0/0");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-BG K-9 1/0 KHR-PB #-Z 1-9 KHR-PB #-Z 2/0 KHR-PB #-Z");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("1-BG/K-9/1/0/KHR-PB/#-Z/1-9/KHR-PB/#-Z/2/0/KHR-PB/#-Z");
    });
  });

  describe("returns hints for complex hyphenated phrases", () => {
    it("showing good stroke hint for known word and suffix with one hyphen", () => {
      let wordOrPhraseMaterial = "kettle-acre";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KET/*L/A*EURBG");
    });

    it("showing good stroke hint for known word and suffix with two hyphens", () => {
      let wordOrPhraseMaterial = "kettle-in-law";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KET/*L/*EUPB/HRAU");
    });

    it("showing good stroke hint for known word and prefix with one hyphen", () => {
      let wordOrPhraseMaterial = "ani-kettle";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEUPB/SKWREU/KET/*L");
    });

    it("showing good stroke hint for known word and prefix with two hyphens", () => {
      let wordOrPhraseMaterial = "over-the-kettle";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AUFR/-T/KET/*L");
    });

    it("showing good stroke hint for known word and suffix containing a colon and numbers", () => {
      let wordOrPhraseMaterial = "kettle:10";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
        // ).toEqual("KET/*L/10*BG");
      ).toEqual("KET/*L/10BG");
    });

    xit("showing good stroke hint for gibberish word and suffix with one hyphen", () => {
      let wordOrPhraseMaterial = "dckx-acre";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TK*/KR*/K*/KP*/A*EURBG");
    });

    xit("showing good stroke hint for gibberish word and suffix with two hyphens", () => {
      let wordOrPhraseMaterial = "dckx-in-law";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TK*/KR*/K*/KP*/*EUPB/HRAU");
    });

    xit("showing good stroke hint for gibberish word and prefix with one hyphen", () => {
      let wordOrPhraseMaterial = "ani-dckx";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AEUPB/SKWREU/TK*/KR*/K*/KP*");
    });

    xit("showing good stroke hint for gibberish word and prefix with two hyphens", () => {
      let wordOrPhraseMaterial = "over-the-dckx";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("AUFR/-T/TK*/KR*/K*/KP*");
    });

    xit("showing good stroke hint for gibberish word and suffix containing a colon and numbers", () => {
      let wordOrPhraseMaterial = "dckx:10";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("TK*/KR*/K*/KP*/10*BG");
    });

    it("showing good stroke hint for one lowercase word hash tag", () => {
      let wordOrPhraseMaterial = "#steno";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB STOEUPB");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HAERB/STOEUPB");
    });

    xit("showing good stroke hint for one capitalised word hash tag", () => {
      let wordOrPhraseMaterial = "#Steno";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HAERB/KPA*/STOEUPB");
    });

    xit("showing good stroke hint for camel case hash tags", () => {
      let wordOrPhraseMaterial = "#StenoLife";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB KPA*/HRAOEUF");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HAERB/KPA*/STOEUPB/KPA*/HRAOEUF");
    });

    xit("showing good stroke hint for camel case hash tags in a sentence", () => {
      let wordOrPhraseMaterial = "This is #StenoLife";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA*/TH S HAERB KPA*/STOEUPB KPA*/HRAOEUF");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA*/TH/S/HAERB/KPA*/STOEUPB/KPA*/HRAOEUF");
    });

    it("showing good stroke hint for hyphenated compound word with trailing punctuation", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const mouseHunterGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "H-PB": "{^-^}",
              "KW-BG": "{,}",
              "PHOUS": "mouse",
              "HURPBT": "Hunter",
              "HUPB/TER": "hunter",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "mouse-hunter,";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHOUS H-PB HUPB/TER KW-BG");
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          mouseHunterGlobalLookupDictionary
        )
      ).toEqual("PHOUS/H-PB/HUPB/TER/KW-BG");
    });

    it("showing good stroke hint for capitalised, hyphenated compound word with trailing punctuation", () => {
      let wordOrPhraseMaterial = "He-he!";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/HE/H-PB/HE/SKHRAPL");
    });

    it("showing good stroke hint for another hyphenated compound word with trailing punctuation", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const toHyphenDayCommaGlobalLookupDictionary =
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "H-PB": "{^-^}",
              "KW-BG": "{,}",
              "TO": "to",
              "TPHAOEUT": "night",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]);
      let wordOrPhraseMaterial = "to-night,";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          toHyphenDayCommaGlobalLookupDictionary
        )
      ).toEqual("TO/H-PB/TPHAOEUT/KW-BG");
    });

    it("showing good stroke hint for another hyphenated compound word with suffix with hyphen and trailing punctuation", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const toHyphenDayCommaGlobalLookupDictionary =
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "H-PB": "{^-^}",
              "KW-BG": "{,}",
              "TO": "to",
              "TKAEU": "day",
              "TKA*EU": "{^-day}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]);
      let wordOrPhraseMaterial = "to-day,";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          toHyphenDayCommaGlobalLookupDictionary
        )
      ).toEqual("TO/TKA*EU/KW-BG");
    });
  });

  describe("returns hints for complex capitalised and punctuated phrases", () => {
    xit("showing good stroke hint for known word with added capital letter and punctuation", () => {
      let wordOrPhraseMaterial = "Stay tuned,";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KPA/STAOUPBD/KW-BG");
    });

    xit("showing good stroke hint for known word with added capital letter, punctuation, and internal apostrophe", () => {
      let wordOrPhraseMaterial = "\"They're";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KW-GS/KPA*/THER");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS/KPA*/THE/AE/RE");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS/KPA*/THE/AE/R*/*E");
    });

    it("showing good stroke hint for known word with added capital letter, punctuation, and internal apostrophe", () => {
      let wordOrPhraseMaterial = "\"It's";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS/KPA*/T/AE/S*");
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KW-GS/KPA*/T/AES");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KW-GS/KPA*/T-S");
    });

    describe("showing good stroke hint for known word with added capital letter and opening single quote", () => {
      it("with suppressed space opening single quote", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        let wordOrPhraseMaterial = "'That";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "A*E": "{'^}",
                "AE": "{^'}",
                "KPA": "{}{-|}",
                "KPA*": "{^}{-|}",
                "THA": "that",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        );
        expect(result).toEqual("A*E/KPA*/THA");
      });

      it("with carried capitalisation opening single quote", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        let wordOrPhraseMaterial = "'That";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "A*E": "{~|'^}",
                "AE": "{^'}",
                "KPA": "{}{-|}",
                "KPA*": "{^}{-|}",
                "THA": "that",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        );
        expect(result).toEqual("A*E/KPA*/THA");
      });
    });
  });

  describe("hints for personal phrasing briefs", () => {
    it('returns shorter outline for "it can\'t"', () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [
        [
          "phrasing-briefs.json",
          { "KPWH-BGT": "it can't", "KPWHO": "it can't" },
        ],
      ];
      const phrasingBriefGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [[{}, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
      );
      const wordOrPhraseMaterial = "it can't";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          phrasingBriefGlobalLookupDictionary
        )
      ).toEqual("KPWHO");
    });
  });

  describe("returns hints for phrasing briefs prioritising phrasing brief starters", () => {
    // In the future, we'll use preferPhrasingBriefStarters to make this pass
    xit('returns T*D for "it\'d" instead of EUTD', () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "it'd";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "*D": "{^'d}",
                "AE": "{^'}",
                "*EUT": "it",
                "EUT": "it",
                "T": "it",
                "EUTD": "it'd",
                "T*D": "it'd",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ])
        )
      ).toEqual("T*D");
    });
  });

  describe("returns hints for separate words separated by spaces instead of slashes", () => {
    // After releasing Node CLI, remove entry from hardCodedPatches and enable this test
    xit('returns KWR T-S for "why it\'s" instead of KWR/T-S', () => {
      let wordOrPhraseMaterial = "why it's";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWR T-S");
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("KWR/T-S");
    });
  });

  describe("returns hints for complex case with stars, slashes, suffixes, misused suffixes, and outlines ending in S and Z", () => {
    it("returns HOR/TKEFRBZ for hors d'oeuvres", () => {
      let wordOrPhraseMaterial = "hors d'oeuvres";
      expect(
        createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)
      ).toEqual("HOR/TKEFRBZ");
    });
  });

  describe("phrasing briefs", () => {
    // WEUS uses "WEU" for "which", which matches "WEU": "which", and "-S" for
    // "is", which is similar to "S": "is". Alternatively, "KH-S" is apart of a
    // large set of phrasing briefs starting with KH- for phrases starting with
    // "which "
    it("returns a phrasing brief from a set for “which is”", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "which is";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              // "KH-S": "which is", // maybe after adding preferPhrasingBriefStarters
              // "SWEU": "which is", // might be a bug?
              "S": "is",
              "WEU": "which",
              "WEU/S": "which is",
              "WEUS": "which is",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("WEUS");
    });

    it("returns a phrasing brief from a set for “with respect”", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "with respect";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "R-PT": "respect",
              "W": "with",
              "WR-PT": "with respect", // Order matters here
              "W-RPT": "with respect", // Order matters here
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("WR-PT");
    });
  });

  describe("outline with dictionary comma formatting", () => {
    it("returns brief not multi-stroke outline", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const thatCommaGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "KW-BG": "{,}",
              "THARBGS": "that{,}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "that,";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          thatCommaGlobalLookupDictionary
        )
      ).toEqual("THARBGS");
    });
  });

  describe("hint for back.", () => {
    it("returns hint with preferred full stop outline", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const backAffixGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "PWABG": "back",
              "PWA*EBG": "{back^}",
              "PWA*BG": "{^back}",
              "TP-PL": "{.}",
              "PR-D": ".",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "back.";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          backAffixGlobalLookupDictionary
        )
      ).toEqual("PWABG/TP-PL");
    });
  });

  describe("hint for well-loved", () => {
    xit("returns hint with preferred shorter, phonetic well- prefix", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wellLovedGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "HROFD": "loved",
              "SKWR*EL": "{well-^}", // Order matters here
              "W*EL": "{well-^}", // Order matters here
              "WEL": "well",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "well-loved";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          wellLovedGlobalLookupDictionary
        )
      ).toEqual("W*EL/HROFD");
    });
  });

  describe('hint for "sh"', () => {
    it("returns fingerspelled word not suffix outline *RB for {^sh}", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const shGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "*RB": "{^sh}",
              "S*": "{&s}",
              "H*": "{&h}",
              "SH": "shh",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "sh";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          shGlobalLookupDictionary
        )
      ).toEqual("S*/H*");
    });
  });

  describe('hint for "enquiries"', () => {
    xit("returns a sensible hint for enquiry + ^ies without condensed stroke", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const enquiriesGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "EPB/KWAOEUR/KWREU": "enquiry",
              "KWREUS": "{^ies}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "enquiries";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          enquiriesGlobalLookupDictionary
        )
      ).toEqual("EPB/KWAOEUR/KWREU/KWREUS");
    });
  });

  describe('hint for "expostulated."', () => {
    it("returns a sensible hint for expostulate + ^ed and full stop without condensed stroke", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const expostulatedGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "EBGS/POFT/HRAEUT": "expostulate",
              "-D": "{^ed}",
              "TP-PL": "{.}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "expostulated.";
      expect(
        createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          expostulatedGlobalLookupDictionary
        )
      ).toEqual("EBGS/POFT/HRAEUT/-D/TP-PL");
    });
  });

  describe('hint for "so how\'s"', () => {
    it("returns a sensible hint using multi-word brief with apostrophe", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const knockdGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "TPHAO*URS": "New Year's",
              "TPHU": "new",
              "KWRAOER": "year",
              "TPHU/KWRAO*ER": "New Year",
              "AE": "{^'}",
              "AES": "{^'s}",
              "-S": "{^s}",
              "S*": "{&s}",
              "KPA": "{}{-|}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "New Year's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        knockdGlobalLookupDictionary
      );
      expect(result).toEqual("TPHAO*URS");
    });
  });

  describe('hint for "so how\'s"', () => {
    it("returns a sensible hint using multi-word brief with apostrophe", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const knockdGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "SHO*US": "so how's",
              "SO": "so",
              "HOU": "how",
              "HO*US": "how's",
              "AE": "{^'}",
              "AES": "{^'s}",
              "-S": "{^s}",
              "S*": "{&s}",
              "KPA": "{}{-|}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "so how's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        knockdGlobalLookupDictionary
      );
      expect(result).toEqual("SHO*US");
    });
  });

  describe("hint for knock'd", () => {
    it("returns a sensible apostrophe dee hint for existing lower-cased word", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const knockdGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "*D": "{^'d}",
              "AE": "{^'}",
              "KPA": "{}{-|}",
              "TK*": "{&d}",
              "TPHOBG": "knock",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "knock'd";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        knockdGlobalLookupDictionary
      );
      expect(result).toEqual("TPHOBG/*D");
    });
  });

  describe("hint for frolick'd", () => {
    xit("returns a sensible apostrophe dee hint for missing lower-cased word", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const frolickdGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "*D": "{^'d}",
              "AE": "{^'}",
              "KPA": "{}{-|}",
              "TK*": "{&d}",
              "K*": "{&k}",
              "*BG": "{^k}",
              "TPROL/EUBG": "frolic",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "frolick'd";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        frolickdGlobalLookupDictionary
      );
      expect(result).toEqual("TPROL/EUBG/*BG/*D");
    });
  });

  describe("hint for Heaven's", () => {
    it("returns a sensible apostrophe ess hint for capitalised words with contractions", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const heavensGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "AE": "{^'}",
              "AES": "{^'s}",
              "HEFPB": "heaven",
              "KPA": "{}{-|}",
              "-S": "{^s}",
              "S*": "{&s}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );
      let wordOrPhraseMaterial = "Heaven's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        heavensGlobalLookupDictionary
      );
      // debugger;
      expect(result).toEqual("KPA/HEFPB/AES");
    });
  });

  describe("hint for King's", () => {
    it("returns a sensible apostrophe ess hint for capitalised words where capitalised word already has its own entry", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "King's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "AE": "{^'}",
              "AES": "{^'s}",
              "KEUPBG": "king",
              "KO*EUPBG": "King",
              "KEUPBG/AES": "king's",
              "KPA": "{}{-|}",
              "-S": "{^s}",
              "S*": "{&s}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("KO*EUPBG/AES");
    });
  });

  describe("hint for is——where's", () => {
    it("returns a sensible hint for words on either side of 2 em dashes", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "is——where's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "AE": "{^'}",
              "AES": "{^'s}",
              "EPL/TKA*RB": "—",
              "S": "is",
              "-S": "{^s}",
              "W-R": "where",
              "W-RS": "where's",
              "S*": "{&s}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("S/EPL/TKA*RB/EPL/TKA*RB/W-RS");
    });
  });

  describe("hint for ceiling—what?", () => {
    it("returns a sensible hint for words on either side of an em dash with terminating punctuation", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "ceiling—what?";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "KAOELG": "ceiling",
              "EPL/TKA*RB": "—",
              "WHA": "what",
              "H-F": "{?}",
              "KWEZ": "?",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("KAOELG/EPL/TKA*RB/WHA/H-F");
    });
  });

  describe("hint for say—that's", () => {
    it("returns a sensible hint for words on either side of an em dash with apostrophe ess", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "say—that's";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "AE": "{^'}",
              "AES": "{^'s}",
              "SAEU": "say",
              "EPL/TKA*RB": "—",
              "THATS": "that's",
              "THA": "that",
              "-S": "{^s}",
              "S*": "{&s}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("SAEU/EPL/TKA*RB/THATS");
    });

    it("returns a sensible hint for words on either side of an em dash with contraction", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "evening—wouldn't";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "*PB": "{^n}",
              "*PBT": "{^n't}",
              "AE": "{^'}",
              "AOEPBG": "evening",
              "EPL/TKA*RB": "—",
              "WO": "would",
              "WOPBT": "wouldn't",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("AOEPBG/EPL/TKA*RB/WOPBT");
    });
  });

  describe("said:", () => {
    it("returns a hint with spaced colon outline", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "said:";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "SED": "said",
              "STPH-FPLT": "{:}",
              "KHR-PB": "{^:^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("SED/STPH-FPLT");
    });
  });

  describe("adze", () => {
    it("returns a fingerspelling hint without randomly using words", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "adze";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "AEU": "a",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      // expect(result).toEqual("A*/TK*/STKPW*/*E");
      // expect(result).toEqual("A/TK*/STKPW*/*E");
      // expect(result).toEqual("A*/TK*/STKPW*/SKWR*E");
      expect(result).toEqual("A*ED/STKPW*/SKWRE");
    });
  });

  describe("Æthiopian", () => {
    it("returns a fingerspelling hint with capitalised, rare character", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "Æthiopian";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "A*RB": "æ",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      // expect(result).toEqual("*URP/A*RB/*T/*EU/O*/P*/*EU/A*/TPH*");
      // expect(result).toEqual("*URP/A*RB/*T/SKWREU/KWRO/*P/SKWREU/KWRA/*PB");
      expect(result).toEqual("*URP/A*RB/*T/KWRO*E/*P/KWRAPB");
    });
  });

  describe("McKenna", () => {
    it("returns a cobbled together hint without erroneous spaces", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "McKenna";
      const customGlobalLookupDictionary = createGlobalLookupDictionary(
        emptyPersonalDictionaries,
        [
          [
            {
              "*PB": "{^n}",
              "A": "{a^}",
              "AEU": "a",
              "KEPB": "Ken",
              "KWRA": "{^a}",
              "PH-BG": "{Mc^}{-|}",
              "SKWRA": "{^a}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]
      );

      const customAffixMisstrokes =
        getAffixMisstrokesFromMisstrokes(misstrokes);
      const customTestAffixes = getAffixesFromLookupDict(
        customGlobalLookupDictionary,
        customAffixMisstrokes
      );
      AFFIXES.setSharedAffixes(customTestAffixes);

      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        customGlobalLookupDictionary
      );

      expect(result).toEqual("PH-BG/KEPB/*PB/SKWRA");
    });
  });

  describe("the word and with various extra spaces", () => {
    xit("returns a hint with preceding space and word", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = " and";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "SKP": "and",
              "S-P": "{^ ^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("S-P/SKP");
    });

    xit("returns a hint with word and trailing space", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = "and ";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "SKP": "and",
              "S-P": "{^ ^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("SKP/S-P");
    });

    xit("returns a hint with word and surrounding spaces", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      let wordOrPhraseMaterial = " and ";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "SKP": "and",
              "S-P": "{^ ^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ])
      );
      expect(result).toEqual("S-P/SKP/S-P");
    });
  });

  describe("whole match", () => {
    describe("exact match", () => {
      it("returns a perfectly matching dictionary translation", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "the";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-T": "the",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("-T");
      });
    });

    describe("downcase phrase and match", () => {
      it("returns a capitalisation stroke and matching dictionary translation", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "The";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-T": "the",
                "KPA": "{}{-|}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("KPA/-T");
      });
    });

    describe("affix and word", () => {
      it("returns an affix stroke and matching dictionary translation", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "bekettle";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-B": "be",
                "PWE": "{be^}",
                "KET/*L": "kettle",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("PWE/KET/*L");
      });

      it("returns hints using the affix strokes with the longest translation available such as SAOUT/O*RS instead of SAOU/TOR/-S for 'suitors'", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "suitors";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-S": "{^s}",
                "O*R": "{^or}",
                "O*RS": "{^ors}",
                "SAOU/TOR": "suitor",
                "SAOUT": "suit",
                "SAOUT/TOR": "suitor",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("SAOUT/O*RS");
      });
    });
  });

  describe("split on affixes", () => {
    describe("split on prefix", () => {
      it("returns a prefix stroke and strokes for remaining text", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "quasi-confuzzled";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "A": "{a^}",
                "KAUPB": "{^con}",
                "KWAS/KWREU": "{quasi-}",
                "KWA/SEU": "quasi",
                "H-PB": "{^-^}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("KWAS/KWREU/KAUPB/TP*/*U/STKPW*/STKPW*/*LD");
      });
    });
  });

  describe("split on em dashes", () => {
    describe("split on pair of em dashes", () => {
      it("returns a strokes and em dash strokes and strokes", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "is——where's";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AE": "{^'}",
                "AES": "{^'s}",
                "EPL/TKA*RB": "—",
                "S": "is",
                "-S": "{^s}",
                "W-R": "where",
                "W-RS": "where's",
                "S*": "{&s}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("S/EPL/TKA*RB/EPL/TKA*RB/W-RS");
      });
    });
  });

  describe("split on apostrophe ess", () => {
    describe("split on one apostrophe esses", () => {
      it("returns strokes for word and AES for apostrophe ess", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "podiatrist's";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-S": "{^s}",
                "AE": "{^'}",
                "AES": "{^'s}",
                "POED/TREUFT": "podiatrist",
                "S": "is",
                "S*": "{&s}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("POED/TREUFT/AES");
      });
    });

    describe("split on multiple apostrophe esses", () => {
      it("returns strokes for words and AES for all apostrophe esses", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "podiatrist's optometrist's";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "-S": "{^s}",
                "AE": "{^'}",
                "AES": "{^'s}",
                "OP/TOPL/TREUFT": "optometrist",
                "POED/TREUFT": "podiatrist",
                "S": "is",
                "S*": "{&s}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("POED/TREUFT/AES/OP/TOPL/TREUFT/AES");
      });
    });
  });

  describe("split on comma", () => {
    describe("split on one comma with phrasing brief", () => {
      // Note: the app can achieve this using an exactly matched condensed stroke entry
      xit("returns strokes for words and KW-BG for comma", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "so far, so good";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "KW-BG": "{,}",
                "SO": "so",
                "SOFR": "so far",
                "TKPWAOD": "good",
                "TPAR": "far",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("SOFR/KW-BG/SO/TKPWAOD");
      });
    });

    describe("split on multiple spaced commas", () => {
      // Note: the app can achieve this using an exactly matched condensed stroke entry
      xit("returns strokes for words and KW-BG for all spaced commas", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "wham, bam, thank you, ma'am";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "KW-BG": "{,}",
                "PHAPL": "ma'am",
                "PWAPL": "bam",
                "THAPBG": "thank",
                "THAUG": "thank you",
                "U": "you",
                "WHAPL": "wham",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("WHAPL/KW-BG/PWAPL/KW-BG/THAUG/KW-BG/PHAPL");
        // expect(result).toEqual("WHAPL/KW-BG/PWAPL/KW-BG/THAPBG/U/KW-BG/PHAPL");
      });
    });
  });

  describe("handle ellipsis", () => {
    describe("typographically correct ellipsis", () => {
      it("with entry should show hint", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "a…";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AEU": "a",
                "HR-PS": "{^…}",
                // TODO: add support for matching these
                // "SKWR*RBGS": "{^}…{-|}",
                // "SKWR-RBGS": "{^…}{-|}",
                // "SKWR-RBGSZ": "{^}…{-|}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("AEU/HR-PS");
      });

      it("without entry should show unknown stroke xxx", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "a…";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AEU": "a",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("AEU/xxx");
      });
    });

    describe("three full stops for ellipsis", () => {
      it("shows hint", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "a...";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                "AEU": "a",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("AEU/TP-PL/TP-PL/TP-PL");
      });
    });
  });

  describe("handles JavaScript words safely", () => {
    it("shows proper hint for hasOwnProperty not [native code]", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "hasOwnProperty";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "HAS/OEPB/PROT": "hasOwnProperty",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("HAS/OEPB/PROT");
    });

    it("shows proper hint for isPrototypeOf not [native code]", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "isPrototypeOf";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "S/KPA*/PRO/TOE/TAOEUP/KPA*/-F": "isPrototypeOf",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("S/KPA*/PRO/TOE/TAOEUP/KPA*/-F");
    });

    it("shows proper hint for valueOf not [native code]", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "valueOf";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "SRAOUL/KPA*/-F": "valueOf",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("SRAOUL/KPA*/-F");
    });

    it("shows proper hint for toString not [native code]", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "toString";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "TO/STR*EUPBG": "toString",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("TO/STR*EUPBG");
    });
  });

  describe("handle pairs of numbers", () => {
    describe("handle numbers and punctuation", () => {
      xit("20/20", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "20/20";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                // "20": "20",
                "OEU": "{^/^}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        // expect(result).toEqual("20/OEU/20");
        // expect(result).toEqual("#TO/OEU/#TO");
        expect(result).toEqual("#T/#O/OEU/#T/#O");
      });

      xit("20/20 with full stop", () => {
        const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] =
          [];
        const wordOrPhraseMaterial = "20/20.";
        const result = createStrokeHintForPhrase(
          wordOrPhraseMaterial,
          createGlobalLookupDictionary(emptyPersonalDictionaries, [
            [
              {
                // "20": "20",
                "OEU": "{^/^}",
                "TP-PL": "{.}",
                "P-P": "{^.^}",
              },
              LATEST_TYPEY_TYPE_FULL_DICT_NAME,
            ],
          ]),
          AFFIXES.getSharedAffixes()
        );
        expect(result).toEqual("20/OEU/20/TP-PL");
      });
    });
  });

  describe("code symbols ", () => {
    it("shows hint for =>", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "=>";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDictionaries, [
          [
            {
              "HARB/RO*BGT": "=>",
              "S-P/TPRO*E": "=>",
              "TPRO*E": "{#}=>",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("S-P/TPRO*E");
    });
  });

  describe("handles more compound words", () => {
    it("returns strokes, stroke, and number of attempts for “marriage-portion”", () => {
      const emptyPersonalDicts: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "marriage-portion";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDicts, [
          [
            {
              "PHAERPBLG": "marriage",
              "PORGS": "portion",
              "H-PB": "{^-^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      // expect(result).toEqual("PHAERPBLG H-PB PORGS");
      expect(result).toEqual("PHAERPBLG/H-PB/PORGS");
    });

    it("returns strokes, stroke, and number of attempts for “self-control” using self-^ prefix not self word and hyphen", () => {
      const emptyPersonalDicts: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "self-control";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDicts, [
          [
            {
              "H-PB": "{^-^}",
              "SEF": "{self-^}",
              "KROL": "control",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("SEF/KROL");
    });

    it("returns strokes, stroke, and number of attempts for “self-notarealword” using self-^ prefix and fingerspelled word", () => {
      const emptyPersonalDicts: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = "self-notarealword";
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDicts, [
          [
            {
              "H-PB": "{^-^}",
              "SEF": "{self-^}",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      // expect(result).toEqual("SEF/TPH*/O*/T*/A*/R*/*E/A*/HR*/W*/O*/R*/TK*");
      // expect(result).toEqual("SEF/TPH*/O*/T*/A*/R*/*E/A*/HR*/W*/KWRO/R*D");
      expect(result).toEqual("SEF/TPH*/O*/T*/A*R/SKWRE/A*L/WO*RD");
    });

    it('returns strokes, stroke, and number of attempts for “"Lady-bird,”', () => {
      const emptyPersonalDicts: PersonalDictionaryNameAndContents[] = [];
      const wordOrPhraseMaterial = '"Lady-bird,';
      const result = createStrokeHintForPhrase(
        wordOrPhraseMaterial,
        createGlobalLookupDictionary(emptyPersonalDicts, [
          [
            {
              "H-PB": "{^-^}",
              "HRA*ED": "lady",
              "PWEURD": "bird",
            },
            LATEST_TYPEY_TYPE_FULL_DICT_NAME,
          ],
        ]),
        AFFIXES.getSharedAffixes()
      );
      expect(result).toEqual("KW-GS/KPA*/HRA*ED/H-PB/PWEURD/KW-BG");
    });
  });
});
