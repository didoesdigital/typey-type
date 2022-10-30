const penaliseStars = (outline: string, _translation: string) =>
  outline.match(/\*/g)?.length || 0;

export default penaliseStars;
