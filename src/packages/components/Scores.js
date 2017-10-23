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
      <p><abbr title="words per minute">WPM</abbr>:</p>
      <p>${wordsPerMinute}</p>

      <p>Time (s):</p>
      <p>${Math.round(timer/1000)} seconds</p>

      <p>Word count:</p>
      <p>~${Math.round(totalNumberOfMatchedWords)} words</p>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div>
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div>
          <p><abbr title="words per minute">WPM</abbr>:</p>
          <p>&nbsp;</p>

          <p>Time (s):</p>
          <p>&nbsp;</p>

          <p>Word count:</p>
          <p>&nbsp;</p>
        </div>
      );
    }

  }
}

export default Scores;
