import FlashcardsBox from "./FlashcardsBox";

export default {
  title: "Progress/FlashcardsSection/Box",
  component: FlashcardsBox,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return (
    <div className="mw-368">
      <FlashcardsBox {...args} />
    </div>
  );
};

export const FlashcardsBoxStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
FlashcardsBoxStory.storyName = "Box";
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
FlashcardsBoxStory.args = {
  flashcardsNextLesson: {
    linkTitle: "Top 1000 words flashcards",
    lastSeen: 1558144862000,
    link: "http://localhost:3000/typey-type/lessons/drills/top-1000-words/flashcards",
  },
  loadingLessonIndex: false,
  skipButtonId: "js-test-flashcards-button-in-storybook",
  startFlashcards: () => undefined,
  updateFlashcardsRecommendation: () => undefined,
};
