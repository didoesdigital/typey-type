import React from "react";
import RecentLessons from "./RecentLessons";
import { recentLessonHistoryState } from "../../../states/recentLessonHistoryState";
import { useHydrateAtoms } from "jotai/utils";

export default {
  title: "Progress/RecentLessons",
  component: RecentLessons,
};

const testLessonIndex = [
  {
    title: "Introduction",
    subtitle: "",
    category: "Fundamentals",
    subcategory: "",
    path: "/fundamentals/introduction/lesson.txt",
    wordCount: 52,
    suggestedNext:
      "/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
    overview: "/fundamentals/introduction/lesson-overview.html",
  },
  {
    title: "Proverbial phrases starting with E",
    subtitle: "",
    category: "Stories",
    subcategory: "Proverbial phrases",
    path: "/stories/proverbial-phrases/proverbial-phrases-starting-with-e/lesson.txt",
    wordCount: 165,
    suggestedNext:
      "/stories/proverbial-phrases/proverbial-phrases-starting-with-f/lesson.txt",
  },
];

const recentLessonHistoryIdeal = [
  { path: "/lessons/fundamentals/introduction/", studyType: "practice" },
  {
    path: "/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-e/",
    studyType: "practice",
  },
];

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
export const RecentLessonsIdeal = (args) => {
  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
  useHydrateAtoms([
    [recentLessonHistoryState, { history: recentLessonHistoryIdeal }],
  ]);
  return <RecentLessons {...args} />;
};
RecentLessonsIdeal.args = {
  lessonIndex: testLessonIndex,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
export const NoRecentLessons = (args) => {
  useHydrateAtoms([[recentLessonHistoryState, { history: [] }]]);
  return <RecentLessons {...args} />;
};
NoRecentLessons.args = {
  lessonIndex: testLessonIndex,
};
