import React from "react";
import FlashcardsBox from "./FlashcardsBox";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/FlashcardsSection/Box",
  component: FlashcardsBox,
};

const Template = (args) => {
  return (
    <div className="mw-368">
      <FlashcardsBox {...args} />
    </div>
  );
};

export const FlashcardsBoxStory = Template.bind({});
FlashcardsBoxStory.storyName = "Box";
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
