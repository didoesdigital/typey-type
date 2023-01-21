const hasLongWords = (_outline: string, translation: string) =>
  translation.length > 10 &&
  !translation.includes(" ") &&
  !translation.includes("-");

export default hasLongWords;
