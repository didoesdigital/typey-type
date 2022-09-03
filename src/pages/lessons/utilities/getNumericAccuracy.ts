const getNumericAccuracy = (
  totalNumberOfMistypedWords: number,
  totalNumberOfHintedWords: number,
  currentLessonStrokes: any[],
  wpm: number
) => {
  let numericAccuracy = 0;
  if (totalNumberOfMistypedWords === 0 && totalNumberOfHintedWords === 0) {
    numericAccuracy = 100;
  } else if (totalNumberOfMistypedWords > 0) {
    // Test for stopping the lesson before the end
    let accuracyPercent;
    if (currentLessonStrokes && currentLessonStrokes.length > 0) {
      // avoid division by zero
      accuracyPercent =
        (1 - totalNumberOfMistypedWords / currentLessonStrokes.length) * 100;
    } else {
      // this should never happen because first `if` code path handles zero state
      accuracyPercent = 100.0;
    }
    let accuracyPercentRoundedToTwoDecimalPlaces =
      Math.floor(accuracyPercent * 100) / 100;
    numericAccuracy = accuracyPercentRoundedToTwoDecimalPlaces;
  } else if (totalNumberOfHintedWords >= 1) {
    numericAccuracy = 100;
  } else {
    numericAccuracy = 0;
  }

  if (wpm === 0) {
    numericAccuracy = 0;
  }

  return numericAccuracy;
};

export default getNumericAccuracy;
