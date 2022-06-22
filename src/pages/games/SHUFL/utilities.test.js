import { getRightAnswers } from "./utilities";

const material = ["each", "bade", "bead", "deaf", "fade", "last", "salt"];

describe("getRightAnswers", () => {
  it("returns multiple options for many right answers", () => {
    expect(getRightAnswers(material, "ebda")).toEqual(["bead", "bade"]);
  });

  it("returns one item for one right answer", () => {
    expect(getRightAnswers(material, "ahec")).toEqual(["each"]);
  });
});
