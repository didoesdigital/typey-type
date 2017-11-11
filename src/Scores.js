import React, { Component } from 'react';
import './App.css';

class Scores extends Component {
  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    let result = `
      <dl class="inline-flex">
      <dt><abbr title="words per minute">WPM</abbr>:</dt>
      <dd>${wordsPerMinute}</dd>

      <dt>Time:</dt>
      <dd>${Math.round(timer/1000)}s</dd>

      <dt>New words:</dt>
      <dd>${this.props.totalNumberOfNewWordsMet}</dd>

      <dt>Exposures:</dt>
      <dd>${this.props.totalNumberOfLowExposures}</dd>

      <dt>Familiar:</dt>
      <dd>${this.props.totalNumberOfFamiliarWords}</dd>

      <dt class="hide">Word count:</dt>
      <dd class="hide">~${Math.round(totalNumberOfMatchedWords)}</dd>
      </dl>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div>
          <h6 className="mb1">Scores</h6>
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div>
          <h6 className="mb1">Scores</h6>
          <dl className="timer inline-flex">
            <dt><abbr title="words per minute">WPM</abbr>:</dt>
            <dd>&nbsp;</dd>

            <dt>Time:</dt>
            <dd>&nbsp;</dd>

            <dt>New words:</dt>
            <dd>&nbsp;</dd>

            <dt>Exposures:</dt>
            <dd>&nbsp;</dd>

            <dt>Familiar:</dt>
            <dd>&nbsp;</dd>

            <dt className="hide">Word count:</dt>
            <dd className="hide">&nbsp;</dd>
          </dl>
        </div>
      );
    }

  }
}

export default Scores;
