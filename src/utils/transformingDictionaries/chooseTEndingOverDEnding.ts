const chooseTEndingOverDEnding = (
  outlineALastLetter: string,
  outlineBLastLetter: string,
  translation: string
) => {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  } else if (
    outlineALastLetter === "D" &&
    translation[translation.length - 1] === "d"
  ) {
    return -1;
  } else if (
    outlineALastLetter === "D" &&
    translation[translation.length - 1] !== "d"
  ) {
    return 1;
  } else if (
    outlineALastLetter === "T" &&
    translation[translation.length - 1] === "d"
  ) {
    return 1;
  } else if (
    outlineALastLetter === "T" &&
    translation[translation.length - 1] !== "d"
  ) {
    return -1;
  } else {
    return 0;
  }
};

export default chooseTEndingOverDEnding;
