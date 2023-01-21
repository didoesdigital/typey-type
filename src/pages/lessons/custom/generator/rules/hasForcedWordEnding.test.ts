import hasForcedWordEnding from "./hasForcedWordEnding";

describe("hasForcedWordEnding", () => {
  it("returns true for outlines ending in /SP-S", async () => {
    expect(hasForcedWordEnding("PH*/SP-S", "m")).toEqual(true);
  });

  it("returns false for fingerspelling", async () => {
    expect(hasForcedWordEnding("TP*", "{>}{&f}")).toEqual(false);
  });
});
