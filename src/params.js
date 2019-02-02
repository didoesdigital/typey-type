// TODO: Restructure this file as follows…
//
// // 1 const per studyType with all params:
// const practice = {
//   limitNumberOfWords: 300;
// }
//
// // Function to map params to string, eg:
// let paramsArray = [];
// for (const [keyVar, valueVar] of Object.entries(practice)) {
//   paramsArray.push("" + keyVar + "=" + valueVar);
// };
// const practiceParams = "?" + paramsArray.join("&");
//
// // Export as 1 object:
// export default = {
//   practice: practice,
//   practiceParams: practiceParams
// }
//
// // Use in relevant file like this:
// let example = PARAMS.practice.limitNumberOfWords;
// let queryExample = path + PARAMS.practiceParams
//
// This approach would let us avoid `practice` as a global variable,
// programmatically set param strings, and
// provide easy access to variables via an object.

export const practiceLimitNumberOfWords = 300;

export const discoverParams = '?recommended=true&study=discover&limitNumberOfWords=15&repetitions=5&newWords=1&seenWords=0&retainedWords=0&showStrokes=1&hideStrokesOnLastRepetition=1&sortOrder=sortOff&startFromWord=1';
export const revisionParams = '?recommended=true&study=revise&limitNumberOfWords=50&repetitions=3&newWords=0&seenWords=1&retainedWords=0&showStrokes=0&hideStrokesOnLastRepetition=0&sortOrder=sortNew&startFromWord=1';
export const drillParams = '?recommended=true&study=drill&limitNumberOfWords=100&repetitions=3&newWords=0&seenWords=1&retainedWords=1&showStrokes=0&hideStrokesOnLastRepetition=0&sortOrder=sortRandom&startFromWord=1';
export const practiceParams = '?recommended=true&study=practice&limitNumberOfWords=' + practiceLimitNumberOfWords + '&repetitions=1&newWords=1&seenWords=1&retainedWords=1&showStrokes=0&hideStrokesOnLastRepetition=0&sortOrder=sortOff&startFromWord=1';

