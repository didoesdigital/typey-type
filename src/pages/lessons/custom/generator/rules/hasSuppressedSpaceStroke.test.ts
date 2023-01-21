import hasSuppressedSpaceStroke from "./hasSuppressedSpaceStroke";

describe("hasSuppressedSpaceStroke", () => {
  it("returns true for /TK-LS/", async () => {
    expect(hasSuppressedSpaceStroke("TAOL/TK-LS/TEUP", "tooltip")).toEqual(
      true
    );
  });

  it("returns false for spaced words", async () => {
    expect(hasSuppressedSpaceStroke("TAOL/TEUP", "tooltip")).toEqual(false);
  });
});
