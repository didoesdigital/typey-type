const hasOnlyOneVowelKey = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU][AOEU][^AOEU]/);

export default hasOnlyOneVowelKey;
