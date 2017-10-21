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
      <p>Time in seconds:</p>
      <p>${Math.round(timer/1000)} seconds</p>

      <p>Number of matched words:</p>
      <p>~${Math.round(totalNumberOfMatchedWords)} words</p>

      <p><abbr title="words per minute">WPM</abbr>:</p>
      <p>${wordsPerMinute}</p>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div className="">
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div className="">
          <p>Time in seconds:</p>
          <p>&nbsp;</p>

          <p>Number of matched words:</p>
          <p>&nbsp;</p>

          <p><abbr title="words per minute">WPM</abbr>:</p>
          <p>&nbsp;</p>
        </div>
      );
    }

  }
}

export default Scores;
