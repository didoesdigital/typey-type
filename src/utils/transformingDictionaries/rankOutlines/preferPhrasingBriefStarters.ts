import type { Outline, Translation } from "../../../types";

const preferPhrasingBriefStarters = (
  translation: Translation,
  outlineA: Outline,
  outlineB: Outline,
  outlineALengthWithAllPenalties: number,
  outlineBLengthWithAllPenalties: number
) => {
  if (
    translation.startsWith("and") &&
    outlineA.startsWith("SKP") &&
    !outlineB.startsWith("SKP")
  ) {
    outlineBLengthWithAllPenalties += 2;
  }
  if (
    translation.startsWith("and") &&
    outlineB.startsWith("SKP") &&
    !outlineA.startsWith("SKP")
  ) {
    outlineALengthWithAllPenalties += 2;
  }

  if (
    translation.startsWith("it") &&
    !!outlineA.match(/^T[^A-Z]/) &&
    !outlineB.match(/^T[^A-Z]/)
  ) {
    outlineBLengthWithAllPenalties += 2;
  }
  if (
    translation.startsWith("it") &&
    !!outlineB.match(/^T[^A-Z]/) &&
    !outlineA.match(/^T[^A-Z]/)
  ) {
    outlineALengthWithAllPenalties += 2;
  }

  return [outlineALengthWithAllPenalties, outlineBLengthWithAllPenalties];
};

export default preferPhrasingBriefStarters;
