import React from "react";
import FlashcardsSection from "./FlashcardsSection";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/FlashcardsSection/Section on non-small screen",
  component: FlashcardsSection,
};

export const FlashcardsSectionStory = () => {
  return (
    <div className="mw-368">
      <FlashcardsSection
        showOnSmallScreen={false}
        changeFlashcardCourseLevel={() => undefined}
        flashcardsCourseLevel={"noviceCourse"}
        flashcardsNextLesson={{
          linkTitle: "Top 1000 words flashcards",
          lastSeen: 1558144862000,
          link: "http://localhost:3000/typey-type/lessons/drills/top-1000-words/flashcards",
        }}
        loadingLessonIndex={false}
        onSkipFlashcards={() => undefined}
        skipButtonId={"js-test-flashcards-button-in-storybook"}
        startFlashcards={() => undefined}
      />
    </div>
  );
};
FlashcardsSectionStory.storyName = "Section on non-small screen";
