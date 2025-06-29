// @ts-expect-error TS(7034) FIXME: Variable 'data' implicitly has type 'any' in some ... Remove this comment to see the full error message
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
  // @ts-expect-error TS(7005) FIXME: Variable 'data' implicitly has an 'any' type.
  if (data === null) {
    recommendedCourses = fetchFlashcardsRecommendations();
  } else {
    // @ts-expect-error TS(7005) FIXME: Variable 'data' implicitly has an 'any' type.
    recommendedCourses = Promise.resolve(data);
  }

  return recommendedCourses;
};

/**
 * @returns {[flashcardsNextLesson, currentFlashcardsCourseIndex]}
 */
// @ts-expect-error TS(7006) FIXME: Parameter 'courses' implicitly has an 'any' type.
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

      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (flashcardsProgress[flashcardsNextLesson.link]) {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        flashcardsNextLesson.lastSeen = flashcardsProgress[flashcardsNextLesson.link].lastSeen;
      }
    }

    // @ts-expect-error TS(2538) FIXME: Type '{ lastSeen: number; linkTitle: string; linkT... Remove this comment to see the full error message
    if (flashcardsProgress[flashcardsNextLesson] && flashcardsProgress[flashcardsNextLesson]["lastSeen"]) {
      // @ts-expect-error TS(2538) FIXME: Type '{ lastSeen: number; linkTitle: string; linkT... Remove this comment to see the full error message
      flashcardsNextLesson.lastSeen = flashcardsProgress[flashcardsNextLesson]["lastSeen"];
    }

    return [flashcardsNextLesson, currentFlashcardsCourseIndex];
}

export {
  getFlashcardsNextLesson
};
