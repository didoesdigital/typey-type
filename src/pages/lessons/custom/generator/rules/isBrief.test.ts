import isBrief from "./isBrief";

describe("isBrief", () => {
  it("returns true for left-side only strokes", async () => {
    expect(isBrief("KEU", "can I")).toEqual(true);
  });

  it("returns true for right-side only strokes", async () => {
    expect(isBrief("OEB", "observe")).toEqual(true);
  });

  it("returns true for only single-key vowel strokes", async () => {
    expect(isBrief("U", "you")).toEqual(true);
  });

  it("returns true for skeleton briefs with no vowels or stars", async () => {
    expect(isBrief("P-B", "peanut butter")).toEqual(true);
  });

  it("returns true for specific exceptions", async () => {
    expect(isBrief("HEPS", "helps")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(isBrief("TEFT", "test")).toEqual(false);
  });
});
