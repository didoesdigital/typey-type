import mapBriefToItalianMichelaStenoKeys from "./mapBriefToItalianMichelaStenoKeys";

describe("map Italian stroke to Michela keys", () => {
  // let michelaOrder = 'FSCZPNRXIUuieanpzcsf';
  it("show no keys for empty brief", () => {
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

  it("show nothing when given non-steno letters", () => {
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

  it("shows mixed case brief", () => {
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

  it("shows brief for numbers", () => {
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

  it("shows all keys for full steno order", () => {
    let brief = "FSCZPNRXIUuieanpzcsf";
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
