import hasOneOrMoreSpaces from "./hasOneOrMoreSpaces";

describe("hasOneOrMoreSpaces", () => {
  it("returns true for “is the”", async () => {
    expect(hasOneOrMoreSpaces("S-T", "is the")).toEqual(true);
  });

  it("returns true for “in real life”", async () => {
    expect(hasOneOrMoreSpaces("*EURL", "in real life")).toEqual(true);
  });

  it("returns false for world", async () => {
    expect(hasOneOrMoreSpaces("WORLD", "world")).toEqual(false);
  });
});
