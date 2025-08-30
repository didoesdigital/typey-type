import type { Translation } from "types";

export const hasFewerThan7Letters = (translation: Translation) => {
  // if (import.meta.env.MODE === 'development') {return translation.trim().length < 5;}
  return translation.trim().length < 7;
};

export const hasMoreThan2Letters = (translation: Translation) => {
  return translation.trim().length > 2;
};

export const hasNoRepeatLetters = (translation: Translation) => {
  const uniqLetters = new Set(Array.from(translation));
  return uniqLetters.size === translation.length;
};

export const hasOnlyLowercaseLetters = (translation: Translation) => {
  const regexp = /^[a-z]+$/;
  return regexp.test(translation.trim());
};
