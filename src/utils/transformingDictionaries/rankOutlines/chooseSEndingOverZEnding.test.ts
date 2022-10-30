import chooseSEndingOverZEnding from "./chooseSEndingOverZEnding";

describe("chooseSEndingOverZEnding", () => {
  it("returns 1 for A outline having Z ending", () => {
    const a = "Z";
    const b = "S";
    expect(chooseSEndingOverZEnding(a, b)).toEqual(1);
  });

  it("returns 0 for B outline having Z ending", () => {
    const a = "D";
    const b = "Z";
    expect(chooseSEndingOverZEnding(a, b)).toEqual(0);
  });

  it("returns 0 for A and B having same ending", () => {
    const a = "Z";
    const b = "Z";
    expect(chooseSEndingOverZEnding(a, b)).toEqual(0);
  });

  it("returns -1 for A outline having S ending", () => {
    const a = "S";
    const b = "Z";
    expect(chooseSEndingOverZEnding(a, b)).toEqual(-1);
  });

  it("returns 0 for B outline having S ending", () => {
    const a = "D";
    const b = "S";
    expect(chooseSEndingOverZEnding(a, b)).toEqual(0);
  });
});
