import { getRecommendedNextLesson } from './recommendations';
import { mockRandom, resetMockRandom } from 'jest-mock-random';

import recommendationsJSON from '../../typey-type-data/lessons/recommendations.json'
import lessonIndexJSON from '../../typey-type-data/lessons/lessonIndex.json'

import lessonsProgressNovice from './../fixtures/lessonsProgressNovice.json'
import lessonsProgressBeginner from './../fixtures/lessonsProgressBeginner.json'
import lessonsProgressCompetent from './../fixtures/lessonsProgressCompetent.json'
// import lessonsProgressProficient from './../fixtures/lessonsProgressProficient.json'
// import lessonsProgressExpert from './../fixtures/lessonsProgressExpert.json'

import metWordsCompetent from './../fixtures/metWordsCompetent.json'

describe("recommended next lesson for novice stenographer", () => {
  it("returns recommended next lesson", () => {
    let metWords = { "was": 2, " has": 1, "the ": 8, "of": 5, "and": 3 };
    let numberOfWordsSeen = 5;
    let numberOfWordsMemorised = 0;
    let history = { currentStep: null };

    mockRandom(0.9);

    const result = getRecommendedNextLesson(
      recommendationsJSON,
      lessonsProgressNovice,
      history,
      numberOfWordsSeen,
      numberOfWordsMemorised,
      lessonIndexJSON,
      metWords
    );

    expect(result).toEqual({
      studyType: "discover",
      limitNumberOfWords: 15,
      linkTitle: "Introduction",
      linkText: "Discover 15 words from Introduction with 5 repetitions",
      link: "/lessons/fundamentals/introduction/?recommended=true&study=discover&showStrokes=1&hideStrokesOnLastRepetition=1&newWords=1&seenWords=0&retainedWords=0&repetitions=5&limitNumberOfWords=15&sortOrder=sortOff",
      repetitions: 5,
    });

    resetMockRandom();
  });
});

describe('recommended next lesson for beginner stenographer a few lessons in', () => {
  it('returns recommended next lesson, your revision words', () => {
    let numberOfWordsSeen = 116;
    let numberOfWordsMemorised = 0;
    let metWords = {" in":100," his":100," he":113," it":105," by":112," have":115," from":161," You can":7," has":113," web":16," top":11," world":33," ordinary":1," mountains":1};
    let history = { currentStep: null };

    mockRandom(0.9);

    const result = getRecommendedNextLesson(
      recommendationsJSON,
      lessonsProgressBeginner,
      history,
      numberOfWordsSeen,
      numberOfWordsMemorised,
      lessonIndexJSON,
      metWords
    );

    expect(result).toEqual({
      studyType: "revise",
      limitNumberOfWords: 50,
      linkTitle: "Your revision words",
      linkText: "Your revision words",
      link: "/lessons/progress/seen/?recommended=true&study=revise&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=0&seenWords=1&retainedWords=0&repetitions=3&limitNumberOfWords=50&sortOrder=sortNew",
      repetitions: 3,
    });

    resetMockRandom();
  });

  it('returns recommended next lesson, revision lesson', () => {
    let numberOfWordsSeen = 116;
    let numberOfWordsMemorised = 0;
    let metWords = {" in":100," his":100," he":113," it":105," by":112," have":115," from":161," You can":7," has":113," web":16," top":11," world":33," ordinary":1," mountains":1};
    let history = { currentStep: null };

    mockRandom(0.3);

    const result = getRecommendedNextLesson(
      recommendationsJSON,
      lessonsProgressBeginner,
      history,
      numberOfWordsSeen,
      numberOfWordsMemorised,
      lessonIndexJSON,
      metWords
    );

    expect(result).toEqual({
      studyType: "revise",
      limitNumberOfWords: 50,
      linkTitle: "Top 100 words",
      linkText: "Revise 50 words from Top 100 words with 3 repetitions",
      link: "/lessons/drills/top-100-words/?recommended=true&study=revise&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=0&seenWords=1&retainedWords=0&repetitions=3&limitNumberOfWords=50&sortOrder=sortNew",
      repetitions: 3,
    });

    resetMockRandom();
  });
});

describe("recommended next lesson for competent stenographer", () => {
  it("returns recommended next lesson", () => {
    let numberOfWordsSeen = 50;
    let numberOfWordsMemorised = 3;
    let history = { currentStep: "revise" };

    mockRandom(0.3);

    const result = getRecommendedNextLesson(
      recommendationsJSON,
      lessonsProgressCompetent,
      history,
      numberOfWordsSeen,
      numberOfWordsMemorised,
      lessonIndexJSON,
      metWordsCompetent
    );

    expect(result).toEqual({
      studyType: "revise",
      limitNumberOfWords: 50,
      linkTitle: "Top 1000 words",
      linkText: "Revise 50 words from Top 1000 words with 3 repetitions",
      link: "/lessons/drills/top-1000-words/?recommended=true&study=revise&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=0&seenWords=1&retainedWords=0&repetitions=3&limitNumberOfWords=50&sortOrder=sortNew",
      repetitions: 3,
    });

    resetMockRandom();
  });
});

// describe('recommended next lesson is a wildcard game', () => {
//   it('returns recommended next lesson', () => {
//     let metWords = {" in":100," his":100," he":113," it":105," by":112," have":115," from":161," You can":7," has":113," web":16," top":11," world":33," ordinary":1," mountains":1};
//     let numberOfWordsSeen = 50;
//     let numberOfWordsMemorised = 3;
//     let history = { currentStep: 'discover' };

//     mockRandom(0.7);

//     const result = getRecommendedNextLesson(recommendationsJSON, lessonsProgressCompetent, history, numberOfWordsSeen, numberOfWordsMemorised, lessonIndexJSON, metWordsCompetent);
//
//     expect(result).toEqual({
//       studyType: 'game',
//       limitNumberOfWords: null,
//       linkTitle: "Cargo Crisis",
//       linkText: "Play Cargo Crisis",
//       link: 'http://qwertysteno.com/Games/CargoCrisis.php',
//       repetitions: null
//     });
//
//     resetMockRandom();
//   });
// });

