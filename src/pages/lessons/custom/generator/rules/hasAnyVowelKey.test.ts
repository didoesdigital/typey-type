import hasAnyVowelKey from "./hasAnyVowelKey";

describe("hasAnyVowelKey", () => {
  it("returns true for for", async () => {
    expect(hasAnyVowelKey("TPOR", "for")).toEqual(true);
  });

  it("returns false for outlines with no vowel keys", async () => {
    expect(hasAnyVowelKey("TPH-PB", "under")).toEqual(false);
  });
});
