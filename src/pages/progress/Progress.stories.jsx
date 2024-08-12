import React, { Suspense } from "react";
import Progress from "./Progress";
import userSettings from "../../stories/fixtures/userSettings";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";
import { useHydrateAtoms } from "jotai/utils";
import { flashcardsRecommendationState } from "../../states/flashcardsProgressState";
import { userGoalsState } from "../../states/userGoalsState";
import { recentLessonHistoryState } from "../../states/recentLessonHistoryState";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Progress",
  component: Progress,
};

const fakePUBLIC_URL = "."; // should be '/typey-type' but that requires setting the Storybook environment variable for PUBLIC_URL and that in turn breaks other stories

const testLessonsProgress = {
  [`${fakePUBLIC_URL}/lessons/fundamentals/introduction/lesson.txt`]: {
    numberOfWordsMemorised: 52,
    numberOfWordsSeen: 0,
    numberOfWordsToDiscover: 0,
  },
  [`${fakePUBLIC_URL}/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 4,
      numberOfWordsToDiscover: 160,
    },
  [`${fakePUBLIC_URL}/lessons/fundamentals/one-syllable-words-with-more-consonants/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 96,
    },
  [`${fakePUBLIC_URL}/lessons/fundamentals/multi-syllable-words-with-suffixes/lesson.txt`]:
    {
      numberOfWordsMemorised: 9,
      numberOfWordsSeen: 524,
      numberOfWordsToDiscover: 842,
    },
  [`${fakePUBLIC_URL}/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-e/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 165,
    },
};

const flashcardsNextLesson = {
  lastSeen: 1673048832924,
  link: "/lessons/drills/prefixes/flashcards",
  linkText: "Study",
  linkTitle: "Prefixes flashcards",
};

const recentLessonHistory = [
  {
    path: "/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-v/",
    studyType: "discover",
  },
  {
    path: "/lessons/drills/top-10000-project-gutenberg-words/",
    studyType: "discover",
  },
  {
    path: "/lessons/stories/fables/the-buffoon-and-the-countryman/",
    studyType: "practice",
  },
  { path: "/lessons/progress/seen/", studyType: "revise" },
  { path: "/lessons/collections/tech/react/", studyType: "discover" },
  {
    path: "/lessons/collections/irreversible-binomials/irreversible-binomials-with-opposites-and-antonyms/",
    studyType: "discover",
  },
  {
    path: "/lessons/collections/irreversible-binomials/irreversible-binomials-with-related-words-and-synonyms/",
    studyType: "discover",
  },
  {
    path: "/lessons/fundamentals/one-syllable-words-with-diphthongs/",
    studyType: "discover",
  },
  {
    path: "/lessons/fundamentals/one-syllable-words-with-vowel-disambiguators/",
    studyType: "discover",
  },
  { path: "/lessons/fundamentals/introduction/", studyType: "discover" },
];

const Template = (args) => {
  return <Component {...args} />;
};

// Suspense doesn't work in Template which is not a component
function Component(args) {
  useHydrateAtoms([
    [
      flashcardsRecommendationState,
      {
        flashcardsNextLesson,
        flashcardsCourseIndex: 0,
      },
    ],
    [userGoalsState, { newWords: 2, oldWords: 1 }],
    [recentLessonHistoryState, { history: recentLessonHistory }],
  ]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <Suspense fallback={<div>Loading...</div>}>
        <Progress
          lessonsProgress={testLessonsProgress}
          metWords={{}}
          startingMetWordsToday={{}}
          userSettings={userSettings}
          yourMemorisedWordCount={878}
          yourSeenWordCount={8750}
          {...args}
        />
      </Suspense>
    </AppMethodsContext.Provider>
  );
}

export const ProgressStory = Template.bind({});
