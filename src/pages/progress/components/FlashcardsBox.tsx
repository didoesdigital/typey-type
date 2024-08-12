import React from "react";
import GoogleAnalytics from "react-ga4";
import { Link } from "react-router-dom";
import * as Utils from "../../../utils/utils";
import { useAnnouncerApi } from "../../../components/Announcer/useAnnouncer";

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
  skipButtonId: string;
  startFlashcards: () => void;
  updateFlashcardsRecommendation: () => void;
};

// This magic time stamp matches the default time used in flashcardsRecommendations
const defaultTimestamp = 1558144862000;

const FlashcardsBox = ({
  flashcardsNextLesson,
  skipButtonId,
  startFlashcards,
  updateFlashcardsRecommendation,
}: Props) => {
  const { updateMessage } = useAnnouncerApi();

  const onSkipFlashcards = () => {
    GoogleAnalytics.event({
      category: "Flashcards",
      action: "Skip recommended flashcards",
      label: flashcardsNextLesson?.link || "BAD_INPUT",
    });

    // Note: This is a hacky hack. It would be better to clean up the mess of
    // code handling recommendations and either have the code that gets the
    // recommendation call the announcer with the new recommendation (but not
    // when other actions fetch recommendations) or somehow get the *new*
    // recommendation from state/props/refs and announce it here instead of
    // relying on sketchy timeouts and querying the DOM.
    setTimeout(() => {
      const toAnnounce = document.getElementById(
        "js-next-recommended-link-text"
      );
      if (toAnnounce && toAnnounce.textContent !== "Loading…") {
        updateMessage(`Recommended: ${toAnnounce.textContent ?? ""}`);
      }
    }, 100);

    updateFlashcardsRecommendation();
  };

  return !!flashcardsNextLesson ? (
    <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
      <p className="text-right">
        <strong>{flashcardsNextLesson.linkTitle}</strong>
      </p>
      <p className="text-right de-emphasized" data-chromatic="ignore">
        {flashcardsNextLesson.lastSeen === defaultTimestamp
          ? "New flashcards"
          : `Seen ${Utils.relativeTimeAgo(
              Date.now(),
              flashcardsNextLesson.lastSeen
            )} ago`}
      </p>
      <div className="flex flex-wrap justify-end">
        <button
          onClick={onSkipFlashcards}
          id={skipButtonId || "js-flashcards-skip-button"}
          className="button button--secondary mr2 pl3 pr3"
        >
          Skip
        </button>
        <div className="text-right">
          <Link
            onClick={startFlashcards}
            to={flashcardsNextLesson.link}
            className="link-button dib"
            style={{ lineHeight: 2 }}
          >
            Study
          </Link>
        </div>
        <div className="hide" id="js-next-recommended-link-text">
          {flashcardsNextLesson.linkTitle}
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
          onClick={onSkipFlashcards}
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
        <div className="hide" id="js-next-recommended-link-text">
          Loading…
        </div>
      </div>
    </div>
  );
};

export default FlashcardsBox;
