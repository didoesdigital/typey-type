import preferPhrasingBriefStarters from "./preferPhrasingBriefStarters";

describe("preferPhrasingBriefStarters", () => {
  it('penalises the other outline if one uses T* to write a phrase starting with "it"', () => {
    const outlineA = "T*D";
    const outlineB = "EUTD";
    const translation = "it'd";
    const outlineALengthWithAllPenalties = 4;
    const outlineBLengthWithAllPenalties = 4;
    expect(
      preferPhrasingBriefStarters(
        translation,
        outlineA,
        outlineB,
        outlineALengthWithAllPenalties,
        outlineBLengthWithAllPenalties
      )
    ).toEqual([4, 6]);
  });

  it('penalises the other outline if one uses T- to write a phrase starting with "it"', () => {
    const outlineA = "TWAEPBT";
    const outlineB = "T-FS/-PBT";
    const translation = "it wasn't";
    const outlineALengthWithAllPenalties = 7;
    const outlineBLengthWithAllPenalties = 12;
    expect(
      preferPhrasingBriefStarters(
        translation,
        outlineA,
        outlineB,
        outlineALengthWithAllPenalties,
        outlineBLengthWithAllPenalties
      )
    ).toEqual([9, 12]);
  });

  it('penalises the other outline if one uses SKP to write a phrase starting with "and"', () => {
    const outlineA = "TAPBD";
    const outlineB = "SKPEUT";
    const translation = "and it";
    const outlineALengthWithAllPenalties = 5;
    const outlineBLengthWithAllPenalties = 6;
    expect(
      preferPhrasingBriefStarters(
        translation,
        outlineA,
        outlineB,
        outlineALengthWithAllPenalties,
        outlineBLengthWithAllPenalties
      )
    ).toEqual([7, 6]);
  });
});
