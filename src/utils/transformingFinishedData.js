function stitchTogetherLessonData(lessonStrokes, startTime) {
  let lessonData = {
    version: 1,
    lessonStrokes,
    startTime
  }

  return lessonData;
}

function transformLessonDataToChartData(lessonData) {
  // let dataItem = {
  //   timestamp: 0,
  //   speed: 0,
  //   material: ""
  // }

  return lessonData;
}

export {
  stitchTogetherLessonData,
  transformLessonDataToChartData,
};
