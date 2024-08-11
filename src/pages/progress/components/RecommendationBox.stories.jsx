import React, { Suspense } from "react";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";
import RecommendationBox from "./RecommendationBox";
import RecommendationBoxFallback from "./RecommendationBoxFallback";

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

const testLessonsProgress = {
  "/typey-type/lessons/fundamentals/introduction/lesson.txt": {
    numberOfWordsMemorised: 0,
    numberOfWordsSeen: 1,
    numberOfWordsToDiscover: 5,
  },
};

const Template = (args) => {
  return <Component {...args} />;
};

// Suspense doesn't work in Template which is not a component
const Component = (args) => {
  return (
    <Suspense fallback={<RecommendationBoxFallback />}>
      <RecommendationBox {...args} />
    </Suspense>
  );
};

export const RecommendationBoxIdeal = Template.bind({});
RecommendationBoxIdeal.args = {
  recommendedNextLesson: testRecommendedNextLesson,
  recommendAnotherLesson: () => undefined,
  startRecommendedStep: () => undefined,
  loadingLessonIndex: false,
  lessonsProgress: testLessonsProgress,
  yourSeenWordCount: 1,
  yourMemorisedWordCount: 1,
  metWords: metWordsNovice,
};

export const RecommendationBoxLoading = () => {
  return <RecommendationBoxFallback />;
};
