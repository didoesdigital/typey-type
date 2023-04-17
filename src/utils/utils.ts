type MaterialItem = { phrase: string; stroke: string };
type Material = MaterialItem[];

function relativeTimeAgo(timeNow: number, timeInThePast: number) {
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
  if (timeInThePastHumanized === 0 && timeInThePastUnit === " minutes") {
    relativeTimeAgo = "a moment";
  }
  return relativeTimeAgo;
}

function isLessonTextValid(lessonText: string) {
  return !(
    lessonText === "" ||
    typeof lessonText !== "string" ||
    (typeof lessonText === "string" &&
      lessonText.toLowerCase().startsWith("<!doctype html>"))
  );
}

function isPeak(
  currentItemLength: number,
  previousItemLength: number,
  nextItemLength: number
) {
  let isPeak = false;
  if (
    currentItemLength > previousItemLength &&
    currentItemLength > nextItemLength
  ) {
    isPeak = true;
  }
  return isPeak;
}

function randomise(array: Material) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function escapeRegExp(regexStr: string) {
  return regexStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export {
  escapeRegExp,
  getRandomBetween,
  isLessonTextValid,
  isPeak,
  randomise,
  relativeTimeAgo,
};
