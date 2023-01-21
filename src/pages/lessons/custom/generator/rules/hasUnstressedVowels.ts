const hasUnstressedVowels = (_outline: string, translation: string) =>
  translation
    .toLowerCase()
    .replace(/(?:[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g)?.length === 1
    ? false
    : true;

export default hasUnstressedVowels;
