import { mean } from "d3-array";
import type { LessonData } from "pages/lessons/types";

// @ts-expect-error TS(7006) FIXME: Parameter 'wordCount' implicitly has an 'any' type... Remove this comment to see the full error message
const calculatedAdjustedWPM = (wordCount, duration) => Math.max(wordCount - 1, 0) / (duration / 1000 / 60);

function stitchTogetherLessonData(
  lessonStrokes: any[],
  startTime: number,
  wpm: number
): LessonData {
  let lessonData = {
    version: 3,
    lessonStrokes,
    startTime,
    wpm,
  };

  return lessonData;
}

function transformLessonDataToChartData(lessonData: LessonData) {
  let transformedData = {
    averageWPM: lessonData.wpm,
    version: lessonData.version,
  };

  // @ts-expect-error TS(7034) FIXME: Variable 'dataPoints' implicitly has type 'any[]' ... Remove this comment to see the full error message
  let dataPoints = [];

  const minimumStrokes = 4;
  const minimumStrokesData = lessonData.lessonStrokes
    .map((d) => ({ ...d }))
    .slice(0, minimumStrokes);
  const avgMinimumStrokesData = mean(minimumStrokesData, (d, i) =>
    i === 0
      ? 0
      : calculatedAdjustedWPM(d.numberOfMatchedWordsSoFar, (d.time - lessonData.startTime))
  );

  lessonData.lessonStrokes.forEach((typedMaterial, materialIndex) => {
    const elapsedTime = typedMaterial.time - lessonData.startTime;
    const numberOfWords = typedMaterial.numberOfMatchedWordsSoFar;
    const firstPhrase = materialIndex === 0;
    const nonZeroAttempts = typedMaterial.attempts?.length > 0;

    if (nonZeroAttempts) {
      // @ts-expect-error TS(7006) FIXME: Parameter 'attempt' implicitly has an 'any' type.
      typedMaterial.attempts.forEach((attempt, attemptIndex) => {
        const firstAttempt = firstPhrase && attemptIndex === 0;
        dataPoints.push({
          elapsedTime: attempt.time - lessonData.startTime,
          wordsPerMinute: firstAttempt
            ? 0
            : calculatedAdjustedWPM(attempt.numberOfMatchedWordsSoFar, elapsedTime),
          typedText: attempt.text,
          material: typedMaterial.word,
          markedCorrect: typedMaterial.accuracy,
          hint: typedMaterial.stroke,
          hintWasShown: attempt.hintWasShown,
          attemptPeak: true,
        });
      });
    }

    dataPoints.push({
      attemptPeak: false,
      elapsedTime: elapsedTime,
      wordsPerMinute: firstPhrase
        ? 0
        : materialIndex < minimumStrokes
        ? avgMinimumStrokesData
        : calculatedAdjustedWPM(numberOfWords, elapsedTime),
      typedText: typedMaterial.typedText,
      material: typedMaterial.word,
      materialIndex: materialIndex,
      markedCorrect: typedMaterial.accuracy,
      hint: typedMaterial.stroke,
      hintWasShown: typedMaterial.hintWasShown,
    });
  });

  // @ts-expect-error TS(2339) FIXME: Property 'dataPoints' does not exist on type '{ av... Remove this comment to see the full error message
  transformedData.dataPoints = dataPoints;

  /* NOTE:
   * To make more fixtures for stories, uncomment this console.log
   * and type out a lesson.
   */
  console.log(transformedData);
  return transformedData;
}

export { stitchTogetherLessonData, transformLessonDataToChartData };
