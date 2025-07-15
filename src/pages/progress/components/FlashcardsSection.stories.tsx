import React from "react";
import FlashcardsSection from "./FlashcardsSection";
import { useHydrateAtoms } from "jotai/utils";
import { flashcardsRecommendationState } from "../../../states/flashcardsProgressState";

export default {
  title: "Progress/FlashcardsSection/Section on non-small screen",
  component: FlashcardsSection,
};

export const FlashcardsSectionStory = () => {
  useHydrateAtoms([
    [
      flashcardsRecommendationState,
      {
        flashcardsNextLesson: {
          linkTitle: "Top 1000 words flashcards",
          lastSeen: 1558144862000,
          link: "http://localhost:3000/typey-type/lessons/drills/top-1000-words/flashcards",
        },
        flashcardsCourseIndex: 0,
      },
    ],
  ]);
  return (
    <div className="mw-368">
      <FlashcardsSection
        showOnSmallScreen={false}
        flashcardsCourseLevel={"noviceCourse"}
        // @ts-expect-error TS(2322) FIXME: Type '{ showOnSmallScreen: false; flashcardsCourse... Remove this comment to see the full error message
        loadingLessonIndex={false}
        skipButtonId={"js-test-flashcards-button-in-storybook"}
        updateFlashcardsRecommendation={() => undefined}
      />
    </div>
  );
};
FlashcardsSectionStory.storyName = "Section on non-small screen";
