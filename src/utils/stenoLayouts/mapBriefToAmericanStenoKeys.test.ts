import mapBriefToAmericanStenoKeys from "./mapBriefToAmericanStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
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
      rightZ: false,
    });
  });

  it('show keys for dash-only brief "welcome"', () => {
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
      rightZ: false,
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
      rightZ: false,
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
      rightZ: false,
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
      rightZ: false,
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
      rightZ: false,
    });
  });

  it("show nothing when given non-steno letters", () => {
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
      rightZ: false,
    });
  });

  it("show correct brief containing numbers and letters for 70s", () => {
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
      rightZ: false,
    });
  });

  it("show correct brief containing numbers for 90", () => {
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
      rightZ: false,
    });
  });

  it("show correct brief containing duplicated numbers like 11", () => {
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
      rightZ: false,
    });
  });

  it("show # and EU for out-of-steno-order numbers using hash and letter keys", () => {
    let brief = "#TPEU"; // 32
    expect(mapBriefToAmericanStenoKeys(brief)).toEqual({
      numberBar: true,
      leftSUpper: false,
      leftSLower: false,
      leftT: true,
      leftK: false,
      leftP: true,
      leftW: false,
      leftH: false,
      leftR: false,
      leftA: false,
      leftO: false,
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
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });

  it("show number bar for #AOEU to write 05 using hash and letter keys", () => {
    let brief = "#AOEU";
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
      leftA: true,
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
      rightT: false,
      rightS: false,
      rightD: false,
      rightZ: false,
    });
  });
});
