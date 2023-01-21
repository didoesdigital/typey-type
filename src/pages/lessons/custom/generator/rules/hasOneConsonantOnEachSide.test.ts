import hasOneConsonantOnEachSide from "./hasOneConsonantOnEachSide";

describe("hasOneConsonantOnEachSide", () => {
  it("returns true for sap", async () => {
    expect(hasOneConsonantOnEachSide("SAP", "sap")).toEqual(true);
  });

  it("returns false for art", async () => {
    expect(hasOneConsonantOnEachSide("ART", "art")).toEqual(false);
  });
});
