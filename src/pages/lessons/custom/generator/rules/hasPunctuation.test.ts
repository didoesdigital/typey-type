import hasPunctuation from "./hasPunctuation";

describe("hasPunctuation", () => {
  it("returns true for I've", async () => {
    expect(hasPunctuation("AOEUF", "I've")).toEqual(true);
  });

  it("returns true for glued percent sign punctuation", async () => {
    expect(hasPunctuation("P*ERS", "{&%}")).toEqual(true);
  });

  it("returns true for copyright symbol", async () => {
    expect(hasPunctuation("KPR-T", "©")).toEqual(true);
  });

  it("returns true for currency symbols", async () => {
    expect(hasPunctuation("P-PBDZ", "£")).toEqual(true);
  });

  it("returns true for emoji", async () => {
    expect(hasPunctuation("PHOEPBLG/1-Z", "💯")).toEqual(true);
  });

  it("returns false for test", async () => {
    expect(hasPunctuation("TEFT", "test")).toEqual(false);
  });
});
