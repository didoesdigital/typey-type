import LessonsProgress from "./LessonsProgress";
import lessonIndex from "../../../stories/fixtures/lessonIndex";

export default {
  title: "Progress/LessonsProgress",
  component: LessonsProgress,
  id: "progress-lessons", // permalink
  decorators: [
    // @ts-expect-error TS(7006) FIXME: Parameter 'Story' implicitly has an 'any' type.
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

const fakeVITE_PUBLIC_URL = "."; // should be '/typey-type' but that requires setting the Storybook environment variable for VITE_PUBLIC_URL and that in turn breaks other stories

const testLessonsProgress = {
  [`${fakeVITE_PUBLIC_URL}/lessons/fundamentals/introduction/lesson.txt`]: {
    numberOfWordsMemorised: 52,
    numberOfWordsSeen: 0,
    numberOfWordsToDiscover: 0,
  },
  [`${fakeVITE_PUBLIC_URL}/lessons/fundamentals/one-syllable-words-with-simple-keys/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 4,
      numberOfWordsToDiscover: 160,
    },
  [`${fakeVITE_PUBLIC_URL}/lessons/fundamentals/one-syllable-words-with-more-consonants/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 96,
    },
  [`${fakeVITE_PUBLIC_URL}/lessons/fundamentals/multi-syllable-words-with-suffixes/lesson.txt`]:
    {
      numberOfWordsMemorised: 9,
      numberOfWordsSeen: 524,
      numberOfWordsToDiscover: 842,
    },
  [`${fakeVITE_PUBLIC_URL}/lessons/stories/proverbial-phrases/proverbial-phrases-starting-with-e/lesson.txt`]:
    {
      numberOfWordsMemorised: 0,
      numberOfWordsSeen: 0,
      numberOfWordsToDiscover: 165,
    },
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <ul className="unstyled-list">
    <LessonsProgress {...args} />
  </ul>
);

export const LessonsProgressStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
LessonsProgressStory.storyName = "Lessons progress";
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
LessonsProgressStory.args = {
  lessonIndex: lessonIndex,
  lessonsProgress: testLessonsProgress,
};
