import isSingleStroke from "./isSingleStroke";

describe("isSingleStroke", () => {
  it("returns true for cat", async () => {
    expect(isSingleStroke("KAT", "cat")).toEqual(true);
  });

  it("returns false for kitten", async () => {
    expect(isSingleStroke("KEUT/-PB", "kitten")).toEqual(false);
  });
});
