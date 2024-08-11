import { atomWithLazy } from "jotai/utils";
import { useAtomValue } from "jotai";
import { RecommendedCoursesType } from "../types";

const recommendedCoursesFallback: RecommendedCoursesType = {
  "discoverCourse": [
    {
      "path":
        "/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
      "lessonTitle": "One-syllable words with simple keys",
      "target": 15,
    },
  ],
  "revisionCourse": [
    {
      "path": "/lessons/drills/top-10000-project-gutenberg-words/lesson.txt",
      "lessonTitle": "Top 10000 Project Gutenberg words",
      "target": 10000,
    },
  ],
  "drillCourse": [
    {
      "path": "/lessons/drills/top-10000-project-gutenberg-words/lesson.txt",
      "lessonTitle": "Top 10000 Project Gutenberg words",
      "target": 10000,
    },
  ],
  "practiceCourse": [
    {
      "path": "/lessons/drills/top-10000-project-gutenberg-words/lesson.txt",
      "lessonTitle": "Top 10000 Project Gutenberg words",
      "target": 10000,
    },
  ],
};

function fetchRecommendations() {
  return fetch(process.env.PUBLIC_URL + "/lessons/recommendations.json", {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch(() => {
      return recommendedCoursesFallback;
    });
}

const _recommendedCoursesState =
  atomWithLazy<Promise<RecommendedCoursesType>>(fetchRecommendations);

/**
 * This suspends while loading
 */
export const useRecommendedCourses = () => {
  return useAtomValue(_recommendedCoursesState);
};
