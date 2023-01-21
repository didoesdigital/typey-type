const hasDoubleVowels = (_outline: string, translation: string) =>
  !!(
    translation.match(/(aa|ee|ii|oo|uu)/) &&
    !translation.match(/(aaa|eee|iii|ooo|uuu)/)
  );

export default hasDoubleVowels;
