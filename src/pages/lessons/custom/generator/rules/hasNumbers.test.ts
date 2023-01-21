import hasNumbers from "./hasNumbers";

describe("hasNumbers", () => {
  it("returns true for 7", async () => {
    expect(hasNumbers("-7/S*EUP", "7-zip")).toEqual(true);
  });

  it("returns false for VII", async () => {
    expect(hasNumbers("TPARBGT/-7", "factor VII")).toEqual(false);
  });
});
