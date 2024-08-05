import mapBriefToYaweiChineseStenoKeys from "./mapBriefToYaweiChineseStenoKeys";

describe("map stroke to keys", () => {
  it("show no keys for empty brief", () => {
    let brief = "";
    expect(mapBriefToYaweiChineseStenoKeys(brief)).toEqual({
      "LeftHashKey": false,
      "LeftXKey": false,
      "LeftBKey": false,
      "LeftDKey": false,
      "LeftZKey": false,
      "LeftGKey": false,
      "LeftWKey": false,
      "LeftIKey": false,
      "LeftUKey": false,
      "LeftNKey": false,
      "LeftEKey": false,
      "LeftAKey": false,
      "LeftOKey": false,
      "DashKey": false,
      "RightHashKey": false,
      "RightXKey": false,
      "RightBKey": false,
      "RightDKey": false,
      "RightZKey": false,
      "RightGKey": false,
      "RightWKey": false,
      "RightIKey": false,
      "RightUKey": false,
      "RightNKey": false,
      "RightEKey": false,
      "RightAKey": false,
      "RightOKey": false,
    });
  });

  it("shows left-hand XGIU", () => {
    let brief = "XGIU";
    expect(mapBriefToYaweiChineseStenoKeys(brief)).toEqual({
      "LeftHashKey": false,
      "LeftXKey": true,
      "LeftBKey": false,
      "LeftDKey": false,
      "LeftZKey": false,
      "LeftGKey": true,
      "LeftWKey": false,
      "LeftIKey": true,
      "LeftUKey": true,
      "LeftNKey": false,
      "LeftEKey": false,
      "LeftAKey": false,
      "LeftOKey": false,
      "DashKey": false,
      "RightHashKey": false,
      "RightXKey": false,
      "RightBKey": false,
      "RightDKey": false,
      "RightZKey": false,
      "RightGKey": false,
      "RightWKey": false,
      "RightIKey": false,
      "RightUKey": false,
      "RightNKey": false,
      "RightEKey": false,
      "RightAKey": false,
      "RightOKey": false,
    });
  });

  it("shows right-hand -XGIU", () => {
    let brief = "-XGIU";
    expect(mapBriefToYaweiChineseStenoKeys(brief)).toEqual({
      "LeftHashKey": false,
      "LeftXKey": false,
      "LeftBKey": false,
      "LeftDKey": false,
      "LeftZKey": false,
      "LeftGKey": false,
      "LeftWKey": false,
      "LeftIKey": false,
      "LeftUKey": false,
      "LeftNKey": false,
      "LeftEKey": false,
      "LeftAKey": false,
      "LeftOKey": false,
      "DashKey": true,
      "RightHashKey": false,
      "RightXKey": true,
      "RightBKey": false,
      "RightDKey": false,
      "RightZKey": false,
      "RightGKey": true,
      "RightWKey": false,
      "RightIKey": true,
      "RightUKey": true,
      "RightNKey": false,
      "RightEKey": false,
      "RightAKey": false,
      "RightOKey": false,
    });
  });

  it("handles left-hand numbers like 2", () => {
    let brief = "#N";
    expect(mapBriefToYaweiChineseStenoKeys(brief)).toEqual({
      "LeftHashKey": true,
      "LeftXKey": false,
      "LeftBKey": false,
      "LeftDKey": false,
      "LeftZKey": false,
      "LeftGKey": false,
      "LeftWKey": false,
      "LeftIKey": false,
      "LeftUKey": false,
      "LeftNKey": true,
      "LeftEKey": false,
      "LeftAKey": false,
      "LeftOKey": false,
      "DashKey": false,
      "RightHashKey": false,
      "RightXKey": false,
      "RightBKey": false,
      "RightDKey": false,
      "RightZKey": false,
      "RightGKey": false,
      "RightWKey": false,
      "RightIKey": false,
      "RightUKey": false,
      "RightNKey": false,
      "RightEKey": false,
      "RightAKey": false,
      "RightOKey": false,
    });
  });

  it("handles right-hand numbers like 9", () => {
    let brief = "-#N";
    expect(mapBriefToYaweiChineseStenoKeys(brief)).toEqual({
      "LeftHashKey": false,
      "LeftXKey": false,
      "LeftBKey": false,
      "LeftDKey": false,
      "LeftZKey": false,
      "LeftGKey": false,
      "LeftWKey": false,
      "LeftIKey": false,
      "LeftUKey": false,
      "LeftNKey": false,
      "LeftEKey": false,
      "LeftAKey": false,
      "LeftOKey": false,
      "DashKey": true,
      "RightHashKey": true,
      "RightXKey": false,
      "RightBKey": false,
      "RightDKey": false,
      "RightZKey": false,
      "RightGKey": false,
      "RightWKey": false,
      "RightIKey": false,
      "RightUKey": false,
      "RightNKey": true,
      "RightEKey": false,
      "RightAKey": false,
      "RightOKey": false,
    });
  });
});
