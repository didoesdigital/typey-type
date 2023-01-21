// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasAnyLongVowel = (outline: string, _translation: string) => {
  return !!outline.match(/[^AOEU](AEU|AOE|AOEU|OE|AOU)[^AOEU]/);
};

export default hasAnyLongVowel;
