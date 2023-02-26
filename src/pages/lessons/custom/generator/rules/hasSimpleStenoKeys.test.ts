import hasSimpleStenoKeys from "./hasSimpleStenoKeys";

describe("hasSimpleStenoKeys", () => {
  it("returns true for simple steno keys", async () => {
    expect(hasSimpleStenoKeys("HER", "her")).toEqual(true);
  });

  it("returns false for letters that need two or more keys", async () => {
    expect(hasSimpleStenoKeys("TKEUD", "did")).toEqual(false);
  });

  // Not sure if this is good choice or not but this test at least makes it visible
  it("returns true for EU even though it needs two keys to make a short i sound", async () => {
    expect(hasSimpleStenoKeys("EU", "I")).toEqual(true);
  });
});
