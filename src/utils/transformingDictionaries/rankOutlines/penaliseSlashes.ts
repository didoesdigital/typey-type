const penaliseSlashes = (outline: string, _translation: string) =>
  (outline.match(/\//g)?.length || 0) * 2;

export default penaliseSlashes;
