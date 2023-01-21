import hasLongTranslations from "./hasLongTranslations";

describe("hasLongTranslations", () => {
  it("returns true for 17-character phrases", async () => {
    expect(
      hasLongTranslations("HRAOD/PWAERG/WAUL", "load-bearing wall")
    ).toEqual(true);
  });

  it("returns false for 16-character phrases", async () => {
    expect(
      hasLongTranslations("HOE/KHAOE/PHEUPB/STEU", "Ho Chi Minh City")
    ).toEqual(false);
  });

  it("returns false for 15-character phrases", async () => {
    expect(hasLongTranslations("HEP/-FL/TO/PHOE", "helpful to know")).toEqual(
      false
    );
  });
});
