import trimAndSumUniqMetWords from "./trimAndSumUniqMetWords";

describe("sum uniq met words", () => {
  it("returns met words without duplicate entries with different spacing", () => {
    let metWords = { "the": 1, " the": 3, "the ": 2, "steno": 1 };
    expect(trimAndSumUniqMetWords(metWords)).toEqual({ "the": 6, "steno": 1 });
  });
});
