import type { Outline, Translation } from "../../../types";

const splitAtLastChar = (outline: Outline): [string, string] => {
  const outlineArray = [...outline];
  let outlineLastChar = outlineArray.pop();
  const outlineAllButLastChar = outlineArray.join("");
  outlineLastChar = outlineLastChar ? outlineLastChar[0] : "";
  return [outlineAllButLastChar, outlineLastChar];
};

const penaliseStretchKeys = (
  givenOutline: Outline,
  otherOutline: Outline,
  translation: Translation
) => {
  const [givenOutlineAllButLastChar, givenOutlineLastChar] =
    splitAtLastChar(givenOutline);
  const [otherOutlineAllButLastChar, otherOutlineLastChar] =
    splitAtLastChar(otherOutline);

  if (!(givenOutlineAllButLastChar === otherOutlineAllButLastChar)) {
    return 0;
  }

  if (givenOutlineLastChar === "Z" && otherOutlineLastChar === "S") {
    return 1;
  }

  if (
    givenOutlineLastChar === "D" &&
    otherOutlineLastChar === "T" &&
    !translation.endsWith("d")
  ) {
    return 1;
  }

  if (
    givenOutlineLastChar === "T" &&
    otherOutlineLastChar === "D" &&
    translation.endsWith("d")
  ) {
    return 1;
  }

  return 0;
};

export default penaliseStretchKeys;
