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

function getFlashcardsRecommendedCourses() {
  let recommendedCourses = {};
  if (data === null) {
    recommendedCourses = fetchFlashcardsRecommendations();
  } else {
    recommendedCourses = Promise.resolve(data);
  }

  return recommendedCourses;
};

function getFlashcardsNextLesson(flashcardsProgress = {}, courseLevel = "expertCourse", currentFlashcardsCourseIndex = 0) {
  return getFlashcardsRecommendedCourses()
  .then(courses => {
    console.log("got flash nex lesson and got recommended courses and then'd the courses");

    // fallback lesson:
    let flashcardsNextLesson = {
      lastSeen: 1558144862, // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
      linkTitle: "Prefixes",
      linkText: "Study",
      link: process.env.PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + PARAMS.practiceParams
    };

    if (courses && courses[courseLevel]) {
      flashcardsNextLesson.lastSeen = 1558144862;
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
    }

    if (flashcardsProgress[flashcardsNextLesson] && flashcardsProgress[flashcardsNextLesson]["lastSeen"]) {
      console.log("seeeeN");
      flashcardsNextLesson.lastSeen = flashcardsProgress[flashcardsNextLesson]["lastSeen"];
    }

    console.log(flashcardsNextLesson);
    return [flashcardsNextLesson, currentFlashcardsCourseIndex];
  });
}

export {
  getFlashcardsNextLesson
};
