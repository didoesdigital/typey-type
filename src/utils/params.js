const discover = {
  study: 'discover',
  showStrokes: true,
  hideStrokesOnLastRepetition: true,
  newWords: true,
  seenWords: false,
  retainedWords: false,
  repetitions: 5,
  limitNumberOfWords: 15,
  sortOrder: 'sortOff',
}

const revise = {
  study: 'revise',
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: false,
  seenWords: true,
  retainedWords: false,
  repetitions: 3,
  limitNumberOfWords: 50,
  sortOrder: 'sortNew',
}

const drill = {
  study: 'drill',
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: false,
  seenWords: true,
  retainedWords: true,
  repetitions: 3,
  limitNumberOfWords: 100,
  sortOrder: 'sortRandom',
}

const practice = {
  study: 'practice',
  showStrokes: false,
  hideStrokesOnLastRepetition: true,
  newWords: true,
  seenWords: true,
  retainedWords: true,
  repetitions: 1,
  limitNumberOfWords: 0,
  sortOrder: 'sortOff',
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
