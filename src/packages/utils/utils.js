function matchLessonToTerm(lesson, value) {
  return (
    lesson.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    lesson.subtitle.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

function sortLessons(a, b, value) {
  const aLower = a.title.toLowerCase()
  const bLower = b.title.toLowerCase()
  const valueLower = value.toLowerCase()
  const queryPosA = aLower.indexOf(valueLower)
  const queryPosB = bLower.indexOf(valueLower)
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB
  }
  return aLower < bLower ? -1 : 1
}

function randomise(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export {matchLessonToTerm,sortLessons,randomise};
