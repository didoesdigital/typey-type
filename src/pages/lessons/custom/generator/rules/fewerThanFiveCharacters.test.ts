import fewerThanFiveCharacters from "./fewerThanFiveCharacters";

describe("fewerThanFiveCharacters", () => {
  it("returns true for 3-letter word", async () => {
    expect(fewerThanFiveCharacters("TKEUD", "did")).toEqual(true);
  });

  it("returns true for 4-letter word", async () => {
    expect(fewerThanFiveCharacters("THAT", "that")).toEqual(true);
  });

  it("returns false for 5-letter word", async () => {
    expect(fewerThanFiveCharacters("WEU", "which")).toEqual(false);
  });
});
