const practice = {
  study: 'practice',
  sortOrder: 'sortOff',
  limitNumberOfWords: 300,
  repetitions: 1,
  showStrokes: false,

  newWords: 1,
  seenWords: 1,
  retainedWords: 1,
  // showStrokes: 0,
  // hideStrokesOnLastRepetition: 0,
  // sortOrder: "sortOff",
  // startFromWord: 1
}

const drill = {
  study: 'drill',
  sortOrder: 'sortRandom',
  limitNumberOfWords: 100,
  repetitions: 3,
  showStrokes: false,

  newWords: 1,
  seenWords: 1,
  retainedWords: 1,
  // showStrokes: 0,
  // hideStrokesOnLastRepetition: 0,
  // sortOrder: "sortOff",
  // startFromWord: 1
}

const revise = {
  study: 'revise',
  sortOrder: 'sortNew',
  limitNumberOfWords: 50,
  repetitions: 3,
  showStrokes: false,

  newWords: 1,
  seenWords: 1,
  retainedWords: 1,
  // hideStrokesOnLastRepetition: 0,
  // sortOrder: "sortOff",
  // startFromWord: 1
}

const discover = {
  study: 'discover',
  sortOrder: 'sortOff',
  limitNumberOfWords: 15,
  repetitions: 5,
  showStrokes: true,

  newWords: 1,
  seenWords: 1,
  retainedWords: 1,
  // showStrokes: 0,
  // hideStrokesOnLastRepetition: 0,
  // sortOrder: "sortOff",
  // startFromWord: 1
}

let practiceList = [];
for (const [key, value] of Object.entries(practice)) { practiceList.push("" + key + "=" + value); };
const practiceParams = practiceList.join("&");

let drillList = [];
for (const [key, value] of Object.entries(drill)) { drillList.push("" + key + "=" + value); };
const drillParams = drillList.join("&");

let reviseList = [];
for (const [key, value] of Object.entries(revise)) { reviseList.push("" + key + "=" + value); };
const reviseParams = reviseList.join("&");

let discoverList = [];
for (const [key, value] of Object.entries(discover)) { discoverList.push("" + key + "=" + value); };
const discoverParams = discoverList.join("&");

export default {
  practice: practice,
  practiceParams: practiceParams,
  drill: drill,
  drillParams: drillParams,
  revise: revise,
  reviseParams: reviseParams,
  discover: discover,
  discoverParams: discoverParams
}

// // Use in relevant file like this:
// let example = PARAMS.practice.limitNumberOfWords;
// let queryExample = path + PARAMS.practiceParams
