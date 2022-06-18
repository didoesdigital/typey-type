import {
  hasFewerThan7Letters,
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLetters,
} from "./dictEntryPredicates";

describe("hasFewerThan7Letters", () => {
  it("returns true for average words", () => {
    expect(hasFewerThan7Letters("severe")).toEqual(true);
  });

  it("returns false for long words", () => {
    expect(hasFewerThan7Letters("lecture")).toEqual(false);
  });
});

describe("hasMoreThan2Letters", () => {
  it("returns true for word most words", () => {
    expect(hasMoreThan2Letters("sat")).toEqual(true);
  });

  it("returns false for short words", () => {
    expect(hasMoreThan2Letters("to")).toEqual(false);
  });

  it("returns false for spaced short words", () => {
    expect(hasMoreThan2Letters(" of")).toEqual(false);
  });
});

describe("hasNoRepeatLetters", () => {
  it("returns true for word made of unique letters", () => {
    expect(hasNoRepeatLetters("quiet")).toEqual(true);
  });

  it("returns false for word with repeated letters", () => {
    expect(hasNoRepeatLetters("test")).toEqual(false);
  });
});

describe("hasOnlyLowercaseLetters", () => {
  it("returns false for any uppercase letters", () => {
    expect(hasOnlyLowercaseLetters("The")).toEqual(false);
  });

  it("returns false for phrasing briefs", () => {
    expect(hasOnlyLowercaseLetters("of the")).toEqual(false);
  });

  it("returns false for contractions", () => {
    expect(hasOnlyLowercaseLetters("didn't")).toEqual(false);
  });
});
