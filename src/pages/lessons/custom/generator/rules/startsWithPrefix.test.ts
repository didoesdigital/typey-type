import startsWithPrefix from "./startsWithPrefix";

describe("startsWithPrefix", () => {
  it("returns true for entries that start with a prefix outline that matches the start of the translation", async () => {
    expect(startsWithPrefix("A/HROEPB", "alone")).toEqual(true);
  });

  it("returns false for entries that start with a prefix outline that do not match the start of the translation", async () => {
    expect(startsWithPrefix("EUPBD/KWRAPB", "Indian")).toEqual(false);
  });

  it("returns false for entries that start with prefix outline but lack a slash", async () => {
    expect(startsWithPrefix("AF", "after")).toEqual(false);
  });

  it("returns false for entries with no slashes", async () => {
    expect(startsWithPrefix("TEFT", "teft")).toEqual(false);
  });
});
