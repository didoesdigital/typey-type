function penaliseStars(outline, translation) {
  let penaltyForStars = 0;
  const numberOfStars = outline.match(/\*/g);

  if (numberOfStars !== null) {
    penaltyForStars += numberOfStars.length;
  }

  return penaltyForStars;
}

export default penaliseStars;
