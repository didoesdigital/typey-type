const hasAnyVowelKey = (outline: string, _translation: string) =>
  !!outline.match(/[AOEU]+/);

export default hasAnyVowelKey;
