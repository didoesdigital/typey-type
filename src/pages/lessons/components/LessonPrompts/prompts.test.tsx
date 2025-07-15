import { hasSedSaid } from "./SedSaidPrompt";
import { missingAussieDict } from "./AussieDictPrompt";
import { hasWordBoundaryError } from "./WordBoundaryErrorPrompt";

describe("hasSedSaid", () => {
  it("returns something truthy for material matching said and actual text matching sed", () => {
    const currentPhrase = "said";
    const actualText = " sed";
    expect(hasSedSaid(currentPhrase, actualText)).toBeTruthy();
  });

  it("returns something falsy for material matching said but actual text not matching sed", () => {
    const currentPhrase = "said";
    const actualText = " said";
    expect(hasSedSaid(currentPhrase, actualText)).toBeFalsy();
  });
});

describe("missingAussieDict", () => {
  it("returns something truthy for Aussie material with punctuation and aw in actualText", () => {
    const currentStroke = "HAOURPL/A*U KW-BG";
    const actualText = " humour aw,";
    expect(missingAussieDict(currentStroke, actualText)).toBeTruthy();
  });

  it("returns something falsy for Aussie material without aw in actualText", () => {
    const currentStroke = "HO*RPB/A*U";
    const actualText = " honour";
    expect(missingAussieDict(currentStroke, actualText)).toBeFalsy();
  });
});

describe("hasWordBoundaryError", () => {
  it("returns something truthy for wars in material and Star Wars in actualText", () => {
    const currentPhrase = "wars";
    const actualText = " Star Wars";
    expect(hasWordBoundaryError(currentPhrase, actualText)).toBeTruthy();
  });

  it("returns something falsy for wars in material and war in actualText", () => {
    const currentPhrase = "wars";
    const actualText = " war";
    expect(hasWordBoundaryError(currentPhrase, actualText)).toBeFalsy();
  });
});
