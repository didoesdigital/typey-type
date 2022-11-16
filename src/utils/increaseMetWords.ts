function increaseMetWords(
  meetingsCount: number,
  totalNumberOfNewWordsMet: number,
  totalNumberOfLowExposuresSeen: number,
  totalNumberOfRetainedWords: number
) {
  let newState: {
    totalNumberOfNewWordsMet?: number;
    totalNumberOfLowExposuresSeen?: number;
    totalNumberOfRetainedWords?: number;
  } = {};

  if (meetingsCount === 0) {
    // console.log("meetingsCount = 0;");
    newState.totalNumberOfNewWordsMet = totalNumberOfNewWordsMet + 1;
  } else if (meetingsCount >= 1 && meetingsCount <= 29) {
    // console.log("meetingsCount 1–29;");
    newState.totalNumberOfLowExposuresSeen = totalNumberOfLowExposuresSeen + 1;
  } else if (meetingsCount >= 30) {
    // console.log("meetingsCount&gt;30;");
    newState.totalNumberOfRetainedWords = totalNumberOfRetainedWords + 1;
  }
  return newState;
}

export default increaseMetWords;
