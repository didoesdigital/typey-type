const hasAnyShortVowel = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU](A|O|E|U|EU)[^AOEU]/);

export default hasAnyShortVowel;
