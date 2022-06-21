import { hasSedSaid } from "./SedSaidPrompt";

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
