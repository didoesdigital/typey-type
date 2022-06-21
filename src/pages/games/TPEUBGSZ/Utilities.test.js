import { makeUpAWordAndHint } from "./Utilities";

describe("makeUpAWordAndHint", () => {
  it("returns an array containing a made up word and a hint", () => {
    expect(makeUpAWordAndHint()).toEqual(["antipreamationing", "APBT/PRE/A/PHAEUGS/-G"]);
  });
});
