let data = null;

function fetchFlashcardsRecommendations() {
  return fetch(process.env.PUBLIC_URL + '/lessons/flashcardsRecommendations.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return json;
  }).catch(function(e) {
    return {
      "beginnerCourse": [
        {
          "path": "/lessons/fundamentals/one-syllable-words-with-simple-keys/flashcards",
          "lessonTitle": "One-syllable words with simple keys",
          "target": 15
        }
      ]
    };
  });
}

export function getFlashcardsRecommendedCourses() {
  let recommendedCourses = {};
  if (data === null) {
    recommendedCourses = fetchFlashcardsRecommendations();
  } else {
    recommendedCourses = Promise.resolve(data);
  }

  return recommendedCourses;
};

/**
 * @returns {[flashcardsNextLesson, currentFlashcardsCourseIndex]}
 */
function getFlashcardsNextLesson(courses, flashcardsProgress = {}, courseLevel = "expertCourse", currentFlashcardsCourseIndex = 0) {
    // fallback lesson:
    let flashcardsNextLesson = {
      lastSeen: 1558144862000, // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
      linkTitle: "Prefixes",
      linkText: "Study",
      link: process.env.PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
    };

    if (courses && courses[courseLevel]) {
      flashcardsNextLesson.lastSeen = 1558144862000; // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
      flashcardsNextLesson.linkText = "Study";

      if (courses[courseLevel][currentFlashcardsCourseIndex + 1]) {
        currentFlashcardsCourseIndex = currentFlashcardsCourseIndex + 1;
        flashcardsNextLesson.linkTitle = courses[courseLevel][currentFlashcardsCourseIndex].lessonTitle + " flashcards";
        flashcardsNextLesson.link = courses[courseLevel][currentFlashcardsCourseIndex].path;
      }
      else {
        currentFlashcardsCourseIndex = 0;
        flashcardsNextLesson.linkTitle = courses[courseLevel][currentFlashcardsCourseIndex].lessonTitle + " flashcards";
        flashcardsNextLesson.link = courses[courseLevel][currentFlashcardsCourseIndex].path;
      }

      if (flashcardsProgress[flashcardsNextLesson.link]) {
        flashcardsNextLesson.lastSeen = flashcardsProgress[flashcardsNextLesson.link].lastSeen;
      }
    }

    if (flashcardsProgress[flashcardsNextLesson] && flashcardsProgress[flashcardsNextLesson]["lastSeen"]) {
      flashcardsNextLesson.lastSeen = flashcardsProgress[flashcardsNextLesson]["lastSeen"];
    }

    return [flashcardsNextLesson, currentFlashcardsCourseIndex];
}

export {
  getFlashcardsNextLesson
};
