import {
  // stitchTogetherLessonData,
  transformLessonDataToChartData,
} from "./transformingFinishedData";

const lessonData = {
  version: 1,
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
        },
      ],
      stroke: "HEUPL",
      checked: true,
      accuracy: false,
      time: 1638161792828,
    },
  ],
  startTime: 1638161791284, // "2021-11-29T04:56:31.284Z",
  wpm: 28,
};

describe("Transforming lesson data to chart data", () => {
  it("returns flat chart data", () => {
    const expectedChartData = {
      averageWPM: 28,
      marks: [
        {
          elapsedTime: 329,
          wordsPerMinute: 109.42249240121579,
          typedText: " on",
          material: "on",
          markedCorrect: true,
          hint: "OPB",
        },
        {
          elapsedTime: 1544,
          wordsPerMinute: 54.4041450777202,
          typedText: " hix",
          material: "him",
          markedCorrect: false,
          hint: "HEUPL",
        },
        {
          elapsedTime: 1544,
          wordsPerMinute: 54.4041450777202,
          typedText: " him",
          material: "him",
          markedCorrect: false,
          hint: "HEUPL",
        },
      ],
    };
    expect(transformLessonDataToChartData(lessonData)).toEqual(
      expectedChartData
    );
  });
});
