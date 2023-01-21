import hasApostrophes from "./hasApostrophes";

describe("hasApostrophes", () => {
  it("returns true for I'll", async () => {
    expect(hasApostrophes("AOEUL", "I'll")).toEqual(true);
  });

  it("returns false for ill", async () => {
    expect(hasApostrophes("EUL", "ill")).toEqual(false);
  });
});
