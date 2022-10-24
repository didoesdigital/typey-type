const penaliseStars = (outline: string, _translation: string) => {
  let penaltyForStars = 0;
  const numberOfStars = outline.match(/\*/g);

  if (numberOfStars !== null) {
    penaltyForStars += numberOfStars.length;
  }

  return penaltyForStars;
};

export default penaliseStars;
