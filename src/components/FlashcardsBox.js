import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Utils from './../utils/utils';
import 'react-tippy/dist/tippy.css'

class FlashcardBox extends Component {
  render () {
    let flashcardsNextLesson = this.props.flashcardsNextLesson;
    let flashcardsLink;
    let flashcardsLinkTitle;
    let studyType;

    let flashcardsTimeAgo = Utils.relativeTimeAgo(Date.now(), flashcardsNextLesson.lastSeen);
    let flashcardsTimeSeenText = "Seen " + flashcardsTimeAgo + " ago";

    // This magic time stamp matches the fallback time used in flashcardsRecommendations.js
    if (flashcardsNextLesson.lastSeen === 1558144862000) {
      flashcardsTimeSeenText = "New flashcards";
    }

    flashcardsLink = (
      <Link onClick={this.props.startFlashcards} to={this.props.flashcardsNextLesson.link} className="link-button dib" style={{lineHeight: 2}}>Study</Link>
    );

    flashcardsLinkTitle = this.props.flashcardsNextLesson.linkTitle;

    if (studyType === "error") {
      flashcardsLinkTitle = "Unable to load flashcards";
      flashcardsLink = <a href="." className="link-button dib" style={{lineHeight: 2}}>Refresh</a>
    } else {
      flashcardsLinkTitle = this.props.flashcardsNextLesson.linkTitle;
    }

    if (this.props.flashcardsNextLesson !== undefined && !this.props.loadingLessonIndex) {
      flashcardsNextLesson = (
        <React.Fragment>
          <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
            <p className="text-right"><strong>{flashcardsLinkTitle}</strong></p>
            <p className="text-right de-emphasized">{flashcardsTimeSeenText}</p>
            <div className="flex flex-wrap justify-end">
              <button onClick={this.props.moreFlashcards} id="js-flashcards-skip-button" className="de-emphasized-button pl3 pr3">Skip</button>
              <div className="text-right">
                {flashcardsLink}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      flashcardsNextLesson = (
        <React.Fragment>
          <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
            <p className="text-right"><strong>Loading…</strong></p>
            <p className="text-right de-emphasized"></p>
            <div className="flex flex-wrap justify-end">
              <button onClick={this.props.moreFlashcards} id="js-skip-flashcards-button" className="de-emphasized-button pl3 pr3">Skip</button>
              <div className="text-right">
                <button disabled className="link-button dib" style={{lineHeight: 2}}>Loading…</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {flashcardsNextLesson}
      </React.Fragment>
    );
  }
}

export default FlashcardBox;
