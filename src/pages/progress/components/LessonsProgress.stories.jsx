import React from "react";
import LessonsProgress from "./LessonsProgress";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/LessonsProgress",
  component: LessonsProgress,
  id: "progress-lessons", // permalink
  decorators: [
    (Story) => (
      <div className="p3 mx-auto mw-1024 mt3">
        <div className="flex flex-wrap justify-between">
          <div className="mw-368 flex-grow order-1">Recent lessons</div>
          <div className="mw-568">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
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
    category: "Fundamentals",
    overview:
      "/fundamentals/one-syllable-words-with-simple-keys/lesson-overview.html",
    path: "/fundamentals/one-syllable-words-with-simple-keys/lesson.txt",
    subcategory: "",
    subtitle: "",
    suggestedNext:
      "/fundamentals/one-syllable-words-with-more-consonants/lesson.txt",
    title: "One-syllable words with simple keys",
    wordCount: 164,
  },
  {
    category: "Fundamentals",
    overview:
      "/fundamentals/one-syllable-words-with-more-consonants/lesson-overview.html",
    path: "/fundamentals/one-syllable-words-with-more-consonants/lesson.txt",
    subcategory: "",
    subtitle: "",
    suggestedNext:
      "/fundamentals/one-syllable-words-with-f-as-v-or-s/lesson.txt",
    title: "One-syllable words with more consonants",
    wordCount: 96,
  },
  {
    category: "Fundamentals",
    overview:
      "/fundamentals/one-syllable-words-with-f-as-v-or-s/lesson-overview.html",
    path: "/fundamentals/one-syllable-words-with-f-as-v-or-s/lesson.txt",
    subcategory: "",
    subtitle: "",
    suggestedNext:
      "/fundamentals/one-syllable-words-with-unstressed-vowels/lesson.txt",
    title: "One-syllable words with F as V or S",
    wordCount: 11,
  },
  {
    category: "Fundamentals",
    overview:
      "/fundamentals/multi-syllable-words-with-suffixes/lesson-overview.html",
    path: "/fundamentals/multi-syllable-words-with-suffixes/lesson.txt",
    subcategory: "",
    subtitle: "",
    suggestedNext:
      "/fundamentals/multi-syllable-words-with-doubled-consonant-letters/lesson.txt",
    title: "Multi-syllable words with suffixes",
    wordCount: 1375,
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
  {
    title: "The Two Crabs",
    subtitle: "",
    category: "Stories",
    subcategory: "Aesop’s Fables",
    path: "/stories/fables/the-two-crabs/lesson.txt",
    wordCount: 62,
    suggestedNext: "/stories/fables/the-two-fellows-and-the-bear/lesson.txt",
  },
];

const testLessonsProgress = {
  "/typey-type/lessons/fundamentals/introduction/lesson.txt": {
    numberOfWordsMemorised: 52,
    numberOfWordsSeen: 0,
    numberOfWordsToDiscover: 0,
  },
  "/typey-type/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt":
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 4,
      numberOfWordsToDiscover: 160,
    },
  "/typey-type/lessons/fundamentals/one-syllable-words-with-more-consonants/lesson.txt":
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 96,
    },
  "/typey-type/lessons/fundamentals/multi-syllable-words-with-suffixes/lesson.txt":
    {
      numberOfWordsMemorised: 9,
      numberOfWordsSeen: 524,
      numberOfWordsToDiscover: 842,
    },
  "/typey-type/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-e/lesson.txt":
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 165,
    },
};

const Template = (args) => (
  <ul className="unstyled-list">
    <LessonsProgress {...args} />
  </ul>
);

export const LessonsProgressStory = Template.bind({});
LessonsProgressStory.storyName = "Lessons progress";
LessonsProgressStory.args = {
  lessonIndex: testLessonIndex,
  lessonsProgress: testLessonsProgress,
  setAnnouncementMessage: () => undefined,
  PUBLIC_URL: process.env.PUBLIC_URL,
};
