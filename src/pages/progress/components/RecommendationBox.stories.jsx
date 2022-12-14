import React from "react";
import RecommendationBox from "./RecommendationBox";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/RecommendationBox",
  component: RecommendationBox,
};

const testRecommendedNextLesson = {
  limitNumberOfWords: 15,
  repetitions: 3,
  studyType: "discover",
  lessonTitle: "One-syllable words with simple keys",
  link: "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&study=discover&showStrokes=1&hideStrokesOnLastRepetition=1&newWords=1&seenWords=0&retainedWords=0&repetitions=5&limitNumberOfWords=15&sortOrder=sortOff",
  linkTitle: "Top 10000 Project Gutenberg words",
  linkText: "Discover",
};

const Template = (args) => {
  return <RecommendationBox {...args} />;
};

export const RecommendationBoxIdeal = Template.bind({});
RecommendationBoxIdeal.args = {
  recommendedNextLesson: testRecommendedNextLesson,
  recommendAnotherLesson: () => undefined,
  startRecommendedStep: () => undefined,
  loadingLessonIndex: false,
  setAnnouncementMessage: () => undefined,
};

export const RecommendationBoxLoading = Template.bind({});
