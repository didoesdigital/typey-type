import {
  createWordListFromMetWords,
  parseCustomMaterial,
  matchSplitText,
  loadPersonalPreferences,
  lookUpDictionaryInIndex,
  mapQWERTYKeysToStenoStroke,
  strokeAccuracy,
  splitBriefsIntoStrokes,
  trimAndSumUniqMetWords,
  // writePersonalPreferences,
  mapBriefToAmericanStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  migratePersonalDictionariesV0ToV1,
  migratePersonalDictionariesV1ToV2,
  repetitionsRemaining,
  runAllPersonalDictionariesMigrations,
  updateCapitalisationStrokesInNextItem
} from './typey-type';
import Zipper from './zipper';

describe('sum uniq met words', () => {
  it('returns met words without duplicate entries with different spacing', () => {
    let metWords = {"the": 1, " the": 3, "the ": 2, "steno": 1};
    expect(trimAndSumUniqMetWords(metWords)).toEqual(
      {"the": 6, "steno": 1}
    );
  });
});

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

describe('split briefs into strokes', () => {
  it('returns single stroke as array of that stroke', () => {
    let currentStroke = "SAEUPL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["SAEUPL"]
    );
  });

  it('returns multi-stroke word as array of strokes', () => {
    let currentStroke = "A/WAEU";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["A","WAEU"]
    );
  });

  it('returns phrase with spaces as array of strokes', () => {
    let currentStroke = "-T WUPB";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["-T","WUPB"]
    );
  });

  it('returns phrase with spaces and slashes as array of strokes', () => {
    let currentStroke = "T/SEF or T/SEFL";
    expect(splitBriefsIntoStrokes(currentStroke)).toEqual(
      ["T","SEF","or","T","SEFL"]
    );
  });
});

describe('map stroke to keys', () => {
  it('show no keys for empty brief', () => {
    let brief = "";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });

  it('shows left-hand T for "it"', () => {
    let brief = "T";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: true,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });


  it('shows right-hand -T for "the"', () => {
    let brief = "-T";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: true,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });

  it('show star key for brief with star "eyes"', () => {
    let brief = "AO*EUS";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: true,
      leftO: true,
      star: true,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: true,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for dash only brief "welcome"', () => {
    let brief = "HR-BG";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: true,
      leftR: true,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: true,
      rightL: false,
      rightG: true,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for left-side only brief "consider"', () => {
    let brief = "KR";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: true,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: true,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show keys for right-side only brief "be"', () => {
    let brief = "-B";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: true,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show 5 keys for "same" brief', () => {
    let brief = "SAEUPL";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: true,
      leftSLower: true,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: true,
      leftO: false,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: true,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show 1 key for "M" brief', () => {
    let brief = "PH*P";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: true,
      leftW: false,
      leftH: true,
      leftR: false,
      leftA: false,
      leftO: false,
      star: true,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: false,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: false,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing numbers and letters for 70s', () => {
    let brief = "0EU7S";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: true,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: true,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: true,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing numbers for 90', () => {
    let brief = "0EU9";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: false,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: true,
      star: false,
      dash: false,
      rightE: true,
      rightU: true,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: true,
      rightS: false,
      rightD: false,
      rightZ: false
    });
  });

  it('show correct brief containing duplicated numbers like 11', () => {
    let brief = "1-D";
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: true,
      leftSLower: false,
      leftT: false,
      leftK: false,
      leftP: false,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
      star: false,
      dash: true,
      rightE: false,
      rightU: false,
      rightF: false,
      rightR: false,
      rightP: false,
      rightB: false,
      rightL: false,
      rightG: false,
      rightT: false,
      rightS: false,
      rightD: true,
      rightZ: false
    });
  });
});

describe('map Japanese stroke to Japanese keys', () => {
  // let japaneseOrder = '漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ';
  it('show no keys for empty brief', () => {
    let brief = "";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows punctuation brief for 。', () => {
    let brief = "「か-か」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: true,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: true,
      theカ: false
    });
  });

  it('shows punctuation brief for ？', () => {
    let brief = "「-たかいお」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: true,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: true,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: false,
      theRightKagikakko: true,
      theカ: false
    });
  });

  it('shows brief for number 50', () => {
    let brief = "41-4321";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: true,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: true,
      theRightた: false,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: true,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for number 89', () => {
    let brief = "431-432";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: true,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: true,
      theRightた: false,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for ambiguous kanji with dash 刊', () => {
    let brief = "漢432っ-た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: true,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: true,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for ambiguous kanji with star 刑', () => {
    let brief = "漢432っ*た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: true,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: true,
      theStar: true,
      dash: false,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for first stroke of multi-stroke word 食べる', () => {
    let brief = "漢たさうおっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: true,
      theLeft2: false,
      theLeftい: false,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: true,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for second stroke of multi-stroke word 食べる', () => {
    let brief = "たなさいうお-たなう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: true,
      theLeft2: false,
      theLeftい: true,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: true,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: true,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with left keys for だ', () => {
    let brief = "たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with right keys for だ', () => {
    let brief = "-たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: true,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with left and right keys for です', () => {
    let brief = "たなかいうお-さう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: true,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: true,
      theRight2: false,
      theRightい: false,
      theRightう: true,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows all keys for full steno order ignoring dash', () => {
    let brief = '漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ';
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: true,
      theLeft4: true,
      theLeftた: true,
      theLeftな: true,
      theLeft3: true,
      theLeftか: true,
      theLeftさ: true,
      theLeft2: true,
      theLeftい: true,
      theLeftう: true,
      theLeft1: true,
      theLeftお: true,
      theLeftっ: true,
      theStar: true,
      dash: false,
      theRight4: true,
      theRightた: true,
      theRightな: true,
      theRight3: true,
      theRightか: true,
      theRightさ: true,
      theRight2: true,
      theRightい: true,
      theRightう: true,
      theRight1: true,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: true,
      theカ: true
    });
  });
});

describe('map Italian stroke to Michela keys', () => {
  // let michelaOrder = 'FSCZPNRXIUuieanpzcsf';
  it('show no keys for empty brief', () => {
    let brief = "";
    expect(mapBriefToItalianMichelaStenoKeys(brief)).toEqual({
      leftCapitalF: false,
      leftCapitalS: false,
      leftCapitalC: false,
      leftCapitalZ: false,
      leftCapitalP: false,
      leftCapitalN: false,
      leftCapitalR: false,
      leftCapitalX: false,
      leftCapitalI: false,
      leftCapitalU: false,
      uRightLowercase: false,
      iRightLowercase: false,
      eRightLowercase: false,
      aRightLowercase: false,
      nRightLowercase: false,
      pRightLowercase: false,
      zRightLowercase: false,
      cRightLowercase: false,
      sRightLowercase: false,
      fRightLowercase: false,
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToItalianMichelaStenoKeys(brief)).toEqual({
      leftCapitalF: false,
      leftCapitalS: false,
      leftCapitalC: false,
      leftCapitalZ: false,
      leftCapitalP: false,
      leftCapitalN: false,
      leftCapitalR: false,
      leftCapitalX: false,
      leftCapitalI: false,
      leftCapitalU: false,
      uRightLowercase: false,
      iRightLowercase: false,
      eRightLowercase: false,
      aRightLowercase: false,
      nRightLowercase: false,
      pRightLowercase: false,
      zRightLowercase: false,
      cRightLowercase: false,
      sRightLowercase: false,
      fRightLowercase: false,
    });
  });

  it('shows mixed case brief', () => {
    let brief = "FCPXienf";
    expect(mapBriefToItalianMichelaStenoKeys(brief)).toEqual({
      leftCapitalF: true,
      leftCapitalS: false,
      leftCapitalC: true,
      leftCapitalZ: false,
      leftCapitalP: true,
      leftCapitalN: false,
      leftCapitalR: false,
      leftCapitalX: true,
      leftCapitalI: false,
      leftCapitalU: false,
      uRightLowercase: false,
      iRightLowercase: true,
      eRightLowercase: true,
      aRightLowercase: false,
      nRightLowercase: true,
      pRightLowercase: false,
      zRightLowercase: false,
      cRightLowercase: false,
      sRightLowercase: false,
      fRightLowercase: true,
    });
  });

  it('shows brief for numbers', () => {
    let brief = "XI";
    expect(mapBriefToItalianMichelaStenoKeys(brief)).toEqual({
      leftCapitalF: false,
      leftCapitalS: false,
      leftCapitalC: false,
      leftCapitalZ: false,
      leftCapitalP: false,
      leftCapitalN: false,
      leftCapitalR: false,
      leftCapitalX: true,
      leftCapitalI: true,
      leftCapitalU: false,
      uRightLowercase: false,
      iRightLowercase: false,
      eRightLowercase: false,
      aRightLowercase: false,
      nRightLowercase: false,
      pRightLowercase: false,
      zRightLowercase: false,
      cRightLowercase: false,
      sRightLowercase: false,
      fRightLowercase: false,
    });
  });

  it('shows all keys for full steno order', () => {
    let brief = 'FSCZPNRXIUuieanpzcsf';
    expect(mapBriefToItalianMichelaStenoKeys(brief)).toEqual({
      leftCapitalF: true,
      leftCapitalS: true,
      leftCapitalC: true,
      leftCapitalZ: true,
      leftCapitalP: true,
      leftCapitalN: true,
      leftCapitalR: true,
      leftCapitalX: true,
      leftCapitalI: true,
      leftCapitalU: true,
      uRightLowercase: true,
      iRightLowercase: true,
      eRightLowercase: true,
      aRightLowercase: true,
      nRightLowercase: true,
      pRightLowercase: true,
      zRightLowercase: true,
      cRightLowercase: true,
      sRightLowercase: true,
      fRightLowercase: true,
    });
  });
});

describe('stroke accuracy for current phrase', () => {
  describe('should return false for real failed meetings', () => {
    it('you wrote cut instead of cat and Plover backtracked to " c"', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote cut instead of cat and Plover backtracked to " "', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote cut instead of cat and Plover backtracked to ""', () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " cu",
        " cut",
        " cu",
        " c",
        " ",
        "",
        " ",
        " c",
        " ca",
        " cat"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote sign, ss, and ss for sciences', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " ss", " s", " ss", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" sign", " ss", " ss"]});
    });

    it('you wrote "verticax", "verticaw" for vertical', () => {
      let currentPhraseAttempts = [" ", " v", " ve", " ver", " vert", " verti", " vertic", " vertica", " verticax", " verticaw", " vertical"];
      let targetStrokeCount = 2;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" verticax", " verticaw"]});
    });

    it("you wrote were instead of we're", () => {
      let currentPhraseAttempts = [
        " ",
        " w",
        " we",
        " wer"
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
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" wer"]});
    });

    it("you wrote x when trying to write courageous in 1 stroke, giving you a misstroke AND recording x in attempts for feedback", () => {
      let currentPhraseAttempts = [
        "x"
      ];
      let targetStrokeCount = 1;
      let unmatchedActual = "x";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: ["x"]});
    });

    it("you wrote cor when trying to write courageous in 1 stroke", () => {
      let currentPhraseAttempts = [
        " ",
        " c",
        " co",
        " cor"
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
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: false, attempts: [" cor"]});
    });

//     it("you wrote we're instead of were", () => {
//       let currentPhraseAttempts = [" ", " w", " we", " we'", " we'r", " we're", " we'r", " we'", " we", " w", " ", " w", " we", " wer", " were"];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });
  });

  describe('should return true for real successful meetings', () => {
    it('you wrote sign and sciences for sciences with 3 stroke target', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      let unmatchedActual = "";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: true, attempts: [" sign"]});
    });

    it("you wrote sigh then sig when trying to write silent in 2 strokes", () => {
      let currentPhraseAttempts = [
        " ",
        " s",
        " si",
        " sig",
        " sigh",
        " sig"
      ];
      let targetStrokeCount = 2;
      let unmatchedActual = "g";
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount, unmatchedActual)).toEqual({strokeAccuracy: true, attempts: [" sigh"]});
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

describe('loadPersonalPreferences', () => {
  describe('without localStorage', () => {
    it('should return previously met words and user settings', () => {
      let metWords = {};
      let flashcardsMetWords = {
        "the": {
          "phrase": "the",
          "stroke": "-T",
          "rung": 0
        }
      };
      let flashcardsProgress = {};
      let globalUserSettings = {
        experiments: {},
        flashcardsCourseLevel: "noviceCourse",
        showMisstrokesInLookup: false,
        writerInput: "qwerty"
      };
      let lessonsProgress = {};
      let recentLessons = {history: []};
      let topSpeedPersonalBest = 0;
      let userGoals = {
        newWords: 15,
        oldWords: 50
      }
      let userSettings = {
        beatsPerMinute: 10,
        blurMaterial: false,
        caseSensitive: false,
        simpleTypography: true,
        retainedWords: true,
        limitNumberOfWords: 45,
        startFromWord: 1,
        newWords: true,
        repetitions: 3,
        showScoresWhileTyping: true,
        showStrokes: true,
        showStrokesAsDiagrams: true,
        showStrokesOnMisstroke: true,
        stenoLayout: 'stenoLayoutAmericanSteno',
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        speakMaterial: false,
        textInputAccessibility: true,
        sortOrder: 'sortOff',
        seenWords: true,
        study: 'discover'
      };
      expect(loadPersonalPreferences()).toEqual([metWords, userSettings, flashcardsMetWords, flashcardsProgress, globalUserSettings, lessonsProgress, recentLessons, topSpeedPersonalBest, userGoals]);
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

// describe('migratePersonalDictionariesV', () => {
//   let startingV0Dictionaries = [["personal.json",{"TAO*EUPT": "Typey Type"}]];
//   let startingV1Dictionaries = {"v":"1","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"}]]};
//   let migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);

//   describe('runAllPersonalDictionariesMigrations', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns true dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns false dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           false
//         ])
//       });
//     });
//   });

//   describe('v0 to v1', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns dictionary migrated to v1 and true dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns same v1 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           false
//         ])
//       });
//     });
//   });
// });

describe('migratePersonalDictionariesV', () => {
  let startingV0Dictionaries = [["personal.json",{"TAO*EUPT": "Typey Type"}]];
  let startingV1Dictionaries = {"v":"1","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"}]]};
  let startingV2Dictionaries = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
  let migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);
  let migratedV2DictionariesWithExistingV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
  let migratedV2DictionariesWithEmptyV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{}]]};

  describe('runAllPersonalDictionariesMigrations', () => {
    let dirtyFlag = false;

    describe('where local storage had v0 format', () => {
      it('returns true dirty flag', () => {
        expect(runAllPersonalDictionariesMigrations(startingV0Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithEmptyV2Info,
          true
        ])
      });
    });

    describe('where local storage had v1 format', () => {
      it('returns true dirty flag', () => {
        expect(runAllPersonalDictionariesMigrations(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithEmptyV2Info,
          true
        ])
      });
    });

    describe('where local storage had v2 format', () => {
      it('returns false dirty flag', () => {
        expect(runAllPersonalDictionariesMigrations(startingV2Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithExistingV2Info,
          false
        ])
      });
    });
  });

  describe('v0 to v1', () => {
    let dirtyFlag = false;

    describe('where local storage had v0 format', () => {
      it('returns dictionary migrated to v1 and dirty flag', () => {
        expect(migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          true
        ])
      });
    });

    describe('where local storage had v1 format', () => {
      it('returns existing v1 dictionary and false dirty flag', () => {
        expect(migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV1Dictionaries,
          false
        ])
      });
    });

    describe('where local storage had v2 format', () => {
      it('returns existing v2 dictionary and false dirty flag', () => {
        expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithExistingV2Info,
          false
        ])
      });
    });
  });

  describe('v1 to v2', () => {
    describe('where local storage had v1 format', () => {
      let dirtyFlag = false;
      it('returns dictionary migrated to v2 and true dirty flag', () => {
        expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithEmptyV2Info,
          true
        ])
      });
    });

    describe('where local storage had v0 format and has just been migrated to v1', () => {
      let dirtyFlag = true;
      it('returns dictionary migrated to v2 and true dirty flag', () => {
        expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithEmptyV2Info,
          true
        ])
      });
    });

    describe('where local storage had v2 format', () => {
      let dirtyFlag = false;
      it('returns existing v2 dictionary and false dirty flag', () => {
        expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
          migratedV2DictionariesWithExistingV2Info,
          false
        ])
      });
    });
  });
});
