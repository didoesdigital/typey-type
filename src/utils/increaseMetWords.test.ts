import increaseMetWords from "./increaseMetWords";

describe("increaseMetWords", () => {
  describe("meetingsCount is 0", () => {
    const totalNumberOfNewWordsMet = 0;
    const totalNumberOfLowExposuresSeen = 0;
    const totalNumberOfRetainedWords = 0;

    it("increments total number of new words met", () => {
      expect(
        increaseMetWords(
          0,
          totalNumberOfNewWordsMet,
          totalNumberOfLowExposuresSeen,
          totalNumberOfRetainedWords
        )
      ).toEqual({ totalNumberOfNewWordsMet: 1 });
    });
  });
  describe("meetingsCount is between 1 and 29 (inclusive)", () => {
    const totalNumberOfNewWordsMet = 0;
    const totalNumberOfLowExposuresSeen = 3;
    const totalNumberOfRetainedWords = 0;
    it("increments total number of new words met from 3", () => {
      expect(
        increaseMetWords(
          3,
          totalNumberOfNewWordsMet,
          totalNumberOfLowExposuresSeen,
          totalNumberOfRetainedWords
        )
      ).toEqual({ totalNumberOfLowExposuresSeen: 4 });
    });
  });
  describe("meetingsCount is 30 or higher", () => {
    const totalNumberOfNewWordsMet = 0;
    const totalNumberOfLowExposuresSeen = 0;
    const totalNumberOfRetainedWords = 30;
    it("increments total number of new words met from 3", () => {
      expect(
        increaseMetWords(
          30,
          totalNumberOfNewWordsMet,
          totalNumberOfLowExposuresSeen,
          totalNumberOfRetainedWords
        )
      ).toEqual({ totalNumberOfRetainedWords: 31 });
    });
  });
});
