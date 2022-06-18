export const hasMoreThan2Letters = (translation) => {
  return translation.length > 2
};

export const hasNoRepeatLetters = (translation) => {
  const uniqLetters = new Set(Array.from(translation));
  return uniqLetters.size === translation.length;
};

export const hasOnlyLettersOrSpaces = (translation) => {
  const regexp = /^[A-Za-z ]+$/;
  return regexp.test(translation);
};
