const penaliseSlashes = (outline: string, _translation: string) => {
  let penaltyForSlashes = 0;
  let numberOfSlashes = outline.match(/\//g);

  if (numberOfSlashes !== null) {
    penaltyForSlashes += numberOfSlashes.length * 2;
  }

  return penaltyForSlashes;
};

export default penaliseSlashes;
