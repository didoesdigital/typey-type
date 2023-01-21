import hasRhsConsonantWithMultipleKeys from "./hasRhsConsonantWithMultipleKeys";

describe("hasRhsConsonantWithMultipleKeys", () => {
  it("returns true for tan", async () => {
    expect(hasRhsConsonantWithMultipleKeys("TAPB", "tan")).toEqual(true);
  });

  it("returns false for bat", async () => {
    expect(hasRhsConsonantWithMultipleKeys("PWAT", "bat")).toEqual(false);
  });
});
