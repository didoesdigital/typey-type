// @ts-expect-error TS(7006) FIXME: Parameter 'translation' implicitly has an 'any' ty... Remove this comment to see the full error message
export const hasFewerThan7Letters = (translation) => {
  // if (process.env.NODE_ENV === 'development') {return translation.trim().length < 5;}
  return translation.trim().length < 7;
};

// @ts-expect-error TS(7006) FIXME: Parameter 'translation' implicitly has an 'any' ty... Remove this comment to see the full error message
export const hasMoreThan2Letters = (translation) => {
  return translation.trim().length > 2;
};

// @ts-expect-error TS(7006) FIXME: Parameter 'translation' implicitly has an 'any' ty... Remove this comment to see the full error message
export const hasNoRepeatLetters = (translation) => {
  const uniqLetters = new Set(Array.from(translation));
  return uniqLetters.size === translation.length;
};

// @ts-expect-error TS(7006) FIXME: Parameter 'translation' implicitly has an 'any' ty... Remove this comment to see the full error message
export const hasOnlyLowercaseLetters = (translation) => {
  const regexp = /^[a-z]+$/;
  return regexp.test(translation.trim());
};
