import { getRecommendedNextLesson } from './recommendations';

let lessonsProgress = {
"/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt":
{"numberOfWordsSeen":204, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/one-syllable-words-with-more-consonants/lesson.txt":
{"numberOfWordsSeen":116, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/one-syllable-words-with-inversion/lesson.txt":
{"numberOfWordsSeen":6, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/one-syllable-words-with-f-as-v-or-s/lesson.txt":
{"numberOfWordsSeen":14, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/one-syllable-words-with-unstressed-vowels/lesson.txt":
{"numberOfWordsSeen":36, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/multi-syllable-words-with-briefs/lesson.txt":
{"numberOfWordsSeen":112, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/multi-syllable-words-with-prefixes/lesson.txt":
{"numberOfWordsSeen":156, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/fingerspelling/lesson.txt":
{"numberOfWordsSeen":26, "numberOfWordsToDiscover": 0},
"/lessons/drills/top-10000-english-words/lesson.txt":
{"numberOfWordsSeen":2460, "numberOfWordsToDiscover": 0},
"/lessons/drills/top-10000-project-gutenberg-words/lesson.txt":
{"numberOfWordsSeen":2325, "numberOfWordsToDiscover": 0},
"/lessons/drills/top-100-words/lesson.txt":
{"numberOfWordsSeen":100, "numberOfWordsToDiscover": 0},
"/lessons/drills/top-1000-words/lesson.txt":
{"numberOfWordsSeen":1000, "numberOfWordsToDiscover": 0},
"/lessons/drills/apostrophes/lesson.txt":
{"numberOfWordsSeen":48, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/multi-syllable-words-with-doubled-consonant-letters/lesson.txt":
{"numberOfWordsSeen":198, "numberOfWordsToDiscover": 1379},
"/lessons/fundamentals/multi-syllable-words-with-inversion/lesson.txt":
{"numberOfWordsSeen":106, "numberOfWordsToDiscover": 55},
"/lessons/fundamentals/punctuation/lesson.txt":
{"numberOfWordsSeen":30, "numberOfWordsToDiscover": 0},
"/lessons/fundamentals/numbers/lesson.txt":
{"numberOfWordsSeen":131, "numberOfWordsToDiscover": 0},
"/lessons/drills/emotions/lesson.txt":
{"numberOfWordsSeen":44},
"/lessons/drills/time/lesson.txt":
{"numberOfWordsSeen":26},
"/lessons/drills/calendar/lesson.txt":
{"numberOfWordsSeen":4},
"/lessons/drills/common-words/lesson.txt":
{"numberOfWordsSeen":667},
"/lessons/drills/single-stroke-briefs/lesson.txt":
{"numberOfWordsSeen":922},
"/lessons/drills/email-salutations-and-complimentary-closings/lesson.txt":
{"numberOfWordsSeen":28},
"/lessons/drills/homophones/lesson.txt":
{"numberOfWordsSeen":318},
"/lessons/stories/hans-christian-andersen/the-snail-and-the-rose-tree/lesson.txt":
{"numberOfWordsSeen":608},
"/lessons/progress/seen/":
{"numberOfWordsSeen":3178, "numberOfWordsToDiscover": 0},
"/lessons/progress/memorised/":
{"numberOfWordsSeen":3178, "numberOfWordsToDiscover": 0},
"/lessons/progress/":
{"numberOfWordsSeen":3178, "numberOfWordsToDiscover": 0},
"/lessons/collections/user-experience/ux-vocabulary/lesson.txt":
{"numberOfWordsSeen":87},
"/lessons/drills/two-letter-words-rare/lesson.txt":
{"numberOfWordsSeen":12},
"/lessons/stories/fables/the-dog-and-the-wolf/lesson.txt":
{"numberOfWordsSeen":138, "numberOfWordsToDiscover": 44},
"/lessons/drills/project-gutenberg-sentences-using-top-100-words/lesson.txt":
{"numberOfWordsSeen":14048, "numberOfWordsToDiscover": 97}
};

let history = {
  previousStep: null
};

describe('recommended next lesson for new stenographer', () => {
  it('returns recommended next lesson', () => {
    // let metWords = {"was": 2, " has": 1, "the ": 8, "of": 5, "and": 3};
    let numberOfWordsSeen = 5;
    let numberOfWordsMemorised = 0;
    // let beginnerLessonsProgress = {"/typey-type/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt": {"numberOfWordsSeen":2, "numberOfWordsToDiscover": 202}, "/typey-type/lessons/drills/top-100-words/lesson.txt": {"numberOfWordsSeen":3, "numberOfWordsToDiscover": 97}};
    let beginnerLessonsProgress = {"/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt": {"numberOfWordsSeen":2, "numberOfWordsToDiscover": 202}, "/lessons/drills/top-100-words/lesson.txt": {"numberOfWordsSeen":3, "numberOfWordsToDiscover": 97}};

    expect(getRecommendedNextLesson(beginnerLessonsProgress, history, numberOfWordsSeen, numberOfWordsMemorised)).toEqual({
      studyType: 'discover',
      description: 'Discover 5–15 new briefs a day from various lessons, revealing their strokes as you learn to write them. Write them slowly, concentrating on accuracy and forming good habits around how you stroke word parts.',
      linkTitle: 'One-syllable words with simple keys',
      linkText: 'Discover 15 words from One-syllable words with simple keys with 5 repetitions',
      link: '/lessons/fundamentals/one-syllable-words-with-simple-keys/?recommended=true&study=discover&limitNumberOfWords=15&repetitions=5&newWords=1&seenWords=0&retainedWords=0&showStrokes=1&hideStrokesOnLastRepetition=1&sortOrder=sortOff&startFromWord=1'
    });
  });
});

describe('recommended next lesson for beginner stenographer a few lessons in', () => {
  it('returns recommended next lesson', () => {
    let numberOfWordsSeen = 116;
    let numberOfWordsMemorised = 0;
    let beginnerLessonsProgress = {"/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt":{"numberOfWordsSeen":204,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-more-consonants/lesson.txt":{"numberOfWordsSeen":116,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-diphthongs/lesson.txt":{"numberOfWordsSeen":44,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-f-as-v-or-s/lesson.txt":{"numberOfWordsSeen":14,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-unstressed-vowels/lesson.txt":{"numberOfWordsSeen":36,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-inversion/lesson.txt":{"numberOfWordsSeen":6,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-short-i-vowel/lesson.txt":{"numberOfWordsSeen":41,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-short-vowels/lesson.txt":{"numberOfWordsSeen":214,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-long-vowels/lesson.txt":{"numberOfWordsSeen":146,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-vowel-disambiguators/lesson.txt":{"numberOfWordsSeen":53,"numberOfWordsToDiscover":0},"/lessons/fundamentals/one-syllable-words-with-left-hand-consonants-with-multiple-keys/lesson.txt":{"numberOfWordsSeen":311,"numberOfWordsToDiscover":406},"/lessons/fundamentals/one-syllable-words-with-right-hand-consonants-with-multiple-keys/lesson.txt":{"numberOfWordsSeen":163,"numberOfWordsToDiscover":219},"/lessons/fundamentals/one-syllable-words-with-digraphs/lesson.txt":{"numberOfWordsSeen":122,"numberOfWordsToDiscover":304},"/lessons/fundamentals/one-syllable-words-with-compound-clusters/lesson.txt":{"numberOfWordsSeen":128,"numberOfWordsToDiscover":1},"/lessons/fundamentals/one-syllable-words-with-multiple-strokes/lesson.txt":{"numberOfWordsSeen":107,"numberOfWordsToDiscover":178},"/lessons/fundamentals/multi-syllable-words-with-compound-clusters/lesson.txt":{"numberOfWordsSeen":127,"numberOfWordsToDiscover":296},"/lessons/fundamentals/multi-syllable-words-with-inversion/lesson.txt":{"numberOfWordsSeen":106,"numberOfWordsToDiscover":55},"/lessons/fundamentals/multi-syllable-words-with-briefs/lesson.txt":{"numberOfWordsSeen":115,"numberOfWordsToDiscover":77},"/lessons/fundamentals/multi-syllable-words-with-prefixes/lesson.txt":{"numberOfWordsSeen":159,"numberOfWordsToDiscover":960},"/lessons/fundamentals/multi-syllable-words-with-suffixes/lesson.txt":{"numberOfWordsSeen":111,"numberOfWordsToDiscover":1722},"/lessons/fundamentals/multi-syllable-words-with-doubled-consonant-letters/lesson.txt":{"numberOfWordsSeen":244,"numberOfWordsToDiscover":1379},"/lessons/fundamentals/multi-syllable-words-with-multiple-strokes/lesson.txt":{"numberOfWordsSeen":303,"numberOfWordsToDiscover":4957},"/lessons/fundamentals/numbers/lesson.txt":{"numberOfWordsSeen":131,"numberOfWordsToDiscover":0},"/lessons/fundamentals/punctuation/lesson.txt":{"numberOfWordsSeen":30,"numberOfWordsToDiscover":0},"/lessons/fundamentals/fingerspelling/lesson.txt":{"numberOfWordsSeen":26,"numberOfWordsToDiscover":0}};



    expect(getRecommendedNextLesson(beginnerLessonsProgress, history, numberOfWordsSeen, numberOfWordsMemorised)).toEqual({
      studyType: 'revise',
      description: 'Revise 100 briefs a day from a lesson with loads of words you want to memorise, like the top 10000 English words. Try to recall the briefs before revealing their strokes. Avoid fingerspelling or writing out the long forms of words, so you can memorise the best brief for every word.',
      linkTitle: 'Top 100 words',
      linkText: 'Revise 50 words from Top 100 words with 3 repetitions',
      link: '/lessons/drills/top-100-words/?recommended=true&study=revise&limitNumberOfWords=50&repetitions=3&newWords=0&seenWords=1&retainedWords=0&showStrokes=0&hideStrokesOnLastRepetition=0&sortOrder=sortNew&startFromWord=1'
    });
  });
});

// describe('recommended next lesson for intermediate stenographer', () => {
//   it('returns recommended next lesson', () => {
//     let metWords = {" in":100," his":100," he":113," it":105," by":112," have":115," from":161," You can":7," has":113," web":16," top":11," world":33," ordinary":1," mountains":1};
//     let numberOfWordsSeen = 50;
//     let numberOfWordsMemorised = 3;
//     // lessonsProgress = {'lesson.txt': 1000}; // at top of file

//     expect(getRecommendedNextLesson(lessonsProgress, history, numberOfWordsSeen, numberOfWordsMemorised)).toEqual({
//       studyType: 'revise',
//       description: "You've already seen a lot of words but haven't memorised as many. Revise 50 words and try to recall the briefs before revealing their strokes. Avoid fingerspelling or writing out the long forms of words, so you can memorise the best brief for every word.",
//       linkTitle: 'Top 100 English words',
//       linkText: 'Revise 50 words from Top 100 English words 3 times',
//       link: '/typey-type/lessons/drills/top-100-words/'
//     });
//   });
// });

// describe('recommended next lesson is a wildcard game', () => {
//   it('returns recommended next lesson', () => {
//     let metWords = {" in":100," his":100," he":113," it":105," by":112," have":115," from":161," You can":7," has":113," web":16," top":11," world":33," ordinary":1," mountains":1};
//     let numberOfWordsSeen = 50;
//     let numberOfWordsMemorised = 3;
//     let profile = {
//       interests: ['UX design', 'Code', 'Legal', 'Medical'],
//       motivation: ['Ergonomics', 'Efficiency', 'Speed', 'Personal use'],
//       stenoStudies: {readBeginnerTheory: true, stenoStarterBoard: true, memorisedStenoLayout: true}
//     };
//     // lessonsProgress = {'lesson.txt': 1000}; // at top of file

//     // TODO:
//     // no studyType
//     // or maybe studyType could be 'game'?
//     expect(getRecommendedNextLesson(numberOfWordsSeen, numberOfWordsMemorised, lessonsProgress, profile)).toEqual({
//       description: "You've been so diligent! You might take a break from drilling and try a game like <a href='http://qwertysteno.com/Games/CargoCrisis.php'>Cargos Crisis</a>.",
//       linkTitle: 'Top 100 English words',
//       linkText: 'Revise 50 words from Top 100 English words 3 times',
//       link: '/typey-type/lessons/drills/top-100-words/'
//     });
//   });
// });

