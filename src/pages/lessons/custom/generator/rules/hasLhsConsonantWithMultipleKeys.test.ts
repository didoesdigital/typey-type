import hasLhsConsonantWithMultipleKeys from "./hasLhsConsonantWithMultipleKeys";

describe("hasLhsConsonantWithMultipleKeys", () => {
  it("returns true for bat", async () => {
    expect(hasLhsConsonantWithMultipleKeys("PWAT", "bat")).toEqual(true);
  });

  it("returns false for tab", async () => {
    expect(hasLhsConsonantWithMultipleKeys("TAB", "tab")).toEqual(false);
  });
});
