import React from "react";
import { Link } from "react-router-dom";
import * as Utils from "../../../utils/utils";

export type FlashcardsNextLesson = {
  /** Example: "Top 1000 words flashcards" */
  linkTitle: string;
  /** JavaScript timestamp e.g. 1558144862000 */
  lastSeen: number;
  /** A URL */
  link: string;
};

export type Props = {
  flashcardsNextLesson: FlashcardsNextLesson;
  loadingLessonIndex: boolean;
  onSkip: () => void;
  skipButtonId: string;
  startFlashcards: (e: any) => void;
};

// This magic time stamp matches the default time used in flashcardsRecommendations
const defaultTimestamp = 1558144862000;

const FlashcardsBox = ({
  flashcardsNextLesson,
  loadingLessonIndex,
  onSkip,
  skipButtonId,
  startFlashcards,
}: Props) => {
  return flashcardsNextLesson !== undefined && !loadingLessonIndex ? (
    <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
      <p className="text-right">
        <strong>
          {flashcardsNextLesson.linkTitle === "Error"
            ? "Unable to load flashcards"
            : flashcardsNextLesson.linkTitle}
        </strong>
      </p>
      <p className="text-right de-emphasized">
        {flashcardsNextLesson.lastSeen === defaultTimestamp
          ? "New flashcards"
          : `Seen ${Utils.relativeTimeAgo(
              Date.now(),
              flashcardsNextLesson.lastSeen
            )} ago`}
      </p>
      <div className="flex flex-wrap justify-end">
        <button
          onClick={onSkip}
          id={skipButtonId || "js-flashcards-skip-button"}
          className="button button--secondary mr2 pl3 pr3"
        >
          Skip
        </button>
        <div className="text-right">
          {flashcardsNextLesson.linkTitle === "Error" ? (
            <a href="." className="link-button dib" style={{ lineHeight: 2 }}>
              Refresh
            </a>
          ) : (
            <Link
              onClick={startFlashcards}
              to={flashcardsNextLesson.link}
              className="link-button dib"
              style={{ lineHeight: 2 }}
            >
              Study
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
      <p className="text-right">
        <strong>Loading…</strong>
      </p>
      <p className="text-right de-emphasized"></p>
      <div className="flex flex-wrap justify-end">
        <button
          onClick={onSkip}
          id={skipButtonId || "js-flashcards-skip-button"}
          className="button button--secondary mr2 pl3 pr3"
        >
          Skip
        </button>
        <div className="text-right">
          <button
            disabled
            className="link-button dib"
            style={{ lineHeight: 2 }}
          >
            Loading…
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsBox;
