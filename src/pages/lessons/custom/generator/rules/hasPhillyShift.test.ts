import hasPhillyShift from "./hasPhillyShift";

describe("hasPhillyShift", () => {
  it("returns true for TDZ", async () => {
    expect(hasPhillyShift("A/PHEUTDZ", "amidst")).toEqual(true);
  });

  it("returns true for TSD", async () => {
    expect(hasPhillyShift("TPH-TSD", "noticed")).toEqual(true);
  });

  it("returns true for TSZ", async () => {
    expect(hasPhillyShift("TPH-TSZ", "notice")).toEqual(true);
  });

  it("returns true for SDZ", async () => {
    expect(hasPhillyShift("WORSDZ", "words")).toEqual(true);
  });

  it("returns false for hertz using S", async () => {
    expect(hasPhillyShift("HERTS", "hertz")).toEqual(false);
  });

  xit("returns true for hertz using Z", async () => {
    expect(hasPhillyShift("HERTZ", "hertz")).toEqual(true);
  });
});
