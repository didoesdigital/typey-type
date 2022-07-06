import { getRightAnswers, selectMaterial } from "./utilities";

describe("selectMaterial", () => {
  const material = {
    maw: 1,
    bye: 1,
    mow: 1,
    gal: 1,
    herb: 1,
    duly: 1,
    face: 1,
    risk: 1,
    winds: 1,
    gamed: 1,
    brake: 1,
    tidal: 1,
    hacked: 1,
    blamed: 1,
    coding: 1,
    radish: 1,
  };

  it("returns grouped material by word length", () => {
    const result = selectMaterial(material);
    expect(result.has3Letters.slice().sort()).toEqual([
      "bye",
      "gal",
      "maw",
      "mow",
    ]);
    expect(result.has4Letters.slice().sort()).toEqual([
      "duly",
      "face",
      "herb",
      "risk",
    ]);
    expect(result.has5Letters.slice().sort()).toEqual([
      "brake",
      "gamed",
      "tidal",
      "winds",
    ]);
    expect(result.has6Letters.slice().sort()).toEqual([
      "blamed",
      "coding",
      "hacked",
      "radish",
    ]);
  });
});

describe("getRightAnswers", () => {
  const levelMaterial = [
    "each",
    "bade",
    "bead",
    "deaf",
    "fade",
    "last",
    "salt",
  ];

  it("returns multiple options for many right answers", () => {
    expect(getRightAnswers(levelMaterial, "ebda")).toEqual(["bead", "bade"]);
  });

  it("returns one item for one right answer", () => {
    expect(getRightAnswers(levelMaterial, "ahec")).toEqual(["each"]);
  });
});
