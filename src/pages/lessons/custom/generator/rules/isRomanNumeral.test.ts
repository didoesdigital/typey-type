import isRomanNumeral from "./isRomanNumeral";

describe("isRomanNumeral", () => {
  it("returns true for IV", async () => {
    expect(isRomanNumeral("4-R", "IV")).toEqual(true);
  });

  it("returns true for I stroked with an R", async () => {
    expect(isRomanNumeral("1-R", "I")).toEqual(true);
  });

  it("returns false for I stroked with EU", async () => {
    expect(isRomanNumeral("EU", "I")).toEqual(false);
  });

  it("returns false for 1", async () => {
    expect(isRomanNumeral("#S", "{&1}")).toEqual(false);
  });
});
