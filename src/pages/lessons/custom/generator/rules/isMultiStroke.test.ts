import isMultiStroke from "./isMultiStroke";

describe("isMultiStroke", () => {
  it("returns true for outlines with slashes", async () => {
    expect(isMultiStroke("A/WAEU", "away")).toEqual(true);
  });

  it("returns false for distributing with 2 strokes", async () => {
    expect(isMultiStroke("TKR-BT/-G", "distributing")).toEqual(false);
  });

  it("returns false for outlines without slashes", async () => {
    expect(isMultiStroke("TEFT", "test")).toEqual(false);
  });
});
