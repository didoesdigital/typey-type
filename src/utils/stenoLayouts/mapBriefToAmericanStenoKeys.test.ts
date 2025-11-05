import mapBriefToAmericanStenoKeys from "./mapBriefToAmericanStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
    const brief = "";
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
    const brief = "T";
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
    const brief = "-T";
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
    const brief = "AO*EUS";
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
    const brief = "HR-BG";
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
    const brief = "KR";
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
    const brief = "-B";
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
    const brief = "SAEUPL";
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
    const brief = "PH*P";
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
    const brief = "⌘";
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
    const brief = "0EU7S";
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
    const brief = "0EU9";
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
    const brief = "1-D";
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
    const brief = "#TPEU"; // 32
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
    const brief = "#AOEU";
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
