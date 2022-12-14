import React from "react";
import RecentLessons from "./RecentLessons";

// eslint-disable-next-line import/no-anonymous-default-export
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

const Template = (args) => {
  return <RecentLessons {...args} />;
};

export const RecentLessonsIdeal = Template.bind({});
RecentLessonsIdeal.args = {
  recentLessonHistory: [
    { path: "/lessons/fundamentals/introduction/", studyType: "practice" },
    {
      path: "/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-e/",
      studyType: "practice",
    },
  ],
  lessonIndex: testLessonIndex,
};

export const NoRecentLessons = Template.bind({});
NoRecentLessons.args = {
  recentLessonHistory: [],
  lessonIndex: testLessonIndex,
};
