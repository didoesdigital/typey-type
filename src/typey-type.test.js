import {
  createWordListFromMetWords,
  parseCustomMaterial,
  matchSplitText,
  generateDictionaryEntries,
  loadPersonalPreferences,
  lookUpDictionaryInIndex,
  processDictionary,
  strokeAccuracy,
  splitBriefsIntoStrokes,
  trimAndSumUniqMetWords,
  swapKeyValueInDictionary,
  writePersonalPreferences,
  mapBriefToAmericanStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  repetitionsRemaining,
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
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: false,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: false,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows punctuation brief for 。', () => {
    let brief = "「か-か」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: true,
      theLeft4Key: false,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: true,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: true,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: true,
      theカKey: false
    });
  });

  it('shows punctuation brief for ？', () => {
    let brief = "「-たかいお」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: true,
      theLeft4Key: false,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: true,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: true,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: true,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: true,
      theRightっKey: false,
      theRightKagikakkoKey: true,
      theカKey: false
    });
  });

  it('shows brief for number 50', () => {
    let brief = "41-4321";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: true,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: true,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: true,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: true,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: true,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: true,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief for number 89', () => {
    let brief = "431-432";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: true,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: true,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: true,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: true,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: true,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: true,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief for ambiguous kanji with dash 刊', () => {
    let brief = "漢432っ-た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: true,
      theLeftKagikakkoKey: false,
      theLeft4Key: true,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: true,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: true,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: true,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: true,
      theRightなKey: false,
      theRight3Key: true,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: true,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: true,
      theRightっKey: true,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief for ambiguous kanji with star 刑', () => {
    let brief = "漢432っ*た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: true,
      theLeftKagikakkoKey: false,
      theLeft4Key: true,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: true,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: true,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: true,
      theStarKey: true,
      dash: false,
      theRight4Key: false,
      theRightたKey: true,
      theRightなKey: false,
      theRight3Key: true,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: true,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: true,
      theRightっKey: true,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief for first stroke of multi-stroke word 食べる', () => {
    let brief = "漢たさうおっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: true,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: true,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: true,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: true,
      theLeft1Key: false,
      theLeftおKey: true,
      theLeftっKey: true,
      theStarKey: false,
      dash: false,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief for second stroke of multi-stroke word 食べる', () => {
    let brief = "たなさいうお-たなう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: true,
      theLeftなKey: true,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: true,
      theLeft2Key: false,
      theLeftいKey: true,
      theLeftうKey: true,
      theLeft1Key: false,
      theLeftおKey: true,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: true,
      theRightなKey: true,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: true,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief with left keys for だ', () => {
    let brief = "たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: true,
      theLeftなKey: true,
      theLeft3Key: false,
      theLeftかKey: true,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: false,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief with right keys for だ', () => {
    let brief = "-たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: false,
      theLeftなKey: false,
      theLeft3Key: false,
      theLeftかKey: false,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: false,
      theLeftうKey: false,
      theLeft1Key: false,
      theLeftおKey: false,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: true,
      theRightなKey: true,
      theRight3Key: false,
      theRightかKey: true,
      theRightさKey: false,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: false,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows brief with left and right keys for です', () => {
    let brief = "たなかいうお-さう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: false,
      theLeftKagikakkoKey: false,
      theLeft4Key: false,
      theLeftたKey: true,
      theLeftなKey: true,
      theLeft3Key: false,
      theLeftかKey: true,
      theLeftさKey: false,
      theLeft2Key: false,
      theLeftいKey: true,
      theLeftうKey: true,
      theLeft1Key: false,
      theLeftおKey: true,
      theLeftっKey: false,
      theStarKey: false,
      dash: true,
      theRight4Key: false,
      theRightたKey: false,
      theRightなKey: false,
      theRight3Key: false,
      theRightかKey: false,
      theRightさKey: true,
      theRight2Key: false,
      theRightいKey: false,
      theRightうKey: true,
      theRight1Key: false,
      theRightおKey: false,
      theRightっKey: false,
      theRightKagikakkoKey: false,
      theカKey: false
    });
  });

  it('shows all keys for full steno order ignoring dash', () => {
    let brief = '漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ';
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢Key: true,
      theLeftKagikakkoKey: true,
      theLeft4Key: true,
      theLeftたKey: true,
      theLeftなKey: true,
      theLeft3Key: true,
      theLeftかKey: true,
      theLeftさKey: true,
      theLeft2Key: true,
      theLeftいKey: true,
      theLeftうKey: true,
      theLeft1Key: true,
      theLeftおKey: true,
      theLeftっKey: true,
      theStarKey: true,
      dash: false,
      theRight4Key: true,
      theRightたKey: true,
      theRightなKey: true,
      theRight3Key: true,
      theRightかKey: true,
      theRightさKey: true,
      theRight2Key: true,
      theRightいKey: true,
      theRightうKey: true,
      theRight1Key: true,
      theRightおKey: true,
      theRightっKey: true,
      theRightKagikakkoKey: true,
      theカKey: true
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
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
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
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
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
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" cut"]});
    });

    it('you wrote sign, ss, and ss for sciences', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " ss", " s", " ss", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" sign", " ss", " ss"]});
    });

    it('you wrote "verticax", "verticaw" for vertical', () => {
      let currentPhraseAttempts = [" ", " v", " ve", " ver", " vert", " verti", " vertic", " vertica", " verticax", " verticaw", " vertical"];
      let targetStrokeCount = 2;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: false, attempts: [" verticax", " verticaw"]});
    });

//     it("you wrote were instead of we're", () => {
//       let currentPhraseAttempts = [
//       " ",
//         " w",
//         " we",
//         " wer",
//         " were",
//         " wer",
//         " we",
//         " w",
//         " ",
//         " w",
//         " we",
//         " we'",
//         " we'r",
//         " we're"
//       ];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });

//     it("you wrote we're instead of were", () => {
//       let currentPhraseAttempts = [" ", " w", " we", " we'", " we'r", " we're", " we'r", " we'", " we", " w", " ", " w", " we", " wer", " were"];
//       let targetStrokeCount = 1;
//       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
//     });
  });

  describe('should return true for real successful meetings', () => {
    it('should return true for real successful meetings', () => {
      let currentPhraseAttempts = [" ", " s", " si", " sig", " sign", " sig", " si", " s", " sc", " sci", " scie", " scien", " scienc", " science", " sciences"];
      let targetStrokeCount = 3;
      expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual({strokeAccuracy: true, attempts: [" sign"]});
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

    expect(generateDictionaryEntries(wordList, sourceWordsAndStrokes)).toEqual(
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
    // expect(generateDictionaryEntries(wordList, sourceWordsAndStrokes)).toEqual(
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
      }
      let flashcardsProgress = {}
      let lessonsProgress = {};
      let userSettings = {
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
        showStrokesAsDiagrams: false,
        stenoLayout: 'stenoLayoutAmericanSteno',
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        speakMaterial: false,
        sortOrder: 'sortOff',
        seenWords: true,
        study: 'discover'
      };
      expect(loadPersonalPreferences()).toEqual([metWords, userSettings, flashcardsMetWords, flashcardsProgress, lessonsProgress]);
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

describe('processDictionary', () => {
  describe('without dictionary commands', () => {
    it('should return as it was', () => {
      let dictionary = { "design": "STKAOEUPB" };
      // expect(processDictionary(dictionary)).toEqual({ "design": "STKAOEUPB" });
      expect(processDictionary(dictionary)).toEqual({ "design": "STKAOEUPB", "0": "#O", "1": "#S", "2": "#T-", "3": "#P-", "4": "#H", "5": "#A", "6": "#F", "7": "#-P", "8": "#L", "9": "#-T", });
    });
  });
  describe('with dictionary commands', () => {
    it('should return with command characters stripped', () => {
      let dictionary = { "{^ ^}": "S-P" };
      // expect(processDictionary(dictionary)).toEqual({ " ": "S-P" });
      expect(processDictionary(dictionary)).toEqual({ " ": "S-P", "0": "#O", "1": "#S", "2": "#T-", "3": "#P-", "4": "#H", "5": "#A", "6": "#F", "7": "#-P", "8": "#L", "9": "#-T",  });
    });
  });
});

describe('swapKeyValueInDictionary', () => {
  it('should log error', () => {
    let dictionary = { "hi": "HEU", "HAEU": "hey" };
    expect(swapKeyValueInDictionary(dictionary)).toEqual({ "HEU": "hi", "hey": "HAEU" });
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
