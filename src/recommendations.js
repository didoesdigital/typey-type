import * as PARAMS from './params.js';

let data = null;

let recommendedStudySession = [
  // null,
  'practice',
  'drill',
  'revise',
  'discover',
  'wildcard',
  'break'
  // repeat
];

function fetchRecommendations() {
  return fetch(process.env.PUBLIC_URL + '/lessons/recommendations.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return json;
  }).catch(function(e) {
    return {
      "discoverCourse": [
        {
          "path": "/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
          "lessonTitle": "One-syllable words with simple keys",
          "target": 15
        }
      ],
      "revisionCourse": [
        {
          "path": "/lessons/drills/top-10000-project-gutenberg-words/lesson.txt",
          "lessonTitle": "Top 10000 Project Gutenberg words",
          "target": 10000
        }
      ],
      "drillCourse": [
        {
          "path": "/lessons/drills/top-10000-project-gutenberg-words/lesson.txt",
          "lessonTitle": "Top 10000 Project Gutenberg words",
          "target": 10000
        }
      ]
    };
  });
}

function getRecommendedCourses() {
  let recommendedCourses = {};
  if (data === null) {
    recommendedCourses = fetchRecommendations();
  } else {
    recommendedCourses = Promise.resolve(data);
  }

  return recommendedCourses;
};

function getRecommendedNextLesson(lessonsProgress = {}, history = {}, numberOfWordsSeen = 0, numberOfWordsMemorised = 0, lessonIndex = {}, metWords = {}) {
  return getRecommendedCourses()
  .then(courses => {
    // fallback lesson:
    let recommendedNextLesson = {
      studyType: "practice",
      limitNumberOfWords: 150,
      repetitions: 1,
      linkTitle: "Top 10000 Project Gutenberg words",
      linkText: "Practice 150 words from Top 10000 Project Gutenberg words",
      link: process.env.PUBLIC_URL + "/lessons/drills/top-10000-project-gutenberg-words/" + PARAMS.practiceParams
    };

    // Check previousStep to set index of recommendedStudySession
    // For given step, check if it's viable e.g. you've seen punctuation and basic words so you can do practice:
    // metWords = { "a": 1, "man": 1, "!": 1, ".": 1, "?": 1, "as": 1, "if": 1 }
    // 'A': KPA/AEU
    // 'man!': PHAPB SKHRAPL
    // 'A': KPA/AEU
    // 'man.': PHAPB TP-PL
    // 'A': KPA/AEU
    // 'man?': PHAPB H-F
    // 'As': AZ
    // 'if.': TP TP-PL
    // If not viable, move to next step; if nothing is valid (e.g. you've discovered ALL words on Typey Type, fall back to top 10,000 project gutenberg words practice
    let recommendedStudySessionIndex = 0;
    // console.log(history);
    if (typeof history === "object") {
      switch (history["previousStep"]) {
        case "practice":
          recommendedStudySessionIndex = 0;
          break;
        case "drill":
          recommendedStudySessionIndex = 1;
          break;
        case "revise":
          recommendedStudySessionIndex = 2;
          break;
        case "discover":
          recommendedStudySessionIndex = 3;
          break;
        case "wildcard":
          recommendedStudySessionIndex = 4;
          break;
        case "compete":
          recommendedStudySessionIndex = 4;
          break;
        case "game":
          recommendedStudySessionIndex = 4;
          break;
        case "break":
          recommendedStudySessionIndex = 5;
          break;
        case null:
          recommendedStudySessionIndex = 0;
          break;
        default:
          recommendedStudySessionIndex = 0;
          break;
      }
    }
    // console.log(recommendedStudySessionIndex);
    // console.log(recommendedStudySession[recommendedStudySessionIndex]);

    if (recommendedStudySession[recommendedStudySessionIndex] === "practice" && numberOfWordsMemorised < 2) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "practice") {
      let practiceParams = PARAMS.practiceParams;
      let recommendedPracticeLesson = lessonIndex.find((recommendable) => {
        // TODO: should this have process.env.PUBLIC_URL?
        if (recommendable.path === "/drills/project-gutenberg-sentences-using-top-100-words/lesson.txt") {
          if (!(metWords[" man"] > 2) && !(metWords["man "] > 2) && !(metWords["man"] > 2)) {
            practiceParams = '?recommended=true&study=practice&limitNumberOfWords=150&repetitions=1&newWords=1&seenWords=1&retainedWords=1&showStrokes=0&hideStrokesOnLastRepetition=0&sortOrder=sortOff&startFromWord=7';
          }
          return true;
        }
        else if (recommendable.category && recommendable.category === "Stories" ) {
          return true;
        }

        return false;
      });

      if (typeof recommendedPracticeLesson !== "undefined") {
        recommendedNextLesson.studyType = 'practice';
        recommendedNextLesson.limitNumberOfWords = 300;
        recommendedNextLesson.repetitions = 1;
        recommendedNextLesson.linkTitle = recommendedPracticeLesson.title; // lessonIndex has title not lessonTitle
        recommendedNextLesson.linkText = "Practice " + recommendedPracticeLesson.title; // lessonIndex has title not lessonTitle
        recommendedNextLesson.link = "lessons" + recommendedPracticeLesson.path.replace(/lesson.txt$/,'') + practiceParams;
      }
    }

    // console.log(numberOfWordsMemorised);
    // debugger
    if (recommendedStudySession[recommendedStudySessionIndex] === "drill" && numberOfWordsMemorised < 2) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "drill") {
      let entryInLessonsProgress;
      // debugger;
      let recommendedDrillLesson = courses.drillCourse.find((recommendable) => {
        // no lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
        // so it's probably a good candidate
        if (typeof lessonsProgress[recommendable.path] === "undefined") { return true; }

        entryInLessonsProgress = lessonsProgress[recommendable.path];

        // don't pick this lesson if you've already seen 15 words and its target was 15
        if (entryInLessonsProgress['numberOfWordsMemorised'] >= recommendable['target']) { return false; }

        // don't pick this lesson if it has fewer than 15 seen words because you've already memorised all the words in this lesson
        if (entryInLessonsProgress['numberOfWordsMemorised'] < 50) { return false; }

        return true;
      });

      if (typeof recommendedDrillLesson !== "undefined") {
        recommendedNextLesson.studyType = 'drill';
        recommendedNextLesson.limitNumberOfWords = 100;
        recommendedNextLesson.repetitions = 3;
        recommendedNextLesson.linkTitle = recommendedDrillLesson.lessonTitle;
        recommendedNextLesson.linkText = "Drill " + recommendedNextLesson.limitNumberOfWords + " words from " + recommendedDrillLesson.lessonTitle + " with " + recommendedNextLesson.repetitions + " repetitions";
        recommendedNextLesson.link = recommendedDrillLesson.path.replace(/lesson.txt$/,'') + PARAMS.drillParams;
      }
    }

    // console.log(numberOfWordsSeen);
    if (recommendedStudySession[recommendedStudySessionIndex] === "revise" && numberOfWordsSeen < 30) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "revise") {
      // one day it could include an option to revise your worst words or tricky words
      let reviseChoice = Math.random() <.5 ? "reviseLessons" : "reviseSeen";

      switch (reviseChoice) {
        case "reviseSeen":
          recommendedNextLesson.studyType = 'revise';
          recommendedNextLesson.limitNumberOfWords = 50;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your revision words";
          recommendedNextLesson.linkText = "Your revision words";
          recommendedNextLesson.link = "/lessons/progress/seen/" + PARAMS.revisionParams;
          break;

        case "reviseLessons":
          let entryInLessonsProgress;
          let recommendedRevisionLesson = courses.revisionCourse.find((recommendable) => {
            // no lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
            // so it's probably a good candidate
            if (typeof lessonsProgress[recommendable.path] === "undefined") { return true; }

            entryInLessonsProgress = lessonsProgress[recommendable.path];

            // don't pick this lesson if you've already seen 15 words and its target was 15
            if (entryInLessonsProgress['numberOfWordsSeen'] >= recommendable['target']) { return false; }

            // don't pick this lesson if it has fewer than 15 seen words because you've already memorised all the words in this lesson
            if (entryInLessonsProgress['numberOfWordsSeen'] < 50) { return false; }

            return true;
          });

          if (typeof recommendedRevisionLesson !== "undefined") {
            recommendedNextLesson.studyType = 'revise';
            recommendedNextLesson.limitNumberOfWords = 50;
            recommendedNextLesson.repetitions = 3;
            recommendedNextLesson.linkTitle = recommendedRevisionLesson.lessonTitle;
            recommendedNextLesson.linkText = "Revise 50 words from " + recommendedRevisionLesson.lessonTitle + " with 3 repetitions";
            recommendedNextLesson.link = recommendedRevisionLesson.path.replace(/lesson.txt$/,'') + PARAMS.revisionParams;
          }
          break;

        default:
          recommendedNextLesson.studyType = 'revise';
          recommendedNextLesson.limitNumberOfWords = 50;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your revision words";
          recommendedNextLesson.linkText = "Your revision words";
          recommendedNextLesson.link = "/lessons/progress/seen/" + PARAMS.revisionParams;
          break;
      }
    }


    // Once a step is chosen, pick a valid lesson/step for that
    // For discover, review lessonsProgress for words seen and compare against targets in recommendedDiscoverCourse
    if (recommendedStudySession[recommendedStudySessionIndex] === "discover") {
      // recommendable = {
      //   path: "/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
      //   lessonTitle: "One-syllable words with simple keys",
      //   target: 15
      // }
      // anotherRecommendable = {
      //   path: process.env.PUBLIC_URL + "/lessons/fundamentals/one-syllable-words-with-inversion/lesson.txt",
      //   lessonTitle: "One-syllable words with inversion",
      //   target: 6
      // },
      // lessonsProgress = {
      //   "/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt": {
      //       "numberOfWordsSeen":2,
      //       "numberOfWordsToDiscover": 202
      //     },
      //   "/lessons/drills/top-100-words/lesson.txt": {
      //       "numberOfWordsSeen":3,
      //       "numberOfWordsToDiscover": 97
      //     },
      //   "/lessons/fundamentals/one-syllable-words-with-inversion/lesson.txt": {
      //       "numberOfWordsSeen":3,
      //       "numberOfWordsToDiscover": 3
      //     }
      // };
      let entryInLessonsProgress;
      let recommendedDiscoverLesson = courses.discoverCourse.find((recommendable) => {
        // if (recommendable.path.includes("top-100-words")) {debugger}
        // // no matching lessons:
        // if (typeof recommendable === "undefined") { return false; }

        // // no recommendable lesson path:
        // if (typeof recommendable.path === "undefined") { return false; }

        // no lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
        // so it's probably a good candidate
        if (typeof lessonsProgress[recommendable.path] === "undefined") { return true; }

        entryInLessonsProgress = lessonsProgress[recommendable.path];

        // don't pick this lesson if you've already seen 15 words and its target was 15
        if (entryInLessonsProgress['numberOfWordsSeen'] >= recommendable['target']) { return false; }

        // don't pick this lesson if you've seen ALL the words (leftToDiscover === 0)
        if (entryInLessonsProgress['numberOfWordsToDiscover'] <= 1) { return false; }

        return true;
      });

      if (typeof recommendedDiscoverLesson !== "undefined") {
        recommendedNextLesson.studyType = 'discover';
        recommendedNextLesson.limitNumberOfWords = 15;
        recommendedNextLesson.repetitions = 5;
        recommendedNextLesson.linkTitle = recommendedDiscoverLesson.lessonTitle;
        recommendedNextLesson.linkText = "Discover 15 words from " + recommendedDiscoverLesson.lessonTitle + " with 5 repetitions";
        recommendedNextLesson.link = recommendedDiscoverLesson.path.replace(/lesson.txt$/,'') + PARAMS.discoverParams;
      }
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "wildcard") {
      // one day it could include "test"
      let wildcardChoice = Math.random() <.5 ? "compete" : "game";

      switch (wildcardChoice) {
        case "compete":
          recommendedNextLesson.studyType = 'compete';
          recommendedNextLesson.limitNumberOfWords = null;
          recommendedNextLesson.repetitions = null;
          recommendedNextLesson.linkTitle = "Type Racer"
          recommendedNextLesson.linkText = "Play Type Racer";
          recommendedNextLesson.link = 'http://play.typeracer.com';
          break;
        case "game":
          recommendedNextLesson.studyType = 'game';
          recommendedNextLesson.limitNumberOfWords = null;
          recommendedNextLesson.repetitions = null;
          recommendedNextLesson.linkTitle = "Cargo Crisis"
          recommendedNextLesson.linkText = "Play Cargo Crisis";
          recommendedNextLesson.link = 'http://qwertysteno.com/Games/CargoCrisis.php';
          break;
        default:
          recommendedNextLesson.studyType = 'break';
          recommendedNextLesson.limitNumberOfWords = null;
          recommendedNextLesson.repetitions = null;
          recommendedNextLesson.linkTitle = "Take a break"
          recommendedNextLesson.linkText = "Take a break";
          recommendedNextLesson.link = '/break';
          break;
      }

    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "break") {
      recommendedNextLesson.studyType = 'break';
      recommendedNextLesson.limitNumberOfWords = null;
      recommendedNextLesson.repetitions = null;
      recommendedNextLesson.linkTitle = "Take a break"
      recommendedNextLesson.linkText = "Give me more";
      recommendedNextLesson.link = '/break';
      // recommendedNextLesson.link = 'https://www.reddit.com/r/Plover/';
    }

    // console.log(recommendedStudySession[recommendedStudySessionIndex]);
    return recommendedNextLesson;
  });
}

export {
  getRecommendedNextLesson
};
