import React from "react";
import ErrorBoundary from "../../../components/ErrorBoundary";
import FlashcardsBox from "./FlashcardsBox";
import type {
  Props as FlashcardsBoxProps,
  FlashcardsNextLesson,
} from "./FlashcardsBox";
import type { FlashcardsCourseLevel } from "../../../types";

type Props = {
  flashcardsCourseLevel: FlashcardsCourseLevel;
  changeFlashcardCourseLevel: () => void;
  flashcardsNextLesson: FlashcardsNextLesson;
  skipButtonId: FlashcardsBoxProps["skipButtonId"];
  loadingLessonIndex: FlashcardsBoxProps["loadingLessonIndex"];
  startFlashcards: FlashcardsBoxProps["startFlashcards"];
  onSkipFlashcards: FlashcardsBoxProps["onSkip"];
};

const FlashcardsSection = ({
  flashcardsCourseLevel,
  changeFlashcardCourseLevel,
  flashcardsNextLesson,
  skipButtonId,
  loadingLessonIndex,
  startFlashcards,
  onSkipFlashcards,
}: Props) => (
  <div className="p3 mx-auto mw-1024 show-sm-only">
    <div className="mw100 w-336">
      <h3>Flashcards</h3>
      <ErrorBoundary relative={true}>
        <div className="clearfix mb2 mt2">
          <label className="mb1 db" htmlFor="smFlashcardsCourseLevel">
            Choose flashcard level
          </label>
          <select
            id="smFlashcardsCourseLevel"
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

export default FlashcardsSection;
