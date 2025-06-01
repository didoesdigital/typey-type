import { createWordListFromMetWords } from "./createWordListFromMetWords";

describe("create sorted word list from met words", () => {
  it("returns sorted word list", () => {
    let metWords = { "the": 1, "machine": 3, "test": 2, "steno": 3 };
    expect(createWordListFromMetWords(metWords)).toEqual([
      "machine",
      "steno",
      "test",
      "the",
    ]);
  });

  it("returns empty word list for empty metWords", () => {
    let metWords = {};
    expect(createWordListFromMetWords(metWords)).toEqual([]);
  });
});
