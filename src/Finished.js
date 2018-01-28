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
    if (this.props.totalNumberOfMistypedWords === 0 && this.props.totalNumberOfHintedWords === 0) {
      accuracy = ' Perfect accuracy!';
    }
    let emptyAndZeroStateMessage = '';

    let currentLessonStrokes = this.props.currentLessonStrokes;
    console.log(currentLessonStrokes);

    let misstrokesSummary = '';

    if (currentLessonStrokes.length > 0) {
      let listOfPossibleStrokeImprovements = currentLessonStrokes.map( (phrase, i) => {
        let strokeAttempts = phrase.attempts.map( ( attempt, j ) => {
          return(
              <li key={ j } className="unstyled-list-item nowrap"><span className="bg-warning px1">{attempt}</span></li>
          );
        });
        return(
          <li key={ i } className="unstyled-list-item mr3 dib">
            <h4 className="mt0"><span className="matched steno-material px1 nowrap">{phrase.word}</span></h4>
            <ol className="unstyled-list mb0 misstroke-list">
              {strokeAttempts}
            </ol>
            <p><span className="visually-hidden text-small">Hint: </span><span className="steno-stroke steno-stroke--subtle text-small px1">{phrase.stroke.split('').map((item, i)=><kbd className="raw-steno-key raw-steno-key--subtle text-small" key={i}>{item}</kbd>)}</span></p>
          </li>
        );
      });

      misstrokesSummary = (
        <div>
          <h3 className="mt0">Possible stroke improvements</h3>
          <ol className="flex mb0">{listOfPossibleStrokeImprovements}</ol>
        </div>
      );
    }

    let lessonSummary = (
      <div className="finished-lesson mr1">
        <div className="finished-summary">
          <h2>Finished!</h2>
          <h3 className="mt0">{this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)}<abbr title="words per minute">WPM</abbr>!{accuracy}</h3>
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
        <div className="misstrokes-summary">
          {misstrokesSummary}
        </div>
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
