import { FlashcardsNextLesson } from "pages/progress/components/FlashcardsBox";

type FlashcardsCourseItem = {
  /** e.g. "/lessons/fundamentals/numbers/flashcards" */
  "path": string;
  /** e.g. "Numbers" */
  "lessonTitle": string;
  /** e.g. 100 */
  "target": number;
};

type FlashcardsRecommendedCoursesType = {
  "noviceCourse": FlashcardsCourseItem[];
  "beginnerCourse": FlashcardsCourseItem[];
  "competentCourse":  FlashcardsCourseItem[];
  "proficientCourse":  FlashcardsCourseItem[];
  "expertCourse": FlashcardsCourseItem[];
}

const data: null | FlashcardsRecommendedCoursesType = null;

async function fetchFlashcardsRecommendations(): Promise<FlashcardsRecommendedCoursesType> {
  try {
    const response = await fetch(import.meta.env.VITE_PUBLIC_URL + '/lessons/flashcardsRecommendations.json', {
      method: "GET",
      credentials: "same-origin"
    });
    const json = await response.json();
    return json;
  } catch (e) {
    return {
      "beginnerCourse": [
        {
          "path": "/lessons/fundamentals/one-syllable-words-with-simple-keys/flashcards",
          "lessonTitle": "One-syllable words with simple keys",
          "target": 15
        }
      ],
      "noviceCourse": [],
      "competentCourse": [],
      "proficientCourse": [],
      "expertCourse": [],
    };
  }
}

export function getFlashcardsRecommendedCourses() {
  // @ts-expect-error
  let recommendedCourses: Promise<FlashcardsRecommendedCoursesType> = {};
  if (data === null) {
    recommendedCourses = fetchFlashcardsRecommendations();
  } else {
    recommendedCourses = Promise.resolve(data);
  }

  return recommendedCourses;
}

function getFlashcardsNextLesson(courses: FlashcardsRecommendedCoursesType, flashcardsProgress = {}, courseLevel: keyof FlashcardsRecommendedCoursesType = "expertCourse", currentFlashcardsCourseIndex = 0): [FlashcardsNextLesson, number] {
    // fallback lesson:
    const flashcardsNextLesson = {
      lastSeen: 1558144862000, // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
      linkTitle: "Prefixes",
      link: import.meta.env.VITE_PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
    };

    if (courses && courses[courseLevel]) {
      flashcardsNextLesson.lastSeen = 1558144862000; // Saturday, May 18, 2019 12:00:55 PM GMT+10:00

      if (courses[courseLevel][currentFlashcardsCourseIndex + 1]) {
        currentFlashcardsCourseIndex = currentFlashcardsCourseIndex + 1;
        flashcardsNextLesson.linkTitle = (courses?.[courseLevel]?.[currentFlashcardsCourseIndex]?.lessonTitle ?? '') + " flashcards";
        flashcardsNextLesson.link = courses?.[courseLevel]?.[currentFlashcardsCourseIndex]?.path ?? "";
      }
      else {
        currentFlashcardsCourseIndex = 0;
        flashcardsNextLesson.linkTitle = (courses?.[courseLevel]?.[currentFlashcardsCourseIndex]?.lessonTitle ?? "") + " flashcards";
        flashcardsNextLesson.link = courses?.[courseLevel]?.[currentFlashcardsCourseIndex]?.path ?? "";
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
