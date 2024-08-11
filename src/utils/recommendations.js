import PARAMS from './params.js';

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

const games = [
  {
    studyType: 'game',
    limitNumberOfWords: null,
    repetitions: null,
    linkTitle: "KAOES (keys) game",
    linkText: "Play KAOES (keys) game",
    link: '/games/KAOES',
  },
  {
    studyType: 'game',
    limitNumberOfWords: null,
    repetitions: null,
    linkTitle: "SHUFL (shuffle) game",
    linkText: "Play SHUFL (shuffle) game",
    link: '/games/SHUFL',
  },
  {
    studyType: 'game',
    limitNumberOfWords: null,
    repetitions: null,
    linkTitle: "TPEUBGSZ (fixes) game",
    linkText: "Play TPEUBGSZ (fixes) game",
    link: '/games/TPEUBGSZ',
  }
]

function getRecommendedNextLesson(courses, lessonsProgress = {}, history = {}, numberOfWordsSeen = 0, numberOfWordsMemorised = 0, lessonIndex = {}, metWords = {}) {
    // fallback lesson:
    let recommendedNextLesson = {
      studyType: "practice",
      limitNumberOfWords: 300,
      repetitions: 1,
      linkTitle: "Top 10000 Project Gutenberg words",
      linkText: "Practice 300 words from Top 10000 Project Gutenberg words",
      link: process.env.PUBLIC_URL + "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" + PARAMS.practiceParams
    };

    // Check currentStep to set index of recommendedStudySession
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
    if (typeof history === "object") {
      switch (history["currentStep"]) {
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

    if (recommendedStudySession[recommendedStudySessionIndex] === "practice" && numberOfWordsMemorised < 2) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "practice") {
      let practiceParams = '?recommended=true&' + PARAMS.practiceParams;
      let practiceChoice = Math.random() <.9 ? "practiceLessons" : "practiceAllYourWords";

      switch (practiceChoice) {
        case "practiceAllYourWords":
          practiceParams = practiceParams.replace('newWords=1','newWords=0');
          recommendedNextLesson.limitNumberOfWords = 300;
          recommendedNextLesson.linkTitle = "Your words";
          recommendedNextLesson.linkText = "Practice your words";
          recommendedNextLesson.link = "/lessons/progress/" + practiceParams;
          recommendedNextLesson.studyType = 'practice';
          recommendedNextLesson.repetitions = 1;
          break;

        case "practiceLessons":
          let recommendedPracticeLesson = courses.practiceCourse.find((recommendable) => {
            let entryInLessonsProgress = lessonsProgress[process.env.PUBLIC_URL + recommendable.path];
            let seenOrMemorisedChoice = Math.random() <.9 ? "numberOfWordsSeen" : "numberOfWordsMemorised";

            // You've never seen it before, so it's probably a good one to start
            if (typeof entryInLessonsProgress === "undefined") {
              return true;
            }
            else {
              if (typeof entryInLessonsProgress[seenOrMemorisedChoice] !== "undefined") {
                if (seenOrMemorisedChoice === "numberOfWordsMemorised") {
                  // You've memorised most of this lesson already, so it is probably boring.
                  // We don't aim for 100% because we're tracking unique number of words seen.
                  // Practice lessons contains some word repetition so number of unique words so it
                  // will always fall short of the target.
                  if (entryInLessonsProgress[seenOrMemorisedChoice] >= .6 * recommendable.target) {
                    return false;
                  }
                  else {
                    return true;
                  }
                }
                else {
                  if (entryInLessonsProgress["numberOfWordsToDiscover"] === 0) {
                    return false;
                  }
                  else {
                    return true;
                  }
                }
              }
              else {
                return true;
              }
            }

            // return false;
          });

          let wordCount = 300;

          let recommendedPracticeLessonInIndex = lessonIndex.find((recommended) => {
            return "/lessons" + recommended.path === recommendedPracticeLesson.path;
          });

          if (typeof recommendedPracticeLessonInIndex !== "undefined") {
            if (typeof recommendedPracticeLessonInIndex.wordCount !== "undefined") {
              wordCount = recommendedPracticeLessonInIndex.wordCount;
            }
          }

          if (typeof recommendedPracticeLesson !== "undefined") {
            recommendedNextLesson.studyType = 'practice';
            recommendedNextLesson.limitNumberOfWords = Math.min(300, wordCount);
            recommendedNextLesson.repetitions = 1;
            recommendedNextLesson.linkTitle = recommendedPracticeLesson.lessonTitle;
            recommendedNextLesson.linkText = "Practice " + recommendedPracticeLesson.lessonTitle;
            recommendedNextLesson.link = recommendedPracticeLesson.path.replace(/lesson.txt$/,'') + practiceParams;
          }

          break;

        default:
          practiceParams = practiceParams.replace('newWords=1','newWords=0');
          recommendedNextLesson.limitNumberOfWords = 300;
          recommendedNextLesson.linkTitle = "Your words";
          recommendedNextLesson.linkText = "Practice your words";
          recommendedNextLesson.link = "/lessons/progress/?recommended=true&" + PARAMS.practiceParams;
          recommendedNextLesson.studyType = 'practice';
          recommendedNextLesson.repetitions = 1;
          break;
      }
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "drill" && numberOfWordsMemorised < 2) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "drill") {
      let entryInLessonsProgress;

      let drillChoice = Math.random() <.5 ? "drillLessons" : "drillMemorised";

      switch (drillChoice) {
        case "drillMemorised":
          recommendedNextLesson.studyType = 'drill';
          recommendedNextLesson.limitNumberOfWords = 100;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your memorised words";
          recommendedNextLesson.linkText = "Your memorised words";
          recommendedNextLesson.link = "/lessons/progress/memorised/?recommended=true&" + PARAMS.drillParams;
          break;

        case "drillLessons":
          let recommendedDrillLesson = courses.drillCourse.find((recommendable) => {

            entryInLessonsProgress = lessonsProgress[process.env.PUBLIC_URL + recommendable.path];

            // No lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
            // It's not a great candidate for drilling
            if (typeof entryInLessonsProgress === "undefined") { return false; }

            // Don't pick this lesson if you've already memorised 15 words and its target was 15
            if ((entryInLessonsProgress['numberOfWordsMemorised'] || 0) >= recommendable['target']) { return false; }

            // Don't pick this lesson if it has fewer than 15 memorised words because it will be a boring lesson
            if ((entryInLessonsProgress['numberOfWordsMemorised'] || 0) < 15) { return false; }

            return true;
          });

          if (typeof recommendedDrillLesson !== "undefined") {
            recommendedNextLesson.studyType = 'drill';
            recommendedNextLesson.limitNumberOfWords = 100;
            recommendedNextLesson.repetitions = 3;
            recommendedNextLesson.linkTitle = recommendedDrillLesson.lessonTitle;
            recommendedNextLesson.linkText = "Drill " + recommendedNextLesson.limitNumberOfWords + " words from " + recommendedDrillLesson.lessonTitle + " with " + recommendedNextLesson.repetitions + " repetitions";
            recommendedNextLesson.link = recommendedDrillLesson.path.replace(/lesson.txt$/,'') + "?recommended=true&" + PARAMS.drillParams;
          } else {
            recommendedNextLesson.studyType = 'drill';
            recommendedNextLesson.limitNumberOfWords = 100;
            recommendedNextLesson.repetitions = 3;
            recommendedNextLesson.linkTitle = "Your memorised words";
            recommendedNextLesson.linkText = "Your memorised words";
            recommendedNextLesson.link = "/lessons/progress/memorised/?recommended=true&" + PARAMS.drillParams;
          }
          break;

        default:
          recommendedNextLesson.studyType = 'drill';
          recommendedNextLesson.limitNumberOfWords = 100;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your memorised words";
          recommendedNextLesson.linkText = "Your memorised words";
          recommendedNextLesson.link = "/lessons/progress/memorised/?recommended=true&" + PARAMS.drillParams;
          break;
      }
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "revise" && numberOfWordsSeen < 15) {
      recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "revise") {
      // One day it could include an option to revise your worst words or tricky words
      let reviseChoice = Math.random() <.5 ? "reviseLessons" : "reviseSeen";

      switch (reviseChoice) {
        case "reviseSeen":
          recommendedNextLesson.studyType = 'revise';
          recommendedNextLesson.limitNumberOfWords = 50;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your revision words";
          recommendedNextLesson.linkText = "Your revision words";
          recommendedNextLesson.link = "/lessons/progress/seen/?recommended=true&" + PARAMS.reviseParams;
          break;

        case "reviseLessons":
          let entryInLessonsProgress;
          let recommendedRevisionLesson = courses.revisionCourse.find((recommendable) => {

            // no lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
            // so it's probably not a good candidate for revision
            entryInLessonsProgress = lessonsProgress[process.env.PUBLIC_URL + recommendable.path];
            if (typeof entryInLessonsProgress === "undefined") { return false; }

            // don't pick this lesson if you've already seen 15 words and its target was 15
            if (entryInLessonsProgress['numberOfWordsSeen'] >= recommendable['target']) { return false; }

            // don't pick this lesson if it has fewer than 15 seen words because you've already memorised all the words in this lesson
            if (entryInLessonsProgress['numberOfWordsSeen'] < 15) { return false; }

            return true;
          });

          if (typeof recommendedRevisionLesson !== "undefined") {
            recommendedNextLesson.studyType = 'revise';
            recommendedNextLesson.limitNumberOfWords = 50;
            recommendedNextLesson.repetitions = 3;
            recommendedNextLesson.linkTitle = recommendedRevisionLesson.lessonTitle;
            recommendedNextLesson.linkText = "Revise 50 words from " + recommendedRevisionLesson.lessonTitle + " with 3 repetitions";
            recommendedNextLesson.link = recommendedRevisionLesson.path.replace(/lesson.txt$/,'') + "?recommended=true&" + PARAMS.reviseParams;
          } else {
            recommendedNextLesson.studyType = 'revise';
            recommendedNextLesson.limitNumberOfWords = 50;
            recommendedNextLesson.repetitions = 3;
            recommendedNextLesson.linkTitle = "Your revision words";
            recommendedNextLesson.linkText = "Your revision words";
            recommendedNextLesson.link = "/lessons/progress/seen/?recommended=true&" + PARAMS.reviseParams;
          }
          break;

        default:
          recommendedNextLesson.studyType = 'revise';
          recommendedNextLesson.limitNumberOfWords = 50;
          recommendedNextLesson.repetitions = 3;
          recommendedNextLesson.linkTitle = "Your revision words";
          recommendedNextLesson.linkText = "Your revision words";
          recommendedNextLesson.link = "/lessons/progress/seen/?recommended=true&" + PARAMS.reviseParams;
          break;
      }
    }

    // Once a step is chosen, pick a valid lesson/step for that
    // For discover, review lessonsProgress for words seen and compare against targets in recommendedDiscoverCourse
    if (recommendedStudySession[recommendedStudySessionIndex] === "discover") {
      let discoverParams = "?recommended=true&" + PARAMS.discoverParams;
      let entryInLessonsProgress;
      let recommendedDiscoverLesson = courses.discoverCourse.find((recommendable) => {

        // no lessonsProgress lesson matches recommendable.path, then you've never seen that lesson
        // so it's probably a good candidate
        if (typeof lessonsProgress[process.env.PUBLIC_URL + recommendable.path] === "undefined") { return true; }

        entryInLessonsProgress = lessonsProgress[process.env.PUBLIC_URL + recommendable.path];

        // don't pick this lesson if you've already seen/memorised 15 words and its target was 15
        if (((entryInLessonsProgress['numberOfWordsSeen'] || 0) + (entryInLessonsProgress['numberOfWordsMemorised'] || 0)) >= recommendable['target']) { return false; }

        // don't pick this lesson if you've seen ALL the words (leftToDiscover === 0)
        if (entryInLessonsProgress['numberOfWordsToDiscover'] === 0) { return false; }

        return true;
      });

      let wordCount = 15;

      let recommendedDiscoverLessonInIndex = lessonIndex.find((recommended) => {
        return "/lessons" + recommended.path === recommendedDiscoverLesson.path;
      });

      if (typeof recommendedDiscoverLessonInIndex !== "undefined") {
        if (typeof recommendedDiscoverLessonInIndex.wordCount !== "undefined") {
          wordCount = recommendedDiscoverLessonInIndex.wordCount;
        }
      }

      let wordsLeftToDiscover = 15;
      if (lessonsProgress[recommendedDiscoverLesson.path] && lessonsProgress[recommendedDiscoverLesson.path].numberOfWordsToDiscover) {
        wordsLeftToDiscover = lessonsProgress[recommendedDiscoverLesson.path].numberOfWordsToDiscover;
      }

      let limitNumberOfWords = Math.min(15, wordCount, wordsLeftToDiscover);

      if (recommendedDiscoverLesson.path.includes("briefs") || recommendedDiscoverLesson.path.includes("punctuation") || recommendedDiscoverLesson.path.includes("longest")) {
        limitNumberOfWords = Math.min(5, wordCount, wordsLeftToDiscover);
        discoverParams = discoverParams.replace("limitNumberOfWords=15", "limitNumberOfWords=" + limitNumberOfWords.toString());
      }

      if (typeof recommendedDiscoverLesson !== "undefined") {
        recommendedNextLesson.studyType = 'discover';
        recommendedNextLesson.limitNumberOfWords = limitNumberOfWords;
        recommendedNextLesson.repetitions = 5;
        recommendedNextLesson.linkTitle = recommendedDiscoverLesson.lessonTitle;
        recommendedNextLesson.linkText = "Discover " + limitNumberOfWords + " words from " + recommendedDiscoverLesson.lessonTitle + " with 5 repetitions";
        recommendedNextLesson.link = recommendedDiscoverLesson.path.replace(/lesson.txt$/,'') + discoverParams;
      }
    }

    // if (recommendedStudySession[recommendedStudySessionIndex] === "wildcard" && numberOfWordsMemorised < 50) {
    //   recommendedStudySessionIndex = recommendedStudySessionIndex + 1;
    // }

    if (recommendedStudySession[recommendedStudySessionIndex] === "wildcard") {
      // One day it could include "test"
      let wildcardChoice = Math.random() <.5 ? "compete" : "game";

      switch (wildcardChoice) {
        case "compete":
          recommendedNextLesson.studyType = 'compete';
          recommendedNextLesson.limitNumberOfWords = null;
          recommendedNextLesson.repetitions = null;
          recommendedNextLesson.linkTitle = "Type Racer";
          recommendedNextLesson.linkText = "Play Type Racer";
          recommendedNextLesson.link = 'https://play.typeracer.com/?universe=steno';
          break;
        case "game":
          if ((numberOfWordsSeen + numberOfWordsMemorised) < 100) {
            Object.assign(recommendedNextLesson, games[0])
          }
          else {
            if (Math.random() < 0.5) {
              Object.assign(recommendedNextLesson, games[1])
            }
            else {
              Object.assign(recommendedNextLesson, games[2])
            }
          }
          break;
        default:
          recommendedNextLesson.studyType = 'break';
          recommendedNextLesson.limitNumberOfWords = null;
          recommendedNextLesson.repetitions = null;
          recommendedNextLesson.linkTitle = "Take a break";
          recommendedNextLesson.linkText = "Take a break";
          recommendedNextLesson.link = '/break';
          break;
      }

    }

    if (recommendedStudySession[recommendedStudySessionIndex] === "break") {
      recommendedNextLesson.studyType = 'break';
      recommendedNextLesson.limitNumberOfWords = null;
      recommendedNextLesson.repetitions = null;
      recommendedNextLesson.linkTitle = "Save your progress and take a break";
      recommendedNextLesson.linkText = "Take a break";
      recommendedNextLesson.link = '/break';
    }

    return recommendedNextLesson;
}

export {
  getRecommendedNextLesson
};
