import outlineIsTranslation from "./outlineIsTranslation";

describe("outlineIsTranslation", () => {
  it("returns true for was", async () => {
    expect(outlineIsTranslation("WAS", "was")).toEqual(true);
  });

  it("returns false for said", async () => {
    expect(outlineIsTranslation("SED", "said")).toEqual(false);
  });
});
