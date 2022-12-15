import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Utils from "./../utils/utils";

class FlashcardsBox extends Component {
  moreFlashcards(event) {
    if (this.props.onSkip) {
      this.props.onSkip(event);
    }
  }

  render() {
    let {
      flashcardsNextLesson,
      linkTitle,
      loadingLessonIndex,
      skipButtonId,
      startFlashcards,
    } = this.props;
    let flashcardsLink;

    let flashcardsTimeAgo = Utils.relativeTimeAgo(
      Date.now(),
      flashcardsNextLesson.lastSeen
    );
    let flashcardsTimeSeenText = "Seen " + flashcardsTimeAgo + " ago";

    // This magic time stamp matches the fallback time used in flashcardsRecommendations.js
    if (flashcardsNextLesson.lastSeen === 1558144862000) {
      flashcardsTimeSeenText = "New flashcards";
    }

    flashcardsLink = (
      <Link
        onClick={startFlashcards}
        to={flashcardsNextLesson.link}
        className="link-button dib"
        style={{ lineHeight: 2 }}
      >
        Study
      </Link>
    );

    if (flashcardsNextLesson.linkTitle === "error") {
      flashcardsLink = (
        <a href="." className="link-button dib" style={{ lineHeight: 2 }}>
          Refresh
        </a>
      );
    }

    if (flashcardsNextLesson !== undefined && !loadingLessonIndex) {
      flashcardsNextLesson = (
        <React.Fragment>
          <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
            <p className="text-right">
              <strong>
                {flashcardsNextLesson.linkTitle === "Error"
                  ? "Unable to load flashcards"
                  : flashcardsNextLesson.linkTitle}
              </strong>
            </p>
            <p className="text-right de-emphasized">{flashcardsTimeSeenText}</p>
            <div className="flex flex-wrap justify-end">
              <button
                onClick={this.moreFlashcards.bind(this)}
                id={skipButtonId || "js-flashcards-skip-button"}
                className="button button--secondary mr2 pl3 pr3"
              >
                Skip
              </button>
              <div className="text-right">{flashcardsLink}</div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      flashcardsNextLesson = (
        <React.Fragment>
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
        </React.Fragment>
      );
    }

    return <React.Fragment>{flashcardsNextLesson}</React.Fragment>;
  }
}

export default FlashcardsBox;
