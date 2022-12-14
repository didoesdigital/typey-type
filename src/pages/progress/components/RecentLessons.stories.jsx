import React from "react";
import RecentLessons from "./RecentLessons";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/RecentLessons",
  component: RecentLessons,
};

const testLessonIndex = [
  {
    category: "Fundamentals",
    overview: "/fundamentals/introduction/lesson-overview.html",
    path: "/fundamentals/introduction/lesson.txt",
    subcategory: "",
    subtitle: "",
    suggestedNext:
      "/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
    title: "Introduction",
    wordCount: 52,
  },
];

const Template = (args) => {
  return <RecentLessons {...args} />;
};

export const RecentLessonsIdeal = Template.bind({});
RecentLessonsIdeal.args = {
  recentLessonHistory: [
    { path: "/lessons/fundamentals/introduction/", studyType: "practice" },
  ],
  lessonIndex: testLessonIndex,
};

export const NoRecentLessons = Template.bind({});
NoRecentLessons.args = {
  recentLessonHistory: [],
  lessonIndex: testLessonIndex,
};
