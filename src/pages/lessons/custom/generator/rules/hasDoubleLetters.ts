const hasDoubleLetters = (_outline: string, translation: string) =>
  !!(translation.match(/([A-Za-z])\1/) && !translation.match(/([A-Za-z])\1\1/));

export default hasDoubleLetters;
