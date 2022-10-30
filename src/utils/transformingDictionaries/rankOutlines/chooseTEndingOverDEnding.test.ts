import chooseTEndingOverDEnding from "./chooseTEndingOverDEnding";

describe("chooseTEndingOverDEnding", () => {
  it("returns 0 for A and B having same ending", () => {
    const a = "D";
    const b = "D";
    expect(chooseTEndingOverDEnding(a, b, "d")).toEqual(0);
  });

  it("returns -1 for A outline having D ending and translation ending in d", () => {
    const a = "D";
    const b = "Z";
    expect(chooseTEndingOverDEnding(a, b, "d")).toEqual(-1);
  });

  it("returns 1 for A outline having D ending but not a translation ending in d", () => {
    const a = "D";
    const b = "Z";
    expect(chooseTEndingOverDEnding(a, b, "t")).toEqual(1);
  });

  it("returns 1 for A outline having T ending and translation ending in d", () => {
    const a = "T";
    const b = "Z";
    expect(chooseTEndingOverDEnding(a, b, "d")).toEqual(1);
  });

  it("returns -1 for A outline having T ending but not a translation ending in d", () => {
    const a = "T";
    const b = "Z";
    expect(chooseTEndingOverDEnding(a, b, "t")).toEqual(-1);
  });

  it("returns 0 for A outline ending in something other than T or D", () => {
    const a = "Z";
    const b = "S";
    expect(chooseTEndingOverDEnding(a, b, "t")).toEqual(0);
  });
});
