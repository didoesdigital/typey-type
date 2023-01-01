import React, { useState } from "react";
import GoogleAnalytics from "react-ga";
import ErrorBoundary from "../../../components/ErrorBoundary";
import FlashcardsBox from "./FlashcardsBox";
import { Redirect } from "react-router-dom";
import type {
  Props as FlashcardsBoxProps,
  FlashcardsNextLesson,
} from "./FlashcardsBox";
import type { FlashcardsCourseLevel } from "../../../types";

type Props = {
  showOnSmallScreen: boolean;
  flashcardsCourseLevel: FlashcardsCourseLevel;
  changeFlashcardCourseLevel: () => void;
  flashcardsNextLesson: FlashcardsNextLesson;
  skipButtonId: FlashcardsBoxProps["skipButtonId"];
  loadingLessonIndex: FlashcardsBoxProps["loadingLessonIndex"];
  onSkipFlashcards: FlashcardsBoxProps["onSkip"];
  updateFlashcardsRecommendation: () => void;
};

const FlashcardsSection = ({
  showOnSmallScreen,
  flashcardsCourseLevel,
  changeFlashcardCourseLevel,
  flashcardsNextLesson,
  skipButtonId,
  loadingLessonIndex,
  onSkipFlashcards,
  updateFlashcardsRecommendation,
}: Props) => {
  const [toFlashcardsNextLesson, setToFlashcardsNextLesson] = useState(false);

  const startFlashcards: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    GoogleAnalytics.event({
      category: "Flashcards",
      action: "Start recommended flashcards",
      label: flashcardsNextLesson?.link || "BAD_INPUT",
    });

    // does not navigate using link but instead allows Router Redirect
    e?.preventDefault();
    setToFlashcardsNextLesson(true);
    updateFlashcardsRecommendation();
  };

  return toFlashcardsNextLesson ? (
    <Redirect push to={flashcardsNextLesson.link} />
  ) : (
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
            loadingLessonIndex={loadingLessonIndex}
            startFlashcards={startFlashcards}
            onSkip={onSkipFlashcards}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default FlashcardsSection;
