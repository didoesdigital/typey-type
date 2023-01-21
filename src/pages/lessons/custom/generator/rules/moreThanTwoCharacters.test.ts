import moreThanTwoCharacters from "./moreThanTwoCharacters";

describe("moreThanTwoCharacters", () => {
  it("returns true for 3-letter word", async () => {
    expect(moreThanTwoCharacters("TKEUD", "did")).toEqual(true);
  });

  it("returns false for 2-letter word", async () => {
    expect(moreThanTwoCharacters("TO", "to")).toEqual(false);
  });
});
