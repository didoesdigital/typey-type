import type { StudyTypeParams } from "types";

const discover: StudyTypeParams = {
  study: "discover",
  showStrokes: true,
  hideStrokesOnLastRepetition: true,
  newWords: true,
  seenWords: false,
  retainedWords: false,
  repetitions: 5,
  limitNumberOfWords: 15,
  sortOrder: "sortOff",
};

const revise: StudyTypeParams = {
  study: "revise",
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: false,
  seenWords: true,
  retainedWords: false,
  repetitions: 3,
  limitNumberOfWords: 50,
  sortOrder: "sortNew",
};

const drill: StudyTypeParams = {
  study: "drill",
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: false,
  seenWords: true,
  retainedWords: true,
  repetitions: 3,
  limitNumberOfWords: 100,
  sortOrder: "sortRandom",
};

const practice: StudyTypeParams = {
  study: "practice",
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: true,
  seenWords: true,
  retainedWords: true,
  repetitions: 1,
  limitNumberOfWords: 0,
  sortOrder: "sortOff",
};

export function createParamString(studyTypeObject: StudyTypeParams) {
  const paramList = [];
  for (const [key, value] of Object.entries(studyTypeObject)) {
    let shortStringValue: string | StudyTypeParams[keyof StudyTypeParams] =
      value;
    if (value === false) {
      shortStringValue = "0";
    }
    if (value === true) {
      shortStringValue = "1";
    }
    if (typeof value === "number") {
      shortStringValue = value.toString();
    }

    paramList.push("" + key + "=" + shortStringValue);
  }
  return paramList.join("&");
}

const practiceParams = createParamString(practice);
const drillParams = createParamString(drill);
const reviseParams = createParamString(revise);
const discoverParams = createParamString(discover);

const PARAMS = {
  practice: practice,
  practiceParams: practiceParams,
  drill: drill,
  drillParams: drillParams,
  revise: revise,
  reviseParams: reviseParams,
  discover: discover,
  discoverParams: discoverParams,
};

export default PARAMS;

// // Use in relevant file like this:
// let example = PARAMS.practice.limitNumberOfWords;
// let queryExample = path + PARAMS.practiceParams
