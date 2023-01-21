// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasOnlyOneVowelKey = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU][AOEU][^AOEU]/);

export default hasOnlyOneVowelKey;
