import hasOneKeyPerFinger from "./hasOneKeyPerFinger";

describe("hasOneKeyPerFinger", () => {
  it("returns true for kept", async () => {
    expect(hasOneKeyPerFinger("KEPT", "kept")).toEqual(true);
  });

  it("returns false for did", async () => {
    expect(hasOneKeyPerFinger("TKEUD", "did")).toEqual(false);
  });

  it("returns false for something with a star", async () => {
    expect(hasOneKeyPerFinger("A*FD", "avid")).toEqual(false);
  });

  // this case should possibly be handled by a separate rule
  it("returns false for something with a slash", async () => {
    expect(hasOneKeyPerFinger("WO/U", "would you")).toEqual(false);
  });
});
