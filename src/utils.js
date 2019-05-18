// @flow

type Lesson = {
  "title": "Test lesson",
  "subtitle": "Test",
  "category": "Drills",
  "subcategory": "Test drills",
  "path": "./lessons/test-lesson.txt"
};
type PresentedMaterial = [{phrase: '', stroke: ''}];

function relativeTimeAgo(timeNow : number, timeInThePast : number) {
  let timeInThePastUnit = " minutes";
  let timeInThePastHumanized = Math.round((timeNow - timeInThePast) / 60000);
  let relativeTimeAgo = "";

  if (timeInThePastHumanized >= 60) {
    timeInThePastHumanized = Math.round(timeInThePastHumanized / 60);
    timeInThePastUnit = " hours";
    if (timeInThePastHumanized >= 24) {
      timeInThePastHumanized = Math.round(timeInThePastHumanized / 24);
      timeInThePastUnit = " days";
      if (timeInThePastHumanized >= 7) {
        timeInThePastHumanized = Math.round(timeInThePastHumanized / 7);
        timeInThePastUnit = " weeks";
      }
    }
  }


  if (timeInThePastHumanized === 1) {
    switch (timeInThePastUnit) {
      case " minutes":
        timeInThePastUnit = " minute";
        break;
      case " hours":
        timeInThePastUnit = " hour";
        break;
      case " days":
        timeInThePastUnit = " day";
        break;
      case " weeks":
        timeInThePastUnit = " week";
        break;
      default:
        timeInThePastUnit = " minute";
    }
  }

  relativeTimeAgo = "" + timeInThePastHumanized + timeInThePastUnit;
  return relativeTimeAgo;
}

function isLessonTextValid(lessonText : string) {
  return !(lessonText === '' || typeof lessonText !== 'string' || (typeof lessonText === 'string' && lessonText.toLowerCase().startsWith('<!doctype html>')));
}

function matchLessonToTerm(lesson : Lesson, value : string) {
  let terms = value.toLowerCase().split(/\s+/);
  if (terms.length === 1 && terms[0] === "") { return false; }
  let text = [lesson.title, lesson.subtitle, lesson.category, lesson.subcategory].join(' ').toLowerCase();
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

export { relativeTimeAgo, matchLessonToTerm, sortLessons, isPeak, randomise, isLessonTextValid};
