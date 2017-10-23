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

      <dt>Word count:</dt>
      <dd>~${Math.round(totalNumberOfMatchedWords)}</dd>
      </dl>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div>
          <h6>Scores</h6>
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div>
          <h6>Scores</h6>
          <dl className="inline-flex">
            <dt><abbr title="words per minute">WPM</abbr>:</dt>
            <dd>&nbsp;</dd>

            <dt>Time:</dt>
            <dd>&nbsp;</dd>

            <dt>Word count:</dt>
            <dd>&nbsp;</dd>
          </dl>
        </div>
      );
    }

  }
}

export default Scores;
