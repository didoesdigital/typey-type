import isUppercase from "./isUppercase";

describe("isUppercase", () => {
  it("returns true for ASCII", async () => {
    expect(isUppercase("AS/KEU", "ASCII")).toEqual(true);
  });

  it("returns false for Harry", async () => {
    expect(isUppercase("HAR/REU", "Harry")).toEqual(false);
  });
});
