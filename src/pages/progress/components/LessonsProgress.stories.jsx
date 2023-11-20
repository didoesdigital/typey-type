import React from "react";
import LessonsProgress from "./LessonsProgress";
import lessonIndex from "../../../stories/fixtures/lessonIndex";

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

const Template = (args) => (
  <ul className="unstyled-list">
    <LessonsProgress {...args} />
  </ul>
);

export const LessonsProgressStory = Template.bind({});
LessonsProgressStory.storyName = "Lessons progress";
LessonsProgressStory.args = {
  lessonIndex: lessonIndex,
  lessonsProgress: testLessonsProgress,
};
