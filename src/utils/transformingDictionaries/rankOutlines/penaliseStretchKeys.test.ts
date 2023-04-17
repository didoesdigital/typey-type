import penaliseStretchKeys from "./penaliseStretchKeys";

describe("penaliseStretchKeys ending in Z and S", () => {
  it("does not penalise Z over S with different outlines", () => {
    const given = "OR/TKER/*FS";
    const other = "O*R/TK*EFRBZ";
    const translation = "hors d'oeuvres";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("penalises given outline having Z ending over S ending", () => {
    const given = "KARDZ";
    const other = "KARDS";
    const translation = "cards";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(1);
  });

  it("does not penalise Z over D", () => {
    const given = "TEFTD";
    const other = "TEFTZ";
    const translation = "test";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("does not penalise both having Z ending", () => {
    const given = "TAEFZ";
    const other = "TEFTZ";
    const translation = "test";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("does not penalise S over Z", () => {
    const given = "TES";
    const other = "TEZ";
    const translation = "test";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("does not penalise D over S", () => {
    const given = "D";
    const other = "S";
    const translation = "test";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("penalises Z over S", () => {
    const given = "KPERZ/-Z";
    const other = "KPERZ/-S";
    const translation = "exercises";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(1);
  });
});

describe("penaliseStretchKeys ending in D and T", () => {
  it("does not penalise D over T with different outlines", () => {
    const given = "TOEFD";
    const other = "TAEFT";
    const translation = "test";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("does not penalise D over T with when translation ends with d", () => {
    const given = "KRED/EUT/KARD";
    const other = "KRED/EUT/KART";
    const translation = "credit card";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(0);
  });

  it("penalises D over T", () => {
    const given = "EUPBT/PHAOED";
    const other = "EUPBT/PHAOET";
    const translation = "intermediate";
    expect(penaliseStretchKeys(given, other, translation)).toEqual(1);
  });
});
