import hasShortTranslations from "./hasShortTranslations";

describe("hasShortTranslations", () => {
  it("returns true for words shorter than 6 chars", async () => {
    expect(hasShortTranslations("KWAO*EUT", "quiet")).toEqual(true);
  });

  it("returns false for words 6 characters or more", async () => {
    expect(hasShortTranslations("K*ELT", "kettle")).toEqual(false);
  });
});
