import hasSimpleStenoKeys from "./hasSimpleStenoKeys";

describe("hasSimpleStenoKeys", () => {
  it("returns true for simple steno keys", async () => {
    expect(hasSimpleStenoKeys("HER", "her")).toEqual(true);
  });

  it("returns false for letters that need two or more keys", async () => {
    expect(hasSimpleStenoKeys("TKEUD", "did")).toEqual(false);
  });
});
