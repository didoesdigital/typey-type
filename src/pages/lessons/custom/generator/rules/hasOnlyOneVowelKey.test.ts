import hasOnlyOneVowelKey from "./hasOnlyOneVowelKey";

describe("hasOnlyOneVowelKey", () => {
  it("returns true for that", async () => {
    expect(hasOnlyOneVowelKey("THAT", "that")).toEqual(true);
  });

  it("returns false for view", async () => {
    expect(hasOnlyOneVowelKey("SRAOU", "view")).toEqual(false);
  });

  // !!outline.match(/[^AOEU][AOEU][^AOEU]/);
  xit("returns true for at", async () => {
    expect(hasOnlyOneVowelKey("AT", "at")).toEqual(true);
  });

  // !!outline.match(/[^AOEU][AOEU][^AOEU]/);
  xit("returns true for la", async () => {
    expect(hasOnlyOneVowelKey("HRA", "la")).toEqual(true);
  });
});
