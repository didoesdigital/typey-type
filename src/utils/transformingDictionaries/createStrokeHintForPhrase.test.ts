import chooseOutlineForPhrase from "./chooseOutlineForPhrase";
import createStrokeHintForPhrase from "./createStrokeHintForPhrase";
import createAGlobalLookupDictionary from "./createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import {
  testTypeyTypeDict,
  testPloverDict,
  personalDictionaries,
} from "./transformingDictionaries.fixtures";

const globalLookupDictionary = createAGlobalLookupDictionary(personalDictionaries, testTypeyTypeDict, testPloverDict);
const precedingChar = '';

describe('create stroke hint for phrase', () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  describe('returns string showing all the space or slash separated strokes to write a whole phrase', () => {
    it('showing "KPA/AEU KPA/TPAR/PHER" for "A Farmer"', () => {
      let wordOrPhraseMaterial = "A Farmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU KPA/TPAR/PHER");
    });

    it('showing "*EU/TP*P/A*/R*/PH*/*E/R*" for "iFarmer"', () => {
      let wordOrPhraseMaterial = "iFarmer";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("*EU/TP*P/A*/R*/PH*/*E/R*");
    });

    it('showing hint word starting with apostrophe using dictionary formatting symbols', () => {
      let wordOrPhraseMaterial = "'twas";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TWA*S");
    });

    it('show full word hints for a phrase ending with apostrophe and ess when the exact condensed stroke entry exists', () => {
      let wordOrPhraseMaterial = "gentlemen's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR*EPL/AES");
    });

    it('show full word hints for a phrase ending with apostrophe and ess when there is no condensed stroke entry', () => {
      let wordOrPhraseMaterial = "optometrist's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("OP/TOPL/TREUFT/AES");
    });

    it('show full word hints for a phrase containing two words ending with apostrophe and ess when there are no condensed stroke entries', () => {
      let wordOrPhraseMaterial = "podiatrist's optometrist's";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("POED/TREUFT/AES OP/TOPL/TREUFT/AES");
    });

    it('show full word hints for a phrase containing a capitalised word with an apostrophe', () => {
      let wordOrPhraseMaterial = "Isn't";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/S-PBT");
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

    it('with prefix that includes a hyphen and a word', () => {
      let wordOrPhraseMaterial = "re-cover";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("R*E/KOFR");
    });

    it('with prefix that includes a hyphen and a gibberish word', () => {
      let wordOrPhraseMaterial = "self-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SEF/TK*/KR*/K*/KP*");
    });

    it('with prefix that is also a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "quasi-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KWAS/KWREU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
    });

    it('with prefix that is not a word that has trailing hyphen and a word', () => {
      let wordOrPhraseMaterial = "gly-oxide";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KPAOEUD");
    });

    it('with prefix that is not a word that has trailing hyphen and a fake word', () => {
      let wordOrPhraseMaterial = "gly-confuzzled";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKPWHRAOEU/KR*/O*/TPH*/TP*/*U/STKPW*/STKPW*/HR*/*E/TK*");
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

    describe('with hyphenated letters with some fingerspelling strokes', () => {
      it('shows fingerspelling stroke and xxx', () => {
        let wordOrPhraseMaterial = 'c-ç';
        expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KR* H-PB xxx");
      });
    });

    describe('with hyphenated letters without fingerspelling strokes', () => {
      it('shows xxx for all single letters with no strokes', () => {
        let wordOrPhraseMaterial = 'ç-ç';
        expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("xxx H-PB xxx");
      });
    });

    // TODO
    xit('with a colon, space, opening quote, and capitalised word', () => {
      let wordOrPhraseMaterial = 'and said: "You';
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKP SAEUD STPH-FPLT KW-GS KPA*/U");
    });

    it('with full stop, closing double quote, and capitalised word', () => {
      let wordOrPhraseMaterial = '." Outside';
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("P-P KR-GS KPA/OUDZ");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TP-PL KR-GS KPA/OUDZ");
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

    it('with "cross-petition"', () => {
      let wordOrPhraseMaterial = 'In your cross-petition';

      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS");
    });

    xit('with "cross-petition" and a comma', () => {
      let wordOrPhraseMaterial = 'In your cross-petition, you';

      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/TPH KWROUR KR-PGS KW-BG U");
    });
  });

  describe('returns outline string with standard affixes', () => {
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

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TRAFL/HREUPBG", 1 ]);
    });
  });

  describe('returns outlines for words with apostrophes', () => {
    it('showing "OP/TOPL/TREUFT/AES" for "optometrist\'s"', () => {
      let wordOrPhrase = "optometrist's";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "OP/TOPL/TREUFT/AES", 1 ]);
    });
  });

  describe('returns outline string with custom affixes', () => {
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

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TRAFL/*LG", 1 ]);
    });
  });

  describe('returns outline string with words using orthography rules', () => {
    // it('showing outline for "nellies"', () => {
    //   let wordOrPhraseMaterial = "nellies";
    //   expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TPHEL/KWREU/-S");
    // });

    it('with orthography rule to replace "e" with "ing"', () => {
      let wordOrPhrase = "narrating";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "TPHAR/AEUT/-G", 1 ]);
    });

    it('with orthography rule to find stroke after replacing "e" with "ing"', () => {
      let wordOrPhrase = "seething";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "SAO*ET/-G", 1 ]);
    });

    it('with a mistyped orthography rule to find stroke by appending "ing" to word otherwise ending in "e"', () => {
      let wordOrPhrase = "seetheing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "SAO*ET/TK-LS/-G", 1 ]);
    });

    it('with orthography rule to replace "e" with "ing" where "eing" ending is also a word', () => {
      let wordOrPhrase = "binging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PWEUPBG/-G", 1 ]);
    });

    it('with orthography rule to append "eing" where replacing "e" with "ing" is also a word', () => {
      let wordOrPhrase = "bingeing";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "PWEUPB/-PBLG/TK-LS/-G", 1 ]);
    });

    it('with orthography rule to replace "e" with "ing"', () => {
      let wordOrPhrase = "lodging";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HROPBLG/-G", 1 ]);
    });

    xit('with orthography rule to replace "e" with "ing" and append an "s" using multiple suffixes', () => {
      let wordOrPhrase = "lodgings";
      let chosenStroke = "";
      let strokeLookupAttempts = 0;

      expect(chooseOutlineForPhrase(wordOrPhrase, globalLookupDictionary, chosenStroke, strokeLookupAttempts, precedingChar)).toEqual( [ "HROPBLG/-G/-S", 1 ]);
    });
  });


  describe('returns fingerspelling results for single letters except for single-letter words', () => {
    it('first third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "a b c d e f g h i";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEU PW* KR* TK* *E TP* TKPW* H* *EU");
    });

    it('second third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "j k l m n o p q r";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR* K* HR* PH* TPH* O* P* KW* R*");
    });

    it('final third lowercase alphabet', () => {
      let wordOrPhraseMaterial = "s t u v w x y z";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S* T* *U SR* W* KP* KWR* STKPW*");
    });

    it('first third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "A B C D E F G H I";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/AEU PW*P KR*P TK*P *EP TP*P TKPW*P H*P EU");
    });

    it('second third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "J K L M N O P Q R";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKWR*P K*P HR*P PH*P TPH*P O*P P*P KW*P R*P");
    });

    it('final third uppercase alphabet', () => {
      let wordOrPhraseMaterial = "S T U V W X Y Z";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("S*P T*P *UP 5R W*P 10R KWR*P STKPW*P");
    });
  });

  describe('returns string showing text with spaced punctuation', () => {
    it('common punctuation', () => {
      let wordOrPhraseMaterial = "! # $ % & , . : ; = ? @";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("SKHRAPL HAERB TPHRORB P*ERS SKP* KW-BG TP-PL KHR-PB SKHR-PB KW-L H-F SKWRAT");
    });

    it('other punctuation', () => {
      let wordOrPhraseMaterial = "* ^ ` | ~ — – - ©";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("STA*R KR-RT KH-FG PAO*EUP T*LD EPL/TKA*RB EPB/TKA*RB H*B KPR-T");
    });

    it('brackets', () => {
      let wordOrPhraseMaterial = "( ) [ ] { }";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PREPB PR*EPB PWR-BGT PWR*BGT TPR-BGT TPR*BGT");
    });
  });

  describe('returns string containing top-level domain', () => {
    it('shows outline for ".com"', () => {
      let wordOrPhraseMaterial = ".com";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KROPL");
    });

    xit('shows outline for "didoesdigital.com"', () => {
      let wordOrPhraseMaterial = "didoesdigital.com";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/*EU/TK*/O*/*E/S*/TK*/*EU/TKPW*/*EU/T*/A*/HR* KROPL");
    });
  });

  describe('returns outlines for capitalised word with trailing full stop', () => {
    it('shows outline for "Mass."', () => {
      let wordOrPhraseMaterial = "Mass.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA/PHAS TP-PL");
    });
  });

  describe('returns outline for string containing formal titles', () => {
    it('shows outline for "Dr."', () => {
      let wordOrPhraseMaterial = "Dr.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKR-FPLT");
    });

    it('shows outline for "Dr. Chant"', () => {
      let wordOrPhraseMaterial = "Dr. Chant";
      // Note: It would be amazing if it didn't choose KPA/ here but that seems really hard
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TKR-FPLT KPA/KHAPBT");
    });

    it('shows outline for "Mx."', () => {
      let wordOrPhraseMaterial = "Mx.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PH-BGS");
    });

    it('shows outline for "Mx. Eldridge"', () => {
      let wordOrPhraseMaterial = "Mx. Eldridge";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PH-BGS EL/TKREUPBLG");
    });

    it('shows outline for "Mr. and Mrs."', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs.";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHRARPLS");
    });

    xit('shows outline for "Mr. and Mrs. Long"', () => {
      let wordOrPhraseMaterial = "Mr. and Mrs. Long";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("PHRARPLS KPA/HROPBG");
    });
  });

  describe('returns string showing text with numbers', () => {
    it('zero to five with dashes', () => {
      // let wordOrPhraseMaterial = "0.1.2.3.4.5.6.7.8.9.10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O P-P #S P-P #T- P-P #P- P-P #H P-P #A P-P #F P-P #-P P-P #L P-P #-T 1/0");
      let wordOrPhraseMaterial = "-0-1-2-3-4-5";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H*B #O H-PB #S H-PB #T- H-PB #P- H-PB #H H-PB #A");
    });

    it('five to ten with dashes', () => {
      // let wordOrPhraseMaterial = "0.1.2.3.4.5.6.7.8.9.10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O P-P #S P-P #T- P-P #P- P-P #H P-P #A P-P #F P-P #-P P-P #L P-P #-T 1/0");
      let wordOrPhraseMaterial = "-5-6-7-8-9-10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("H*B #A H-PB #F H-PB #-P H-PB #L H-PB #-T H-PB 1/0");
    });

    it('zero to ten with spaces', () => {
      // let wordOrPhraseMaterial = "0 1 2 3 4 5 6 7 8 9 10";
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O #S #T- #P- #H #A #F #-P #L #-T 1/0");
      let wordOrPhraseMaterial = "0 0 1 2 3 4 5 6 7 8 9 10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("#O 0EU 1 2 3 4 R5 6 7 8 9 1/0");
    });

    it('returns strings with numbers containing zeroes and commas', () => {
      let wordOrPhraseMaterial = "100 900 1000 1,000 10000 10,000";
      // FIXME: should probably show #SZ #TZ #TPHOUZ #SO/W-B/THUZ 10/THUZ #SO/W-B/THUZ
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1/0/0 9/0/0 1/0/0/0 1 KW-BG 0/0/0 1/0/0/0/0 1/0 KW-BG 0/0/0");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-Z -9Z 1/THOUZ TPHOUZ 1-Z/HUPB/HUPB #SO/W-B/THUZ");
    });

    it('returns string with double numbers', () => {
      let wordOrPhraseMaterial = "22 33";
      // FIXME: should probably show #T-D or 2-D and #P-D
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("2-D 3-D");
    });

    it('returns string with currency', () => {
      let wordOrPhraseMaterial = "$100 $900";
      // FIXME: should probably show #SDZ #-TDZ
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-DZ TK-PL -9Z");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-DZ TPHRORB -9Z");
    });

    it('returns string with clock time', () => {
      let wordOrPhraseMaterial = "1:00 9:00 10:00 19:00 20:00";
      // FIXME: should probably show #SK or #SBG, #KT or #BGT, #SKO or #SOBG, #SKT or #SBGT, and #TKO or #TOBG
      // expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1 KHR-PB 0/0 9 KHR-PB 0/0 1/0 KHR-PB 0/0 1/9 KHR-PB 0/0 2/0 KHR-PB 0/0");
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("1-BG K-9 1/0 KHR-PB #-Z 1-9 KHR-PB #-Z 2/0 KHR-PB #-Z");
    });

    it('showing good stroke hint for known word and suffix with one hyphen', () => {
      let wordOrPhraseMaterial = "kettle-acre";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/A*EURBG");
    });

    it('showing good stroke hint for known word and suffix with two hyphens', () => {
      let wordOrPhraseMaterial = "kettle-in-law";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/*EUPB/HRAU");
    });

    it('showing good stroke hint for known word and prefix with one hyphen', () => {
      let wordOrPhraseMaterial = "ani-kettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEUPB/SKWREU/KET/*L");
    });

    it('showing good stroke hint for known word and prefix with two hyphens', () => {
      let wordOrPhraseMaterial = "over-the-kettle";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AUFR/-T/KET/*L");
    });

    it('showing good stroke hint for known word and suffix containing a colon and numbers', () => {
      let wordOrPhraseMaterial = "kettle:10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KET/*L/10*BG");
    });

    xit('showing good stroke hint for gibberish word and suffix with one hyphen', () => {
      let wordOrPhraseMaterial = "dckx-acre";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/A*EURBG");
    });

    xit('showing good stroke hint for gibberish word and suffix with two hyphens', () => {
      let wordOrPhraseMaterial = "dckx-in-law";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/*EUPB/HRAU");
    });

    xit('showing good stroke hint for gibberish word and prefix with one hyphen', () => {
      let wordOrPhraseMaterial = "ani-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AEUPB/SKWREU/TK*/KR*/K*/KP*");
    });

    xit('showing good stroke hint for gibberish word and prefix with two hyphens', () => {
      let wordOrPhraseMaterial = "over-the-dckx";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("AUFR/-T/TK*/KR*/K*/KP*");
    });

    xit('showing good stroke hint for gibberish word and suffix containing a colon and numbers', () => {
      let wordOrPhraseMaterial = "dckx:10";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("TK*/KR*/K*/KP*/10*BG");
    });

    it('showing good stroke hint for one lowercase word hash tag', () => {
      let wordOrPhraseMaterial = "#steno";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB STOEUPB");
    });

    xit('showing good stroke hint for one capitalised word hash tag', () => {
      let wordOrPhraseMaterial = "#Steno";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB");
    });

    xit('showing good stroke hint for camel case hash tags', () => {
      let wordOrPhraseMaterial = "#StenoLife";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("HAERB KPA*/STOEUPB KPA*/HRAOEUF");
    });

    xit('showing good stroke hint for camel case hash tags in a sentence', () => {
      let wordOrPhraseMaterial = "This is #StenoLife";
      expect(createStrokeHintForPhrase(wordOrPhraseMaterial, globalLookupDictionary)).toEqual("KPA*/TH S HAERB KPA*/STOEUPB KPA*/HRAOEUF");
    });
  });
});
