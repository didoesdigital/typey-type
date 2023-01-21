import hasStretchKeys from "./hasStretchKeys";

describe("hasStretchKeys", () => {
  it("returns true for did", async () => {
    expect(hasStretchKeys("TKEUD", "did")).toEqual(true);
  });

  it("returns true for busy", async () => {
    expect(hasStretchKeys("PW-Z", "busy")).toEqual(true);
  });

  it("returns true for adds", async () => {
    expect(hasStretchKeys("ADZ", "adds")).toEqual(true);
  });

  it("returns false for was", async () => {
    expect(hasStretchKeys("WAS", "was")).toEqual(false);
  });
});
