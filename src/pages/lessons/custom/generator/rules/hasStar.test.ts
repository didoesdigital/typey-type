import hasStar from "./hasStar";

describe("hasStar", () => {
  it("returns true for both", async () => {
    expect(hasStar("PWO*T", "both")).toEqual(true);
  });

  it("returns false for bot", async () => {
    expect(hasStar("PWOT", "bot")).toEqual(false);
  });
});
