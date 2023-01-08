import React from "react";
import Progress from "./Progress";
import lessonIndex from "../../stories/fixtures/lessonIndex";
import userSettings from "../../stories/fixtures/userSettings";

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

const recommendedNextLesson = {
  limitNumberOfWords: 11,
  link: "/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-v/?recommended=true&study=practice&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=1&seenWords=1&retainedWords=1&repetitions=1&limitNumberOfWords=0&sortOrder=sortOff",
  linkText: "Practice Proverbial phrases starting with V",
  linkTitle: "Proverbial phrases starting with V",
  repetitions: 1,
  studyType: "practice",
};

const Template = (args) => {
  return (
    <Progress
      changeFlashcardCourseLevel={() => console.log("set value")}
      flashcardsNextLesson={flashcardsNextLesson}
      globalUserSettings={{}}
      lessonIndex={lessonIndex}
      lessonsProgress={testLessonsProgress}
      metWords={{}}
      newWordsGoalUnveiled={false}
      oldWordsGoalUnveiled={false}
      recentLessonHistory={recentLessonHistory}
      recommendationHistory={{ currentStep: "practice" }}
      recommendedNextLesson={recommendedNextLesson}
      setAnnouncementMessage={() => console.log("announce")}
      setPersonalPreferences={() => console.log("set value")}
      startingMetWordsToday={{}}
      updateFlashcardsRecommendation={() => console.log("set value")}
      updateRecommendationHistory={() => console.log("set value")}
      updateStartingMetWordsAndCounts={() => console.log("set value")}
      updateUserGoals={() => console.log("set value")}
      updateUserGoalsUnveiled={() => console.log("set value")}
      userGoals={{ newWords: 2, oldWords: 1 }}
      userSettings={userSettings}
      yourMemorisedWordCount={878}
      yourSeenWordCount={8750}
      {...args}
    />
  );
};

export const ProgressStory = Template.bind({});
