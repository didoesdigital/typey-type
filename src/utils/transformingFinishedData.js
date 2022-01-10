function stitchTogetherLessonData(lessonStrokes, startTime, wpm) {
  let lessonData = {
    version: 1,
    lessonStrokes,
    startTime,
    wpm,
  }

  return lessonData;
}

function transformLessonDataToChartData(lessonData) {
  let transformedData = {
    averageWPM: lessonData.wpm,
    version: lessonData.version,
  };

  let dataPoints = [];

  lessonData.lessonStrokes.forEach((typedMaterial, materialIndex) => {
    const elapsedTime = typedMaterial.time - lessonData.startTime;
    const numberOfWords = typedMaterial.numberOfMatchedWordsSoFar;
    const firstPhrase = materialIndex === 0;
    const nonZeroAttempts = typedMaterial.attempts?.length > 0;

    if (nonZeroAttempts) {
      typedMaterial.attempts.forEach((attempt, attemptIndex) => {
        const firstAttempt = firstPhrase && attemptIndex === 0;
        dataPoints.push({
          elapsedTime: attempt.time - lessonData.startTime,
          wordsPerMinute: firstAttempt ? 0 : attempt.numberOfMatchedWordsSoFar / (elapsedTime / 1000 / 60),
          typedText: attempt.text,
          material: typedMaterial.word,
          markedCorrect: typedMaterial.accuracy,
          hint: typedMaterial.stroke,
          hintWasShown: attempt.hintWasShown,
          attemptPeak: true,
        })
      })
    }

    dataPoints.push({
      attemptPeak: false,
      elapsedTime: elapsedTime,
      wordsPerMinute: firstPhrase ? 0 : numberOfWords / (elapsedTime / 1000 / 60),
      typedText: typedMaterial.typedText,
      material: typedMaterial.word,
      markedCorrect: typedMaterial.accuracy,
      hint: typedMaterial.stroke,
      hintWasShown: typedMaterial.hintWasShown,
    })
  })

  transformedData.dataPoints = dataPoints;

  /* NOTE:
   * To make more fixtures for stories, uncomment this console.log
   * and type out a lesson.
   */
  // console.log(transformedData);
  return transformedData;
}

export {
  stitchTogetherLessonData,
  transformLessonDataToChartData,
};
