import {
  // stitchTogetherLessonData,
  transformLessonDataToChartData,
} from "./transformingFinishedData";

const lessonData = {
  version: 3,
  lessonStrokes: [
    {
      numberOfMatchedWordsSoFar: 0.6,
      word: "on",
      typedText: " on",
      attempts: [],
      stroke: "OPB",
      checked: false,
      accuracy: true,
      time: 1638161791613,
      hintWasShown: false,
    },
    {
      numberOfMatchedWordsSoFar: 1.4,
      word: "him",
      typedText: " him",
      attempts: [
        {
          text: " hix",
          time: 1638161792156,
          numberOfMatchedWordsSoFar: 1.4,
          hintWasShown: true,
        },
      ],
      stroke: "HEUPL",
      checked: true,
      accuracy: false,
      time: 1638161792828,
      hintWasShown: false,
    },
  ],
  startTime: 1638161791284, // "2021-11-29T04:56:31.284Z",
  wpm: 28,
};

describe("Transforming lesson data to chart data", () => {
  it("returns flat chart data", () => {
    const expectedChartData = {
      averageWPM: 28,
      version: 3,
      dataPoints: [
        {
          attemptPeak: false,
          elapsedTime: 329,
          wordsPerMinute: 0,
          typedText: " on",
          material: "on",
          materialIndex: 0,
          markedCorrect: true,
          hint: "OPB",
          hintWasShown: false,
        },
        {
          attemptPeak: true,
          elapsedTime: 872,
          wordsPerMinute: 15.544041450777199,
          typedText: " hix",
          material: "him",
          markedCorrect: false,
          hint: "HEUPL",
          hintWasShown: true,
        },
        {
          attemptPeak: false,
          elapsedTime: 1544,
          wordsPerMinute: 7.772020725388599,
          typedText: " him",
          material: "him",
          materialIndex: 1,
          markedCorrect: false,
          hint: "HEUPL",
          hintWasShown: false,
        },
      ],
    };
    expect(transformLessonDataToChartData(lessonData)).toEqual(
      expectedChartData
    );
  });
});
