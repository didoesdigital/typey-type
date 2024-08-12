import React, { useEffect } from "react";
import GoogleAnalytics from "react-ga4";
import ErrorBoundary from "../../../components/ErrorBoundary";
import FlashcardsBox from "./FlashcardsBox";
import type { Props as FlashcardsBoxProps } from "./FlashcardsBox";
import type { FlashcardsCourseLevel } from "../../../types";
import { useChangeFlashcardCourseLevel } from "../../lessons/components/UserSettings/updateFlashcardSetting";
import { useAtomValue } from "jotai";
import { flashcardsRecommendationState } from "../../../states/flashcardsProgressState";

type Props = {
  showOnSmallScreen: boolean;
  flashcardsCourseLevel: FlashcardsCourseLevel;
  skipButtonId: FlashcardsBoxProps["skipButtonId"];
  updateFlashcardsRecommendation: () => void;
};

const FlashcardsSection = ({
  showOnSmallScreen,
  flashcardsCourseLevel,
  skipButtonId,
  updateFlashcardsRecommendation,
}: Props) => {
  const { flashcardsNextLesson } = useAtomValue(flashcardsRecommendationState);
  const changeFlashcardCourseLevel = useChangeFlashcardCourseLevel();

  useEffect(() => {
    updateFlashcardsRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashcardsCourseLevel]);

  const startFlashcards = () => {
    GoogleAnalytics.event({
      category: "Flashcards",
      action: "Start recommended flashcards",
      label: flashcardsNextLesson?.link || "BAD_INPUT",
    });
  };

  return (
    <div
      className={`mx-auto${
        showOnSmallScreen ? " p3 mw-1024 show-sm-only" : ""
      }`}
    >
      <div className={`mw100${showOnSmallScreen ? " w-336" : ""}`}>
        <h3>Flashcards</h3>
        <ErrorBoundary relative={true}>
          <div className="clearfix mb2 mt2">
            <label
              className="mb1 db"
              htmlFor={
                showOnSmallScreen
                  ? "smFlashcardsCourseLevel"
                  : "mdFlashcardsCourseLevel"
              }
            >
              Choose flashcard level
            </label>
            <select
              id={
                showOnSmallScreen
                  ? "smFlashcardsCourseLevel"
                  : "mdFlashcardsCourseLevel"
              }
              name="flashcardsCourseLevel"
              value={flashcardsCourseLevel}
              onChange={changeFlashcardCourseLevel}
              className="form-control form-control--large mw100 w-336"
            >
              <option value="noviceCourse">Novice</option>
              <option value="beginnerCourse">Beginner</option>
              <option value="competentCourse">Competent</option>
              <option value="proficientCourse">Proficient</option>
              <option value="expertCourse">Expert</option>
            </select>
          </div>
          <FlashcardsBox
            skipButtonId={skipButtonId}
            flashcardsNextLesson={flashcardsNextLesson}
            startFlashcards={startFlashcards}
            updateFlashcardsRecommendation={updateFlashcardsRecommendation}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default FlashcardsSection;
