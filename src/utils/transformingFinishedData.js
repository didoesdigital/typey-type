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
  };

  let marks = [];

  lessonData.lessonStrokes.forEach(typedMaterial => {
    let elapsedTime = typedMaterial.time - lessonData.startTime;
    let numberOfWords = typedMaterial.numberOfMatchedWordsSoFar

    if (typedMaterial.attempts?.length > 0) {
      typedMaterial.attempts.forEach((attempt, i) => {
        marks.push({
          elapsedTime: elapsedTime,
          wordsPerMinute: elapsedTime / (attempt.numberOfMatchedWordsSoFar),
          typedText: attempt.text,
          material: typedMaterial.word,
          markedCorrect: typedMaterial.accuracy,
          hint: typedMaterial.stroke
        })
      })
    }

    marks.push({
      elapsedTime: elapsedTime,
      wordsPerMinute: elapsedTime / numberOfWords,
      typedText: typedMaterial.typedText,
      material: typedMaterial.word,
      markedCorrect: typedMaterial.accuracy,
      hint: typedMaterial.stroke
    })
  })

  transformedData.marks = marks;
  console.log({ transformedData });

  return transformedData;
}

export {
  stitchTogetherLessonData,
  transformLessonDataToChartData,
};
