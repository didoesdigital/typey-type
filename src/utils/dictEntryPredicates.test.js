import {
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLowercaseLettersOrSpaces,
} from "./dictEntryPredicates";

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

describe("hasOnlyLowercaseLettersOrSpaces", () => {
  it("returns true for phrasing brief", () => {
    expect(hasOnlyLowercaseLettersOrSpaces("of the")).toEqual(true);
  });

  it("returns false for any uppercase letters", () => {
    expect(hasOnlyLowercaseLettersOrSpaces("The")).toEqual(false);
  });

  it("returns false for phrasing brief", () => {
    expect(hasOnlyLowercaseLettersOrSpaces("didn't")).toEqual(false);
  });
});
