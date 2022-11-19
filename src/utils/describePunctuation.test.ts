import describePunctuation from "./describePunctuation";

describe("describePunctuation", () => {
  it("returns empty string for phrases that are not punctuation", () => {
    expect(describePunctuation("example")).toEqual("");
  });

  it("describes backtick as grave", () => {
    expect(describePunctuation("`")).toEqual("grave");
  });
});
