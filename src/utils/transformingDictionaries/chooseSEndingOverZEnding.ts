const chooseSEndingOverZEnding = (
  outlineALastLetter: string,
  outlineBLastLetter: string
) => {
  if (outlineALastLetter === outlineBLastLetter) {
    return 0;
  } else if (outlineALastLetter === "Z") {
    return 1;
  } else if (outlineALastLetter === "S") {
    return -1;
  } else {
    return 0;
  }
};

export default chooseSEndingOverZEnding;
