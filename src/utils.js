// @flow

type Lesson = {
  "title": "Test lesson",
  "subtitle": "Test",
  "category": "Drills",
  "subcategory": "Test drills",
  "path": "./lessons/test-lesson.txt"
};
type PresentedMaterial = [{phrase: '', stroke: ''}];

function matchLessonToTerm(lesson : Lesson, value : string) {
  var terms = value.toLowerCase().split(/\s+/);
  if (terms.length === 1 && terms[0] === "") { return false; }
  var text = [lesson.title, lesson.subtitle, lesson.category, lesson.subcategory].join(' ').toLowerCase();
  return terms.every( term => text.indexOf(term) !== -1);
}

function sortLessons(a : Lesson, b : Lesson, value : string) {
  if (value === '') {
    return 0;
  }
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

function isPeak(currentItemLength : number, previousItemLength : number, nextItemLength : number) {
  let isPeak = false;
  if ((currentItemLength > previousItemLength) && (currentItemLength > nextItemLength)) { isPeak = true };
  return isPeak;
}

function randomise(array : Array<PresentedMaterial>) {
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

export { matchLessonToTerm, sortLessons, isPeak, randomise};
