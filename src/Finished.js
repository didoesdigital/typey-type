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

    let headings = currentLessonStrokes.map( (phrase, index) => {
      return(
        <th key={ index } scope="col" className="p1"><span className="steno-material">{phrase.word}</span></th>
      );
    });

    let misstrokeCells = currentLessonStrokes.map( (phrase, i) => {
      let items = phrase.attempts.map( ( attempt, j ) => {
        return(
          <li key={ j } className="unstyled-list-item"><span className="bg-danger">{attempt}</span></li>
        );
      });

      return(
        <td key={ i } className="p1 v-top">
          <ol className="unstyled-list mb0">
            {items}
          </ol>
        </td>
      );
    });

    let strokeTipCells = currentLessonStrokes.map( (phrase, index) => {
      return(
        <td key={ index } className="p1 v-top"><kbd className="steno-stroke">{phrase.stroke}</kbd></td>
      );
    });

    let tableOfPossibleMisstrokes = (
      <div className="misstrokes-summary">
        <table>
          <caption className="text-left p1"><strong>Possible stroke improvements</strong></caption>
          <thead>
              <tr>
                <th className="visually-hidden" scope="row">Material to type:</th>
                {headings}
              </tr>
          </thead>
          <tbody>
              <tr>
                <th className="visually-hidden" scope="row">You wrote:</th>
                {misstrokeCells}
              </tr>
              <tr>
                <th className="visually-hidden" scope="row">The brief was:</th>
                {strokeTipCells}
              </tr>
          </tbody>
        </table>
      </div>
    )

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
        {tableOfPossibleMisstrokes}
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
