import React, { Component } from 'react';
import Scores from './Scores';
import UserSettings from './UserSettings';
import { Link } from 'react-router-dom';
import { IconRestart } from './Icon';
import './App.css';

class Finished extends Component {

  isEmpty() {
    return (this.props.lessonLength === 0);
  }

  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    return wordsPerMinute;
  }

  render() {
    let customMessage;
    let accuracy = '';
    let currentLessonStrokes = this.props.currentLessonStrokes;
    // console.log(currentLessonStrokes);

    let misstrokesSummary = '';

    if (currentLessonStrokes.length > 0) {
      let listOfPossibleStrokeImprovements = currentLessonStrokes.map( (phrase, i) => {
        let strokeAttempts = phrase.attempts.map( ( attempt, j ) => {
          return(
              <li key={ j } className="nowrap di ml1"><span className="bg-warning px1">{attempt}</span></li>
          );
        });
        return(
          <li key={ i } className="unstyled-list-item mr3 bg-slat p1 mb1">
            <label className="checkbox-label mt0">
              <input
                className="checkbox-input"
                type="checkbox"
                name={ i + "-checkbox" }
                id={ i + "-checkbox" }
                checked={this.props.currentLessonStrokes[i].checked}
                onChange={this.props.updateRevisionMaterial}
                />
                <span className="matched steno-material px1 nowrap">{phrase.word}</span>
            </label>
            <p className="visually-hidden di"><span className="visually-hidden">You wrote:</span></p>
            <ol className="unstyled-list mb0 misstroke-list di">
              {strokeAttempts}
            </ol>
            <p className="pl3 mb0"><span className="visually-hidden text-small">Hint: </span><span className="steno-stroke steno-stroke--subtle text-small px1">{phrase.stroke.split('').map((item, i)=><kbd className="raw-steno-key raw-steno-key--subtle text-small" key={i}>{item}</kbd>)}</span></p>
          </li>
        );
      });

      misstrokesSummary = (
        <div>
          <h3 className="mt0 nowrap">Possible stroke improvements</h3>
          <ol className="mb0 unstyled-list">{listOfPossibleStrokeImprovements}</ol>
        </div>
      );
    }

    if (this.props.totalNumberOfMistypedWords === 0 && this.props.totalNumberOfHintedWords === 0) {
      accuracy = ' 100%';
    } else if (this.props.totalNumberOfMistypedWords > 0) {
      // console.log("this.props.totalNumberOfNewWordsMet" + this.props.totalNumberOfNewWordsMet);
      // console.log("this.props.totalNumberOfLowExposuresSeen" + this.props.totalNumberOfLowExposuresSeen);
      // console.log("this.props.totalNumberOfRetainedWords" + this.props.totalNumberOfRetainedWords);
      // console.log("this.props.totalNumberOfHintedWords" + this.props.totalNumberOfHintedWords);
      // console.log("this.props.totalNumberOfMistypedWords" + this.props.totalNumberOfMistypedWords);
      let totalWords = this.props.totalNumberOfNewWordsMet + this.props.totalNumberOfLowExposuresSeen + this.props.totalNumberOfRetainedWords + this.props.totalNumberOfMistypedWords + this.props.totalNumberOfHintedWords;
      // console.log("Total Words: " + totalWords);
      let accuracyPercent = (1 - ((this.props.totalNumberOfMistypedWords + this.props.totalNumberOfHintedWords) / totalWords)) * 100;
      // console.log("Accuracy percent: " + accuracyPercent);
      let accuracyPercentRoundedToTwoDecimalPlaces = (Math.floor(accuracyPercent * 100) / 100);
      // console.log("Accuracy percent rounded: " + accuracyPercentRoundedToTwoDecimalPlaces);
      accuracy = ' ' + accuracyPercentRoundedToTwoDecimalPlaces + '% accuracy!';

    } else if (this.props.totalNumberOfHintedWords > 0 && (this.props.totalNumberOfNewWordsMet > 0 || this.props.totalNumberOfLowExposuresSeen > 0 || this.props.totalNumberOfRetainedWords > 0)) {
      let totalWords = this.props.totalNumberOfNewWordsMet + this.props.totalNumberOfLowExposuresSeen + this.props.totalNumberOfRetainedWords + this.props.totalNumberOfMistypedWords + this.props.totalNumberOfHintedWords;
      let accuracyPercent = (1 - (this.props.totalNumberOfHintedWords / totalWords)) * 100;
      let accuracyPercentRoundedToTwoDecimalPlaces = (Math.floor(accuracyPercent * 100) / 100);
      accuracy = ' ' + accuracyPercentRoundedToTwoDecimalPlaces + '% accuracy!';
    } else {
      accuracy = ' Keep it up!';
    }
    // When you have stroked nothing right, except hinted or misstroked words, show nothing instead of 0%
    if (accuracy === ' 0% accuracy!') {
      accuracy = '';
    }
    let emptyAndZeroStateMessage = '';
    let wpm = this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
    if (wpm === 0) {
      accuracy = ' Keep trying!';
    }

    let wpmCommentary = '';
    if (wpm > 5000) {
      wpmCommentary = 'Faster than you can think…';
    } else if (wpm > 1500) {
      wpmCommentary = 'Faster than a speed reader!';
    } else if (wpm > 300) {
      wpmCommentary = 'Faster than you can read!';
    } else if (wpm > 250) {
      wpmCommentary = 'As fast as an auctioneer!';
    } else if (wpm > 225) {
      wpmCommentary = 'Faster than a pro stenographer!';
    } else if (wpm > 160) {
      wpmCommentary = 'Faster than a stenographer!';
    } else if (wpm > 150) {
      wpmCommentary = 'Faster than you can talk!';
    } else if (wpm > 100) {
      wpmCommentary = 'Faster than a stenotype student!';
    } else if (wpm > 80) {
      wpmCommentary = 'Faster than a pro typist!';
    } else if (wpm > 60) {
      wpmCommentary = 'Faster than a good QWERTY typist!';
    } else if (wpm > 40) {
      wpmCommentary = 'Faster than your average typist!';
    } else if (wpm > 27) {
      wpmCommentary = 'Faster than hunt and peck typists!';
    } else if (wpm > 22) {
      wpmCommentary = 'Faster than Morse code!';
    } else if (wpm > 20) {
      wpmCommentary = 'Faster than handwriting!';
    } else {
      wpmCommentary = 'Practice this lesson again';
    }

    let lessonSummary = (
      <div className="finished-lesson mr1">
        <div className="finished-summary">
          <h2 className="mb1">Finished</h2>
          <h3 className="mt0 nowrap">{wpm}&nbsp;<abbr title="words per minute">WPM</abbr>!{accuracy}</h3>
          <h4 className="mt0 nowrap">{wpmCommentary}</h4>
          <p>
            <Link to={this.props.suggestedNext} className="link-button dib" style={{lineHeight: 2}} role="button">
              Next lesson
            </Link>
          </p>
          <p>
            <a href={this.props.path} onClick={this.props.restartLesson} className="" role="button">
              <IconRestart aria-hidden="true" role="presentation" iconFill="#596091" className="mr1 svg-icon-wrapper svg-baseline" />
              Restart lesson</a>
          </p>
        </div>
        <div className="misstrokes-summary mr3">
          {misstrokesSummary}
        </div>
        <p>
          <a href={this.props.path} onClick={this.props.reviseLesson} className="" role="button">
            <IconRestart aria-hidden="true" role="presentation" iconFill="#596091" className="mr1 svg-icon-wrapper svg-baseline" />
            Revise lesson</a>
        </p>
      </div>
    );

    if (this.isEmpty()) {
      emptyAndZeroStateMessage = (
        <div className="text-center">There are no words to write.</div>
      );
      lessonSummary = '';
    }
    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }
    return (
      <main id="main">
        <div className="mx-auto mw-1024">
          {customMessage}
        </div>
        <div className="lesson-wrapper mw-1024 p3">
          <UserSettings
            changeUserSetting={this.props.changeUserSetting}
            changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
            changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
            chooseStudy={this.props.chooseStudy}
            disableUserSettings={this.props.disableUserSettings}
            handleLimitWordsChange={this.props.handleLimitWordsChange}
            handleRepetitionsChange={this.props.handleRepetitionsChange}
            hideOtherSettings={this.props.hideOtherSettings}
            toggleHideOtherSettings={this.props.toggleHideOtherSettings}
            totalWordCount={this.props.totalWordCount}
            userSettings={this.props.userSettings}
          />
          <div className="lesson-canvas panel p2 overflow-scroll">
            <div className="mx-auto">
              <div role="alert" aria-live="polite">
                {emptyAndZeroStateMessage}
                {lessonSummary}
              </div>
            </div>
          </div>
          <div className="scores panel p2">
            <Scores
              timer={this.props.timer}
              totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
            />
          </div>
        </div>
      </main>
    )
  }

}

export default Finished;
