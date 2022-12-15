import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Utils from "./../utils/utils";

// This magic time stamp matches the default time used in flashcardsRecommendations
const defaultTimestamp = 1558144862000;

class FlashcardsBox extends Component {
  moreFlashcards(event) {
    if (this.props.onSkip) {
      this.props.onSkip(event);
    }
  }

  render() {
    const {
      flashcardsNextLesson,
      loadingLessonIndex,
      skipButtonId,
      startFlashcards,
    } = this.props;

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
            onClick={this.moreFlashcards.bind(this)}
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
            onClick={this.moreFlashcards.bind(this)}
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
  }
}

export default FlashcardsBox;
