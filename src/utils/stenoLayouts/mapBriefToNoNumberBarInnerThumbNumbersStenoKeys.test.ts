import mapBriefToNoNumberBarInnerThumbNumbersStenoKeys from "./mapBriefToNoNumberBarInnerThumbNumbersStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
    let brief = "";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it('shows left-hand T for "it"', () => {
    let brief = "T";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: true,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it('shows right-hand -T for "the"', () => {
    let brief = "-T";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: true,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: true,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it('shows both S keys for "is"', () => {
    let brief = "S";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: true,
      leftSLowerKey: true,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("shows number key for numbers", () => {
    let brief = "3";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: true,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: true,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("shows left number key for numbers on the right hand", () => {
    let brief = "7";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: true,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: true,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("show all star keys for starred brief", () => {
    let brief = "AO*EUS";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: true,
      leftOKey: true,
      starUpperKey: true,
      starLowerKey: true,
      dashKey: false,
      rightEKey: true,
      rightUKey: true,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: true,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it('show keys for dash-only brief "welcome"', () => {
    let brief = "HR-BG";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: true,
      leftRKey: true,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: true,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: true,
      rightLKey: false,
      rightGKey: true,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });

  it("show nothing when given non-steno letters", () => {
    let brief = "⌘";
    expect(mapBriefToNoNumberBarInnerThumbNumbersStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSUpperKey: false,
      leftSLowerKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starUpperKey: false,
      starLowerKey: false,
      dashKey: false,
      rightEKey: false,
      rightUKey: false,
      rightFKey: false,
      rightRKey: false,
      rightPKey: false,
      rightBKey: false,
      rightLKey: false,
      rightGKey: false,
      rightTKey: false,
      rightSKey: false,
      rightDKey: false,
      rightZKey: false,
    });
  });
});
