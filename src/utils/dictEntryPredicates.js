export const hasFewerThan7Letters = (translation) => {
  // if (process.env.NODE_ENV === 'development') {return translation.trim().length < 5;}
  return translation.trim().length < 7;
};

export const hasMoreThan2Letters = (translation) => {
  return translation.trim().length > 2;
};

export const hasNoRepeatLetters = (translation) => {
  const uniqLetters = new Set(Array.from(translation));
  return uniqLetters.size === translation.length;
};

export const hasOnlyLowercaseLetters = (translation) => {
  const regexp = /^[a-z]+$/;
  return regexp.test(translation.trim());
};
