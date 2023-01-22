import hasOneSpace from "./hasOneSpace";

describe("hasOneSpace", () => {
  it("returns true for “is the”", async () => {
    expect(hasOneSpace("S-T", "is the")).toEqual(true);
  });

  it("returns false for “in real life”", async () => {
    expect(hasOneSpace("*EURL", "in real life")).toEqual(false);
  });

  it("returns false for world", async () => {
    expect(hasOneSpace("WORLD", "world")).toEqual(false);
  });
});
