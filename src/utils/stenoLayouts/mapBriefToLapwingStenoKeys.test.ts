import mapBriefToLapwingStenoKeys from "utils/stenoLayouts/mapBriefToLapwingStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
    const brief = "";
    expect(mapBriefToLapwingStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
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

  it('shows left-hand S for "is"', () => {
    const brief = "S";
    expect(mapBriefToLapwingStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: true,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
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

  it('show keys for dash-only brief "welcome"', () => {
    const brief = "HR-BG";
    expect(mapBriefToLapwingStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: true,
      leftRKey: true,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
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
    const brief = "⌘";
    expect(mapBriefToLapwingStenoKeys(brief)).toEqual({
      numberBarKey: false,
      leftSKey: false,
      leftTKey: false,
      leftKKey: false,
      leftPKey: false,
      leftWKey: false,
      leftHKey: false,
      leftRKey: false,
      leftAKey: false,
      leftOKey: false,
      starKey: false,
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
