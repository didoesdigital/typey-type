import mapBriefToBrazilianPortugueseStenoKeys from "./mapBriefToBrazilianPortugueseStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
    let brief = "";
    expect(mapBriefToBrazilianPortugueseStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftKKey: false,
      leftTKey: false,
      leftFKey: false,
      leftPKey: false,
      leftLKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightRKey: false,
      rightWKey: false,
      rightBKey: false,
      rightPKey: false,
      rightGKey: false,
      rightHKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("shows FLR*EBG for fonema", () => {
    let brief = "FLR*EBG";
    expect(mapBriefToBrazilianPortugueseStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftKKey: false,
      leftTKey: false,
      leftFKey: true,
      leftPKey: false,
      leftLKey: true,
      leftRKey: true,
      leftAKey: false,
      leftOKey: false,
      starKey: true,
      dashKey: false,
      rightEKey: true,
      rightUKey: false,
      rightRKey: false,
      rightWKey: false,
      rightBKey: true,
      rightPKey: false,
      rightGKey: true,
      rightHKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("has outlines for words with accents like preparação", () => {
    let brief = "PRAEPS";
    expect(mapBriefToBrazilianPortugueseStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftKKey: false,
      leftTKey: false,
      leftFKey: false,
      leftPKey: true,
      leftLKey: false,
      leftRKey: true,
      leftAKey: true,
      leftOKey: false,
      starKey: false,
      dashKey: false,
      rightEKey: true,
      rightUKey: false,
      rightRKey: false,
      rightWKey: false,
      rightBKey: false,
      rightPKey: true,
      rightGKey: false,
      rightHKey: false,
      rightTKey: false,
      rightSKey: true,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("handles numbers like 3", () => {
    let brief = "TRES";
    expect(mapBriefToBrazilianPortugueseStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftKKey: false,
      leftTKey: true,
      leftFKey: false,
      leftPKey: false,
      leftLKey: false,
      leftRKey: true,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
      dashKey: false,
      rightEKey: true,
      rightUKey: false,
      rightRKey: false,
      rightWKey: false,
      rightBKey: false,
      rightPKey: false,
      rightGKey: false,
      rightHKey: false,
      rightTKey: false,
      rightSKey: true,
      rightDKey: false,
      rightZKey: false,
    });
  });
});
