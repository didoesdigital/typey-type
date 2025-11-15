const hasOnlyShortIVowel = (outline: string, _translation: string) =>
  !!outline.match(/[^AOEU]EU[^AOEU]/) && !(outline === "STREUF");

export default hasOnlyShortIVowel;
