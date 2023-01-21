// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasVowelDisambiguator = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU](AE|AO)[^AOEU]/);

export default hasVowelDisambiguator;
